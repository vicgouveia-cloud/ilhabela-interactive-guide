const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const parse5 = require('parse5');

const ROOT = path.resolve(__dirname, '..');
const BASE_URL = 'https://ilhabelatrip.com';

// Load catalog data
const context = vm.createContext({ console });
for (const file of ['data.js', 'additional-spots.js']) {
  vm.runInContext(fs.readFileSync(path.join(ROOT, file), 'utf8'), context, { filename: file });
}
const spots = vm.runInContext('touristSpots', context);
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
console.log('Checking self-referencing canonicals & EN locales...');
const validatedEnSpots = ['praia-do-curral', 'mirante-do-morro-da-cruz', 'pico-de-sao-sebastiao'];
const preparedNoindexSpots = ['baia-de-castelhanos', 'praia-do-bonete'];
const preparedHubs = ['/en/o-que-fazer/', '/en/praias/', '/en/cachoeiras/', '/en/trilhas/'];

// Home EN
const enHomeHtml = fs.readFileSync(path.join(ROOT, 'en', 'index.html'), 'utf8');
assert(enHomeHtml.includes('<html lang="en"'), '/en/ must have lang="en"');
assert(enHomeHtml.includes('<link rel="canonical" href="https://ilhabelatrip.com/en/" />'), '/en/ must have self canonical');
assert(enHomeHtml.includes('<meta property="og:locale" content="en_US" />'), '/en/ must have og:locale="en_US"');

// EN attraction pages
for (const id of [...validatedEnSpots, ...preparedNoindexSpots]) {
  const enPagePath = path.join(ROOT, 'en', 'lugares', id, 'index.html');
  assert(fs.existsSync(enPagePath), `Missing EN attraction page: ${enPagePath}`);
  const html = fs.readFileSync(enPagePath, 'utf8');
  assert(html.includes('<html lang="en">'), `/en/lugares/${id}/ must have lang="en"`);
  assert(html.includes(`<link rel="canonical" href="https://ilhabelatrip.com/en/lugares/${id}/">`), `/en/lugares/${id}/ canonical self-reference`);
  assert(html.includes('<meta property="og:locale" content="en_US">'), `/en/lugares/${id}/ og:locale="en_US"`);
}

// Prepared Hubs
for (const hub of preparedHubs) {
  const hubPath = path.join(ROOT, hub.replace(/^\//, ''), 'index.html');
  assert(fs.existsSync(hubPath), `Missing hub page: ${hubPath}`);
  const html = fs.readFileSync(hubPath, 'utf8');
  assert(html.includes('<html lang="en">'), `${hub} must have lang="en"`);
  assert(html.includes(`<link rel="canonical" href="https://ilhabelatrip.com${hub}">`), `${hub} self canonical`);
  assert(html.includes('<meta name="robots" content="noindex, follow">'), `${hub} must be noindex, follow`);
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
}

// Prepared / unvalidated spots must NOT have hreflang tags linking to noindex
for (const id of preparedNoindexSpots) {
  const enHtml = fs.readFileSync(path.join(ROOT, 'en', 'lugares', id, 'index.html'), 'utf8');
  assert(enHtml.includes('<meta name="robots" content="noindex, follow">'), `${id} must have noindex tag`);
  assert(!enHtml.includes('hreflang='), `${id} unvalidated page must not have hreflang tags`);
}
console.log('✓ Reciprocal hreflang and x-default fully verified.\n');

// -------------------------------------------------------------
// 4. Correspondência exata entre sitemap.xml e páginas indexáveis
// -------------------------------------------------------------
console.log('Checking sitemap.xml alignment...');
const sitemap = fs.readFileSync(path.join(ROOT, 'sitemap.xml'), 'utf8');
const sitemapLocs = (sitemap.match(/<loc>([^<]+)<\/loc>/g) || []).map(l => l.replace(/<\/?loc>/g, ''));

assert.equal(sitemapLocs.length, 62, `Sitemap must contain exactly 62 URLs (58 PT + 4 EN validated), got ${sitemapLocs.length}`);

// All 58 PT URLs must be present
for (const relUrl of all58PtUrls) {
  const fullUrl = `${BASE_URL}${relUrl}`;
  assert(sitemapLocs.includes(fullUrl), `PT URL missing from sitemap: ${fullUrl}`);
}

// Exactly 4 validated EN URLs must be present
const expectedEnUrls = [
  `${BASE_URL}/en/`,
  ...validatedEnSpots.map(id => `${BASE_URL}/en/lugares/${id}/`)
];
for (const enUrl of expectedEnUrls) {
  assert(sitemapLocs.includes(enUrl), `Validated EN URL missing from sitemap: ${enUrl}`);
}

// No noindex pages in sitemap
for (const id of preparedNoindexSpots) {
  assert(!sitemap.includes(`/en/lugares/${id}/`), `Unvalidated EN page ${id} must not be in sitemap`);
}
for (const hub of preparedHubs) {
  assert(!sitemap.includes(hub), `Prepared hub ${hub} must not be in sitemap`);
}

// Verify xhtml:link alternates in sitemap for the 4 pairs
for (const enUrl of expectedEnUrls) {
  assert(sitemap.includes(`href="${enUrl}"`), `Sitemap xhtml:link missing ${enUrl}`);
}
console.log('✓ Sitemap accurately reflects all 62 indexable URLs with reciprocal xhtml:link.\n');

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

console.log('===============================================================');
console.log('ALL SEO-I18N-01 FOUNDATION & PILOT AUDIT TESTS PASSED (100% OK)');
console.log('===============================================================');
