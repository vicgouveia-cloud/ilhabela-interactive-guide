const {test,expect}=require('@playwright/test');
for(const lang of ['pt','en','fr','es','he']) for(const width of [390,1440]) {
  test(`Israel units ${lang} ${width}`,async({page})=>{
    const errors=[];
    page.on('pageerror',error=>errors.push(error.message));
    await page.setViewportSize({width,height:900});
    await page.goto('/servicos/',{waitUntil:'domcontentloaded'});
    await page.waitForFunction(()=>document.querySelectorAll('#services-page-grid article').length>0);
    await page.evaluate(l=>setLanguage(l),lang);
    await expect(page.locator('html')).toHaveAttribute('dir',lang==='he'?'rtl':'ltr');
    await page.locator('#services-category-select').selectOption('food');
    await expect(page.locator('#services-page-grid article')).toHaveCount(66);
    const card=name=>page.locator('#services-page-grid article').filter({has:page.locator('h2',{hasText:name,exact:true})});
    const delivery=card('Israel Quero Pizza — Delivery');
    const venue=card('Israel Quero Pizza — Itaguaçu');
    await expect(delivery).toHaveCount(1);
    await expect(venue).toHaveCount(1);
    await expect(delivery.locator('span.absolute.top-3.right-3')).toHaveCount(1);
    await expect(venue.locator('span.absolute.top-3.right-3')).toHaveCount(0);
    await expect(delivery.locator('a[href^="https://wa.me/5512992519182"]')).toHaveCount(1);
    await expect(delivery.locator('a[href*="maps"]')).toHaveCount(0);
    await expect(venue.locator('a[href^="https://wa.me/"],a[href^="tel:"]')).toHaveCount(0);
    const maps=venue.locator('a[href^="https://www.google.com/maps/search/"]');
    await expect(maps).toHaveCount(1);
    expect(decodeURIComponent(await maps.getAttribute('href'))).toContain('Rua Benedito Marques Santana, 3, Itaguaçu');
    for(const unit of [delivery,venue]) {
      const img=unit.locator('img');
      await expect(img).toHaveAttribute('src',/israel-quero-pizza-logo-card.webp/);
      await img.scrollIntoViewIfNeeded();
      await expect.poll(()=>img.evaluate(el=>el.complete && el.naturalWidth)).toBe(263);
    }
    const names=await page.locator('#services-page-grid h2').allTextContents();
    expect(names.indexOf('Israel Quero Pizza — Delivery')).toBeLessThan(names.indexOf('Israel Quero Pizza — Itaguaçu'));
    await page.locator('[data-service-food-filter="type"]').selectOption('pizzeria');
    await page.locator('[data-service-food-filter="specialty"]').selectOption('pizza');
    await expect(delivery).toHaveCount(1);await expect(venue).toHaveCount(1);
    for(const format of ['delivery','takeaway','aLaCarte']) {
      await page.locator('[data-service-food-filter="format"]').selectOption(format);
      await expect(delivery).toHaveCount(format==='delivery'?1:0);
      await expect(venue).toHaveCount(format==='delivery'?0:1);
    }
    await page.locator('[data-service-food-filter="format"]').selectOption('all');
    await delivery.scrollIntoViewIfNeeded();
    expect(errors).toEqual([]);
  });
}
