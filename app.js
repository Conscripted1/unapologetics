// ── GLOBAL STATE ──────────────────────────────────────────────────────────────
let currentTab = 'discern';
let lastTab = 'learn';
let totalSorted = 0;
let modulesComplete = 0;
let libraryItems = [];
let heartedItems = [];      // { moduleId, argIdx, quote, timestamp, moduleTitle }
let watchNotes = {};         // key: 'moduleId:argIdx', value: string
let formationReflections = {}; // key: 'moduleId:pageIdx', value: string
let discernLog = [];         // accumulated placed statements from general discern sessions
let mirrorLog  = [];         // { text, topic, firstFrame, secondFrame, finalFrame, note, moduleTitle, moduleId }
let formationPool = [];      // { id, text, moduleId, moduleTitle, source, frame, algorithmWeight, userFloor, interactions, addedAt }
let discernLibrary = [];     // { id, text, topic, correct, community, mirrorNote, moduleId, moduleTitle, addedAt } — unlocked on module completion
let completedModules = {};   // { [moduleId]: true } — persisted, drives module card state
let _breakdownOpen = false;
let growthExpanded = { altar: false, mirror: false, stones: false, discernLog: false };

let discernState = { statements:[], idx:0, placed:[], streak:0 };

let moduleState = {
  moduleId:null, step:0,
  preAssessIntroSeen:false,
  // Pre-assessment (new fill-blank + match format)
  preAssessIdx:0, preAssessAnswers:[], preAssessDone:false, preAssessQState:null,
  // Legacy pre-sort fields kept for Mirror backward-compat (now empty)
  preSortIdx:0, preSortPlaced:[], preSortDone:false,
  extractViewed:false,
  sortIdx:0, sortPlaced:[], sortDone:false,
  formationPage:0, formationDone:false,
  libraryDone:false,
  assessIdx:0, assessAnswers:[], assessDone:false,
};

// Used by renderFrameButtons for onclick delegation
window._frameCallback = null;

// ── ADMIN STATE ───────────────────────────────────────────────────────────────
let adminMode = false;
let adminApprovals = {}; // { [moduleId]: { sermonPoints:{idx:status}, discernmentQuestions:{idx:status}, preAssessment:{idx:status}, assessment:{idx:status} } }
let adminSelectedModule = null;
const ADMIN_PASS = 'inapologetics2026';
let _logoTapCount = 0, _logoTapTimer = null;

function handleLogoTap() {
  _logoTapCount++;
  clearTimeout(_logoTapTimer);
  _logoTapTimer = setTimeout(() => { _logoTapCount = 0; }, 2000);
  if (_logoTapCount >= 5) { _logoTapCount = 0; openAdmin(); }
}

function openAdmin() {
  const pw = prompt('Admin access code:');
  if (pw !== ADMIN_PASS) { alert('Incorrect code.'); return; }
  adminMode = true;
  document.getElementById('tab-admin').style.display = 'flex';
  switchTab('admin');
}

function exitAdmin() {
  adminMode = false;
  document.getElementById('tab-admin').style.display = 'none';
  switchTab('learn');
}

function getAdminApprovals(moduleId) {
  if (!adminApprovals[moduleId]) adminApprovals[moduleId] = { sermonPoints:{}, discernmentQuestions:{}, preAssessment:{}, assessment:{} };
  return adminApprovals[moduleId];
}

function adminSetStatus(moduleId, section, idx, status) {
  getAdminApprovals(moduleId)[section][idx] = status;
  saveAdminState();
  renderAdminModule(moduleId);
}

function saveAdminState() {
  try { localStorage.setItem('inapo_admin', JSON.stringify(adminApprovals)); } catch(e) {}
}

function loadAdminState() {
  try {
    const raw = localStorage.getItem('inapo_admin');
    if (raw) adminApprovals = JSON.parse(raw);
  } catch(e) {}
}

function renderAdminPanel() {
  const moduleIds = Object.keys(MODULES);
  if (!adminSelectedModule) adminSelectedModule = moduleIds[0];

  const tabsEl = document.getElementById('admin-module-tabs');
  tabsEl.innerHTML = moduleIds.map(id => {
    const m = MODULES[id];
    const active = id === adminSelectedModule;
    return `<button onclick="renderAdminModule('${id}')" style="flex-shrink:0;padding:8px 14px;border-radius:100px;border:1.5px solid ${active ? '#6666cc' : '#2d2d4a'};background:${active ? '#2d2d4a' : 'transparent'};color:${active ? '#c0c0ff' : '#5555aa'};font-size:11px;font-weight:700;cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;white-space:nowrap;">${m.title}</button>`;
  }).join('');

  renderAdminModule(adminSelectedModule);
}

function renderAdminModule(moduleId) {
  adminSelectedModule = moduleId;
  const m = MODULES[moduleId];
  const approvals = getAdminApprovals(moduleId);
  let html = '';

  // ── Sermon Points section ──
  if (m.sermonPoints && m.sermonPoints.length) {
    html += adminSectionHTML('Sermon Points', 'format_list_numbered', m.sermonPoints.map((pt, i) => {
      const status = approvals.sermonPoints[i] || 'pending';
      return adminItemHTML(moduleId, 'sermonPoints', i, status, `
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
          <span style="font-size:10px;font-weight:700;color:#8888cc;font-family:'Plus Jakarta Sans',sans-serif;">#${pt.id} · ${pt.timestamp}</span>
        </div>
        <p style="font-size:13px;font-weight:700;color:#e0e0ff;margin-bottom:2px;font-family:'Plus Jakarta Sans',sans-serif;">${pt.title}</p>
        <p style="font-size:12px;color:#8888cc;font-family:'Plus Jakarta Sans',sans-serif;">${pt.summary}</p>
        <a href="${pt.url}" target="_blank" style="font-size:11px;color:#6688cc;font-family:'Plus Jakarta Sans',sans-serif;">Watch at ${pt.timestamp} →</a>
      `);
    }).join(''));
  }

  // ── Pre-Assessment section ──
  if (m.preAssessment && m.preAssessment.length) {
    html += adminSectionHTML('Pre-Assessment', 'quiz', m.preAssessment.map((q, i) => {
      const status = approvals.preAssessment[i] || 'pending';
      const typeLabel = q.type === 'completion' ? 'Fill-in-the-blank' : 'Matching';
      const preview = q.type === 'completion'
        ? `<p style="font-size:13px;color:#e0e0ff;font-family:'Plus Jakarta Sans',sans-serif;line-height:1.5;">${q.sentence}</p><p style="font-size:11px;color:#5566aa;margin-top:4px;font-family:'Plus Jakarta Sans',sans-serif;">Options: ${q.options.join(' · ')} · Correct: ${q.options[q.correct]}</p>`
        : `<p style="font-size:12px;font-weight:600;color:#c0c0ff;font-family:'Plus Jakarta Sans',sans-serif;">${q.instruction}</p>${q.pairs.map(p => `<p style="font-size:11px;color:#7788cc;font-family:'Plus Jakarta Sans',sans-serif;">"${p.left}" → "${p.right}"</p>`).join('')}`;
      return adminItemHTML(moduleId, 'preAssessment', i, status, `
        <span style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#6666cc;background:rgba(102,102,204,0.12);padding:2px 7px;border-radius:100px;font-family:'Plus Jakarta Sans',sans-serif;">${typeLabel}</span>
        <div style="margin-top:8px;">${preview}</div>
        <p style="font-size:11px;color:#5566aa;margin-top:6px;font-style:italic;font-family:'Plus Jakarta Sans',sans-serif;">${q.explanation}</p>
      `);
    }).join(''));
  }

  // ── Post-Assessment section ──
  if (m.assessment && m.assessment.length) {
    html += adminSectionHTML('Post-Assessment', 'fact_check', m.assessment.map((q, i) => {
      const status = approvals.assessment[i] || 'approved';
      return adminItemHTML(moduleId, 'assessment', i, status, `
        <p style="font-size:13px;font-weight:600;color:#e0e0ff;line-height:1.4;margin-bottom:6px;font-family:'Plus Jakarta Sans',sans-serif;">${q.q}</p>
        ${q.options.map((opt, oi) => `<p style="font-size:11px;color:${oi === q.correct ? '#66cc88' : '#5566aa'};font-family:'Plus Jakarta Sans',sans-serif;">${oi === q.correct ? '✓' : '·'} ${opt}</p>`).join('')}
        <p style="font-size:11px;color:#5566aa;margin-top:6px;font-style:italic;font-family:'Plus Jakarta Sans',sans-serif;">${q.explanation}</p>
      `);
    }).join(''));
  }

  // ── Discernment Questions section ──
  if (m.discernmentQuestions && m.discernmentQuestions.length) {
    const total = m.discernmentQuestions.length;
    const approved = m.discernmentQuestions.filter((_,i) => (approvals.discernmentQuestions[i] || 'approved') === 'approved').length;
    html += adminSectionHTML(`Discernment Library · ${approved}/${total} approved`, 'balance', m.discernmentQuestions.map((q, i) => {
      const status = approvals.discernmentQuestions[i] || 'approved';
      return adminItemHTML(moduleId, 'discernmentQuestions', i, status, `
        <span style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#8888cc;font-family:'Plus Jakarta Sans',sans-serif;">${q.topic} · Frame ${q.correct}</span>
        <p style="font-size:13px;color:#e0e0ff;line-height:1.5;margin-top:4px;font-family:'Plus Jakarta Sans',sans-serif;">${q.text}</p>
        ${q.mirrorNote ? `<p style="font-size:11px;color:#5566aa;margin-top:4px;font-style:italic;font-family:'Plus Jakarta Sans',sans-serif;">"${q.mirrorNote}"</p>` : ''}
      `);
    }).join(''));
  }

  document.getElementById('admin-content').innerHTML = html || '<p style="color:#5555aa;padding:20px;font-family:Plus Jakarta Sans,sans-serif;">No content to review for this module.</p>';

  // Re-render module tabs to show selection state
  const moduleIds = Object.keys(MODULES);
  document.getElementById('admin-module-tabs').innerHTML = moduleIds.map(id => {
    const mod = MODULES[id];
    const active = id === adminSelectedModule;
    return `<button onclick="renderAdminModule('${id}')" style="flex-shrink:0;padding:8px 14px;border-radius:100px;border:1.5px solid ${active ? '#6666cc' : '#2d2d4a'};background:${active ? '#2d2d4a' : 'transparent'};color:${active ? '#c0c0ff' : '#5555aa'};font-size:11px;font-weight:700;cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;white-space:nowrap;">${mod.title}</button>`;
  }).join('');
}

function adminSectionHTML(title, icon, itemsHTML) {
  return `<div style="margin-bottom:20px;">
    <div style="display:flex;align-items:center;gap:6px;margin-bottom:10px;">
      <span class="material-symbols-outlined" style="font-size:16px;color:#6666cc;">${icon}</span>
      <p style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#6666cc;font-family:'Plus Jakarta Sans',sans-serif;">${title}</p>
    </div>
    <div style="display:flex;flex-direction:column;gap:8px;">${itemsHTML}</div>
  </div>`;
}

function adminItemHTML(moduleId, section, idx, status, contentHTML) {
  const colors = { approved: '#1F4D2F', pending: '#B8860B', rejected: '#A0523D' };
  const bgColors = { approved: 'rgba(31,77,47,0.12)', pending: 'rgba(184,134,11,0.12)', rejected: 'rgba(160,82,61,0.12)' };
  const labels = { approved: 'Approved', pending: 'Pending', rejected: 'Rejected' };
  const c = colors[status] || colors.pending;
  const bg = bgColors[status] || bgColors.pending;
  return `<div style="background:#16162a;border-radius:12px;padding:14px;border:1px solid #2d2d4a;">
    <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px;">
      <div style="flex:1;">${contentHTML}</div>
      <div style="display:flex;flex-direction:column;align-items:flex-end;gap:6px;flex-shrink:0;">
        <span style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:${c};background:${bg};padding:2px 8px;border-radius:100px;font-family:'Plus Jakarta Sans',sans-serif;">${labels[status]}</span>
        <div style="display:flex;gap:4px;">
          <button onclick="adminSetStatus('${moduleId}','${section}',${idx},'approved')" style="font-size:10px;padding:4px 8px;border-radius:6px;cursor:pointer;background:${status==='approved' ? '#1F4D2F' : 'transparent'};color:${status==='approved' ? '#fff' : '#1F4D2F'};border:1px solid #1F4D2F;font-family:'Plus Jakarta Sans',sans-serif;font-weight:700;">✓</button>
          <button onclick="adminSetStatus('${moduleId}','${section}',${idx},'pending')" style="font-size:10px;padding:4px 8px;border-radius:6px;cursor:pointer;background:${status==='pending' ? '#B8860B' : 'transparent'};color:${status==='pending' ? '#fff' : '#B8860B'};border:1px solid #B8860B;font-family:'Plus Jakarta Sans',sans-serif;font-weight:700;">?</button>
          <button onclick="adminSetStatus('${moduleId}','${section}',${idx},'rejected')" style="font-size:10px;padding:4px 8px;border-radius:6px;cursor:pointer;background:${status==='rejected' ? '#A0523D' : 'transparent'};color:${status==='rejected' ? '#fff' : '#A0523D'};border:1px solid #A0523D;font-family:'Plus Jakarta Sans',sans-serif;font-weight:700;">✗</button>
        </div>
      </div>
    </div>
  </div>`;
}

// ── NAVIGATION ────────────────────────────────────────────────────────────────
function switchTab(tab) {
  currentTab = tab;
  ['screen-sort','screen-learn','screen-growth','screen-admin'].forEach(id => {
    document.getElementById(id).classList.remove('active');
  });
  ['tab-discern','tab-learn','tab-growth','tab-admin'].forEach(id => {
    document.getElementById(id).classList.remove('active');
  });
  document.getElementById('bottom-nav').style.display = 'block';

  const screenMap = { discern:'screen-sort', learn:'screen-learn', growth:'screen-growth', admin:'screen-admin' };
  const tabMap    = { discern:'tab-discern', learn:'tab-learn',    growth:'tab-growth',    admin:'tab-admin' };
  document.getElementById(screenMap[tab]).classList.add('active');
  document.getElementById(tabMap[tab]).classList.add('active');


  if (tab === 'growth') updateGrowthScreen();
  if (tab === 'learn')  updateModuleCards();
  if (tab === 'admin')  renderAdminPanel();
}

function openModule(id) {
  const m = MODULES[id];
  if (!m) return;
  lastTab = currentTab;
  moduleState = {
    moduleId:id, step:0,
    preAssessIntroSeen:false,
    preAssessIdx:0, preAssessAnswers:[], preAssessDone:false, preAssessQState:null,
    preSortIdx:0, preSortPlaced:[], preSortDone:false,
    extractViewed:false,
    sortIdx:0, sortPlaced:[], sortDone:false,
    customSortCards:[],
    mirrorIdx:0, mirrorSecond:[], mirrorPhase:'sort', mirrorDone:false,
    formationPage:0, formationDone:false,
    libraryDone:false,
    assessIdx:0, assessAnswers:[], assessDone:false,
  };
  document.getElementById('module-series-label').textContent = m.series;
  document.getElementById('module-title-label').textContent  = m.title;
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('screen-module').classList.add('active');
  document.getElementById('bottom-nav').style.display = 'none';
  history.pushState({ inModule: true, moduleId: id }, '');
  renderPipelineStep();
}

function goBack() {
  document.getElementById('screen-module').classList.remove('active');
  document.getElementById('bottom-nav').style.display = 'block';
  switchTab(lastTab);
}

// ── PIPELINE ──────────────────────────────────────────────────────────────────
function renderPipelineStep() {
  const step = moduleState.step;
  const m    = MODULES[moduleState.moduleId];
  document.getElementById('module-step-label').textContent = `${step + 1} / ${PIPELINE_STEPS.length}`;

  const dotsEl = document.getElementById('step-dots');
  dotsEl.innerHTML = PIPELINE_STEPS.map((s, i) => {
    let bg, color;
    if (i < step)      { bg = '#1F4D2F'; color = '#fff'; }
    else if (i === step) { bg = '#0B3D91'; color = '#fff'; }
    else               { bg = '#EFEFED'; color = '#7A7570'; }
    const iconHtml = `<span class="material-symbols-outlined" style="font-size:13px;${i <= step ? 'font-variation-settings:\'FILL\' 1,\'wght\' 500,\'GRAD\' 0,\'opsz\' 24;' : ''}">${s.icon}</span>`;
    return `<div style="display:inline-flex;align-items:center;gap:4px;padding:4px 10px;border-radius:20px;background:${bg};color:${color};font-size:10px;font-weight:700;white-space:nowrap;flex-shrink:0;font-family:'Plus Jakarta Sans',sans-serif;">${iconHtml}${s.label}</div>`;
  }).join('');

  const content = document.getElementById('pipeline-content');
  content.innerHTML = '';
  content.scrollTop = 0;

  const renderers = [renderPreSort, renderWatchSort, renderMirror, renderFormation, renderLibrary, renderAssess];
  if (renderers[step]) renderers[step](m, content);
}

function advancePipeline() {
  if (moduleState.step < PIPELINE_STEPS.length - 1) {
    moduleState.step++;
    renderPipelineStep();
    saveState();
  }
}

// ── STEP 1: PRE-ASSESSMENT (fill-blank + matching) ───────────────────────────
function renderPreSort(m, el) { renderPreAssess(m, el); } // alias for pipeline dispatcher

function renderPreAssess(m, el) {
  if (moduleState.preAssessDone) { el.innerHTML = preAssessSummaryHTML(m); return; }

  if (!moduleState.preAssessIntroSeen) {
    const qs = m.preAssessment || [];
    el.innerHTML = `
      <div style="padding:24px 20px;">
        <div style="display:flex;align-items:center;justify-content:center;width:56px;height:56px;background:#dae2ff44;border-radius:16px;margin:0 auto 16px;border:1px solid #b1c5ff;">
          <span class="material-symbols-outlined icon-fill" style="font-size:28px;color:#0B3D91;">quiz</span>
        </div>
        <h2 style="font-family:'Playfair Display',serif;font-size:22px;font-weight:700;text-align:center;margin-bottom:8px;color:#1c1c19;">Pre-Check</h2>
        <p style="font-size:13px;color:#7A7570;text-align:center;line-height:1.6;margin-bottom:24px;">Before diving in, let's see what you already know. There are ${qs.length} quick question${qs.length !== 1 ? 's' : ''} — no pressure, just calibration.</p>
        <div style="background:#f6f3ee;border-radius:14px;padding:14px 16px;margin-bottom:24px;">
          <div style="display:flex;align-items:flex-start;gap:10px;margin-bottom:8px;">
            <span class="material-symbols-outlined icon-fill" style="font-size:16px;color:#0B3D91;margin-top:1px;">info</span>
            <p style="font-size:12px;color:#434652;line-height:1.5;">Your answers won't be graded — they help personalise the module and show your growth at the end.</p>
          </div>
        </div>
        <button onclick="preAssessStartQuestions()" style="width:100%;background:#0B3D91;color:#fff;border:none;border-radius:100px;padding:14px;font-size:14px;font-weight:700;cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;">
          Begin Pre-Check →
        </button>
      </div>`;
    return;
  }

  const idx   = moduleState.preAssessIdx;
  const qs    = m.preAssessment || [];
  const total = qs.length;

  if (idx >= total) {
    moduleState.preAssessDone = true;
    el.innerHTML = preAssessSummaryHTML(m);
    return;
  }

  const q = qs[idx];
  moduleState.preAssessQState = moduleState.preAssessQState || buildPreAssessQState(q);

  if (q.type === 'completion') {
    renderCompletionQ(m, el, q, idx, total);
  } else if (q.type === 'match') {
    renderMatchQ(m, el, q, idx, total);
  }
}

function preAssessStartQuestions() {
  moduleState.preAssessIntroSeen = true;
  const m = MODULES[moduleState.moduleId];
  renderPreAssess(m, document.getElementById('pipeline-content'));
}

function buildPreAssessQState(q) {
  if (q.type === 'match') {
    const order = q.pairs.map((_,i) => i).sort(() => Math.random() - 0.5);
    return { selected: null, connections: [], rightOrder: order, checked: false };
  }
  return { selected: null, submitted: false };
}

function renderCompletionQ(m, el, q, idx, total) {
  const state = moduleState.preAssessQState;
  const submitted = state.submitted;

  const sentence = q.sentence.replace('___', submitted
    ? `<span style="border-bottom:2px solid ${state.selected === q.correct ? '#1F4D2F' : '#A0523D'};color:${state.selected === q.correct ? '#1F4D2F' : '#A0523D'};font-weight:700;">${q.options[state.selected]}</span>`
    : `<span style="border-bottom:2px dashed #0B3D91;color:#0B3D91;font-weight:700;padding:0 4px;">${state.selected !== null ? q.options[state.selected] : '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'}</span>`
  );

  el.innerHTML = `<div class="fade-in">
    <p style="font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#7A7570;margin-bottom:4px;">Pre-Check · ${idx + 1} of ${total}</p>
    <div class="progress-bar" style="margin-bottom:20px;"><div class="progress-fill" style="width:${(idx/total)*100}%"></div></div>
    <p style="font-size:12px;color:#7A7570;margin-bottom:12px;">Fill in the blank — test your prior knowledge before watching.</p>
    <div style="background:#fff;border-radius:16px;padding:20px;border:1.5px solid #c4c6d3;margin-bottom:20px;">
      <p style="font-family:'Playfair Display',serif;font-size:18px;font-weight:700;line-height:1.55;color:#2A2824;">${sentence}</p>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px;" id="pa-opts">
      ${q.options.map((opt, i) => {
        let style = `background:#fff;border:1.5px solid #c4c6d3;border-radius:14px;padding:14px 12px;font-size:13px;font-weight:600;cursor:${submitted ? 'default' : 'pointer'};font-family:'Plus Jakarta Sans',sans-serif;text-align:left;transition:all 0.15s;`;
        if (submitted) {
          if (i === q.correct) style += 'background:#e8f5e9;border-color:#1F4D2F;color:#1F4D2F;';
          else if (i === state.selected) style += 'background:#fdecea;border-color:#A0523D;color:#A0523D;';
          else style += 'opacity:0.45;';
        } else if (i === state.selected) {
          style += 'background:#dae2ff;border-color:#0B3D91;color:#0B3D91;';
        }
        return `<button style="${style}" onclick="paSelectOption(${i})" ${submitted ? 'disabled' : ''}>${opt}</button>`;
      }).join('')}
    </div>
    ${submitted ? `
    <div style="background:#f4f3f1;border-radius:12px;padding:14px;margin-bottom:14px;">
      <p style="font-size:10px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#7A7570;margin-bottom:6px;">Why this matters</p>
      <p style="font-size:13px;color:#52504B;line-height:1.65;">${q.explanation}</p>
    </div>
    <button onclick="paNext()" style="background:#0B3D91;color:#fff;border-radius:100px;padding:14px;font-size:14px;font-weight:700;cursor:pointer;width:100%;font-family:'Plus Jakarta Sans',sans-serif;">
      ${idx + 1 < total ? 'Next Question →' : 'See Results →'}
    </button>` : `
    <button onclick="paSubmitCompletion()" ${state.selected === null ? 'disabled' : ''} style="background:${state.selected !== null ? '#0B3D91' : '#c4c6d3'};color:#fff;border-radius:100px;padding:14px;font-size:14px;font-weight:700;cursor:${state.selected !== null ? 'pointer' : 'default'};width:100%;font-family:'Plus Jakarta Sans',sans-serif;">
      Check Answer
    </button>`}
  </div>`;
}

function renderMatchQ(m, el, q, idx, total) {
  const state = moduleState.preAssessQState;
  const { connections, rightOrder, checked, selected } = state;
  const allConnected = connections.length === q.pairs.length;

  const rightItems = rightOrder.map(i => q.pairs[i].right);

  const leftHTML = q.pairs.map((pair, li) => {
    const conn = connections.find(c => c.left === li);
    const isConnected = !!conn;
    const isSelected = selected === li && !isConnected;
    let borderColor = '#c4c6d3';
    if (checked && isConnected) borderColor = conn.left === conn.right ? '#1F4D2F' : '#A0523D';
    else if (isConnected) borderColor = '#0B3D91';
    else if (isSelected) borderColor = '#0B3D91';
    const bg = isSelected ? '#dae2ff' : isConnected ? (checked ? (conn.left === conn.right ? '#e8f5e9' : '#fdecea') : 'rgba(11,61,145,0.06)') : '#fff';
    return `<button onclick="paMatchLeft(${li})" ${(isConnected || checked) ? 'disabled' : ''} style="width:100%;text-align:left;background:${bg};border:1.5px solid ${borderColor};border-radius:12px;padding:12px;font-size:12px;font-weight:600;color:#2A2824;cursor:${(isConnected || checked) ? 'default' : 'pointer'};font-family:'Plus Jakarta Sans',sans-serif;line-height:1.4;">
      ${isConnected ? `<span style="font-size:10px;font-weight:700;color:${checked ? (conn.left === conn.right ? '#1F4D2F' : '#A0523D') : '#0B3D91'};display:block;margin-bottom:3px;">${checked ? (conn.left === conn.right ? '✓' : '✗') : '→'}</span>` : ''}
      ${pair.left}
    </button>`;
  }).join('');

  const rightHTML = rightItems.map((text, ri) => {
    const realIdx = rightOrder[ri];
    const conn = connections.find(c => c.right === realIdx);
    const isConnected = !!conn;
    const isSel = selected !== null && !isConnected;
    const bg = isConnected ? (checked ? (conn.left === conn.right ? '#e8f5e9' : '#fdecea') : 'rgba(11,61,145,0.06)') : (isSel ? '#fffbf3' : '#f4f3f1');
    const borderColor = isConnected ? (checked ? (conn.left === conn.right ? '#1F4D2F' : '#A0523D') : '#0B3D91') : (isSel ? '#D4A574' : '#EFEFED');
    return `<button onclick="paMatchRight(${realIdx})" ${(isConnected || selected === null || checked) ? 'disabled' : ''} style="width:100%;text-align:left;background:${bg};border:1.5px solid ${borderColor};border-radius:12px;padding:12px;font-size:12px;color:#52504B;cursor:${(isConnected || selected === null || checked) ? 'default' : 'pointer'};font-family:'Plus Jakarta Sans',sans-serif;line-height:1.4;">${text}</button>`;
  }).join('');

  el.innerHTML = `<div class="fade-in">
    <p style="font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#7A7570;margin-bottom:4px;">Pre-Check · ${idx + 1} of ${total}</p>
    <div class="progress-bar" style="margin-bottom:20px;"><div class="progress-fill" style="width:${(idx/total)*100}%"></div></div>
    <p style="font-size:13px;font-weight:600;color:#2A2824;margin-bottom:14px;">${q.instruction}</p>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:16px;">
      <div style="display:flex;flex-direction:column;gap:8px;">${leftHTML}</div>
      <div style="display:flex;flex-direction:column;gap:8px;">${rightHTML}</div>
    </div>
    ${checked ? `
    <div style="background:#f4f3f1;border-radius:12px;padding:14px;margin-bottom:14px;">
      <p style="font-size:10px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#7A7570;margin-bottom:6px;">The connection</p>
      <p style="font-size:13px;color:#52504B;line-height:1.65;">${q.explanation}</p>
    </div>
    <button onclick="paNext()" style="background:#0B3D91;color:#fff;border-radius:100px;padding:14px;font-size:14px;font-weight:700;cursor:pointer;width:100%;font-family:'Plus Jakarta Sans',sans-serif;">
      ${idx + 1 < total ? 'Next Question →' : 'See Results →'}
    </button>` : `
    <button onclick="paCheckMatch()" ${!allConnected ? 'disabled' : ''} style="background:${allConnected ? '#0B3D91' : '#c4c6d3'};color:#fff;border-radius:100px;padding:14px;font-size:14px;font-weight:700;cursor:${allConnected ? 'pointer' : 'default'};width:100%;font-family:'Plus Jakarta Sans',sans-serif;">
      ${allConnected ? 'Check Answers' : `Connect all pairs (${connections.length}/${q.pairs.length})`}
    </button>`}
  </div>`;
}

function paSelectOption(i) {
  const state = moduleState.preAssessQState;
  if (state.submitted) return;
  state.selected = i;
  const m = MODULES[moduleState.moduleId];
  renderPreAssess(m, document.getElementById('pipeline-content'));
}

function paSubmitCompletion() {
  const state = moduleState.preAssessQState;
  if (state.selected === null) return;
  state.submitted = true;
  const q = MODULES[moduleState.moduleId].preAssessment[moduleState.preAssessIdx];
  moduleState.preAssessAnswers.push({ type:'completion', selected: state.selected, correct: q.correct });
  renderPreAssess(MODULES[moduleState.moduleId], document.getElementById('pipeline-content'));
}

function paMatchLeft(li) {
  const state = moduleState.preAssessQState;
  if (state.checked) return;
  state.selected = li;
  renderPreAssess(MODULES[moduleState.moduleId], document.getElementById('pipeline-content'));
}

function paMatchRight(ri) {
  const state = moduleState.preAssessQState;
  if (state.selected === null || state.checked) return;
  state.connections.push({ left: state.selected, right: ri });
  state.selected = null;
  renderPreAssess(MODULES[moduleState.moduleId], document.getElementById('pipeline-content'));
}

function paCheckMatch() {
  const state = moduleState.preAssessQState;
  state.checked = true;
  const correct = state.connections.filter(c => c.left === c.right).length;
  const q = MODULES[moduleState.moduleId].preAssessment[moduleState.preAssessIdx];
  moduleState.preAssessAnswers.push({ type:'match', correct, total: q.pairs.length });
  renderPreAssess(MODULES[moduleState.moduleId], document.getElementById('pipeline-content'));
}

function paNext() {
  moduleState.preAssessIdx++;
  moduleState.preAssessQState = null;
  const m = MODULES[moduleState.moduleId];
  if (moduleState.preAssessIdx >= (m.preAssessment || []).length) {
    moduleState.preAssessDone = true;
  }
  renderPreAssess(m, document.getElementById('pipeline-content'));
}

function preAssessSummaryHTML(m) {
  const answers = moduleState.preAssessAnswers;
  let totalQ = 0, totalCorrect = 0;
  answers.forEach(a => {
    if (a.type === 'completion') { totalQ++; if (a.selected === a.correct) totalCorrect++; }
    else if (a.type === 'match') { totalQ += a.total; totalCorrect += a.correct; }
  });
  const pct = totalQ > 0 ? Math.round((totalCorrect / totalQ) * 100) : 0;
  return `<div class="fade-in">
    <div style="background:#fff;border-radius:20px;padding:24px;border:1.5px solid #D4A574;text-align:center;margin-bottom:20px;" class="lifted">
      <div style="width:52px;height:52px;background:#dae2ff;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 14px;">
        <span class="material-symbols-outlined icon-fill" style="color:#0B3D91;font-size:26px;">quiz</span>
      </div>
      <h2 style="font-family:'Playfair Display',serif;font-size:22px;font-weight:700;color:#0B3D91;margin-bottom:6px;">Pre-Check Complete</h2>
      <p style="font-size:14px;color:#52504B;margin-bottom:4px;">${totalCorrect} of ${totalQ} correct — ${pct}%</p>
      <p style="font-size:12px;color:#7A7570;line-height:1.5;">Now watch the sermon. Notice how your understanding deepens.</p>
    </div>
    <button onclick="advancePipeline()" style="background:#0B3D91;color:#fff;border-radius:100px;padding:14px;font-size:14px;font-weight:700;cursor:pointer;width:100%;font-family:'Plus Jakarta Sans',sans-serif;">
      Watch the Sermon →
    </button>
  </div>`;
}

// ── STEP 2: WATCH + SORT (combined, video-preserving) ────────────────────────
function timestampToSeconds(ts) {
  const parts = ts.split(':').map(Number);
  return parts.length === 3 ? parts[0]*3600 + parts[1]*60 + parts[2] : parts[0]*60 + parts[1];
}

function playExtractAt(videoId, timestamp) {
  const seconds = timestampToSeconds(timestamp);
  const sep = videoId.includes('?') ? '&' : '?';
  const iframe = document.getElementById('extract-player-iframe');
  if (!iframe) return;
  iframe.src = `https://www.youtube.com/embed/${videoId}${sep}start=${seconds}&autoplay=1`;
  iframe.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function renderExtractSortFrameButtons(containerId, callback) {
  window._esFrameCallback = callback;
  const el = document.getElementById(containerId);
  if (!el) return;
  const shortNames = ['', 'Essential', 'Lies', 'Non-Ess.', 'Wisdom', 'Unclean'];
  el.innerHTML = [1,2,3,4,5].map(i => {
    let iconInner;
    if (FRAME_ICONS[i] === '≈') {
      iconInner = `<div style="font-size:18px;color:${FRAME_COLORS[i]};font-weight:700;line-height:1;">≈</div>`;
    } else {
      const fill = FRAME_FILL[i] ? `font-variation-settings:'FILL' 1,'wght' 400,'GRAD' 0,'opsz' 24;` : '';
      iconInner = `<span class="material-symbols-outlined" style="font-size:20px;color:${FRAME_COLORS[i]};${fill}">${FRAME_ICONS[i]}</span>`;
    }
    return `<button onclick="window._esFrameCallback(${i})"
        style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;padding:10px 4px;background:${FRAME_BG[i]};border:1px solid ${FRAME_COLORS[i]}33;border-radius:12px;cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;">
        ${iconInner}
        <span style="font-size:8px;font-weight:700;text-transform:uppercase;letter-spacing:0.04em;color:${FRAME_COLORS[i]};line-height:1.2;text-align:center;">${shortNames[i]}</span>
      </button>`;
  }).join('');
}

function renderWatchSortCardsHTML(m) {
  const placedCount = moduleState.sortPlaced.length;
  const totalItems  = m.sortStatements.length;
  const allDone     = moduleState.sortDone;
  const cards = m.arguments.map((arg, i) => {
    const stmt     = m.sortStatements[i];
    const isPlaced = i < placedCount;
    const isActive = i === placedCount && !allDone;
    const pFrame   = isPlaced ? moduleState.sortPlaced[i].placed : null;

    const isHearted = heartedItems.some(h => h.moduleId === m.id && h.argIdx === i);
    const heartFill = isHearted ? "'FILL' 1,'wght' 400,'GRAD' 0,'opsz' 24" : "'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24";
    const heartColor = isHearted ? '#c0392b' : '#7A7570';
    const noteText = watchNotes[`${m.id}:${i}`] || '';
    const noteOpen = noteText ? 'block' : 'none';

    // Escape single quotes in the quote for inline onclick
    const escapedQuote = arg.text.replace(/'/g, "\\'");

    const actionRow = isPlaced ? `
      <div style="display:flex;align-items:center;justify-content:flex-end;gap:4px;margin-top:10px;padding-top:8px;border-top:1px solid #EFEFED;">
        <button onclick="toggleWatchNote('${m.id}',${i})" title="Add a note"
          style="display:flex;align-items:center;gap:4px;background:none;border:none;cursor:pointer;padding:5px 8px;border-radius:8px;color:#7A7570;font-family:'Plus Jakarta Sans',sans-serif;font-size:11px;font-weight:600;">
          <span class="material-symbols-outlined" style="font-size:17px;">edit_note</span>
          Note
        </button>
        <button id="wh-${m.id}-${i}" onclick="toggleWatchHeart('${m.id}',${i},'${escapedQuote}','${arg.timestamp}')" title="Add to altar of your heart"
          style="display:flex;align-items:center;gap:4px;background:none;border:none;cursor:pointer;padding:5px 8px;border-radius:8px;color:${heartColor};font-family:'Plus Jakarta Sans',sans-serif;font-size:11px;font-weight:600;">
          <span class="material-symbols-outlined" style="font-size:17px;color:${heartColor};font-variation-settings:${heartFill};">favorite</span>
          ${isHearted ? 'Loved' : 'Love'}
        </button>
      </div>
      <div id="wn-${m.id}-${i}" style="display:${noteOpen};margin-top:8px;">
        <textarea rows="3" placeholder="Your note on this point…"
          oninput="watchNotes['${m.id}:${i}']=this.value"
          style="width:100%;background:#f8f7f5;border:1px solid #D4A574;border-radius:8px;padding:10px;font-size:13px;font-family:'Plus Jakarta Sans',sans-serif;color:#2A2824;resize:none;line-height:1.5;box-sizing:border-box;">${noteText}</textarea>
      </div>` : '';

    return `
      <div id="ws-card-${i}" style="background:#fff;border-radius:14px;padding:14px;margin-bottom:10px;border:1.5px solid ${isPlaced ? FRAME_COLORS[pFrame] : (isActive ? '#0B3D91' : '#EFEFED')};${i > placedCount && !allDone ? 'opacity:0.45;' : ''}">
        <div style="display:flex;gap:10px;align-items:flex-start;${isActive ? 'margin-bottom:12px;' : ''}">
          <button onclick="playExtractAt('${m.videoId}','${arg.timestamp}')"
            style="width:30px;height:30px;background:${isPlaced ? FRAME_COLORS[pFrame] : (isActive ? '#0B3D91' : '#f4f3f1')};border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:11px;font-weight:700;color:${isPlaced || isActive ? '#fff' : '#7A7570'};border:none;cursor:pointer;">
            ${isPlaced ? '<span class="material-symbols-outlined" style="font-size:14px;color:#fff;">check</span>' : (i + 1)}
          </button>
          <div style="flex:1;min-width:0;">
            <p style="font-family:'Playfair Display',serif;font-size:15px;font-weight:700;color:#2A2824;line-height:1.4;margin-bottom:5px;">${stmt.text}</p>
            <button onclick="playExtractAt('${m.videoId}','${arg.timestamp}')" style="background:none;border:none;cursor:pointer;padding:0;display:flex;align-items:center;gap:4px;">
              <span class="material-symbols-outlined" style="font-size:13px;color:#0B3D91;">play_circle</span>
              <span style="font-size:11px;color:#0B3D91;font-weight:700;font-family:'Plus Jakarta Sans',sans-serif;">${arg.timestamp}</span>
            </button>
          </div>
          ${isPlaced ? `<span style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:${FRAME_COLORS[pFrame]};font-family:'Plus Jakarta Sans',sans-serif;flex-shrink:0;padding-top:3px;">${FRAME_NAMES[pFrame]}</span>` : ''}
        </div>
        ${isActive ? `<div id="es-frame-list" style="display:grid;grid-template-columns:repeat(5,1fr);gap:6px;"></div>` : ''}
        ${actionRow}
      </div>`;
  }).join('');
  const customCards = (moduleState.customSortCards || []).map((card, idx) => {
    const isPlaced  = card.placed !== null;
    const pFrame    = card.placed;
    const cwKey     = `${m.id}:cws:${idx}`;
    const noteText  = watchNotes[cwKey] || '';
    const noteOpen  = noteText ? 'block' : 'none';
    const isHearted = heartedItems.some(h => h.moduleId === m.id && h.argIdx === `cws:${idx}`);
    const heartFill = isHearted ? "'FILL' 1,'wght' 400,'GRAD' 0,'opsz' 24" : "'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24";
    const heartColor = isHearted ? '#c0392b' : '#7A7570';
    const escapedText = card.text.replace(/'/g, "\\'");

    const inlineFrameBtns = isPlaced ? '' : `
      <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:6px;margin-top:10px;">
        ${[1,2,3,4,5].map(i => {
          const iconInner = FRAME_ICONS[i] === '≈'
            ? `<div style="font-size:18px;color:${FRAME_COLORS[i]};font-weight:700;line-height:1;">≈</div>`
            : `<span class="material-symbols-outlined" style="font-size:20px;color:${FRAME_COLORS[i]};${FRAME_FILL[i] ? "font-variation-settings:'FILL' 1,'wght' 400,'GRAD' 0,'opsz' 24;" : ''}">${FRAME_ICONS[i]}</span>`;
          return `<button onclick="sortCustomCard(${idx},${i})"
            style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;padding:10px 4px;background:${FRAME_BG[i]};border:1px solid ${FRAME_COLORS[i]}33;border-radius:12px;cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;">
            ${iconInner}
            <span style="font-size:8px;font-weight:700;text-transform:uppercase;letter-spacing:0.04em;color:${FRAME_COLORS[i]};line-height:1.2;text-align:center;">${['','Essential','Lies','Non-Ess.','Wisdom','Unclean'][i]}</span>
          </button>`;
        }).join('')}
      </div>`;

    const actionRow = isPlaced ? `
      <div style="display:flex;align-items:center;justify-content:flex-end;gap:4px;margin-top:10px;padding-top:8px;border-top:1px solid #EFEFED;">
        <button onclick="toggleCustomCardNote(${idx},'${m.id}')" title="Add a note"
          style="display:flex;align-items:center;gap:4px;background:none;border:none;cursor:pointer;padding:5px 8px;border-radius:8px;color:#7A7570;font-family:'Plus Jakarta Sans',sans-serif;font-size:11px;font-weight:600;">
          <span class="material-symbols-outlined" style="font-size:17px;">edit_note</span>
          Note
        </button>
        <button id="cwh-${idx}" onclick="toggleCustomCardHeart(${idx},'${m.id}','${escapedText}','${card.timestamp}')" title="Add to altar of your heart"
          style="display:flex;align-items:center;gap:4px;background:none;border:none;cursor:pointer;padding:5px 8px;border-radius:8px;color:${heartColor};font-family:'Plus Jakarta Sans',sans-serif;font-size:11px;font-weight:600;">
          <span class="material-symbols-outlined" style="font-size:17px;color:${heartColor};font-variation-settings:${heartFill};">favorite</span>
          ${isHearted ? 'Loved' : 'Love'}
        </button>
      </div>
      <div id="cwn-${idx}" style="display:${noteOpen};margin-top:8px;">
        <textarea rows="3" placeholder="Your note on this statement…"
          oninput="watchNotes['${cwKey}']=this.value"
          style="width:100%;background:#f8f7f5;border:1px solid #D4A574;border-radius:8px;padding:10px;font-size:13px;font-family:'Plus Jakarta Sans',sans-serif;color:#2A2824;resize:none;line-height:1.5;box-sizing:border-box;">${noteText}</textarea>
      </div>` : '';

    return `
      <div id="cws-card-${idx}" style="background:#fff;border-radius:14px;padding:14px;margin-bottom:10px;border:1.5px solid ${isPlaced ? FRAME_COLORS[pFrame] : '#D4A574'};">
        <div style="display:flex;gap:10px;align-items:flex-start;">
          <div style="width:30px;height:30px;background:#fffbf3;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;border:1px solid #D4A574;">
            <span class="material-symbols-outlined" style="font-size:15px;color:#B8860B;">add_circle</span>
          </div>
          <div style="flex:1;min-width:0;">
            <p style="font-size:9px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#B8860B;margin-bottom:5px;">My Statement</p>
            <p style="font-family:'Playfair Display',serif;font-size:15px;font-weight:700;color:#2A2824;line-height:1.4;margin-bottom:6px;">${card.text}</p>
            <button onclick="playExtractAt('${m.videoId}','${card.timestamp}')" style="background:none;border:none;cursor:pointer;padding:0;display:flex;align-items:center;gap:4px;">
              <span class="material-symbols-outlined" style="font-size:13px;color:#0B3D91;">play_circle</span>
              <span style="font-size:11px;color:#0B3D91;font-weight:700;font-family:'Plus Jakarta Sans',sans-serif;">${card.timestamp}</span>
            </button>
          </div>
          <div style="display:flex;flex-direction:column;align-items:flex-end;gap:5px;flex-shrink:0;">
            <button onclick="toggleCustomCardEdit(${idx})" title="Edit this statement"
              style="background:none;border:none;cursor:pointer;padding:3px;display:flex;align-items:center;justify-content:center;border-radius:6px;">
              <span class="material-symbols-outlined" style="font-size:16px;color:#7A7570;">edit</span>
            </button>
            ${isPlaced ? `<span style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:${FRAME_COLORS[pFrame]};font-family:'Plus Jakarta Sans',sans-serif;">${FRAME_NAMES[pFrame]}</span>` : ''}
          </div>
        </div>

        <div id="cws-edit-form-${idx}" style="display:none;margin-top:12px;padding-top:12px;border-top:1px solid #EFEFED;">
          <div style="display:flex;gap:8px;margin-bottom:8px;align-items:flex-start;">
            <div style="width:80px;flex-shrink:0;">
              <p style="font-size:10px;color:#7A7570;margin-bottom:4px;">Timestamp</p>
              <input id="cws-edit-ts-${idx}" type="text" value="${card.timestamp}"
                style="width:100%;background:#fff;border:1px solid #D4A574;border-radius:8px;padding:8px;font-size:13px;font-family:'Plus Jakarta Sans',sans-serif;color:#2A2824;box-sizing:border-box;">
            </div>
            <div style="flex:1;">
              <p style="font-size:10px;color:#7A7570;margin-bottom:4px;">Statement</p>
              <textarea id="cws-edit-text-${idx}" rows="3"
                style="width:100%;background:#fff;border:1px solid #c4c6d3;border-radius:8px;padding:8px;font-size:13px;font-family:'Plus Jakarta Sans',sans-serif;color:#2A2824;resize:none;line-height:1.5;box-sizing:border-box;">${card.text}</textarea>
            </div>
          </div>
          <div style="display:flex;gap:8px;">
            <button onclick="toggleCustomCardEdit(${idx})" style="flex:1;background:transparent;border:1px solid #c4c6d3;border-radius:100px;padding:9px;font-size:13px;font-weight:600;color:#7A7570;cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;">Cancel</button>
            <button onclick="saveCustomCardEdit(${idx})" style="flex:2;background:#0B3D91;color:#fff;border-radius:100px;padding:9px;font-size:13px;font-weight:700;cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;">Save Changes</button>
          </div>
        </div>

        ${inlineFrameBtns}
        ${actionRow}
      </div>`;
  }).join('');

  const doneBtn = allDone
    ? `<button onclick="advancePipeline()" style="background:#0B3D91;color:#fff;border-radius:100px;padding:14px;font-size:14px;font-weight:700;cursor:pointer;width:100%;font-family:'Plus Jakarta Sans',sans-serif;margin-top:4px;">Begin Formation Study →</button>`
    : '';
  return cards + customCards + doneBtn;
}

function toggleWatchHeart(moduleId, argIdx, quote, timestamp) {
  const m = MODULES[moduleId];
  const existingIdx = heartedItems.findIndex(h => h.moduleId === moduleId && h.argIdx === argIdx);
  const btn = document.getElementById(`wh-${moduleId}-${argIdx}`);
  if (existingIdx >= 0) {
    heartedItems.splice(existingIdx, 1);
    if (btn) {
      btn.querySelector('span').style.fontVariationSettings = "'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24";
      btn.querySelector('span').style.color = '#7A7570';
      btn.style.color = '#7A7570';
      btn.childNodes[btn.childNodes.length - 1].textContent = ' Love';
    }
  } else {
    heartedItems.push({ moduleId, argIdx, quote, timestamp, moduleTitle: m ? m.title : moduleId });
    if (btn) {
      btn.querySelector('span').style.fontVariationSettings = "'FILL' 1,'wght' 400,'GRAD' 0,'opsz' 24";
      btn.querySelector('span').style.color = '#c0392b';
      btn.style.color = '#c0392b';
      btn.childNodes[btn.childNodes.length - 1].textContent = ' Loved';
    }
  }
  saveState();
}

function toggleWatchNote(moduleId, argIdx) {
  const el = document.getElementById(`wn-${moduleId}-${argIdx}`);
  if (!el) return;
  const isOpen = el.style.display === 'block';
  el.style.display = isOpen ? 'none' : 'block';
  if (!isOpen) { const ta = el.querySelector('textarea'); if (ta) ta.focus(); }
}

function toggleCustomCardForm() {
  const form = document.getElementById('custom-card-form');
  if (!form) return;
  const isOpen = form.style.display !== 'none';
  form.style.display = isOpen ? 'none' : 'block';
  if (!isOpen) {
    const ts = document.getElementById('custom-ts');
    if (ts) ts.focus();
  }
}

function addCustomCard() {
  const textEl = document.getElementById('custom-text');
  const tsEl   = document.getElementById('custom-ts');
  const text   = textEl ? textEl.value.trim() : '';
  const ts     = tsEl   ? tsEl.value.trim()   : '';

  if (!text) {
    if (textEl) { textEl.style.borderColor = '#A0523D'; textEl.focus(); }
    return;
  }

  moduleState.customSortCards.push({ text, timestamp: ts || '0:00', placed: null });

  if (textEl) { textEl.value = ''; textEl.style.borderColor = '#c4c6d3'; }
  if (tsEl)   { tsEl.value = ''; }
  toggleCustomCardForm();

  const m  = MODULES[moduleState.moduleId];
  const el = document.getElementById('pipeline-content');
  if (m && el) renderWatchSort(m, el);

  setTimeout(() => {
    const newCard = document.getElementById(`cws-card-${moduleState.customSortCards.length - 1}`);
    if (newCard) newCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 80);
  saveState();
}

function sortCustomCard(idx, frame) {
  if (!moduleState.customSortCards[idx]) return;
  moduleState.customSortCards[idx].placed = frame;
  const m  = MODULES[moduleState.moduleId];
  const el = document.getElementById('pipeline-content');
  if (m && el) renderWatchSort(m, el);
  saveState();
}

function toggleCustomCardHeart(idx, moduleId, quote, timestamp) {
  const m = MODULES[moduleId];
  const argIdx = `cws:${idx}`;
  const existingIdx = heartedItems.findIndex(h => h.moduleId === moduleId && h.argIdx === argIdx);
  const btn = document.getElementById(`cwh-${idx}`);
  if (existingIdx >= 0) {
    heartedItems.splice(existingIdx, 1);
    if (btn) {
      btn.querySelector('span').style.fontVariationSettings = "'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24";
      btn.querySelector('span').style.color = '#7A7570';
      btn.style.color = '#7A7570';
      btn.childNodes[btn.childNodes.length - 1].textContent = ' Love';
    }
  } else {
    heartedItems.push({ moduleId, argIdx, quote, timestamp, moduleTitle: m ? m.title : moduleId });
    if (btn) {
      btn.querySelector('span').style.fontVariationSettings = "'FILL' 1,'wght' 400,'GRAD' 0,'opsz' 24";
      btn.querySelector('span').style.color = '#c0392b';
      btn.style.color = '#c0392b';
      btn.childNodes[btn.childNodes.length - 1].textContent = ' Loved';
    }
  }
  saveState();
}

function toggleCustomCardNote(idx, moduleId) {
  const el = document.getElementById(`cwn-${idx}`);
  if (!el) return;
  const isOpen = el.style.display === 'block';
  el.style.display = isOpen ? 'none' : 'block';
  if (!isOpen) { const ta = el.querySelector('textarea'); if (ta) ta.focus(); }
}

function toggleCustomCardEdit(idx) {
  const form = document.getElementById(`cws-edit-form-${idx}`);
  if (!form) return;
  const isOpen = form.style.display !== 'none';
  form.style.display = isOpen ? 'none' : 'block';
  if (!isOpen) {
    const ta = document.getElementById(`cws-edit-text-${idx}`);
    if (ta) { ta.focus(); ta.setSelectionRange(ta.value.length, ta.value.length); }
  }
}

function saveCustomCardEdit(idx) {
  const card = moduleState.customSortCards[idx];
  if (!card) return;
  const textEl = document.getElementById(`cws-edit-text-${idx}`);
  const tsEl   = document.getElementById(`cws-edit-ts-${idx}`);
  const newText = textEl ? textEl.value.trim() : '';
  const newTs   = tsEl   ? tsEl.value.trim()   : '';
  if (!newText) {
    if (textEl) { textEl.style.borderColor = '#A0523D'; textEl.focus(); }
    return;
  }
  card.text      = newText;
  card.timestamp = newTs || card.timestamp;
  const m  = MODULES[moduleState.moduleId];
  const el = document.getElementById('pipeline-content');
  if (m && el) renderWatchSort(m, el);
  saveState();
}

function renderWatchSort(m, el) {
  const placedCount = moduleState.sortPlaced.length;
  const totalItems  = m.sortStatements.length;
  const allDone     = moduleState.sortDone;

  // Build full structure only on the first render — iframe must not be recreated
  // on subsequent calls or YouTube will reload and reset playback position
  if (!document.getElementById('extract-player-iframe')) {
    el.innerHTML = `<div class="fade-in">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px;">
        <p id="ws-step-label" style="font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#7A7570;">
          Watch &amp; Sort · ${placedCount} of ${totalItems} placed
        </p>
      </div>
      <div class="progress-bar" style="margin-bottom:14px;">
        <div id="ws-progress-fill" class="progress-fill" style="width:${(placedCount/totalItems)*100}%"></div>
      </div>

      <p style="font-family:'Playfair Display',serif;font-size:17px;font-weight:700;color:#2A2824;line-height:1.3;margin-bottom:2px;">${m.title}</p>
      <p style="font-size:11px;color:#7A7570;margin-bottom:12px;">${m.scripture}</p>

      <div style="background:#1a1a1a;border-radius:14px;overflow:hidden;margin-bottom:14px;aspect-ratio:16/9;">
        <iframe id="extract-player-iframe" src="https://www.youtube.com/embed/${m.videoId}"
          style="width:100%;height:100%;border:none;"
          allowfullscreen allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture">
        </iframe>
      </div>

      <p style="font-size:12px;color:#52504B;line-height:1.5;margin-bottom:12px;">Tap a number to jump to that moment in the sermon. Place each argument into a frame.</p>

      <button onclick="toggleCustomCardForm()"
        style="width:100%;display:flex;align-items:center;justify-content:center;gap:7px;background:#fffbf3;border:1.5px dashed #D4A574;border-radius:12px;padding:11px;cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;color:#B8860B;font-size:13px;font-weight:700;margin-bottom:10px;">
        <span class="material-symbols-outlined" style="font-size:18px;">add_circle</span>
        Make that a statement
      </button>

      <div id="custom-card-form" style="display:none;background:#fffbf3;border:1px solid #D4A574;border-radius:14px;padding:14px;margin-bottom:12px;">
        <p style="font-size:10px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#B8860B;margin-bottom:10px;">What did you just hear?</p>
        <div style="display:flex;gap:8px;margin-bottom:10px;align-items:flex-start;">
          <div style="width:80px;flex-shrink:0;">
            <p style="font-size:10px;color:#7A7570;margin-bottom:4px;">Timestamp</p>
            <input id="custom-ts" type="text" placeholder="17:40"
              style="width:100%;background:#fff;border:1px solid #D4A574;border-radius:8px;padding:8px;font-size:13px;font-family:'Plus Jakarta Sans',sans-serif;color:#2A2824;box-sizing:border-box;">
          </div>
          <div style="flex:1;">
            <p style="font-size:10px;color:#7A7570;margin-bottom:4px;">Statement</p>
            <textarea id="custom-text" rows="3" placeholder="Write the statement or idea you just heard…"
              style="width:100%;background:#fff;border:1px solid #c4c6d3;border-radius:8px;padding:8px;font-size:13px;font-family:'Plus Jakarta Sans',sans-serif;color:#2A2824;resize:none;line-height:1.5;box-sizing:border-box;"></textarea>
          </div>
        </div>
        <div style="display:flex;gap:8px;">
          <button onclick="toggleCustomCardForm()" style="flex:1;background:transparent;border:1px solid #c4c6d3;border-radius:100px;padding:10px;font-size:13px;font-weight:600;color:#7A7570;cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;">Cancel</button>
          <button onclick="addCustomCard()" style="flex:2;background:#0B3D91;color:#fff;border-radius:100px;padding:10px;font-size:13px;font-weight:700;cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;">Add Statement →</button>
        </div>
      </div>

      <div id="ws-cards"></div>
    </div>`;
  } else {
    // Subsequent renders: update only the progress indicators — never the iframe
    const label = document.getElementById('ws-step-label');
    const fill  = document.getElementById('ws-progress-fill');
    if (label) label.textContent = allDone
      ? 'Watch & Sort · Complete'
      : `Watch & Sort · ${placedCount} of ${totalItems} placed`;
    if (fill) fill.style.width = `${allDone ? 100 : (placedCount / totalItems) * 100}%`;
  }

  // Always re-render the cards section (never touches the iframe)
  const cardsEl = document.getElementById('ws-cards');
  if (cardsEl) cardsEl.innerHTML = renderWatchSortCardsHTML(m);

  if (!allDone && placedCount < totalItems) {
    renderExtractSortFrameButtons('es-frame-list', function(frame) {
      const stmt = m.sortStatements[placedCount];
      moduleState.sortPlaced.push({ stmt, placed: frame });
      moduleState.sortIdx++;
      if (moduleState.sortPlaced.length >= totalItems) {
        moduleState.sortDone = true;
        totalSorted += totalItems;
      }
      renderWatchSort(m, el);
      setTimeout(() => {
        const next = document.getElementById(`ws-card-${moduleState.sortPlaced.length}`);
        if (next) next.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 80);
    });
  }
}

// ── STEP 3: THE MIRROR ───────────────────────────────────────────────────────
function renderMirror(m, el) {
  if (moduleState.mirrorDone) {
    el.innerHTML = `<div class="fade-in">
      <div style="background:#fff;border-radius:20px;padding:24px;border:1.5px solid #D4A574;text-align:center;margin-bottom:20px;" class="lifted">
        <div style="width:52px;height:52px;background:#dae2ff;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 14px;">
          <span class="material-symbols-outlined" style="color:#0B3D91;font-size:26px;">compare_arrows</span>
        </div>
        <h2 style="font-family:'Playfair Display',serif;font-size:22px;font-weight:700;color:#0B3D91;margin-bottom:6px;">Mirror Complete</h2>
        <p style="font-size:14px;color:#52504B;line-height:1.6;">Your reflections have been written to your Growth section.</p>
      </div>
      <button onclick="advancePipeline()" style="background:#0B3D91;color:#fff;border-radius:100px;padding:14px;font-size:14px;font-weight:700;cursor:pointer;width:100%;font-family:'Plus Jakarta Sans',sans-serif;">
        Continue to Formation Study →
      </button>
    </div>`;
    return;
  }

  const idx   = moduleState.mirrorIdx;
  const stmts = m.preSortStatements;
  const total = stmts.length;
  const stmt  = stmts[idx];
  const firstPlaced  = moduleState.preSortPlaced[idx]?.placed; // may be undefined if new pre-assess format
  const secondPlaced = moduleState.mirrorSecond[idx];
  const phase = moduleState.mirrorPhase;

  const firstColor = FRAME_COLORS[firstPlaced] || '#7A7570';
  const firstBg    = FRAME_BG[firstPlaced] || '#f4f3f1';
  const firstName  = FRAME_NAMES[firstPlaced] || '—';
  const hasFirstPlacement = firstPlaced !== undefined;

  const progressPct = (idx / total) * 100;

  if (phase === 'sort') {
    el.innerHTML = `<div class="fade-in">
      <p style="font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#7A7570;margin-bottom:4px;">The Mirror · ${idx + 1} of ${total}</p>
      <div class="progress-bar" style="margin-bottom:16px;"><div class="progress-fill" style="width:${progressPct}%"></div></div>

      ${hasFirstPlacement ? `
      <p style="font-size:10px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#7A7570;margin-bottom:8px;">Before watching, you placed this as:</p>
      <div style="background:#f8f7f5;border-radius:14px;padding:14px;margin-bottom:12px;border:1px solid #EFEFED;">
        <span style="display:inline-block;background:${firstBg};color:${firstColor};font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;padding:3px 9px;border-radius:100px;border:1px solid ${firstColor}33;margin-bottom:8px;">${firstName}</span>
        <p style="font-family:'Playfair Display',serif;font-size:15px;font-style:italic;color:#52504B;line-height:1.55;">${stmt.text}</p>
      </div>

      <div style="display:flex;align-items:center;gap:8px;margin:14px 0;">
        <div style="flex:1;height:1px;background:linear-gradient(to right,transparent,#D4A574,transparent);"></div>
        <div style="display:flex;align-items:center;gap:5px;padding:5px 12px;background:#fffbf3;border:1px solid #D4A574;border-radius:100px;">
          <span class="material-symbols-outlined" style="font-size:14px;color:#B8860B;">compare_arrows</span>
          <span style="font-size:10px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#B8860B;">The Mirror</span>
        </div>
        <div style="flex:1;height:1px;background:linear-gradient(to left,transparent,#D4A574,transparent);"></div>
      </div>

      <p style="font-size:10px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#7A7570;margin-bottom:8px;">Having watched the sermon, place this statement again:</p>` : `
      <p style="font-size:12px;color:#52504B;line-height:1.5;margin-bottom:12px;">Having watched the sermon, sort each statement into a frame. Then reflect on what you're learning.</p>`}

      <div style="background:#fff;border-radius:14px;padding:16px;margin-bottom:14px;border:1.5px solid #D4A574;">
        <p style="font-family:'Playfair Display',serif;font-size:17px;font-weight:700;color:#2A2824;line-height:1.45;">${stmt.text}</p>
      </div>

      <div id="mirror-frame-list" style="display:grid;grid-template-columns:repeat(5,1fr);gap:6px;"></div>
    </div>`;

    renderExtractSortFrameButtons('mirror-frame-list', function(frame) {
      moduleState.mirrorSecond[idx] = frame;
      moduleState.mirrorPhase = 'review';
      el.scrollTop = 0;
      renderMirror(m, el);
    });

  } else {
    const secondColor = FRAME_COLORS[secondPlaced];
    const secondBg    = FRAME_BG[secondPlaced];
    const secondName  = FRAME_NAMES[secondPlaced];
    const mirrorNote  = stmt.mirrorNote || '';
    const changed     = firstPlaced !== secondPlaced;

    const frameOpts = [1,2,3,4,5].map(i =>
      `<option value="${i}" ${i === secondPlaced ? 'selected' : ''}>${FRAME_NAMES[i]}</option>`
    ).join('');

    el.innerHTML = `<div class="fade-in">
      <p style="font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#7A7570;margin-bottom:4px;">The Mirror · ${idx + 1} of ${total}</p>
      <div class="progress-bar" style="margin-bottom:16px;"><div class="progress-fill" style="width:${progressPct}%"></div></div>

      <!-- 1st Assessment card (only when pre-sort data exists) -->
      ${hasFirstPlacement ? `
      <p style="font-size:9px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#7A7570;margin-bottom:6px;">1st Assessment</p>
      <div style="background:#f8f7f5;border-radius:14px;padding:14px;border:1px solid #EFEFED;">
        <span style="display:inline-block;background:${firstBg};color:${firstColor};font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;padding:3px 9px;border-radius:100px;border:1px solid ${firstColor}33;margin-bottom:8px;">${firstName}</span>
        <p style="font-family:'Playfair Display',serif;font-size:14px;font-style:italic;color:#52504B;line-height:1.55;">${stmt.text}</p>
      </div>

      <!-- Mirror divider -->
      <div style="display:flex;align-items:center;gap:8px;margin:10px 0;">
        <div style="flex:1;height:1px;background:linear-gradient(to right,transparent,#D4A574,transparent);"></div>
        ${changed
          ? `<span class="material-symbols-outlined" style="font-size:18px;color:#D4A574;">swap_vert</span>`
          : `<span class="material-symbols-outlined" style="font-size:18px;color:#1F4D2F;">check_circle</span>`}
        <div style="flex:1;height:1px;background:linear-gradient(to left,transparent,#D4A574,transparent);"></div>
      </div>` : ''}

      <!-- After-watching placement -->
      <p style="font-size:9px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#7A7570;margin-bottom:6px;">${hasFirstPlacement ? '2nd Assessment' : 'Your Placement'}</p>
      <div style="background:#fff;border-radius:14px;padding:14px;border:1.5px solid #D4A574;margin-bottom:14px;">
        <span style="display:inline-block;background:${secondBg};color:${secondColor};font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;padding:3px 9px;border-radius:100px;border:1px solid ${secondColor}33;margin-bottom:8px;">${secondName}</span>
        <p style="font-family:'Playfair Display',serif;font-size:14px;font-style:italic;color:#2A2824;line-height:1.55;">${stmt.text}</p>
      </div>

      <!-- Sermon Note -->
      ${mirrorNote ? `<div style="background:#fffbf3;border-radius:12px;padding:14px;border-left:3px solid #D4A574;margin-bottom:14px;position:relative;overflow:hidden;">
        <span class="material-symbols-outlined" style="position:absolute;right:10px;top:8px;font-size:40px;color:#D4A574;opacity:0.15;pointer-events:none;">history_edu</span>
        <p style="font-size:9px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#B8860B;margin-bottom:8px;">Sermon Note</p>
        <p style="font-family:'Playfair Display',serif;font-size:14px;font-style:italic;color:#2A2824;line-height:1.7;">"${mirrorNote}"</p>
      </div>` : ''}

      <!-- Finalize Selection -->
      <div style="margin-bottom:12px;">
        <p style="font-size:10px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#7A7570;margin-bottom:6px;">Finalize Selection</p>
        <div style="position:relative;">
          <select id="mirror-final-frame"
            style="width:100%;appearance:none;background:#fff;border:1.5px solid #D4A574;border-radius:12px;padding:12px 36px 12px 14px;font-size:14px;font-family:'Plus Jakarta Sans',sans-serif;color:#2A2824;cursor:pointer;">
            ${frameOpts}
          </select>
          <span class="material-symbols-outlined" style="position:absolute;right:12px;top:50%;transform:translateY(-50%);font-size:18px;color:#B8860B;pointer-events:none;">expand_more</span>
        </div>
      </div>

      <!-- Reflection -->
      <div style="margin-bottom:16px;">
        <p style="font-size:10px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#7A7570;margin-bottom:6px;">Reflection</p>
        <textarea id="mirror-reflection" rows="3"
          placeholder="Add these notes to your Growth section…"
          style="width:100%;background:#f8f7f5;border:1px solid #c4c6d3;border-radius:10px;padding:12px;font-size:14px;font-family:'Plus Jakarta Sans',sans-serif;color:#2A2824;resize:none;line-height:1.6;box-sizing:border-box;"></textarea>
      </div>

      <button onclick="saveMirrorEntry(${idx},${total})"
        style="background:#0B3D91;color:#fff;border-radius:100px;padding:14px;font-size:14px;font-weight:700;cursor:pointer;width:100%;font-family:'Plus Jakarta Sans',sans-serif;">
        Write to Growth Log &amp; Continue →
      </button>

      <p style="font-family:'Playfair Display',serif;font-size:12px;font-style:italic;color:#7A7570;text-align:center;margin-top:16px;line-height:1.6;">"We all, with unveiled face, beholding the glory of the Lord, are being transformed into the same image."<br>— 2 Corinthians 3:18</p>
    </div>`;
  }
}

function saveMirrorEntry(idx, total) {
  const m    = MODULES[moduleState.moduleId];
  const stmt = m.preSortStatements[idx];
  const finalFrameEl = document.getElementById('mirror-final-frame');
  const reflEl       = document.getElementById('mirror-reflection');
  const finalFrame   = finalFrameEl ? parseInt(finalFrameEl.value) : (moduleState.mirrorSecond[idx] || 1);
  const note         = reflEl ? reflEl.value.trim() : '';

  mirrorLog.push({
    text:        stmt.text,
    topic:       stmt.topic,
    firstFrame:  moduleState.preSortPlaced[idx]?.placed,
    secondFrame: moduleState.mirrorSecond[idx],
    finalFrame,
    note,
    moduleTitle: m.title,
    moduleId:    m.id,
  });

  moduleState.mirrorIdx++;
  moduleState.mirrorPhase = 'sort';

  if (moduleState.mirrorIdx >= total) {
    moduleState.mirrorDone = true;
  }

  const content = document.getElementById('pipeline-content');
  if (content) content.scrollTop = 0;
  saveState();
  renderMirror(m, content || document.getElementById('pipeline-content'));
}

// ── STEP 4: FORMATION ────────────────────────────────────────────────────────
function renderFormation(m, el) {
  const page   = moduleState.formationPage;
  const points = m.formation;
  const pt     = points[page];
  const isLast = page === points.length - 1;
  const ptKey  = `${m.id}:${page}`;
  const reflection = formationReflections[ptKey] || '';

  const scriptureBlock = pt.verseText
    ? `<div style="margin-bottom:16px;">
        <button onclick="toggleScriptureText('${ptKey}')"
          style="display:flex;align-items:center;gap:6px;background:#f4f3f1;border:1px solid #D4A574;border-radius:10px;padding:8px 12px;cursor:pointer;width:100%;text-align:left;font-family:'Plus Jakarta Sans',sans-serif;">
          <span class="material-symbols-outlined" style="font-size:16px;color:#B8860B;flex-shrink:0;">menu_book</span>
          <span style="font-size:12px;font-weight:700;color:#B8860B;flex:1;">${pt.scripture}</span>
          <span class="material-symbols-outlined" id="st-icon-${ptKey}" style="font-size:16px;color:#7A7570;">expand_more</span>
        </button>
        <div id="st-${ptKey}" style="display:none;background:#fffbf3;border:1px solid #D4A574;border-top:none;border-radius:0 0 10px 10px;padding:12px 14px;">
          <p style="font-family:'Playfair Display',serif;font-size:14px;font-style:italic;color:#2A2824;line-height:1.7;">"${pt.verseText}"</p>
          <p style="font-size:11px;font-weight:700;color:#B8860B;margin-top:6px;">— ${pt.scripture}</p>
        </div>
      </div>`
    : `<p style="font-size:11px;color:#7A7570;font-weight:600;margin-bottom:16px;">${pt.scripture}</p>`;

  el.innerHTML = `<div class="fade-in">
    <p style="font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#7A7570;margin-bottom:4px;">Formation · ${page + 1} of ${points.length}</p>
    <div class="progress-bar" style="margin-bottom:20px;"><div class="progress-fill" style="width:${((page+1)/points.length)*100}%"></div></div>
    <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:16px;">
      <div style="width:44px;height:44px;background:#0B3D91;border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
        <span class="material-symbols-outlined icon-fill" style="color:#fff;font-size:22px;">${pt.icon}</span>
      </div>
      <div>
        <h2 style="font-family:'Playfair Display',serif;font-size:22px;font-weight:700;color:#2A2824;line-height:1.3;">${pt.title}</h2>
      </div>
    </div>
    ${scriptureBlock}
    <div class="formation-point">
      <p style="font-size:15px;color:#2A2824;line-height:1.75;">${pt.body}</p>
    </div>
    <div style="margin-top:20px;border-top:1px solid #EFEFED;padding-top:16px;">
      <p style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#7A7570;margin-bottom:8px;">What is this saying in my life?</p>
      <textarea rows="4" placeholder="Write your personal reflection…"
        oninput="formationReflections['${ptKey}']=this.value"
        style="width:100%;background:#f8f7f5;border:1px solid #c4c6d3;border-radius:10px;padding:12px;font-size:14px;font-family:'Plus Jakarta Sans',sans-serif;color:#2A2824;resize:none;line-height:1.6;box-sizing:border-box;">${reflection}</textarea>
    </div>
    <div style="height:20px;"></div>
    <button onclick="${isLast ? 'formationDone()' : 'formationNext()'}"
      style="background:#0B3D91;color:#fff;border-radius:100px;padding:14px;font-size:14px;font-weight:700;cursor:pointer;width:100%;font-family:'Plus Jakarta Sans',sans-serif;">
      ${isLast ? 'View My Stones →' : 'Next Point →'}
    </button>
    ${page > 0 ? `<button onclick="formationPrev()" style="background:transparent;color:#7A7570;border:1px solid #c4c6d3;border-radius:100px;padding:12px;font-size:13px;cursor:pointer;width:100%;margin-top:8px;font-family:'Plus Jakarta Sans',sans-serif;">← Previous</button>` : ''}
  </div>`;
}

function toggleScriptureText(ptKey) {
  const panel = document.getElementById(`st-${ptKey}`);
  const icon  = document.getElementById(`st-icon-${ptKey}`);
  if (!panel) return;
  const open = panel.style.display !== 'none';
  panel.style.display = open ? 'none' : 'block';
  if (icon) icon.textContent = open ? 'expand_more' : 'expand_less';
}

function formationNext() {
  moduleState.formationPage++;
  renderFormation(MODULES[moduleState.moduleId], document.getElementById('pipeline-content'));
}
function formationPrev() {
  if (moduleState.formationPage > 0) {
    moduleState.formationPage--;
    renderFormation(MODULES[moduleState.moduleId], document.getElementById('pipeline-content'));
  }
}
function formationDone() {
  moduleState.formationDone = true;
  advancePipeline();
}

// ── STEP 5: LIBRARY ──────────────────────────────────────────────────────────
function toggleLibraryFavorite(idx) {
  if (!libraryItems[idx]) return;
  libraryItems[idx].favorited = !libraryItems[idx].favorited;
  const btn = document.getElementById(`lib-fav-${idx}`);
  if (btn) {
    btn.querySelector('span').style.fontVariationSettings = libraryItems[idx].favorited
      ? "'FILL' 1,'wght' 400,'GRAD' 0,'opsz' 24"
      : "'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24";
    btn.querySelector('span').style.color = libraryItems[idx].favorited ? '#c0392b' : '#7A7570';
  }
}

function toggleLibraryNotes(idx) {
  if (!libraryItems[idx]) return;
  const wrap = document.getElementById(`lib-notes-${idx}`);
  if (!wrap) return;
  const open = wrap.style.display === 'block';
  wrap.style.display = open ? 'none' : 'block';
  if (!open) wrap.querySelector('textarea').focus();
}

function renderLibrary(m, el) {
  if (!moduleState.libraryDone) {
    moduleState.sortPlaced.forEach(p => {
      if (!libraryItems.find(l => l.text === p.stmt.text)) {
        libraryItems.push({ text:p.stmt.text, frame:p.placed, correct:p.stmt.correct, module:m.title, favorited:false, notes:'' });
      }
    });
    (moduleState.customSortCards || []).forEach(card => {
      if (card.placed !== null && !libraryItems.find(l => l.text === card.text)) {
        libraryItems.push({ text:card.text, frame:card.placed, correct:null, module:m.title, favorited:false, notes:'', isCustom:true });
      }
    });
    moduleState.libraryDone = true;
    saveState();
  }

  el.innerHTML = `<div class="fade-in">
    <p style="font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#7A7570;margin-bottom:6px;">Foundation · Stones Laid</p>
    <h2 style="font-family:'Playfair Display',serif;font-size:20px;font-weight:700;color:#2A2824;margin-bottom:8px;line-height:1.3;">The Stones of My Foundation</h2>
    <p style="font-family:'Playfair Display',serif;font-size:13px;font-style:italic;color:#7A7570;line-height:1.6;margin-bottom:16px;border-left:3px solid #D4A574;padding-left:12px;">
      "Build the altar of the LORD your God with whole stones — stones no iron tool has touched."<br>
      <span style="font-size:11px;font-style:normal;">Deuteronomy 27:6</span>
    </p>
    ${libraryItems.map((item, idx) => {
      const favFill = item.favorited ? "'FILL' 1,'wght' 400,'GRAD' 0,'opsz' 24" : "'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24";
      const favColor = item.favorited ? '#c0392b' : '#7A7570';
      return `
      <div style="background:#fff;border-radius:14px;padding:14px;margin-bottom:10px;border:1.5px solid ${FRAME_COLORS[item.frame]}33;">
        <div style="display:flex;gap:10px;align-items:flex-start;">
          <div style="width:28px;height:28px;border-radius:8px;background:${FRAME_BG[item.frame]};display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px;">
            ${FRAME_ICONS[item.frame] === '≈'
              ? `<div style="font-size:14px;color:${FRAME_COLORS[item.frame]};font-weight:700;line-height:1;">≈</div>`
              : `<span class="material-symbols-outlined" style="font-size:15px;color:${FRAME_COLORS[item.frame]};${FRAME_FILL[item.frame] ? "font-variation-settings:'FILL' 1,'wght' 400,'GRAD' 0,'opsz' 24;" : ''}">${FRAME_ICONS[item.frame]}</span>`
            }
          </div>
          <div style="flex:1;min-width:0;">
            <p style="font-size:9px;font-weight:700;color:${FRAME_COLORS[item.frame]};text-transform:uppercase;letter-spacing:0.07em;margin-bottom:4px;">${FRAME_NAMES[item.frame]}</p>
            <p style="font-family:'Playfair Display',serif;font-size:14px;color:#2A2824;line-height:1.5;margin-bottom:4px;">${item.text}</p>
            <p style="font-size:11px;color:#7A7570;">From: ${item.module}</p>
          </div>
          <div style="display:flex;flex-direction:column;gap:6px;flex-shrink:0;">
            <button id="lib-fav-${idx}" onclick="toggleLibraryFavorite(${idx})"
              title="Add to altar of your heart"
              style="background:none;border:none;cursor:pointer;padding:4px;display:flex;align-items:center;justify-content:center;">
              <span class="material-symbols-outlined" style="font-size:20px;color:${favColor};font-variation-settings:${favFill};">favorite</span>
            </button>
            <button onclick="toggleLibraryNotes(${idx})"
              title="Personal notes"
              style="background:none;border:none;cursor:pointer;padding:4px;display:flex;align-items:center;justify-content:center;">
              <span class="material-symbols-outlined" style="font-size:20px;color:#7A7570;">edit_note</span>
            </button>
          </div>
        </div>
        <div id="lib-notes-${idx}" style="display:${item.notes ? 'block' : 'none'};margin-top:10px;">
          <textarea rows="3" placeholder="Your reflections on this stone..."
            onchange="libraryItems[${idx}].notes=this.value"
            style="width:100%;background:#f8f7f5;border:1px solid #D4A574;border-radius:8px;padding:10px;font-size:13px;font-family:'Plus Jakarta Sans',sans-serif;color:#2A2824;resize:none;line-height:1.5;">${item.notes}</textarea>
        </div>
      </div>`;
    }).join('')}
    <div style="height:16px;"></div>
    <button onclick="advancePipeline()" style="background:#0B3D91;color:#fff;border-radius:100px;padding:14px;font-size:14px;font-weight:700;cursor:pointer;width:100%;font-family:'Plus Jakarta Sans',sans-serif;">
      Take the Assessment →
    </button>
  </div>`;
}

// ── STEP 6: ASSESS ───────────────────────────────────────────────────────────
function renderAssess(m, el) {
  if (moduleState.assessDone) { renderAssessResults(m, el); return; }

  const idx   = moduleState.assessIdx;
  const q     = m.assessment[idx];
  const total = m.assessment.length;

  el.innerHTML = `<div class="fade-in">
    <p style="font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#7A7570;margin-bottom:4px;">Assessment · ${idx + 1} of ${total}</p>
    <div class="progress-bar" style="margin-bottom:20px;"><div class="progress-fill" style="width:${(idx/total)*100}%"></div></div>
    <p style="font-family:'Playfair Display',serif;font-size:20px;font-weight:700;color:#2A2824;line-height:1.4;margin-bottom:20px;">${q.q}</p>
    <div id="assess-opts">
      ${q.options.map((opt, i) => `<button class="assess-option" id="ao-${i}" onclick="selectAssessOption(${idx},${i})">${opt}</button>`).join('')}
    </div>
    <div id="assess-expl" style="display:none;background:#f4f3f1;border-radius:12px;padding:14px;margin-top:4px;">
      <p style="font-size:13px;color:#52504B;line-height:1.65;">${q.explanation}</p>
    </div>
    <button id="assess-next" style="display:none;background:#0B3D91;color:#fff;border-radius:100px;padding:14px;font-size:14px;font-weight:700;cursor:pointer;width:100%;margin-top:12px;font-family:'Plus Jakarta Sans',sans-serif;"
      onclick="assessNext(${total})">
      ${idx + 1 < total ? 'Next Question →' : 'See Results →'}
    </button>
  </div>`;
}

function selectAssessOption(qIdx, optIdx) {
  const m = MODULES[moduleState.moduleId];
  const q = m.assessment[qIdx];
  moduleState.assessAnswers[qIdx] = optIdx;

  q.options.forEach((_, i) => {
    const btn = document.getElementById(`ao-${i}`);
    if (!btn) return;
    btn.disabled = true;
    if (i === q.correct) btn.className = 'assess-option correct';
    else if (i === optIdx) btn.className = 'assess-option wrong';
  });

  document.getElementById('assess-expl').style.display = 'block';
  document.getElementById('assess-next').style.display = 'block';
}

function assessNext(total) {
  moduleState.assessIdx++;
  if (moduleState.assessIdx >= total) moduleState.assessDone = true;
  renderAssess(MODULES[moduleState.moduleId], document.getElementById('pipeline-content'));
}

function renderAssessResults(m, el) {
  const answers = moduleState.assessAnswers;
  const total   = m.assessment.length;
  const correct = answers.filter((a, i) => a === m.assessment[i].correct).length;
  const pct     = Math.round((correct / total) * 100);
  modulesComplete++;
  completedModules[m.id] = true;
  populateFormationPool(m);
  addModuleDiscernQuestions(m);
  saveState();

  const color  = pct >= 80 ? '#1F4D2F' : pct >= 60 ? '#0B3D91' : '#A0523D';
  const icon   = pct >= 80 ? 'verified' : 'fact_check';
  const msg    = pct >= 80
    ? "Excellent formation. You've internalized the core arguments of this module."
    : pct >= 60
    ? "Good start. Review the formation points and revisit the module if needed."
    : "Keep going. The wilderness takes time. Review the formation and try again.";

  el.innerHTML = `<div class="fade-in">
    <div style="background:#fff;border-radius:20px;padding:24px;border:1.5px solid #D4A574;text-align:center;margin-bottom:20px;" class="lifted">
      <div style="width:64px;height:64px;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;background:${color};">
        <span class="material-symbols-outlined icon-fill" style="color:#fff;font-size:30px;">${icon}</span>
      </div>
      <h2 style="font-family:'Playfair Display',serif;font-size:24px;font-weight:700;color:#0B3D91;margin-bottom:4px;">${correct} / ${total} Correct</h2>
      <p style="font-family:'Playfair Display',serif;font-size:36px;font-weight:700;color:#2A2824;margin-bottom:10px;">${pct}%</p>
      <p style="font-size:13px;color:#52504B;line-height:1.6;">${msg}</p>
    </div>
    <div style="background:#fff;border-radius:16px;padding:16px;border:1px solid #c4c6d3;margin-bottom:16px;">
      ${m.assessment.map((q, i) => {
        const ok = answers[i] === q.correct;
        return `<div style="padding:10px 0;${i > 0 ? 'border-top:1px solid #EFEFED;' : ''}">
          <div style="display:flex;gap:8px;align-items:flex-start;">
            <span class="material-symbols-outlined icon-fill" style="font-size:16px;color:${ok ? '#1F4D2F' : '#A0523D'};flex-shrink:0;margin-top:2px;">${ok ? 'check_circle' : 'cancel'}</span>
            <div>
              <p style="font-size:13px;color:#2A2824;line-height:1.4;">${q.q}</p>
              ${!ok ? `<p style="font-size:11px;color:#1F4D2F;margin-top:3px;">✓ ${q.options[q.correct]}</p>` : ''}
            </div>
          </div>
        </div>`;
      }).join('')}
    </div>
    <button onclick="goBack()" style="background:#0B3D91;color:#fff;border-radius:100px;padding:14px;font-size:14px;font-weight:700;cursor:pointer;width:100%;margin-bottom:8px;font-family:'Plus Jakarta Sans',sans-serif;">
      Back to Learn
    </button>
    <button onclick="switchTab('growth')" style="background:transparent;color:#0B3D91;border:1.5px solid #0B3D91;border-radius:100px;padding:12px;font-size:13px;font-weight:700;cursor:pointer;width:100%;font-family:'Plus Jakarta Sans',sans-serif;">
      View Growth →
    </button>
  </div>`;
}

// ── FRAME BUTTONS ─────────────────────────────────────────────────────────────
function renderFrameButtons(containerId, callback) {
  window._frameCallback = callback;
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = [1,2,3,4,5].map(i => {
    let iconInner;
    if (FRAME_ICONS[i] === '≈') {
      iconInner = `<div style="font-size:20px;color:${FRAME_COLORS[i]};font-weight:700;line-height:1;">≈</div>`;
    } else {
      const fillStyle = FRAME_FILL[i] ? `font-variation-settings:'FILL' 1,'wght' 400,'GRAD' 0,'opsz' 24;` : '';
      iconInner = `<span class="material-symbols-outlined" style="font-size:20px;color:${FRAME_COLORS[i]};${fillStyle}">${FRAME_ICONS[i]}</span>`;
    }
    return `
    <button class="frame-btn" onclick="window._frameCallback(${i})"
      style="width:100%;display:flex;align-items:center;gap:12px;padding:12px 14px;background:#fff;border:1.5px solid #c4c6d3;border-radius:16px;cursor:pointer;text-align:left;box-shadow:0 2px 6px rgba(42,40,36,0.06);">
      <span style="width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;background:${FRAME_BG[i]};">
        ${iconInner}
      </span>
      <div style="flex:1;min-width:0;">
        <p style="font-size:13px;font-weight:700;color:${FRAME_COLORS[i]};margin-bottom:1px;">${FRAME_NAMES[i]}</p>
        <p style="font-size:11px;color:#52504B;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${FRAME_DESCS[i]}</p>
      </div>
      <span class="material-symbols-outlined" style="font-size:16px;color:#c4c6d3;flex-shrink:0;">chevron_right</span>
    </button>`;
  }).join('');
}

// ── DISCERN SORT ENGINE ───────────────────────────────────────────────────────
function initDiscernSort() {
  const poolStmts = discernLibrary.map(q => ({ text:q.text, topic:q.topic, correct:q.correct, community:q.community, mirrorNote:q.mirrorNote }));
  const stmts = [...GENERAL_STATEMENTS, ...poolStmts].sort(() => Math.random() - 0.5);
  discernState = { statements:stmts, idx:0, placed:[], streak:0 };

  document.getElementById('sort-complete').style.display      = 'none';
  document.getElementById('sort-card-area').style.display     = 'block';
  closeBreakdown();
  document.getElementById('sort-frame-buttons').style.display = 'block';

  renderDiscernCard();
  renderDiscernFrameButtons();
  setupSortCardDrag();
}

let _sortDragReady = false;
function setupSortCardDrag() {
  if (_sortDragReady) return;
  _sortDragReady = true;
  const card = document.getElementById('sort-card');
  if (!card) return;
  let startX = 0, isDragging = false;

  function onStart(e) {
    if (_breakdownOpen) return;
    isDragging = true;
    startX = e.type === 'touchstart' ? e.touches[0].pageX : e.pageX;
    card.style.transition = 'none';
    card.classList.remove('sort-float');
  }
  function onMove(e) {
    if (!isDragging) return;
    const x = e.type === 'touchmove' ? e.touches[0].pageX : e.pageX;
    const walk = x - startX;
    card.style.transform = `translateX(${walk}px) rotate(${walk / 30}deg)`;
  }
  function onEnd() {
    if (!isDragging) return;
    isDragging = false;
    card.style.transition = 'transform 0.5s cubic-bezier(0.23,1,0.32,1)';
    card.style.transform = '';
    setTimeout(() => { if (!isDragging) card.classList.add('sort-float'); }, 500);
  }

  card.addEventListener('mousedown', onStart);
  card.addEventListener('touchstart', onStart, { passive: true });
  document.addEventListener('mousemove', onMove);
  document.addEventListener('touchmove', onMove, { passive: true });
  document.addEventListener('mouseup', onEnd);
  document.addEventListener('touchend', onEnd);
}

function renderDiscernFrameButtons() {
  renderFrameButtons('frame-list', discernPlace);
}

function renderDiscernCard() {
  const stmt  = discernState.statements[discernState.idx];
  const total = discernState.statements.length;
  if (!stmt) return;

  document.getElementById('sort-card-text').textContent  = stmt.text;
  document.getElementById('sort-card-topic').textContent = stmt.topic;
  document.getElementById('sort-counter').textContent    = `${discernState.idx} / ${total}`;
  document.getElementById('sort-progress').style.width   = `${(discernState.idx / total) * 100}%`;

  const card = document.getElementById('sort-card');
  card.style.transition = 'none';
  card.style.transform  = '';
  card.classList.remove('sort-float');
  void card.offsetWidth;
  card.classList.add('sort-float');

  closeBreakdown();
}

function discernPlace(frame) {
  const stmt = discernState.statements[discernState.idx];
  discernState.placed.push({ stmt, placed:frame });

  const ok = frame === stmt.correct;
  discernState.streak = ok ? discernState.streak + 1 : 0;
  discernState.maxStreak = Math.max(discernState.maxStreak || 0, discernState.streak);
  totalSorted++;
  document.getElementById('sort-streak').textContent = discernState.streak;

  showCommunityBreakdown(stmt, frame);
}

function closeBreakdown() {
  const el = document.getElementById('community-breakdown');
  const bd = document.getElementById('community-backdrop');
  el.classList.remove('sheet-open');
  bd.style.display = 'none';
  _breakdownOpen = false;
}

function showCommunityBreakdown(stmt, placed) {
  const el   = document.getElementById('community-breakdown');
  const bars = document.getElementById('community-bars');
  const badge = document.getElementById('placed-badge');
  const total = stmt.community.reduce((a, b) => a + b, 0);

  bars.innerHTML = [1,2,3,4,5].map(i => {
    const pct = Math.round((stmt.community[i-1] / total) * 100);
    return `<div style="display:flex;align-items:center;gap:8px;margin-bottom:7px;">
      <span style="font-size:10px;font-weight:700;color:${FRAME_COLORS[i]};width:100px;flex-shrink:0;">${FRAME_NAMES[i]}</span>
      <div style="flex:1;height:5px;background:#EFEFED;border-radius:3px;overflow:hidden;">
        <div style="height:100%;width:${pct}%;background:${FRAME_COLORS[i]};border-radius:3px;transition:width 0.5s ease;"></div>
      </div>
      <span style="font-size:10px;color:#7A7570;width:28px;text-align:right;">${pct}%</span>
    </div>`;
  }).join('');

  const ok = placed === stmt.correct;
  const badgeIcon = FRAME_ICONS[placed] === '≈'
    ? `<span style="font-size:15px;color:${FRAME_COLORS[placed]};font-weight:700;">≈</span>`
    : `<span class="material-symbols-outlined${FRAME_FILL[placed] ? ' icon-fill' : ''}" style="font-size:15px;color:${FRAME_COLORS[placed]};">${FRAME_ICONS[placed]}</span>`;
  badge.innerHTML = `
    ${badgeIcon}
    <span style="font-size:12px;font-weight:700;color:${FRAME_COLORS[placed]};">You: ${FRAME_NAMES[placed]}</span>
    <span style="font-size:11px;color:${ok ? '#1F4D2F' : '#A0523D'};font-weight:600;">${ok ? '✓ Correct' : `Answer: ${FRAME_NAMES[stmt.correct]}`}</span>
  `;

  document.getElementById('sort-frame-buttons').style.display = 'none';
  document.getElementById('community-backdrop').style.display = 'block';
  el.classList.add('sheet-open');
  _breakdownOpen = true;
}

function nextCard() {
  discernState.idx++;
  const total = discernState.statements.length;

  if (discernState.idx >= total) {
    // Save completed session to persistent log
    discernLog.push(...discernState.placed);
    saveState();
    closeBreakdown();
    document.getElementById('sort-card-area').style.display  = 'none';
    document.getElementById('sort-complete').style.display   = 'block';
    document.getElementById('sort-counter').textContent      = `${total} / ${total}`;
    document.getElementById('sort-progress').style.width     = '100%';
    renderSortResults();
    return;
  }

  closeBreakdown();
  document.getElementById('sort-frame-buttons').style.display  = 'block';
  renderDiscernCard();
}

function renderSortResults() {
  const list = document.getElementById('sort-results-list');
  const placed = discernState.placed;
  const correct = placed.filter(p => p.placed === p.stmt.correct).length;
  const pct = placed.length > 0 ? Math.round((correct / placed.length) * 100) : 0;
  const maxStreak = discernState.maxStreak || 0;
  const scoreColor = pct >= 80 ? '#1F4D2F' : pct >= 60 ? '#0B3D91' : '#A0523D';
  const scoreMsg = pct >= 80 ? 'Sharp discernment.' : pct >= 60 ? 'Good instincts.' : 'Keep training.';

  list.innerHTML = `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px;">
      <div style="background:#fff;border-radius:16px;padding:16px;text-align:center;border:1px solid #c4c6d3;" class="mono-shadow">
        <p style="font-family:'Playfair Display',serif;font-size:34px;font-weight:700;color:${scoreColor};line-height:1;">${pct}%</p>
        <p style="font-size:11px;color:#7A7570;font-weight:600;margin-top:4px;">Accuracy</p>
        <p style="font-size:11px;color:${scoreColor};font-weight:600;margin-top:2px;">${scoreMsg}</p>
      </div>
      <div style="display:flex;flex-direction:column;gap:10px;">
        <div style="flex:1;background:#fff;border-radius:12px;padding:12px;text-align:center;border:1px solid #c4c6d3;display:flex;flex-direction:column;align-items:center;justify-content:center;" class="mono-shadow">
          <p style="font-family:'Playfair Display',serif;font-size:26px;font-weight:700;color:#0B3D91;line-height:1;">${placed.length}</p>
          <p style="font-size:10px;color:#7A7570;font-weight:600;margin-top:3px;">Sorted</p>
        </div>
        <div style="flex:1;background:#fff;border-radius:12px;padding:12px;text-align:center;border:1px solid ${maxStreak >= 5 ? '#D4A574' : '#c4c6d3'};display:flex;flex-direction:column;align-items:center;justify-content:center;" class="mono-shadow">
          <p style="font-family:'Playfair Display',serif;font-size:26px;font-weight:700;color:${maxStreak >= 5 ? '#B8860B' : '#0B3D91'};line-height:1;">${maxStreak}</p>
          <p style="font-size:10px;color:#7A7570;font-weight:600;margin-top:3px;">Best Streak</p>
        </div>
      </div>
    </div>
    <div style="background:#fff;border-radius:16px;padding:16px;border:1px solid #c4c6d3;margin-bottom:10px;" class="mono-shadow">
      <p style="font-size:11px;font-weight:700;color:#7A7570;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:10px;">Statement Breakdown</p>
      ${placed.map(p => {
        const ok = p.placed === p.stmt.correct;
        return `<div style="padding:8px 0;border-bottom:1px solid #EFEFED;display:flex;gap:8px;align-items:flex-start;">
          <span class="material-symbols-outlined icon-fill" style="font-size:14px;color:${ok ? '#1F4D2F' : '#A0523D'};flex-shrink:0;margin-top:2px;">${ok ? 'check_circle' : 'cancel'}</span>
          <div style="flex:1;min-width:0;">
            <p style="font-size:12px;color:#2A2824;line-height:1.4;margin-bottom:2px;">${p.stmt.text.length > 80 ? p.stmt.text.slice(0,80)+'…' : p.stmt.text}</p>
            <p style="font-size:10px;color:${ok ? '#1F4D2F' : '#A0523D'};font-weight:600;">${ok ? FRAME_NAMES[p.placed] : `You: ${FRAME_NAMES[p.placed]} · Correct: ${FRAME_NAMES[p.stmt.correct]}`}</p>
          </div>
        </div>`;
      }).join('')}
    </div>`;
}

function resetDiscern() {
  document.getElementById('sort-results-list').innerHTML = '';
  initDiscernSort();
}

// ── LEARN TAB CARD STATES ─────────────────────────────────────────────────────
function updateModuleCards() {
  const idsAndColors = [
    ['built-different',   '#002869'],
    ['egypt',             '#002869'],
    ['victory-valley',    '#002869'],
    ['how-to-seek-god',   '#1F4D2F'],
    ['demonic-ranks',     '#1F4D2F'],
  ];
  idsAndColors.forEach(([id, color]) => {
    const btnEl    = document.getElementById(`mc-cta-${id}`);
    const statusEl = document.getElementById(`mc-status-${id}`);
    if (!btnEl) return;
    if (completedModules[id]) {
      btnEl.textContent    = 'Review ↺';
      btnEl.style.background = '#1F4D2F';
      if (statusEl) statusEl.innerHTML = `
        <div style="display:inline-flex;align-items:center;gap:5px;background:#e8f5e9;border:1px solid rgba(31,77,47,0.25);border-radius:100px;padding:3px 10px;margin-bottom:10px;">
          <span class="material-symbols-outlined icon-fill" style="font-size:13px;color:#1F4D2F;">check_circle</span>
          <span style="font-size:11px;font-weight:700;color:#1F4D2F;font-family:'Plus Jakarta Sans',sans-serif;">Complete</span>
        </div>`;
    } else {
      btnEl.textContent    = 'Begin →';
      btnEl.style.background = color;
      if (statusEl) statusEl.innerHTML = '';
    }
  });
}

// ── GROWTH SCREEN ─────────────────────────────────────────────────────────────
// ── FORMATION POOL ────────────────────────────────────────────────────────────
function poolEffectiveWeight(item) {
  return Math.max(item.userFloor, item.algorithmWeight);
}

function getPoolItemStatus(item) {
  if (item.userFloor > item.algorithmWeight)
    return { label:'Anchored',      icon:'lock',          color:'#1F4D2F', bg:'#d4edda' };
  const eff = poolEffectiveWeight(item);
  if (eff >= 8)
    return { label:'High Priority', icon:'priority_high', color:'#8B4513', bg:'#fecb97' };
  if (eff >= 5)
    return { label:'Maintenance',   icon:'repeat',        color:'#0B3D91', bg:'#dae2ff' };
  return   { label:'Resting',       icon:'bedtime',       color:'#7A7570', bg:'#f4f3f1' };
}

function renderPoolDots(item) {
  const floor = item.userFloor;
  const algo  = item.algorithmWeight;
  return [1,2,3,4,5,6,7,8,9,10].map(n => {
    let bg, border;
    if (n <= floor) {
      bg = '#D4A574'; border = '#D4A574';
    } else if (n <= algo) {
      bg = 'rgba(11,61,145,0.18)'; border = '#0B3D91';
    } else {
      bg = 'transparent'; border = '#c4c6d3';
    }
    return `<button onclick="setPoolItemFloor('${item.id}',${n})" title="Set floor to ${n}"
      style="width:22px;height:22px;border-radius:3px;cursor:pointer;background:${bg};border:1.5px solid ${border};flex-shrink:0;padding:0;"></button>`;
  }).join('');
}

function poolItemCardHTML(item) {
  const status = getPoolItemStatus(item);
  const fc = FRAME_COLORS[item.frame] || '#7A7570';
  const fb = FRAME_BG[item.frame]    || '#f4f3f1';
  const fn = FRAME_NAMES[item.frame] || '—';
  const sourceLabel = {
    'watch-sort-review':  'Watch & Sort · Needs Review',
    'watch-sort-correct': 'Watch & Sort · Correct',
    'pre-sort-incorrect': 'Pre-Sort · Incorrect',
    'mirror':             'The Mirror',
    'custom':             'My Statement',
  }[item.source] || item.source;
  const noteText = item.userFloor > item.algorithmWeight
    ? `Anchored above algorithm (${item.algorithmWeight})`
    : item.algorithmWeight > item.userFloor
    ? `Algorithm suggests ${item.algorithmWeight} · Your floor: ${item.userFloor}`
    : `Frequency: ${poolEffectiveWeight(item)} of 10`;

  return `
    <div style="background:#fff;border-radius:14px;padding:14px;margin-bottom:12px;border:1.5px solid ${fc}22;box-shadow:0 2px 8px rgba(42,40,36,0.05);">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">
        <span style="background:${fb};color:${fc};font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;padding:3px 10px;border-radius:100px;border:1px solid ${fc}33;">${fn}</span>
        <span id="pool-status-${item.id}" style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:${status.color};background:${status.bg};padding:3px 8px;border-radius:100px;display:inline-flex;align-items:center;gap:3px;">
          <span class="material-symbols-outlined" style="font-size:11px;">${status.icon}</span>${status.label}
        </span>
      </div>
      <p style="font-family:'Playfair Display',serif;font-size:14px;font-style:italic;color:#2A2824;line-height:1.55;margin-bottom:8px;">"${item.text}"</p>
      <p style="font-size:11px;color:#7A7570;margin-bottom:14px;">${item.moduleTitle} · ${sourceLabel}</p>
      <div>
        <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
          <span style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.07em;color:#D4A574;">Your Floor</span>
          <span style="font-size:10px;font-weight:600;color:#52504B;">Algorithm: ${item.algorithmWeight}</span>
        </div>
        <div id="pool-dots-${item.id}" style="display:flex;gap:4px;">${renderPoolDots(item)}</div>
        <p id="pool-note-${item.id}" style="font-size:10px;color:#7A7570;margin-top:6px;font-style:italic;">${noteText}</p>
      </div>
      <div style="margin-top:10px;padding-top:10px;border-top:1px solid #EFEFED;display:flex;justify-content:flex-end;">
        <button onclick="removeFromPool('${item.id}')" style="background:none;border:none;cursor:pointer;font-size:11px;color:#7A7570;font-family:'Plus Jakarta Sans',sans-serif;display:flex;align-items:center;gap:3px;">
          <span class="material-symbols-outlined" style="font-size:14px;">remove_circle_outline</span>Remove
        </button>
      </div>
    </div>`;
}

function renderFormationPool() {
  const el = document.getElementById('growth-pool-list');
  if (!el) return;
  if (formationPool.length === 0) {
    el.innerHTML = `
      <div style="text-align:center;padding:24px 0;">
        <span class="material-symbols-outlined" style="font-size:36px;color:#c4c6d3;display:block;margin-bottom:10px;">inbox</span>
        <p style="font-size:13px;color:#7A7570;line-height:1.6;">Your formation pool fills as you complete modules. The content you need to revisit most will surface here, weighted by your performance and engagement.</p>
      </div>`;
    return;
  }
  const sorted = [...formationPool].sort((a, b) => poolEffectiveWeight(b) - poolEffectiveWeight(a));
  const high   = sorted.filter(x => { const s = getPoolItemStatus(x); return s.label === 'High Priority'; });
  const anchor = sorted.filter(x => { const s = getPoolItemStatus(x); return s.label === 'Anchored'; });
  const maint  = sorted.filter(x => { const s = getPoolItemStatus(x); return s.label === 'Maintenance'; });
  const rest   = sorted.filter(x => { const s = getPoolItemStatus(x); return s.label === 'Resting'; });
  let html = '';
  const sectionHdr = (label, mt) =>
    `<p style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#7A7570;margin:${mt ? '16px' : '0'} 0 10px;">${label}</p>`;
  if (high.length || anchor.length) {
    html += sectionHdr('Priority Formation', false);
    html += [...high, ...anchor].map(poolItemCardHTML).join('');
  }
  if (maint.length) {
    html += sectionHdr('Maintenance', high.length || anchor.length);
    html += maint.map(poolItemCardHTML).join('');
  }
  if (rest.length) {
    html += sectionHdr('Resting', high.length || anchor.length || maint.length);
    html += rest.map(poolItemCardHTML).join('');
  }
  el.innerHTML = html;
}

function populateFormationPool(m) {
  const now = Date.now();
  const mId = m.id;

  (moduleState.sortPlaced || []).forEach((p, i) => {
    const id = `${mId}-ws-${i}`;
    if (formationPool.find(x => x.id === id)) return;
    const isCorrect = p.placed === p.stmt.correct;
    const isHearted = heartedItems.some(h => h.moduleId === mId && h.argIdx === i);
    const hasNote   = !!watchNotes[`${mId}:${i}`];
    const source    = (!isCorrect || isHearted || hasNote) ? 'watch-sort-review' : 'watch-sort-correct';
    const aw = source === 'watch-sort-review' ? 9 : 5;
    const uf = source === 'watch-sort-review' ? 6 : 3;
    formationPool.push({ id, text:p.stmt.text, moduleId:mId, moduleTitle:m.title, source, frame:p.placed, algorithmWeight:aw, userFloor:uf, interactions:0, addedAt:now });
  });

  (moduleState.preSortPlaced || []).forEach((p, i) => {
    if (p.placed === p.stmt.correct) return;
    const id = `${mId}-ps-${i}`;
    if (formationPool.find(x => x.id === id)) return;
    formationPool.push({ id, text:p.stmt.text, moduleId:mId, moduleTitle:m.title, source:'pre-sort-incorrect', frame:p.stmt.correct, algorithmWeight:2, userFloor:1, interactions:0, addedAt:now });
  });

  (moduleState.customSortCards || []).forEach((card, i) => {
    if (card.placed === null) return;
    const id = `${mId}-cws-${i}`;
    if (formationPool.find(x => x.id === id)) return;
    formationPool.push({ id, text:card.text, moduleId:mId, moduleTitle:m.title, source:'custom', frame:card.placed, algorithmWeight:8, userFloor:5, interactions:0, addedAt:now });
  });

  mirrorLog.filter(e => e.moduleId === mId).forEach((entry, i) => {
    const id = `${mId}-mirror-${i}`;
    if (formationPool.find(x => x.id === id)) return;
    formationPool.push({ id, text:entry.text, moduleId:mId, moduleTitle:m.title, source:'mirror', frame:entry.finalFrame, algorithmWeight:4, userFloor:2, interactions:0, addedAt:now });
  });
}

function addModuleDiscernQuestions(m) {
  const now = Date.now();
  const mId = m.id;
  (m.discernmentQuestions || []).forEach((q, i) => {
    const id = `dq-${mId}-${i}`;
    if (discernLibrary.find(x => x.id === id)) return;
    discernLibrary.push({ id, text:q.text, topic:q.topic, correct:q.correct, community:q.community, mirrorNote:q.mirrorNote, moduleId:mId, moduleTitle:m.title, addedAt:now });
  });
}

function setPoolItemFloor(id, floor) {
  const item = formationPool.find(x => x.id === id);
  if (!item) return;
  item.userFloor = floor;
  const dotsEl = document.getElementById(`pool-dots-${id}`);
  if (dotsEl) dotsEl.innerHTML = renderPoolDots(item);
  const noteEl = document.getElementById(`pool-note-${id}`);
  if (noteEl) {
    noteEl.textContent = item.userFloor > item.algorithmWeight
      ? `Anchored above algorithm (${item.algorithmWeight})`
      : item.algorithmWeight > item.userFloor
      ? `Algorithm suggests ${item.algorithmWeight} · Your floor: ${item.userFloor}`
      : `Frequency: ${poolEffectiveWeight(item)} of 10`;
  }
  const statusEl = document.getElementById(`pool-status-${id}`);
  if (statusEl) {
    const s = getPoolItemStatus(item);
    statusEl.style.color = s.color;
    statusEl.style.background = s.bg;
    statusEl.innerHTML = `<span class="material-symbols-outlined" style="font-size:11px;">${s.icon}</span>${s.label}`;
  }
  saveState();
}

function removeFromPool(id) {
  formationPool = formationPool.filter(x => x.id !== id);
  renderFormationPool();
  saveState();
}

function toggleGrowthSection(name) {
  growthExpanded[name] = !growthExpanded[name];
  const contentEl = document.getElementById(`growth-section-${name}`);
  const iconEl    = document.getElementById(`growth-section-icon-${name}`);
  if (contentEl) contentEl.style.display = growthExpanded[name] ? 'block' : 'none';
  if (iconEl)    iconEl.textContent = growthExpanded[name] ? 'expand_less' : 'expand_more';
}

function updateGrowthScreen() {
  document.getElementById('growth-sorted').textContent  = totalSorted;
  document.getElementById('growth-modules').textContent = modulesComplete;

  renderFormationPool();

  // Altar of Your Heart
  const altarEl = document.getElementById('growth-hearted');
  if (altarEl) {
    if (heartedItems.length === 0) {
      altarEl.innerHTML = '<p style="font-size:13px;color:#7A7570;text-align:center;padding:12px 0;">Points you love during Watch & Sort will appear here.</p>';
    } else {
      altarEl.innerHTML = heartedItems.map(item => `
        <div style="padding:12px 0;border-bottom:1px solid #EFEFED;">
          <p style="font-family:'Playfair Display',serif;font-size:14px;color:#2A2824;line-height:1.5;margin-bottom:4px;">${item.quote}</p>
          <p style="font-size:11px;color:#7A7570;">${item.moduleTitle} · ${item.timestamp}</p>
        </div>`).join('');
      const badge = document.getElementById('growth-altar-badge');
      if (badge) { badge.textContent = heartedItems.length; badge.style.display = 'inline-block'; }
    }
  }

  // Discernment Log
  const logEl = document.getElementById('growth-discern-log');
  if (logEl) {
    if (discernLog.length === 0) {
      logEl.innerHTML = '<p style="font-size:13px;color:#7A7570;text-align:center;padding:12px 0;">Complete a Discern session to build your log.</p>';
    } else {
      const shown = discernLog.slice(-10).reverse();
      logEl.innerHTML = shown.map(p => {
        const ok = p.placed === p.stmt.correct;
        return `<div style="display:flex;gap:8px;align-items:flex-start;padding:8px 0;border-bottom:1px solid #EFEFED;">
          <span class="material-symbols-outlined icon-fill" style="font-size:13px;color:${ok ? '#1F4D2F' : '#A0523D'};flex-shrink:0;margin-top:3px;">${ok ? 'check_circle' : 'cancel'}</span>
          <div style="flex:1;min-width:0;">
            <p style="font-size:12px;color:#2A2824;line-height:1.4;">${p.stmt.text.length > 90 ? p.stmt.text.slice(0,90)+'…' : p.stmt.text}</p>
            <p style="font-size:10px;color:${FRAME_COLORS[p.placed]};font-weight:700;margin-top:2px;">${FRAME_NAMES[p.placed]}${!ok ? ` · Correct: ${FRAME_NAMES[p.stmt.correct]}` : ''}</p>
          </div>
        </div>`;
      }).join('') + (discernLog.length > 10 ? `<p style="font-size:12px;color:#7A7570;text-align:center;padding:8px 0;">Showing last 10 of ${discernLog.length}</p>` : '');
      const badge = document.getElementById('growth-discern-badge');
      if (badge) { badge.textContent = discernLog.length; badge.style.display = 'inline-block'; }
    }
  }

  // Mirror Log
  const mirrorEl = document.getElementById('growth-mirror-log');
  if (mirrorEl) {
    if (mirrorLog.length === 0) {
      mirrorEl.innerHTML = '<p style="font-size:13px;color:#7A7570;text-align:center;padding:12px 0;">Complete The Mirror step in a module to see your reflections here.</p>';
    } else {
      const shown = mirrorLog.slice(-6).reverse();
      mirrorEl.innerHTML = shown.map(entry => {
        const fc = FRAME_COLORS[entry.firstFrame]  || '#7A7570';
        const fb = FRAME_BG[entry.firstFrame]      || '#f4f3f1';
        const fn = FRAME_NAMES[entry.firstFrame]   || '—';
        const lc = FRAME_COLORS[entry.finalFrame]  || '#7A7570';
        const lb = FRAME_BG[entry.finalFrame]      || '#f4f3f1';
        const ln = FRAME_NAMES[entry.finalFrame]   || '—';
        const changed = entry.firstFrame !== entry.finalFrame;
        return `<div style="padding:12px 0;border-bottom:1px solid #EFEFED;">
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;flex-wrap:wrap;">
            <span style="background:${fb};color:${fc};font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:0.07em;padding:2px 8px;border-radius:100px;border:1px solid ${fc}33;">${fn}</span>
            ${changed ? `<span class="material-symbols-outlined" style="font-size:13px;color:#D4A574;">arrow_forward</span>
            <span style="background:${lb};color:${lc};font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:0.07em;padding:2px 8px;border-radius:100px;border:1px solid ${lc}33;">${ln}</span>` : `<span class="material-symbols-outlined" style="font-size:13px;color:#1F4D2F;">check_circle</span>`}
          </div>
          <p style="font-size:13px;color:#2A2824;line-height:1.4;margin-bottom:3px;">${entry.text.length > 85 ? entry.text.slice(0,85)+'…' : entry.text}</p>
          ${entry.note ? `<p style="font-family:'Playfair Display',serif;font-size:12px;font-style:italic;color:#52504B;margin-top:4px;line-height:1.5;">"${entry.note}"</p>` : ''}
          <p style="font-size:11px;color:#7A7570;margin-top:3px;">${entry.moduleTitle}</p>
        </div>`;
      }).join('') + (mirrorLog.length > 6 ? `<p style="font-size:12px;color:#7A7570;text-align:center;padding:8px 0;">Showing last 6 of ${mirrorLog.length}</p>` : '');
      const badge = document.getElementById('growth-mirror-badge');
      if (badge) { badge.textContent = mirrorLog.length; badge.style.display = 'inline-block'; }
    }
  }

  // My Stones
  const stoneCount = document.getElementById('growth-stone-count');
  if (stoneCount) stoneCount.textContent = `${libraryItems.length} stone${libraryItems.length !== 1 ? 's' : ''}`;

  const preview = document.getElementById('library-preview');
  if (preview) {
    if (libraryItems.length === 0) {
      preview.innerHTML = '<p style="font-size:13px;color:#7A7570;text-align:center;padding:12px 0;">Complete a module to lay your first stones.</p>';
    } else {
      const shown = libraryItems.slice(0, 4);
      preview.innerHTML = shown.map(item => `
        <div style="padding:10px 0;border-bottom:1px solid #EFEFED;">
          <p style="font-size:10px;font-weight:700;color:${FRAME_COLORS[item.frame]};margin-bottom:3px;text-transform:uppercase;letter-spacing:0.07em;">${FRAME_NAMES[item.frame]}</p>
          <p style="font-size:13px;color:#2A2824;line-height:1.5;">${item.text}</p>
        </div>`).join('')
        + (libraryItems.length > 4 ? `<p style="font-size:12px;color:#7A7570;text-align:center;padding:8px 0;">+${libraryItems.length - 4} more</p>` : '');
    }
  }
}

// ── ONBOARDING ────────────────────────────────────────────────────────────────
function showOb2() {
  document.getElementById('ob-1').style.display = 'none';
  const ob2 = document.getElementById('ob-2');
  ob2.style.display = 'block';
  ob2.classList.remove('fade-in');
  void ob2.offsetWidth;
  ob2.classList.add('fade-in');
}

function showOb3() {
  document.getElementById('ob-2').style.display = 'none';
  document.getElementById('ob3-onboarding-footer').style.display = 'block';
  document.getElementById('ob3-help-footer').style.display = 'none';
  const ob3 = document.getElementById('ob-3');
  ob3.style.display = 'block';
  ob3.classList.remove('fade-in');
  void ob3.offsetWidth;
  ob3.classList.add('fade-in');
  ob3.scrollTop = 0;
}

function showFramesHelp() {
  document.getElementById('ob3-onboarding-footer').style.display = 'none';
  document.getElementById('ob3-help-footer').style.display = 'block';
  document.getElementById('ob-3').style.display = 'block';
  document.getElementById('ob-3').scrollTop = 0;
}

function closeFramesHelp() {
  document.getElementById('ob-3').style.display = 'none';
}

function startApp() {
  document.getElementById('onboarding').classList.add('hidden');
  document.getElementById('ob-3').style.display = 'none';
  initDiscernSort();
}

// ── PERSISTENCE ───────────────────────────────────────────────────────────────
const STORAGE_KEY = 'inapologetics_v1';

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      v: 1,
      totalSorted,
      modulesComplete,
      libraryItems,
      heartedItems,
      watchNotes,
      formationReflections,
      discernLog,
      mirrorLog,
      formationPool,
      discernLibrary,
      completedModules,
      growthExpanded,
    }));
  } catch(e) {}
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const s = JSON.parse(raw);
    if (!s || s.v !== 1) return;
    if (typeof s.totalSorted    === 'number') totalSorted    = s.totalSorted;
    if (typeof s.modulesComplete === 'number') modulesComplete = s.modulesComplete;
    if (Array.isArray(s.libraryItems))   libraryItems   = s.libraryItems;
    if (Array.isArray(s.heartedItems))   heartedItems   = s.heartedItems;
    if (s.watchNotes && typeof s.watchNotes === 'object') watchNotes = s.watchNotes;
    if (s.formationReflections && typeof s.formationReflections === 'object') formationReflections = s.formationReflections;
    if (Array.isArray(s.discernLog))     discernLog     = s.discernLog;
    if (Array.isArray(s.mirrorLog))      mirrorLog      = s.mirrorLog;
    if (Array.isArray(s.formationPool))  formationPool  = s.formationPool;
    if (Array.isArray(s.discernLibrary)) discernLibrary = s.discernLibrary;
    if (s.completedModules && typeof s.completedModules === 'object') completedModules = s.completedModules;
    if (s.growthExpanded && typeof s.growthExpanded === 'object') growthExpanded = { ...growthExpanded, ...s.growthExpanded };
  } catch(e) {}
}

function clearState() {
  if (!confirm('Clear all progress? This cannot be undone.')) return;
  localStorage.removeItem(STORAGE_KEY);
  totalSorted = 0; modulesComplete = 0;
  libraryItems = []; heartedItems = [];
  watchNotes = {}; formationReflections = {};
  discernLog = []; mirrorLog = [];
  formationPool = []; discernLibrary = []; completedModules = {};
  growthExpanded = { altar: false, mirror: false, stones: false, discernLog: false };
  updateGrowthScreen();
}

// ── INIT ──────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function() {
  loadState();
  loadAdminState();
});

window.addEventListener('popstate', function(e) {
  if (document.getElementById('screen-module').classList.contains('active')) {
    goBack();
  }
});
