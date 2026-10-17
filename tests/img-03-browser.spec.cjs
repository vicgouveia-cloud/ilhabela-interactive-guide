const { test, expect } = require('@playwright/test');

const cases = [
  { id: 'poco-do-furado', file: 'poco-do-furado_sectur.webp', credit: 'Prefeitura de Ilhabela · Sectur Ilhabela' },
  { id: 'mirante-do-morro-da-cruz', file: 'mirante-do-morro-da-cruz_ilhabelacombr.webp', credit: 'Acervo Ilhabela.com.br' },
  { id: 'mirante-dos-barreiros', file: 'mirante-dos-barreiros_prefeitura.webp', credit: 'Prefeitura de Ilhabela · Sectur Ilhabela' }
];

for (const width of [320, 390, 1440]) {
  for (const lang of ['pt', 'en', 'es', 'fr', 'he']) {
    test(`IMG-03 final photos in guide and modal: ${lang} ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      await page.evaluate(lang => setLanguage(lang), lang);
      await expect(page.locator('html')).toHaveAttribute('dir', lang === 'he' ? 'rtl' : 'ltr');

      for (const { id, file, credit } of cases) {
        const card = page.locator('#spots-grid article').filter({ has: page.locator(`img[src$="${file}"]`) });
        await expect(card).toHaveCount(1);
        const cardImage = card.locator('img').first();
        await expect(cardImage).toHaveAttribute('src', `assets/images/${file}`);
        await cardImage.scrollIntoViewIfNeeded();
        await cardImage.evaluate(img => img.decode());
        const title = await page.evaluate(id => getSpotTranslation(touristSpots.find(s => s.id === id)).title, id);
        await expect(cardImage).toHaveAttribute('alt', title);

        await page.evaluate(id => openSpotModal(id), id);
        const img = page.locator('#modal-main-img');
        await expect(img).toHaveAttribute('src', `assets/images/${file}`);
        await img.evaluate(img => img.decode());
        await expect(img).toHaveAttribute('alt', title);
        await expect(page.locator('#modal-photo-credit')).toContainText(credit);
        await expect(page.locator('#modal-photo-license')).toBeHidden();
        await page.evaluate(() => closeSpotModal());
      }
    });
  }
}

for (const { id, file, credit } of cases) {
  test(`static SEO page for ${id} loads correct photo`, async ({ page }) => {
    await page.goto(`/lugares/${id}/`, { waitUntil: 'domcontentloaded' });
    const hero = page.locator('img.hero');
    await expect(hero).toHaveAttribute('src', `/assets/images/${file}`);
    await hero.evaluate(img => img.decode());
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', `https://ilhabelatrip.com/assets/images/${file}`);
    await expect(page.locator('main')).toContainText(credit);
  });
}

test('EN pilot page for mirante-do-morro-da-cruz loads correct photo and metadata', async ({ page }) => {
  await page.goto('/en/lugares/mirante-do-morro-da-cruz/', { waitUntil: 'domcontentloaded' });
  const hero = page.locator('img.hero');
  await expect(hero).toHaveAttribute('src', '/assets/images/mirante-do-morro-da-cruz_ilhabelacombr.webp');
  await hero.evaluate(img => img.decode());
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', 'https://ilhabelatrip.com/assets/images/mirante-do-morro-da-cruz_ilhabelacombr.webp');
});
