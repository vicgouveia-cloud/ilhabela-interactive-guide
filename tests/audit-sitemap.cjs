const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const ROOT = path.resolve(__dirname, '..');
const BASE = 'https://ilhabela-guide.vercel.app';
const context = vm.createContext({ console });
for (const file of ['data.js', 'additional-spots.js']) vm.runInContext(fs.readFileSync(path.join(ROOT,file),'utf8'), context, {filename:file});
const spots = vm.runInContext('touristSpots', context);
const sitemap = fs.readFileSync(path.join(ROOT,'sitemap.xml'),'utf8');
const robots = fs.readFileSync(path.join(ROOT,'robots.txt'),'utf8');
const failures = [];
for (const fixed of [BASE+'/', BASE+'/o-que-fazer/', BASE+'/servicos/', BASE+'/praias/', BASE+'/cachoeiras/', BASE+'/trilhas/']) {
  if (!sitemap.includes('<loc>'+fixed+'</loc>')) failures.push('sitemap ausente: '+fixed);
}
for (const spot of spots) {
  const url = BASE+'/lugares/'+spot.id+'/';
  if (!sitemap.includes('<loc>'+url+'</loc>')) failures.push('atração ausente no sitemap: '+spot.id);
}
const count = (sitemap.match(/<loc>/g) || []).length;
const expected = spots.length + 6;
if (count !== expected) failures.push('quantidade de URLs: '+count+'; esperado '+expected);
if (!robots.includes('User-agent: *') || !robots.includes('Allow: /')) failures.push('robots.txt sem regra pública esperada');
if (!robots.includes('Sitemap: '+BASE+'/sitemap.xml')) failures.push('robots.txt sem referência ao sitemap');
if (failures.length) { console.error(failures.join('\n')); process.exit(1); }
console.log('SEO discovery OK: '+spots.length+' attractions, '+count+' sitemap URLs.');
