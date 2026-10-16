const { test, expect } = require('@playwright/test');
const fs = require('node:fs');
const path = require('node:path');
const names = ['pico-de-sao-sebastiao', 'cachoeira-da-laje', 'cachoeira-da-toca', 'mirante-do-coracao'];
for (const width of [390, 1440]) {
  test(`responsive images retain originals and transfer derivatives at ${width}px`, async ({ browser }) => {
    const context = await browser.newContext({viewport: {width, height: 900}, deviceScaleFactor: 1});
    const page = await context.newPage();
    for (const name of names) {
      const original = `/assets/images/${name}_verified.${name === 'cachoeira-da-toca' ? 'png' : 'jpg'}`;
      const requests = [];
      const record = request => { if (request.url().includes(name + '_verified')) requests.push(new URL(request.url()).pathname); };
      page.on('request', record);
      await page.goto(`/lugares/${name}/`);
      const hero = page.locator('img.hero');
      await expect(hero).toHaveAttribute('src', original);
      await hero.evaluate(img => img.decode());
      const selected = await hero.evaluate(img => img.currentSrc);
      expect(selected).toMatch(new RegExp(name + '_verified-\\d+w\\.webp$'));
      expect(requests).not.toContain(original);
      const transferred = await page.evaluate(url => performance.getEntriesByName(url).at(-1).encodedBodySize, selected);
      expect(transferred).toBe(fs.statSync(path.join(__dirname, '..', new URL(selected).pathname)).size);
      expect(transferred).toBeLessThan(fs.statSync(path.join(__dirname, '..', original)).size);
      await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', 'https://ilhabelatrip.com' + original);
      page.off('request', record);
    }
    await context.close();
  });
}
test('gallery clears responsive candidates when returning to an unoptimized photo', async ({page}) => {
  await page.goto('/?spot=baia-de-castelhanos');
  await expect(page.locator('#modal-main-img')).toBeVisible();
  await page.evaluate(() => setModalImage(2));
  await expect(page.locator('#modal-main-img')).toHaveAttribute('srcset', /mirante-do-coracao_verified/);
  await page.locator('#modal-main-img').evaluate(img => img.decode());
  expect(await page.locator('#modal-main-img').evaluate(img => img.currentSrc)).toMatch(/\.webp$/);
  await page.evaluate(() => setModalImage(0));
  await expect(page.locator('#modal-main-img')).not.toHaveAttribute('srcset');
  await expect(page.locator('#modal-main-img')).toHaveAttribute('src', 'assets/images/baia-de-castelhanos_verified.jpg');
  for (const lang of ['pt', 'en', 'es', 'fr', 'he']) {
    await page.evaluate(lang => setLanguage(lang), lang);
    await expect(page.locator('html')).toHaveAttribute('lang', lang);
    await expect(page.locator('html')).toHaveAttribute('dir', lang === 'he' ? 'rtl' : 'ltr');
    await expect(page.locator('#modal-photo-credit')).toBeVisible();
  }
});
