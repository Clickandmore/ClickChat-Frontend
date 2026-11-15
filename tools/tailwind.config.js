/* Builds assets/d3-tailwind.css for the Direction 3 pages, so they do not load Tailwind from the CDN at runtime.
   Uses the same brand tokens as the browser config (assets/tailwind-config.js).

   Rebuild after changing classes in any Direction 3 page (run from the prototypes folder, with tailwindcss 3.4 installed):
     node tools/build-d3-pages.js
     npx tailwindcss@3.4.1 -c tools/tailwind.config.js -i tools/tailwind.input.css -o assets/d3-tailwind.css --minify */
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..');
const tailwind = {};
new Function('tailwind', fs.readFileSync(path.join(root, 'assets', 'tailwind-config.js'), 'utf8'))(tailwind);
module.exports = Object.assign({}, tailwind.config, {
  content: ['direction-3-signal.html', 'd3-*.html', 'assets/d3-shell.js', 'assets/d3-routes.js', 'assets/icons.js'].map(f => path.join(root, f).replace(/\\/g, '/')),
});
