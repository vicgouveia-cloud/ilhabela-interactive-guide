const { test, expect } = require('@playwright/test');

for (const language of ['pt', 'en', 'es', 'fr', 'he']) {
  for (const width of [320, 390, 1440]) {
    test(`Practical 3-dropdown mobility hierarchy in ${language} at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/servicos/', { waitUntil: 'domcontentloaded' });
      await page.waitForFunction(() => document.querySelectorAll('#services-page-grid article').length > 0);
      await page.evaluate(l => setLanguage(l), language);
      await expect(page.locator('html')).toHaveAttribute('dir', language === 'he' ? 'rtl' : 'ltr');

      // 0. Verify food shortcuts are preserved in food category
      const category = page.locator('#services-category-select');
      await category.selectOption('food');
      await expect(page.locator('[data-service-food-shortcut]')).toHaveCount(5);

      // 1. Switch to Essentials category
      await category.selectOption('essentials');

      // Verify redundant practical shortcuts are removed
      await expect(page.locator('[data-service-practical-shortcut]')).toHaveCount(0);

      // Verify Dropdown 2 (practical service group) exists
      const practicalSelect = page.locator('#services-practical-filter');
      await expect(practicalSelect).toBeVisible();
      await expect(practicalSelect).toHaveValue('all');

      // Dropdown 3 (mobility modality) must NOT be present when practicalFilter is 'all'
      await expect(page.locator('#services-mobility-filter')).toHaveCount(0);
      await expect(page.locator('#services-page-grid article')).toHaveCount(32);

      // 2. Filter by Coworking in Dropdown 2
      await practicalSelect.selectOption('coworking');
      await expect(practicalSelect).toHaveValue('coworking');
      await expect(page.locator('#services-mobility-filter')).toHaveCount(0);
      await expect(page.locator('#services-page-grid article')).toHaveCount(3);
      for (const cw of ['Vila Hub', 'Blue Cowork Ilhabela', 'Reserva Ilhabela — Coworking']) {
        await expect(page.locator('#services-page-grid article').filter({ has: page.locator('h2', { hasText: cw }) })).toHaveCount(1);
      }

      // 3. Select Mobility in Dropdown 2
      await practicalSelect.selectOption('mobility');
      await expect(practicalSelect).toHaveValue('mobility');
      await expect(page.locator('#services-page-grid article')).toHaveCount(13);

      // Dropdown 3 must now appear and have 'all' selected
      const mobilitySelect = page.locator('#services-mobility-filter');
      await expect(mobilitySelect).toBeVisible();
      await expect(mobilitySelect).toHaveValue('all');

      // 4. Modality: Táxis (2)
      await mobilitySelect.selectOption('taxi');
      await expect(mobilitySelect).toHaveValue('taxi');
      const taxiResults = page.locator('#services-page-grid article');
      await expect(taxiResults).toHaveCount(2);
      for (const taxiName of ['Ponto de Táxi — Balsa (Barra Velha)', 'Ponto de Táxi — Vila (Centro Histórico)']) {
        const card = taxiResults.filter({ has: page.locator('h2', { hasText: taxiName }) });
        await expect(card).toHaveCount(1);
        // Phone numbers removed: must NOT have tel: link
        await expect(card.locator('a[href^="tel:"]')).toHaveCount(0);
        // Google Maps omitted in the absence of an unequivocal Google Maps destination
        await expect(card.locator('a[href*="maps"]')).toHaveCount(0);
        // Description references official support channel
        await expect(card.locator('p')).toContainText('0800 770 5221');
      }

      // 5. Modality: Ônibus (1)
      await mobilitySelect.selectOption('bus');
      await expect(mobilitySelect).toHaveValue('bus');
      const busResults = page.locator('#services-page-grid article');
      await expect(busResults).toHaveCount(1);
      await expect(busResults.locator('h2')).toContainText('Ônibus Municipal Expresso Fênix');
      await expect(busResults.locator('a[href*="maps"]')).toHaveCount(0);

      // 6. Modality: Balsa (1)
      await mobilitySelect.selectOption('ferry');
      await expect(mobilitySelect).toHaveValue('ferry');
      const ferryResults = page.locator('#services-page-grid article');
      await expect(ferryResults).toHaveCount(1);
      const balsaCard = ferryResults.filter({ has: page.locator('h2', { hasText: 'Travessia de Balsa São Sebastião–Ilhabela' }) });
      await expect(balsaCard).toHaveCount(1);
      await expect(balsaCard.locator('a[href*="semil.sp.gov.br/travessias"]')).toBeVisible();
      await expect(balsaCard.locator('a[href*="maps"]')).toHaveCount(1);

      // 7. Modality: Aquabus (1)
      await mobilitySelect.selectOption('aquabus');
      await expect(mobilitySelect).toHaveValue('aquabus');
      const aquaResults = page.locator('#services-page-grid article');
      await expect(aquaResults).toHaveCount(1);
      await expect(aquaResults.locator('h2')).toContainText('Aquabus Ilhabela');
      await expect(aquaResults.locator('a[href*="maps"]')).toHaveCount(0);

      // 8. Modality: Aluguel de carros e motos (3)
      await mobilitySelect.selectOption('car-rental');
      await expect(mobilitySelect).toHaveValue('car-rental');
      const carResults = page.locator('#services-page-grid article');
      await expect(carResults).toHaveCount(3);
      for (const carName of ['Jessé Locadora de Carros e Motos', 'Localiza — São Sebastião', 'NOVA Aluguel de Carros']) {
        const carCard = carResults.filter({ has: page.locator('h2', { hasText: carName }) });
        await expect(carCard).toHaveCount(1);
        await expect(carCard.locator('a[href*="maps"]')).toHaveCount(1);
      }
      // Check phone formatting has dir="ltr"
      const jesseCard = carResults.filter({ has: page.locator('h2', { hasText: 'Jessé Locadora de Carros e Motos' }) });
      const phoneLink = jesseCard.locator('a[href^="tel:"]');
      await expect(phoneLink).toHaveAttribute('dir', 'ltr');
      await expect(phoneLink.locator('span[dir="ltr"] bdi')).toBeVisible();

      // 9. Modality: Aluguel de bicicletas (3)
      await mobilitySelect.selectOption('bike-rental');
      await expect(mobilitySelect).toHaveValue('bike-rental');
      const bikeResults = page.locator('#services-page-grid article');
      await expect(bikeResults).toHaveCount(3);
      for (const bikeName of ['Caiçara Beach', 'Webtur', 'Easy Aluguel de Bike']) {
        const bikeCard = bikeResults.filter({ has: page.locator('h2', { hasText: bikeName }) });
        await expect(bikeCard).toHaveCount(1);
        await expect(bikeCard.locator('a[href*="maps"]')).toHaveCount(1);
      }

      // 10. Modality: Transfers (1)
      await mobilitySelect.selectOption('transfer');
      await expect(mobilitySelect).toHaveValue('transfer');
      const transferResults = page.locator('#services-page-grid article');
      await expect(transferResults).toHaveCount(1);
      await expect(transferResults.locator('h2')).toContainText('Transfer Executivo — Aeroportos e Litoral');
      await expect(transferResults.locator('a[href*="maps"]')).toHaveCount(0);

      // 11. Modality: Transporte por aplicativo (1)
      await mobilitySelect.selectOption('app-transport');
      await expect(mobilitySelect).toHaveValue('app-transport');
      const appResults = page.locator('#services-page-grid article');
      await expect(appResults).toHaveCount(1);
      await expect(appResults.locator('h2')).toContainText('Transporte por Aplicativo — Orientações');
      await expect(appResults.locator('a[href*="maps"]')).toHaveCount(0);
      await expect(appResults.locator('p')).toContainText('Fast Go Drive');
      await expect(appResults.locator('p')).not.toContainText('Caiçara Driver');
      await expect(appResults.locator('p')).not.toContainText('Woptin');

      // 12. Reset Modality to 'all'
      await mobilitySelect.selectOption('all');
      await expect(page.locator('#services-page-grid article')).toHaveCount(13);

      // 13. Reset Practical to 'all'
      await practicalSelect.selectOption('all');
      await expect(page.locator('#services-page-grid article')).toHaveCount(32);
      // 14. Proximity check for Barra Velha services: no fake distance, no disappearance
      await practicalSelect.selectOption('mobility');
      await page.evaluate(() => {
        navigator.geolocation.getCurrentPosition = (success) => {
          success({ coords: { latitude: -23.7789, longitude: -45.3589 } });
        };
      });
      await page.locator('#services-nearby').click();
      await expect(page.locator('#services-page-grid article')).toHaveCount(13);
      for (const bvName of ['Jessé Locadora de Carros e Motos', 'Ponto de Táxi — Balsa (Barra Velha)', 'NOVA Aluguel de Carros', 'Travessia de Balsa São Sebastião–Ilhabela']) {
        const card = page.locator('#services-page-grid article').filter({ has: page.locator('h2', { hasText: bvName }) });
        await expect(card).toHaveCount(1);
        // Must NOT show fake distance badge
        await expect(card.locator('p.text-secondary')).toHaveCount(0);
      }

      // Integrity checks
      await expect(page.locator('#services-page-grid')).not.toContainText('Rudá Destinos');
    });
  }
}
