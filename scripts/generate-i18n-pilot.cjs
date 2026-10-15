const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const ROOT = path.resolve(__dirname, '..');
const BASE_URL = (process.env.SITE_URL || 'https://ilhabelatrip.com').replace(/\/$/, '');
const photoOverrides = JSON.parse(fs.readFileSync(path.join(__dirname, 'attraction-photo-overrides.json'), 'utf8'));

const context = vm.createContext({ console });
for (const file of ['data.js', 'additional-spots.js']) {
  vm.runInContext(fs.readFileSync(path.join(ROOT, file), 'utf8'), context, { filename: file });
}
const spots = vm.runInContext('touristSpots', context);

const esc = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const absolute = value => /^https?:\/\//.test(value) ? value : `${BASE_URL}/${String(value).replace(/^\//, '')}`;

// Status of the 5 pilot attractions:
// Fully validated: praia-do-curral, mirante-do-morro-da-cruz, pico-de-sao-sebastiao
// Pending approved critical access copy translation: baia-de-castelhanos, praia-do-bonete
const PILOT_SPOTS = [
  {
    id: 'praia-do-curral',
    validated: true,
    accessEn: 'Car, city bus or taxi via Av. José Pacheco do Nascimento'
  },
  {
    id: 'mirante-do-morro-da-cruz',
    validated: true,
    accessEn: 'Direct road access'
  },
  {
    id: 'pico-de-sao-sebastiao',
    validated: true,
    accessEn: 'An accredited State Park guide is mandatory'
  },
  {
    id: 'baia-de-castelhanos',
    validated: false,
    pendingReason: 'Detailed 4x4 park entrance handover navigation copy lacks approved English translation.',
    accessEn: 'Accredited 4x4 vehicles through the State Park or boat / speedboat by sea'
  },
  {
    id: 'praia-do-bonete',
    validated: false,
    pendingReason: 'Detailed Sepituba vehicle terminus and trail trailhead navigation copy lacks approved English translation.',
    accessEn: 'Trail from Sepituba or boat / Boneteiro'
  }
];

function renderEnAttractionPage(spot, pilotInfo) {
  const tr = spot.translations?.en;
  if (!tr?.title || !tr.description || !spot.image) {
    throw new Error(`Incomplete EN content: ${spot.id}`);
  }
  const canonical = `${BASE_URL}/en/lugares/${spot.id}/`;
  const ptUrl = `${BASE_URL}/lugares/${spot.id}/`;
  const photo = photoOverrides[spot.id];
  const imagePath = photo?.image || spot.image;
  const image = absolute(imagePath);
  const photoCredit = photo
    ? `<p><small>Photo: <a href="${esc(photo.source)}" target="_blank" rel="noopener noreferrer">${esc(photo.credit)}</a> · <a href="${esc(photo.licenseUrl)}" target="_blank" rel="noopener noreferrer">${esc(photo.license)}</a> · Resized image.</small></p>`
    : '';
  const description = tr.description.replace(/\s+/g, ' ').trim().slice(0, 220);
  const schema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name: tr.title,
    description: tr.description,
    url: canonical,
    image: [image],
    geo: { '@type': 'GeoCoordinates', latitude: spot.coords?.[0], longitude: spot.coords?.[1] },
    address: { '@type': 'PostalAddress', addressLocality: 'Ilhabela', addressRegion: 'SP', addressCountry: 'BR' }
  }).replace(/</g, '\\u003c');

  const robotsTag = pilotInfo.validated
    ? ''
    : '\n<meta name="robots" content="noindex, follow">';

  const hreflangTags = pilotInfo.validated
    ? `\n<link rel="alternate" hreflang="pt" href="${esc(ptUrl)}">` +
      `\n<link rel="alternate" hreflang="en" href="${esc(canonical)}">` +
      `\n<link rel="alternate" hreflang="x-default" href="${esc(ptUrl)}">`
    : '';

  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(tr.title)} in Ilhabela | Ilhabela Trip</title>
<meta name="description" content="${esc(description)}"><link rel="canonical" href="${esc(canonical)}">${robotsTag}${hreflangTags}
<meta property="og:type" content="website"><meta property="og:locale" content="en_US"><meta property="og:site_name" content="Ilhabela Trip">
<meta property="og:title" content="${esc(tr.title)} in Ilhabela"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${esc(canonical)}"><meta property="og:image" content="${esc(image)}">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(tr.title)} in Ilhabela"><meta name="twitter:description" content="${esc(description)}"><meta name="twitter:image" content="${esc(image)}">
<script type="application/ld+json">${schema}</script>
<style>body{margin:0;background:#faf7f0;color:#1b1c19;font:17px/1.6 system-ui,-apple-system,sans-serif}header,main,footer{max-width:820px;margin:auto;padding:20px}header{display:flex;justify-content:space-between;align-items:center}a{color:#003345}header a{text-decoration:none;font-weight:800}.hero{width:100%;max-height:470px;object-fit:cover;border-radius:20px}h1,h2{color:#003345;line-height:1.2}.sub{font-size:1.15rem;color:#405057}.card{background:#fff;border:1px solid #ddd8ce;border-radius:18px;padding:18px;margin:20px 0}.cta{display:inline-block;background:#003345;color:#fff;text-decoration:none;font-weight:800;padding:12px 18px;border-radius:14px;margin:4px 6px 4px 0}.cta.secondary{background:#fff;color:#003345;border:2px solid #003345}ul{padding-left:22px}footer{font-size:14px;color:#52656b}</style><link rel="stylesheet" href="/contact.css"></head><body>
<header><a href="/en/">Ilhabela Trip</a><a href="/en/o-que-fazer/">Explore</a></header><main>
<img class="hero" src="/${esc(imagePath)}" alt="${esc(tr.title)}">${photoCredit}<p class="sub">${esc(tr.subtitle)}</p><h1>${esc(tr.title)}</h1><p>${esc(tr.description)}</p>
<section class="card"><h2>Highlights</h2><ul>${(tr.highlights || []).map(item => `<li>${esc(item)}</li>`).join('')}</ul></section>
<section class="card"><h2>How to get there</h2><p>${esc(pilotInfo.accessEn)}</p></section>
<section class="card"><h2>Plan this stop</h2><p>Open the interactive guide to see all details or add this place directly to My Trip.</p><a class="cta" data-analytics="open_guide" href="/?spot=${encodeURIComponent(spot.id)}&amp;lang=en">Open in Guide</a> <a class="cta secondary" data-analytics="add_trip" href="/?spot=${encodeURIComponent(spot.id)}&amp;add=trip&amp;lang=en">Add to My Trip</a></section>
</main><footer>Ilhabela Trip · Planning and access information. Check local conditions before traveling.<button type="button" data-contact-entry data-contact-type="attraction" data-contact-id="${esc(spot.id)}" data-contact-name="${esc(tr.title)}">Questions &amp; suggestions</button></footer><script defer src="/contact.js"></script><script>
window.va=window.va||function(){(window.vaq=window.vaq||[]).push(arguments);};
document.addEventListener('click',function(event){
  const link=event.target.closest('[data-analytics]');
  if(!link||typeof window.va!=='function')return;
  window.va('event',{name:'SEO Entry Action',data:{action:link.dataset.analytics}});
});
</script><script defer src="/_vercel/insights/script.js"></script><script defer src="/bottom-nav.js?v=2"></script></body></html>`;
}

// 1. Generate EN pilot attraction pages
const enLugaresDir = path.join(ROOT, 'en', 'lugares');
fs.mkdirSync(enLugaresDir, { recursive: true });

for (const pilotInfo of PILOT_SPOTS) {
  const spot = spots.find(s => s.id === pilotInfo.id);
  if (!spot) throw new Error(`Pilot spot not found: ${pilotInfo.id}`);
  const html = renderEnAttractionPage(spot, pilotInfo);
  const spotDir = path.join(enLugaresDir, spot.id);
  fs.mkdirSync(spotDir, { recursive: true });
  fs.writeFileSync(path.join(spotDir, 'index.html'), html);
  console.log(`Generated /en/lugares/${spot.id}/ [indexable: ${pilotInfo.validated}]`);
}

// 2. Generate EN Home (/en/index.html)
const rootIndex = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
let enIndex = rootIndex
  .replace(/<html lang="pt" dir="ltr">/, '<html lang="en" dir="ltr">')
  .replace(/<title data-i18n="pageTitle">[^<]*<\/title>/, '<title data-i18n="pageTitle">Ilhabela Trip • Interactive Tourist Guide</title>')
  .replace(
    /<meta name="description" content="[^"]*" \/>/,
    '<meta name="description" content="Explore 50 places in Ilhabela across beaches, waterfalls, trails, viewpoints, culture and sea experiences, using the interactive map to choose and plan your trip." />'
  )
  .replace(
    /<link rel="canonical" href="https:\/\/ilhabelatrip\.com\/" \/>(?:\s*<link rel="alternate"[^>]+>){0,3}/,
    '<link rel="canonical" href="https://ilhabelatrip.com/en/" />\n  <link rel="alternate" hreflang="pt" href="https://ilhabelatrip.com/" />\n  <link rel="alternate" hreflang="en" href="https://ilhabelatrip.com/en/" />\n  <link rel="alternate" hreflang="x-default" href="https://ilhabelatrip.com/" />'
  )
  .replace(/<meta property="og:locale" content="pt_BR" \/>/, '<meta property="og:locale" content="en_US" />')
  .replace(/<meta property="og:title" content="[^"]*" \/>/, '<meta property="og:title" content="Ilhabela Trip • Discover places and plan your trip" />')
  .replace(/<meta property="og:description" content="[^"]*" \/>/, '<meta property="og:description" content="Explore Ilhabela, choose places you want to visit and organize your trip with maps, access and itineraries." />')
  .replace(/<meta property="og:url" content="https:\/\/ilhabelatrip\.com\/" \/>/, '<meta property="og:url" content="https://ilhabelatrip.com/en/" />')
  .replace(/<meta name="twitter:title" content="[^"]*" \/>/, '<meta name="twitter:title" content="Ilhabela Trip • Discover places and plan your trip" />')
  .replace(/<meta name="twitter:description" content="[^"]*" \/>/, '<meta name="twitter:description" content="Explore Ilhabela, choose places you want to visit and organize your trip with maps, access and itineraries." />')
  .replace(/href="styles\.css\?v=([^"]+)"/, 'href="/styles.css?v=$1"')
  .replace(/src="translations\.js\?v=([^"]+)"/, 'src="/translations.js?v=$1"')
  .replace(/src="data\.js\?v=([^"]+)"/, 'src="/data.js?v=$1"')
  .replace(/src="additional-spots\.js\?v=([^"]+)"/, 'src="/additional-spots.js?v=$1"')
  .replace(/src="app\.js\?v=([^"]+)"/, 'src="/app.js?v=$1"')
  .replace(/src="multimodal\.js\?v=([^"]+)"/, 'src="/multimodal.js?v=$1"')
  .replace(/src="planner\.js\?v=([^"]+)"/, 'src="/planner.js?v=$1"')
  .replace(/src="offline-trip\.js\?v=([^"]+)"/, 'src="/offline-trip.js?v=$1"')
  .replace(/<a href="#hero"/g, '<a href="/en/#hero"')
  .replace(/href="#map-section"/g, 'href="/en/#map-section"')
  .replace(/href="#explore-section"/g, 'href="/en/#explore-section"')
  .replace(/href="#services-section"/g, 'href="/en/#services-section"')
  .replace(/href="#guides-section"/g, 'href="/en/#guides-section"');

const enDir = path.join(ROOT, 'en');
fs.mkdirSync(enDir, { recursive: true });
fs.writeFileSync(path.join(enDir, 'index.html'), enIndex);
console.log('Generated /en/index.html [indexable: true]');

// 3. Update root index.html to add reciprocal hreflang if not already present
if (!rootIndex.includes('hreflang="en"')) {
  const updatedRootIndex = rootIndex.replace(
    /<link rel="canonical" href="https:\/\/ilhabelatrip\.com\/" \/>/,
    '<link rel="canonical" href="https://ilhabelatrip.com/" />\n  <link rel="alternate" hreflang="pt" href="https://ilhabelatrip.com/" />\n  <link rel="alternate" hreflang="en" href="https://ilhabelatrip.com/en/" />\n  <link rel="alternate" hreflang="x-default" href="https://ilhabelatrip.com/" />'
  );
  fs.writeFileSync(path.join(ROOT, 'index.html'), updatedRootIndex);
  console.log('Updated root index.html with reciprocal hreflang tags');
}

// 4. Generate Prepared EN Hubs (marked noindex, follow pending approved editorial copy)
const groups = [
  ['praias', 'Beaches'],
  ['cachoeiras', 'Waterfalls'],
  ['trilhas', 'Trails & Natural Pools'],
  ['picos', 'Peaks'],
  ['mirantes', 'Lookouts'],
  ['mergulho', 'Diving & Shipwrecks'],
  ['baleias', 'Whales & Dolphins'],
  ['cultura', 'Culture & History']
];
const byCategory = Object.fromEntries(groups.map(([id]) => [id, spots.filter(s => s.category === id)]));

function enCard(s) {
  const tr = s.translations?.en || s.translations.pt;
  return `<article><a class="image" href="/en/lugares/${esc(s.id)}/"><img src="/${esc(s.image)}" alt="${esc(tr.title)}" loading="lazy"></a><div class="body"><h3><a href="/en/lugares/${esc(s.id)}/">${esc(tr.title)}</a></h3><p>${esc(tr.subtitle)}</p><div class="actions"><a class="more" data-analytics="view_attraction" href="/en/lugares/${esc(s.id)}/">View details &amp; access →</a><a class="trip" data-analytics="add_trip" href="/?spot=${encodeURIComponent(s.id)}&amp;add=trip&amp;lang=en">+ My Trip</a></div></div></article>`;
}

const enSections = groups.map(([id, title]) =>
  `<section id="${id}"><div class="section-head"><div><h2>${title}</h2></div><span>${byCategory[id].length} places</span></div><div class="grid">${byCategory[id].map(enCard).join('')}</div></section>`
).join('\n');

const enJump = groups.map(([id, title]) => `<a href="#${id}">${title} · ${byCategory[id].length}</a>`).join('');

const discoveryHubHtml = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Things to do in Ilhabela | Beaches, waterfalls, trails and more</title><meta name="description" content="Explore ${spots.length} places in Ilhabela by experience type: beaches, waterfalls, trails, peaks, lookouts, diving, marine wildlife, culture and history."><link rel="canonical" href="https://ilhabelatrip.com/en/o-que-fazer/"><meta name="robots" content="noindex, follow"><meta property="og:type" content="website"><meta property="og:locale" content="en_US"><meta property="og:site_name" content="Ilhabela Trip"><meta property="og:title" content="Things to do in Ilhabela"><meta property="og:description" content="Explore beaches, waterfalls, trails, lookouts, diving, marine wildlife, culture and history."><meta property="og:url" content="https://ilhabelatrip.com/en/o-que-fazer/">
<style>body{margin:0;background:#faf7f0;color:#1b1c19;font:16px/1.55 system-ui,-apple-system,sans-serif}header,main,footer{max-width:1120px;margin:auto;padding:20px}header{display:flex;justify-content:space-between;gap:20px;align-items:center}a{color:#003345}header a{text-decoration:none;font-weight:800}.hero{padding:45px 0 24px;max-width:760px}.eyebrow{font-size:12px;text-transform:uppercase;font-weight:850;letter-spacing:.08em;color:#3b6934}h1{font-size:clamp(2.2rem,6vw,4.4rem);line-height:1;margin:.25em 0;color:#003345}h2,h3{color:#003345}.intro{font-size:1.18rem;color:#405057}.jump{display:flex;flex-wrap:wrap;gap:8px;margin:22px 0 48px}.jump a{background:#fff;border:1px solid #ddd8ce;border-radius:999px;padding:8px 13px;text-decoration:none;font-weight:700}.section-head{display:flex;justify-content:space-between;gap:20px;align-items:end;border-bottom:1px solid #ddd8ce;margin:52px 0 18px;padding-bottom:12px}.section-head h2{font-size:1.8rem;margin:0}.section-head p{margin:4px 0 0;color:#52656b}.section-head span{white-space:nowrap;color:#52656b}.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:16px}article{background:#fff;border:1px solid #e1ddd4;border-radius:16px;overflow:hidden}.image{display:block;height:150px;background:#e7e4dc}.image img{width:100%;height:100%;object-fit:cover}.body{padding:15px}.body h3{margin:0 0 5px;font-size:1.08rem}.body h3 a{text-decoration:none}.body p{margin:0 0 12px;color:#52656b;font-size:.92rem}.actions{display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap}.more,.trip{font-weight:800;font-size:.86rem}.trip{text-decoration:none;border:1px solid #b8c8c4;border-radius:999px;padding:5px 9px;background:#f7fbfa}footer{margin-top:55px;color:#52656b;font-size:14px}@media(max-width:600px){header,main,footer{padding:16px}.section-head{align-items:start;flex-direction:column;gap:4px}}</style></head><body><header><a href="/en/">Ilhabela Trip</a><nav><a href="/?view=trip&amp;lang=en">My Trip</a> · <a href="/servicos/">Services</a></nav></header><main><div class="hero"><div class="eyebrow">Explore Ilhabela</div><h1>Things to do in Ilhabela</h1><p class="intro">Find places by the type of experience you are looking for. This page organizes the Ilhabela Trip catalog without picking a "best": open each destination to learn about its highlights and how to get there.</p></div><nav class="jump" aria-label="Experience types">${enJump}</nav>${enSections}</main><footer>Ilhabela Trip · Discover, choose and add places to My Trip.</footer><script>
window.va=window.va||function(){(window.vaq=window.vaq||[]).push(arguments);};
document.addEventListener('click',function(event){
  const link=event.target.closest('[data-analytics]');
  if(!link||typeof window.va!=='function')return;
  window.va('event',{name:'SEO Entry Action',data:{action:link.dataset.analytics}});
});
</script><script defer src="/_vercel/insights/script.js"></script><script defer src="/bottom-nav.js?v=2"></script></body></html>`;

fs.mkdirSync(path.join(ROOT, 'en', 'o-que-fazer'), { recursive: true });
fs.writeFileSync(path.join(ROOT, 'en', 'o-que-fazer', 'index.html'), discoveryHubHtml);
console.log('Generated /en/o-que-fazer/ [indexable: false, noindex: true]');

// 5. Generate EN Category Hubs (/en/praias/, /en/cachoeiras/, /en/trilhas/)
const catStyle = 'body{margin:0;background:#faf7f0;color:#1b1c19;font:16px/1.55 system-ui,-apple-system,sans-serif}header,main,footer{max-width:1120px;margin:auto;padding:20px}header{display:flex;justify-content:space-between;gap:20px;flex-wrap:wrap}a,h1,h2{color:#003345}header a{text-decoration:none;font-weight:800}h1{font-size:clamp(2rem,6vw,4rem);line-height:1.1}.intro{font-size:1.18rem;color:#405057}.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:16px;margin-top:28px}article{background:#fff;border:1px solid #e1ddd4;border-radius:16px;overflow:hidden}.image{display:block;height:150px}.image img{width:100%;height:100%;object-fit:cover}.body{padding:15px}.body h2{margin:0 0 5px;font-size:1.08rem}.body h2 a{text-decoration:none}.body p{color:#52656b;font-size:.92rem}.actions{display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap}.more,.trip{font-weight:800;font-size:.86rem}.trip{text-decoration:none;border:1px solid #b8c8c4;border-radius:999px;padding:5px 9px;background:#f7fbfa}footer{margin-top:55px;color:#52656b;font-size:14px}';

function enCategoryCard(spot) {
  const tr = spot.translations?.en || spot.translations.pt;
  return `<article data-spot="${esc(spot.id)}"><a class="image" href="/en/lugares/${esc(spot.id)}/"><img src="/${esc(spot.image)}" alt="${esc(tr.title)}" loading="lazy"></a><div class="body"><h2><a href="/en/lugares/${esc(spot.id)}/">${esc(tr.title)}</a></h2><p>${esc(tr.subtitle)}</p><div class="actions"><a class="more" data-analytics="view_attraction" href="/en/lugares/${esc(spot.id)}/">View details &amp; access →</a><a class="trip" data-analytics="add_trip" href="/?spot=${encodeURIComponent(spot.id)}&amp;add=trip&amp;lang=en">+ My Trip</a></div></div></article>`;
}

const enCategoryDefinitions = [
  ['praias', 'Beaches'],
  ['cachoeiras', 'Waterfalls'],
  ['trilhas', 'Trails & Natural Pools']
];

for (const [catId, label] of enCategoryDefinitions) {
  const selected = spots.filter(s => s.category === catId);
  const title = `${label} in Ilhabela | Ilhabela Trip`;
  const description = `${label} in Ilhabela: ${selected.length} places from the Ilhabela Trip catalog.`;
  const canonical = `${BASE_URL}/en/${catId}/`;
  const catHtml = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title><meta name="description" content="${esc(description)}"><link rel="canonical" href="${esc(canonical)}"><meta name="robots" content="noindex, follow">
<meta property="og:type" content="website"><meta property="og:locale" content="en_US"><meta property="og:site_name" content="Ilhabela Trip"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${esc(canonical)}">
<style>${catStyle}</style></head><body><header><a href="/en/">Ilhabela Trip</a><nav><a href="/en/o-que-fazer/">Explore</a> · <a href="/?view=trip&amp;lang=en">My Trip</a></nav></header><main><h1>${esc(label)} in Ilhabela</h1><div class="grid">${selected.map(enCategoryCard).join('\n')}</div></main><footer>Ilhabela Trip · Discover, choose and add places to My Trip.</footer><script>
window.va=window.va||function(){(window.vaq=window.vaq||[]).push(arguments);};
document.addEventListener('click',function(event){
  const link=event.target.closest('[data-analytics]');
  if(!link||typeof window.va!=='function')return;
  window.va('event',{name:'SEO Entry Action',data:{action:link.dataset.analytics}});
});
</script><script defer src="/_vercel/insights/script.js"></script><script defer src="/bottom-nav.js?v=2"></script></body></html>`;

  const catDir = path.join(ROOT, 'en', catId);
  fs.mkdirSync(catDir, { recursive: true });
  fs.writeFileSync(path.join(catDir, 'index.html'), catHtml);
  console.log(`Generated /en/${catId}/ [indexable: false, noindex: true]`);
}
