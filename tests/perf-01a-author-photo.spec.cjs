const {test,expect}=require('@playwright/test');
for(const width of [390,1440])for(const dpr of [1,2]){
 test(`PERF-01A user photograph, five languages ${width}px DPR${dpr}`,async({browser})=>{
  const context=await browser.newContext({viewport:{width,height:900},deviceScaleFactor:dpr});
  const page=await context.newPage(); const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('/');
  for(const lang of ['pt','en','es','fr','he']){
   await page.evaluate(lang=>setLanguage(lang),lang);
   await expect(page.locator('#spots-grid > article')).toHaveCount(50);
   await expect(page.locator('html')).toHaveAttribute('dir',lang==='he'?'rtl':'ltr');
   const caption=await page.evaluate(lang=>touristSpots.find(s=>s.id==='pico-de-sao-sebastiao').photoCaption[lang],lang);
   const card=page.locator('#spots-grid article').filter({has:page.locator('img[src*="pico-de-sao-sebastiao-autoral-original"]')});
   await expect(card.locator('img')).toHaveAttribute('alt',caption);
   await expect(card.locator('[data-photo-attribution]')).toContainText('Acervo pessoal — Ilhabela Trip');
   await page.evaluate(()=>openSpotModal('pico-de-sao-sebastiao'));
   const img=page.locator('#modal-main-img');await img.evaluate(i=>i.decode());
   await expect(img).toHaveAttribute('alt',caption);
   expect(await img.evaluate(i=>i.currentSrc)).toMatch(/pico-de-sao-sebastiao-autoral-original.*\.webp$/);
   await expect(page.locator('#modal-photo-license')).toContainText(caption);
   await expect(page.locator('#modal-photo-license a').first()).toHaveAttribute('href','/assets/images/pico-de-sao-sebastiao-autoral.PROVENANCE.md');
   await page.evaluate(()=>closeSpotModal());
  }
  expect(errors).toEqual([]);await context.close();
 });
}
test('PERF-01A failed WebP falls back to the same authorized JPEG',async({page})=>{
 await page.route('**/*pico-de-sao-sebastiao-autoral-original*.webp',r=>r.abort());
 await page.goto('/?spot=pico-de-sao-sebastiao');const img=page.locator('#modal-main-img');
 await expect(img).toHaveAttribute('src','assets/images/pico-de-sao-sebastiao-autoral-original.jpeg');
 await expect.poll(()=>img.evaluate(i=>i.complete&&i.naturalWidth>0)).toBe(true);
 await expect(img).not.toHaveAttribute('srcset');
 await expect(page.locator('#modal-photo-license')).toContainText('Acervo pessoal — Ilhabela Trip');
});
