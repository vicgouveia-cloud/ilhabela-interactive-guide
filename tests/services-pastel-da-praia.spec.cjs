const {test,expect}=require('@playwright/test');
for(const lang of ['pt','en','es','fr','he']){
 test('Pastel da Praia food card, phone and Maps: '+lang,async({page})=>{
  await page.goto('/servicos/',{waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>document.querySelectorAll('#services-page-grid article').length>0);
  await page.evaluate(language=>setLanguage(language),lang);
  await page.locator('#services-category-select').selectOption('food');
  await expect(page.locator('#services-page-grid article')).toHaveCount(69);
  const card=page.locator('#services-page-grid article').filter({has:page.locator('h2',{hasText:'Pastel da Praia'})});
  await expect(card).toHaveCount(1);
  await expect(card).toContainText('Pastel da Praia');
  await expect(card.locator('a[href="tel:+5512991038877"]')).toHaveCount(1);
  const google=card.locator('a[href^="https://www.google.com/maps/search/"]');
  await expect(google).toHaveCount(1);
  const url=new URL(await google.getAttribute('href'));
  expect(url.searchParams.get('api')).toBe('1');
  expect(url.searchParams.get('query')).toContain('Pastel da Praia');
  expect(url.searchParams.get('query')).toContain('5987');
  await expect(card.locator('img')).toHaveCount(0);
  await expect(card.locator('a[href*="wa.me"],a[href*="instagram.com"]')).toHaveCount(0);
  const item=await page.evaluate(()=>servicesData.find(s=>s.id==='pastel-da-praia'));
  expect(item?.translations?.[lang]?.description?.length).toBeGreaterThan(90);
 });
}
