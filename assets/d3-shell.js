/* Direction 3 inner pages: shared behaviour (menus, drawer, seams, reveal, headline entrance, FAQ, mobile bar).
   The home page keeps its own inline script; this file mirrors the parts every other page needs. */
(function () {
  document.documentElement.classList.add('js');
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---- Solutions menu (same list and routes as the live site) ---- */
  var SECTORS = [
    ['restaurants', 'المطاعم والكافيهات', 'استقبل الطلبات والحجوزات من واتساب وإنستغرام في صندوق واحد.'],
    ['clinics', 'العيادات والمراكز الطبية', 'مواعيد وتذكيرات واستفسارات المرضى من واتساب، مع فريق استقبال منظم.'],
    ['real-estate', 'العقار', 'تابع كل مهتم بعقار من أول رسالة حتى المعاينة.'],
    ['ecommerce', 'المتاجر الإلكترونية', 'إشعارات الطلب وخدمة ما بعد البيع والسلات المتروكة عبر واتساب.'],
    ['car-showrooms', 'معارض السيارات', 'تابع طلبات الأسعار والتجربة والتمويل من كل القنوات.'],
    ['salons', 'الصالونات ومراكز التجميل', 'حجوزات وتذكيرات وعروض لعميلاتك عبر واتساب وإنستغرام.'],
    ['education', 'التعليم والتدريب', 'تسجيل الطلاب والاستفسارات وتنبيهات الدورات من مكان واحد.'],
    ['recruitment', 'شركات ومكاتب الاستقدام', 'تابع طلبات الاستقدام ومراحل المعاملة مع العملاء عبر واتساب.']
  ];
  var TEAMS = [
    ['sales', 'فرق المبيعات', 'وزّع العملاء المحتملين وتابعهم حتى الإغلاق.'],
    ['customer-service', 'خدمة العملاء', 'صندوق وارد مشترك وردود آلية وتقارير لرضا العملاء.'],
    ['operations', 'فرق العمليات', 'أتمتة الإشعارات والتحديثات وربط المنصة بأنظمتك.']
  ];
  var item = function (x) { return '<li><a href="#" data-route="/industries/' + x[0] + '" class="block rounded-xl px-3 py-2.5 hover:bg-white/[.06]"><span class="block font-semibold text-white text-[15px]">' + x[1] + '</span><span class="block mt-0.5 text-[13px] leading-[1.6] text-steel-300">' + x[2] + '</span></a></li>'; };
  var fill = function (sel, html) { var el = $(sel); if (el) el.innerHTML = html; };
  fill('[data-sectors]', SECTORS.map(item).join(''));
  fill('[data-teams]', TEAMS.map(item).join(''));
  fill('[data-drawer-solutions]', SECTORS.concat(TEAMS).map(function (x) { return '<li><a href="#" data-route="/industries/' + x[0] + '" class="h-11 px-3 flex items-center rounded-btn hover:bg-white/5">' + x[1] + '</a></li>'; }).join(''));

  /* ---- Header: mega menu + drawer ---- */
  var megaBtn = $('[data-mega-btn]'), mega = $('[data-mega]'), drawerBtn = $('[data-drawer-btn]'), drawer = $('[data-drawer]');
  var setMega = function (on) { mega.classList.toggle('open', on); megaBtn.setAttribute('aria-expanded', on); };
  var setDrawer = function (on) { drawer.classList.toggle('hidden', !on); drawerBtn.setAttribute('aria-expanded', on); drawerBtn.setAttribute('aria-label', on ? 'إغلاق القائمة' : 'فتح القائمة'); };
  megaBtn.addEventListener('click', function (e) { e.stopPropagation(); setMega(!mega.classList.contains('open')); });
  document.addEventListener('click', function (e) { if (!mega.contains(e.target)) setMega(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { setMega(false); setDrawer(false); } });
  drawerBtn.addEventListener('click', function () { setDrawer(drawer.classList.contains('hidden')); });
  drawer.addEventListener('click', function (e) { if (e.target.closest('a')) setDrawer(false); });

  /* ---- Sadu seams ---- */
  var SEAM_W = 2400, NS = 'http://www.w3.org/2000/svg';
  var sv = function (tag, attrs) { var e = document.createElementNS(NS, tag); for (var k in attrs) e.setAttribute(k, attrs[k]); return e; };
  function buildBand(svg) {
    var hh = 46, step = 20, d = 0;
    for (var i = 0; i < SEAM_W / step; i++) {
      var x = i * step, up = i % 2 === 0;
      svg.appendChild(sv('path', { d: up ? 'M' + x + ' ' + hh + ' L' + (x + step / 2) + ' ' + hh * .35 + ' L' + (x + step) + ' ' + hh + ' Z' : 'M' + x + ' ' + hh * .35 + ' L' + (x + step / 2) + ' ' + hh + ' L' + (x + step) + ' ' + hh * .35 + ' Z', fill: up ? '#143B2E' : 'rgba(20,59,46,.5)', 'class': 'sadu-tri', style: '--i:' + Math.abs(i - 60) }));
      if (i % 4 === 2) svg.appendChild(sv('path', { d: 'M' + (x + step / 2) + ' ' + hh * .05 + ' L' + (x + step / 2 + 7) + ' ' + hh * .2 + ' L' + (x + step / 2) + ' ' + hh * .35 + ' L' + (x + step / 2 - 7) + ' ' + hh * .2 + ' Z', fill: '#12C99B', 'class': 'sadu-dia', style: '--i:' + Math.abs(d++ - 15) }));
    }
  }
  function buildThread(svg) {
    var mid = 9, step = 16;
    for (var i = 0; i < SEAM_W / step; i++) {
      var x = i * step, o = Math.abs(i - 75);
      svg.appendChild(sv('path', { d: 'M' + x + ' ' + mid + ' L' + (x + step / 2) + ' ' + (mid - 6) + ' L' + (x + step) + ' ' + mid + ' Z', fill: '#143B2E', 'class': 'sadu-tri', style: '--i:' + o }));
      svg.appendChild(sv('path', { d: 'M' + (x + step / 2) + ' ' + mid + ' L' + (x + step) + ' ' + (mid + 6) + ' L' + (x + step * 1.5) + ' ' + mid + ' Z', fill: 'rgba(20,59,46,.6)', 'class': 'sadu-tri', style: '--i:' + o + '; transform-origin:50% 0' }));
    }
    svg.appendChild(sv('line', { x1: 0, y1: mid, x2: SEAM_W, y2: mid, stroke: '#12C99B', 'stroke-opacity': .5, 'class': 'seam-line' }));
    for (var k = -5; k <= 5; k++) { var cx = SEAM_W / 2 + k * 240; svg.appendChild(sv('path', { d: 'M' + cx + ' ' + (mid - 7) + ' L' + (cx + 5) + ' ' + mid + ' L' + cx + ' ' + (mid + 7) + ' L' + (cx - 5) + ' ' + mid + ' Z', fill: '#12C99B', 'class': 'sadu-dia', style: '--i:' + Math.abs(k) })); }
  }
  $$('[data-seam]').forEach(function (s) {
    var band = s.dataset.seam === 'band';
    var svg = s.appendChild(sv('svg', { viewBox: '0 0 ' + SEAM_W + ' ' + (band ? 46 : 18), preserveAspectRatio: 'xMidYMid slice', focusable: 'false' }));
    (band ? buildBand : buildThread)(svg);
    if (!reduce) s.appendChild(document.createElement('span')).className = 'seam-light';
  });

  /* ---- Segmented filters (integrations): show one group or all ---- */
  $$('[data-filter]').forEach(function (root) {
    var btns = $$('button', root), cards = $$('[data-group]');
    btns.forEach(function (b) {
      b.addEventListener('click', function () {
        btns.forEach(function (x) { x.setAttribute('aria-pressed', x === b); });
        cards.forEach(function (c) { c.hidden = b.dataset.v !== 'all' && c.dataset.group !== b.dataset.v; });
      });
    });
  });

  /* ---- Contact form: labels stay visible, errors under each field, success state (prototype: nothing is sent) ---- */
  var form = $('[data-contact-form]');
  if (form) {
    var fields = $$('[data-field]', form);
    var check = function (wrap) {
      var input = $('input, textarea', wrap), err = $('[data-error]', wrap), v = input.value.trim(), msg = '';
      if (input.required && !v) msg = 'هذا الحقل مطلوب.';
      else if (input.type === 'email' && v && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)) msg = 'اكتب بريداً إلكترونياً صحيحاً، مثل name@example.com';
      err.textContent = msg; err.hidden = !msg; input.setAttribute('aria-invalid', msg ? 'true' : 'false');
      return !msg;
    };
    fields.forEach(function (w) { $('input, textarea', w).addEventListener('blur', function () { check(w); }); });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var bad = fields.filter(function (w) { return !check(w); });
      if (bad.length) { $('input, textarea', bad[0]).focus(); return; }
      var btn = $('[type="submit"]', form), done = $('[data-success]');
      btn.disabled = true; btn.textContent = btn.dataset.sending;
      setTimeout(function () { form.hidden = true; done.hidden = false; done.focus(); }, 700);
    });
  }

  /* ---- Reveal on scroll, headline entrance, seams, mobile bar ---- */
  if (!('IntersectionObserver' in window)) return;
  if (!reduce) {
    document.documentElement.classList.add('js-reveal');
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { rootMargin: '0px 0px -8% 0px' });
    $$('[data-reveal]').forEach(function (el) { io.observe(el); });
    var ho = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('go'); ho.unobserve(e.target); } }); }, { rootMargin: '0px 0px -8% 0px' });
    $$('main h1, main h2[id]:not(.sr-only)').forEach(function (h) {
      var k = 0;
      var walk = function (node) {
        Array.prototype.slice.call(node.childNodes).forEach(function (n) {
          if (n.nodeType === 1) return walk(n);
          if (n.nodeType !== 3) return;
          var f = document.createDocumentFragment(), mint = node.classList.contains('text-mint');
          n.textContent.split(' ').forEach(function (p, i) {
            if (i) f.appendChild(document.createTextNode(' '));
            if (!p.trim()) return;
            var s = document.createElement('span'); s.className = mint ? 'w hl' : 'w'; s.style.setProperty('--k', k++); s.textContent = p; f.appendChild(s);
          });
          n.replaceWith(f);
        });
      };
      walk(h); h.classList.add('split'); ho.observe(h);
    });
    var so = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) e.target.classList.add('in'); e.target.classList.toggle('paused', !e.isIntersecting); }); }, { threshold: .2 });
    $$('[data-seam]').forEach(function (el) { so.observe(el); });
  }
  var bar = $('[data-mobile-bar]'), h1 = $('main h1');
  if (bar && h1) new IntersectionObserver(function (es) { bar.classList.toggle('show', !es[0].isIntersecting); }, { rootMargin: '-80px 0px 0px 0px' }).observe(h1);
})();
