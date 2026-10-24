const {test,expect}=require('@playwright/test');
for(const lang of ['en','es','fr','he'])for(const width of [390,1440]){
  test(`translated services and itinerary options ${lang} ${width}`,async({page,browser},info)=>{
    await page.setViewportSize({width,height:900});
    const errors=[];page.on('pageerror',e=>errors.push(e.message));
    await page.goto(`/${lang}/servicos/`);
    await expect(page.locator('#services-page-grid article')).toHaveCount(129);
    expect(await page.evaluate(()=>currentLang)).toBe(lang);
    await page.locator('#services-category-select').selectOption('food');
    await expect(page.locator('#services-page-grid article')).toHaveCount(68);
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
    if(lang==='he')await page.screenshot({path:info.outputPath(`services-${lang}-${width}.png`)});
    for(const days of [2,3]){
      await page.goto(`/${lang}/roteiros/${days}-dias/`);
      await expect(page.locator('article')).toHaveCount(10);
      await expect(page.locator('[data-analytics="add_trip"]')).toHaveCount(10);
      expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
    }
    const context=await browser.newContext({javaScriptEnabled:false});
    const staticPage=await context.newPage();
    await staticPage.goto(`${process.env.PREVIEW_URL||'http://127.0.0.1:4173'}/${lang}/servicos/`);
    await expect(staticPage.locator('#services-page-grid article')).toHaveCount(129);
    await context.close();expect(errors).toEqual([]);
  });
}
