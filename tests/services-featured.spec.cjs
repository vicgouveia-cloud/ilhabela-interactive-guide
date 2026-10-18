const { test, expect } = require('@playwright/test');

for (const locale of ['pt', 'en', 'es', 'fr', 'he']) {
  test(`recommended service stays first in category and all services: ${locale}`, async ({ page }) => {
    await page.goto('/servicos/');
    await page.waitForFunction(() => typeof window.renderServicesPage === 'function');
    await page.evaluate(lang => setLanguage(lang), locale);
    await expect(page.locator('#services-page-grid article').first()).toContainText('Portinho Passeios');

    await page.locator('#services-category-select').selectOption('stay');
    await expect(page.locator('#services-category-select')).toHaveValue('stay');
    await expect(page.locator('#services-page-grid article').first()).toContainText('La Gloria House');
    await expect(page.locator('html')).toHaveAttribute('dir', locale === 'he' ? 'rtl' : 'ltr');

    await page.locator('#services-category-select').selectOption('food');
    await expect(page.locator('#services-page-grid article').first()).not.toContainText('La Gloria House');
  });
}

test('recommended precedes featured-only; preserve source order within equal tiers', async ({ page }) => {
  await page.goto('/servicos/');
  await page.waitForFunction(() => document.querySelectorAll('#services-page-grid article').length > 0);
  const actual = await page.locator('#services-page-grid article h2').allTextContents();
  const expected = await page.evaluate(() => servicesData
    .map((service, index) => ({ service, index }))
    .sort((a, b) =>
      Number(Boolean(b.service.recommended)) - Number(Boolean(a.service.recommended)) ||
      Number(Boolean(b.service.featured)) - Number(Boolean(a.service.featured)) ||
      a.index - b.index
    ).map(({ service }) => service.name));
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

const recommendationLocales = ['pt', 'en', 'es', 'fr', 'he'];
for (const locale of recommendationLocales) {
  for (const width of [320, 390, 1440]) {
    test(`recommended appended to the source remains first-tier in all/food/mobility: ${locale} ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/servicos/', { waitUntil: 'domcontentloaded' });
      await page.waitForFunction(() => document.querySelectorAll('#services-page-grid article').length > 0);
      await page.evaluate(lang => setLanguage(lang), locale);
      await expect(page.locator('html')).toHaveAttribute('dir', locale === 'he' ? 'rtl' : 'ltr');

      // Reposition an existing ordinary entry at the end of canonical data
      // and mark it recommended; production data is untouched outside this test page.
      const target = await page.evaluate(() => {
        const item = [...servicesData].reverse().find(
          service => service.category === 'food' && !service.recommended && !service.featured
        );
        if (!item) throw new Error('No ordinary food entry available for priority regression');
        servicesData.splice(servicesData.indexOf(item), 1);
        item.recommended = true;
        servicesData.push(item);
        window.renderServicesPage();
        return item.name;
      });

      const assertRecommendationBlock = async () => {
        const recommendedFlags = await page.locator('#services-page-grid article').evaluateAll(cards =>
          cards.map(card => Boolean(card.querySelector('span.absolute.top-3.right-3')))
        );
        expect(recommendedFlags.length).toBeGreaterThan(0);
        // No ordinary card may precede a card with the Recomendado badge.
        expect(recommendedFlags).toEqual([...recommendedFlags].sort((a, b) => Number(b) - Number(a)));
      };
      const category = page.locator('#services-category-select');
      await assertRecommendationBlock();
      const allNames = await page.locator('#services-page-grid article h2').allTextContents();
      expect(allNames.indexOf(target)).toBeGreaterThanOrEqual(0);
      await category.selectOption('food');
      await assertRecommendationBlock();
      const foodNames = await page.locator('#services-page-grid article h2').allTextContents();
      expect(foodNames.indexOf(target)).toBeGreaterThanOrEqual(0);
      const foodFlags = await page.locator('#services-page-grid article').evaluateAll(cards =>
        cards.map(card => Boolean(card.querySelector('span.absolute.top-3.right-3')))
      );
      expect(foodFlags[foodNames.indexOf(target)]).toBe(true);
      expect(foodNames.indexOf(target)).toBeLessThan(foodFlags.filter(Boolean).length);

      // When the standalone mobility category from PR #23 is integrated,
      // also protect the Fast Go Drive result within its modal refinement.
      if (await category.locator('option[value="mobility"]').count()) {
        await category.selectOption('mobility');
        await assertRecommendationBlock();
        await page.locator('#services-mobility-filter').selectOption('app-transport');
        await assertRecommendationBlock();
        await expect(page.locator('#services-page-grid article').first()).toContainText('Fast Go Drive');
      }
    });
  }
}
