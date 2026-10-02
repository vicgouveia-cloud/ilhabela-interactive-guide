const fs=require('node:fs');const path=require('node:path');
const ROOT=path.resolve(__dirname,'..');const html=fs.readFileSync(path.join(ROOT,'roteiros','3-dias','index.html'),'utf8');const failures=[];
const ids=["mirante-do-piuva","praia-do-juliao","praia-da-feiticeira","praia-do-curral","baia-de-castelhanos","praia-do-bonete","praia-da-armacao","praia-do-sino","praia-do-jabaquara","centro-historico-vila"];
for(const id of ids){if(!html.includes('/lugares/'+id+'/'))failures.push('atração ausente: '+id);if(!html.includes('/?spot='+id+'&amp;add=trip'))failures.push('CTA ausente: '+id);}
for(const needle of ['<title>Ilhabela em 3 dias','name="description"','rel="canonical" href="https://ilhabela-guide.vercel.app/roteiros/3-dias/"','/_vercel/insights/script.js','SEO Entry Action','Castelhanos ou Bonete'])if(!html.includes(needle))failures.push('ausente: '+needle);
if((html.match(/<article>/g)||[]).length!==ids.length)failures.push('quantidade de cards incorreta');
if(failures.length){console.error(failures.join('\n'));process.exit(1)}console.log('Roteiro 3 dias OK: '+ids.length+' opções.');
