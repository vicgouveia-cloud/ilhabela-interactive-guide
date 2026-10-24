const fs=require('node:fs');
const path=require('node:path');
const {execFileSync}=require('node:child_process');
const esbuild=require('esbuild');
const ROOT=path.resolve(__dirname,'..');
fs.mkdirSync(path.join(ROOT,'assets/build'),{recursive:true});
execFileSync(process.execPath,[require.resolve('tailwindcss/lib/cli.js'),'-c','tailwind.config.cjs','-i','scripts/tailwind-input.css','-o','assets/build/utilities.css','--minify'],{cwd:ROOT,stdio:'inherit'});
fs.copyFileSync(path.join(ROOT,'node_modules/leaflet/dist/leaflet.js'),path.join(ROOT,'assets/build/leaflet.js'));
fs.copyFileSync(path.join(ROOT,'node_modules/leaflet/dist/leaflet.css'),path.join(ROOT,'assets/build/leaflet.css'));
fs.cpSync(path.join(ROOT,'node_modules/leaflet/dist/images'),path.join(ROOT,'assets/build/images'),{recursive:true});
for(const [src,dst] of [['dist/leaflet.markercluster.js','markercluster.js'],['dist/MarkerCluster.css','markercluster.css']])fs.copyFileSync(path.join(ROOT,'node_modules/leaflet.markercluster',src),path.join(ROOT,'assets/build',dst));
fs.copyFileSync(path.join(ROOT,'node_modules/leaflet/LICENSE'),path.join(ROOT,'assets/build/leaflet-LICENSE.txt'));
fs.copyFileSync(path.join(ROOT,'node_modules/leaflet.markercluster/MIT-LICENCE.txt'),path.join(ROOT,'assets/build/markercluster-LICENSE.txt'));
// Classic scripts retain their shared global scope and execution order.
for(const file of fs.readdirSync(ROOT).filter(f=>f.endsWith('.js'))) {
  const result=esbuild.transformSync(fs.readFileSync(path.join(ROOT,file),'utf8'),{minify:true,target:'es2020',charset:'utf8',legalComments:'inline'});
  fs.writeFileSync(path.join(ROOT,'assets/build',file),result.code);
}
console.log('Built CSS, minified classic scripts and local Leaflet 1.9.4 assets.');
