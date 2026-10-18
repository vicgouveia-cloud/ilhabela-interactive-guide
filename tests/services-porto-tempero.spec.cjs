const {test,expect}=require('@playwright/test');
for(const lang of ['pt','en','es','fr','he']) for(const width of [320,390,1440]) {
  test(`Porto and Tempero ${lang} ${width}`,async({page})=>{
    const errors=[];page.on('pageerror',e=>errors.push(e.message));
    await page.setViewportSize({width,height:900});
    await page.goto('/servicos/',{waitUntil:'domcontentloaded'});
    await page.waitForFunction(()=>document.querySelectorAll('#services-page-grid article').length>0);
    await page.evaluate(l=>setLanguage(l),lang);
    await expect(page.locator('html')).toHaveAttribute('dir',lang==='he'?'rtl':'ltr');
    await page.locator('#services-category-select').selectOption('food');
    await expect(page.locator('#services-page-grid article')).toHaveCount(68);
    const card=name=>page.locator('#services-page-grid article').filter({has:page.locator('h2',{hasText:name,exact:true})});
    const porto=card('Porto do Engenho'),tempero=card('Tempero da Ilha');
    for(const [row,id]of [[porto,'porto-do-engenho'],[tempero,'tempero-da-ilha']]) {
      await expect(row).toHaveCount(1);
      await expect(row.locator('span.absolute.top-3.right-3')).toHaveCount(1);
      const img=row.locator('img');await expect(img).toHaveAttribute('src',new RegExp(id+'-logo-card.webp'));
      await img.scrollIntoViewIfNeeded();
      await expect.poll(()=>img.evaluate(el=>el.complete&&el.naturalWidth>0)).toBe(true);
      await expect(row.locator('a[href*="google.com/maps/search"]')).toHaveCount(1);
      const names=await page.locator('#services-page-grid h2').allTextContents();
      expect(names.indexOf(await row.locator('h2').textContent())).toBeLessThan(names.indexOf('Israel Quero Pizza — Itaguaçu'));
    }
    await expect(porto.locator('a[href^="https://wa.me/"],a[href^="tel:"]')).toHaveCount(0);
    await expect(porto.locator('a[href="https://www.instagram.com/portodoengenhoilhabela/"]')).toHaveCount(1);
    await expect(tempero.locator('a[href^="https://wa.me/5512991065523"]')).toHaveCount(1);
    await expect(tempero.locator('a[href="https://linktr.ee/temperoda.ilha"]')).toHaveCount(1);
    for(const [axis,value,p,t]of [['type','bar',1,0],['type','pizzeria',0,1],['type','burger',0,1],['format','buffet',0,1],['specialty','seafood',1,0],['specialty','burger',0,1],['occasion','lunch',1,1],['occasion','afternoon',1,0],['occasion','dinner',0,1]]) {
      await page.locator(`[data-service-food-filter="${axis}"]`).selectOption(value);
      await expect(porto).toHaveCount(p);await expect(tempero).toHaveCount(t);
      await page.locator(`[data-service-food-filter="${axis}"]`).selectOption('all');
    }
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
    expect(errors).toEqual([]);
    if(width===390&&lang==='pt') {
      await porto.screenshot({path:'test-results/porto-card.png'});
      await tempero.screenshot({path:'test-results/tempero-card.png'});
    }
  });
}
