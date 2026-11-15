// Responsive audit: every page × several widths. Reports console errors, page-level sideways scroll,
// and elements that stick out of the viewport or have clipped text. usage: node audit.mjs <baseUrl> <outDir> [shots]
import { spawn } from 'node:child_process';
import { writeFileSync, mkdtempSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
const [base, outDir, shots] = process.argv.slice(2);
const PAGES = (process.env.PAGES || 'index,index?v=c,solutions,use-cases,integrations,pricing,faq,contact,industry-restaurants,industry-clinics,industry-real-estate,industry-ecommerce,industry-car-showrooms,industry-salons,industry-education,industry-recruitment,industry-sales,industry-customer-service,industry-operations').split(',');
const WIDTHS = (process.env.WIDTHS || '360,390,768,1024,1280,1440').split(',').map(Number);
mkdirSync(outDir, { recursive: true });
const port = 9300 + Math.floor(Math.random() * 500);
const edge = spawn('C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', ['--headless=new', '--remote-debugging-port=' + port, '--user-data-dir=' + mkdtempSync(join(tmpdir(), 'nc-')), '--hide-scrollbars', '--allow-file-access-from-files', 'about:blank'], { stdio: 'ignore' });
const sleep = ms => new Promise(r => setTimeout(r, ms));
let info; for (let i = 0; i < 40; i++) { try { info = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); if (info.length) break; } catch { } await sleep(250); }
const ws = new WebSocket(info.find(t => t.type === 'page').webSocketDebuggerUrl);
await new Promise(r => ws.onopen = r);
let id = 0; const pend = new Map(); let logs = [];
ws.onmessage = m => { const o = JSON.parse(m.data); if (o.id && pend.has(o.id)) { pend.get(o.id)(o.result || o.error); pend.delete(o.id); }
  if (o.method === 'Runtime.exceptionThrown') logs.push('EXC ' + (o.params.exceptionDetails.exception?.description || o.params.exceptionDetails.text).slice(0, 160));
  if (o.method === 'Runtime.consoleAPICalled' && o.params.type === 'error') logs.push('err ' + o.params.args.map(a => a.value || a.description).join(' ').slice(0, 160)); };
const send = (method, params = {}) => new Promise(r => { pend.set(++id, r); ws.send(JSON.stringify({ id, method, params })); });
const ev = async e => (await send('Runtime.evaluate', { expression: e, awaitPromise: true, returnByValue: true })).result?.value;
await send('Runtime.enable'); await send('Page.enable');
const CHECK = `(async () => {
  // walk the page so scroll-triggered content reaches its final state
  const H = document.documentElement.scrollHeight;
  for (let y = 0; y < H; y += innerHeight * 0.8) { scrollTo(0, y); await new Promise(r => setTimeout(r, 120)); }
  scrollTo(0, 0); await new Promise(r => setTimeout(r, 500));
  const vw = document.documentElement.clientWidth, out = [], seen = new Set();
  const skip = n => n.closest('.proto-switch, .mnav, .mega, [data-sectors], .ex-tabs, .fq-nav, .lap, .lines, .ch-lines, .geo, .ex-m:not(.on), .cells, svg');
  for (const n of document.querySelectorAll('body *')) {
    if (skip(n)) continue; const cs = getComputedStyle(n); if (cs.display === 'none' || cs.visibility === 'hidden' || cs.position === 'fixed') continue;
    const r = n.getBoundingClientRect(); if (!r.width || !r.height) continue;
    const name = n.tagName.toLowerCase() + (n.className && typeof n.className === 'string' ? '.' + n.className.trim().split(/\\s+/).slice(0, 2).join('.') : '');
    if ((r.right > vw + 2 || r.left < -2) && !seen.has('o' + name)) {
      // ignore things clipped by an ancestor on purpose
      let p = n.parentElement, clipped = false; while (p && p !== document.body) { const o = getComputedStyle(p); if (/hidden|clip|auto|scroll/.test(o.overflowX)) { clipped = true; break; } p = p.parentElement; }
      if (!clipped) { seen.add('o' + name); out.push('OUT ' + name + ' [' + Math.round(r.left) + '..' + Math.round(r.right) + ']'); }
    }
    if (n.children.length === 0 && n.textContent.trim() && cs.overflow !== 'hidden' && n.scrollWidth > n.clientWidth + 3 && cs.display !== 'inline' && !seen.has('t' + name)) { seen.add('t' + name); out.push('TEXT ' + name + ' ' + n.scrollWidth + '>' + n.clientWidth); }
  }
  return { sx: document.documentElement.scrollWidth - vw, h: document.documentElement.scrollHeight, out: out.slice(0, 8) };
})()`;
let bad = 0;
for (const p of PAGES) {
  for (const w of WIDTHS) {
    logs = [];
    await send('Emulation.setDeviceMetricsOverride', { width: w, height: w < 700 ? 800 : 900, deviceScaleFactor: 1, mobile: w < 700 });
    const [file, q] = p.split('?');
    await send('Page.navigate', { url: `${base}/${file}.html${q ? '?' + q : ''}` });
    await sleep(3600);
    const r = await ev(CHECK);
    const issues = [...(r.sx > 0 ? ['SCROLL-X ' + r.sx] : []), ...r.out, ...logs];
    if (issues.length) { bad++; console.log(`${p} @${w}: ` + issues.join(' | ')); }
    if (shots && shots.split(',').includes(String(w))) { const s = await send('Page.captureScreenshot', { format: 'jpeg', quality: 70 }); writeFileSync(join(outDir, `${p.replace('?', '_')}-${w}.jpg`), Buffer.from(s.data, 'base64')); }
  }
}
console.log(`checked ${PAGES.length} pages x ${WIDTHS.length} widths; ${bad} with findings`);
ws.close(); edge.kill();
