const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const ROOT=path.resolve(__dirname,'..'),OUT=path.join(ROOT,'public');
const urls=[...fs.readFileSync(path.join(ROOT,'sitemap.xml'),'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>new URL(m[1]).pathname);
assert.equal(urls.length,290);
let checked=0;
function compare(relative){assert(fs.readFileSync(path.join(ROOT,relative)).equals(fs.readFileSync(path.join(OUT,relative))),relative+' published bytes differ');checked++;}
for(const route of urls)compare(path.join(route.slice(1),'index.html'));
for(const file of fs.readdirSync(ROOT).filter(f=>/\.(js|css)$/.test(f)))compare(file);
for(const file of ['robots.txt','sitemap.xml'])compare(file);
function assets(dir){for(const entry of fs.readdirSync(path.join(ROOT,dir),{withFileTypes:true})){const relative=path.join(dir,entry.name);if(entry.isDirectory())assets(relative);else compare(relative);}}
assets('assets');
for(const forbidden of ['node_modules','tests','scripts','docs','.git','.env','package.json','package-lock.json'])assert(!fs.existsSync(path.join(OUT,forbidden)),'Development input published: '+forbidden);
assert.equal(JSON.parse(fs.readFileSync(path.join(ROOT,'vercel.json'))).outputDirectory,'public');
console.log(`Static export PASS: ${urls.length} pages, ${checked} byte-identical public files; development inputs excluded.`);
