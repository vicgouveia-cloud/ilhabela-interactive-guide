const {test, expect} = require('@playwright/test');

test('Portinho is the only recommended compatible boat operator for Bonete', async ({page}) => {
  await page.goto('/');
  await page.waitForFunction(() => typeof getMaritimeOptionsForSpot === 'function');
  const result = await page.evaluate(() => ({
    candidates: getMaritimeOptionsForSpot('praia-do-bonete')
      .flatMap(option => option.providers.map(provider => provider.id)),
    portinho: servicesData.find(service => service.id === 'portinho-passeios'),
    hotel: servicesData.find(service => service.id === 'la-gloria-house')
  }));
  expect(result.portinho.featured).toBe(true);
  expect(result.portinho.serviceArea.verifiedModes).toContain('boat');
  expect(result.candidates).toEqual(['portinho-passeios']);
  expect(result.hotel.featured).toBe(true);
  expect(result.candidates).not.toContain('la-gloria-house');
});

for (const lang of ['pt', 'en', 'es', 'fr', 'he']) {
  test(`desktop trip navigation opens existing planner in ${lang}`, async ({page}) => {
    await page.setViewportSize({width:1440,height:900});
    await page.goto('/');
    await page.evaluate(value=>setLanguage(value),lang);
    const trip=page.locator('nav.lg\\:flex a[href="/?view=trip"]');
    await expect(trip).toBeVisible();
    await expect(trip).toHaveText(await page.evaluate(()=>t('navTrip')));
    await expect(page.locator('nav.lg\\:flex a[href="#guides-section"]')).toHaveCount(0);
    await trip.click();
    await expect(page.locator('#planner-modal')).toBeVisible();
    await expect(page.locator('html')).toHaveAttribute('dir',lang==='he'?'rtl':'ltr');
  });
}

test('mobile keeps bottom navigation without duplicated desktop links',async({page})=>{
  await page.setViewportSize({width:390,height:844});
  await page.goto('/');
  await expect(page.locator('nav.lg\\:flex a[href="/?view=trip"]')).toBeHidden();
  await expect(page.locator('#bottom-nav a[href="/?view=trip"]')).toBeVisible();
});
