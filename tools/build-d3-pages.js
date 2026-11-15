/* Builds the Direction 3 (Signal) inner pages as static prototype files next to direction-3-signal.html.
   Run from the prototypes folder:  node tools/build-d3-pages.js
   - Look: <head> (all styles) and the header are taken from the home page, so the inner pages always match it.
   - Text: tools/content/*.json, the page content saved from clickchat.sa (see tools/import-content.js).
   - Icons: Lucide (ISC), inlined from tools/lucide/. */
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..'), HOME = fs.readFileSync(path.join(ROOT, 'direction-3-signal.html'), 'utf8');
const content = n => JSON.parse(fs.readFileSync(path.join(__dirname, 'content', n + '.json'), 'utf8'));

/* ---------- text helpers ---------- */
const DIG = '٠١٢٣٤٥٦٧٨٩';
const fix = s => String(s == null ? '' : s).replace(/ClickWhats/g, 'ClickChat').replace(/[٠-٩]/g, d => DIG.indexOf(d));   // rebrand + Western digits (decision 2026-11-12)
const esc = s => fix(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const lines = s => fix(s).split(/\r?\n/).map(x => x.trim()).filter(Boolean);

/* ---------- icons ---------- */
const LOCAL = { inbox: 'inbox', bot: 'bot', workflow: 'workflow', megaphone: 'megaphone', users: 'users', target: 'target', calendar: 'calendar', lock: 'lock', sparkles: 'sparkles', zap: 'zap', send: 'send', phone: 'phone', mail: 'mail', globe: 'globe', check: 'check', arrow: 'arrow', x: 'x', message: 'message', chevron: 'chevron',
  'shopping-cart': 'cart', 'user-check': 'usercheck', 'file-text': 'file', 'bar-chart-2': 'chart', 'message-circle': 'message' };
function icon(name, size = 20) {
  if (LOCAL[name]) return `<span data-icon="${LOCAL[name]}" data-size="${size}"></span>`;
  const f = path.join(__dirname, 'lucide', name + '.svg');
  if (!fs.existsSync(f)) return `<span data-icon="sparkles" data-size="${size}"></span>`;
  const inner = fs.readFileSync(f, 'utf8').replace(/<!--[\s\S]*?-->/, '').replace(/<svg[\s\S]*?>/, '').replace('</svg>', '').replace(/\s+/g, ' ').trim();
  return `<span class="inline-flex" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" focusable="false">${inner}</svg></span>`;
}

/* ---------- shell taken from the home page ---------- */
const between = (a, b) => { const i = HOME.indexOf(a), j = HOME.indexOf(b, i); if (i < 0 || j < 0) throw new Error('home marker missing: ' + a); return HOME.slice(i, j + b.length); };
const HEAD = between('<!doctype html>', '</head>');
const TW = '<link rel="stylesheet" href="assets/d3-tailwind.css">';   // built by tools/tailwind.config.js
const HEADER = between('<a class="skip-link"', '</header>')
  .replace('<a href="#top" class="shrink-0"', '<a href="#" data-route="/" data-no-current class="shrink-0"')
  .replace(/href="#features"/g, 'href="#" data-route="/#features"')
  .replace(/href="#integrations"(?! data-route)/g, 'href="#" data-route="/integrations"')
  .replace(/href="#integrations" data-route/g, 'href="#" data-route')
  .replace(/href="#pricing"/g, 'href="#" data-route="/pricing"')
  .replace(/href="#faq"/g, 'href="#" data-route="/faq"');
const INTEGRATIONS = new Function('return ' + between('const INTEGRATIONS = [', '\n];').replace('const INTEGRATIONS = ', '').replace(/;$/, ''))();
const LOGO = Object.fromEntries(INTEGRATIONS.map(([n, c, d]) => [n.toLowerCase(), `<b class="inline-flex" style="color:${c}"><svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true"><path d="${d}"/></svg></b>`]));

const fl = (route, label) => `<li><a class="hover:text-white" href="#" data-route="${route}" data-no-current>${label}</a></li>`;
const FOOTER = `<footer class="border-t border-white/[.06] bg-[#030812]">
  <div class="sadu-light" aria-hidden="true"></div>
  <div class="mx-auto max-w-page px-4 md:px-8 py-14 grid grid-cols-2 md:grid-cols-6 gap-8 text-[15px]">
    <div class="col-span-2"><img src="assets/brand/clickchat-horizontal-reversed.svg" alt="ClickChat كليك شات" class="h-10 w-auto"><p class="mt-4 max-w-sm leading-[1.8] text-steel-300">منصة سعودية تجمع واتساب وماسنجر وإنستغرام في صندوق وارد واحد، مع الذكاء الاصطناعي والأتمتة والحملات الجماعية.</p></div>
    <nav aria-label="المنتج"><p class="font-semibold text-white">المنتج</p><ul class="mt-3 space-y-2 text-steel-300">${fl('/#features', 'المزايا')}${fl('/integrations', 'التكاملات')}${fl('/pricing', 'الأسعار')}${fl('/faq', 'الأسئلة الشائعة')}</ul></nav>
    <nav aria-label="الحلول"><p class="font-semibold text-white">الحلول</p><ul class="mt-3 space-y-2 text-steel-300">${fl('/industries/ecommerce', 'المتاجر الإلكترونية')}${fl('/industries/clinics', 'العيادات')}${fl('/industries/restaurants', 'المطاعم والكافيهات')}${fl('/industries', 'كل الحلول')}</ul></nav>
    <nav aria-label="الشركة"><p class="font-semibold text-white">الشركة</p><ul class="mt-3 space-y-2 text-steel-300">${fl('/about', 'من نحن')}${fl('/use-cases', 'حالات الاستخدام')}${fl('/contact', 'تواصل معنا')}</ul></nav>
    <nav aria-label="قانوني"><p class="font-semibold text-white">قانوني</p><ul class="mt-3 space-y-2 text-steel-300">${fl('/p/privacy', 'سياسة الخصوصية')}${fl('/p/terms', 'الشروط والأحكام')}${fl('/p/cookies', 'سياسة ملفات الارتباط')}</ul></nav>
  </div>
  <div class="border-t border-white/[.06]"><div class="mx-auto max-w-page px-4 md:px-8 py-5 flex flex-wrap gap-4 text-[13px] text-steel-300"><span>© <span class="ltr">2026</span> <span lang="en">ClickChat</span> | كليك شات. جميع الحقوق محفوظة.</span><span class="ms-auto">من <span lang="en">Click &amp; More</span></span></div></div>
</footer>`;
const MOBILE_BAR = between('<div class="mobile-bar', '</div>\n');
const SWITCH = between('<nav class="proto-switch"', '</nav>');

const EXTRA_CSS = `<style>
  /* ---- Inner pages (generated by tools/build-d3-pages.js) ---- */
  header a[aria-current="page"] { color: #fff; }
  .phero { position: relative; overflow: hidden; }
  .phero .arc { position: absolute; left: -25%; width: 150%; height: 900px; bottom: calc(100% - 104px); border-radius: 50%; pointer-events: none;
    background: radial-gradient(ellipse 60% 30% at 50% 100%, rgba(18,201,155,.26), rgba(18,201,155,.06) 45%, transparent 75%), #040B18;
    box-shadow: 0 1.5px 0 rgba(190,255,235,.7), 0 10px 28px rgba(18,201,155,.42), 0 50px 130px rgba(18,201,155,.22); }
  .crumbs a:hover { color: #fff; }
  .tile { position: relative; display: grid; place-items: center; width: 44px; height: 44px; border-radius: 12px; color: #12C99B; background: rgba(18,201,155,.14); }
  .tile.dim { color: #B7C2D2; background: rgba(255,255,255,.07); }
  .photo.short { min-height: 320px; }
  .photo.tall { min-height: 440px; border-radius: 28px; }
  /* sector / team page hero: a visual stage with solid shapes behind and a frosted conversation window in front */
  .ih-stage { position: relative; isolation: isolate; max-width: 520px; margin-inline: auto; width: 100%; }
  .ih-stage .cube { z-index: -1; top: -38px; inset-inline-end: -34px; width: 132px; height: 132px; }
  .ih-stage .cube.sm { top: auto; bottom: 46px; inset-inline-end: auto; inset-inline-start: -58px; width: 84px; height: 84px; border-radius: 16px; }
  .ih-chat { position: relative; z-index: 2; margin: -150px 14px 0; padding: 16px 16px 18px; }
  .ih-chat .bub { max-width: 92%; }
  .ih-note { margin-top: 12px; font-size: 12px; color: #8290A4; text-align: center; }
  .ih-panel { padding: 22px; }
  .ih-row { display: flex; align-items: center; gap: 12px; padding: 10px 12px; border-radius: 14px; box-shadow: inset 0 0 0 1px rgba(255,255,255,.07); background: rgba(255,255,255,.03); }
  .ih-row.on { background: rgba(18,201,155,.1); box-shadow: inset 0 0 0 1px rgba(18,201,155,.5); }
  /* the hero fills the first screen on desktop */
  @media (min-width: 1024px) { .phero { min-height: 100vh; min-height: 100svh; display: flex; flex-direction: column; justify-content: center; } .phero > .relative { width: 100%; } }
  /* entrance: the picture rises in and settles, the shapes pop out behind it, the conversation window slides up, then its messages arrive.
     Content is visible without script or with reduced motion (these rules only apply under .js-reveal). */
  .ih-stage { --rd: .95s; }
  .js-reveal .ih-stage[data-reveal] { opacity: 1; transform: none; }
  .js-reveal .ih-stage > .photo, .js-reveal .ih-stage > .ih-panel { opacity: 0; transform: translateY(34px) scale(.95); transition: opacity .7s cubic-bezier(.2,0,0,1) .1s, transform 1s cubic-bezier(.2,0,0,1) .1s; }
  .js-reveal .ih-stage > .photo img { scale: 1.14; transition: scale 1.8s cubic-bezier(.2,0,0,1) .1s; }
  .js-reveal .ih-stage .cube { scale: 0; transition: scale .8s cubic-bezier(.34,1.56,.64,1) .45s; }
  .js-reveal .ih-stage .cube.sm { transition-delay: .65s; }
  .js-reveal .ih-stage .ih-chat { opacity: 0; translate: 0 30px; transition: opacity .55s cubic-bezier(.2,0,0,1) .7s, translate .7s cubic-bezier(.34,1.4,.64,1) .7s; }
  .js-reveal .ih-stage .ih-note { opacity: 0; transition: opacity .6s 1.6s; }
  .js-reveal .ih-stage .ih-row { opacity: 0; translate: 0 14px; transition: opacity .5s cubic-bezier(.2,0,0,1), translate .5s cubic-bezier(.2,0,0,1); }
  .js-reveal .ih-stage .ih-row:nth-child(1) { transition-delay: .6s; } .js-reveal .ih-stage .ih-row:nth-child(2) { transition-delay: .74s; }
  .js-reveal .ih-stage .ih-row:nth-child(3) { transition-delay: .88s; } .js-reveal .ih-stage .ih-row:nth-child(4) { transition-delay: 1.02s; }
  .js-reveal .ih-stage.in > .photo, .js-reveal .ih-stage.in > .ih-panel { opacity: 1; transform: none; }
  .js-reveal .ih-stage.in > .photo img { scale: 1; }
  .js-reveal .ih-stage.in > .photo:hover img { scale: 1.05; transition-duration: .7s; transition-delay: 0s; }
  .js-reveal .ih-stage.in .cube { scale: 1; }
  .js-reveal .ih-stage.in .ih-chat, .js-reveal .ih-stage.in .ih-row { opacity: 1; translate: 0 0; }
  .js-reveal .ih-stage.in .ih-note { opacity: 1; }
  /* once settled, the conversation window floats very slightly */
  .js-reveal .ih-stage.in .ih-chat { animation: ihfloat 5.5s ease-in-out 2.2s infinite alternate; }
  @keyframes ihfloat { to { translate: 0 -9px; } }
  @media (min-width: 1024px) {
    .photo.tall { min-height: 560px; }
    .ih-stage { margin-inline: 0 auto; }
    .ih-chat { position: absolute; margin: 0; bottom: 34px; inset-inline-start: -44px; width: min(340px, 78%); }
    .ih-note { position: absolute; bottom: -30px; inset-inline-end: 6px; margin: 0; }
    .ih-panel { padding: 26px; }
  }
  .photo img.dim { filter: brightness(.8) saturate(.88) contrast(1.04); }
  .chip { display: inline-flex; align-items: center; gap: 7px; padding: 6px 12px; border-radius: 99px; font-size: 13.5px; color: #F5F8FB; background: rgba(255,255,255,.06); box-shadow: inset 0 0 0 1px rgba(255,255,255,.1); }
  .pill { display: inline-flex; align-items: center; height: 44px; padding: 0 18px; border-radius: 99px; font-size: 14.5px; font-weight: 600; color: #B7C2D2; box-shadow: inset 0 0 0 1px rgba(255,255,255,.14); transition: background .15s, color .15s; }
  .pill:hover { color: #fff; background: rgba(255,255,255,.06); }
  .pill[aria-pressed="true"] { color: #0B1B3A; background: #12C99B; box-shadow: none; }
  .talk { display: flex; flex-direction: column; align-items: flex-start; gap: 8px; }
  .talk .bub { max-width: 88%; }
  .cmp { width: 100%; border-collapse: separate; border-spacing: 0; font-size: 15px; }
  .cmp th, .cmp td { padding: 16px 18px; text-align: center; border-bottom: 1px solid rgba(255,255,255,.07); }
  .cmp th:first-child, .cmp td:first-child { text-align: start; color: #F5F8FB; font-weight: 500; }
  .cmp thead th { background: rgba(255,255,255,.03); font-family: "Readex Pro", sans-serif; font-size: 17px; color: #fff; }
  .cmp td { color: #B7C2D2; }
  .cmp .feat-col { background: rgba(18,201,155,.07); }
  .cmp tbody tr:last-child td { border-bottom: 0; }
  @media (max-width: 639px) { .cmp { font-size: 12.5px; table-layout: fixed; } .cmp th, .cmp td { padding: 13px 5px; } .cmp th:first-child { width: 37%; padding-inline-start: 12px; } .cmp thead th { font-size: 13.5px; } }
  .field label { display: block; font-size: 14.5px; font-weight: 600; color: #F5F8FB; }
  .field input, .field textarea { margin-top: 8px; width: 100%; border-radius: 12px; padding: 12px 14px; font-size: 16px; color: #fff; background: rgba(255,255,255,.05); box-shadow: inset 0 0 0 1px rgba(255,255,255,.14); }
  .field input { height: 48px; }
  .field input:focus, .field textarea:focus { outline: 2px solid #12C99B; outline-offset: 1px; }
  .field [aria-invalid="true"] { box-shadow: inset 0 0 0 1.5px #FF8A73; }
  .field [data-error] { margin-top: 6px; font-size: 13.5px; color: #FF9C88; }
  .prose-legal { max-width: 68ch; font-size: 17px; line-height: 1.95; color: #B7C2D2; }
  .prose-legal h2 { margin-top: 44px; scroll-margin-top: 96px; font-family: "Readex Pro", sans-serif; font-weight: 600; font-size: 24px; line-height: 1.4; color: #fff; }
  .prose-legal p { margin-top: 14px; }
  .prose-legal a { color: #12C99B; text-decoration: underline; text-underline-offset: 3px; }
  [hidden] { display: none !important; }
</style>`;

/* ---------- building blocks ---------- */
const btn = (label, route, primary) => primary
  ? `<a href="#" data-route="${route}" class="inline-flex h-[52px] px-7 items-center gap-2 rounded-btn bg-mint text-navy text-[16px] font-semibold transition-shadow hover:shadow-[0_0_28px_rgba(18,201,155,.5)]">${esc(label)} ${icon('arrow', 18)}</a>`
  : `<a href="#" data-route="${route}" class="edge inline-flex h-[52px] px-6 items-center rounded-btn text-white text-[16px] font-semibold">${esc(label)}</a>`;
const buttons = d => (d.primary_label || d.secondary_label) ? `<div class="mt-8 flex flex-wrap justify-center gap-3">${d.primary_label ? btn(d.primary_label, d.primary_url || '/register', true) : ''}${d.secondary_label ? btn(d.secondary_label, d.secondary_url || '/contact', false) : ''}</div>` : '';
const crumbs = trail => `<nav aria-label="مسار الصفحة" class="crumbs mb-6 flex flex-wrap justify-center items-center gap-2 text-[13.5px] text-steel-500"><a href="#" data-route="/" data-no-current>الرئيسية</a>${trail.map(([label, route]) => `<span aria-hidden="true">/</span>${route ? `<a href="#" data-route="${route}" data-no-current>${esc(label)}</a>` : `<span class="text-steel-300" aria-current="page">${esc(label)}</span>`}`).join('')}</nav>`;
const hero = (d, trail) => `<section class="phero pt-[150px] md:pt-[176px] pb-16 md:pb-24" aria-labelledby="page-title">
    <div class="hz-grid" aria-hidden="true"></div><div class="arc" aria-hidden="true"></div>
    <div class="relative mx-auto max-w-[880px] px-4 md:px-8 text-center">
      ${crumbs(trail)}
      <p class="eyebrow">${esc(d.badge)}</p>
      <h1 id="page-title" class="mt-5 font-display font-bold text-white text-[34px] md:text-[52px] leading-[1.25]">${esc(d.title)}</h1>
      <p class="mt-5 text-[17px] md:text-[18px] leading-[1.85] text-steel-300">${esc(d.subtitle)}</p>
      ${buttons(d)}
    </div>
  </section>`;
const head2 = (d, id, center) => `<div class="${center ? 'text-center mx-auto max-w-[760px]' : 'max-w-[760px]'}" data-reveal>
        ${d.badge ? `<p class="eyebrow">${esc(d.badge)}</p>` : ''}
        <h2 id="${id}" class="${d.badge ? 'mt-5 ' : ''}font-display font-bold text-white text-[28px] md:text-[40px] leading-[1.3]">${esc(d.title)}</h2>
        ${d.subtitle ? `<p class="mt-4 text-[17px] leading-[1.8] text-steel-300">${esc(d.subtitle)}</p>` : ''}
      </div>`;
const card = (it, k, dim) => `<li class="edge rounded-card p-6" data-reveal style="--rd:${(k % 4) * .07}s"><span class="tile${dim ? ' dim' : ''}">${icon(it.icon, 22)}</span><h3 class="relative mt-4 font-display font-semibold text-[18px] leading-[1.5] text-white">${esc(it.title)}</h3><p class="relative mt-2 text-[15px] leading-[1.8] text-steel-300">${esc(it.desc)}</p></li>`;
const faqList = (items, open) => `<div class="space-y-3">${items.map((it, k) => `<details class="edge rounded-card group"${open && k === 0 ? ' open' : ''}>
          <summary class="relative px-6 py-5 flex items-center gap-4 font-display font-semibold text-[17px] md:text-[18px] text-white"><span class="flex-1">${esc(it.q)}</span><span class="chev text-mint">${icon('chevron', 20)}</span></summary>
          <p class="relative px-6 pb-6 -mt-1 text-[16px] leading-[1.85] text-steel-300">${esc(it.a)}</p></details>`).join('\n')}</div>`;
const cta = d => `<div class="seam flip" data-seam="band" aria-hidden="true"></div>
  <section aria-labelledby="cta-title" class="relative overflow-hidden border-t border-white/[.06]">
    <div class="glow w-[680px] h-[340px] top-10" style="left:calc(50% - 340px); background:rgba(18,201,155,.16)" aria-hidden="true"></div>
    <div class="relative mx-auto max-w-[820px] px-4 md:px-8 py-24 md:py-32 text-center">
      <h2 id="cta-title" class="font-display font-bold text-white text-[32px] md:text-[48px] leading-[1.25]">${esc(d.title)}</h2>
      <p class="mt-5 text-[17px] md:text-[18px] leading-[1.8] text-steel-300">${esc(d.subtitle || d.text)}</p>
      ${buttons(d)}
    </div>
  </section>`;
const band = (inner, alt, cls = '') => `<section class="${alt ? 'border-y border-white/[.06] bg-[#07132A]' : ''} ${cls}"><div class="mx-auto max-w-page px-4 md:px-8 py-20 md:py-28">${inner}</div></section>`;
const section = (page, type) => page.sections.filter(s => s.type === type).map(s => Object.assign({ anchor: s.anchor }, s.data));

function write(file, title, description, main, tailScript = '') {
  const head = HEAD.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)} | ClickChat كليك شات</title>`)
    .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${esc(description)}">`)
    .replace(TW + '\n', '')                                   // the utility stylesheet must stay last, after the inner-page styles
    .replace('</head>', EXTRA_CSS + '\n' + TW + '\n<script src="assets/d3-routes.js" defer></script>\n<script src="assets/d3-shell.js" defer></script>\n</head>');
  const html = `${head}
<body class="pb-20 md:pb-0">
${HEADER}

<main id="main">
  ${main}
</main>

${FOOTER}

${MOBILE_BAR}
${SWITCH}
${tailScript}
</body>
</html>
`;
  fs.writeFileSync(path.join(ROOT, file), html);
  console.log('built', file, (html.length / 1024).toFixed(0) + ' KB');
}

/* ---------- photographs (generated mood imagery; not real customers) ---------- */
const PHOTO = { ecommerce: ['store', '42%'], clinics: ['clinic', '30%'], restaurants: ['cafe', '38%'], 'real-estate': ['realestate', '48%', 1], 'car-showrooms': ['cars', '47%', 1], salons: ['salon', '47%', 1], education: ['education', '46%', 1], recruitment: ['recruitment', '47%', 1] };
const img = slug => { const [f, pos, dim] = PHOTO[slug]; return `<img src="assets/photos/${f}.jpg"${dim ? ' class="dim"' : ''} alt="" width="1200" height="800" loading="lazy" decoding="async" style="object-position:${pos} 0">`; };

/* =====================================================================  PRICING  */
(function () {
  const { page, plans } = content('pricing');
  const [h] = section(page, 'page_hero'), [p] = section(page, 'pricing'), [f] = section(page, 'faq'), [c] = section(page, 'cta');
  const yes = `<span class="text-mint inline-flex">${icon('check', 18)}</span><span class="sr-only">متوفر</span>`, no = `<span class="text-steel-500" aria-hidden="true">—</span><span class="sr-only">غير متوفر</span>`;
  /* rows are read off the three live plans' feature lists */
  const rows = [
    ['أعضاء الفريق', 'حتى <span class="ltr">2</span>', 'حتى <span class="ltr">10</span>', 'بلا حدود'],
    ['التخزين', '<span class="ltr">5 GB</span>', '<span class="ltr">50 GB</span>', '<span class="ltr">500 GB</span>'],
    ['الدعم', 'بريد إلكتروني', 'بأولوية', 'مخصّص'],
    ['تحليلات متقدمة', no, yes, yes],
    ['هوية خاصة <span class="ltr">(White-label)</span>', no, no, yes],
    ['نطاق خاص', no, no, yes],
    ['اتفاقية مستوى الخدمة <span class="ltr">SLA</span>', no, no, yes],
    ['التجربة المجانية', no, '<span class="ltr">14</span> يوماً', '<span class="ltr">14</span> يوماً'],
  ];
  const main = `${hero(h, [[page.title]])}
  <section id="plans" aria-label="الباقات" class="relative isolate">
    <div class="relative mx-auto max-w-page px-4 md:px-8 pb-20 md:pb-28">
      <div class="flex flex-wrap justify-center gap-3" data-reveal>
        <div role="radiogroup" aria-label="مدة الاشتراك" class="seg inline-flex edge rounded-full p-1" data-period>
          <button type="button" role="radio" aria-checked="true" data-v="m" class="relative h-11 px-5 rounded-full text-[14px] font-semibold text-steel-300">${esc(p.monthly_label)}</button>
          <button type="button" role="radio" aria-checked="false" data-v="y" class="relative h-11 px-5 rounded-full text-[14px] font-semibold text-steel-300">${esc(p.yearly_label)} · ${esc(p.yearly_badge)}</button>
        </div>
        <div role="radiogroup" aria-label="العملة" class="seg inline-flex edge rounded-full p-1" data-currency>
          <button type="button" role="radio" aria-checked="true" data-v="SAR" class="relative h-11 px-4 rounded-full text-[14px] font-semibold text-steel-300">ر.س</button>
          <button type="button" role="radio" aria-checked="false" data-v="USD" class="relative h-11 px-4 rounded-full text-[14px] font-semibold text-steel-300 ltr">USD</button>
        </div>
      </div>
      <ul class="mt-12 grid md:grid-cols-3 gap-5 items-stretch" aria-live="polite" data-plans></ul>
      <p class="mt-8 mx-auto max-w-[760px] text-center text-[14px] leading-[1.8] text-steel-500">${esc(p.footnote)}</p>
    </div>
  </section>
  ${band(`${head2({ badge: 'مقارنة الباقات', title: 'قارن كل المزايا', subtitle: 'كل ما تتضمنه كل باقة، جنباً إلى جنب.' }, 'cmp-title', true)}
      <div class="mt-12 edge rounded-sheet overflow-x-auto" data-reveal><table class="cmp relative" aria-labelledby="cmp-title">
        <thead><tr><th scope="col"><span class="sr-only">الميزة</span></th><th scope="col" lang="en">Starter</th><th scope="col" lang="en">Pro</th><th scope="col" lang="en" class="feat-col">Business</th></tr></thead>
        <tbody>${rows.map(r => `<tr><th scope="row">${r[0]}</th><td>${r[1]}</td><td>${r[2]}</td><td class="feat-col">${r[3]}</td></tr>`).join('')}</tbody>
      </table></div>`, true)}
  <section aria-labelledby="faq-title" class="mx-auto max-w-page px-4 md:px-8 py-20 md:py-28 grid lg:grid-cols-[1fr_1.6fr] gap-10 lg:gap-16">
    ${head2({ badge: 'الأسئلة الشائعة', title: f.title }, 'faq-title')}
    ${faqList(f.items, true)}
  </section>
  ${cta(c)}`;
  const three = plans.filter(x => x.currency === 'USD');                     // the three published plans; prices are stored in USD
  const AR = { Starter: ['للأفراد والمشاريع الصغيرة.', ['حتى <span class="ltr">2</span> من أعضاء الفريق', 'تخزين <span class="ltr">5 GB</span>', 'دعم عبر البريد الإلكتروني']], Pro: ['للفرق النامية التي تحتاج إمكانات أكثر.', ['حتى <span class="ltr">10</span> من أعضاء الفريق', 'تخزين <span class="ltr">50 GB</span>', 'دعم بأولوية', 'تحليلات متقدمة']], Business: ['مزايا المؤسسات للشركات الكبيرة.', ['أعضاء فريق بلا حدود', 'تخزين <span class="ltr">500 GB</span>', 'دعم مخصّص', 'هوية خاصة <span class="ltr">(White-label)</span>', 'نطاق خاص', 'اتفاقية مستوى الخدمة <span class="ltr">SLA</span>']] };
  const PLANS = three.map(x => ({ name: x.name, desc: AR[x.name][0], m: x.price_monthly, y: x.price_yearly, trial: x.trial_days, featured: x.is_featured, f: AR[x.name][1] }));
  const script = `<script>
/* Pricing: same rules as the home page. Plans are stored in USD and shown through an exchange rate (live: SAR 3.75). */
document.addEventListener('DOMContentLoaded', function () {
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const ico = (n, s = 20) => '<span data-icon="' + n + '" data-size="' + s + '"></span>';
  const RATES = { SAR: { rate: 3.75, sym: 'ر.س' }, USD: { rate: 1, sym: '$' } };
  const PLANS = ${JSON.stringify(PLANS)};
  const state = { period: 'm', cur: 'SAR' };
  const money = n => (n * RATES[state.cur].rate).toLocaleString('en-US', { maximumFractionDigits: 2 });
  function renderPlans() {
    const yearly = state.period === 'y', sym = RATES[state.cur].sym;
    $('[data-plans]').innerHTML = PLANS.map(p => {
      const price = yearly ? p.y : p.m, free = p.m === 0;
      const save = yearly && !free ? Math.round((1 - p.y / (p.m * 12)) * 100) : 0;
      return '<li class="edge ' + (p.featured ? 'lit md:-my-3 shadow-[0_0_80px_-24px_rgba(18,201,155,.55)]' : '') + ' rounded-sheet p-7 flex flex-col">'
        + '<div class="relative flex items-center gap-2"><h2 lang="en" class="font-display font-semibold text-[20px] text-white">' + p.name + '</h2>' + (p.featured ? '<span class="ms-auto rounded-full bg-mint text-navy text-[12px] font-semibold px-2.5 py-1">${esc(p.featured_label)}</span>' : '') + '</div>'
        + '<p class="relative mt-1 text-[14px] text-steel-300">' + p.desc + '</p>'
        + '<p class="relative mt-5 flex flex-wrap items-baseline gap-x-2 font-display font-bold text-white">' + (free ? '<span class="text-[40px] leading-none">${esc(p.free_label)}</span>' : '<span class="ltr text-[40px] leading-none">' + money(price) + '</span><span class="text-[16px] font-semibold">' + sym + '</span><span class="text-[14px] font-normal text-steel-300">' + (yearly ? '${esc(p.per_year)}' : '${esc(p.per_month)}') + '</span>') + (save ? '<span class="rounded-full bg-mint/15 text-mint text-[12px] font-semibold px-2 py-0.5">وفّر <span class="ltr">' + save + '%</span></span>' : '') + '</p>'
        + '<p class="relative mt-2 h-5 text-[13px] text-mint">' + (p.trial ? 'تجربة مجانية <span class="ltr">' + p.trial + '</span> يوماً' : '') + '</p>'
        + '<ul class="relative mt-5 space-y-3 text-[15px] text-steel-300 flex-1">' + p.f.map(x => '<li class="flex gap-2.5"><span class="mt-1 text-mint shrink-0">' + ico('check', 16) + '</span><span>' + x + '</span></li>').join('') + '</ul>'
        + '<a href="#" data-route="/register?plan=' + p.name.toLowerCase() + '" class="relative mt-8 inline-flex h-12 justify-center items-center rounded-btn font-semibold ' + (p.featured ? 'bg-mint text-navy hover:shadow-[0_0_28px_rgba(18,201,155,.5)]' : 'border border-white/20 text-white hover:bg-white/5') + ' transition-shadow">' + (p.featured ? '${esc(p.featured_button)}' : '${esc(p.button)}') + '</a></li>';
    }).join('');
    window.renderIcons && renderIcons($('[data-plans]'));
  }
  function segmented(root, key) {
    const btns = $$('button', root);
    const set = b => { btns.forEach(x => x.setAttribute('aria-checked', x === b)); state[key] = b.dataset.v; renderPlans(); };
    btns.forEach((b, i) => {
      b.addEventListener('click', () => set(b));
      b.addEventListener('keydown', e => { if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { const n = btns[(i + 1) % btns.length]; n.focus(); set(n); } });
    });
  }
  segmented($('[data-period]'), 'period'); segmented($('[data-currency]'), 'cur'); renderPlans();
});
</script>`;
  write('d3-pricing.html', page.title, page.seo.description, main, script);
})();

/* =====================================================================  SOLUTIONS HUB  */
const HUB = content('industries');
(function () {
  const { page, industries } = HUB;
  const [h] = section(page, 'page_hero'), [c] = section(page, 'cta');
  const main = `${hero(h, [[page.title]])}
  <section aria-labelledby="sec-title" class="mx-auto max-w-page px-4 md:px-8 pb-20 md:pb-28">
    ${head2({ badge: 'حسب القطاع', title: 'اختر قطاعك' }, 'sec-title')}
    <ul class="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">${industries.sector.map((s, k) => `<li data-reveal style="--rd:${(k % 4) * .07}s"><a href="#" data-route="${s.url}" class="photo short group">
      ${img(s.slug)}
      <span class="cap"><span class="block font-display font-semibold text-[19px] leading-[1.45] text-white">${esc(s.name)}</span><span class="block mt-1.5 text-[14px] leading-[1.7] text-steel-300">${esc(s.short_description)}</span><span class="go" aria-hidden="true">${icon('arrow', 18)}</span></span></a></li>`).join('\n')}</ul>
    <p class="mt-5 text-[12px] text-steel-500">الصور توضيحية.</p>
  </section>
  ${band(`${head2({ badge: 'حسب فريق العمل', title: 'أو اختر فريقك' }, 'team-title')}
      <ul class="mt-10 grid md:grid-cols-3 gap-5">${industries.team.map((s, k) => `<li data-reveal style="--rd:${k * .07}s"><a href="#" data-route="${s.url}" class="edge hov block h-full rounded-card p-7"><span class="tile">${icon(s.icon, 22)}</span><span class="relative block mt-5 font-display font-semibold text-[20px] text-white">${esc(s.name)}</span><span class="relative block mt-2 text-[15px] leading-[1.8] text-steel-300">${esc(s.short_description)}</span><span class="relative mt-5 inline-flex items-center gap-2 text-[14.5px] font-semibold text-mint">اعرف المزيد ${icon('arrow', 16)}</span></a></li>`).join('\n')}</ul>
      <p class="mt-8" data-reveal><a href="#" data-route="/use-cases" class="inline-flex items-center gap-2 text-[15px] font-semibold text-mint hover:text-mint-300">تصفّح حالات الاستخدام ${icon('arrow', 16)}</a></p>`, true)}
  ${cta(c)}`;
  write('d3-industries.html', page.title, page.seo.description, main);
})();

/* =====================================================================  INDUSTRY TEMPLATE x11  */
const ALL = HUB.industries.sector.concat(HUB.industries.team);
ALL.forEach(entry => {
  const { industry: d } = content('industries_' + entry.slug), b = d.blocks, sector = d.category === 'sector';
  /* Hero visual. Sector: the photograph with a floating conversation window (first CMS message template).
     Team: a small inbox-style panel listing what the team gets. Both are illustrative. */
  const t0 = (b.templates.items || [])[0];
  const chatHead = `<div class="flex items-center gap-3"><span class="tile" style="width:38px;height:38px;border-radius:99px">${icon(d.icon, 18)}</span><span class="min-w-0"><span class="block truncate font-semibold text-white text-[14.5px]">${esc(d.name)}</span><span class="flex items-center gap-1.5 text-[12px] text-steel-300"><i class="w-1.5 h-1.5 rounded-full bg-wa"></i>واتساب · متصل</span></span></div>`;
  const talk = t0 ? `<div class="talk mt-4">${t0.customer ? `<span class="bub in">${esc(t0.customer)}</span>` : ''}<span class="bub out">${icon('check', 13)}<span>${esc(t0.reply)}</span></span></div>` : '';
  const visual = sector
    ? `<div class="ih-stage" data-reveal>
        <span class="cube" style="--r:18deg;--t:8s" aria-hidden="true"></span><span class="cube sm" style="--r:-14deg;--t:6.5s" aria-hidden="true"></span>
        <div class="photo tall">${img(d.slug)}<span class="tag">${icon(d.icon, 15)}${esc(d.name)}</span></div>
        <div class="ih-chat frost" aria-hidden="true">${chatHead}${talk}</div>
        <p class="ih-note">محادثة وصورة توضيحيتان</p>
      </div>`
    : `<div class="ih-stage" data-reveal>
        <span class="cube" style="--r:18deg;--t:8s" aria-hidden="true"></span><span class="cube sm" style="--r:-14deg;--t:6.5s" aria-hidden="true"></span>
        <div class="ih-panel frost">
          <div class="flex items-center gap-3 pb-4 border-b border-white/10"><span class="tile">${icon(d.icon, 22)}</span><span class="min-w-0 flex-1"><span class="block font-display font-semibold text-white text-[17px]">${esc(d.name)}</span><span class="flex items-center gap-1.5 text-[12.5px] text-steel-300"><i class="w-1.5 h-1.5 rounded-full bg-mint"></i>الفريق متصل</span></span></div>
          <ul class="mt-3 grid gap-2">${b.use_cases.items.map((it, k) => `<li class="ih-row${k === 0 ? ' on' : ''}"><span class="tile${k === 0 ? '' : ' dim'}" style="width:36px;height:36px;border-radius:10px">${icon(it.icon, 17)}</span><span class="min-w-0"><span class="block font-semibold text-white text-[14.5px]">${esc(it.title)}</span><span class="block truncate text-[13px] text-steel-300">${esc(it.desc)}</span></span></li>`).join('')}</ul>
        </div>
      </div>`;
  const points = b.use_cases.items.slice(0, 3).map(it => `<li class="inline-flex items-center gap-2"><span class="text-mint inline-flex">${icon('check', 16)}</span>${esc(it.title)}</li>`).join('');
  const others = ALL.filter(x => x.category === d.category && x.slug !== d.slug).slice(0, 4);
  const main = `<section class="phero ih pt-[132px] md:pt-[160px] pb-20 md:pb-28" aria-labelledby="page-title">
    <div class="hz-grid" aria-hidden="true"></div><div class="arc" aria-hidden="true"></div>
    <div class="glow w-[520px] h-[420px] top-[160px] hidden lg:block" style="left:6%; background:rgba(18,201,155,.13)" aria-hidden="true"></div>
    <div class="relative mx-auto max-w-page px-4 md:px-8 grid lg:grid-cols-[1.08fr_.92fr] gap-12 lg:gap-16 items-center">
      <div class="text-center lg:text-start">
        ${crumbs([['الحلول', '/industries'], [d.name]]).replace('justify-center', 'justify-center lg:justify-start')}
        <p class="eyebrow">${esc(b.hero.badge)}</p>
        <h1 id="page-title" class="mt-5 font-display font-bold text-white text-[34px] md:text-[46px] xl:text-[54px] leading-[1.22]">${esc(b.hero.title)}</h1>
        <p class="mt-5 text-[17px] md:text-[18px] leading-[1.85] text-steel-300">${esc(b.hero.subtitle)}</p>
        ${buttons(b.hero).replace('justify-center', 'justify-center lg:justify-start')}
        ${sector ? `<ul class="mt-8 flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2 text-[14.5px] text-steel-300">${points}</ul>` : ""}
      </div>
      ${visual}
    </div>
  </section>
  ${band(`${head2(b.pain_points, 'pain-title', true)}
      <ul class="mt-12 grid md:grid-cols-3 gap-5">${b.pain_points.items.map((it, k) => card(it, k, true)).join('')}</ul>`, true)}
  ${band(`${head2(b.use_cases, 'use-title', true)}
      <ul class="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">${b.use_cases.items.map((it, k) => card(it, k)).join('')}</ul>`)}
  ${(b.templates.items || []).length ? band(`<div class="grid lg:grid-cols-[1fr_1.5fr] gap-10 lg:gap-16 items-start">
        ${head2(b.templates, 'tpl-title')}
        <ul class="grid sm:grid-cols-2 gap-5">${b.templates.items.map((it, k) => `<li class="edge rounded-card p-6" data-reveal style="--rd:${k * .08}s"><h3 class="relative font-display font-semibold text-[17px] text-white">${esc(it.title)}</h3><div class="talk relative mt-4">${it.customer ? `<span class="bub in">${esc(it.customer)}</span>` : ''}<span class="bub out">${icon('check', 13)}<span>${esc(it.reply)}</span></span></div></li>`).join('')}</ul>
      </div>`, true) : ''}
  ${band(`${head2(b.features, 'feat-title', true)}
      <ul class="mt-12 grid sm:grid-cols-2 gap-5">${b.features.items.map((it, k) => card(it, k)).join('')}</ul>`, !(b.templates.items || []).length)}
  <section aria-labelledby="faq-title" class="border-t border-white/[.06] bg-[#07132A]"><div class="mx-auto max-w-page px-4 md:px-8 py-20 md:py-28 grid lg:grid-cols-[1fr_1.6fr] gap-10 lg:gap-16">
    ${head2(b.faqs, 'faq-title')}
    ${faqList(b.faqs.items, true)}
  </div></section>
  <section aria-label="حلول أخرى" class="mx-auto max-w-page px-4 md:px-8 py-14"><div class="flex flex-wrap items-center gap-3" data-reveal><span class="text-[15px] font-semibold text-white">${sector ? 'قطاعات أخرى' : 'فرق أخرى'}</span>${others.map(o => `<a href="#" data-route="${o.url}" class="pill">${esc(o.name)}</a>`).join('')}<a href="#" data-route="/industries" class="ms-auto inline-flex items-center gap-2 text-[15px] font-semibold text-mint hover:text-mint-300">كل الحلول ${icon('arrow', 16)}</a></div></section>
  ${cta(b.final_cta)}`;
  write(`d3-industry-${d.slug}.html`, d.name, b.hero.subtitle, main);
});

/* =====================================================================  USE CASES  */
(function () {
  const { page } = content('use-cases');
  const [h] = section(page, 'page_hero'), [u] = section(page, 'use_cases'), [s] = section(page, 'steps'), [c] = section(page, 'cta');
  const main = `${hero(h, [[page.title]])}
  ${band(`${head2(u, 'uc-title', true)}
      <ul class="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-5">${u.items.map((it, k) => `<li class="edge rounded-sheet p-7 flex flex-col" data-reveal style="--rd:${(k % 3) * .07}s">
        <div class="relative flex items-center gap-3"><span class="tile">${icon(it.icon, 22)}</span><span class="text-[14px] font-semibold text-mint">${esc(it.label)}</span></div>
        <h3 class="relative mt-5 font-display font-semibold text-[20px] leading-[1.45] text-white">${esc(it.title)}</h3>
        <p class="relative mt-2 text-[15px] leading-[1.8] text-steel-300">${esc(it.desc)}</p>
        <ul class="relative mt-5 pt-5 border-t border-white/[.08] space-y-2.5 text-[14.5px] text-steel-300">${lines(it.bullets).map(x => `<li class="flex gap-2.5"><span class="mt-1 text-mint shrink-0">${icon('check', 15)}</span><span>${esc(x)}</span></li>`).join('')}</ul></li>`).join('\n')}</ul>`, true)}
  ${band(`${head2(s, 'steps-title', true)}
      <ol class="mt-12 grid md:grid-cols-3 gap-5">${s.items.map((it, k) => `<li class="edge rounded-card p-7" data-reveal style="--rd:${k * .08}s"><span class="relative grid place-items-center w-11 h-11 rounded-full bg-mint text-navy font-display font-bold ltr">${k + 1}</span><h3 class="relative mt-5 font-display font-semibold text-[19px] text-white">${esc(it.title)}</h3><p class="relative mt-2 text-[15px] leading-[1.8] text-steel-300">${esc(it.desc)}</p></li>`).join('')}</ol>
      ${s.button_label ? `<p class="mt-10 text-center" data-reveal>${btn(s.button_label, s.button_url || '/register', true)}</p>` : ''}`)}
  ${cta(c)}`;
  write('d3-use-cases.html', page.title, page.seo.description, main);
})();

/* =====================================================================  INTEGRATIONS  */
(function () {
  const { page } = content('integrations');
  const [h] = section(page, 'page_hero'), [g] = section(page, 'integration_groups'), [c] = section(page, 'cta');
  const alias = { 'anthropic claude': 'anthropic', 'whatsapp cloud api': 'whatsapp', 'whatsapp qr': 'whatsapp' };
  const name = n => `<li class="chip">${LOGO[alias[n.toLowerCase()] || n.toLowerCase()] || ''}<span lang="en">${esc(n)}</span></li>`;
  const main = `${hero(h, [[page.title]])}
  <section aria-label="مجموعات التكاملات" class="mx-auto max-w-page px-4 md:px-8 pb-20 md:pb-28">
    <div class="flex flex-wrap justify-center gap-2" role="group" aria-label="تصفية حسب النوع" data-filter data-reveal>
      <button type="button" class="pill" aria-pressed="true" data-v="all">الكل</button>${g.items.map((it, k) => `<button type="button" class="pill" aria-pressed="false" data-v="g${k}">${esc(it.title)}</button>`).join('')}
    </div>
    <ul class="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">${g.items.map((it, k) => `<li class="edge rounded-sheet p-7" data-group="g${k}">
      <span class="tile">${icon(k === 6 ? 'code' : it.icon, 22)}</span>
      <h2 class="relative mt-5 font-display font-semibold text-[20px] text-white">${esc(it.title)}</h2>
      <p class="relative mt-2 text-[15px] leading-[1.8] text-steel-300">${esc(it.desc)}</p>
      <ul class="relative mt-5 flex flex-wrap gap-2">${lines(it.names).map(name).join('')}</ul></li>`).join('\n')}</ul>
  </section>
  ${cta(c)}`;
  write('d3-integrations.html', page.title, page.seo.description, main);
})();

/* =====================================================================  FAQ  */
(function () {
  const { page } = content('faq');
  const [h] = section(page, 'page_hero'), groups = section(page, 'faq'), [c] = section(page, 'cta');
  const main = `${hero(h, [[page.title]])}
  <section aria-label="الأسئلة" class="mx-auto max-w-[920px] px-4 md:px-8 pb-20 md:pb-28">
    <nav aria-label="أقسام الأسئلة" class="flex flex-wrap justify-center gap-2" data-reveal>${groups.map((g, k) => `<a class="pill" href="#${g.anchor || 'g' + k}">${esc(g.title)}</a>`).join('')}</nav>
    ${groups.map((g, k) => `<div id="${g.anchor || 'g' + k}" class="mt-14" style="scroll-margin-top:96px"><h2 class="font-display font-bold text-white text-[26px] md:text-[32px]" data-reveal>${esc(g.title)}</h2><div class="mt-6" data-reveal>${faqList(g.items, k === 0)}</div></div>`).join('\n')}
    <div class="mt-16 edge lit rounded-sheet p-8 md:p-10 flex flex-wrap items-center gap-6" data-reveal>
      <div class="relative flex-1 min-w-[240px]"><h2 class="font-display font-bold text-white text-[24px]">لم تجد إجابتك؟</h2><p class="mt-2 text-[16px] leading-[1.8] text-steel-300">راسل فريقنا وسنرد عليك في أقرب وقت.</p></div>
      <div class="relative flex flex-wrap gap-3">${btn('تواصل معنا', '/contact', true)}</div>
    </div>
  </section>
  ${cta(c)}`;
  write('d3-faq.html', page.title, page.seo.description, main);
})();

/* =====================================================================  ABOUT  */
(function () {
  const { page } = content('about');
  const [h] = section(page, 'page_hero'), [s] = section(page, 'story'), [v] = section(page, 'benefits'), [c] = section(page, 'cta');
  const main = `${hero(h, [[page.title]])}
  ${band(`<div class="grid lg:grid-cols-[1fr_1.5fr] gap-10 lg:gap-16 items-start">
        ${head2(s, 'story-title')}
        <div class="space-y-5 text-[17px] leading-[1.95] text-steel-300" data-reveal>${lines(s.body).map(x => `<p>${esc(x)}</p>`).join('')}
          <p class="pt-5 border-t border-white/[.08] text-[15px] text-steel-300"><span lang="en" class="font-semibold text-white">ClickChat</span> من <span lang="en" class="font-semibold text-white">Click &amp; More</span></p></div>
      </div>`, true)}
  ${band(`${head2(v, 'values-title', true)}
      <ul class="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">${v.items.map((it, k) => card(it, k)).join('')}</ul>`)}
  ${cta(c)}`;
  write('d3-about.html', page.title, page.seo.description, main);
})();

/* =====================================================================  CONTACT  */
(function () {
  const { page } = content('contact');
  const [h] = section(page, 'page_hero'), [d] = section(page, 'contact');
  const opt = (ic, title, line, note) => `<li class="edge rounded-card p-6" data-reveal><span class="tile">${icon(ic, 22)}</span><h3 class="relative mt-4 font-display font-semibold text-[18px] text-white">${title}</h3><p class="relative mt-2 text-[15px] leading-[1.8] text-steel-300">${line}</p><p class="relative mt-3 text-[13px] text-steel-500">${note}</p></li>`;
  const field = (id, label, type, required, extra = '') => `<div class="field" data-field><label for="${id}">${esc(label)}${required ? ' <span class="text-mint" aria-hidden="true">*</span>' : ' <span class="font-normal text-steel-500">(اختياري)</span>'}</label>${type === 'textarea' ? `<textarea id="${id}" name="${id}" rows="5"${required ? ' required' : ''} aria-describedby="${id}-err"></textarea>` : `<input id="${id}" name="${id}" type="${type}"${required ? ' required' : ''}${extra} aria-describedby="${id}-err">`}<p id="${id}-err" data-error role="alert" hidden></p></div>`;
  const sub = d.items[0];
  const main = `${hero(h, [[page.title]])}
  <section aria-label="طرق التواصل" class="mx-auto max-w-page px-4 md:px-8 pb-20 md:pb-28">
    <ul class="grid md:grid-cols-3 gap-5">
      ${opt('message', esc(d.whatsapp_title), 'تحدّث معنا مباشرة على واتساب.', 'الرقم يُضاف قبل الإطلاق')}
      ${opt('mail', esc(d.email_title), 'راسلنا وسنرد خلال يوم عمل.', 'العنوان يُضاف قبل الإطلاق')}
      ${opt('calendar', 'عرض توضيحي', 'احجز جلسة مع فريق المبيعات لنعرض لك المنصة.', 'رابط الحجز يُضاف قبل الإطلاق')}
    </ul>
    <div class="mt-14 grid lg:grid-cols-[1.4fr_1fr] gap-8 items-start">
      <div class="edge rounded-sheet p-7 md:p-9" data-reveal>
        <h2 class="relative font-display font-bold text-white text-[24px]">${esc(d.form_heading)}</h2>
        <form class="relative mt-6 grid gap-5" novalidate data-contact-form>
          <div class="grid sm:grid-cols-2 gap-5">${field('name', d.name_label, 'text', true, ' autocomplete="name"')}${field('email', d.email_label, 'email', true, ' autocomplete="email" dir="ltr" inputmode="email"')}</div>
          ${field('subject', d.subject_label, 'text', false)}
          ${field('message', d.message_label, 'textarea', true)}
          <div><button type="submit" data-sending="${esc(d.sending_label)}" class="inline-flex h-[52px] px-8 items-center rounded-btn bg-mint text-navy text-[16px] font-semibold disabled:opacity-70">${esc(d.submit_label)}</button></div>
        </form>
        <div class="relative mt-6 rounded-card bg-mint/10 p-6 text-[16px] leading-[1.8] text-white" role="status" tabindex="-1" data-success hidden><span class="text-mint inline-flex align-middle me-2">${icon('check', 20)}</span>${esc(d.success_message)}</div>
      </div>
      <aside class="edge rounded-sheet p-7" data-reveal>
        <span class="tile">${icon(sub.icon, 22)}</span>
        <h2 class="relative mt-5 font-display font-semibold text-[20px] text-white">${esc(sub.title)}</h2>
        <p class="relative mt-2 text-[15px] leading-[1.8] text-steel-300">${esc(sub.desc)}</p>
        <a href="#" data-route="${sub.url}" class="relative mt-5 inline-flex items-center gap-2 text-[15px] font-semibold text-mint hover:text-mint-300">تسجيل الدخول ${icon('arrow', 16)}</a>
      </aside>
    </div>
  </section>`;
  write('d3-contact.html', page.title, page.seo.description, main);
})();

/* =====================================================================  LEGAL x3  */
[['privacy', 'سياسة الخصوصية'], ['terms', 'الشروط والأحكام'], ['cookies', 'سياسة ملفات الارتباط']].forEach(([slug, title]) => {
  const { page } = content('p_' + slug);
  let body = fix(page.content), notice = '';
  body = body.replace(/^<p style="[^"]*">([\s\S]*?)<\/p>/, (m, inner) => { notice = inner.replace(/⚠️\s*/, ''); return ''; });
  let updated = '';
  body = body.replace(/<p>(آخر تحديث:[^<]*)<\/p>/, (m, t) => { updated = t; return ''; });
  const toc = [];
  body = body.replace(/<h2>([\s\S]*?)<\/h2>/g, (m, t) => { const id = 's' + (toc.length + 1); toc.push([id, t]); return `<h2 id="${id}">${t}</h2>`; })
    .replace(/href="\/contact"/g, 'href="#" data-route="/contact"');
  const main = `<section class="phero pt-[150px] md:pt-[176px] pb-12" aria-labelledby="page-title">
    <div class="hz-grid" aria-hidden="true"></div><div class="arc" aria-hidden="true"></div>
    <div class="relative mx-auto max-w-page px-4 md:px-8">
      ${crumbs([[title]]).replace('justify-center', 'justify-start')}
      <h1 id="page-title" class="font-display font-bold text-white text-[34px] md:text-[48px] leading-[1.25]">${esc(title)}</h1>
      ${updated ? `<p class="mt-4 text-[15px] text-steel-300">${updated}</p>` : ''}
    </div>
  </section>
  <section aria-label="${esc(title)}" class="mx-auto max-w-page px-4 md:px-8 pb-24 grid lg:grid-cols-[260px_1fr] gap-10 lg:gap-16 items-start">
    <nav aria-label="محتويات الصفحة" class="edge rounded-card p-5 lg:sticky lg:top-[96px]"><p class="relative text-[13px] font-semibold text-mint">المحتويات</p><ol class="relative mt-3 space-y-2 text-[14.5px] text-steel-300">${toc.map(([id, t]) => `<li><a class="hover:text-white" href="#${id}">${t}</a></li>`).join('')}</ol></nav>
    <div>
      ${notice ? `<p class="edge coral rounded-card p-5 max-w-[68ch] text-[15px] leading-[1.8] text-steel-300"><span class="relative">${notice}</span></p>` : ''}
      <div class="prose-legal">${body}</div>
    </div>
  </section>`;
  write(`d3-legal-${slug}.html`, title, page.meta_description && /[؀-ۿ]/.test(page.meta_description) ? page.meta_description : title + ' — ClickChat', main);
});

/* =====================================================================  HOME: same footer links, and the route script  */
(function () {
  let h = HOME;
  const a = h.indexOf('<footer'), b = h.indexOf('</footer>') + '</footer>'.length;
  h = h.slice(0, a) + FOOTER + h.slice(b);
  if (!h.includes('assets/d3-routes.js')) h = h.replace('<script src="assets/icons.js" defer></script>', '<script src="assets/icons.js" defer></script>\n<script src="assets/d3-routes.js" defer></script>');
  if (h !== HOME) { fs.writeFileSync(path.join(ROOT, 'direction-3-signal.html'), h); console.log('updated direction-3-signal.html (footer links + routes)'); }
})();
