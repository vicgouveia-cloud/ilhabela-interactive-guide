const { test, expect } = require('@playwright/test');
const path = require('node:path');
const fs = require('node:fs');
const evidence = path.resolve(__dirname, '../../coracao-photo-evidence');
for (const width of [1440, 390]) {
  test(`Recovered Coracao photo at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    const response = await page.goto('/lugares/mirante-do-coracao/');
    expect(response.status()).toBe(200);
    const hero = page.locator('img.hero');
    await expect(hero).toHaveAttribute('src', '/assets/images/mirante-do-coracao_verified.jpg');
    await expect.poll(() => hero.evaluate(img => img.complete && img.naturalWidth)).toBe(1920);
    await expect(page.getByRole('link', { name: 'Louise Cristina Araujo Ferri · Wikimedia Commons' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'CC BY-SA 4.0' })).toBeVisible();
    await expect(page.locator('header').getByRole('link', { name: 'Explorar', exact: true })).toHaveAttribute('href', '/o-que-fazer/');
    await expect(page.getByRole('link', { name: 'Adicionar à Minha Viagem' })).toHaveAttribute('href', '/?spot=mirante-do-coracao&add=trip');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    expect(errors).toEqual([]);
    fs.mkdirSync(evidence, { recursive: true });
    await page.screenshot({ path: path.join(evidence, `after-${width}.png`), fullPage: true });
  });
}
