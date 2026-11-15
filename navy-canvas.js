/* NAVY CANVAS — experiment script. Classic script (works from file://). GSAP is optional: without it, or with
   reduced motion, the page renders its final state. All inbox rows are illustrative demo data. */
(function () {
  'use strict';
  const d = document, root = d.documentElement, V = root.dataset.v === 'c' ? 'c' : 'b';
  const $ = (s, r = d) => r.querySelector(s), $$ = (s, r = d) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const G = window.gsap, ST = window.ScrollTrigger;
  const motion = !reduce && !!G && !!ST;
  if (motion) G.registerPlugin(ST);
  const desktop = () => innerWidth >= 1024;
  const SVGNS = 'http://www.w3.org/2000/svg';
  const el = (tag, attrs) => { const n = d.createElementNS(SVGNS, tag); for (const k in attrs) n.setAttribute(k, attrs[k]); return n; };

  /* ---------- channel marks (official WhatsApp / Messenger / Instagram glyphs from assets/logos) ---------- */
  const LOGO = Object.assign({
    sms: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="m22 7-10 6L2 7" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>',
  }, window.NC_LOGOS || {});
  const logo = ch => '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' + (LOGO[ch] || '') + '</svg>';
  $$('[data-lg]').forEach(n => { n.innerHTML = logo(n.dataset.lg); });
  window.NC = { logo };
  $$('[data-sw]').forEach(a => { if (a.dataset.sw === V) a.setAttribute('aria-current', 'page'); });

  const COL = { wa: '#25D366', fb: '#0084FF', ig: '#E4405F', sms: '#5B6B82', mail: '#6C5CE7' };
  const NAME = { wa: 'واتساب للأعمال', fb: 'فيسبوك ماسنجر', ig: 'رسائل إنستغرام', sms: 'الرسائل النصية', mail: 'البريد الإلكتروني' };
  const POOL = {   // illustrative inbox data (same sample set as the Weave experiment)
    wa: [['ن', 'نورة', 'السلام عليكم، عندكم توصيل اليوم؟'], ['س', 'سارة', 'أبي أعرف تفاصيل الطلب']],
    fb: [['ف', 'فهد', 'تعليق على منشور: متى يتوفر العرض؟']],
    ig: [['خ', 'خالد', 'كم سعر عطر العود الملكي؟'], ['ر', 'ريم', 'رد على قصتك: متوفر؟']],
    sms: [['ع', 'عبدالله', 'وصلني تنبيه الطلب، شكراً']],
    mail: [['م', 'مها', 'أرغب بمعرفة طرق الدفع المتاحة']],
  };
  const AGENTS = ['أحمد', 'سارة', 'منى'];

  /* ---------- inbox list ---------- */
  function Inbox(list, max) {
    const turn = {}; let n = 0, filter = null;
    function row(ch, isNew) {
      const p = POOL[ch][(turn[ch] = (turn[ch] === undefined ? -1 : turn[ch]) + 1) % POOL[ch].length];
      const li = d.createElement('li'); li.className = 'row' + (isNew ? ' new' : ''); li.dataset.ch = ch;
      li.innerHTML = '<span class="av">' + p[0] + '<span class="lg c-' + ch + '">' + logo(ch) + '</span></span>' +
        '<div class="row-main"><p class="row-top"><span>' + p[1] + '</span><time>' + (isNew ? 'الآن' : 'قبل دقائق') + '</time></p><p class="row-txt">' + p[2] + '</p></div>' +
        '<span class="who' + (isNew ? '' : ' on') + '">' + AGENTS[n++ % 3] + '</span>';
      if (filter && ch !== filter) li.classList.add('dim');
      return li;
    }
    return {
      seed(arr) { arr.forEach(ch => list.append(row(ch, false))); },
      add(ch) {
        const li = row(ch, true); list.prepend(li);
        while (list.children.length > max) list.lastElementChild.remove();
        setTimeout(() => li.querySelector('.who').classList.add('on'), 900);   // auto-assignment
        setTimeout(() => li.classList.remove('new'), 1500);
      },
      filter(ch) { filter = ch; $$('.row', list).forEach(r => r.classList.toggle('dim', !!ch && r.dataset.ch !== ch)); },
    };
  }

  /* ---------- geometry: orthogonal routes with rounded corners ---------- */
  function rpath(pts, r) {
    pts = pts.filter((p, i) => !i || Math.hypot(p[0] - pts[i - 1][0], p[1] - pts[i - 1][1]) > 0.5);
    let s = 'M' + pts[0][0].toFixed(1) + ' ' + pts[0][1].toFixed(1);
    for (let i = 1; i < pts.length - 1; i++) {
      const a = pts[i - 1], b = pts[i], c = pts[i + 1];
      const d1 = Math.hypot(b[0] - a[0], b[1] - a[1]), d2 = Math.hypot(c[0] - b[0], c[1] - b[1]), rr = Math.min(r, d1 / 2, d2 / 2);
      s += ' L' + (b[0] - (b[0] - a[0]) / d1 * rr).toFixed(1) + ' ' + (b[1] - (b[1] - a[1]) / d1 * rr).toFixed(1) +
        ' Q' + b[0].toFixed(1) + ' ' + b[1].toFixed(1) + ' ' + (b[0] + (c[0] - b[0]) / d2 * rr).toFixed(1) + ' ' + (b[1] + (c[1] - b[1]) / d2 * rr).toFixed(1);
    }
    const z = pts[pts.length - 1];
    return s + ' L' + z[0].toFixed(1) + ' ' + z[1].toFixed(1);
  }
  /* a dot that rides a path, then calls back */
  function Flow(svg) {
    const fl = []; let raf = 0, last = 0;
    function tick(ts) {
      const dt = Math.min(0.05, (ts - (last || ts)) / 1000); last = ts;
      for (let i = fl.length - 1; i >= 0; i--) {
        const f = fl[i]; f.t += dt / f.dur;
        const e = f.t < 0.5 ? 2 * f.t * f.t : 1 - Math.pow(-2 * f.t + 2, 2) / 2;
        if (!f.path.isConnected) { f.dot.remove(); fl.splice(i, 1); continue; }
        const p = f.path.getPointAtLength(f.len * Math.min(1, e)); f.dot.setAttribute('cx', p.x); f.dot.setAttribute('cy', p.y);
        if (f.t >= 1) { f.dot.remove(); fl.splice(i, 1); f.done(); }
      }
      raf = fl.length ? requestAnimationFrame(tick) : 0; if (!raf) last = 0;
    }
    return function launch(path, color, dur, done) {
      const dot = el('circle', { r: 5.5, fill: color, stroke: '#fff', 'stroke-width': 2 }); svg.append(dot);
      fl.push({ dot, path, len: path.getTotalLength(), t: 0, dur, done });
      if (!raf) raf = requestAnimationFrame(tick);
    };
  }
  const retrigger = (n, cls) => { n.classList.remove(cls); void n.offsetWidth; n.classList.add(cls); };
  /* run fn every ms while the element is on screen and the tab is visible */
  function whileVisible(target, ms, fn) {
    let vis = false; new IntersectionObserver(([e]) => { vis = e.isIntersecting; }, { threshold: 0.25 }).observe(target);
    setInterval(() => { if (vis && !d.hidden) fn(); }, ms);
  }

  /* ================= HERO ================= */
  const hero = $('[data-hero]'), stage = $('[data-stage]'), lap = $('[data-lap]'), screen = $('[data-screen]'), ui = $('[data-ui]');
  const lines = $('[data-lines]'), cards = stage ? $$('.card', stage) : [], dots = $('[data-dots]'), sheet = $('[data-sheet]'), mchips = $$('[data-mchips] li');
  const OLD_HERO = !!stage;   /* the laptop hero was replaced by the phone hero (hero-phone.js); its code below only runs if that markup is present */
  const heroInbox = OLD_HERO ? Inbox($('[data-inbox="hero"]'), 7) : null; if (OLD_HERO) heroInbox.seed(['ig', 'fb', 'mail', 'sms', 'wa', 'ig', 'fb']);
  const ANCH = V === 'c' ? { wa: 'l', fb: 'l', ig: 'l', sms: 't', mail: 't' } : { wa: 'r', ig: 'r', mail: 'r', fb: 'l', sms: 'l' };
  let wires = {}, introDone = !motion;

  function layoutHero() {
    if (!OLD_HERO) return;
    // the inbox is drawn at a fixed size and scaled into the laptop screen; phones get a narrower, simpler layout (see "mlap" in sections.css)
    const sc = 'scale(' + (screen.clientWidth / (!desktop() && innerWidth < 768 ? 300 : 640)) + ')';
    ui.style.transform = desktop() ? sc : ''; ui.style.setProperty('--ui-s', sc);
    if (motion && !introDone && lines.childElementCount) return;   // never rebuild the wires under the intro
    lines.replaceChildren(); wires = {};
    if (!desktop()) return;
    const lx = lap.offsetLeft, ly = lap.offsetTop, lw = lap.offsetWidth, lh = lap.offsetHeight;
    const L = lx + lw * 0.124, R = lx + lw * 0.876, T = ly + lh * 0.037, sT = ly + lh * 0.09, sH = lh * 0.6;
    const cnt = { l: 0, r: 0, t: 0 }, idx = { l: 0, r: 0, t: 0 };
    cards.forEach(c => { cnt[ANCH[c.dataset.ch]]++; });
    cards.forEach(c => {
      const ch = c.dataset.ch, a = ANCH[ch], k = ++idx[a] / (cnt[a] + 1);
      const cx = c.offsetLeft, cy = c.offsetTop, cw = c.offsetWidth, chh = c.offsetHeight; let pts, port;
      if (a === 't') {
        const x1 = cx + cw / 2, y1 = cy + chh, x2 = L + (R - L) * k, my = y1 + (T - y1) * 0.5;
        pts = [[x1, y1], [x1, my], [x2, my], [x2, T]]; port = [x2, T];
      } else {
        const x1 = a === 'l' ? cx + cw : cx, x2 = a === 'l' ? L : R, y1 = cy + chh / 2, y2 = sT + sH * k, mx = x1 + (x2 - x1) * 0.5;
        pts = [[x1, y1], [mx, y1], [mx, y2], [x2, y2]]; port = [x2, y2];
      }
      const p = el('path', { d: rpath(pts, 14), class: 'wire' }); lines.append(p);
      const dot = el('circle', { cx: port[0], cy: port[1], r: 4, class: 'port' }); lines.append(dot);
      wires[ch] = { p, dot, card: c };
    });
  }
  layoutHero();
  const launchHero = Flow(lines);
  const ORDER = ['wa', 'ig', 'fb', 'mail', 'sms']; let turn = 0;
  function arriveHero(ch) { heroInbox.add(ch); retrigger(dots, 'typing'); }
  function sendHero() {
    if (!introDone) return;
    const ch = ORDER[turn++ % ORDER.length], w = wires[ch];
    if (w && desktop()) { retrigger(w.card, 'ping'); launchHero(w.p, COL[ch], 1.15, () => arriveHero(ch)); }
    else { const c = mchips[ORDER.indexOf(ch)]; if (c) retrigger(c, 'ping'); setTimeout(() => arriveHero(ch), 450); }
  }
  if (!reduce && OLD_HERO) whileVisible(hero, 1900, sendHero);

  /* ================= CHANNELS → ONE INBOX ================= */
  const grid = $('[data-chgrid]'), chsvg = $('[data-chlines]'), index = $('[data-chindex]'), items = $$('.ch-item', index);
  const slab = $('[data-slab]'), app = $('.app', slab), chdots = $('[data-chdots]'), flabel = $('[data-filter-label]');
  const chInbox = Inbox($('[data-inbox="channels"]'), 6); chInbox.seed(['wa', 'ig', 'fb', 'mail', 'sms', 'wa']);
  let chPaths = {}, chFilter = null, chTweens = [];
  function layoutChannels() {
    chTweens.forEach(t => { t.scrollTrigger && t.scrollTrigger.kill(); t.kill(); }); chTweens = [];
    chsvg.replaceChildren(); chPaths = {};
    if (!desktop()) return;
    const g = grid.getBoundingClientRect(), a = app.getBoundingClientRect();
    const x2 = a.right - g.left, y2 = a.top - g.top + 26, xs = slab.getBoundingClientRect().right - g.left;
    let mx = 0, yLast = y2;
    items.forEach(it => {
      const r = it.getBoundingClientRect(), ch = it.dataset.ch, x1 = r.left - g.left - 10, y1 = r.top - g.top + r.height / 2;
      mx = xs + (x1 - xs) * 0.5; yLast = Math.max(yLast, y1);
      const p = el('path', { d: rpath([[x1, y1], [mx, y1], [mx, y2], [x2, y2]], 22), stroke: COL[ch], 'stroke-opacity': 0.75, 'data-ch': ch });
      chsvg.append(p); chPaths[ch] = p; chsvg.append(el('circle', { cx: x1, cy: y1, r: 4, fill: COL[ch] }));
    });
    // where the five routes share a path they become one mint trunk into the inbox
    const trunk = el('path', { d: rpath([[mx, yLast - 22], [mx, y2], [x2, y2]], 22), stroke: '#12C99B', 'stroke-width': 3.5, class: 'match trunk' }); chsvg.append(trunk);
    chsvg.append(el('circle', { cx: x2, cy: y2, r: 6, fill: '#12C99B', stroke: '#fff', 'stroke-width': 2 }));
    applyFilter();
    if (motion) {
      const ps = [...Object.values(chPaths), trunk];
      ps.forEach(p => { const len = p.getTotalLength(); p.style.strokeDasharray = len; p.style.strokeDashoffset = len; });
      chTweens.push(G.to(ps, { strokeDashoffset: 0, ease: 'none', stagger: 0.12, scrollTrigger: { trigger: grid, start: 'top 82%', end: 'top 28%', scrub: 0.5 } }));
    }
  }
  function applyFilter() {
    index.classList.toggle('filtered', !!chFilter); chsvg.classList.toggle('filtered', !!chFilter);
    items.forEach(it => it.setAttribute('aria-pressed', String(it.dataset.ch === chFilter)));
    for (const ch in chPaths) chPaths[ch].classList.toggle('match', ch === chFilter);
    chInbox.filter(chFilter);
    flabel.textContent = chFilter ? NAME[chFilter] + ' فقط' : 'كل القنوات';
  }
  items.forEach(it => it.addEventListener('click', () => { chFilter = chFilter === it.dataset.ch ? null : it.dataset.ch; applyFilter(); }));
  const launchCh = Flow(chsvg); let chTurn = 0;
  function arriveCh(ch) {
    chInbox.add(ch); retrigger(chdots, 'typing');
    const c = $('.ch-item[data-ch="' + ch + '"] [data-count]'); c.textContent = +c.textContent + 1;
  }
  if (!reduce) whileVisible(grid, 2100, () => {
    const ch = chFilter && chTurn++ % 3 ? chFilter : ORDER[chTurn++ % ORDER.length], p = chPaths[ch];
    if (p && desktop() && (!motion || parseFloat(p.style.strokeDashoffset) < 1)) launchCh(p, COL[ch], 1.5, () => arriveCh(ch)); else arriveCh(ch);
  });

  /* ================= header ================= */
  const header = $('[data-header]');
  const onScroll = () => header.classList.toggle('scrolled', scrollY > 40);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* ================= motion ================= */
  if (!motion) { root.classList.remove('anim'); layoutChannels(); }
  else {
    root.classList.remove('anim');   // same task as the tweens below, so nothing paints in between and GSAP reads true end values
    const dk = desktop();
    if (OLD_HERO) {
    const tl = G.timeline({ defaults: { ease: 'power3.out' }, onComplete: () => { introDone = true; } });
    // 1–2  the light environment, then the navy plane
    if (V === 'b') tl.from(sheet, { yPercent: 100, duration: 1.25, ease: 'power4.out' }, 0);
    else tl.from(sheet, dk ? { scaleX: 0, transformOrigin: '0 50%', duration: 1.1, ease: 'power4.inOut' } : { scaleY: 0, transformOrigin: '50% 100%', duration: 1.1, ease: 'power4.inOut' }, 0);
    if (V === 'b' && dk) tl.from('.echo', { yPercent: 100, duration: 1.4, stagger: 0.14, ease: 'power4.out' }, 0.12);
    // 3  headline: lines rise out of their masks, then the mint rule draws under the key phrase
    tl.from('.hero .pill', { autoAlpha: 0, y: 10, duration: 0.6 }, 0.3)
      .from('.hero .in', { yPercent: 125, duration: 1.05, stagger: 0.11, ease: 'power4.out' }, 0.35)
      .fromTo('[data-mark]', { '--u': '0%' }, { '--u': '100%', duration: 0.8, ease: 'power2.inOut' }, 1.0)
      .from('.hero .copy [data-in="fade"]:not(.pill)', { autoAlpha: 0, y: 16, duration: 0.7, stagger: 0.09 }, 0.75)
    // 4–5  the laptop arrives, its screen wakes and the inbox fills
      .from(lap, { y: 110, scale: 0.94, autoAlpha: 0, transformOrigin: '50% 90%', duration: 1.3 }, 0.6)
      .from(ui, { opacity: 0, duration: 0.45, ease: 'none' }, 1.35)
      .fromTo($$('.row', ui), { opacity: 0, x: 22 }, { opacity: 1, x: 0, duration: 0.5, stagger: 0.05, clearProps: 'opacity,transform' }, 1.45)
      .from($$('.bub', ui), { opacity: 0, y: 8, duration: 0.4, stagger: 0.1 }, 1.6)
      .from('.stage > [data-in="fade"]', { autoAlpha: 0, duration: 0.6 }, 1.6)
      .from(dots.children, { scale: 0, duration: 0.5, stagger: 0.08, ease: 'back.out(2.4)' }, 1.5);
    // 6–7  notifications arrive from their own side, then each draws its line to the laptop
    if (dk) {
      cards.forEach((c, i) => {
        const a = ANCH[c.dataset.ch], t = 1.55 + i * 0.12, w = wires[c.dataset.ch];
        tl.from(c, { autoAlpha: 0, x: a === 'l' ? -80 : a === 'r' ? 80 : 0, y: a === 't' ? -60 : 20, scale: 0.9, duration: 0.85, ease: 'back.out(1.5)' }, t);
        if (w) {
          const len = w.p.getTotalLength(); w.p.style.strokeDasharray = len;
          tl.fromTo(w.p, { strokeDashoffset: len }, { strokeDashoffset: 0, duration: 0.75, ease: 'power2.inOut' }, t + 0.45)
            .from(w.dot, { scale: 0, transformOrigin: '50% 50%', duration: 0.35, ease: 'back.out(3)' }, t + 1.1);
        }
      });
    } else tl.from(mchips, { autoAlpha: 0, y: -16, duration: 0.5, stagger: 0.07, ease: 'back.out(1.8)' }, 1.3);
    tl.add(() => { for (const k in wires) wires[k].p.style.strokeDasharray = 'none'; });

    // pointer parallax: notifications and laptop sit at different depths
    if (dk && matchMedia('(hover: hover)').matches) {
      hero.addEventListener('pointermove', e => {
        const r = hero.getBoundingClientRect();
        G.to(stage, { '--mx': (e.clientX - r.left) / r.width * 2 - 1, '--my': (e.clientY - r.top) / r.height * 2 - 1, duration: 0.9, ease: 'power3.out', overwrite: 'auto' });
      });
    }
    // scroll: B — the sheet opens to the full width and becomes the next band; both — depth drift
    if (V === 'b' && dk) {
      const st = { k: 0 };
      G.to(st, { k: 1, ease: 'none', /* tied to the scroll distance from the very top, so at rest the sheet is always fully rounded whatever the screen height */
        scrollTrigger: { start: 0, end: () => Math.max(260, stage.getBoundingClientRect().bottom + scrollY - innerHeight * 0.88), scrub: 0.4, invalidateOnRefresh: true },
        onUpdate() { const pad = Math.max(24, (root.clientWidth - 1320) / 2); sheet.style.setProperty('--in', (pad * (1 - st.k)).toFixed(1) + 'px'); sheet.style.setProperty('--r', (64 * (1 - st.k)).toFixed(1) + 'px'); } });
    }
    if (dk) {
      G.to(lap, { yPercent: -6, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 0.5 } });
      cards.forEach((c, i) => G.to(c, { yPercent: -40 - i * 22, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 0.5 } }));
    }
    }

    // metrics: numbers rise out of the rule, one after another
    G.from('[data-metrics] [data-rv]', { yPercent: 115, duration: 1, stagger: 0.12, ease: 'power4.out', scrollTrigger: { trigger: '[data-metrics]', start: 'top 86%' } });
    // section copy
    $$('[data-head], [data-cta] .wrap').forEach(box => {
      const t = G.timeline({ defaults: { ease: 'power4.out' }, scrollTrigger: { trigger: box, start: 'top 80%' } });
      t.from($$('[data-rv="line"]', box), { yPercent: 125, duration: 1, stagger: 0.12 }, 0)
        .from($$('[data-rv=""]', box), { autoAlpha: 0, y: 18, duration: 0.7, stagger: 0.1 }, 0.15);
    });
    // channels: rows of the index are ruled in, the navy slab wipes open from the side the lines arrive on
    G.fromTo(items, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6, stagger: 0.08, clearProps: 'opacity,visibility', scrollTrigger: { trigger: index, start: 'top 82%' } });
    G.fromTo(slab, { clipPath: 'inset(0% 0% 0% 100% round 28px)' }, { clipPath: 'inset(0% 0% 0% 0% round 28px)', duration: 1.2, ease: 'power4.inOut', scrollTrigger: { trigger: slab, start: 'top 82%' } });
    G.from(app, { y: 50, autoAlpha: 0, duration: 0.9, delay: 0.45, scrollTrigger: { trigger: slab, start: 'top 82%' } });
    // closing: the bubble outline draws with the scroll
    const cg = $('[data-ctageo] path'), cl = cg.getTotalLength();
    cg.style.strokeDasharray = cl;
    G.fromTo(cg, { strokeDashoffset: cl }, { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: '[data-cta]', start: 'top 85%', end: 'center 55%', scrub: 0.6 } });

    layoutChannels();
  }

  /* ================= resize ================= */
  let rt, lastW = innerWidth;
  addEventListener('resize', () => {
    clearTimeout(rt); rt = setTimeout(() => {
      if (innerWidth === lastW) return; lastW = innerWidth;
      layoutHero(); layoutChannels(); if (motion) ST.refresh();
    }, 160);
  });
  addEventListener('load', () => { layoutHero(); layoutChannels(); if (motion) ST.refresh(); });
  if (d.fonts && d.fonts.ready) d.fonts.ready.then(() => { layoutChannels(); if (motion) ST.refresh(); });
})();
