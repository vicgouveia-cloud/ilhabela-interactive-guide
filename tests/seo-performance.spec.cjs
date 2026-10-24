const {test,expect}=require('@playwright/test');
const {execFileSync}=require('node:child_process');
const fs=require('node:fs');
for(const width of [390,1440])test(`performance comparison at ${width}`,async({browser},info)=>{
  test.setTimeout(120000);
  const baseline=execFileSync('git',['show','5a9f0f085dc0c4c1c45787779f1f6cbbd9ddab1f:index.html'],{encoding:'utf8'});
  const measurements=[];
  for(const original of [true,false]){
    const context=await browser.newContext({viewport:{width,height:900},locale:'pt-BR'});
    const page=await context.newPage();
    if(original)await page.route('http://127.0.0.1:4173/',route=>route.fulfill({contentType:'text/html',body:baseline}));
    await page.goto('http://127.0.0.1:4173/');
    await page.waitForFunction(()=>map&&mapMarkers.length===50);
    const result=await page.evaluate(()=>({domContentLoaded:performance.getEntriesByType('navigation')[0].domContentLoadedEventEnd,firstContentfulPaint:performance.getEntriesByName('first-contentful-paint')[0]?.startTime,scriptResources:performance.getEntriesByType('resource').filter(r=>r.initiatorType==='script').length}));
    measurements.push({variant:original?'baseline':'optimized',...result});await context.close();
  }
  const files=['translations.js','data.js','additional-spots.js','attraction-photos.js','responsive-images.js','app.js','multimodal.js','planner.js','offline-trip.js'];
  const raw=files.reduce((sum,f)=>sum+fs.statSync(f).size,0),minified=files.reduce((sum,f)=>sum+fs.statSync('assets/build/'+f).size,0);
  expect(minified).toBeLessThan(raw);
  fs.writeFileSync(info.outputPath('performance.json'),JSON.stringify({width,rawScriptBytes:raw,minifiedScriptBytes:minified,measurements},null,2));
});
