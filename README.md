# ClickChat — Navy Canvas (marketing site prototype)

A static HTML prototype of the ClickChat marketing website in the "Navy Canvas" direction: light and navy surfaces, a laptop-led hero, and scroll-driven product storytelling. Arabic, right-to-left.

This is a design prototype, not production code. The live site is https://clickchat.sa/.

## Open it

Live: https://clickandmore.github.io/ClickChat-Frontend/ (GitHub Pages, served from the root of `main`; every push to `main` updates it).

Locally, no build step and no server are needed. Open `index.html` in a browser.

GSAP is loaded from a CDN, so the animations need an internet connection. Without it the pages still render in their final state.

## Pages

| Page | File |
| --- | --- |
| Home (hero B, the chosen direction) | `index.html` |
| Home with the alternative hero C | `c.html` |
| Solutions | `solutions.html` |
| Use cases | `use-cases.html` |
| Integrations | `integrations.html` |
| Pricing | `pricing.html` |
| FAQ | `faq.html` |
| Contact | `contact.html` |
| Sector and team pages (11) | `industry-<name>.html` |

## How it is put together

- `navy-canvas.css` / `navy-canvas.js`: the home page hero, metrics and channels section.
- `sections.css` / `sections.js`: the other home sections, the elevation (shadow) system, the menus' styles.
- `pages.css` / `pages.js`: the inner pages.
- `menu.js`: the «حلولنا» dropdown and the phone/tablet menu, shared by every page.
- `logos.js`: channel and integration marks.
- `footer.css` / `footer.js`: the site footer on every page (columns, the drawn ClickChat wordmark, Powered by Click & More, back to top).
- `mobile.css` / `mobile.js`: the home page's phone layer (under 768px): short header, swipeable card rails, steps timeline, sticky call-to-action bar.
- `MOTION-STORYBOARD.md`: what each section's animation does.
- `screenshots/`: reference captures.

The inner pages and the 11 sector pages are **generated**. Edit the generator, not the HTML:

```
py tools/build-pages.py              # rebuilds the six menu pages and the eleven sector pages
node tools/fetch-industries.mjs      # re-captures the sector page text from clickchat.sa into tools/data/industries.json
node tools/responsive-audit.mjs <baseUrl> <outDir>   # checks every page at six widths (needs Microsoft Edge)
```

## Content

- Headings and body text are copied from clickchat.sa (captured 14 November 2026). The sector pages' "ClickWhats" is replaced by "ClickChat".
- Product screens, inbox rows, charts and the exchanges over the photos are illustrative demo data.
- Sector photos are mood images, not real customers.
- The contact form only validates; it sends nothing.

## Not built yet

About, legal and sign-in pages; the English version.

## Folder layout

```
*.html, *.css, *.js, img/      the site (repository root)
assets/                        fonts, base styles, icons, sector photos, integration logos
ClickChat-Brand-Identity/      logos (SVG), favicon and patterns from the brand kit
tools/, screenshots/           page generator, audit scripts, reference captures
prototypes/experiments/navy-canvas/   redirects only, so the old long links still open the right page
```
