const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ROOT = path.resolve(__dirname, '..');
const context = vm.createContext({ console });
for (const file of ['data.js','additional-spots.js']) vm.runInContext(fs.readFileSync(path.join(ROOT,file),'utf8'), context, {filename:file});
const spots = vm.runInContext('touristSpots', context);
const failures = [];
for (const spot of spots) {
  const file = path.join(ROOT,'lugares',spot.id,'index.html');
  if (!fs.existsSync(file)) { failures.push(`${spot.id}: página ausente`); continue; }
  const html = fs.readFileSync(file,'utf8');
  for (const needle of ['<meta name="description"', '<link rel="canonical"', 'property="og:title"', '"@type":"TouristAttraction"', `/?spot=${spot.id}`]) {
    if (!html.includes(needle)) failures.push(`${spot.id}: ausente ${needle}`);
  }
  if (/aggregateRating|reviewRating/.test(html)) failures.push(`${spot.id}: rating/review schema não autorizado`);
}
if (failures.length) { console.error(failures.join('\n')); process.exit(1); }
console.log(`SEO attraction pages OK: ${spots.length}/${spots.length}`);
