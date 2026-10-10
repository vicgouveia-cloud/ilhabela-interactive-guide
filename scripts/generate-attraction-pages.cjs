const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const ROOT = path.resolve(__dirname, '..');
const OUT = path.resolve(process.env.ATTRACTION_OUTPUT_DIR || path.join(ROOT, 'lugares'));
// Editorial preservation is independent of operational gateway verification.
const accessCopies = JSON.parse(fs.readFileSync(path.join(__dirname, 'attraction-access-copy.json'), 'utf8'));
const photoOverrides = JSON.parse(fs.readFileSync(path.join(__dirname, 'attraction-photo-overrides.json'), 'utf8'));
const BASE_URL = process.env.SITE_URL || 'https://ilhabelatrip.com';

const context = vm.createContext({ console });
for (const file of ['data.js', 'additional-spots.js']) {
  vm.runInContext(fs.readFileSync(path.join(ROOT, file), 'utf8'), context, { filename: file });
}
const spots = vm.runInContext('touristSpots', context);

const esc = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const absolute = value => /^https?:\/\//.test(value) ? value : `${BASE_URL}/${String(value).replace(/^\//, '')}`;

function accessCopy(spot) {
  const record = accessCopies[spot.id];
  if (!record?.copy || !record.provenance) {
    throw new Error(`Missing reviewed access copy: ${spot.id}`);
  }
  return record.copy;
}

function render(spot) {
  const tr = spot.translations?.pt;
  if (!tr?.title || !tr.description || !spot.image) throw new Error(`Conteúdo PT incompleto: ${spot.id}`);
  const canonical = `${BASE_URL}/lugares/${spot.id}/`;
  const photo = photoOverrides[spot.id];
  const imagePath = photo?.image || spot.image;
  const image = absolute(imagePath);
  const photoCredit = photo ? `<p><small>Foto: <a href="${esc(photo.source)}" target="_blank" rel="noopener noreferrer">${esc(photo.credit)}</a> · <a href="${esc(photo.licenseUrl)}" target="_blank" rel="noopener noreferrer">${esc(photo.license)}</a> · Imagem redimensionada.</small></p>` : '';
  const description = tr.description.replace(/\s+/g, ' ').trim().slice(0, 220);
  const schema = JSON.stringify({
    '@context':'https://schema.org', '@type':'TouristAttraction', name:tr.title,
    description:tr.description, url:canonical, image:[image],
    geo:{'@type':'GeoCoordinates', latitude:spot.coords?.[0], longitude:spot.coords?.[1]},
    address:{'@type':'PostalAddress', addressLocality:'Ilhabela', addressRegion:'SP', addressCountry:'BR'}
  }).replace(/</g, '\\u003c');
  return `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(tr.title)} em Ilhabela | Ilhabela Trip</title>
<meta name="description" content="${esc(description)}"><link rel="canonical" href="${esc(canonical)}">
<meta property="og:type" content="website"><meta property="og:locale" content="pt_BR"><meta property="og:site_name" content="Ilhabela Trip">
<meta property="og:title" content="${esc(tr.title)} em Ilhabela"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${esc(canonical)}"><meta property="og:image" content="${esc(image)}">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(tr.title)} em Ilhabela"><meta name="twitter:description" content="${esc(description)}"><meta name="twitter:image" content="${esc(image)}">
<script type="application/ld+json">${schema}</script>
<style>body{margin:0;background:#faf7f0;color:#1b1c19;font:17px/1.6 system-ui,-apple-system,sans-serif}header,main,footer{max-width:820px;margin:auto;padding:20px}header{display:flex;justify-content:space-between;align-items:center}a{color:#003345}header a{text-decoration:none;font-weight:800}.hero{width:100%;max-height:470px;object-fit:cover;border-radius:20px}h1,h2{color:#003345;line-height:1.2}.sub{font-size:1.15rem;color:#405057}.card{background:#fff;border:1px solid #ddd8ce;border-radius:18px;padding:18px;margin:20px 0}.cta{display:inline-block;background:#003345;color:#fff;text-decoration:none;font-weight:800;padding:12px 18px;border-radius:14px;margin:4px 6px 4px 0}.cta.secondary{background:#fff;color:#003345;border:2px solid #003345}ul{padding-left:22px}footer{font-size:14px;color:#52656b}</style><link rel="stylesheet" href="/contact.css"></head><body>
<header><a href="/">Ilhabela Trip</a><a href="/o-que-fazer/">Explorar</a></header><main>
<img class="hero" src="/${esc(imagePath)}" alt="${esc(tr.title)}">${photoCredit}<p class="sub">${esc(tr.subtitle)}</p><h1>${esc(tr.title)}</h1><p>${esc(tr.description)}</p>
<section class="card"><h2>Destaques</h2><ul>${(tr.highlights || []).map(item => `<li>${esc(item)}</li>`).join('')}</ul></section>
<section class="card"><h2>Como chegar</h2><p>${esc(accessCopy(spot))}</p></section>
<section class="card"><h2>Planeje esta parada</h2><p>Abra a ficha interativa para ver todos os detalhes ou leve este lugar diretamente para Minha Viagem.</p><a class="cta" data-analytics="open_guide" href="/?spot=${encodeURIComponent(spot.id)}">Abrir no Guia</a> <a class="cta secondary" data-analytics="add_trip" href="/?spot=${encodeURIComponent(spot.id)}&amp;add=trip">Adicionar à Minha Viagem</a></section>
</main><footer>Ilhabela Trip · Informações de planejamento e acesso. Confira condições locais antes do deslocamento.<button type="button" data-contact-entry data-contact-type="attraction" data-contact-id="${esc(spot.id)}" data-contact-name="${esc(tr.title)}">Dúvidas e sugestões</button></footer><script defer src="/contact.js"></script><script>
window.va=window.va||function(){(window.vaq=window.vaq||[]).push(arguments);};
document.addEventListener('click',function(event){
  const link=event.target.closest('[data-analytics]');
  if(!link||typeof window.va!=='function')return;
  window.va('event',{name:'SEO Entry Action',data:{action:link.dataset.analytics}});
});
</script><script defer src="/_vercel/insights/script.js"></script><script defer src="/bottom-nav.js?v=1"></script></body></html>`;
}

// Validate every page before touching output; a new attraction needs reviewed copy.
const pages = spots.map(spot => ({ spot, html: render(spot) }));
fs.mkdirSync(OUT, { recursive: true });
const expected = new Set(spots.map(spot => spot.id));
for (const entry of fs.readdirSync(OUT, { withFileTypes:true })) {
  if (entry.isDirectory() && !expected.has(entry.name)) fs.rmSync(path.join(OUT, entry.name), { recursive:true, force:true });
}
for (const { spot, html } of pages) {
  const dir = path.join(OUT, spot.id);
  fs.mkdirSync(dir, { recursive:true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
}
console.log(`Generated ${spots.length} attraction pages in lugares/.`);
