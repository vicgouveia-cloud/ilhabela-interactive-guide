const { test, expect } = require('@playwright/test');

async function visitWithLanguages(page, browserLanguages, storedLanguage = null, route = '/') {
  await page.addInitScript(({ browserLanguages, storedLanguage }) => {
    Object.defineProperty(navigator, 'languages', { configurable: true, get: () => browserLanguages });
    Object.defineProperty(navigator, 'language', { configurable: true, get: () => browserLanguages[0] || '' });
    if (!sessionStorage.getItem('__locale_test_setup')) {
      localStorage.removeItem('ilhabela_lang');
      if (storedLanguage !== null) localStorage.setItem('ilhabela_lang', storedLanguage);
      sessionStorage.setItem('__locale_test_setup', '1');
    }
  }, { browserLanguages, storedLanguage });
  await page.goto(route);
}

for (const [tag, expected] of [
  ['pt-BR', 'pt'],
  ['en-US', 'en'],
  ['es-AR', 'es'],
  ['fr-CA', 'fr'],
  ['he-IL', 'he'],
  ['de-DE', 'en']
]) {
  test(`first visit recognizes ${tag} -> ${expected}`, async ({ page }) => {
    await visitWithLanguages(page, [tag]);
    await expect(page.locator('html')).toHaveAttribute('lang', expected);
    await expect(page.locator('html')).toHaveAttribute('dir', expected === 'he' ? 'rtl' : 'ltr');
    await expect(page.locator('#current-lang-label')).toHaveText(expected.toUpperCase());
  });
}

test('uses first supported preference in browser priority order', async ({ page }) => {
  await visitWithLanguages(page, ['de-DE', 'fr-FR', 'en-US']);
  await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
});

test('stored preference takes priority over browser language and persists after change', async ({ page }) => {
  await visitWithLanguages(page, ['es-ES'], 'pt');
  await expect(page.locator('html')).toHaveAttribute('lang', 'pt');
  await page.evaluate(() => setLanguage('he'));
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('lang', 'he');
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
});

test('invalid saved preference falls back to browser and unsupported language to English', async ({ page }) => {
  await visitWithLanguages(page, ['en-GB'], 'xx');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
});

test('services directory inherits browser language on first visit', async ({ page }) => {
  await visitWithLanguages(page, ['en-US'], null, '/servicos/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('#current-lang-label')).toHaveText('EN');
});
