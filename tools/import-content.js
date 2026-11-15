/* One-off import: keeps only the page content from saved clickchat.sa page data (Inertia "data-page" JSON)
   and writes it to tools/content/. Usage: node tools/import-content.js <folder with *.json> */
const fs = require('fs'), path = require('path');
const src = process.argv[2], out = path.join(__dirname, 'content');
fs.mkdirSync(out, { recursive: true });
for (const f of fs.readdirSync(src).filter(f => f.endsWith('.json'))) {
  const p = JSON.parse(fs.readFileSync(path.join(src, f), 'utf8')).props, keep = {};
  for (const k of ['page', 'plans', 'industry', 'industries']) if (p[k]) keep[k] = p[k];
  fs.writeFileSync(path.join(out, f), JSON.stringify(keep, null, 1));
  console.log(f, Object.keys(keep).join(','));
}
