const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const parse5 = require('parse5');

const ROOT = path.resolve(__dirname, '..');
const BASE_URL = 'https://ilhabelatrip.com';

// Load catalog data
const context = vm.createContext({ console });
for (const file of ['translations.js', 'data.js', 'additional-spots.js', 'attraction-photos.js']) {
  vm.runInContext(fs.readFileSync(path.join(ROOT, file), 'utf8'), context, { filename: file });
}
const spots = vm.runInContext('touristSpots', context);
const translations = vm.runInContext('translations', context);
const photoOverrides = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts', 'attraction-photo-overrides.json'), 'utf8'));

// Helper to extract text and attributes
function findTag(node, tagName, filterFn = () => true) {
  if (node.nodeName === tagName && filterFn(node)) return node;
  for (const child of node.childNodes || []) {
    const found = findTag(child, tagName, filterFn);
    if (found) return found;
  }
  return null;
}

function findAllTags(node, tagName, filterFn = () => true) {
  const results = [];
  function walk(n) {
    if (n.nodeName === tagName && filterFn(n)) results.push(n);
    for (const child of n.childNodes || []) walk(child);
  }
  walk(node);
  return results;
}

function getAttr(node, name) {
  return node?.attrs?.find(a => a.name === name)?.value;
}

console.log('=== AUDIT SEO-I18N-01: INTERNATIONAL FOUNDATION & EN PILOT ===\n');

// -------------------------------------------------------------
// 1. Preservação estrita das 58 URLs canônicas em português
// -------------------------------------------------------------
console.log('Checking strict preservation of 58 canonical Portuguese URLs...');
const ptFixedUrls = [
  '/',
  '/o-que-fazer/',
  '/servicos/',
  '/praias/',
  '/cachoeiras/',
  '/trilhas/',
  '/roteiros/3-dias/',
  '/roteiros/2-dias/'
];

assert.equal(spots.length, 50, 'Catalog must contain 50 attractions');
const ptAttractionUrls = spots.map(s => `/lugares/${s.id}/`);
const all58PtUrls = [...ptFixedUrls, ...ptAttractionUrls];
assert.equal(all58PtUrls.length, 58, 'There must be exactly 58 Portuguese canonical URLs');

for (const relUrl of all58PtUrls) {
  const filePath = relUrl === '/' ? path.join(ROOT, 'index.html') : path.join(ROOT, relUrl.replace(/^\//, ''), 'index.html');
  assert(fs.existsSync(filePath), `PT canonical file missing: ${filePath}`);
  const html = fs.readFileSync(filePath, 'utf8');
  const expectedCanonical = `${BASE_URL}${relUrl}`;
  const canonicalMatch = html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/);
  assert(canonicalMatch, `Missing canonical in ${relUrl}`);
  assert.equal(canonicalMatch[1], expectedCanonical, `Canonical mismatch in ${relUrl}: expected ${expectedCanonical}, got ${canonicalMatch[1]}`);
}
console.log('✓ All 58 PT canonical URLs preserved with self-referencing canonicals.\n');

// -------------------------------------------------------------
// 2. Canonical e Metadados das Páginas Piloto EN
// -------------------------------------------------------------
const validatedEnSpots = [
  'praia-do-curral',
  'mirante-do-morro-da-cruz',
  'pico-de-sao-sebastiao',
  'baia-de-castelhanos',
  'praia-do-bonete'
];
const preparedNoindexSpots = [];
const validatedHubs = ['/en/o-que-fazer/', '/en/praias/'];
const preparedHubs = ['/en/cachoeiras/', '/en/trilhas/'];

// Exactly 8 indexable English URLs (1 home + 5 attractions + 2 hubs)
const EXACT_8_INDEXABLE_EN_URLS = [
  `${BASE_URL}/en/`,
  `${BASE_URL}/en/lugares/praia-do-curral/`,
  `${BASE_URL}/en/lugares/mirante-do-morro-da-cruz/`,
  `${BASE_URL}/en/lugares/pico-de-sao-sebastiao/`,
  `${BASE_URL}/en/lugares/baia-de-castelhanos/`,
  `${BASE_URL}/en/lugares/praia-do-bonete/`,
  `${BASE_URL}/en/o-que-fazer/`,
  `${BASE_URL}/en/praias/`
];

// Home EN
const enHomeHtml = fs.readFileSync(path.join(ROOT, 'en', 'index.html'), 'utf8');
assert(enHomeHtml.includes('<html lang="en"'), '/en/ must have lang="en"');
assert(enHomeHtml.includes('<link rel="canonical" href="https://ilhabelatrip.com/en/" />'), '/en/ must have self canonical');
assert(enHomeHtml.includes('<meta property="og:locale" content="en_US" />'), '/en/ must have og:locale="en_US"');

// Hero asset path and alt text verification (SEO-PR-02C)
assert(enHomeHtml.includes('src="/assets/images/mirante-do-coracao_verified.jpg"'), 'Home EN hero image must have absolute path starting with /');
assert(!enHomeHtml.includes('src="assets/images/mirante-do-coracao_verified.jpg"'), 'Home EN hero image must not have relative path without leading /');
assert(enHomeHtml.includes(`alt="${translations.en.heroImage}"`), 'Home EN hero image must use approved English alt text from translations.js');
assert(!enHomeHtml.includes('alt="Vista real da Baía de Castelhanos, em Ilhabela"'), 'Home EN hero image must not retain Portuguese alt text');

// EN attraction pages
for (const id of [...validatedEnSpots, ...preparedNoindexSpots]) {
  const enPagePath = path.join(ROOT, 'en', 'lugares', id, 'index.html');
  assert(fs.existsSync(enPagePath), `Missing EN attraction page: ${enPagePath}`);
  const html = fs.readFileSync(enPagePath, 'utf8');
  assert(html.includes('<html lang="en">'), `/en/lugares/${id}/ must have lang="en"`);
  assert(html.includes(`<link rel="canonical" href="https://ilhabelatrip.com/en/lugares/${id}/">`), `/en/lugares/${id}/ canonical self-reference`);
  assert(html.includes('<meta property="og:locale" content="en_US">'), `/en/lugares/${id}/ og:locale="en_US"`);
}

// Unvalidated hubs remain noindex
for (const hub of preparedHubs) {
  const hubPath = path.join(ROOT, hub.replace(/^\//, ''), 'index.html');
  assert(fs.existsSync(hubPath), `Missing hub page: ${hubPath}`);
  const html = fs.readFileSync(hubPath, 'utf8');
  assert(html.includes('<html lang="en">'), `${hub} must have lang="en"`);
  assert(html.includes(`<link rel="canonical" href="https://ilhabelatrip.com${hub}">`), `${hub} self canonical`);
  assert(html.includes('<meta name="robots" content="noindex, follow">'), `${hub} must be noindex, follow`);
}


for (const hub of validatedHubs) {
  const slug = hub.split('/')[2];
  const ptUrl = `${BASE_URL}/${slug}/`;
  const enUrl = `${BASE_URL}${hub}`;
  const ptHtml = fs.readFileSync(path.join(ROOT, slug, 'index.html'), 'utf8');
  const enHtml = fs.readFileSync(path.join(ROOT, 'en', slug, 'index.html'), 'utf8');
  assert(enHtml.includes('<html lang="en">'), `${hub}: English language missing`);
  assert(enHtml.includes(`<link rel="canonical" href="${enUrl}">`), `${hub}: self canonical missing`);
  assert(!enHtml.includes('name="robots" content="noindex'), `${hub}: indexable hub must not be noindex`);
  for (const html of [ptHtml, enHtml]) {
    for (const [lang, url] of [['pt', ptUrl], ['en', enUrl], ['x-default', ptUrl]]) {
      assert(html.includes(`<link rel="alternate" hreflang="${lang}" href="${url}">`), `${hub}: missing reciprocal ${lang} hreflang`);
    }
  }
}
assert(fs.readFileSync(path.join(ROOT, 'en/o-que-fazer/index.html'), 'utf8').includes('href="/en/praias/"'), 'Discovery hub must link to the beach hub');

// Guard all EN HTML files against relative asset paths without leading slash
const allEnHtmlFiles = [
  'en/index.html',
  ...[...validatedHubs, ...preparedHubs].map(h => path.join(h.replace(/^\//, ''), 'index.html'))
  ...[...validatedEnSpots, ...preparedNoindexSpots].map(id => path.join('en', 'lugares', id, 'index.html'))
];
for (const relFile of allEnHtmlFiles) {
  const fileContent = fs.readFileSync(path.join(ROOT, relFile), 'utf8');
  assert(!/(?:src|href)="assets\//.test(fileContent), `${relFile} must not contain relative asset paths "assets/" without leading slash`);
  assert(!/(?:src|href)="styles\.css/.test(fileContent), `${relFile} must not contain relative "styles.css" without leading slash`);
}
console.log('✓ Self-referencing canonicals and language attributes verified.\n');

// -------------------------------------------------------------
// 3. Hreflang recíproco e consistente entre as versões elegíveis & x-default
// -------------------------------------------------------------
console.log('Checking reciprocal hreflang and x-default...');
const rootHtml = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

// Root home hreflang
assert(rootHtml.includes('<link rel="alternate" hreflang="pt" href="https://ilhabelatrip.com/" />'), 'Root missing pt hreflang');
assert(rootHtml.includes('<link rel="alternate" hreflang="en" href="https://ilhabelatrip.com/en/" />'), 'Root missing en hreflang');
assert(rootHtml.includes('<link rel="alternate" hreflang="x-default" href="https://ilhabelatrip.com/" />'), 'Root missing x-default hreflang');

// EN home hreflang
assert(enHomeHtml.includes('<link rel="alternate" hreflang="pt" href="https://ilhabelatrip.com/" />'), 'EN home missing pt hreflang');
assert(enHomeHtml.includes('<link rel="alternate" hreflang="en" href="https://ilhabelatrip.com/en/" />'), 'EN home missing en hreflang');
assert(enHomeHtml.includes('<link rel="alternate" hreflang="x-default" href="https://ilhabelatrip.com/" />'), 'EN home missing x-default hreflang');

// Validated EN spots must have reciprocal hreflang with PT counterpart and x-default pointing to PT
for (const id of validatedEnSpots) {
  const enHtml = fs.readFileSync(path.join(ROOT, 'en', 'lugares', id, 'index.html'), 'utf8');
  assert(enHtml.includes(`<link rel="alternate" hreflang="pt" href="https://ilhabelatrip.com/lugares/${id}/">`), `${id} EN missing pt hreflang`);
  assert(enHtml.includes(`<link rel="alternate" hreflang="en" href="https://ilhabelatrip.com/en/lugares/${id}/">`), `${id} EN missing en hreflang`);
  assert(enHtml.includes(`<link rel="alternate" hreflang="x-default" href="https://ilhabelatrip.com/lugares/${id}/">`), `${id} EN missing x-default hreflang`);
  assert(!enHtml.includes('noindex'), `${id} validated EN page must not have noindex`);

  // Reciprocal HTML alternate tags on Portuguese counterpart
  const ptHtml = fs.readFileSync(path.join(ROOT, 'lugares', id, 'index.html'), 'utf8');
  assert(ptHtml.includes(`<link rel="alternate" hreflang="pt" href="https://ilhabelatrip.com/lugares/${id}/">`), `${id} PT missing reciprocal pt hreflang`);
  assert(ptHtml.includes(`<link rel="alternate" hreflang="en" href="https://ilhabelatrip.com/en/lugares/${id}/">`), `${id} PT missing reciprocal en hreflang`);
  assert(ptHtml.includes(`<link rel="alternate" hreflang="x-default" href="https://ilhabelatrip.com/lugares/${id}/">`), `${id} PT missing reciprocal x-default hreflang`);
}

// Non-validated Portuguese attractions must NOT have hreflang tags in HTML
const validatedEnSpotSet = new Set(validatedEnSpots);
for (const spot of spots) {
  if (!validatedEnSpotSet.has(spot.id)) {
    const ptHtml = fs.readFileSync(path.join(ROOT, 'lugares', spot.id, 'index.html'), 'utf8');
    assert(!ptHtml.includes('hreflang='), `Non-pilot PT page ${spot.id} must not contain hreflang tags in HTML`);
  }
}

// Prepared / unvalidated spots must NOT have hreflang tags linking to noindex
for (const id of preparedNoindexSpots) {
  const enHtml = fs.readFileSync(path.join(ROOT, 'en', 'lugares', id, 'index.html'), 'utf8');
  assert(enHtml.includes('<meta name="robots" content="noindex, follow">'), `${id} must have noindex tag`);
  assert(!enHtml.includes('hreflang='), `${id} unvalidated page must not have hreflang tags`);
}
console.log('✓ Reciprocal hreflang and x-default fully verified on PT and EN pages.\n');

// -------------------------------------------------------------
// 4. Correspondência exata entre sitemap.xml e páginas indexáveis
// -------------------------------------------------------------
console.log('Checking sitemap.xml alignment...');
const sitemap = fs.readFileSync(path.join(ROOT, 'sitemap.xml'), 'utf8');
const sitemapLocs = (sitemap.match(/<loc>([^<]+)<\/loc>/g) || []).map(l => l.replace(/<\/?loc>/g, ''));

assert.equal(sitemapLocs.length, 66, `Sitemap must contain exactly 66 URLs (58 PT + 8 EN validated), got ${sitemapLocs.length}`);

// All 58 PT URLs must be present
for (const relUrl of all58PtUrls) {
  const fullUrl = `${BASE_URL}${relUrl}`;
  assert(sitemapLocs.includes(fullUrl), `PT URL missing from sitemap: ${fullUrl}`);
}

// Exactly 8 validated EN URLs must be present
const expectedEnUrls = EXACT_8_INDEXABLE_EN_URLS;
for (const enUrl of expectedEnUrls) {
  assert(sitemapLocs.includes(enUrl), `Validated EN URL missing from sitemap: ${enUrl}`);
}
const sitemapEnUrls = sitemapLocs.filter(u => u.includes('/en/')).sort();
assert.deepEqual(sitemapEnUrls, [...EXACT_8_INDEXABLE_EN_URLS].sort(), 'Sitemap contains unexpected EN URLs');

// No noindex pages in sitemap
for (const id of preparedNoindexSpots) {
  assert(!sitemap.includes(`/en/lugares/${id}/`), `Unvalidated EN page ${id} must not be in sitemap`);
}
for (const hub of preparedHubs) {
  assert(!sitemap.includes(hub), `Prepared hub ${hub} must not be in sitemap`);
}

// Verify xhtml:link alternates in sitemap for all validated EN pairs
for (const enUrl of expectedEnUrls) {
  assert(sitemap.includes(`href="${enUrl}"`), `Sitemap xhtml:link missing ${enUrl}`);
}
console.log('✓ Sitemap accurately reflects all 66 indexable URLs with reciprocal xhtml:link.\n');

// -------------------------------------------------------------
// 5. Ausência de texto em português nas páginas em inglês do piloto
// -------------------------------------------------------------
console.log('Checking absence of accidental Portuguese on EN pilot pages...');
const forbiddenPtPatterns = [
  'Destaques',
  'Como chegar',
  'Planeje esta parada',
  'Abra a ficha interativa',
  'Abrir no Guia',
  'Adicionar à Minha Viagem',
  'Dúvidas e sugestões',
  'Informações de planejamento e acesso',
  'Acesso rodoviário direto'
];

for (const id of validatedEnSpots) {
  const enHtml = fs.readFileSync(path.join(ROOT, 'en', 'lugares', id, 'index.html'), 'utf8');
  for (const forbidden of forbiddenPtPatterns) {
    assert(!enHtml.includes(forbidden), `Found accidental Portuguese "${forbidden}" in /en/lugares/${id}/`);
  }
}

// Mirante do Morro da Cruz specific authorized translation
const morroHtml = fs.readFileSync(path.join(ROOT, 'en', 'lugares', 'mirante-do-morro-da-cruz', 'index.html'), 'utf8');
assert(morroHtml.includes('Direct road access'), 'mirante-do-morro-da-cruz must use authorized translation "Direct road access"');
assert(!morroHtml.includes('Acesso rodoviário direto'), 'mirante-do-morro-da-cruz must not contain Portuguese access text');

console.log('✓ Zero accidental Portuguese on validated EN pilot pages.\n');

// -------------------------------------------------------------
// 6. Preservação de coordenadas, imagens canônicas e metadados
// -------------------------------------------------------------
console.log('Checking preservation of canonical coordinates, images and schema...');
for (const id of validatedEnSpots) {
  const spot = spots.find(s => s.id === id);
  const enHtml = fs.readFileSync(path.join(ROOT, 'en', 'lugares', id, 'index.html'), 'utf8');

  // Verify coordinates
  assert(enHtml.includes(`"latitude":${spot.coords[0]}`), `${id}: latitude preserved in schema`);
  assert(enHtml.includes(`"longitude":${spot.coords[1]}`), `${id}: longitude preserved in schema`);

  // Verify canonical image or override
  const override = photoOverrides[id];
  const expectedImg = override?.image || spot.image;
  assert(enHtml.includes(expectedImg), `${id}: image ${expectedImg} preserved`);

  // Verify EN title and description
  const tr = spot.translations.en;
  assert(enHtml.includes(tr.title), `${id}: EN title preserved`);
  assert(enHtml.includes(tr.subtitle), `${id}: EN subtitle preserved`);
}
console.log('✓ Coordinates, images, and metadata preserved.\n');

// -------------------------------------------------------------
// 7. Links de retorno e CTAs para o guia interativo (?lang=en)
// -------------------------------------------------------------
console.log('Checking return links and CTAs with language preservation (?lang=en)...');
for (const id of validatedEnSpots) {
  const enHtml = fs.readFileSync(path.join(ROOT, 'en', 'lugares', id, 'index.html'), 'utf8');
  assert(enHtml.includes(`href="/?spot=${encodeURIComponent(id)}&amp;lang=en"`), `${id}: CTA Open in Guide preserves ?lang=en`);
  assert(enHtml.includes(`href="/?spot=${encodeURIComponent(id)}&amp;add=trip&amp;lang=en"`), `${id}: CTA Add to My Trip preserves ?lang=en`);
  assert(enHtml.includes('<header><a href="/en/">Ilhabela Trip</a><a href="/en/o-que-fazer/">Explore</a></header>'), `${id}: Header links preserve English prefix`);
}

// Verify app.js detects /en/ prefix in URL pathname
const appJs = fs.readFileSync(path.join(ROOT, 'app.js'), 'utf8');
assert(appJs.includes('/^(en|es|fr|he)\\b/') || appJs.includes('pathMatch'), 'app.js must handle language prefixes in pathname');

console.log('✓ Return links, CTAs and runtime language detection verified.\n');

// -------------------------------------------------------------
// 8. Navegação nos Hubs EN e ausência de links 404 (SEO-PR-02B)
// -------------------------------------------------------------
console.log('Checking navigation integrity and zero 404 links in EN hubs...');
const enHubFiles = [
  'en/o-que-fazer/index.html',
  'en/praias/index.html',
  'en/cachoeiras/index.html',
  'en/trilhas/index.html'
];
const pilotSpotsSet = new Set([...validatedEnSpots, ...preparedNoindexSpots]);

for (const hubRelPath of enHubFiles) {
  const hubHtml = fs.readFileSync(path.join(ROOT, hubRelPath), 'utf8');
  // Check all internal hrefs
  const hrefs = [...hubHtml.matchAll(/href="([^"#\?]+)(?:[#\?][^"]*)?"/g)].map(m => m[1]);
  for (const href of hrefs) {
    if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:') || href.startsWith('tel:')) continue;
    const diskPath = href.endsWith('/')
      ? path.join(ROOT, href.replace(/^\//, ''), 'index.html')
      : path.join(ROOT, href.replace(/^\//, ''));
    assert(fs.existsSync(diskPath), `${hubRelPath}: broken internal link ${href} -> ${diskPath}`);
  }
}

// Check /en/o-que-fazer/index.html cards specifically
const discoveryHtml = fs.readFileSync(path.join(ROOT, 'en/o-que-fazer/index.html'), 'utf8');
const articles = [...discoveryHtml.matchAll(/<article>([\s\S]*?)<\/article>/g)];
assert.equal(articles.length, 50, 'en/o-que-fazer must contain exactly 50 attraction cards');

let pilotCardCount = 0;
let fallbackCardCount = 0;

for (const spot of spots) {
  const isPilot = pilotSpotsSet.has(spot.id);
  if (isPilot) {
    pilotCardCount++;
    const expectedStaticLink = `/en/lugares/${spot.id}/`;
    assert(discoveryHtml.includes(`href="${expectedStaticLink}"`), `Pilot spot ${spot.id} must link to static page`);
  } else {
    fallbackCardCount++;
    const expectedFallback = `href="/?spot=${encodeURIComponent(spot.id)}&amp;lang=en"`;
    assert(discoveryHtml.includes(expectedFallback), `Non-pilot spot ${spot.id} must link to interactive guide fallback`);
    assert(!discoveryHtml.includes(`href="/en/lugares/${spot.id}/"`), `Non-pilot spot ${spot.id} must NOT link to non-existent static page`);
  }
}

assert.equal(pilotCardCount, 5, 'Exactly 5 pilot attractions in discovery hub');
assert.equal(fallbackCardCount, 45, 'Exactly 45 interactive fallback attractions in discovery hub');
console.log('✓ Zero 404 links, 5 static EN destinations and 45 interactive fallbacks verified.\n');

// 9. English discovery editorial guidance (SEO-I18N-04A)
console.log('Checking English discovery editorial guidance and preserved beach cards...');
assert(discoveryHtml.includes('<p class="intro">Explore 50 Ilhabela places by experience:'), 'English discovery hub introductory guidance missing');
assert(discoveryHtml.includes('the mapped destination may differ from its access point'), 'English discovery hub special-access guidance missing');
assert(discoveryHtml.includes('select + My Trip to save it to your itinerary'), 'English discovery hub My Trip guidance missing');
assert(!discoveryHtml.includes('name="robots" content="noindex'), 'English discovery hub is indexable');

const beachHubHtml = fs.readFileSync(path.join(ROOT, 'en', 'praias', 'index.html'), 'utf8');
assert(beachHubHtml.includes('<p class="intro">Explore 23 Ilhabela beaches,'), 'English beach hub intro missing');
assert(beachHubHtml.includes('Driving directions do not always lead directly to the sand'), 'English beach hub road-access guidance missing');
assert(!beachHubHtml.includes('name="robots" content="noindex'), 'English beach hub is indexable');
const actualBeachIds = [...beachHubHtml.matchAll(/<article data-spot="([^"]+)"/g)].map(match => match[1]);
const expectedBeachIds = spots.filter(spot => spot.category === 'praias').map(spot => spot.id);
assert.deepEqual(actualBeachIds, expectedBeachIds, 'English beach hub must preserve all 23 original beach cards and their order');
assert.equal(actualBeachIds.length, 23, 'English beach hub must have exactly 23 beach cards');
for (const beachId of actualBeachIds) {
  const href = pilotSpotsSet.has(beachId)
    ? `/en/lugares/${beachId}/`
    : `/?spot=${encodeURIComponent(beachId)}&amp;lang=en`;
  assert(beachHubHtml.includes(`href="${href}"`), `English beach hub must preserve destination link: ${beachId}`);
  assert(beachHubHtml.includes(`href="/?spot=${encodeURIComponent(beachId)}&amp;add=trip&amp;lang=en"`), `English beach hub must preserve My Trip link: ${beachId}`);
}
console.log('✓ English editorial guidance, 50 discovery cards, 23 beach cards, noindex and My Trip links verified.\\n');

console.log('===============================================================');
console.log('ALL SEO-I18N-01 FOUNDATION & PILOT AUDIT TESTS PASSED (100% OK)');
console.log('===============================================================');
