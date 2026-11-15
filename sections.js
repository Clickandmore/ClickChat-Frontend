/* NAVY CANVAS — sections after the channels chapter (AI, campaigns, team, integrations, analytics, pricing).
   Classic script. Every demo renders its final state without GSAP or with reduced motion. Demo data is illustrative. */
(function () {
  'use strict';
  const d = document;
  const $ = (s, r = d) => r.querySelector(s), $$ = (s, r = d) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const G = window.gsap, ST = window.ScrollTrigger, motion = !reduce && !!G && !!ST;
  const logo = (window.NC && window.NC.logo) || (() => '');
  const once = (node, fn, th) => new IntersectionObserver(([e], o) => { if (e.isIntersecting) { o.disconnect(); fn(); } }, { threshold: th || 0.3 }).observe(node);
  function whileVisible(target, ms, fn) {
    let vis = false; new IntersectionObserver(([e]) => { vis = e.isIntersecting; }, { threshold: 0.25 }).observe(target);
    setInterval(() => { if (vis && !d.hidden) fn(); }, ms);
  }
  const press = (btns, on) => btns.forEach(b => b.setAttribute('aria-pressed', String(b === on)));

  /* Sadu bands slide with the scroll */
  if (motion) $$('.band').forEach(b => G.to(b, { backgroundPositionX: '192px', ease: 'none', scrollTrigger: { trigger: b, start: 'top bottom', end: 'bottom top', scrub: 0.6 } }));

  /* ================= AI: the reading line ================= */
  (() => {
    const ai = $('[data-ai]'); if (!ai) return;
    const SC = [
      { msg: 'السلام عليكم، عندكم توصيل اليوم؟', tag: 'استفسار عن التوصيل', route: 'bot', k4: 'ترد عليها تلقائياً', reply: 'وعليكم السلام 🌿 نعم! اطلب قبل الساعة 4 ويوصلك اليوم.' },
      { msg: 'طلبي تأخر ولم يصلني حتى الآن', tag: 'شكوى', route: 'human', k4: 'تحويل إلى موظف', reply: 'أُسندت المحادثة إلى سارة مع ملخّص الطلب.' },
    ];
    const steps = $$('[data-st]', ai), rail = $('[data-rail]', ai), scan = $('[data-scan]', ai), msg = $('[data-msg]', ai), tag = $('[data-tag]', ai);
    const routes = $$('[data-route]', ai), k4 = $('[data-k4]', ai), reply = $('[data-reply]', ai), tabs = $$('[data-sc]', ai);
    let tl;
    function fill(sc, withRoute) {
      msg.textContent = sc.msg; tag.textContent = sc.tag; k4.textContent = sc.k4; reply.textContent = sc.reply;
      routes.forEach(r => r.classList.toggle('on', withRoute && r.dataset.route === sc.route));
    }
    function play(i) {
      const sc = SC[i]; press(tabs, tabs[i]);
      if (tl) tl.kill();
      if (!motion) { fill(sc, true); return; }
      fill(sc, false); steps.forEach(s => s.classList.add('off')); reply.innerHTML = '&nbsp;';
      G.set(rail, { scaleY: 0 }); G.set(scan, { scaleX: 0, opacity: 1 });
      tl = G.timeline()
        .add(() => steps[0].classList.remove('off'))
        .fromTo(msg.parentNode, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.4 })
        .to(scan, { scaleX: 1, duration: 0.95, ease: 'power1.inOut' })          // the rule reads the message
        .to(scan, { opacity: 0, duration: 0.3 })
        .to(rail, { scaleY: 0.34, duration: 0.4 }, '<')
        .add(() => steps[1].classList.remove('off'))
        .fromTo(tag, { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: 'back.out(2)' })   // intent lifts out as a tag
        .to(rail, { scaleY: 0.66, duration: 0.4 })
        .add(() => { steps[2].classList.remove('off'); routes.forEach(r => r.classList.toggle('on', r.dataset.route === sc.route)); })
        .to(rail, { scaleY: 1, duration: 0.5 }, '+=0.5')
        .add(() => { steps[3].classList.remove('off'); reply.innerHTML = '<span class="dots3"><i></i><i></i><i></i></span>'; })
        .add(() => { reply.textContent = sc.reply; }, '+=0.9')
        .fromTo(reply, { opacity: 0.4 }, { opacity: 1, duration: 0.3 });
    }
    tabs.forEach((t, i) => t.addEventListener('click', () => play(i)));
    if (motion) { steps.forEach(s => s.classList.add('off')); G.set(rail, { scaleY: 0 }); once(ai, () => play(0), 0.4); }
  })();

  /* ================= Campaigns: the send sheet ================= */
  (() => {
    const box = $('[data-cells]'); if (!box) return;
    const N = 112, TARGET = [1, 0.98, 0.81, 0.23], WIN = [[0, 0.3], [0.2, 0.55], [0.45, 0.8], [0.7, 1]];
    const out = $$('[data-ss]');
    // one fixed shuffle: a contact that replied has also read, received and been sent to
    const rank = []; let seed = 7; for (let i = 0; i < N; i++) rank.push(i);
    for (let i = N - 1; i > 0; i--) { seed = (seed * 1103515245 + 12345) & 0x7fffffff; const j = seed % (i + 1); const t = rank[i]; rank[i] = rank[j]; rank[j] = t; }
    const cells = []; for (let i = 0; i < N; i++) { const c = d.createElement('i'); box.append(c); cells.push(c); }
    function render(p) {
      const cnt = WIN.map((w, k) => TARGET[k] * Math.min(1, Math.max(0, (p - w[0]) / (w[1] - w[0]))));
      cells.forEach((c, i) => { let s = 0; for (let k = 0; k < 4; k++) if (rank[i] < Math.round(N * cnt[k])) s = k + 1; const cls = s ? 's' + s : ''; if (c.className !== cls) c.className = cls; });
      out.forEach((o, k) => { o.textContent = Math.round(cnt[k] * 100); });
    }
    if (motion) { render(0); ST.create({ trigger: '[data-camp]', start: 'top 78%', end: 'top 12%', scrub: 0.5, onUpdate: s => render(s.progress) }); }
    else render(1);
  })();

  /* ================= Team: conversations are handed out, then closed ================= */
  (() => {
    const board = $('[data-board]'); if (!board) return;
    const fresh = $('[data-lane="new"] ul', board), lanes = [0, 1, 2].map(i => $('[data-lane="' + i + '"] ul', board));
    const PEOPLE = [['ن', 'نورة', 'wa'], ['خ', 'خالد', 'ig'], ['ف', 'فهد', 'fb'], ['م', 'مها', 'mail'], ['ع', 'عبدالله', 'sms'], ['ر', 'ريم', 'ig'], ['س', 'سلمان', 'wa']];
    let n = 0, turn = 0;
    function chip(state) {
      const p = PEOPLE[n++ % PEOPLE.length], li = d.createElement('li'); li.className = 'tk';
      li.innerHTML = '<span class="av">' + p[0] + '<span class="lg c-' + p[2] + '">' + logo(p[2]) + '</span></span><b>' + p[1] + '</b><em></em>';
      mark(li, state); return li;
    }
    function mark(li, state) { const e = li.querySelector('em'); e.className = state === 1 ? 'as' : state === 2 ? 'ok' : ''; e.textContent = ['مفتوحة', 'مُسندة', 'تم الحل'][state]; }
    for (let i = 0; i < 3; i++) fresh.append(chip(0));
    lanes.forEach(l => l.append(chip(1)));
    function step() {
      const c = fresh.firstElementChild, to = lanes[turn++ % 3]; if (!c) return;
      const a = c.getBoundingClientRect(); to.prepend(c); const b = c.getBoundingClientRect();
      if (motion) G.fromTo(c, { x: a.left - b.left, y: a.top - b.top, zIndex: 5 }, { x: 0, y: 0, duration: 0.85, ease: 'power3.inOut', clearProps: 'transform,zIndex' });
      setTimeout(() => mark(c, 1), 700);
      if (to.children.length > 2) { const old = to.lastElementChild; mark(old, 2); setTimeout(() => old.classList.add('out'), 900); setTimeout(() => old.remove(), 1400); }
      const nw = chip(0); fresh.append(nw);
      if (motion) G.fromTo(nw, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5, delay: 0.4, clearProps: 'all' });
    }
    if (!reduce) whileVisible(board, 2600, step);
  })();

  /* ================= Integrations ================= */
  if (motion) G.fromTo('[data-sockets] li', { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.05, ease: 'power3.out', clearProps: 'all', scrollTrigger: { trigger: '[data-sockets]', start: 'top 82%' } });

  /* ================= Analytics ================= */
  (() => {
    const box = $('[data-stats]'); if (!box) return;
    // each series is drawn on its own scale (0–100 within the chart), so the daily movement is readable
    const S = [[96, 97, 98, 97, 99, 98, 98], [70, 74, 78, 76, 83, 80, 81], [12, 15, 19, 17, 24, 21, 23]].map(a => { const lo = Math.min.apply(0, a) - 2, hi = Math.max.apply(0, a) + 1; return a.map(v => (v - lo) / (hi - lo) * 78 + 8); }), COLOR = ['#12C99B', '#FFFFFF', '#FF6A4D'];
    const line = $('[data-line]', box), area = $('[data-area]', box), svg = line.ownerSVGElement, tabs = $$('[data-series]', box);
    const cur = S[0].slice();
    function draw() {
      // time runs right to left, like the page
      const pts = cur.map((v, i) => [800 - i * (800 / 6), 284 - v * 2.6]);
      let s = 'M' + pts[0][0] + ' ' + pts[0][1].toFixed(1);
      for (let i = 1; i < pts.length; i++) { const mx = (pts[i - 1][0] + pts[i][0]) / 2; s += ' C' + mx + ' ' + pts[i - 1][1].toFixed(1) + ' ' + mx + ' ' + pts[i][1].toFixed(1) + ' ' + pts[i][0] + ' ' + pts[i][1].toFixed(1); }
      line.setAttribute('d', s); area.setAttribute('d', s + ' L0 300 L800 300 Z');
    }
    function pick(i) {
      press(tabs, tabs[i]); svg.style.setProperty('--c', COLOR[i]);
      if (!motion) { S[i].forEach((v, k) => { cur[k] = v; }); draw(); return; }
      G.to(cur, Object.assign({ duration: 0.9, ease: 'power3.inOut', onUpdate: draw, overwrite: true }, S[i]));
    }
    tabs.forEach((t, i) => t.addEventListener('click', () => pick(i)));
    draw();
    const bars = () => $$('[data-w]', box).forEach(b => { b.style.width = b.dataset.w + '%'; });
    if (!motion) { bars(); return; }
    $$('[data-to]', box).forEach(n => { n.textContent = '0'; });
    G.set(svg, { clipPath: 'inset(0% 0% 0% 100%)' });
    once(box, () => {
      bars();
      G.to(svg, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.7, ease: 'power2.inOut', clearProps: 'clipPath' });   // the line draws from today backwards
      $$('[data-to]', box).forEach((n, i) => { const o = { v: 0 }; G.to(o, { v: +n.dataset.to, duration: 1.3, delay: i * 0.12, ease: 'power3.out', onUpdate: () => { n.textContent = Math.round(o.v); } }); });
    }, 0.25);
  })();

  /* ================= Pricing: the plan deck ================= */
  (() => {
    const deck = $('[data-deck]'); if (!deck) return;
    const cards = $$('.pcard', deck), picks = $$('[data-pick] button'), bill = $('[data-bill]'), btns = $$('button', bill);
    const prices = $$('.pricing [data-m]'), pers = $$('.pricing [data-per]');
    deck.classList.add('js');
    let order = [2, 3, 1, 0];                       // top of the deck first
    function place() {
      order.forEach((c, pos) => { cards[c].dataset.pos = pos; cards[c].toggleAttribute('aria-hidden', pos > 0); cards[c].toggleAttribute('inert', pos > 0); });
      picks.forEach((p, i) => p.setAttribute('aria-pressed', String(i === order[0])));
    }
    function choose(i) { if (order[0] === i) return; order = [i].concat(order.filter(c => c !== i)); place(); }
    picks.forEach((p, i) => { p.addEventListener('click', () => choose(i)); p.addEventListener('pointerenter', () => { if (matchMedia('(hover: hover)').matches) choose(i); }); });
    place();
    btns.forEach(b => b.addEventListener('click', () => {
      const y = b.dataset.b === 'y'; press(btns, b);
      const swap = () => { prices.forEach(p => { p.textContent = y ? p.dataset.y : p.dataset.m; }); pers.forEach(p => { p.textContent = y ? '/سنوياً' : '/شهرياً'; }); };
      if (!motion) { swap(); return; }
      G.to(prices, { yPercent: -50, opacity: 0, duration: 0.2, ease: 'power2.in', onComplete: () => { swap(); G.fromTo(prices, { yPercent: 50, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.4, ease: 'power3.out', clearProps: 'transform,opacity' }); } });
    }));
    if (!motion) return;
    // the top card leans toward the pointer
    if (matchMedia('(hover: hover)').matches) {
      deck.addEventListener('pointermove', e => { const r = deck.getBoundingClientRect(); G.to(deck, { '--ry': ((e.clientX - r.left) / r.width - 0.5) * 7 + 'deg', '--rx': (0.5 - (e.clientY - r.top) / r.height) * 5 + 'deg', duration: 0.6, ease: 'power3.out', overwrite: 'auto' }); });
      deck.addEventListener('pointerleave', () => G.to(deck, { '--ry': '0deg', '--rx': '0deg', duration: 0.8, ease: 'power3.out', overwrite: 'auto' }));
    }
    // the stage opens, then the deck is dealt
    const stage = $('[data-prstage]');
    G.fromTo(stage, { clipPath: 'inset(12% 6% 12% 6% round 44px)' }, { clipPath: 'inset(0% 0% 0% 0% round 44px)', duration: 1.2, ease: 'power4.out', clearProps: 'clipPath', scrollTrigger: { trigger: stage, start: 'top 82%' } });
    G.fromTo(deck, { y: 90, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: stage, start: 'top 65%' } });
  })();

  /* ================= Problem → solution: each problem is struck out as its answer arrives ================= */
  (() => {
    const fix = $('[data-fix]'); if (!fix || !motion) return;
    $$('.tx', fix).forEach(t => { const s = d.createElement('span'); s.textContent = t.textContent; t.replaceChildren(s); });
    G.fromTo('.fix-slab', { clipPath: 'inset(0% 0% 0% 100% round 32px)' }, { clipPath: 'inset(0% 0% 0% 0% round 32px)', duration: 1.3, ease: 'power4.inOut', scrollTrigger: { trigger: fix, start: 'top 78%' } });
    G.fromTo('.fix-a', { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.9, delay: 0.5, ease: 'power3.out', scrollTrigger: { trigger: fix, start: 'top 78%' } });
    $$('[data-row]', fix).forEach(r => {
      G.timeline({ scrollTrigger: { trigger: r, start: 'top 84%', end: 'top 52%', scrub: 0.5 } })
        .fromTo($('.tx', r), { '--s': '0%' }, { '--s': '100%', ease: 'none', duration: 0.5 }, 0)
        .fromTo($('.pb', r), { opacity: 1 }, { opacity: 0.5, ease: 'none', duration: 0.3 }, 0.3)
        .fromTo($('.fw', r), { scaleX: 0 }, { scaleX: 1, ease: 'none', duration: 0.35 }, 0.25)
        .fromTo($('.sl', r), { opacity: 0, x: 34 }, { opacity: 1, x: 0, ease: 'none', duration: 0.4 }, 0.55);
    });
  })();

  /* ================= Steps: the line reaches each number and fills it ================= */
  (() => {
    const ol = $('[data-steps]'); if (!ol) return;
    const lis = $$('li', ol), fill = $('[data-stfill]', ol), AT = [0.1, 0.5, 0.9];
    const set = p => { fill.style.transform = 'scaleX(' + p + ')'; lis.forEach((l, i) => l.classList.toggle('on', p >= AT[i])); };
    if (motion) { set(0); ST.create({ trigger: ol, start: 'top 82%', end: 'top 30%', scrub: 0.5, onUpdate: s => set(s.progress) }); } else set(1);
  })();

  /* ================= Security: a live audit log ================= */
  (() => {
    const ul = $('[data-audit]'); if (!ul) return;
    const LOG = [['أحمد', 'سجّل الدخول بالتحقق بخطوتين'], ['سارة', 'غيّرت صلاحيات منى'], ['منى', 'صدّرت تقرير الحملات'], ['أحمد', 'ربط قناة واتساب جديدة'], ['سارة', 'عدّلت رداً جاهزاً']];
    let n = 0;
    const row = fresh => { const e = LOG[n++ % LOG.length], li = d.createElement('li'); if (fresh) li.className = 'new'; li.innerHTML = '<b>' + e[0] + '</b><span>' + e[1] + '</span><time>' + (fresh ? 'الآن' : 'قبل دقائق') + '</time>'; return li; };
    for (let i = 0; i < 4; i++) ul.append(row(false));
    if (!reduce) whileVisible(ul, 2800, () => { ul.prepend(row(true)); while (ul.children.length > 5) ul.lastElementChild.remove(); });
    if (motion) G.fromTo('[data-seclist] li', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out', clearProps: 'all', scrollTrigger: { trigger: '[data-seclist]', start: 'top 82%' } });
  })();

  /* ================= FAQ ================= */
  (() => {
    const qs = $$('[data-qa] .q');
    qs.forEach(q => $('button', q).addEventListener('click', () => {
      const open = !q.classList.contains('open');
      qs.forEach(x => { x.classList.toggle('open', x === q && open); $('button', x).setAttribute('aria-expanded', String(x === q && open)); });
    }));
    if (motion && qs.length) G.fromTo(qs, { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out', clearProps: 'all', scrollTrigger: { trigger: '[data-qa]', start: 'top 84%' } });
  })();

  /* ================= Four more features: one panel is open, the others wait as tabs ================= */
  (() => {
    const reel = $('[data-reel]'); if (!reel) return;
    const pns = $$('.pn', reel);
    const open = p => pns.forEach(x => { x.classList.toggle('on', x === p); $('.pn-tab', x).setAttribute('aria-expanded', String(x === p)); });
    pns.forEach(p => {
      p.addEventListener('click', () => open(p));
      p.addEventListener('pointerenter', () => { if (matchMedia('(hover: hover)').matches) open(p); });
    });
    if (motion) G.fromTo(pns, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.09, ease: 'power3.out', clearProps: 'opacity,transform', scrollTrigger: { trigger: reel, start: 'top 82%' } });
  })();

  /* ================= Why ClickChat: tiles rise in; their small charts grow when seen ================= */
  (() => {
    $$('[data-grow]').forEach(n => { if (reduce) n.classList.add('in'); else once(n, () => n.classList.add('in'), 0.6); });
    if (motion) G.fromTo('[data-bento] .bt', { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out', clearProps: 'opacity,transform', scrollTrigger: { trigger: '[data-bento]', start: 'top 82%' } });
  })();

  /* ================= Team tile: assign → internal note → reply lock → reply, on a loop ================= */
  (() => {
    const box = $('[data-collab]'); if (!box || reduce) return;
    const steps = $$('[data-clsteps] li'), SEQ = [0, 1, 2, 3, 4, 4, 4];
    let i = 0;
    const show = s => { box.dataset.step = s; steps.forEach((l, k) => l.classList.toggle('on', s === 4 ? false : k === s - 1)); };
    show(0);
    whileVisible(box, 1500, () => { i = (i + 1) % SEQ.length; show(SEQ[i]); });
  })();

  /* ================= Solutions: sectors slider (content and behaviour from Direction 3 — Signal) ================= */
  (() => {
    const track = $('[data-sectors]'); if (!track) return;
    const ICON = window.renderIcons;
    const S = [   // [name, line, photo, object-position, icon, tag, question, reply, dim]
      ['المتاجر الإلكترونية', 'إشعارات الطلب وخدمة ما بعد البيع والسلات المتروكة عبر واتساب.', 'store', '42%', 'cart', 'متاجر', 'هل طلبي في الطريق؟', 'نعم، يصلك اليوم قبل 6 مساءً'],
      ['العيادات والمراكز الطبية', 'مواعيد وتذكيرات واستفسارات المرضى من واتساب، مع فريق استقبال منظم.', 'clinic', '30%', 'calendar', 'عيادات', 'أحتاج موعد تنظيف أسنان', 'متاح غداً 4:30 — نؤكد الحجز؟'],
      ['المطاعم والكافيهات', 'استقبل الطلبات والحجوزات من واتساب وإنستغرام في صندوق واحد.', 'cafe', '38%', 'message', 'مطاعم وكافيهات', 'طاولة لأربعة الليلة؟', 'تم الحجز، الساعة 9'],
      ['العقار', 'تابع كل مهتم بعقار من أول رسالة حتى المعاينة.', 'realestate', '48%', 'target', 'عقار', 'هل الشقة متاحة للمعاينة؟', 'نعم، غداً الساعة 5 مساءً يناسبك؟', 1],
      ['معارض السيارات', 'تابع طلبات الأسعار والتجربة والتمويل من كل القنوات.', 'cars', '47%', 'phone', 'معارض سيارات', 'كم القسط الشهري للسيارة؟', 'أرسلنا لك عرض التمويل الآن', 1],
      ['الصالونات ومراكز التجميل', 'حجوزات وتذكيرات وعروض لعميلاتك عبر واتساب وإنستغرام.', 'salon', '47%', 'sparkles', 'صالونات', 'أبغى موعد يوم الخميس', 'متاح الخميس 6 مساءً — نؤكد؟', 1],
      ['التعليم والتدريب', 'تسجيل الطلاب والاستفسارات وتنبيهات الدورات من مكان واحد.', 'education', '46%', 'users', 'تعليم وتدريب', 'متى تبدأ دورة المحاسبة؟', 'تبدأ الأحد، وهذا رابط التسجيل', 1],
      ['شركات ومكاتب الاستقدام', 'تابع طلبات الاستقدام ومراحل المعاملة مع العملاء عبر واتساب.', 'recruitment', '47%', 'usercheck', 'استقدام', 'أين وصلت معاملتي؟', 'اكتملت الأوراق، ونبلغك بموعد الوصول', 1],
    ];
    const SLUG = { store: 'ecommerce', clinic: 'clinics', cafe: 'restaurants', realestate: 'real-estate', cars: 'car-showrooms', salon: 'salons', education: 'education', recruitment: 'recruitment' };
    track.innerHTML = S.map(s => '<li><a href="industry-' + SLUG[s[2]] + '.html" class="ph">' +
      '<img src="assets/photos/' + s[2] + '.jpg"' + (s[8] ? ' class="dim"' : '') + ' alt="" width="1200" height="800" loading="lazy" decoding="async" style="object-position:' + s[3] + ' 0">' +
      '<span class="ph-tag"><span data-icon="' + s[4] + '" data-size="15"></span>' + s[5] + '</span>' +
      '<span class="ph-cap"><span class="ph-q" aria-hidden="true">' + s[6] + '</span><span class="ph-r" aria-hidden="true"><span data-icon="check" data-size="13"></span>' + s[7] + '</span>' +
      '<b>' + s[0] + '</b><small>' + s[1] + '</small><span class="ph-go" aria-hidden="true"><span data-icon="arrow" data-size="18"></span></span></span></a></li>').join('');
    if (ICON) ICON(track);
    const cards = $$('.ph', track), btns = $$('.solu [data-slide]'), prog = $('[data-sxprog]');
    // each exchange plays when its card is actually on screen
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { root: null, threshold: 0.55 });
    cards.forEach(c => { if (reduce) c.classList.add('in'); else io.observe(c); });
    // scrollLeft runs negative in RTL, so the direction is multiplied in
    const sign = () => getComputedStyle(track).direction === 'rtl' ? -1 : 1;
    function state() {
      const pos = Math.abs(track.scrollLeft), max = track.scrollWidth - track.clientWidth;
      btns.forEach(b => { b.disabled = +b.dataset.slide < 0 ? pos < 4 : pos > max - 4; });
      const seen = track.clientWidth / track.scrollWidth;
      prog.style.transform = 'scaleX(' + Math.min(1, seen + (max > 0 ? pos / max : 1) * (1 - seen)).toFixed(3) + ')';
    }
    btns.forEach(b => b.addEventListener('click', () => { track.scrollBy({ left: +b.dataset.slide * sign() * (track.firstElementChild.getBoundingClientRect().width + 20) }); }));
    track.addEventListener('scroll', state, { passive: true }); addEventListener('resize', state); state();
    if (motion) G.fromTo($$('li', track), { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out', clearProps: 'opacity,transform', scrollTrigger: { trigger: track, start: 'top 84%' } });
  })();
})();
