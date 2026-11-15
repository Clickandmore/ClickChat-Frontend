/* Direction 3 prototype routing: turns the live site's routes (data-route="/pricing") into links between the prototype files.
   Routes with no prototype page yet (login, register) stay inert. */
(function () {
  var HOME = 'direction-3-signal.html';
  var PAGES = {
    '/': HOME, '/pricing': 'd3-pricing.html', '/industries': 'd3-industries.html', '/use-cases': 'd3-use-cases.html',
    '/integrations': 'd3-integrations.html', '/faq': 'd3-faq.html', '/about': 'd3-about.html', '/contact': 'd3-contact.html',
    '/p/privacy': 'd3-legal-privacy.html', '/p/terms': 'd3-legal-terms.html', '/p/cookies': 'd3-legal-cookies.html'
  };
  function resolve(route) {
    var hash = '', i = route.indexOf('#');
    if (i >= 0) { hash = route.slice(i); route = route.slice(0, i) || '/'; }
    route = route.split('?')[0];
    var m = route.match(/^\/industries\/([a-z-]+)$/);
    var file = m ? 'd3-industry-' + m[1] + '.html' : PAGES[route];
    return file ? file + hash : null;
  }
  var here = (location.pathname.split('/').pop() || HOME);
  function apply(root) {
    (root.querySelectorAll ? root.querySelectorAll('a[data-route]') : []).forEach(function (a) {
      var to = resolve(a.getAttribute('data-route'));
      if (!to) return;
      a.setAttribute('href', to);
      if (to === here && !a.hasAttribute('data-no-current')) a.setAttribute('aria-current', 'page');
    });
  }
  window.d3Routes = { resolve: resolve, apply: apply };
  document.addEventListener('DOMContentLoaded', function () {
    apply(document);
    if ('MutationObserver' in window) new MutationObserver(function (ms) { ms.forEach(function (m) { m.addedNodes.forEach(function (n) { if (n.nodeType === 1) apply(n); }); }); }).observe(document.body, { childList: true, subtree: true });
  });
})();
