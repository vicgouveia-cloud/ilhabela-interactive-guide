const {test,expect}=require('@playwright/test');
for(const lang of ['pt','en','es','fr','he']){
  test('Praia Grande Rei do Pastel limited service card: '+lang,async({page})=>{
    await page.goto('/servicos/',{waitUntil:'domcontentloaded'});
    await page.waitForFunction(()=>document.querySelectorAll('#services-page-grid article').length>0);
    await page.evaluate(l=>setLanguage(l),lang);
    await page.locator('#services-category-select').selectOption('food');
    const card=page.locator('#services-page-grid article').filter({has:page.locator('h2',{hasText:'Rei do Pastel'})});
    await expect(card).toHaveCount(1);
    await expect(card).toContainText('Rei do Pastel');
    await expect(card).toContainText(lang==='he'?'פראיה גראנדה':'Praia Grande');
    await expect(card.locator('a[href*="google.com/maps"]')).toHaveCount(0);
    await expect(card.locator('a[href^="tel:"], a[href*="wa.me"], a[href*="instagram.com"]')).toHaveCount(0);
    const recorded=await page.evaluate(()=>servicesData.find(s=>s.id==='rei-do-pastel-praia-grande'));
    expect(recorded.category).toBe('food');
    expect(recorded.mapLocationVerified).toBe(false);
    expect(recorded.translations[lang].description.length).toBeGreaterThan(65);
  });
}
