(() => {
  const SVG = {
    map: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6.5 9 4l6 2.5L21 4v13.5L15 20l-6-2.5L3 20V6.5Zm6-.4v9.2l6 2.5V8.6L9 6.1Z" fill="currentColor"/></svg>',
    explore: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m14.7 9.3-2 5.4-5.4 2 2-5.4 5.4-2ZM12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 2a8 8 0 1 1 0 16 8 8 0 0 1 0-16Z" fill="currentColor"/></svg>',
    services: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v3H4V5Zm1 5h14v9H5v-9Zm3 2v5h3v-5H8Z" fill="currentColor"/></svg>',
    trip: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm12 10a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM8.8 7h4.7a3.5 3.5 0 0 1 0 7H11v-2h2.5a1.5 1.5 0 0 0 0-3H8.8V7Z" fill="currentColor"/></svg>'
  };

  function activeKey() {
    const path = location.pathname.replace(/\/+$/, '') || '/';
    const params = new URLSearchParams(location.search);
    if (params.get('view') === 'trip') return 'trip';
    if (path === '/servicos') return 'services';
    if (path === '/') return 'map';
    return 'explore';
  }

  function mount() {
    const old = document.getElementById('bottom-nav');
    if (old) old.remove();

    if (!document.getElementById('shared-bottom-nav-style')) {
      const style = document.createElement('style');
      style.id = 'shared-bottom-nav-style';
      style.textContent = `
        .shared-bottom-nav{display:none}
        @media(max-width:767px){
          body{padding-bottom:calc(72px + env(safe-area-inset-bottom,0px))!important}
          .shared-bottom-nav{position:fixed;left:0;right:0;bottom:0;z-index:1100;height:calc(64px + env(safe-area-inset-bottom,0px));padding:5px 7px env(safe-area-inset-bottom,0px);display:grid;grid-template-columns:repeat(4,1fr);align-items:center;background:rgba(251,249,244,.97);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);border-top:1px solid rgba(0,0,0,.09);box-shadow:0 -4px 20px rgba(0,51,69,.1)}
          .shared-bottom-nav a{min-width:0;height:52px;border-radius:12px;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:2px;color:#526066;text-decoration:none;font:700 10px/1 system-ui,-apple-system,sans-serif}
          .shared-bottom-nav a svg{width:22px;height:22px}
          .shared-bottom-nav a.is-active{color:#003345;background:rgba(0,51,69,.08)}
          .shared-bottom-nav a:focus-visible{outline:3px solid rgba(0,75,99,.28);outline-offset:-2px}
        }`;
      document.head.appendChild(style);
    }

    const active = activeKey();
    const nav = document.createElement('nav');
    nav.id = 'bottom-nav';
    nav.className = 'shared-bottom-nav';
    nav.setAttribute('aria-label', 'Navegação principal');
    const items = [
      ['map','/#map-section','navMapShort'],
      ['explore','/o-que-fazer/','navExplore'],
      ['services','/servicos/','navServices'],
      ['trip','/?view=trip','navTrip']
    ];
    nav.innerHTML = items.map(([key,href,labelKey]) =>
      `<a href="${href}" class="${active===key?'is-active':''}" ${active===key?'aria-current="page"':''}>${SVG[key]}<span data-i18n="${labelKey}"></span></a>`
    ).join('');
    document.body.appendChild(nav);
    // Pages without the full app still share the same five navigation labels.
    const labels = {
      pt: ['Mapa', 'Explorar', 'Serviços', 'Minha viagem', 'Navegação principal'],
      en: ['Map', 'Explore', 'Services', 'My trip', 'Main navigation'],
      es: ['Mapa', 'Explorar', 'Servicios', 'Mi viaje', 'Navegación principal'],
      fr: ['Carte', 'Explorer', 'Services', 'Mon voyage', 'Navigation principale'],
      he: ['מפה', 'סיור', 'שירותים', 'הטיול שלי', 'ניווט ראשי']
    };
    function sync() {
      let lang = document.documentElement.lang;
      try { lang = localStorage.getItem('ilhabela_lang') || lang; } catch { /* Use document language. */ }
      const copy = labels[lang] || labels.pt;
      nav.querySelectorAll('[data-i18n]').forEach((el, index) => {
        el.textContent = typeof t === 'function' ? t(el.dataset.i18n) : copy[index];
      });
      nav.setAttribute('aria-label', typeof t === 'function' ? t('mainNavigation') : copy[4]);
      const selected = document.body.classList.contains('planner-open') ? 'trip' : activeKey();
      nav.querySelectorAll('a').forEach((link, index) => {
        const selectedLink = items[index][0] === selected;
        link.classList.toggle('is-active', selectedLink);
        if (selectedLink) link.setAttribute('aria-current', 'page');
        else link.removeAttribute('aria-current');
      });
    }
    // Keep the existing URLs for other pages; on home these actions preserve
    // the current in-memory trip and close the overlay without reloading.
    nav.addEventListener('click', event => {
      const link = event.target.closest('a');
      if (!link || !nav.contains(link) || location.pathname !== '/' || typeof openPlannerSummary !== 'function') return;
      if (link.getAttribute('href') === '/?view=trip') {
        event.preventDefault(); openPlannerSummary(); sync();
      } else if (link.getAttribute('href') === '/#map-section') {
        event.preventDefault(); closePlanner(); setViewMode('map'); sync();
      }
    });
    window.addEventListener('guide-language-change', sync);
    window.addEventListener('planner-visibility-change', sync);
    sync();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})();