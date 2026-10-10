const { test, expect } = require('@playwright/test');
const fs = require('node:fs');
const path = require('node:path');
for (const width of [390, 1440]) for (const lang of ['pt', 'en', 'es', 'fr', 'he']) {
  test(`golden tips ${lang} ${width}`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await page.waitForFunction(() => typeof openSpotModal === 'function' && typeof setLanguage === 'function');
    await page.evaluate(lang => setLanguage(lang), lang);
    await expect(page.locator('html')).toHaveAttribute('dir', lang === 'he' ? 'rtl' : 'ltr');
    const spots = await page.evaluate(() => touristSpots.map(s => ({ id: s.id, tip: getSpotTranslation(s).ecoTip })));
    expect(spots).toHaveLength(50);
    for (const spot of spots) {
      await page.evaluate(id => openSpotModal(id), spot.id);
      const section = page.locator('[data-golden-tip]');
      await expect(section).toHaveCount(spot.tip ? 1 : 0);
      if (spot.tip) await expect(section.locator('p')).toHaveText(spot.tip);
      await expect(page.locator('#spot-modal-content')).not.toContainText(await page.evaluate(() => t('repellentTipText')));
      expect(await page.locator('#spot-modal .modal-sheet').evaluate(el => el.scrollWidth <= el.clientWidth + 1), spot.id).toBe(true);
    }
    for (const id of ['praia-do-juliao', 'praia-do-curral']) {
      await page.evaluate(id => openSpotModal(id), id);
      if (id === 'praia-do-juliao') await page.locator('[data-golden-tip]').scrollIntoViewIfNeeded();
      const folder = path.resolve(__dirname, '../../golden-tips-evidence');
      fs.mkdirSync(folder, { recursive: true });
      await page.screenshot({ path: path.join(folder, `${id}-${lang}-${width}.png`) });
    }
  });
}
