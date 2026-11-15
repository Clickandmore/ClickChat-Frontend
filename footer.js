/* Navy Canvas — site footer motion (styles: footer.css). The footer is static HTML; this only adds the entrance, the light that
   follows the pointer across the wordmark, and the back-to-top button. */
(() => {
  const d = document, ft = d.querySelector('[data-ft]');
  if (!ft) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* stagger: each column, then its links */
  ft.querySelectorAll('.ft-col').forEach(col => col.querySelectorAll('li').forEach((li, j) => li.style.setProperty('--j', j)));
  ft.querySelectorAll('.ft-bar > *').forEach((el, n) => el.style.setProperty('--i', 3 + n));

  /* back to top */
  const up = ft.querySelector('[data-up]');
  if (up) up.addEventListener('click', () => {
    scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    /* keyboard users land on the header logo, not back in the footer */
    const logo = d.querySelector('.hd-logo');
    if (logo) setTimeout(() => logo.focus({ preventScroll: true }), reduce ? 0 : 700);
  });

  if (!('IntersectionObserver' in window)) return;
  /* lets other fixed bits (the page switcher) step aside while the footer is on screen */
  new IntersectionObserver(([e]) => d.documentElement.classList.toggle('ft-seen', e.isIntersecting)).observe(ft.querySelector('.ft-bar'));
  if (reduce) return;

  /* entrance, once */
  ft.classList.add('ft-anim');
  new IntersectionObserver(([e], io) => { if (e.isIntersecting) { ft.classList.add('in'); io.disconnect(); } }, { threshold: 0.12 }).observe(ft);

  /* the wordmark's light: follows the pointer; on touch screens it drifts slowly while the footer is in view */
  const word = ft.querySelector('.ft-word'), spot = word && word.querySelector('#ftSpot');
  if (!spot) return;
  let x = 500, tx = 500, raf = 0, seen = false, pointer = false, t0 = performance.now();
  const tick = now => {
    if (!pointer) tx = 500 + Math.sin((now - t0) / 2600) * 430;
    x += (tx - x) * 0.08;
    spot.setAttribute('cx', x.toFixed(1));
    raf = seen ? requestAnimationFrame(tick) : 0;
  };
  new IntersectionObserver(([e]) => { seen = e.isIntersecting; if (seen && !raf) raf = requestAnimationFrame(tick); }).observe(word);
  ft.addEventListener('pointermove', e => {
    if (e.pointerType !== 'mouse') return;
    pointer = true;
    const r = word.getBoundingClientRect();
    tx = Math.max(-100, Math.min(1100, (e.clientX - r.left) / r.width * 1000));
  });
  ft.addEventListener('pointerleave', () => { pointer = false; t0 = performance.now() - Math.asin(Math.max(-1, Math.min(1, (x - 500) / 430))) * 2600; });
})();
