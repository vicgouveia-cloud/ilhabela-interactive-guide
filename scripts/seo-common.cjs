const BASE = 'https://ilhabelatrip.com';
const languages = ['pt', 'en', 'es', 'fr', 'he'];
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const localized = (lang, pathname) => (lang === 'pt' ? '' : '/' + lang) + pathname;
function alternates(pathname) {
  return [...languages.map(lang => `<link rel="alternate" hreflang="${lang}" href="${BASE}${localized(lang, pathname)}">`), `<link rel="alternate" hreflang="x-default" href="${BASE}${pathname}">`].join('\n');
}
function metadata(html, pathname) {
  // Only metadata is changed on the already reviewed Portuguese pages.
  return html.replace(/\s*<link\b[^>]*rel="alternate"[^>]*>/g, '')
    .replace(/(<link\b[^>]*rel="canonical"[^>]*>)/, '$1\n' + alternates(pathname));
}
const json = value => JSON.stringify(value).replace(/</g, '\\u003c');
function breadcrumb(lang, pathname, title, explore) {
  return {'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[
    {'@type':'ListItem',position:1,name:'Ilhabela Trip',item:BASE + localized(lang,'/')},
    {'@type':'ListItem',position:2,name:explore,item:BASE + localized(lang,'/o-que-fazer/')},
    {'@type':'ListItem',position:3,name:title,item:BASE + localized(lang,pathname)}
  ]};
}
module.exports = {BASE,languages,esc,localized,alternates,metadata,json,breadcrumb};
