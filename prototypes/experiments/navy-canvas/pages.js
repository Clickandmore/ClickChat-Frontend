/* NAVY CANVAS — core script for the inner pages (the home page uses navy-canvas.js instead).
   Load order: icons.js, logos.js, gsap, ScrollTrigger, pages.js, sections.js. Classic script; final state without GSAP or with reduced motion. */
(function () {
  'use strict';
  const d = document, root = d.documentElement;
  const $ = (s, r = d) => r.querySelector(s), $$ = (s, r = d) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const G = window.gsap, ST = window.ScrollTrigger, motion = !reduce && !!G && !!ST;
  if (G) G.config({ nullTargetWarn: false });
  if (motion) G.registerPlugin(ST);

  const LOGO = Object.assign({
    sms: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="m22 7-10 6L2 7" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>',
  }, window.NC_LOGOS || {});
  const logo = ch => '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' + (LOGO[ch] || '') + '</svg>';
  $$('[data-lg]').forEach(n => { n.innerHTML = logo(n.dataset.lg); });
  window.NC = { logo };

  /* icons the shared icon set does not have (Feather/Lucide outlines, ISC licence), used by the sector pages */
  const EX = {
    clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    tag: '<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>',
    shuffle: '<polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/>',
    bell: '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>',
    link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
    database: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>',
    layers: '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
    search: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
    heart: '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>',
    package: '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>',
    repeat: '<polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>',
    smartphone: '<rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>',
    'pie-chart': '<path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/>',
  };
  $$('[data-ic]').forEach(n => {
    const s = n.dataset.size || 20;
    n.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="' + s + '" height="' + s + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (EX[n.dataset.ic] || '') + '</svg>';
    n.style.display = 'inline-flex'; n.setAttribute('aria-hidden', 'true');
  });

  const header = $('[data-header]');
  const onScroll = () => header.classList.toggle('scrolled', scrollY > 40);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* sector photos: the exchange plays when the card is on screen */
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.5 });
  $$('.ph, .tpl').forEach(c => { if (reduce) c.classList.add('in'); else io.observe(c); });

  /* integrations: filter by group */
  (() => {
    const chips = $$('[data-chips] button'), groups = $$('[data-ig]'); if (!chips.length) return;
    chips.forEach(c => c.addEventListener('click', () => {
      const k = c.dataset.f;
      chips.forEach(x => x.setAttribute('aria-pressed', String(x === c)));
      groups.forEach(g => { g.hidden = k !== 'all' && g.dataset.ig !== k; });
      if (motion) { G.fromTo(groups.filter(g => !g.hidden), { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: 'power3.out', clearProps: 'opacity,transform' }); ST.refresh(); }
    }));
  })();

  /* FAQ: the category list follows the scroll */
  (() => {
    const links = $$('[data-fqnav] a'); if (!links.length) return;
    const groups = links.map(a => $(a.getAttribute('href')));
    const spy = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) links.forEach((a, i) => a.classList.toggle('on', groups[i] === e.target)); }), { rootMargin: '-30% 0px -55% 0px' });
    groups.forEach(g => spy.observe(g)); links[0].classList.add('on');
  })();

  /* solutions: the sector explorer — the list drives the photo stage; it advances by itself until the visitor takes over */
  (() => {
    const ex = $('[data-ex]'); if (!ex) return;
    const sec = ex.closest('.ex'), tabs = $$('[data-ex-tab]', ex), ms = $$('[data-ex-m]', ex), prog = $('.ex-prog', sec);
    const wide = matchMedia('(min-width: 1024px)'), hover = matchMedia('(hover: hover)');
    let i = 0, timer = 0, hold = false, seen = false;
    function go(n, user) {
      i = (n + ms.length) % ms.length;
      tabs.forEach((b, k) => { b.classList.toggle('on', k === i); b.setAttribute('aria-selected', String(k === i)); b.tabIndex = k === i ? 0 : -1; });
      ms.forEach((m, k) => { m.classList.toggle('on', k === i); m.inert = k !== i; });
      if (user && !wide.matches) { const t = tabs[i], box = t.parentNode; box.scrollTo({ left: t.offsetLeft - (box.clientWidth - t.offsetWidth) / 2, behavior: reduce ? 'auto' : 'smooth' }); }
      run();
    }
    function run() {
      clearTimeout(timer); prog.classList.remove('run');
      if (reduce || hold || !seen) return;
      void prog.offsetWidth; prog.classList.add('run');
      timer = setTimeout(() => go(i + 1), 5200);
    }
    const pause = on => { hold = on; sec.classList.toggle('hold', on); if (on) clearTimeout(timer); else run(); };
    tabs.forEach((b, k) => {
      b.addEventListener('click', () => go(k, true));
      b.addEventListener('pointerenter', () => { if (hover.matches && wide.matches && k !== i) go(k); });
      b.addEventListener('keydown', e => { const d2 = e.key === 'ArrowDown' || e.key === 'ArrowLeft' ? 1 : e.key === 'ArrowUp' || e.key === 'ArrowRight' ? -1 : 0; if (d2) { e.preventDefault(); go(i + d2, true); tabs[i].focus(); } });
    });
    ex.addEventListener('pointerenter', () => pause(true)); ex.addEventListener('pointerleave', () => pause(false));
    ex.addEventListener('focusin', () => pause(true)); ex.addEventListener('focusout', e => { if (!ex.contains(e.relatedTarget)) pause(false); });
    new IntersectionObserver(([e]) => { seen = e.isIntersecting; if (seen) run(); else clearTimeout(timer); }, { threshold: 0.35 }).observe(ex);
    go(0);
  })();

  /* contact form: prototype only — validates, then shows a confirmation; nothing is sent */
  (() => {
    const form = $('[data-form]'); if (!form) return;
    form.addEventListener('submit', e => {
      e.preventDefault(); let ok = true;
      $$('.fld', form).forEach(f => {
        const i = $('input, textarea', f), bad = i.required && (!i.value.trim() || (i.type === 'email' && !/^\S+@\S+\.\S+$/.test(i.value.trim())));
        f.classList.toggle('bad', bad); i.setAttribute('aria-invalid', String(bad)); if (bad && ok) { i.focus(); ok = false; }
      });
      form.classList.toggle('sent', ok); if (ok) form.reset();
    });
    form.addEventListener('input', e => { const f = e.target.closest('.fld'); if (f) f.classList.remove('bad'); });
  })();

  if (!motion) { root.classList.remove('anim'); return; }
  root.classList.remove('anim');

  /* page hero: the bubble outline draws, lines rise from their masks, the mint rule draws */
  const tl = G.timeline({ defaults: { ease: 'power3.out' } });
  const geo = $('.phero .geo path');
  if (geo) { const gl = geo.getTotalLength(); geo.style.strokeDasharray = gl; tl.fromTo(geo, { strokeDashoffset: gl }, { strokeDashoffset: 0, duration: 2.2, ease: 'power2.inOut' }, 0); }
  tl.fromTo('.phero .pill', { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.6 }, 0.15)
    .from('.phero .in', { yPercent: 125, duration: 1.05, stagger: 0.12, ease: 'power4.out' }, 0.2)
    .fromTo('.phero [data-mark]', { '--u': '0%' }, { '--u': '100%', duration: 0.8, ease: 'power2.inOut' }, 0.9)
    .fromTo('.phero [data-in]:not(.pill)', { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.1 }, 0.6)
    .from('.phero .dots i', { scale: 0, duration: 0.5, stagger: 0.08, ease: 'back.out(2.4)' }, 1.0);
  const sheet = $('.chapter.rise');
  if (sheet) tl.from(sheet, { yPercent: 12, autoAlpha: 0, duration: 1.1, ease: 'power4.out' }, 0.45);

  /* section copy */
  $$('[data-head], [data-cta] .wrap').forEach(box => {
    G.timeline({ defaults: { ease: 'power4.out' }, scrollTrigger: { trigger: box, start: 'top 82%' } })
      .from($$('[data-rv="line"]', box), { yPercent: 125, duration: 1, stagger: 0.12 }, 0)
      .fromTo($$('[data-rv=""]', box), { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.1 }, 0.15);
  });
  /* staggered groups */
  $$('[data-stagger]').forEach(box => G.fromTo([...box.children], { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.85, stagger: 0.08, ease: 'power3.out', clearProps: 'opacity,transform', scrollTrigger: { trigger: box, start: 'top 84%' } }));
  /* use-case rows: the photo wipes open, the number fills */
  $$('.uc').forEach(r => {
    const ph = $('.ph', r), n = $('.uc-n', r);
    G.timeline({ scrollTrigger: { trigger: r, start: 'top 78%' } })
      .fromTo(ph, { clipPath: 'inset(0% 0% 100% 0% round 28px)' }, { clipPath: 'inset(0% 0% 0% 0% round 28px)', duration: 1.2, ease: 'power4.inOut', clearProps: 'clipPath' }, 0)
      .fromTo($$('.uc-txt > *', r), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out' }, 0.15)
      .to(n, { color: '#0B1B3A', webkitTextStrokeColor: '#0B1B3A', duration: 0.6 }, 0.5);
  });
  /* closing bubble */
  const cg = $('[data-ctageo] path');
  if (cg) { const cl = cg.getTotalLength(); cg.style.strokeDasharray = cl; G.fromTo(cg, { strokeDashoffset: cl }, { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: '[data-cta]', start: 'top 85%', end: 'center 55%', scrub: 0.6 } }); }
  addEventListener('load', () => ST.refresh());
})();
