/* =========================================================================
   MORFEUS · motore.js  ·  engine condiviso delle slide-manifesto
   Fornisce: i18n (DICT it/en), tema persistente, reveal-on-scroll,
             draw-on-scroll per gli SVG, set-piece (bottoni "fire"),
             progress della sessione in localStorage.
   Ogni pagina definisce window.DICT e window.PAGE prima di caricare questo file.
   ========================================================================= */
(function () {
  'use strict';

  /* ---------- LINGUA ---------- */
  var LANG = localStorage.getItem('sp-lang') || 'it';

  function applyLang(l) {
    LANG = l;
    document.documentElement.setAttribute('data-lang', l);
    localStorage.setItem('sp-lang', l);
    var D = (window.DICT && window.DICT[l]) || {};
    document.querySelectorAll('[data-i]').forEach(function (el) {
      var k = el.getAttribute('data-i'); if (k in D) el.textContent = D[k];
    });
    document.querySelectorAll('[data-i-html]').forEach(function (el) {
      var k = el.getAttribute('data-i-html'); if (k in D) el.innerHTML = D[k];
    });
    document.querySelectorAll('[data-i-aria]').forEach(function (el) {
      var k = el.getAttribute('data-i-aria'); if (k in D) el.setAttribute('aria-label', D[k]);
    });
    document.querySelectorAll('.lang button').forEach(function (b) {
      b.classList.toggle('on', b.getAttribute('data-l') === l);
    });
    document.documentElement.lang = l;
    renderLab(l);
    updateHomeBtn(l);
  }
  window.setLang = applyLang;

  /* ---------- INTERATTIVI DI STUDIO (bet / sort / journal) ----------
     Contenuto bilingue in window.LAB[lang]; reso qui, ri-reso al cambio lingua.
     - [data-bet="id"]  → window.LAB[l].bet[id]  = {q, opts:[{t,ok,fb}]}  (quiz a scommessa)
     - [data-sort="id"] → window.LAB[l].sort[id] = {labels:[A,B], items:[{t,a,fb}]} (a=true → label A)
     - [data-journal]   → texto persistente (indipendente dalla lingua) */
  function esc(s){ return String(s).replace(/[&<>]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;'}[c];}); }

  function renderLab(l){
    var L = (window.LAB && window.LAB[l]) || {};
    // BET · scommetti prima di sapere
    document.querySelectorAll('[data-bet]').forEach(function(box){
      var cfg = (L.bet || {})[box.getAttribute('data-bet')]; if(!cfg) return;
      var h = '<span class="lab-k">'+esc(cfg.k||'Scommetti')+'</span><div class="lab-q">'+cfg.q+'</div><div class="q-opts">';
      cfg.opts.forEach(function(o,i){ h += '<button class="q-btn" data-i="'+i+'">'+o.t+'</button>'; });
      h += '</div><div class="q-fb" hidden></div>';
      box.innerHTML = h;
      var fb = box.querySelector('.q-fb'), done=false;
      box.querySelectorAll('.q-btn').forEach(function(btn){
        btn.addEventListener('click', function(){
          if(done) return; done=true;
          var o = cfg.opts[+btn.getAttribute('data-i')];
          box.querySelectorAll('.q-btn').forEach(function(b){ b.disabled=true;
            var oo=cfg.opts[+b.getAttribute('data-i')];
            if(oo.ok) b.classList.add('right'); else if(b===btn) b.classList.add('wrong'); else b.classList.add('dim');
          });
          fb.className='q-fb '+(o.ok?'ok':'ko'); fb.hidden=false; fb.innerHTML=o.fb;
        });
      });
    });
    // SORT · è A o è B, con verdetto
    document.querySelectorAll('[data-sort]').forEach(function(box){
      var cfg = (L.sort || {})[box.getAttribute('data-sort')]; if(!cfg) return;
      var st={tot:0,ok:0};
      var h = '<span class="lab-k">'+esc(cfg.k||'Smista')+'</span>';
      if(cfg.q) h += '<div class="lab-q">'+cfg.q+'</div>';
      cfg.items.forEach(function(it,i){
        h += '<div class="sort-item"><div class="si-t"><b>'+(i+1)+'</b>'+it.t+'</div>'+
          '<div class="q-opts row"><button class="q-btn" data-i="'+i+'" data-g="1">'+esc(cfg.labels[0])+'</button>'+
          '<button class="q-btn" data-i="'+i+'" data-g="0">'+esc(cfg.labels[1])+'</button></div>'+
          '<div class="q-fb" data-fb="'+i+'" hidden></div></div>';
      });
      h += '<div class="q-score" hidden></div>';
      box.innerHTML = h;
      var score = box.querySelector('.q-score');
      box.querySelectorAll('.sort-item').forEach(function(item,i){
        var answered=false;
        item.querySelectorAll('.q-btn').forEach(function(btn){
          btn.addEventListener('click', function(){
            if(answered) return; answered=true;
            var guess = btn.getAttribute('data-g')==='1';
            var ok = guess===cfg.items[i].a;
            st.tot++; if(ok) st.ok++;
            item.querySelectorAll('.q-btn').forEach(function(b){ b.disabled=true;
              var g=b.getAttribute('data-g')==='1';
              if(g===cfg.items[i].a) b.classList.add('right'); else if(b===btn) b.classList.add('wrong'); else b.classList.add('dim');
            });
            var fb=item.querySelector('[data-fb="'+i+'"]');
            fb.className='q-fb '+(ok?'ok':'ko'); fb.hidden=false; fb.innerHTML=cfg.items[i].fb;
            if(st.tot===cfg.items.length){
              score.hidden=false;
              var verdict = (st.ok>=Math.ceil(cfg.items.length*0.8)) ? (cfg.win||'') : (cfg.lose||'');
              score.innerHTML = (cfg.scoreLabel||'Punteggio')+': <b>'+st.ok+'/'+st.tot+'</b> '+verdict;
            }
          });
        });
      });
    });
  }

  /* ---------- JOURNAL persistente (transfer personale) ---------- */
  /* Ogni voce salva anche titolo-lezione + domanda: serve a chi poi passa
     l'export a un'AI, per sapere da quale lezione viene ogni appunto. */
  function parseJournalRecord(raw){
    if(!raw) return {t:''};
    try{
      var o = JSON.parse(raw);
      if(o && typeof o==='object' && 't' in o) return o;
    }catch(e){}
    return {t: raw}; // formato precedente: stringa semplice, si migra al primo salvataggio
  }

  function initJournal(){
    document.querySelectorAll('[data-journal]').forEach(function(ta){
      var pageId = (window.PAGE && window.PAGE.id) || 'x';
      var key = 'sp-journal-'+pageId+'-'+ta.getAttribute('data-journal');
      var box = ta.closest('.journal-c') || ta.parentElement;
      var question = (box.querySelector('p') || {}).textContent || '';
      var rec;
      try{ rec = parseJournalRecord(localStorage.getItem(key)); }catch(e){ rec = {t:''}; }
      ta.value = rec.t || '';
      var saved = ta.parentElement.querySelector('.saved'), t;
      ta.addEventListener('input', function(){
        clearTimeout(t);
        t=setTimeout(function(){
          try{
            var payload = JSON.stringify({ t: ta.value, title: document.title, page: pageId, q: question, ts: new Date().toISOString() });
            localStorage.setItem(key, payload);
            if(saved) saved.textContent = ta.getAttribute('data-saved')||'salvato sul tuo dispositivo';
          }catch(e){}
        }, 350);
      });
    });
  }

  /* ---------- EXPORT appunti (backup locale, leggibile da un'AI) ---------- */
  function exportJournal(){
    var entries = [];
    try{
      for(var i=0;i<localStorage.length;i++){
        var k = localStorage.key(i);
        if(k && k.indexOf('sp-journal-')===0){
          var rec = parseJournalRecord(localStorage.getItem(k));
          if(rec.t && rec.t.trim()) entries.push(rec);
        }
      }
    }catch(e){}
    if(!entries.length){ alert('Nessun appunto salvato ancora su questo dispositivo.'); return; }
    entries.sort(function(a,b){ return (a.title||a.page||'').localeCompare(b.title||b.page||''); });
    var md = '# I miei appunti\n\n';
    entries.forEach(function(e){
      md += '## '+(e.title || e.page || 'Lezione')+'\n\n';
      if(e.q) md += '**Domanda:** '+e.q+'\n\n';
      md += e.t+'\n\n';
      if(e.ts) md += '_salvato: '+e.ts.slice(0,16).replace('T',' ')+'_\n\n';
      md += '---\n\n';
    });
    try{
      var blob = new Blob([md], {type:'text/markdown'});
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url; a.download = 'appunti-'+new Date().toISOString().slice(0,10)+'.md';
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(function(){ URL.revokeObjectURL(url); }, 1000);
    }catch(e){}
  }
  window.exportJournal = exportJournal;

  /* ---------- HOME BUTTON (torna a tutte le lezioni) ---------- */
  function homeLabel(l){ return l === 'en' ? 'All lessons' : 'Tutte le lezioni'; }
  function injectHomeBtn(){
    if (window.PAGE && window.PAGE.id === 'mm-hub') return; // sei gia' alla home
    var tools = document.querySelector('.bar .tools');
    if (!tools || document.getElementById('sp-home-btn')) return;
    if (!document.getElementById('sp-home-css')) {
      var st = document.createElement('style'); st.id = 'sp-home-css';
      st.textContent = '#sp-home-btn{white-space:nowrap}@media(max-width:720px){#sp-home-btn .hb-t{display:none}#sp-home-btn{padding:0 12px}}';
      document.head.appendChild(st);
    }
    var a = document.createElement('a');
    a.id = 'sp-home-btn';
    a.className = 'pdf-btn';
    a.href = 'index.html';
    a.title = homeLabel(LANG);
    a.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg><span class="hb-t">' + homeLabel(LANG) + '</span>';
    tools.insertBefore(a, tools.firstChild);
  }
  function updateHomeBtn(l){
    var a = document.getElementById('sp-home-btn'); if (!a) return;
    a.title = homeLabel(l);
    var t = a.querySelector('.hb-t'); if (t) t.textContent = homeLabel(l);
  }

  function injectExportBtn(){
    var tools = document.querySelector('.bar .tools');
    if(!tools || document.getElementById('sp-export-btn')) return;
    var btn = document.createElement('button');
    btn.id = 'sp-export-btn';
    btn.className = 'ic-btn';
    btn.type = 'button';
    btn.setAttribute('aria-label','Esporta i tuoi appunti');
    btn.title = 'Esporta i tuoi appunti';
    btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12M7 10l5 5 5-5M4 21h16"/></svg>';
    btn.addEventListener('click', exportJournal);
    tools.insertBefore(btn, tools.firstChild);
  }

  /* ---------- PROMPT-BOX (copia negli appunti per un'AI esterna) ---------- */
  function fallbackCopy(text){
    try{
      var ta = document.createElement('textarea');
      ta.value = text; ta.style.position='fixed'; ta.style.opacity='0';
      document.body.appendChild(ta); ta.focus(); ta.select();
      document.execCommand('copy'); document.body.removeChild(ta);
    }catch(e){}
  }
  function initPromptBox(){
    document.querySelectorAll('.prompt-box .pb-copy').forEach(function(btn){
      if(btn.dataset.wired) return; btn.dataset.wired = '1';
      var box = btn.closest('.prompt-box');
      var pre = box && box.querySelector('pre');
      if(!pre) return;
      var original = btn.textContent;
      btn.addEventListener('click', function(){
        var text = pre.textContent;
        var mark = function(){
          btn.classList.add('done');
          btn.textContent = btn.getAttribute('data-copied') || '✓';
          setTimeout(function(){ btn.classList.remove('done'); btn.textContent = original; }, 1400);
        };
        if(navigator.clipboard && navigator.clipboard.writeText){
          navigator.clipboard.writeText(text).then(mark).catch(function(){ fallbackCopy(text); mark(); });
        } else { fallbackCopy(text); mark(); }
      });
    });
  }

  /* ---------- TEMA ---------- */
  function applyTheme(t) {
    document.documentElement.classList.toggle('dark', t === 'dark');
    localStorage.setItem('sp-theme', t);
  }
  window.toggleTheme = function () {
    applyTheme(document.documentElement.classList.contains('dark') ? 'light' : 'dark');
  };

  /* ---------- DRAW-ON-SCROLL (misura le path .draw) ---------- */
  function prepDraw(root) {
    (root || document).querySelectorAll('svg .draw').forEach(function (p) {
      try {
        var len = (p.getTotalLength ? p.getTotalLength() : 0) || 1000;
        p.style.setProperty('--len', Math.ceil(len));
      } catch (e) {}
    });
  }
  function runDraw(el, includeHold) {
    // avvia il disegno delle path .draw e il pop delle .pop dentro un elemento.
    // gli elementi .hold restano fermi al reveal e si attivano solo su fire.
    el.querySelectorAll('.draw').forEach(function (p) {
      if (!includeHold && p.classList.contains('hold')) return;
      var d = parseInt(p.getAttribute('data-delay') || '0', 10);
      setTimeout(function () { p.classList.add('drawn'); }, d);
    });
    el.querySelectorAll('.pop').forEach(function (p) {
      if (!includeHold && p.classList.contains('hold')) return;
      var d = parseInt(p.getAttribute('data-delay') || '0', 10);
      setTimeout(function () { p.classList.add('in'); }, d);
    });
  }

  /* ---------- REVEAL-ON-SCROLL ---------- */
  function initReveal() {
    var items = document.querySelectorAll('.rv');
    if (!('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('show'); runDraw(el); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('show');
          runDraw(e.target);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ---------- SET-PIECE (bottoni "fire" scattati dal conduttore) ---------- */
  function initFire() {
    document.querySelectorAll('[data-fire]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var sel = btn.getAttribute('data-fire');
        var target = document.getElementById(sel) || document.querySelector(sel);
        if (!target) return;
        target.classList.add('fired');
        // anima le .pop / .draw interne del bersaglio (anche quelle .hold), in stagger
        runDraw(target, true);
        btn.classList.add('done');
        var done = btn.getAttribute('data-done');
        if (done) { var lbl = btn.querySelector('[data-firelabel]'); if (lbl) lbl.textContent = done; }
        if (typeof window.onFire === 'function') window.onFire(sel, target);
      });
    });
  }

  /* ---------- PROGRESS della sessione ---------- */
  function markVisited() {
    if (!window.PAGE || !window.PAGE.id) return;
    try {
      var v = JSON.parse(localStorage.getItem('s4-progress') || '{}');
      v[window.PAGE.id] = 1;
      localStorage.setItem('s4-progress', JSON.stringify(v));
    } catch (e) {}
  }
  window.getProgress = function () {
    try { return JSON.parse(localStorage.getItem('s4-progress') || '{}'); }
    catch (e) { return {}; }
  };

  /* ---------- BOOT ---------- */
  function boot() {
    prepDraw(document);
    applyLang(LANG);
    initReveal();
    initFire();
    initJournal();
    injectExportBtn();
    injectHomeBtn();
    initPromptBox();
    markVisited();
    // ricalcola le lunghezze draw al resize (layout responsivo)
    var rt;
    window.addEventListener('resize', function () {
      clearTimeout(rt); rt = setTimeout(function () { prepDraw(document); }, 200);
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
