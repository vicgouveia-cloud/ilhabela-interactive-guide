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
      ['map','/#map-section','Mapa'],
      ['explore','/o-que-fazer/','Explorar'],
      ['services','/servicos/','Serviços'],
      ['trip','/?view=trip','Minha viagem']
    ];
    nav.innerHTML = items.map(([key,href,label]) =>
      `<a href="${href}" class="${active===key?'is-active':''}" ${active===key?'aria-current="page"':''}>${SVG[key]}<span>${label}</span></a>`
    ).join('');
    document.body.appendChild(nav);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})();