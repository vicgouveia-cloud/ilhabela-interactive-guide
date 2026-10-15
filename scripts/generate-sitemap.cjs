const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const ROOT = path.resolve(__dirname, '..');
const BASE_URL = (process.env.SITE_URL || 'https://ilhabelatrip.com').replace(/\/$/, '');
const context = vm.createContext({ console });
for (const file of ['data.js', 'additional-spots.js', 'attraction-photos.js']) {
  vm.runInContext(fs.readFileSync(path.join(ROOT, file), 'utf8'), context, { filename: file });
}
const spots = vm.runInContext('touristSpots', context);

// Validated EN pilot attractions eligible for indexing and sitemap
const VALIDATED_EN_SPOTS = [
  'praia-do-curral',
  'mirante-do-morro-da-cruz',
  'pico-de-sao-sebastiao',
  'baia-de-castelhanos',
  'praia-do-bonete'
];

// Map of alternate language versions for reciprocal hreflang
const alternates = new Map();

// Home
alternates.set(`${BASE_URL}/`, {
  pt: `${BASE_URL}/`,
  en: `${BASE_URL}/en/`,
  'x-default': `${BASE_URL}/`
});
alternates.set(`${BASE_URL}/en/`, {
  pt: `${BASE_URL}/`,
  en: `${BASE_URL}/en/`,
  'x-default': `${BASE_URL}/`
});

// Validated attraction alternates
for (const id of VALIDATED_EN_SPOTS) {
  const ptUrl = `${BASE_URL}/lugares/${id}/`;
  const enUrl = `${BASE_URL}/en/lugares/${id}/`;
  const mapping = {
    pt: ptUrl,
    en: enUrl,
    'x-default': ptUrl
  };
  alternates.set(ptUrl, mapping);
  alternates.set(enUrl, mapping);
}

const ptUrls = [
  BASE_URL + '/',
  BASE_URL + '/o-que-fazer/',
  BASE_URL + '/servicos/',
  BASE_URL + '/praias/',
  BASE_URL + '/cachoeiras/',
  BASE_URL + '/trilhas/',
  BASE_URL + '/roteiros/3-dias/',
  BASE_URL + '/roteiros/2-dias/',
  ...spots.map(spot => BASE_URL + '/lugares/' + spot.id + '/')
];

const enUrls = [
  BASE_URL + '/en/',
  ...VALIDATED_EN_SPOTS.map(id => BASE_URL + '/en/lugares/' + id + '/')
];

const allUrls = [...ptUrls, ...enUrls];

function renderUrlEntry(url) {
  const alts = alternates.get(url);
  if (!alts) {
    return `  <url><loc>${url}</loc></url>`;
  }
  const links = [
    `    <xhtml:link rel="alternate" hreflang="pt" href="${alts.pt}"/>`,
    `    <xhtml:link rel="alternate" hreflang="en" href="${alts.en}"/>`,
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${alts['x-default']}"/>`
  ].join('\n');
  return `  <url>\n    <loc>${url}</loc>\n${links}\n  </url>`;
}

const xml = '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' +
  allUrls.map(renderUrlEntry).join('\n') +
  '\n</urlset>\n';

fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), xml);
fs.writeFileSync(path.join(ROOT, 'robots.txt'), 'User-agent: *\nAllow: /\n\nSitemap: ' + BASE_URL + '/sitemap.xml\n');
console.log('Generated sitemap.xml with ' + allUrls.length + ' URLs and robots.txt.');
