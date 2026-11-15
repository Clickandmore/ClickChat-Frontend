/* Navy Canvas — phone layer (home page): dots for the swipeable rails and the sticky call-to-action bar.
   Styles: mobile.css. Runs only under 768px; above that nothing is built. */
(() => {
  const d = document, mq = matchMedia('(max-width: 767px)');
  if (!mq.matches) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- rails: one dot per card, kept in step with the swipe ---------- */
  /* the team card carries a tall live demo: it stands on its own above the benefits rail instead of setting every card's height */
  const bento = d.querySelector('[data-bento]'), team = bento && bento.querySelector(':scope > .bt.team');
  if (team) {
    team.classList.add('m-lead'); bento.before(team);
    /* its entrance was timed to the rail, which now sits below it: show it as it is */
    if (window.gsap) { gsap.killTweensOf(team); gsap.set(team, { clearProps: 'opacity,transform' }); }
  }

  d.querySelectorAll('[data-reel], [data-bento]').forEach(rail => {
    const items = [...rail.children].filter(n => n.nodeType === 1);
    if (items.length < 2) return;
    const dots = d.createElement('div');
    dots.className = 'm-dots';
    dots.setAttribute('role', 'group');
    dots.setAttribute('aria-label', 'البطاقات');
    items.forEach((it, i) => {
      const b = d.createElement('button');
      b.type = 'button';
      const t = it.querySelector('h3');
      b.setAttribute('aria-label', (i + 1) + ' من ' + items.length + (t ? ': ' + t.textContent.trim() : ''));
      b.addEventListener('click', () => it.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'nearest', inline: 'start' }));
      dots.append(b);
    });
    rail.after(dots);
    const btns = [...dots.children];
    let cur = -1;
    const sync = () => {
      const step = items[1].offsetLeft - items[0].offsetLeft;
      const i = Math.max(0, Math.min(items.length - 1, Math.round(Math.abs(rail.scrollLeft) / Math.abs(step || 1))));
      if (i === cur) return;
      cur = i;
      btns.forEach((b, n) => b.setAttribute('aria-current', String(n === i)));
    };
    rail.addEventListener('scroll', sync, { passive: true });
    addEventListener('resize', sync);
    sync();
  });

  /* ---------- sticky call to action: after the hero's buttons, until the closing call to action ---------- */
  const bar = d.createElement('div');
  bar.className = 'm-bar';
  bar.innerHTML = '<a href="#" class="btn btn-mint">ابدأ مجاناً <span data-icon="arrow" data-size="18"></span></a>' +
    '<a href="contact.html" class="m-talk"><span data-icon="message" data-size="18"></span>تواصل معنا</a>';
  d.body.append(bar);
  if (window.renderIcons) window.renderIcons(bar);
  bar.inert = true;

  const heroCta = d.querySelector('.pa .cta-row'), endCta = d.querySelector('[data-cta]');
  let past = false, atEnd = false;
  const set = () => { const on = past && !atEnd; bar.classList.toggle('on', on); bar.inert = !on; };
  if ('IntersectionObserver' in window) {
    if (heroCta) new IntersectionObserver(([e]) => { past = !e.isIntersecting && e.boundingClientRect.top < 0; set(); }).observe(heroCta);
    /* hidden from the closing call to action onwards, footer included */
    if (endCta) new IntersectionObserver(([e]) => { atEnd = e.isIntersecting || e.boundingClientRect.top < 0; set(); }, { rootMargin: '0px 0px -10% 0px' }).observe(endCta);
  }
})();
