const responsiveImageAttrs = require('../responsive-images.js');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const ROOT = path.resolve(__dirname, '..');
const BASE_URL = (process.env.SITE_URL || 'https://ilhabelatrip.com').replace(/\/$/, '');
const photoOverrides = JSON.parse(fs.readFileSync(path.join(__dirname, 'attraction-photo-overrides.json'), 'utf8'));

const context = vm.createContext({ console });
for (const file of ['translations.js', 'data.js', 'additional-spots.js', 'attraction-photos.js']) {
  vm.runInContext(fs.readFileSync(path.join(ROOT, file), 'utf8'), context, { filename: file });
}
const spots = vm.runInContext('touristSpots', context);
const translations = vm.runInContext('translations', context);

const esc = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const absolute = value => /^https?:\/\//.test(value) ? value : `${BASE_URL}/${String(value).replace(/^\//, '')}`;

// Status of the 5 pilot attractions:
// All 5 fully validated and indexable:
// praia-do-curral, mirante-do-morro-da-cruz, pico-de-sao-sebastiao, baia-de-castelhanos, praia-do-bonete
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
    validated: true,
    accessEn: 'Standard two-wheel-drive passenger cars cannot reach the beach: road navigation for conventional vehicles ends at the State Park Entrance (-23.8392, -45.3600). The remaining 17 km (10.5 miles) through protected Atlantic Forest requires either an authorized private high-clearance 4x4 vehicle or a guided tour operated by an accredited agency. Park road traffic is subject to scheduled one-way circulation windows (typically inbound in the morning and outbound in the afternoon) and daily vehicle quotas established by the Ilhabela State Park (Fundação Florestal), though operational schedules and limits may change depending on season, maintenance, or park administration. Alternatively, Castelhanos can be accessed by sea via boat or speedboat tours departing from western channel points; boarding locations and departure times vary by operator and must be confirmed directly in advance. Maritime landings take place directly on open-ocean surf and remain strictly dependent on sea conditions. Always check current park access regulations, gate schedules, road conditions, and maritime forecasts prior to traveling.'
  },
  {
    id: 'praia-do-bonete',
    validated: true,
    accessEn: 'There is no road access to Bonete Beach. Public road vehicle navigation ends at Ponta da Sepituba (-23.9362, -45.4273) in southern Ilhabela. From this trailhead, access continues on foot via a demanding 12 km (7.5-mile) trail through the Ilhabela State Park rainforest. This represents an estimated 4 to 5 hours of sustained one-way hiking each way across rugged terrain with three river crossings; actual duration varies with personal pace and trail conditions. Sturdy hiking footwear, insect repellent, adequate water, and an early morning departure are essential. Alternatively, visitors can reach the beach by sea aboard traditional caiçara boats (\'boneteiras\') or licensed speedboats. Boat services do not operate on fixed public timetables, and maritime access is strictly subject to open-sea swell and surf conditions, which can delay or prevent landings and pickups. Both outbound passage and return transportation must always be confirmed directly in advance with your chosen operator.'
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
    : spot.photoCaption && spot.id === 'pico-de-sao-sebastiao'
      ? `<p><small>Photo: <a href="${esc(spot.photoSource)}">${esc(spot.photoCredit)}</a> · <a href="${esc(spot.photoLicenseUrl)}">${esc(spot.photoLicense)}</a> · ${esc(spot.photoAdaptation.en)} · ${esc(spot.photoCaption.en)}</small></p>`
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
<img class="hero" src="/${esc(imagePath)}"${responsiveImageAttrs(imagePath, '(max-width: 860px) calc(100vw - 40px), 820px')}${spot.id === 'pico-de-sao-sebastiao' ? ' style="object-position:center bottom"' : ''} alt="${esc(spot.id === 'pico-de-sao-sebastiao' ? spot.photoCaption.en : tr.title)}">${photoCredit}<p class="sub">${esc(tr.subtitle)}</p><h1>${esc(tr.title)}</h1><p>${esc(tr.description)}</p>
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
  .replace(/src="attraction-photos\.js\?v=([^"]+)"/, 'src="/attraction-photos.js?v=$1"')
  .replace(/src="responsive-images.js"/, 'src="/responsive-images.js"')
  .replace(/src="app\.js\?v=([^"]+)"/, 'src="/app.js?v=$1"')
  .replace(/src="multimodal\.js\?v=([^"]+)"/, 'src="/multimodal.js?v=$1"')
  .replace(/src="planner\.js\?v=([^"]+)"/, 'src="/planner.js?v=$1"')
  .replace(/src="offline-trip\.js\?v=([^"]+)"/, 'src="/offline-trip.js?v=$1"')
  .replace(/src="assets\/images\/mirante-do-coracao_verified\.jpg"/, 'src="/assets/images/mirante-do-coracao_verified.jpg"')
  .replace(/alt="Vista real da Baía de Castelhanos, em Ilhabela"/, `alt="${esc(translations.en.heroImage)}"`)
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

// 4. Generate indexable English discovery hub; remaining category hubs keep noindex
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

const PILOT_SPOT_IDS = new Set(PILOT_SPOTS.map(p => p.id));

function enCard(s) {
  const tr = s.translations?.en || s.translations.pt;
  const href = PILOT_SPOT_IDS.has(s.id) ? `/en/lugares/${esc(s.id)}/` : `/?spot=${encodeURIComponent(s.id)}&amp;lang=en`;
  return `<article><a class="image" href="${href}"><img src="/${esc(s.image)}"${responsiveImageAttrs(s.image, '(max-width: 640px) 100vw, 400px')}${s.id === 'pico-de-sao-sebastiao' ? ' style="object-position:center bottom"' : ''} alt="${esc(s.id === 'pico-de-sao-sebastiao' ? s.photoCaption.en : tr.title)}" loading="lazy"></a>${responsiveImageAttrs.attribution(s, 'en')}<div class="body"><h3><a href="${href}">${esc(tr.title)}</a></h3><p>${esc(tr.subtitle)}</p><div class="actions"><a class="more" data-analytics="view_attraction" href="${href}">View details &amp; access →</a><a class="trip" data-analytics="add_trip" href="/?spot=${encodeURIComponent(s.id)}&amp;add=trip&amp;lang=en">+ My Trip</a></div></div></article>`;
}

const enSections = groups.map(([id, title]) =>
  `<section id="${id}"><div class="section-head"><div><h2>${title}</h2>${id === 'praias' ? '<p><a href="/en/praias/">Explore all beaches →</a></p>' : ''}</div><span>${byCategory[id].length} places</span></div><div class="grid">${byCategory[id].map(enCard).join('')}</div></section>`
).join('\n');

const enJump = groups.map(([id, title]) => `<a href="#${id}">${title} · ${byCategory[id].length}</a>`).join('');

const discoveryHubHtml = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Things to do in Ilhabela | Beaches, waterfalls, trails and more</title><meta name="description" content="Explore ${spots.length} places in Ilhabela by experience type: beaches, waterfalls, trails, peaks, lookouts, diving, marine wildlife, culture and history."><link rel="canonical" href="https://ilhabelatrip.com/en/o-que-fazer/">
<link rel="alternate" hreflang="pt" href="https://ilhabelatrip.com/o-que-fazer/">
<link rel="alternate" hreflang="en" href="https://ilhabelatrip.com/en/o-que-fazer/">
<link rel="alternate" hreflang="x-default" href="https://ilhabelatrip.com/o-que-fazer/"><meta property="og:type" content="website"><meta property="og:locale" content="en_US"><meta property="og:site_name" content="Ilhabela Trip"><meta property="og:title" content="Things to do in Ilhabela"><meta property="og:description" content="Explore beaches, waterfalls, trails, lookouts, diving, marine wildlife, culture and history."><meta property="og:url" content="https://ilhabelatrip.com/en/o-que-fazer/">
<style>body{margin:0;background:#faf7f0;color:#1b1c19;font:16px/1.55 system-ui,-apple-system,sans-serif}header,main,footer{max-width:1120px;margin:auto;padding:20px}header{display:flex;justify-content:space-between;gap:20px;align-items:center}a{color:#003345}header a{text-decoration:none;font-weight:800}.hero{padding:45px 0 24px;max-width:760px}.eyebrow{font-size:12px;text-transform:uppercase;font-weight:850;letter-spacing:.08em;color:#3b6934}h1{font-size:clamp(2.2rem,6vw,4.4rem);line-height:1;margin:.25em 0;color:#003345}h2,h3{color:#003345}.intro{font-size:1.18rem;color:#405057}.jump{display:flex;flex-wrap:wrap;gap:8px;margin:22px 0 48px}.jump a{background:#fff;border:1px solid #ddd8ce;border-radius:999px;padding:8px 13px;text-decoration:none;font-weight:700}.section-head{display:flex;justify-content:space-between;gap:20px;align-items:end;border-bottom:1px solid #ddd8ce;margin:52px 0 18px;padding-bottom:12px}.section-head h2{font-size:1.8rem;margin:0}.section-head p{margin:4px 0 0;color:#52656b}.section-head span{white-space:nowrap;color:#52656b}.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:16px}article{background:#fff;border:1px solid #e1ddd4;border-radius:16px;overflow:hidden}.image{display:block;height:150px;background:#e7e4dc}.image img{width:100%;height:100%;object-fit:cover}.body{padding:15px}.body h3{margin:0 0 5px;font-size:1.08rem}.body h3 a{text-decoration:none}.body p{margin:0 0 12px;color:#52656b;font-size:.92rem}.actions{display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap}.more,.trip{font-weight:800;font-size:.86rem}.trip{text-decoration:none;border:1px solid #b8c8c4;border-radius:999px;padding:5px 9px;background:#f7fbfa}footer{margin-top:55px;color:#52656b;font-size:14px}@media(max-width:600px){header,main,footer{padding:16px}.section-head{align-items:start;flex-direction:column;gap:4px}}</style></head><body><header><a href="/en/">Ilhabela Trip</a><nav><a href="/?view=trip&amp;lang=en">My Trip</a> · <a href="/servicos/">Services</a></nav></header><main><div class="hero"><div class="eyebrow">Explore Ilhabela</div><h1>Things to do in Ilhabela</h1><p class="intro">Explore 50 Ilhabela places by experience: beaches, waterfalls, forest walks, viewpoints, marine wildlife, diving, and culture. This guide does not rank destinations; choose the experiences that suit your visit.</p><p>Access varies by destination: some places require an authorized 4x4, a forest trail, or a boat, and the mapped destination may differ from its access point. Check local conditions and confirm operator arrangements when needed. Open a place for details or select + My Trip to save it to your itinerary.</p></div><nav class="jump" aria-label="Experience types">${enJump}</nav>${enSections}</main><footer>Ilhabela Trip · Discover, choose and add places to My Trip.</footer><script>
window.va=window.va||function(){(window.vaq=window.vaq||[]).push(arguments);};
document.addEventListener('click',function(event){
  const link=event.target.closest('[data-analytics]');
  if(!link||typeof window.va!=='function')return;
  window.va('event',{name:'SEO Entry Action',data:{action:link.dataset.analytics}});
});
</script><script defer src="/_vercel/insights/script.js"></script><script defer src="/bottom-nav.js?v=2"></script></body></html>`;

fs.mkdirSync(path.join(ROOT, 'en', 'o-que-fazer'), { recursive: true });
fs.writeFileSync(path.join(ROOT, 'en', 'o-que-fazer', 'index.html'), discoveryHubHtml);
console.log('Generated /en/o-que-fazer/ [indexable: true]');

// 5. Generate EN Category Hubs (/en/praias/, /en/cachoeiras/, /en/trilhas/)
const catStyle = 'body{margin:0;background:#faf7f0;color:#1b1c19;font:16px/1.55 system-ui,-apple-system,sans-serif}header,main,footer{max-width:1120px;margin:auto;padding:20px}header{display:flex;justify-content:space-between;gap:20px;flex-wrap:wrap}a,h1,h2{color:#003345}header a{text-decoration:none;font-weight:800}h1{font-size:clamp(2rem,6vw,4rem);line-height:1.1}.intro{font-size:1.18rem;color:#405057}.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:16px;margin-top:28px}article{background:#fff;border:1px solid #e1ddd4;border-radius:16px;overflow:hidden}.image{display:block;height:150px}.image img{width:100%;height:100%;object-fit:cover}.body{padding:15px}.body h2{margin:0 0 5px;font-size:1.08rem}.body h2 a{text-decoration:none}.body p{color:#52656b;font-size:.92rem}.actions{display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap}.more,.trip{font-weight:800;font-size:.86rem}.trip{text-decoration:none;border:1px solid #b8c8c4;border-radius:999px;padding:5px 9px;background:#f7fbfa}footer{margin-top:55px;color:#52656b;font-size:14px}';

function enCategoryCard(spot) {
  const tr = spot.translations?.en || spot.translations.pt;
  const href = PILOT_SPOT_IDS.has(spot.id) ? `/en/lugares/${esc(spot.id)}/` : `/?spot=${encodeURIComponent(spot.id)}&amp;lang=en`;
  return `<article data-spot="${esc(spot.id)}"><a class="image" href="${href}"><img src="/${esc(spot.image)}"${responsiveImageAttrs(spot.image, '(max-width: 640px) 100vw, 400px')}${spot.id === 'pico-de-sao-sebastiao' ? ' style="object-position:center bottom"' : ''} alt="${esc(spot.id === 'pico-de-sao-sebastiao' ? spot.photoCaption.en : tr.title)}" loading="lazy"></a>${responsiveImageAttrs.attribution(spot, 'en')}<div class="body"><h2><a href="${href}">${esc(tr.title)}</a></h2><p>${esc(tr.subtitle)}</p><div class="actions"><a class="more" data-analytics="view_attraction" href="${href}">View details &amp; access →</a><a class="trip" data-analytics="add_trip" href="/?spot=${encodeURIComponent(spot.id)}&amp;add=trip&amp;lang=en">+ My Trip</a></div></div></article>`;
}

const enCategoryDefinitions = [
  ['praias', 'Beaches'],
  ['cachoeiras', 'Waterfalls'],
  ['trilhas', 'Trails & Natural Pools']
];

for (const [catId, label] of enCategoryDefinitions) {
  const selected = spots.filter(s => s.category === catId);
  const title = `${label} in Ilhabela | Ilhabela Trip`;
  const description = catId === 'praias' ? 'Explore 23 Ilhabela beaches with road, forest-trail, 4x4 and boat access guidance, photos and trip-planning links.' : `${label} in Ilhabela: ${selected.length} places from the Ilhabela Trip catalog.`;
  const canonical = `${BASE_URL}/en/${catId}/`;
  const categorySeoTags = catId === 'praias'
    ? `<link rel="alternate" hreflang="pt" href="${BASE_URL}/praias/">\n<link rel="alternate" hreflang="en" href="${BASE_URL}/en/praias/">\n<link rel="alternate" hreflang="x-default" href="${BASE_URL}/praias/">`
    : '<meta name="robots" content="noindex, follow">';
  const categoryIntro = catId === 'praias' ? "<p class=\"intro\">Explore 23 Ilhabela beaches, from shores reached by regular roads to remote stretches that may require a forest trail, an authorized 4x4, or a boat. Driving directions do not always lead directly to the sand. Check each beach’s access notes, trail or sea conditions, and operator arrangements before traveling. Open a place for details or select + My Trip to save it to your itinerary.</p>" : '';
  const catHtml = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title><meta name="description" content="${esc(description)}"><link rel="canonical" href="${esc(canonical)}">${categorySeoTags}
<meta property="og:type" content="website"><meta property="og:locale" content="en_US"><meta property="og:site_name" content="Ilhabela Trip"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${esc(canonical)}">
<style>${catStyle}</style></head><body><header><a href="/en/">Ilhabela Trip</a><nav><a href="/en/o-que-fazer/">Explore</a> · <a href="/?view=trip&amp;lang=en">My Trip</a></nav></header><main><h1>${esc(label)} in Ilhabela</h1>${categoryIntro}<div class="grid">${selected.map(enCategoryCard).join('\n')}</div></main><footer>Ilhabela Trip · Discover, choose and add places to My Trip.</footer><script>
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
  console.log(`Generated /en/${catId}/ [indexable: ${catId === 'praias'}, noindex: ${catId !== 'praias'}]`);
}
