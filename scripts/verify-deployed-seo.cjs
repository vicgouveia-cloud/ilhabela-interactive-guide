const fs=require('node:fs');
const path=require('node:path');
const crypto=require('node:crypto');
const ROOT=path.resolve(__dirname,'..');
const target=(process.argv[2]||'https://ilhabelatrip.com').replace(/\/$/,'');
const sitemap=fs.readFileSync(path.join(ROOT,'sitemap.xml'),'utf8');
const urls=[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);
const failures=[];
let checked=0;
const normalize=s=>s.replace(/\r\n/g,'\n');
const hash=s=>crypto.createHash('sha256').update(s).digest('hex');
async function check(url){
  const route=new URL(url).pathname;
  try{
    const response=await fetch(target+route,{signal:AbortSignal.timeout(30000)});
    if(response.status!==200)throw Error('HTTP '+response.status);
    if(/noindex/i.test(response.headers.get('x-robots-tag')||''))throw Error('HTTP noindex');
    const html=await response.text();
    if(!html.includes('rel="canonical" href="'+url+'"'))throw Error('canonical mismatch');
    if(/name="robots" content="[^\"]*noindex/.test(html))throw Error('HTML noindex');
    const local=fs.readFileSync(path.join(ROOT,route,'index.html'),'utf8');
    if(hash(normalize(local))!==hash(normalize(html)))throw Error('deployed HTML differs from validated build');
    checked++;
  }catch(error){failures.push({route,error:error.message});}
}
(async()=>{
  const queue=[...urls];
  await Promise.all(Array.from({length:8},async()=>{while(queue.length)await check(queue.shift());}));
  const assets=fs.readdirSync(path.join(ROOT,'assets/build')).filter(f=>/\.(js|css)$/.test(f));
  for(const file of assets){
    try{
      const response=await fetch(target+'/assets/build/'+file,{signal:AbortSignal.timeout(30000)});
      if(!response.ok)throw Error('HTTP '+response.status);
      const actual=normalize(await response.text()),expected=normalize(fs.readFileSync(path.join(ROOT,'assets/build',file),'utf8'));
      if(hash(actual)!==hash(expected))throw Error('asset differs from validated build');
    }catch(error){failures.push({route:'/assets/build/'+file,error:error.message});}
  }
  console.log(JSON.stringify({target,pages:urls.length,checked,assets:assets.length,failures},null,2));
  if(failures.length)process.exitCode=1;
})();
