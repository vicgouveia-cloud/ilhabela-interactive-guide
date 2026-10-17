const { test, expect } = require('@playwright/test');

const mobilityShortcuts = ['all', 'mobility', 'taxi-point', 'public-transport', 'car-rental', 'bike-rental', 'coworking'];

for (const language of ['pt', 'en', 'es', 'fr', 'he']) {
  for (const width of [320, 390, 1440]) {
    test(`Practical mobility shortcuts and transit discovery in ${language} at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/servicos/', { waitUntil: 'domcontentloaded' });
      await page.waitForFunction(() => document.querySelectorAll('#services-page-grid article').length > 0);
      await page.evaluate(l => setLanguage(l), language);
      await expect(page.locator('html')).toHaveAttribute('dir', language === 'he' ? 'rtl' : 'ltr');

      const category = page.locator('#services-category-select');
      await category.selectOption('essentials');

      // Verify practical shortcuts group
      const chips = page.locator('[data-service-practical-shortcut]');
      await expect(chips).toHaveCount(7);
      await expect(page.locator('[data-service-practical-shortcut="all"]')).toHaveAttribute('aria-pressed', 'true');

      // 1. Mobility filter: matches all 13 mobility & transport options
      await page.locator('[data-service-practical-shortcut="mobility"]').click();
      await expect(page.locator('[data-service-practical-shortcut="mobility"]')).toHaveAttribute('aria-pressed', 'true');
      const practicalSelect = page.locator('#services-practical-filter');
      await expect(practicalSelect).toHaveValue('mobility');
      await expect(page.locator('#services-page-grid article')).toHaveCount(13);

      // 2. Official taxi stands
      await page.locator('[data-service-practical-shortcut="taxi-point"]').click();
      await expect(page.locator('[data-service-practical-shortcut="taxi-point"]')).toHaveAttribute('aria-pressed', 'true');
      await expect(practicalSelect).toHaveValue('taxi-point');
      const taxiResults = page.locator('#services-page-grid article');
      await expect(taxiResults).toHaveCount(2);
      for (const taxiName of ['Ponto de Táxi — Balsa (Barra Velha)', 'Ponto de Táxi — Vila (Centro Histórico)']) {
        const card = taxiResults.filter({ has: page.locator('h2', { hasText: taxiName }) });
        await expect(card).toHaveCount(1);
        await expect(card.locator('a[href^="tel:"]')).toHaveCount(1);
        await expect(card.locator('a[href^="https://www.google.com/maps/search/"]')).toHaveCount(1);
      }

      // 3. Public transport (bus, ferry, aquabus)
      await page.locator('[data-service-practical-shortcut="public-transport"]').click();
      await expect(page.locator('[data-service-practical-shortcut="public-transport"]')).toHaveAttribute('aria-pressed', 'true');
      await expect(practicalSelect).toHaveValue('public-transport');
      const transitResults = page.locator('#services-page-grid article');
      await expect(transitResults).toHaveCount(3);
      for (const transitName of ['Aquabus Ilhabela', 'Ônibus Municipal Expresso Fênix', 'Travessia de Balsa São Sebastião–Ilhabela']) {
        const card = transitResults.filter({ has: page.locator('h2', { hasText: transitName }) });
        await expect(card).toHaveCount(1);
        await expect(card.locator('a[href^="http"]').first()).toBeVisible();
      }

      // 4. Vehicle rentals (cars and motorcycles)
      await page.locator('[data-service-practical-shortcut="car-rental"]').click();
      await expect(page.locator('[data-service-practical-shortcut="car-rental"]')).toHaveAttribute('aria-pressed', 'true');
      await expect(practicalSelect).toHaveValue('car-rental');
      const rentalResults = page.locator('#services-page-grid article');
      await expect(rentalResults).toHaveCount(3);
      const jesseCard = rentalResults.filter({ has: page.locator('h2', { hasText: 'Jessé Locadora de Carros e Motos' }) });
      await expect(jesseCard).toHaveCount(1);
      await expect(jesseCard.locator('a[href*="jesselocadora.com.br"]')).toBeVisible();

      // 5. Coworking spaces
      await page.locator('[data-service-practical-shortcut="coworking"]').click();
      await expect(page.locator('[data-service-practical-shortcut="coworking"]')).toHaveAttribute('aria-pressed', 'true');
      await expect(practicalSelect).toHaveValue('coworking');
      await expect(page.locator('#services-page-grid article')).toHaveCount(3);

      // 6. Reset to all essentials via dropdown
      await practicalSelect.selectOption('all');
      await expect(page.locator('[data-service-practical-shortcut="all"]')).toHaveAttribute('aria-pressed', 'true');
      await expect(page.locator('#services-page-grid article')).toHaveCount(32);

      // Integrity checks
      await expect(page.locator('#services-page-grid')).not.toContainText('Rudá Destinos');
    });
  }
}
