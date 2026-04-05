const fs = require('fs');
const path = require('path');

const mappingPath = path.join(__dirname, '..', 'mobile-app', 'assets', 'exercise-gifs', 'mapping.json');
const mapping = JSON.parse(fs.readFileSync(mappingPath, 'utf8'));

const exercises = Object.entries(mapping).map(([key, data]) => ({
  key,
  name: data.exerciseName,
  focusArea: data.focusArea,
  equipment: data.equipment,
  gifPath: data.filename,
  targetMuscles: data.targetMuscles,
  autoMismatch: data.autoMismatch,
}));

const jsData = 'var exercises = ' + JSON.stringify(exercises) + ';';

const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Exercise GIF Verification</title>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { background: #09090b; color: #fafafa; font-family: system-ui, sans-serif; padding: 20px; }
h1 { text-align: center; margin-bottom: 8px; font-size: 28px; }
.subtitle { text-align: center; color: #6b7280; margin-bottom: 24px; font-size: 14px; }
.controls { text-align: center; margin-bottom: 24px; display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; }
.controls input { background: #16161a; border: 1px solid #27272a; color: #fff; padding: 10px 14px; border-radius: 8px; width: 280px; font-size: 14px; }
.controls button { background: #10b981; color: #fff; border: none; padding: 10px 18px; border-radius: 8px; cursor: pointer; font-size: 13px; font-weight: 600; }
.controls button:hover { opacity: 0.85; }
.controls button.danger { background: #ef4444; }
.controls button.warning { background: #f59e0b; color: #000; }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px; max-width: 1400px; margin: 0 auto; }
.card { background: #111114; border-radius: 16px; overflow: hidden; border: 2px solid #27272a; }
.card.wrong { border-color: #ef4444; background: #1a0a0a; }
.card.mismatch { border-color: #f59e0b; background: #1a150a; }
.card img { width: 100%; height: 240px; object-fit: contain; background: #fff; display: block; }
.card-info { padding: 16px; }
.card-key { font-size: 11px; color: #6b7280; font-family: monospace; }
.card-name { font-size: 16px; font-weight: 700; margin-top: 6px; }
.card-focus { font-size: 13px; color: #10b981; margin-top: 6px; }
.card-equip { font-size: 12px; color: #8b5cf6; margin-top: 4px; }
.card-muscles { font-size: 11px; color: #a1a1aa; margin-top: 4px; }
.card-muscles span { background: #27272a; padding: 2px 6px; border-radius: 4px; margin-right: 4px; }
.card-actions { display: flex; gap: 8px; margin-top: 12px; }
.card-actions button { flex: 1; padding: 10px; border: 2px solid #27272a; border-radius: 8px; cursor: pointer; font-size: 13px; font-weight: 700; background: transparent; }
.btn-ok { color: #10b981; border-color: #10b98133; }
.btn-ok.active { background: #10b981; color: #fff; border-color: #10b981; }
.btn-wrong { color: #ef4444; border-color: #ef444433; }
.btn-wrong.active { background: #ef4444; color: #fff; border-color: #ef4444; }
.badge { display: inline-block; padding: 2px 8px; border-radius: 99px; font-size: 10px; font-weight: 700; margin-top: 6px; }
.badge-mismatch { background: rgba(245,158,11,0.15); color: #f59e0b; }
.badge-wrong { background: rgba(239,68,68,0.15); color: #ef4444; }
.summary { text-align: center; margin: 24px auto; padding: 16px 24px; background: #111114; border-radius: 12px; display: inline-flex; gap: 24px; }
.summary-wrap { text-align: center; }
.summary span { font-size: 14px; }
.summary .count { font-weight: 700; font-size: 18px; }
.count-ok { color: #10b981; }
.count-wrong { color: #ef4444; }
.count-mismatch { color: #f59e0b; }
</style>
</head>
<body>
<h1>Exercise GIF Verification</h1>
<p class="subtitle">Review each GIF. Mark correct or wrong.</p>
<div class="controls">
<input type="text" id="search" placeholder="Search..." oninput="doFilter()">
<button onclick="doShowAll()">Show All</button>
<button onclick="doShowWrong()" class="danger">Show Wrong</button>
<button onclick="doShowMismatch()" class="warning">Auto-Mismatch</button>
<button onclick="doExport()">Export</button>
</div>
<div class="summary-wrap"><div class="summary" id="summary"></div></div>
<div class="grid" id="grid"></div>
<script>
${jsData}
var status = {};
try { var s = localStorage.getItem('gs'); if (s) status = JSON.parse(s); } catch(e) {}
exercises.forEach(function(ex) { if (ex.autoMismatch && !status[ex.key]) status[ex.key] = 'mismatch'; });
function save() { try { localStorage.setItem('gs', JSON.stringify(status)); } catch(e) {} }
function markOk(k) { status[k] = 'ok'; save(); doRender(document.getElementById('search').value); }
function markWrong(k) { status[k] = 'wrong'; save(); doRender(document.getElementById('search').value); }
function doRender(f, ow, om) {
  f = f || ''; ow = ow || false; om = om || false;
  var g = document.getElementById('grid'); g.innerHTML = '';
  var lo = f.toLowerCase();
  exercises.forEach(function(ex) {
    if (f && ex.key.indexOf(lo) === -1 && ex.name.toLowerCase().indexOf(lo) === -1) return;
    if (ow && status[ex.key] !== 'wrong') return;
    if (om && status[ex.key] !== 'mismatch') return;
    var st = status[ex.key] || 'ok';
    var iw = st === 'wrong';
    var im = st === 'mismatch' && !iw;
    var c = document.createElement('div');
    c.className = 'card';
    if (iw) c.className += ' wrong';
    else if (im) c.className += ' mismatch';
    var img = document.createElement('img');
    img.src = '../mobile-app/assets/exercise-gifs/' + ex.gifPath;
    img.onerror = function() { this.src = 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2280%22>?</text></svg>'; };
    c.appendChild(img);
    var info = document.createElement('div');
    info.className = 'card-info';
    var mh = '';
    if (ex.targetMuscles && ex.targetMuscles.primary) { ex.targetMuscles.primary.forEach(function(m) { mh += '<span>' + m + '</span>'; }); }
    if (ex.targetMuscles && ex.targetMuscles.secondary) { ex.targetMuscles.secondary.forEach(function(m) { mh += '<span>' + m + '</span>'; }); }
    var bh = '';
    if (im) bh = '<div class="badge badge-mismatch">Auto-flagged</div>';
    if (iw) bh = '<div class="badge badge-wrong">Wrong</div>';
    info.innerHTML = '<div class="card-key">' + ex.key + '</div><div class="card-name">' + ex.name + '</div><div class="card-focus">Focus: ' + ex.focusArea + '</div><div class="card-equip">Equipment: ' + ex.equipment + '</div><div class="card-muscles">' + mh + '</div>' + bh;
    var acts = document.createElement('div');
    acts.className = 'card-actions';
    var ob = document.createElement('button');
    ob.className = 'btn-ok' + (!iw ? ' active' : '');
    ob.textContent = 'Correct';
    ob.setAttribute('dk', ex.key);
    ob.addEventListener('click', function() { markOk(this.getAttribute('dk')); });
    var wb = document.createElement('button');
    wb.className = 'btn-wrong' + (iw ? ' active' : '');
    wb.textContent = 'Wrong';
    wb.setAttribute('dk', ex.key);
    wb.addEventListener('click', function() { markWrong(this.getAttribute('dk')); });
    acts.appendChild(ob);
    acts.appendChild(wb);
    info.appendChild(acts);
    c.appendChild(info);
    g.appendChild(c);
  });
  doSummary();
}
function doSummary() {
  var wc = 0, mc = 0;
  Object.keys(status).forEach(function(k) { if (status[k] === 'wrong') wc++; if (status[k] === 'mismatch') mc++; });
  var oc = exercises.length - wc - mc;
  document.getElementById('summary').innerHTML = '<span class="count-ok"><span class="count">' + oc + '</span> Correct</span><span class="count-wrong"><span class="count">' + wc + '</span> Wrong</span><span class="count-mismatch"><span class="count">' + mc + '</span> Mismatch</span><span><span class="count">' + exercises.length + '</span> Total</span>';
}
function doFilter() { doRender(document.getElementById('search').value); }
function doShowAll() { document.getElementById('search').value = ''; doRender(); }
function doShowWrong() { doRender(document.getElementById('search').value, true); }
function doShowMismatch() { doRender(document.getElementById('search').value, false, true); }
function doExport() {
  var wl = [];
  exercises.forEach(function(ex) { if (status[ex.key] === 'wrong' || status[ex.key] === 'mismatch') wl.push({ key: ex.key, name: ex.name }); });
  var t = 'TO FIX (' + wl.length + '):\\n' + JSON.stringify(wl, null, 2);
  navigator.clipboard.writeText(t).then(function() { alert('Copied ' + wl.length + '!'); });
}
doRender();
</script>
</body>
</html>`;

fs.writeFileSync(path.join(__dirname, 'verify-gifs.html'), html);
console.log('✅ Generated verify-gifs.html with ' + exercises.length + ' exercises');
console.log('Open: http://localhost:8765/verify-gifs.html');
