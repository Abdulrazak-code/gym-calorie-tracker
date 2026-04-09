var status = {};
try { var s = localStorage.getItem('gs'); if (s) status = JSON.parse(s); } catch(e) {}

exercises.forEach(function(ex) {
  if (ex.autoMismatch && !status[ex.key]) {
    status[ex.key] = 'mismatch';
  }
});

function save() {
  try { localStorage.setItem('gs', JSON.stringify(status)); } catch(e) {}
}

function markOk(k) {
  status[k] = 'ok';
  save();
  doRender(document.getElementById('search').value);
}

function markWrong(k) {
  status[k] = 'wrong';
  save();
  doRender(document.getElementById('search').value);
}

function doRender(f, ow, om) {
  f = f || '';
  ow = ow || false;
  om = om || false;
  var g = document.getElementById('grid');
  g.innerHTML = '';
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
    img.onerror = function() {
      this.src = 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2280%22>?</text></svg>';
    };
    c.appendChild(img);

    var info = document.createElement('div');
    info.className = 'card-info';

    var mh = '';
    if (ex.targetMuscles && ex.targetMuscles.primary) {
      ex.targetMuscles.primary.forEach(function(m) {
        mh += '<span>' + m + '</span>';
      });
    }
    if (ex.targetMuscles && ex.targetMuscles.secondary) {
      ex.targetMuscles.secondary.forEach(function(m) {
        mh += '<span>' + m + '</span>';
      });
    }

    var bh = '';
    if (im) bh = '<div class="badge badge-mismatch">Auto-flagged</div>';
    if (iw) bh = '<div class="badge badge-wrong">Wrong</div>';

    info.innerHTML = '<div class="card-key">' + ex.key + '</div>' +
      '<div class="card-name">' + ex.name + '</div>' +
      '<div class="card-focus">Focus: ' + ex.focusArea + '</div>' +
      '<div class="card-equip">Equipment: ' + ex.equipment + '</div>' +
      '<div class="card-muscles">' + mh + '</div>' +
      bh;

    var acts = document.createElement('div');
    acts.className = 'card-actions';

    var ob = document.createElement('button');
    ob.className = 'btn-ok';
    if (!iw) ob.className += ' active';
    ob.textContent = 'Correct';
    ob.setAttribute('data-dk', ex.key);
    ob.addEventListener('click', function() {
      markOk(this.getAttribute('data-dk'));
    });

    var wb = document.createElement('button');
    wb.className = 'btn-wrong';
    if (iw) wb.className += ' active';
    wb.textContent = 'Wrong';
    wb.setAttribute('data-dk', ex.key);
    wb.addEventListener('click', function() {
      markWrong(this.getAttribute('data-dk'));
    });

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
  Object.keys(status).forEach(function(k) {
    if (status[k] === 'wrong') wc++;
    if (status[k] === 'mismatch') mc++;
  });
  var oc = exercises.length - wc - mc;
  document.getElementById('summary').innerHTML =
    '<span class="count-ok"><span class="count">' + oc + '</span> Correct</span>' +
    '<span class="count-wrong"><span class="count">' + wc + '</span> Wrong</span>' +
    '<span class="count-mismatch"><span class="count">' + mc + '</span> Mismatch</span>' +
    '<span><span class="count">' + exercises.length + '</span> Total</span>';
}

function doFilter() { doRender(document.getElementById('search').value); }
function doShowAll() { document.getElementById('search').value = ''; doRender(); }
function doShowWrong() { doRender(document.getElementById('search').value, true); }
function doShowMismatch() { doRender(document.getElementById('search').value, false, true); }

function doExport() {
  var wl = [];
  exercises.forEach(function(ex) {
    if (status[ex.key] === 'wrong' || status[ex.key] === 'mismatch') {
      wl.push({ key: ex.key, name: ex.name });
    }
  });
  var t = 'TO FIX (' + wl.length + '):\n' + JSON.stringify(wl, null, 2);
  navigator.clipboard.writeText(t).then(function() {
    alert('Copied ' + wl.length + '!');
  });
}

doRender();
