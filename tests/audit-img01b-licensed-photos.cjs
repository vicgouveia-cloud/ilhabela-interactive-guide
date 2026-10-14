const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const {execFileSync}=require('node:child_process');
const root=path.resolve(__dirname,'..');
function catalog(withLibrary) {
  const c=vm.createContext({console});
  for(const p of ['data.js','additional-spots.js',...(withLibrary?['attraction-photos.js']:[])])
    vm.runInContext(fs.readFileSync(path.join(root,p),'utf8'),c,{filename:p});
  return {spots:vm.runInContext('touristSpots',c),library:withLibrary?vm.runInContext('verifiedPhotoLibrary',c):null};
}
const original=catalog(false), after=catalog(true);
const before=Object.fromEntries(original.spots.map(s=>[s.id,s]));
const spots=Object.fromEntries(after.spots.map(s=>[s.id,s]));
const photos={
  'praia-do-pinto':{
    image:'assets/images/praia-do-pinto_commons.webp',
    source:'https://commons.wikimedia.org/wiki/File:Praia_do_pinto_ilhabela_1957388_4024779116035_1551329815_n.jpg',
    credit:'Kathryn elizabeth loba collins · Wikimedia Commons'
  },
  'praia-da-pacuiba':{
    image:'assets/images/praia-da-pacuiba-costao_commons.webp',
    source:'https://commons.wikimedia.org/wiki/File:Parque_Estadual_de_Ilhabela_-_Jo%C3%A3o_Paulo_Marques_DAndretta_(10).jpg',
    credit:"João D'Andretta · Wikimedia Commons"
  }
};
const pending=['praia-do-barreiros','praia-de-santa-tereza','praia-da-ponta-azeda','poco-do-furado','mirante-do-baepi','mirante-do-morro-da-cruz','mirante-dos-barreiros'];
assert.equal(after.spots.length,50);
assert.equal(Object.keys(after.library).length,27);
function imageCard(html,id) {
  const card=[...html.matchAll(/<article\b[^>]*>[\s\S]*?<\/article>/g)].map(x=>x[0]).find(x=>x.includes('href="/lugares/'+id+'/"'));
  return card?.match(/<img\b[^>]*\bsrc="([^"]+)"/)?.[1]??null;
}
for(const [id,photo] of Object.entries(photos)) {
  const s=spots[id],metadata=after.library[id];
  assert.equal(before[id].image,'assets/images/attraction-placeholder.svg');
  assert.equal(s.image,photo.image,id+': runtime image');
  assert.deepEqual(Array.from(s.images),[photo.image],id+': gallery');
  assert.equal(s.photoCredit,photo.credit,id+': credit');
  assert.equal(s.photoSource,photo.source,id+': source');
  assert.equal(s.photoLicense,'CC BY-SA 4.0',id+': license');
  assert.equal(s.photoLicenseUrl,'https://creativecommons.org/licenses/by-sa/4.0/',id+': license URL');
  assert.equal(s.photoProvenance,metadata.provenance,id+': provenance');
  assert.equal(s.photoAdaptation,metadata.adaptation,id+': adaptation');
  for(const lang of ['pt','en','fr','es','he'])assert(s.photoCaption?.[lang]?.trim(),id+': missing photo caption '+lang);
  const b=fs.readFileSync(path.join(root,photo.image));
  assert(b.length>20000,id+': small image');
  assert.equal(b.subarray(0,4).toString('ascii'),'RIFF');
  assert.equal(b.subarray(8,12).toString('ascii'),'WEBP');
  const html=fs.readFileSync(path.join(root,'lugares',id,'index.html'),'utf8');
  const full='https://ilhabelatrip.com/'+photo.image;
  for(const mark of ['src="/'+photo.image+'"','<meta property="og:image" content="'+full+'">','<meta name="twitter:image" content="'+full+'">',photo.source,'CC BY-SA 4.0','https://creativecommons.org/licenses/by-sa/4.0/',s.photoCaption.pt])
    assert(html.includes(mark),id+': static image or attribution mismatch '+mark);
  const schema=JSON.parse(html.split('<script type="application/ld+json">')[1].split('</script>')[0]);
  assert.deepEqual(schema.image,[full],id+': schema');
  for(const hub of ['o-que-fazer/index.html','praias/index.html'])
    assert.equal(imageCard(fs.readFileSync(path.join(root,hub),'utf8'),id),'/'+photo.image,id+': hub '+hub);
}
for(const id of pending)assert.equal(spots[id].image,'assets/images/attraction-placeholder.svg',id+': placeholder changed');
for(const old of after.spots.filter(s=>!photos[s.id])) {
  const expected=after.library[old.id]?.images?.[0]||before[old.id].image;
  assert.equal(old.image,expected,old.id+': previously approved photo changed');
}
const changes=execFileSync('git',['diff','--name-status','eb8fd9cde593348e2e8199c2b1cd4279dd71acbf','HEAD','--','assets/images/'],{cwd:root,encoding:'utf8'}).trim().split(/\r?\n/).filter(Boolean).sort();
assert.deepEqual(changes,['A\tassets/images/praia-da-pacuiba-costao_commons.webp','A\tassets/images/praia-do-pinto_commons.webp','A\tassets/images/cachoeira-do-poco-fundo-acesso_commons.webp'].sort());
const index=fs.readFileSync(path.join(root,'index.html'),'utf8');
assert(index.includes('attraction-photos.js?v=1.2'));
assert(index.includes('app.js?v=5.2'));
assert(fs.readFileSync(path.join(root,'app.js'),'utf8').includes('data-photo-license'));
console.log('IMG-01B OK: 2 new CC BY-SA images, 7 placeholders retained; earlier Pinto/Pacuíba image references preserved.');
