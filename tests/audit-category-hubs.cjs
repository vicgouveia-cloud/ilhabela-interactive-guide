const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const ROOT = path.resolve(__dirname, '..');
const BASE = 'https://ilhabelatrip.com';
const context = vm.createContext({ console });
for (const file of ['data.js', 'additional-spots.js']) vm.runInContext(fs.readFileSync(path.join(ROOT, file), 'utf8'), context, { filename: file });
const spots = vm.runInContext('touristSpots', context);
const esc = value => String(value ?? '').replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
const categories = [
  ['praias', 'Praias', 'Do litoral urbano às praias remotas e preservadas.'],
  ['cachoeiras', 'Cachoeiras', 'Quedas d’água, poços e piscinas naturais.'],
  ['trilhas', 'Trilhas e piscinas naturais', 'Caminhos pela Mata Atlântica e experiências a pé.']
];
const existingHub = fs.readFileSync(path.join(ROOT, 'o-que-fazer/index.html'), 'utf8').replace(/\r\n/g, '\n');
const analytics = existingHub.match(/<script>\nwindow\.va=[\s\S]*?<\/script><script defer src="\/_vercel\/insights\/script\.js"><\/script>/)[0];
for (const [category, label, intro] of categories) {
  const html = fs.readFileSync(path.join(ROOT, category, 'index.html'), 'utf8');
  const selected = spots.filter(spot => spot.category === category);
  const cards = [...html.matchAll(/<article data-spot="([^"]+)">([\s\S]*?)<\/article>/g)];
  assert.equal((html.match(/<article\b/g) || []).length, selected.length, `${category}: total cards`);
  assert.equal(cards.length, selected.length, `${category}: identifiable cards`);
  assert.deepEqual(cards.map(card => card[1]).sort(), Array.from(selected, spot => spot.id).sort(), `${category}: exact category membership`);
  const expectedLinks = Array.from(selected, spot => `/lugares/${spot.id}/`);
  for (const link of html.matchAll(/href="(\/lugares\/[^"\s]+)"/g)) assert(expectedLinks.includes(link[1]), `${category}: unexpected attraction link ${link[1]}`);
  const tripIds = [...html.matchAll(/href="\/\?spot=([^"&]+)&amp;add=trip"/g)].map(match => decodeURIComponent(match[1]));
  assert.deepEqual(tripIds.sort(), Array.from(selected, spot => spot.id).sort(), `${category}: exact trip CTAs`);
  for (const spot of selected) {
    const card = cards.find(card => card[1] === spot.id)[2];
    assert(card.includes(`<h2><a href="/lugares/${spot.id}/">${esc(spot.translations.pt.title)}</a></h2>`));
    assert(card.includes(`<p>${esc(spot.translations.pt.subtitle)}</p>`));
    assert(card.includes(`data-analytics="view_attraction" href="/lugares/${spot.id}/"`));
    assert(card.includes(`data-analytics="add_trip" href="/?spot=${encodeURIComponent(spot.id)}&amp;add=trip"`));
    assert(card.includes('+ Minha Viagem'));
  }
  const title = `${label} em Ilhabela | Ilhabela Trip`;
  const description = `${label} em Ilhabela: ${selected.length} lugares do catálogo do Ilhabela Trip. ${intro}`;
  for (const needle of [`<title>${esc(title)}</title>`, `<meta name="description" content="${esc(description)}">`, `<link rel="canonical" href="${BASE}/${category}/">`, `<h1>${esc(label)} em Ilhabela</h1>`, `<meta property="og:title" content="${esc(title)}">`, `<meta property="og:description" content="${esc(description)}">`, `<meta property="og:url" content="${BASE}/${category}/">`, '<meta property="og:type" content="website">']) assert(html.includes(needle), `${category}: missing ${needle}`);
  assert(!/melhor(?:es)?|ranking/i.test(html), `${category}: ranking language`);
  assert(html.includes(analytics), `${category}: same analytics as discovery hub`);
  assert.equal((html.match(/src="\/_vercel\/insights\/script\.js"/g) || []).length, 1);
  let listener;
  const browser = { window: {}, document: { addEventListener(type, fn) { assert.equal(type, 'click'); listener = fn; } } };
  vm.runInNewContext(analytics.match(/<script>([\s\S]*?)<\/script>/)[1], browser);
  for (const action of ['view_attraction', 'add_trip']) {
    listener({ target: { closest(selector) { assert.equal(selector, '[data-analytics]'); return { dataset: { analytics: action } }; } } });
    const event = browser.window.vaq.at(-1);
    assert.equal(event[0], 'event'); assert.equal(event[1].name, 'SEO Entry Action'); assert.equal(event[1].data.action, action);
  }
  listener({ target: { closest: () => null } });
  assert.equal(browser.window.vaq.length, 2);
  console.log(`Category hub OK: ${category}, ${selected.length}/${selected.length} attractions.`);
}
