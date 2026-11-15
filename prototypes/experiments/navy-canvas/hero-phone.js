/* NAVY CANVAS — PREMIUM HERO COMPOSITIONS
   One file, three motion systems, chosen by <body data-concept>:
   A Studio        cinematic: the product settles out of the dark while the screen content fades in once; then the labels are placed.
   B Architecture  mechanical: surfaces slide into position on straight axes and the product is drawn out through the opening;
                   on scroll the surfaces move at different depths.
   C Editorial     typographic: the navy block wipes in, the headline rises line by line, the product slides under the type;
                   captions move the crop across the screen.
   Without motion (reduced motion or ?still) each page shows its finished composition and stays interactive. */
(function () {
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const concept = 'a', anim = document.documentElement.classList.contains('pa-anim') && window.gsap;   /* in Navy Canvas only composition A (the phone hero) is used */
  const header = $('[data-header]');
  if (concept !== 'c') { const onScroll = () => header.classList.toggle('scrolled', scrollY > 40); addEventListener('scroll', onScroll, { passive: true }); onScroll(); }
  const S = window.CCScreen, scr = concept === 'a' ? null : S.render($('[data-screen]'));
  const q = new URLSearchParams(location.search), at = q.get('at');
  const freeze = tl => { if (!at) return; tl.pause(); if (at === 'end') tl.progress(1); else tl.time(+at); };
  const copyIn = tl => tl.from('[data-in="line"]', { yPercent: 115, duration: 1, stagger: .1, ease: 'power4.out' }, .2)
    .from('[data-in="fade"]', { y: 16, opacity: 0, duration: .8, stagger: .08, ease: 'power3.out' }, .45)
    .fromTo('[data-mark]', { '--u': '0%' }, { '--u': '100%', duration: .9, ease: 'power2.inOut' }, 1.1);

  /* ===================== A — STUDIO ===================== */
  if (concept === 'a') {
    /* the screen's four corners in the photograph, as fractions of the image (measured from the picture) */
    const QUAD = [[.4141, .0915], [.5954, .1170], [.5943, .8489], [.4141, .8718]];
    const shot = $('[data-shot]'), plane = $('[data-plane]'), cards = $$('[data-cards] li'), wiresSvg = $('[data-wires]');
    /* ---- the screen: the illustrated inbox from the Navy Canvas hero (same markup and styles), drawn at 640 x 406 ---- */
    const UW = 210, UH = 575, KIT = '../../../ClickChat-Brand-Identity/ClickChat-Brand-Identity/';
    const LOGO = Object.assign({
      sms: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/>',
      mail: '<rect x="2" y="4" width="20" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="m22 7-10 6L2 7" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>',
    }, window.NC_LOGOS || {});
    const logo = ch => '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' + (LOGO[ch] || '') + '</svg>';
    const ic = (n, s) => '<span data-icon="' + n + '" data-size="' + s + '"></span>';
    const host = $('[data-screen]');
    /* a phone shows the inbox list only: brand bar, channel filter, conversations */
    host.innerHTML = '<div class="lap-ui ui ph-ui" aria-hidden="true"><div class="ph-status"><span class="num">9:41</span><i></i></div>' +
      '<div class="ui-bar"><img src="' + KIT + '01-Logo/03-icon/SVG/clickchat-icon-color.svg" alt=""><span>صندوق الوارد</span><span class="ui-live">مباشر</span></div>' +
      '<div class="ph-tabs"><b>الكل</b><span>واتساب</span><span>إنستغرام</span><span>ماسنجر</span></div>' +
      '<ul class="ui-list" data-inbox></ul>' +
      '<div class="ph-nav"><span class="on">' + ic('inbox', 15) + '</span><span>' + ic('users', 15) + '</span><span>' + ic('megaphone', 15) + '</span><span>' + ic('bot', 15) + '</span></div></div>';
    /* two more screens for the scroll story: the live site's demo conversation with its AI reply, and a campaign (illustrative figures) */
    host.insertAdjacentHTML('afterend',
      '<div class="ph-alt ui" data-alt="1" aria-hidden="true"><div class="ph-status"><span class="num">9:41</span><i></i></div><div class="ui-th-head"><span class="av">ن<span class="lg c-wa">' + logo('wa') + '</span></span><b>نورة</b><span class="ui-tag">واتساب</span></div>' +
      '<div class="ui-th-body"><p class="bub c">السلام عليكم، عندكم توصيل اليوم؟</p><p class="bub t"><span class="ai">' + ic('sparkles', 9) + 'رد آلي</span>وعليكم السلام 🌿 نعم! اطلب قبل الساعة 4 ويوصلك اليوم.</p><p class="bub c">ممتاز، أبي واحد 👍</p><p class="bub t"><span class="ai">' + ic('sparkles', 9) + 'رد آلي</span>تم تجهيز طلبك 🎉 هذا رابط الدفع: <span class="num" lang="en">pay.link/…</span></p></div><div class="ui-compose">اكتب رسالة…<i></i></div></div>' +
      '<div class="ph-alt ui" data-alt="2" aria-hidden="true"><div class="ph-status"><span class="num">9:41</span><i></i></div><div class="ui-bar"><img src="' + KIT + '01-Logo/03-icon/SVG/clickchat-icon-color.svg" alt=""><span>الحملات</span></div>' +
      '<div class="ph-camp"><p class="ph-camp-n">عرض نهاية الأسبوع<span>حملة واتساب · مجدولة</span></p><div class="ph-camp-bar"><i></i></div>' +
      '<ul><li><span>أُرسلت</span><b class="num">1,240</b></li><li><span>سُلّمت</span><b class="num">1,198</b></li><li><span>قُرئت</span><b class="num">986</b></li><li><span>ردّوا</span><b class="num">214</b></li></ul></div></div>');
    window.renderIcons && renderIcons(plane);
    /* illustrative inbox data (the Navy Canvas sample set); a new message is assigned to a teammate a moment after it arrives */
    const POOL = { wa: [['ن', 'نورة', 'السلام عليكم، عندكم توصيل اليوم؟'], ['س', 'سارة', 'أبي أعرف تفاصيل الطلب']], fb: [['ف', 'فهد', 'تعليق على منشور: متى يتوفر العرض؟']], ig: [['خ', 'خالد', 'كم سعر عطر العود الملكي؟'], ['ر', 'ريم', 'رد على قصتك: متوفر؟']], sms: [['ع', 'عبدالله', 'وصلني تنبيه الطلب، شكراً']], mail: [['م', 'مها', 'أرغب بمعرفة طرق الدفع المتاحة']] };
    const AGENTS = ['أحمد', 'سارة', 'منى'], list = $('[data-inbox]', host), turn = {}; let nRow = 0;
    function row(ch, isNew) {
      const p = POOL[ch][(turn[ch] = (turn[ch] === undefined ? -1 : turn[ch]) + 1) % POOL[ch].length], li = document.createElement('li');
      li.className = 'row' + (isNew ? ' new' : '');
      li.innerHTML = '<span class="av">' + p[0] + '<span class="lg c-' + ch + '">' + logo(ch) + '</span></span><div class="row-main"><p class="row-top"><span>' + p[1] + '</span><time>' + (isNew ? 'الآن' : 'قبل دقائق') + '</time></p><p class="row-txt">' + p[2] + '</p></div><span class="who' + (isNew ? '' : ' on') + '">' + AGENTS[nRow++ % 3] + '</span>';
      return li;
    }
    ['ig', 'fb', 'mail', 'sms', 'wa', 'ig', 'fb', 'wa', 'mail'].forEach(ch => list.append(row(ch, false)));
    cards.forEach(c => { $('[data-lg]', c).innerHTML = logo(c.dataset.ch); });
    const cardOf = Object.fromEntries(cards.map(c => [c.dataset.ch, c])), wires = {};
    function arrive(ch) {
      const li = row(ch, true); list.prepend(li); while (list.children.length > 9) list.lastElementChild.remove();
      setTimeout(() => li.querySelector('.who').classList.add('on'), 900); setTimeout(() => li.classList.remove('new'), 1500);
    }
    function homography(w, hh, p) {
      const src = [[0, 0], [w, 0], [w, hh], [0, hh]], M = [];
      src.forEach(([x, y], i) => { const [X, Y] = p[i]; M.push([x, y, 1, 0, 0, 0, -x * X, -y * X, X]); M.push([0, 0, 0, x, y, 1, -x * Y, -y * Y, Y]); });
      for (let c = 0; c < 8; c++) {
        let pv = c; for (let r = c + 1; r < 8; r++) if (Math.abs(M[r][c]) > Math.abs(M[pv][c])) pv = r;
        const t = M[c]; M[c] = M[pv]; M[pv] = t; const d = M[c][c]; for (let k = c; k < 9; k++) M[c][k] /= d;
        for (let r = 0; r < 8; r++) if (r !== c) { const f = M[r][c]; for (let k = c; k < 9; k++) M[r][k] -= f * M[c][k]; }
      }
      const [a, b, c2, d2, e, f2, g, i2] = M.map(r => r[8]);
      return 'matrix3d(' + [a, d2, 0, g, b, e, 0, i2, 0, 0, 1, 0, c2, f2, 0, 1].map(n => +n.toFixed(8)).join(',') + ')';
    }
    /* where each card sits (centre, as a fraction of the picture) and which edge of the screen its wire enters, and how far along */
    const SPOT = { wa: [.262, .25, 'l', .2], fb: [.244, .43, 'l', .46], sms: [.262, .61, 'l', .72], mail: [.738, .31, 'r', .26], ig: [.756, .52, 'r', .56] };
    const NS = 'http://www.w3.org/2000/svg';
    function rpath(pts, r) {   /* straight runs joined by rounded corners */
      let s = 'M' + pts[0][0].toFixed(1) + ' ' + pts[0][1].toFixed(1);
      for (let i = 1; i < pts.length - 1; i++) {
        const a = pts[i - 1], b = pts[i], c = pts[i + 1], d1 = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1, d2 = Math.hypot(c[0] - b[0], c[1] - b[1]) || 1, rr = Math.min(r, d1 / 2, d2 / 2);
        s += ' L' + (b[0] - (b[0] - a[0]) / d1 * rr).toFixed(1) + ' ' + (b[1] - (b[1] - a[1]) / d1 * rr).toFixed(1) + ' Q' + b[0].toFixed(1) + ' ' + b[1].toFixed(1) + ' ' + (b[0] + (c[0] - b[0]) / d2 * rr).toFixed(1) + ' ' + (b[1] + (c[1] - b[1]) / d2 * rr).toFixed(1);
      }
      const z = pts[pts.length - 1]; return s + ' L' + z[0].toFixed(1) + ' ' + z[1].toFixed(1);
    }
    function placeCards(W, H, p) {
      const along = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t], top = shot.getBoundingClientRect().top;
      cards.forEach(c => {
        const [fx, fy, edge, t] = SPOT[c.dataset.ch], cw = c.offsetWidth, ch = c.offsetHeight; if (!cw) return;
        const x = fx * W - cw / 2, y = Math.max(fy * H - ch / 2, 112 - top);   /* never under the header */
        c.style.left = x + 'px'; c.style.top = y + 'px';
        let pts, port;
        if (edge === 'l') { port = along(p[0], p[3], t); const s = [x + cw, y + ch / 2], mx = (s[0] + port[0]) / 2; pts = [s, [mx, s[1]], [mx, port[1]], port]; }
        else if (edge === 'r') { port = along(p[1], p[2], t); const s = [x, y + ch / 2], mx = (s[0] + port[0]) / 2; pts = [s, [mx, s[1]], [mx, port[1]], port]; }
        else { port = along(p[0], p[1], t); const s = [x + cw / 2, y + ch], my = (s[1] + port[1]) / 2; pts = [s, [s[0], my], [port[0], my], port]; }
        /* wires are created once and only moved afterwards, so the entrance animation keeps hold of them */
        const old = wires[c.dataset.ch], path = old || document.createElementNS(NS, 'path'); path.setAttribute('d', rpath(pts, 12)); path.setAttribute('class', 'wire'); path.style.setProperty('--c', getComputedStyle(c).getPropertyValue('--c'));
        const dot = old ? old.dot : document.createElementNS(NS, 'circle'); path.dot = dot; dot.setAttribute('cx', port[0]); dot.setAttribute('cy', port[1]); dot.setAttribute('r', 3.5); dot.setAttribute('class', 'port');
        if (!old) { wiresSvg.append(path, dot); wires[c.dataset.ch] = path; }
      });
    }
    /* a message leaves its card, travels down the wire and lands in the inbox */
    function send(ch) {
      const c = cardOf[ch], w = wires[ch], msg = POOL[ch][((turn[ch] === undefined ? -1 : turn[ch]) + 1) % POOL[ch].length][2];
      if (!anim || !w || !c.offsetWidth) return arrive(ch);
      $('[data-msg]', c).textContent = msg; c.classList.remove('ping'); void c.offsetWidth; c.classList.add('ping');
      const pel = document.createElementNS(NS, 'circle'); pel.setAttribute('r', 4.5); pel.setAttribute('class', 'pel'); pel.style.setProperty('--c', getComputedStyle(c).getPropertyValue('--c')); wiresSvg.append(pel);
      const len = w.getTotalLength(), o = { t: 0 };
      gsap.to(o, { t: 1, duration: .95, ease: 'power2.inOut', delay: .25, onUpdate() { const pt = w.getPointAtLength(len * o.t); pel.setAttribute('cx', pt.x); pel.setAttribute('cy', pt.y); }, onComplete() { pel.remove(); arrive(ch); } });
    }
    function fit() {
      const W = shot.clientWidth, H = shot.clientHeight; if (!W) return;
      /* one pixel of overdraw on every side so no white edge of the photographed screen shows */
      const c = [.5045, .4823], p = QUAD.map(([x, y]) => [(c[0] + (x - c[0]) * 1.006) * W, (c[1] + (y - c[1]) * 1.008) * H]);
      plane.style.setProperty('--m', homography(UW, UH, p));
placeCards(W, H, p);
    }
    fit(); addEventListener('resize', fit); addEventListener('load', fit); if ('ResizeObserver' in window) new ResizeObserver(fit).observe(shot);
    if (!anim) return;
    const off = $('[data-off]'), sweep = $('[data-sweep]');
    gsap.set(off, { opacity: 1 });
    const tl = gsap.timeline({ delay: .1 });
    /* out of the dark, slowly */
    tl.fromTo(shot, { opacity: 0, scale: 1.07, y: 26 }, { opacity: 1, scale: 1, y: 0, duration: 1.1, ease: 'power3.out' }, 0)
      .fromTo('[data-set]', { opacity: 0 }, { opacity: 1, duration: 1, ease: 'power1.out' }, 0)
      /* the screen content fades in once, smoothly: no flicker, no flash, nothing shown and then hidden */
      .to(off, { opacity: 0, duration: .9, ease: 'power2.out' }, .25)
      .from($$('.row', host), { opacity: 0, y: 10, duration: .45, stagger: .05, ease: 'power3.out', clearProps: 'all' }, .55);
    copyIn(tl);
    /* the cards are placed one at a time: the card appears first, then its wire is drawn from the card to the screen */
    ['wa', 'fb', 'sms', 'mail', 'ig'].forEach((ch, i) => {
      const c = cardOf[ch], w = wires[ch], e = SPOT[ch][2], d = e === 'l' ? [-18, 0] : e === 'r' ? [18, 0] : [0, -14];
      if (w) tl.fromTo(w, { strokeDasharray: 1000, strokeDashoffset: 1000 }, { strokeDashoffset: 0, duration: .6, ease: 'power2.inOut' }, 1.5 + i * .14);
      tl.fromTo(c, { opacity: 0, x: d[0], y: d[1] }, { opacity: 1, x: 0, y: 0, duration: .5, ease: 'power3.out' }, 1.05 + i * .14);
    });
    tl.fromTo('.pa-wires .port', { opacity: 0 }, { opacity: 1, duration: .3, stagger: .14 }, 2.0);
    tl.from('.p-note', { opacity: 0, duration: .5 }, 1.6);
    freeze(tl);
    /* ---- scroll story (desktop): the hero stays pinned for three screens; the phone travels left -> right -> centre,
       the copy cross-fades and the phone's screen changes with it ---- */
    const pin = $('[data-pin]'), slides = $$('[data-slide]'), alts = $$('[data-alt]', plane), copy = $('.pa .p-copy'), deco = [$('[data-cards]'), wiresSvg], dots = $$('[data-dots] li');
    const pinned = () => matchMedia('(min-width: 1024px)').matches, clamp01 = v => Math.max(0, Math.min(1, v));
    const X = [27, 73, 50], SC = [1, 1, 1.1]; let active = 0; const held = q.get('scene') ? +q.get('scene') : null;   /* ?scene=1 holds a scene for review */
    function story(force) {
      if (!pinned()) return;
      const total = pin.offsetHeight - innerHeight; if (total <= 0) return;
      const s = held !== null ? held : Math.max(0, Math.min(2, (scrollY - pin.offsetTop) / total * 2)), i = Math.min(1, Math.floor(s)), f = s - i, e = f * f * (3 - 2 * f);
      gsap.to(shot, { x: (X[i] + (X[i + 1] - X[i]) * e - 27) / 100 * innerWidth, scale: SC[i] + (SC[i + 1] - SC[i]) * e, rotation: Math.sin(f * Math.PI) * (i ? 3 : -3), duration: .5, ease: 'power2.out', overwrite: 'auto' });
      const set = (el, o) => { el.style.opacity = o; el.style.pointerEvents = o > .6 ? 'auto' : 'none'; };
      set(copy, clamp01(1 - s * 2.6)); slides.forEach(el => set(el, clamp01(1 - Math.abs(s - el.dataset.slide) * 2.6)));
      deco.forEach(el => { el.style.opacity = clamp01(1 - s * 6); });
      const a = Math.round(s);
      if (a !== active) { active = a; alts.forEach(el => el.classList.toggle('on', +el.dataset.alt === a)); dots.forEach((d, n) => d.classList.toggle('on', n === a)); }
    }
    addEventListener('scroll', story, { passive: true }); addEventListener('resize', story); if (scrollY > 4) story();
    /* the inbox stays alive: a message arrives every couple of seconds while the first scene is on screen */
    const ORDER = ['wa', 'ig', 'fb', 'mail', 'sms']; let k = 0, vis = true;
    if ('IntersectionObserver' in window) new IntersectionObserver(([e]) => { vis = e.isIntersecting; }, { threshold: .25 }).observe(shot);
    if (!at) setTimeout(() => setInterval(() => { if (vis && !document.hidden && active === 0) send(ORDER[k++ % ORDER.length]); }, 2200), 2600);
    else if (q.get('rows')) for (let n = 0; n < +q.get('rows'); n++) arrive(ORDER[k++ % ORDER.length]);   /* review aid: ?at=end&rows=2 */
    /* review aid: ?scene=1 or ?scene=2 jumps to that scene of the scroll story */
    if (q.get('scene')) { alts.forEach(el => { el.style.transition = 'none'; }); tl.progress(1); story(); gsap.getTweensOf(shot).forEach(t => t.progress(1)); }
    return;
  }

  /* a flat screen is scaled as one picture */
  const fitFlat = () => $$('[data-fit]').forEach(el => { el.firstElementChild.style.transform = 'scale(' + el.clientWidth / S.W + ')'; });

  /* ===================== B — ARCHITECTURE ===================== */
  if (concept === 'b') {
    fitFlat(); addEventListener('resize', fitFlat); addEventListener('load', fitFlat);
    if (!anim) return;
    const wide = matchMedia('(min-width: 1024px)').matches, plane = $('[data-plane]');
    const tl = gsap.timeline({ delay: .1 });
    if (wide) {
      tl.from('[data-wall]', { xPercent: -101, duration: 1.2, ease: 'expo.inOut' }, 0)
        .from('[data-wall2]', { yPercent: -101, duration: 1.05, ease: 'expo.inOut' }, .25)
        .from('[data-floor]', { scaleX: 0, transformOrigin: 'left', duration: 1.1, ease: 'expo.inOut' }, .4)
        /* the product is drawn out of the wall, edge first */
        .fromTo(plane, { clipPath: 'inset(0 100% 0 0)', x: -90 }, { clipPath: 'inset(0 0% 0 0)', x: 0, duration: 1.35, ease: 'expo.inOut', clearProps: 'clipPath' }, .75)
        .from('[data-signs] li', { opacity: 0, x: -14, duration: .5, stagger: .09, ease: 'power3.out' }, 1.25)
        .from('[data-signs] s', { scaleX: 0, duration: .8, stagger: .09, ease: 'power3.inOut' }, 1.4);
    } else {
      tl.from('[data-wall]', { scaleY: 0, transformOrigin: 'top', duration: 1, ease: 'expo.inOut' }, 0)
        .from('[data-signs] li', { opacity: 0, y: 8, duration: .4, stagger: .06 }, .6)
        .fromTo(plane, { clipPath: 'inset(0 0 100% 0)', y: 40 }, { clipPath: 'inset(0 0 0% 0)', y: 0, duration: 1.1, ease: 'expo.inOut', clearProps: 'clipPath' }, .5);
    }
    tl.from($$('[data-row]', scr), { opacity: 0, duration: .4, stagger: .04 }, 1.7).from('.p-note', { opacity: 0, duration: .5 }, 2);
    copyIn(tl); freeze(tl);
    /* depth on scroll: nearer surfaces travel further */
    if (wide) {
      const w = gsap.quickSetter('[data-wall]', 'y', 'px'), w2 = gsap.quickSetter('[data-wall2]', 'y', 'px'), p = gsap.quickSetter(plane, 'y', 'px'), s = gsap.quickSetter('[data-signs]', 'y', 'px');
      addEventListener('scroll', () => { const y = Math.min(scrollY, innerHeight); w(y * .1); w2(y * .26); p(-y * .07); s(y * .1); }, { passive: true });
    }
    return;
  }

  /* ===================== C — EDITORIAL ===================== */
  const shot = $('[data-shot]'), pan = $('[data-pan]'), frame = $('[data-frame]'), caps = $$('[data-cap]'), title = $('[data-title]'), nav = $('[data-nav]');
  const wide = () => matchMedia('(min-width: 1024px)').matches;
  let scale = 1, cur = 'list';
  function layout() {
    /* the headline and the menu change colour exactly where the navy block begins */
    const edge = wide() ? $('[data-bg]').getBoundingClientRect().left : -1;
    $$('[data-tl]', title).forEach(el => { const r = el.getBoundingClientRect(); el.style.setProperty('--split', edge < 0 ? '0px' : Math.max(0, edge - r.left) + 'px'); });
    scale = Math.max(shot.clientWidth / 760, shot.clientHeight / S.H);
    focus(cur, false);
  }
  function focus(name, move) {
    cur = name; caps.forEach(c => c.setAttribute('aria-pressed', c.dataset.cap === name));
    const r = S.region(scr, name), cw = shot.clientWidth, ch = shot.clientHeight, clamp = (v, lo) => Math.min(0, Math.max(lo, v));
    const rh = Math.min(r.h, ch / scale - 40);
    const x = clamp(cw / 2 - (r.x + r.w / 2) * scale, cw - S.W * scale), y = clamp(ch / 2 - (r.y + rh / 2) * scale, ch - S.H * scale);
    const box = { left: r.x - 6, top: r.y - 6, width: r.w + 12, height: rh + 12 };
    if (anim && move) { gsap.to(pan, { x, y, scale, duration: 1.1, ease: 'expo.inOut' }); gsap.to(frame, Object.assign({ opacity: 1, duration: 1.1, ease: 'expo.inOut' }, box)); }
    else { pan.style.transform = 'translate(' + x + 'px,' + y + 'px) scale(' + scale + ')'; Object.assign(frame.style, { left: box.left + 'px', top: box.top + 'px', width: box.width + 'px', height: box.height + 'px', opacity: 1 }); if (anim) gsap.set(pan, { x, y, scale }); }
  }
  layout(); addEventListener('resize', layout); addEventListener('load', layout);
  let touched = false;
  caps.forEach(c => c.addEventListener('click', () => { touched = true; focus(c.dataset.cap, true); }));
  if (!anim) return;
  const tl = gsap.timeline({ delay: .1 });
  if (wide()) tl.from('[data-bg]', { scaleX: 0, duration: 1.05, ease: 'expo.inOut' }, 0);
  tl.from('[data-tl]', { yPercent: 112, duration: 1.2, stagger: .16, ease: 'power4.out' }, .4)
    /* the product slides up under the headline */
    .fromTo(shot, { clipPath: 'inset(100% 0 0 0)', y: 120 }, { clipPath: 'inset(0% 0 0 0)', y: 0, duration: 1.4, ease: 'expo.out', clearProps: 'clipPath' }, .75)
    .from(frame, { opacity: 0, duration: .6 }, 1.7)
    .from($$('[data-side] > *'), { y: 18, opacity: 0, duration: .7, stagger: .1, ease: 'power3.out' }, 1.1)
    .from('.pc-cap', { opacity: 0, x: 16, duration: .5, stagger: .09, ease: 'power3.out' }, 1.5)
    .from('.p-note', { opacity: 0, duration: .5 }, 2)
    /* one tour of the three captions, then it rests on the first */
    .add(() => { if (!touched) focus('ai', true); }, 3.6).add(() => { if (!touched) focus('assign', true); }, 5.8).add(() => { if (!touched) focus('list', true); }, 8);
  if (q.get('cap')) { touched = true; tl.progress(1); gsap.killTweensOf([pan, frame]); focus(q.get('cap'), false); } else freeze(tl);
  /* the crop drifts a little slower than the page */
  if (wide()) { const sy = gsap.quickSetter(shot, 'y', 'px'); addEventListener('scroll', () => sy(-Math.min(scrollY, innerHeight) * .09), { passive: true }); }
})();
