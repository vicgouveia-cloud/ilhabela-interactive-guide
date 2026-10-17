const {test,expect}=require('@playwright/test');
const shortcuts=['all','restaurant','bar','kiosk','cafe'];
for(const language of ['pt','en','es','fr','he']){
  for(const width of [320,390,1440]){
    test(`Comer e beber shortcuts and coworking in ${language} at ${width}px`,async({page})=>{
      await page.setViewportSize({width,height:900});
      await page.goto('/servicos/',{waitUntil:'domcontentloaded'});
      await page.waitForFunction(()=>document.querySelectorAll('#services-page-grid article').length>0);
      await page.evaluate(l=>setLanguage(l),language);
      await expect(page.locator('html')).toHaveAttribute('dir',language==='he'?'rtl':'ltr');
      const category=page.locator('#services-category-select');
      await category.selectOption('food');
      const chips=page.locator('[data-service-food-shortcut]');
      await expect(chips).toHaveCount(5);
      await expect(chips.first()).toHaveAttribute('aria-pressed','true');
      for(const value of shortcuts){
        await page.locator(`[data-service-food-shortcut="${value}"]`).click();
        await expect(page.locator(`[data-service-food-shortcut="${value}"]`)).toHaveAttribute('aria-pressed','true');
        await expect(page.locator('[data-service-food-filter="type"]')).toHaveValue(value);
        const expected=await page.evaluate(type=>servicesData.filter(s=>s.category==='food'&&(type==='all'||(s.serviceType||[]).includes(type))).length,value);
        await expect(page.locator('#services-page-grid article')).toHaveCount(expected);
      }
      await page.locator('[data-service-food-filter="type"]').selectOption('restaurant');
      await expect(page.locator('[data-service-food-shortcut="restaurant"]')).toHaveAttribute('aria-pressed','true');
      await category.selectOption('essentials');
      const practical=page.locator('#services-practical-filter');
      await expect(practical).toBeVisible();
      await practical.selectOption('coworking');
      await expect(practical).toHaveValue('coworking');
      const results=page.locator('#services-page-grid article');
      await expect(results).toHaveCount(3);
      for(const name of ['Vila Hub','Blue Cowork Ilhabela','Reserva Ilhabela — Coworking']){
        const card=results.filter({has:page.locator('h2',{hasText:name,exact:true})});
        await expect(card).toHaveCount(1);
        await expect(card.locator('a[href^="https://www.google.com/maps/search/"]')).toHaveCount(1);
        await expect(card.locator('img')).toHaveCount(0);
        await expect(card.locator('span.absolute.top-3.right-3')).toHaveCount(0);
      }
      await expect(page.locator('#services-page-grid')).not.toContainText('Rudá Destinos');
      await category.selectOption('food');
      await expect(page.locator('[data-service-food-shortcut="all"]')).toHaveAttribute('aria-pressed','true');
      await expect(page.locator('[data-service-food-filter="type"]')).toHaveValue('all');
    });
  }
}
