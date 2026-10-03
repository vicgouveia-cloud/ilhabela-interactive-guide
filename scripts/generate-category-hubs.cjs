const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ROOT = path.resolve(__dirname, '..');
const BASE = (process.env.SITE_URL || 'https://ilhabelatrip.com').replace(/\/$/, '');
const context = vm.createContext({ console });
for (const file of ['data.js', 'additional-spots.js']) {
  vm.runInContext(fs.readFileSync(path.join(ROOT, file), 'utf8'), context, { filename: file });
}
const spots = vm.runInContext('touristSpots', context);
const esc = value => String(value ?? '').replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
const categories = [
  ['praias', 'Praias', 'Do litoral urbano às praias remotas e preservadas.'],
  ['cachoeiras', 'Cachoeiras', 'Quedas d’água, poços e piscinas naturais.'],
  ['trilhas', 'Trilhas e piscinas naturais', 'Caminhos pela Mata Atlântica e experiências a pé.']
];
const style = 'body{margin:0;background:#faf7f0;color:#1b1c19;font:16px/1.55 system-ui,-apple-system,sans-serif}header,main,footer{max-width:1120px;margin:auto;padding:20px}header{display:flex;justify-content:space-between;gap:20px;flex-wrap:wrap}a,h1,h2{color:#003345}header a{text-decoration:none;font-weight:800}h1{font-size:clamp(2rem,6vw,4rem);line-height:1.1}.intro{font-size:1.18rem;color:#405057}.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:16px;margin-top:28px}article{background:#fff;border:1px solid #e1ddd4;border-radius:16px;overflow:hidden}.image{display:block;height:150px}.image img{width:100%;height:100%;object-fit:cover}.body{padding:15px}.body h2{margin:0 0 5px;font-size:1.08rem}.body h2 a{text-decoration:none}.body p{color:#52656b;font-size:.92rem}.actions{display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap}.more,.trip{font-weight:800;font-size:.86rem}.trip{text-decoration:none;border:1px solid #b8c8c4;border-radius:999px;padding:5px 9px;background:#f7fbfa}footer{margin-top:55px;color:#52656b;font-size:14px}';
function card(spot) {
  const tr = spot.translations.pt;
  return `<article data-spot="${esc(spot.id)}"><a class="image" href="/lugares/${esc(spot.id)}/"><img src="/${esc(spot.image)}" alt="${esc(tr.title)}" loading="lazy"></a><div class="body"><h2><a href="/lugares/${esc(spot.id)}/">${esc(tr.title)}</a></h2><p>${esc(tr.subtitle)}</p><div class="actions"><a class="more" data-analytics="view_attraction" href="/lugares/${esc(spot.id)}/">Ver detalhes e acesso →</a><a class="trip" data-analytics="add_trip" href="/?spot=${encodeURIComponent(spot.id)}&amp;add=trip">+ Minha Viagem</a></div></div></article>`;
}
for (const [category, label, intro] of categories) {
  const selected = spots.filter(spot => spot.category === category);
  const title = `${label} em Ilhabela | Ilhabela Trip`;
  const description = `${label} em Ilhabela: ${selected.length} lugares do catálogo do Ilhabela Trip. ${intro}`;
  const canonical = `${BASE}/${category}/`;
  const html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title><meta name="description" content="${esc(description)}"><link rel="canonical" href="${esc(canonical)}">
<meta property="og:type" content="website"><meta property="og:locale" content="pt_BR"><meta property="og:site_name" content="Ilhabela Trip"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${esc(canonical)}">
<style>${style}</style></head><body><header><a href="/">Ilhabela Trip</a><nav><a href="/o-que-fazer/">Explorar</a> · <a href="/?view=trip">Minha Viagem</a></nav></header><main><h1>${esc(label)} em Ilhabela</h1><p class="intro">${esc(intro)}</p><div class="grid">${selected.map(card).join('\n')}</div></main><footer>Ilhabela Trip · Descubra, escolha e leve seus lugares para Minha Viagem.</footer><script>
window.va=window.va||function(){(window.vaq=window.vaq||[]).push(arguments);};
document.addEventListener('click',function(event){
  const link=event.target.closest('[data-analytics]');
  if(!link||typeof window.va!=='function')return;
  window.va('event',{name:'SEO Entry Action',data:{action:link.dataset.analytics}});
});
</script><script defer src="/_vercel/insights/script.js"></script><script defer src="/bottom-nav.js?v=1"></script></body></html>`;
  fs.mkdirSync(path.join(ROOT, category), { recursive: true });
  fs.writeFileSync(path.join(ROOT, category, 'index.html'), html);
  console.log(`Generated ${category}/: ${selected.length} attractions.`);
}
