const { test, expect } = require('@playwright/test');

for (const locale of ['pt', 'en', 'es', 'fr', 'he']) {
  test(`recommended service stays first in category and all services: ${locale}`, async ({ page }) => {
    await page.goto('/servicos/');
    await page.waitForFunction(() => typeof window.renderServicesPage === 'function');
    await page.evaluate(lang => setLanguage(lang), locale);
    await expect(page.locator('#services-page-grid article').first()).toContainText('La Gloria House');

    await page.locator('#services-category-select').selectOption('stay');
    await expect(page.locator('#services-category-select')).toHaveValue('stay');
    await expect(page.locator('#services-page-grid article').first()).toContainText('La Gloria House');
    await expect(page.locator('html')).toHaveAttribute('dir', locale === 'he' ? 'rtl' : 'ltr');

    await page.locator('#services-category-select').selectOption('food');
    await expect(page.locator('#services-page-grid article').first()).not.toContainText('La Gloria House');
  });
}

test('featured sorting does not change order of ordinary services', async ({ page }) => {
  await page.goto('/servicos/');
  await page.waitForFunction(() => document.querySelectorAll('#services-page-grid article').length > 0);
  const actual = await page.locator('#services-page-grid article h2').allTextContents();
  const expected = await page.evaluate(() => [
    ...servicesData.filter(service => service.featured),
    ...servicesData.filter(service => !service.featured)
  ].map(service => service.name));
  expect(actual).toEqual(expected);
});

test('other categories retain filtering and selection after recommended sorting', async ({ page }) => {
  await page.goto('/servicos/');
  await page.locator('#services-category-select').selectOption('tour');
  await expect(page.locator('#services-category-select')).toHaveValue('tour');
  await page.locator('#services-tour-filter').selectOption('boat-tour');
  await expect(page.locator('#services-tour-filter')).toHaveValue('boat-tour');
  await expect(page.locator('#services-category-select')).toHaveValue('tour');
});
