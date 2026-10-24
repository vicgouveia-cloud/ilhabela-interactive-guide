const fs=require('node:fs');
const path=require('node:path');
const ROOT=path.resolve(__dirname,'..');
const OUT=path.resolve(ROOT,'public');
// This is a generated directory owned by this build, never an input checkout.
if(path.dirname(OUT)!==ROOT||path.basename(OUT)!=='public'||(fs.existsSync(OUT)&&fs.lstatSync(OUT).isSymbolicLink()))throw Error('Unsafe output directory');
fs.rmSync(OUT,{recursive:true,force:true});
fs.mkdirSync(OUT,{recursive:true});
const sitemap=fs.readFileSync(path.join(ROOT,'sitemap.xml'),'utf8');
const routes=[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>new URL(m[1]).pathname);
for(const route of routes){
  const relative=path.join(route.slice(1),'index.html'),target=path.join(OUT,relative);
  fs.mkdirSync(path.dirname(target),{recursive:true});
  fs.copyFileSync(path.join(ROOT,relative),target);
}
for(const file of fs.readdirSync(ROOT).filter(f=>/\.(js|css)$/.test(f)))fs.copyFileSync(path.join(ROOT,file),path.join(OUT,file));
for(const file of ['sitemap.xml','robots.txt'])fs.copyFileSync(path.join(ROOT,file),path.join(OUT,file));
fs.cpSync(path.join(ROOT,'assets'),path.join(OUT,'assets'),{recursive:true});
console.log(`Exported ${routes.length} pages and public assets to public/. Development files excluded.`);
