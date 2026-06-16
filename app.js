// ── GLOBAL STATE ──────────────────────────────────────────────────────────────
let currentTab = 'discern';
let lastTab = 'learn';
let totalSorted = 0;
let modulesComplete = 0;
let libraryItems = [];

let discernState = { statements:[], idx:0, placed:[], streak:0 };

let moduleState = {
  moduleId:null, step:0,
  preSortIdx:0, preSortPlaced:[], preSortDone:false,
  extractViewed:false,
  sortIdx:0, sortPlaced:[], sortDone:false,
  formationPage:0, formationDone:false,
  libraryDone:false,
  assessIdx:0, assessAnswers:[], assessDone:false,
};

// Used by renderFrameButtons for onclick delegation
window._frameCallback = null;

// ── NAVIGATION ────────────────────────────────────────────────────────────────
function switchTab(tab) {
  currentTab = tab;
  ['screen-sort','screen-today','screen-learn','screen-growth'].forEach(id => {
    document.getElementById(id).classList.remove('active');
  });
  ['tab-discern','tab-navigate','tab-learn','tab-growth'].forEach(id => {
    document.getElementById(id).classList.remove('active');
  });
  document.getElementById('bottom-nav').style.display = 'block';

  const screenMap = { discern:'screen-sort', navigate:'screen-today', learn:'screen-learn', growth:'screen-growth' };
  const tabMap    = { discern:'tab-discern', navigate:'tab-navigate', learn:'tab-learn',    growth:'tab-growth' };
  document.getElementById(screenMap[tab]).classList.add('active');
  document.getElementById(tabMap[tab]).classList.add('active');

  if (tab === 'growth') updateGrowthScreen();
}

function openModule(id) {
  const m = MODULES[id];
  if (!m) return;
  lastTab = currentTab;
  moduleState = {
    moduleId:id, step:0,
    preSortIdx:0, preSortPlaced:[], preSortDone:false,
    extractViewed:false,
    sortIdx:0, sortPlaced:[], sortDone:false,
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
    let cls = 'step-dot';
    if (i < step) cls += ' complete';
    else if (i === step) cls += ' active';
    return `<div class="${cls}" title="${s.label}"></div>`;
  }).join('');

  const content = document.getElementById('pipeline-content');
  content.innerHTML = '';
  content.scrollTop = 0;

  const renderers = [renderPreSort, renderWatchSort, renderFormation, renderLibrary, renderAssess];
  if (renderers[step]) renderers[step](m, content);
}

function advancePipeline() {
  if (moduleState.step < PIPELINE_STEPS.length - 1) {
    moduleState.step++;
    renderPipelineStep();
  }
}

// ── STEP 1: PRE-SORT ─────────────────────────────────────────────────────────
function renderPreSort(m, el) {
  if (moduleState.preSortDone) { el.innerHTML = preSortSummaryHTML(m); return; }

  const idx  = moduleState.preSortIdx;
  const stmt = m.preSortStatements[idx];
  const total = m.preSortStatements.length;

  el.innerHTML = `
    <div class="fade-in">
      <p style="font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#7A7570;margin-bottom:4px;">Pre-Sort · ${idx + 1} of ${total}</p>
      <div class="progress-bar" style="margin-bottom:16px;"><div class="progress-fill" style="width:${(idx/total)*100}%"></div></div>
      <p style="font-size:13px;color:#52504B;line-height:1.5;margin-bottom:16px;">Before watching, sort these statements based on your current thinking. See how your placement changes after the module.</p>
      <div class="statement-card" style="background:#fff;border-radius:20px;padding:20px;margin-bottom:14px;">
        <p style="font-size:10px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#7A7570;margin-bottom:10px;">${stmt.topic}</p>
        <p style="font-family:'Playfair Display',serif;font-size:20px;font-weight:700;line-height:1.4;color:#2A2824;">${stmt.text}</p>
      </div>
      <p style="font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#7A7570;text-align:center;margin-bottom:10px;">Categorize This Statement</p>
      <div style="display:flex;flex-direction:column;gap:8px;" id="pre-frame-list"></div>
    </div>`;

  renderFrameButtons('pre-frame-list', function(frame) {
    moduleState.preSortPlaced.push({ stmt, placed: frame });
    moduleState.preSortIdx++;
    if (moduleState.preSortIdx >= m.preSortStatements.length) moduleState.preSortDone = true;
    renderPreSort(m, el);
  });
}

function preSortSummaryHTML(m) {
  const total   = moduleState.preSortPlaced.length;
  const correct = moduleState.preSortPlaced.filter(p => p.placed === p.stmt.correct).length;
  return `<div class="fade-in">
    <div style="background:#fff;border-radius:20px;padding:24px;border:1.5px solid #D4A574;text-align:center;margin-bottom:20px;" class="lifted">
      <div style="width:52px;height:52px;background:#dae2ff;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 14px;">
        <span class="material-symbols-outlined icon-fill" style="color:#0B3D91;font-size:26px;">balance</span>
      </div>
      <h2 style="font-family:'Playfair Display',serif;font-size:22px;font-weight:700;color:#0B3D91;margin-bottom:6px;">Pre-Sort Complete</h2>
      <p style="font-size:14px;color:#52504B;margin-bottom:4px;">${correct} of ${total} placed correctly</p>
      <p style="font-size:12px;color:#7A7570;line-height:1.5;">Now watch the sermon. See how your placements change.</p>
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
      </div>`;
  }).join('');
  const doneBtn = allDone
    ? `<button onclick="advancePipeline()" style="background:#0B3D91;color:#fff;border-radius:100px;padding:14px;font-size:14px;font-weight:700;cursor:pointer;width:100%;font-family:'Plus Jakarta Sans',sans-serif;margin-top:4px;">Begin Formation Study →</button>`
    : '';
  return cards + doneBtn;
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

// ── STEP 3: FORMATION ────────────────────────────────────────────────────────
function renderFormation(m, el) {
  const page   = moduleState.formationPage;
  const points = m.formation;
  const pt     = points[page];
  const isLast = page === points.length - 1;

  el.innerHTML = `<div class="fade-in">
    <p style="font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#7A7570;margin-bottom:4px;">Formation · ${page + 1} of ${points.length}</p>
    <div class="progress-bar" style="margin-bottom:20px;"><div class="progress-fill" style="width:${((page+1)/points.length)*100}%"></div></div>
    <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:20px;">
      <div style="width:44px;height:44px;background:#0B3D91;border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
        <span class="material-symbols-outlined icon-fill" style="color:#fff;font-size:22px;">${pt.icon}</span>
      </div>
      <div>
        <p style="font-size:11px;color:#7A7570;font-weight:600;margin-bottom:3px;">${pt.scripture}</p>
        <h2 style="font-family:'Playfair Display',serif;font-size:22px;font-weight:700;color:#2A2824;line-height:1.3;">${pt.title}</h2>
      </div>
    </div>
    <div class="formation-point">
      <p style="font-size:15px;color:#2A2824;line-height:1.75;">${pt.body}</p>
    </div>
    <div style="height:20px;"></div>
    <button onclick="${isLast ? 'formationDone()' : 'formationNext()'}"
      style="background:#0B3D91;color:#fff;border-radius:100px;padding:14px;font-size:14px;font-weight:700;cursor:pointer;width:100%;font-family:'Plus Jakarta Sans',sans-serif;">
      ${isLast ? 'View My Stones →' : 'Next Point →'}
    </button>
    ${page > 0 ? `<button onclick="formationPrev()" style="background:transparent;color:#7A7570;border:1px solid #c4c6d3;border-radius:100px;padding:12px;font-size:13px;cursor:pointer;width:100%;margin-top:8px;font-family:'Plus Jakarta Sans',sans-serif;">← Previous</button>` : ''}
  </div>`;
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

// ── STEP 4: LIBRARY ──────────────────────────────────────────────────────────
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
    moduleState.libraryDone = true;
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

// ── STEP 5: ASSESS ───────────────────────────────────────────────────────────
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
  const stmts = [...GENERAL_STATEMENTS].sort(() => Math.random() - 0.5);
  discernState = { statements:stmts, idx:0, placed:[], streak:0 };

  document.getElementById('sort-complete').style.display      = 'none';
  document.getElementById('sort-card-area').style.display     = 'block';
  document.getElementById('community-breakdown').style.display = 'none';
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
    if (document.getElementById('community-breakdown').style.display === 'block') return;
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
  const el = document.getElementById('frame-list');
  if (!el) return;
  const shortNames = ['', 'Essentials', 'Lies', 'Non-Ess.', 'Wisdom', 'Unclean'];
  el.innerHTML = [1,2,3,4,5].map(i => {
    let iconInner;
    if (FRAME_ICONS[i] === '≈') {
      iconInner = `<div style="font-size:18px;color:${FRAME_COLORS[i]};font-weight:700;line-height:1;">≈</div>`;
    } else {
      const fill = FRAME_FILL[i] ? `font-variation-settings:'FILL' 1,'wght' 400,'GRAD' 0,'opsz' 24;` : '';
      iconInner = `<span class="material-symbols-outlined" style="font-size:20px;color:${FRAME_COLORS[i]};${fill}">${FRAME_ICONS[i]}</span>`;
    }
    return `
      <button onclick="discernPlace(${i})"
        style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;padding:10px 4px;background:${FRAME_BG[i]};border:1px solid ${FRAME_COLORS[i]}33;border-radius:12px;cursor:pointer;transition:all 0.15s;font-family:'Plus Jakarta Sans',sans-serif;">
        ${iconInner}
        <span style="font-size:8px;font-weight:700;text-transform:uppercase;letter-spacing:0.04em;color:${FRAME_COLORS[i]};line-height:1.2;text-align:center;">${shortNames[i]}</span>
      </button>`;
  }).join('');
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

  document.getElementById('community-breakdown').style.display = 'none';
}

function discernPlace(frame) {
  const stmt = discernState.statements[discernState.idx];
  discernState.placed.push({ stmt, placed:frame });

  const ok = frame === stmt.correct;
  discernState.streak = ok ? discernState.streak + 1 : 0;
  totalSorted++;
  document.getElementById('sort-streak').textContent = discernState.streak;

  showCommunityBreakdown(stmt, frame);
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
  el.style.display = 'block';
}

function nextCard() {
  discernState.idx++;
  const total = discernState.statements.length;

  if (discernState.idx >= total) {
    document.getElementById('sort-card-area').style.display  = 'none';
    document.getElementById('community-breakdown').style.display = 'none';
    document.getElementById('sort-complete').style.display   = 'block';
    document.getElementById('sort-counter').textContent      = `${total} / ${total}`;
    document.getElementById('sort-progress').style.width     = '100%';
    renderSortResults();
    return;
  }

  document.getElementById('community-breakdown').style.display = 'none';
  document.getElementById('sort-frame-buttons').style.display  = 'block';
  renderDiscernCard();
}

function renderSortResults() {
  const list = document.getElementById('sort-results-list');
  const placed = discernState.placed;
  const correct = placed.filter(p => p.placed === p.stmt.correct).length;

  list.innerHTML = `<div style="background:#fff;border-radius:16px;padding:16px;border:1px solid #c4c6d3;margin-bottom:10px;" class="mono-shadow">
    <p style="font-size:11px;font-weight:700;color:#7A7570;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:10px;">Session Results</p>
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

// ── GROWTH SCREEN ─────────────────────────────────────────────────────────────
function updateGrowthScreen() {
  document.getElementById('growth-sorted').textContent  = totalSorted;
  document.getElementById('growth-modules').textContent = modulesComplete;
  document.getElementById('library-count').textContent  = `${libraryItems.length} stone${libraryItems.length !== 1 ? 's' : ''} laid`;

  const preview = document.getElementById('library-preview');
  if (libraryItems.length === 0) {
    preview.innerHTML = '<p style="font-size:13px;color:#7A7570;text-align:center;padding:16px 0;">Complete a module to lay your first stones.</p>';
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

// ── ONBOARDING ────────────────────────────────────────────────────────────────
function showOb3() {
  document.getElementById('ob-2').style.display = 'none';
  document.getElementById('ob3-onboarding-footer').style.display = 'block';
  document.getElementById('ob3-help-footer').style.display = 'none';
  document.getElementById('ob-3').style.display = 'block';
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

// ── INIT ──────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function() {
  // Frame buttons for Discern tab are rendered after onboarding completes (startApp → initDiscernSort)
});

window.addEventListener('popstate', function(e) {
  if (document.getElementById('screen-module').classList.contains('active')) {
    goBack();
  }
});
