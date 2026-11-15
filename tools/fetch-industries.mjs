// Captures the public sector pages of clickchat.sa into tools/data/industries.json (page props only).
// Run:  node tools/fetch-industries.mjs      Reads public pages; sends nothing but a plain GET.
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const SLUGS = ['restaurants', 'clinics', 'real-estate', 'ecommerce', 'car-showrooms', 'salons', 'education', 'recruitment', 'sales', 'customer-service', 'operations'];
const decode = s => s.replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
const out = {};
for (const slug of SLUGS) {
  const res = await fetch('https://clickchat.sa/industries/' + slug, { headers: { 'Accept-Language': 'ar', 'User-Agent': 'Mozilla/5.0 (prototype content capture)' } });
  const html = await res.text();
  const m = html.match(/data-page="([^"]+)"/);
  if (!m) { console.log(slug, 'no data-page', res.status); continue; }
  const page = JSON.parse(decode(m[1]));
  out[slug] = page.props.industry;        // the page's own content only; nothing else from the response is kept
  console.log(slug, res.status, page.component);
}
mkdirSync(join(here, 'data'), { recursive: true });
writeFileSync(join(here, 'data', 'industries.json'), JSON.stringify(out, null, 1));
