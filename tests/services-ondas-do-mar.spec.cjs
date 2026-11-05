const {test, expect} = require('@playwright/test');
for (const lang of ['pt', 'en', 'fr', 'es', 'he']) for (const width of [390, 1440]) {
  test(`Ondas do Mar accommodation only ${lang} ${width}`, async ({page}) => {
    await page.setViewportSize({width, height: 900});
    await page.goto('/servicos/');
    await page.waitForFunction(() => typeof servicesData !== 'undefined');
    await page.evaluate(language => setLanguage(language), lang);
    const cards = page.locator('#services-page-grid article');
    const ondas = cards.filter({has: page.getByRole('heading', {name: 'Suites Ondas do Mar', exact: true})});
    await expect(cards).toHaveCount(130);
    await page.locator('#services-category-select').selectOption('stay');
    await expect(ondas).toHaveCount(1);
    await expect(ondas.locator('a[href="https://www.instagram.com/suitesondasdomar/"]')).toHaveCount(1);
    await expect(ondas.locator('a[href^="https://wa.me/"]')).toHaveCount(0);
    await expect(ondas.locator('img')).toHaveCount(0);
    const record = await page.evaluate(() => servicesData.find(service => service.id === 'ondas-do-mar'));
    expect(record.phone).toBe('12991264617');
    expect(record.translations[lang].description).not.toContain('??');
    for (const category of ['food', 'tour', 'experience', 'mobility', 'essentials', 'diving']) {
      await page.locator('#services-category-select').selectOption(category);
      await expect(ondas).toHaveCount(0);
      if (category === 'food') await expect(cards).toHaveCount(68);
    }
    await expect(page.locator('html')).toHaveAttribute('dir', lang === 'he' ? 'rtl' : 'ltr');
  });
}
