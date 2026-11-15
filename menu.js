/* NAVY CANVAS — the «حلولنا» mega menu, shared by every page. Classic script, no dependencies.
   Without this script the link simply opens solutions.html. Names and one-liners are the live site's (clickchat.sa mega menu). */
(function () {
  'use strict';
  const d = document, hd = d.querySelector('.hd'), link = hd && hd.querySelector('nav a[href*="solutions.html"]');
  if (!link) return;
  // read the header links before the mega menu adds its arrow to «حلولنا»
  const LINKS = [...hd.querySelectorAll('nav a')].map(a => ({ t: a.textContent.trim(), h: a.getAttribute('href'), cur: a.hasAttribute('aria-current'), sol: a === link }));
  const I = {
    close: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    restaurants: '<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>',
    clinics: '<path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6 6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6 6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/>',
    'real-estate': '<rect width="16" height="20" x="4" y="2" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/>',
    ecommerce: '<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>',
    'car-showrooms': '<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/>',
    salons: '<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/>',
    education: '<path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>',
    recruitment: '<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/>',
    sales: '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>',
    'customer-service': '<path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>',
    operations: '<rect width="8" height="8" x="3" y="3" rx="2"/><path d="M7 11v4a2 2 0 0 0 2 2h4"/><rect width="8" height="8" x="13" y="13" rx="2"/>',
    arrow: '<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>', chev: '<path d="m6 9 6 6 6-6"/>',
  };
  const svg = (k, s) => '<svg width="' + s + '" height="' + s + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + I[k] + '</svg>';
  const SECTORS = [
    ['restaurants', 'المطاعم والكافيهات', 'استقبل الطلبات والحجوزات من واتساب وإنستغرام في صندوق واحد.'],
    ['clinics', 'العيادات والمراكز الطبية', 'مواعيد وتذكيرات واستفسارات المرضى من واتساب، مع فريق استقبال منظم.'],
    ['real-estate', 'العقار', 'تابع كل مهتم بعقار من أول رسالة حتى المعاينة.'],
    ['ecommerce', 'المتاجر الإلكترونية', 'إشعارات الطلب وخدمة ما بعد البيع والسلات المتروكة عبر واتساب.'],
    ['car-showrooms', 'معارض السيارات', 'تابع طلبات الأسعار والتجربة والتمويل من كل القنوات.'],
    ['salons', 'الصالونات ومراكز التجميل', 'حجوزات وتذكيرات وعروض لعميلاتك عبر واتساب وإنستغرام.'],
    ['education', 'التعليم والتدريب', 'تسجيل الطلاب والاستفسارات وتنبيهات الدورات من مكان واحد.'],
    ['recruitment', 'شركات ومكاتب الاستقدام', 'تابع طلبات الاستقدام ومراحل المعاملة مع العملاء عبر واتساب.'],
  ];
  const TEAMS = [
    ['sales', 'فرق المبيعات', 'وزّع العملاء المحتملين وتابعهم حتى الإغلاق.'],
    ['customer-service', 'خدمة العملاء', 'صندوق وارد مشترك وردود آلية وتقارير لرضا العملاء.'],
    ['operations', 'فرق العمليات', 'أتمتة الإشعارات والتحديثات وربط المنصة بأنظمتك.'],
  ];
  const here = location.pathname.split('/').pop();
  const item = (x, i) => '<li style="--i:' + i + '"><a href="industry-' + x[0] + '.html"' + (here === 'industry-' + x[0] + '.html' ? ' aria-current="page"' : '') + '><span class="mg-ic">' + svg(x[0], 20) + '</span><span><b>' + x[1] + '</b><small>' + x[2] + '</small></span></a></li>';

  const mega = d.createElement('div');
  mega.className = 'mega'; mega.id = 'mega'; mega.setAttribute('aria-label', 'حلولنا');
  mega.innerHTML = '<div class="mega-in">' +
    '<div class="mg-col"><p class="mg-t">أمثلة حسب النشاط</p><ul class="mg-list two">' + SECTORS.map(item).join('') + '</ul></div>' +
    '<div class="mg-col side"><p class="mg-t">أمثلة حسب الفريق</p><ul class="mg-list">' + TEAMS.map((x, i) => item(x, i + 2)).join('') + '</ul>' +
    '<a class="mg-all" href="solutions.html">كل الأمثلة ' + svg('arrow', 16) + '</a></div></div>';
  hd.append(mega);
  link.classList.add('has-mega'); link.insertAdjacentHTML('beforeend', '<span class="mg-chev">' + svg('chev', 15) + '</span>');
  link.setAttribute('aria-haspopup', 'true'); link.setAttribute('aria-controls', 'mega'); link.setAttribute('aria-expanded', 'false');

  let timer = 0, open = false;
  const set = on => { open = on; hd.classList.toggle('mega-open', on); link.setAttribute('aria-expanded', String(on)); };
  const show = () => { clearTimeout(timer); set(true); };
  const hide = wait => { clearTimeout(timer); timer = setTimeout(() => set(false), wait === undefined ? 180 : wait); };
  const canHover = matchMedia('(hover: hover)').matches;
  if (canHover) [link, mega].forEach(n => { n.addEventListener('pointerenter', show); n.addEventListener('pointerleave', () => hide()); });
  // touch and keyboard: the first press opens the menu, the second follows the link
  link.addEventListener('click', e => { if (!open) { e.preventDefault(); show(); } });
  link.addEventListener('keydown', e => { if (e.key === 'ArrowDown') { e.preventDefault(); show(); mega.querySelector('a').focus(); } });
  mega.addEventListener('focusin', show);
  mega.addEventListener('focusout', e => { if (!mega.contains(e.relatedTarget) && e.relatedTarget !== link) hide(0); });
  d.addEventListener('keydown', e => { if (e.key === 'Escape' && open) { hide(0); link.focus(); } });
  d.addEventListener('pointerdown', e => { if (open && !mega.contains(e.target) && !link.contains(e.target)) hide(0); });

  /* ================= phone and tablet menu (below 1100px) =================
     A full-screen navy sheet: the same links as the header, «حلولنا» opens the sectors and teams in place. */
  const root = d.documentElement, logo = hd.querySelector('.hd-logo img');
  const sub = x => '<li><a href="industry-' + x[0] + '.html"' + (here === 'industry-' + x[0] + '.html' ? ' aria-current="page"' : '') + '><span class="mg-ic">' + svg(x[0], 18) + '</span>' + x[1] + '</a></li>';
  const burger = d.createElement('button');
  burger.type = 'button'; burger.className = 'hd-burger'; burger.setAttribute('aria-label', 'القائمة'); burger.setAttribute('aria-controls', 'mnav'); burger.setAttribute('aria-expanded', 'false');
  burger.innerHTML = '<i></i><i></i>';
  hd.querySelector('.hd-act').append(burger);

  const mnav = d.createElement('div');
  mnav.className = 'mnav'; mnav.id = 'mnav'; mnav.setAttribute('role', 'dialog'); mnav.setAttribute('aria-modal', 'true'); mnav.setAttribute('aria-label', 'القائمة'); mnav.inert = true;
  mnav.innerHTML =
    '<div class="mn-top"><a href="index.html" aria-label="ClickChat كليك شات — الرئيسية"><img src="' + (logo ? logo.getAttribute('src').replace('-color.svg', '-reversed.svg') : '') + '" alt="ClickChat كليك شات"></a>' +
    '<button type="button" class="mn-x" aria-label="إغلاق القائمة">' + svg('close', 22) + '</button></div>' +
    '<nav aria-label="القائمة الرئيسية"><ul class="mn-list">' + LINKS.map((l, i) => l.sol
      ? '<li style="--i:' + i + '"><button type="button" class="mn-acc" aria-expanded="false" aria-controls="mn-sub">' + l.t + '<span class="mg-chev">' + svg('chev', 20) + '</span></button>' +
        '<div class="mn-sub" id="mn-sub"><div><p class="mg-t">أمثلة حسب النشاط</p><ul>' + SECTORS.map(sub).join('') + '</ul><p class="mg-t">أمثلة حسب الفريق</p><ul>' + TEAMS.map(sub).join('') + '</ul>' +
        '<a class="mg-all" href="solutions.html">كل الأمثلة ' + svg('arrow', 16) + '</a></div></div></li>'
      : '<li style="--i:' + i + '"><a href="' + l.h + '"' + (l.cur ? ' aria-current="page"' : '') + '>' + l.t + '</a></li>').join('') + '</ul></nav>' +
    '<div class="mn-foot"><div class="mn-lang" role="group" aria-label="اللغة"><a href="#" aria-current="true">العربية</a><a href="#" lang="en">English</a></div>' +
    '<a href="#" class="btn btn-line">تسجيل الدخول</a><a href="index.html#top" class="btn btn-mint">ابدأ الآن ' + svg('arrow', 18) + '</a></div>';
  mnav.classList.add('on-navy');
  d.body.append(mnav);

  const acc = mnav.querySelector('.mn-acc'), x = mnav.querySelector('.mn-x');
  if (acc && /^industry-/.test(here)) { acc.setAttribute('aria-expanded', 'true'); acc.parentNode.classList.add('open'); }
  let mopen = false;
  function drawer(on) {
    mopen = on; root.classList.toggle('mnav-open', on); mnav.inert = !on; burger.setAttribute('aria-expanded', String(on));
    d.body.style.overflow = on ? 'hidden' : '';
    (on ? x : burger).focus({ preventScroll: true });
  }
  burger.addEventListener('click', () => drawer(!mopen));
  x.addEventListener('click', () => drawer(false));
  if (acc) acc.addEventListener('click', () => { const on = acc.getAttribute('aria-expanded') !== 'true'; acc.setAttribute('aria-expanded', String(on)); acc.parentNode.classList.toggle('open', on); });
  // a link to a section of the page that is already open only needs the sheet to close
  mnav.addEventListener('click', e => { const a = e.target.closest('a'); if (a && a.getAttribute('href') !== '#') drawer(false); });
  d.addEventListener('keydown', e => {
    if (!mopen) return;
    if (e.key === 'Escape') { drawer(false); return; }
    if (e.key !== 'Tab') return;                       // keep the focus inside the sheet
    const f = [...mnav.querySelectorAll('a, button')].filter(n => n.offsetParent !== null), first = f[0], last = f[f.length - 1];
    if (e.shiftKey && d.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && d.activeElement === last) { e.preventDefault(); first.focus(); }
  });
  matchMedia('(min-width: 1100px)').addEventListener('change', e => { if (e.matches && mopen) drawer(false); });
})();
