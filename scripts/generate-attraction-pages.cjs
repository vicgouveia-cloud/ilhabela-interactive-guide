const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'lugares');
const BASE_URL = process.env.SITE_URL || 'https://ilhabela-guide.vercel.app';

const context = vm.createContext({ console });
for (const file of ['data.js', 'additional-spots.js', 'translations.js', 'multimodal.js']) {
  vm.runInContext(fs.readFileSync(path.join(ROOT, file), 'utf8'), context, { filename: file });
}
const spots = vm.runInContext('touristSpots', context);

const esc = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const absolute = value => /^https?:\/\//.test(value) ? value : `${BASE_URL}/${String(value).replace(/^\//, '')}`;

function accessCopy(spot, tr) {
  const options = spot.routing?.accessOptions || [];
  const verified = options.filter(option => option.gateway?.verified);
  const pendingBoat = options.some(option => option.mode === 'boat' && !option.gateway?.verified);
  const parts = [];
  if (spot.routing?.roadRoutable === true) {
    parts.push(tr.specs?.access || 'Acesso rodoviário informado no catálogo.');
  } else if (verified.length) {
    const unique = new Map(verified.map(option => [option.id, option]));
    for (const option of unique.values()) {
      const sameDestination = option.gateway.coords?.[0] === spot.coords?.[0] && option.gateway.coords?.[1] === spot.coords?.[1];
      if (sameDestination && option.mode === '4x4') {
        parts.push('Com veículo 4x4, a rota pode seguir até o destino.');
      } else {
        const name = option.gateway.name || 'acesso terrestre validado';
        const coords = option.gateway.coords?.join(', ');
        const final = option.finalMode === '4x4' ? '4x4' : option.finalMode === 'trail' ? 'trilha' : 'a pé';
        parts.push(`A navegação terrestre termina em ${name}${coords ? ` (${coords})` : ''}; o trecho final continua ${final}.`);
      }
    }
  } else {
    parts.push(tr.specs?.access || 'Consulte a ficha interativa para confirmar o acesso.');
    if (spot.routing?.specialAccess) parts.push('O ponto da atração não deve ser tratado automaticamente como destino rodoviário.');
  }
  if (pendingBoat) parts.push('Alternativa por barco: o ponto de embarque ainda deve ser confirmado diretamente com o operador.');
  return parts.join(' ');
}

function render(spot) {
  const tr = spot.translations?.pt;
  if (!tr?.title || !tr.description || !spot.image) throw new Error(`Conteúdo PT incompleto: ${spot.id}`);
  const canonical = `${BASE_URL}/lugares/${spot.id}/`;
  const image = absolute(spot.image);
  const description = tr.description.replace(/\s+/g, ' ').trim().slice(0, 220);
  const schema = JSON.stringify({
    '@context':'https://schema.org', '@type':'TouristAttraction', name:tr.title,
    description:tr.description, url:canonical, image:[image],
    geo:{'@type':'GeoCoordinates', latitude:spot.coords?.[0], longitude:spot.coords?.[1]},
    address:{'@type':'PostalAddress', addressLocality:'Ilhabela', addressRegion:'SP', addressCountry:'BR'}
  }).replace(/</g, '\\u003c');
  return `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(tr.title)} em Ilhabela | Guia Ilhabela</title>
<meta name="description" content="${esc(description)}"><link rel="canonical" href="${esc(canonical)}">
<meta property="og:type" content="website"><meta property="og:locale" content="pt_BR"><meta property="og:site_name" content="Guia Ilhabela">
<meta property="og:title" content="${esc(tr.title)} em Ilhabela"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${esc(canonical)}"><meta property="og:image" content="${esc(image)}">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(tr.title)} em Ilhabela"><meta name="twitter:description" content="${esc(description)}"><meta name="twitter:image" content="${esc(image)}">
<script type="application/ld+json">${schema}</script>
<style>body{margin:0;background:#faf7f0;color:#1b1c19;font:17px/1.6 system-ui,-apple-system,sans-serif}header,main,footer{max-width:820px;margin:auto;padding:20px}header{display:flex;justify-content:space-between;align-items:center}a{color:#003345}header a{text-decoration:none;font-weight:800}.hero{width:100%;max-height:470px;object-fit:cover;border-radius:20px}h1,h2{color:#003345;line-height:1.2}.sub{font-size:1.15rem;color:#405057}.card{background:#fff;border:1px solid #ddd8ce;border-radius:18px;padding:18px;margin:20px 0}.cta{display:inline-block;background:#003345;color:#fff;text-decoration:none;font-weight:800;padding:12px 18px;border-radius:14px;margin:4px 6px 4px 0}.cta.secondary{background:#fff;color:#003345;border:2px solid #003345}.note{color:#713400;font-weight:650}ul{padding-left:22px}footer{font-size:14px;color:#52656b}</style></head><body>
<header><a href="/">Ilhabela · Guia Interativo</a><a href="/#explore-section">Explorar</a></header><main>
<img class="hero" src="/${esc(spot.image)}" alt="${esc(tr.title)}"><p class="sub">${esc(tr.subtitle)}</p><h1>${esc(tr.title)}</h1><p>${esc(tr.description)}</p>
<section class="card"><h2>Destaques</h2><ul>${(tr.highlights || []).map(item => `<li>${esc(item)}</li>`).join('')}</ul></section>
<section class="card"><h2>Como chegar</h2><p>${esc(accessCopy(spot, tr))}</p></section>
<section class="card"><h2>Planeje esta parada</h2><p>Abra a ficha interativa para ver todos os detalhes ou leve este lugar diretamente para Minha Viagem.</p><a class="cta" href="/?spot=${encodeURIComponent(spot.id)}">Abrir no Guia</a> <a class="cta secondary" href="/?spot=${encodeURIComponent(spot.id)}&amp;add=trip">Adicionar à Minha Viagem</a></section>
</main><footer>Guia Ilhabela · Informações de planejamento e acesso. Confira condições locais antes do deslocamento.</footer></body></html>`;
}

fs.mkdirSync(OUT, { recursive: true });
const expected = new Set(spots.map(spot => spot.id));
for (const entry of fs.readdirSync(OUT, { withFileTypes:true })) {
  if (entry.isDirectory() && !expected.has(entry.name)) fs.rmSync(path.join(OUT, entry.name), { recursive:true, force:true });
}
for (const spot of spots) {
  const dir = path.join(OUT, spot.id);
  fs.mkdirSync(dir, { recursive:true });
  fs.writeFileSync(path.join(dir, 'index.html'), render(spot));
}
console.log(`Generated ${spots.length} attraction pages in lugares/.`);
