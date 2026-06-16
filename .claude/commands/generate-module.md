# Generate inApologetics Module from YouTube Sermon

You are generating a complete module for the inApologetics.ai app from a YouTube sermon.

**Input:** `$ARGUMENTS`

This may be:
- A full YouTube URL (`https://www.youtube.com/watch?v=ID` or `https://youtu.be/ID`)
- A bare video ID

Optionally the user may append a church/series name after the URL. Default series: **Union Church**.

---

## Step 1 — Parse arguments

Extract:
- **videoId**: the raw YouTube video ID (everything before `?` or `&` if the ID contains query params, keep the `?si=...` suffix if present — e.g. `_wSqePjcVf0?si=ttdAl97VpO1oZiTr`)
- **series**: if the user appended a name after the URL use that, otherwise `'Union Church'`

---

## Step 2 — Fetch the transcript with timestamps

Run this Python script using the Bash tool. Replace `VIDEO_ID_HERE` with the bare video ID (no query params for the fetch itself):

```python
import re, urllib.request, html as html_mod, sys

video_id = "VIDEO_ID_HERE"
url = f"https://www.youtube.com/watch?v={video_id}"

req = urllib.request.Request(url, headers={
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept-Language': 'en-US,en;q=0.9',
})
try:
    page = urllib.request.urlopen(req, timeout=15).read().decode('utf-8')
except Exception as e:
    print(f"FETCH_ERROR: {e}"); sys.exit(1)

# Title
title_m = re.search(r'"title":\{"runs":\[{"text":"(.*?)"\}', page)
title = html_mod.unescape(title_m.group(1)) if title_m else "Unknown"

# Description
desc_m = re.search(r'"shortDescription":"(.*?)"(?:,"isCrawlable")', page, re.S)
desc = html_mod.unescape(desc_m.group(1).replace('\\n', '\n')) if desc_m else ""

print(f"=== TITLE: {title} ===")
print(f"=== DESCRIPTION (first 600 chars): {desc[:600]} ===")

# Caption track
cap_m = re.search(r'"captionTracks":\[{"baseUrl":"(.*?)"', page)
if not cap_m:
    # Try ASR (auto-generated)
    cap_m = re.search(r'"baseUrl":"(https://www\.youtube\.com/api/timedtext[^"]+)"', page)
if not cap_m:
    print("NO_CAPTIONS_FOUND — transcript unavailable for this video")
    sys.exit(0)

cap_url = cap_m.group(1).replace('\\u0026', '&')
if '&fmt=vtt' not in cap_url:
    cap_url += '&fmt=vtt'

try:
    vtt = urllib.request.urlopen(cap_url, timeout=15).read().decode('utf-8')
except Exception as e:
    print(f"CAPTION_FETCH_ERROR: {e}"); sys.exit(1)

# Parse VTT timestamps and text
entries = re.findall(r'(\d+:\d+:\d+\.\d+) --> .*?\n(.*?)(?=\n\n|\Z)', vtt, re.S)
if not entries:
    # Fallback: XML format
    cap_url2 = cap_url.replace('&fmt=vtt', '')
    xml = urllib.request.urlopen(cap_url2, timeout=15).read().decode('utf-8')
    entries_xml = re.findall(r'<text start="([\d.]+)"[^>]*>(.*?)</text>', xml)
    def to_ts(s):
        s=float(s); m=int(s//60); sec=int(s%60)
        return f"{m}:{sec:02d}"
    entries = [(to_ts(t), html_mod.unescape(re.sub(r'<[^>]+>','',txt)).strip()) for t,txt in entries_xml]
    for ts, text in entries:
        if text: print(f"[{ts}] {text}")
else:
    def vtt_to_ts(ts):
        parts = ts.split(':')
        h,m,s = int(parts[0]),int(parts[1]),float(parts[2])
        total = h*3600+m*60+s
        mins=int(total//60); secs=int(total%60)
        return f"{mins}:{secs:02d}"
    seen = set()
    for ts, text in entries:
        clean = html_mod.unescape(re.sub(r'<[^>]+>','',text)).strip()
        if clean and clean not in seen:
            seen.add(clean)
            print(f"[{vtt_to_ts(ts)}] {clean}")
```

If `NO_CAPTIONS_FOUND`, tell the user and ask them to paste the transcript manually, then continue from Step 3.

---

## Step 3 — Research the sermon

After getting the transcript, also fetch the video's YouTube page with WebFetch to gather:
- The main scripture passage being preached
- Series name if visible in title or description
- Church name if different from the default series

---

## Step 4 — Generate the complete module

Analyze the full transcript deeply. Then generate the complete JavaScript module object following this exact schema:

```javascript
  MODULE_ID: {
    id: 'MODULE_ID',          // lowercase-hyphenated, e.g. 'pride-prejudiced'
    title: "Sermon Title",
    series: 'SERIES_NAME',    // as determined above
    scripture: 'Book Ch:VV',  // primary text of the sermon
    videoId: 'YOUTUBE_ID',    // the full videoId string including ?si= if present

    // PRE-SORT STATEMENTS — shown BEFORE the user watches the video
    // Purpose: reveal the user's current theological posture on these topics
    // Rules:
    //   - 8 statements total
    //   - Mix of frames: ~3 Essentials, 2 Lies, 1 Non-Essential, 1 Wisdom, 1 Unclean
    //   - correct: 1=Essentials, 2=Lies, 3=Non-Essentials, 4=Wisdom, 5=Unclean
    //   - community: [Ess%, Lies%, NonEss%, Wisdom%, Unclean%] — integers summing to ~100
    //   - Statements must be debatable — someone reasonable could get them wrong
    //   - Draw from the sermon's core theological territory
    preSortStatements: [
      { text:"Statement.", topic:"Topic", correct:1, community:[72,7,5,8,8] },
      // × 8 total
    ],

    // ARGUMENTS — key claims extracted directly from the sermon
    // Rules:
    //   - 4–6 items matching the most important sermon moments
    //   - text: a quotable one-liner in double-quotes, as if the preacher said it
    //   - timestamp: real timestamp from the transcript in M:SS format
    arguments: [
      { text:'"Quotable claim."', timestamp:'2:36' },
      // × 4–6
    ],

    // SORT STATEMENTS — appear during Watch & Sort step alongside the video
    // Rules:
    //   - Must match arguments 1:1 (same count, same order, same timestamps implied)
    //   - Slightly more assertive phrasing of the argument for easier categorization
    //   - correct: the Five Frames category this claim actually belongs to
    //   - community: realistic distribution of how a congregation might categorize it
    sortStatements: [
      { text:'"Sort version of argument."', topic:"Topic", correct:1, community:[74,4,4,12,6] },
      // × same count as arguments
    ],

    // FORMATION — 4 study points for deep engagement after watching
    // Rules:
    //   - Each point expands one dimension of the sermon
    //   - Bring in 1 additional scripture not cited in the sermon
    //   - body: 150–200 words — explain the principle, connect to sermon, invite application
    //   - End body with a question or challenge to the reader
    //   - icon: valid Material Symbols name (school, psychology, person, verified, church,
    //           favorite, anchor, shield, light_mode, auto_stories, menu_book, star)
    formation: [
      {
        title: "Formation Point Title",
        icon: "school",
        scripture: "Book Ch:V",
        body: "Full exposition paragraph(s). 150–200 words."
      },
      // × 4
    ],

    // ASSESSMENT — comprehension + application questions
    // Rules:
    //   - 4–5 questions
    //   - Mix: ~2 comprehension (what did the sermon say), ~2 application (what does it mean)
    //   - options: 4 choices, wrong answers must be plausible, not obviously silly
    //   - correct: 0-indexed position of the right answer
    //   - explanation: 2–3 sentences citing the sermon or scripture that settles it
    assessment: [
      {
        q: "Question?",
        options: ["A", "B", "C", "D"],
        correct: 1,
        explanation: "Why this answer, grounded in the sermon."
      },
      // × 4–5
    ]
  },
```

---

## Step 5 — Quality checks before outputting

Before outputting, verify:
- [ ] `preSortStatements` has exactly 8 entries
- [ ] `arguments` and `sortStatements` have the same count
- [ ] All timestamps in `arguments` are real timestamps from the transcript
- [ ] `community` arrays each sum to approximately 100
- [ ] `correct` values in `preSortStatements` and `sortStatements` use 1–5 (not 0-indexed)
- [ ] `correct` values in `assessment` use 0-indexed position in the `options` array
- [ ] Formation `body` fields are 150–200 words each
- [ ] No formation point reuses a scripture already in `scripture` field (diversify)

---

## Step 6 — Output

Print the complete JavaScript object with correct indentation.

Then say exactly:

> **Module ready.** Should I add this to `inapologetics_mvp.html` and push to GitHub Pages? If the video ID or series name needs adjusting, say so now.

If the user confirms, use the Edit tool to insert the new module into the `MODULES` object in `/Users/Khalid/Documents/Claude-Khalid-Code/2026 Claude Copies/Inapologetics/inapologetics_mvp.html`, immediately after the opening `const MODULES = {` line but before the first existing module. Then run:

```bash
cd "/Users/Khalid/Documents/Claude-Khalid-Code/2026 Claude Copies/Inapologetics" && git add inapologetics_mvp.html && git commit -m "Add [MODULE_TITLE] module ([SERIES_NAME])" && git push origin main
```
