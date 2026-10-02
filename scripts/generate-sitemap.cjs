const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const ROOT = path.resolve(__dirname, '..');
const BASE_URL = (process.env.SITE_URL || 'https://ilhabela-guide.vercel.app').replace(/\/$/, '');
const context = vm.createContext({ console });
for (const file of ['data.js', 'additional-spots.js']) {
  vm.runInContext(fs.readFileSync(path.join(ROOT, file), 'utf8'), context, { filename:file });
}
const spots = vm.runInContext('touristSpots', context);
const urls = [
  BASE_URL + '/',
  BASE_URL + '/o-que-fazer/',
  BASE_URL + '/servicos/',
  BASE_URL + '/praias/',
  BASE_URL + '/cachoeiras/',
  BASE_URL + '/trilhas/',
  ...spots.map(spot => BASE_URL + '/lugares/' + spot.id + '/')
];
const xml = '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  urls.map(url => '  <url><loc>' + url.replace(/&/g, '&amp;') + '</loc></url>').join('\n') +
  '\n</urlset>\n';
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), xml);
fs.writeFileSync(path.join(ROOT, 'robots.txt'), 'User-agent: *\nAllow: /\n\nSitemap: ' + BASE_URL + '/sitemap.xml\n');
console.log('Generated sitemap.xml with ' + urls.length + ' URLs and robots.txt.');
