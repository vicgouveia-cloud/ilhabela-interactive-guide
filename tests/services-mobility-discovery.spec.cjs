const { test, expect } = require('@playwright/test');

for (const language of ['pt', 'en', 'es', 'fr', 'he']) {
  for (const width of [320, 390, 1440]) {
    test(`Standalone mobility and reorganized essentials in ${language} at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/servicos/', { waitUntil: 'domcontentloaded' });
      await page.waitForFunction(() => document.querySelectorAll('#services-page-grid article').length > 0);
      await page.evaluate(l => setLanguage(l), language);
      await expect(page.locator('html')).toHaveAttribute('dir', language === 'he' ? 'rtl' : 'ltr');

      // 0. Verify food shortcuts are preserved in food category
      const category = page.locator('#services-category-select');
      await category.selectOption('food');
      await expect(page.locator('[data-service-food-shortcut]')).toHaveCount(5);

      // ==========================================
      // 1. TOP-LEVEL MOBILITY CATEGORY
      // ==========================================
      await category.selectOption('mobility');
      await expect(category).toHaveValue('mobility');

      // Verify no redundant practical shortcuts
      await expect(page.locator('[data-service-practical-shortcut]')).toHaveCount(0);

      // Practical filter dropdown must NOT exist in mobility category
      await expect(page.locator('#services-practical-filter')).toHaveCount(0);

      // Direct Dropdown 2: Mobility Modality must exist directly
      const mobilitySelect = page.locator('#services-mobility-filter');
      await expect(mobilitySelect).toBeVisible();
      await expect(mobilitySelect).toHaveValue('all');
      await expect(page.locator('#services-page-grid article')).toHaveCount(14);

      // 1.1 Modality: Táxis (2)
      await mobilitySelect.selectOption('taxi');
      await expect(mobilitySelect).toHaveValue('taxi');
      const taxiResults = page.locator('#services-page-grid article');
      await expect(taxiResults).toHaveCount(2);
      for (const taxiName of ['Ponto de Táxi — Balsa (Barra Velha)', 'Ponto de Táxi — Vila (Centro Histórico)']) {
        const card = taxiResults.filter({ has: page.locator('h2', { hasText: taxiName }) });
        await expect(card).toHaveCount(1);
        await expect(card.locator('a[href^="tel:"]')).toHaveCount(0);
        await expect(card.locator('a[href*="maps"]')).toHaveCount(0);
        await expect(card.locator('p')).toContainText('0800 770 5221');
      }

      // 1.2 Modality: Ônibus (1)
      await mobilitySelect.selectOption('bus');
      await expect(mobilitySelect).toHaveValue('bus');
      const busResults = page.locator('#services-page-grid article');
      await expect(busResults).toHaveCount(1);
      await expect(busResults.locator('h2')).toContainText('Ônibus Municipal Expresso Fênix');
      await expect(busResults.locator('a[href*="maps"]')).toHaveCount(0);

      // 1.3 Modality: Balsa (1)
      await mobilitySelect.selectOption('ferry');
      await expect(mobilitySelect).toHaveValue('ferry');
      const ferryResults = page.locator('#services-page-grid article');
      await expect(ferryResults).toHaveCount(1);
      const balsaCard = ferryResults.filter({ has: page.locator('h2', { hasText: 'Travessia de Balsa São Sebastião–Ilhabela' }) });
      await expect(balsaCard).toHaveCount(1);
      await expect(balsaCard.locator('a[href*="semil.sp.gov.br/travessias"]')).toBeVisible();
      await expect(balsaCard.locator('a[href*="maps"]')).toHaveCount(1);

      // 1.4 Modality: Aquabus (1)
      await mobilitySelect.selectOption('aquabus');
      await expect(mobilitySelect).toHaveValue('aquabus');
      const aquaResults = page.locator('#services-page-grid article');
      await expect(aquaResults).toHaveCount(1);
      await expect(aquaResults.locator('h2')).toContainText('Aquabus Ilhabela');
      await expect(aquaResults.locator('a[href*="maps"]')).toHaveCount(0);

      // 1.5 Modality: Aluguel de carros e motos (3)
      await mobilitySelect.selectOption('car-rental');
      await expect(mobilitySelect).toHaveValue('car-rental');
      const carResults = page.locator('#services-page-grid article');
      await expect(carResults).toHaveCount(3);
      for (const carName of ['Jessé Locadora de Carros e Motos', 'Localiza — São Sebastião', 'NOVA Aluguel de Carros']) {
        const carCard = carResults.filter({ has: page.locator('h2', { hasText: carName }) });
        await expect(carCard).toHaveCount(1);
        await expect(carCard.locator('a[href*="maps"]')).toHaveCount(1);
      }
      const jesseCard = carResults.filter({ has: page.locator('h2', { hasText: 'Jessé Locadora de Carros e Motos' }) });
      const phoneLink = jesseCard.locator('a[href^="tel:"]');
      await expect(phoneLink).toHaveAttribute('dir', 'ltr');
      await expect(phoneLink.locator('span[dir="ltr"] bdi')).toBeVisible();

      // 1.6 Modality: Aluguel de bicicletas (3)
      await mobilitySelect.selectOption('bike-rental');
      await expect(mobilitySelect).toHaveValue('bike-rental');
      const bikeResults = page.locator('#services-page-grid article');
      await expect(bikeResults).toHaveCount(3);
      for (const bikeName of ['Caiçara Beach', 'Webtur', 'Easy Aluguel de Bike']) {
        const bikeCard = bikeResults.filter({ has: page.locator('h2', { hasText: bikeName }) });
        await expect(bikeCard).toHaveCount(1);
        await expect(bikeCard.locator('a[href*="maps"]')).toHaveCount(1);
      }

      // 1.7 Modality: Transfers (1)
      await mobilitySelect.selectOption('transfer');
      await expect(mobilitySelect).toHaveValue('transfer');
      const transferResults = page.locator('#services-page-grid article');
      await expect(transferResults).toHaveCount(1);
      await expect(transferResults.locator('h2')).toContainText('Transfer Executivo — Aeroportos e Litoral');
      await expect(transferResults.locator('a[href*="maps"]')).toHaveCount(0);

      // 1.8 Modality: Transporte por aplicativo (2: Fast Go Drive + Orientações)
      await mobilitySelect.selectOption('app-transport');
      await expect(mobilitySelect).toHaveValue('app-transport');
      const appResults = page.locator('#services-page-grid article');
      await expect(appResults).toHaveCount(2);

      // Check Fast Go Drive card
      const fastGoCard = appResults.filter({ has: page.locator('h2', { hasText: 'Fast Go Drive' }) });
      await expect(fastGoCard).toHaveCount(1);
      // Must have official WebP image
      const fastGoImg = fastGoCard.locator('img[src*="fast-go-drive_oficial.webp"]');
      await expect(fastGoImg).toHaveCount(1);
      await expect(fastGoImg).toBeVisible();
      // Must have recommended badge
      const recommendedText = { pt: 'Recomendado', en: 'Recommended', fr: 'Recommandé', es: 'Recomendado', he: 'מומלץ' }[language];
      await expect(fastGoCard.locator('span', { hasText: recommendedText })).toBeVisible();
      // Must have Website action
      await expect(fastGoCard.locator('a[href="https://fastgodrive.com.br/"]')).toBeVisible();
      // Must have Instagram action
      await expect(fastGoCard.locator('a[href*="instagram.com/fastgodrive_"]')).toBeVisible();
      // Must have WhatsApp action
      await expect(fastGoCard.locator('a[href*="wa.me/5512981879636"]')).toBeVisible();
      // Must have phone action with dir="ltr"
      const fastGoPhone = fastGoCard.locator('a[href="tel:+5512981879636"]');
      await expect(fastGoPhone).toHaveAttribute('dir', 'ltr');
      // Must have direct iOS app link
      const fastGoIos = fastGoCard.locator('a[href="https://apps.apple.com/br/app/fast-go-drive-passageiro/id6443738440"]');
      await expect(fastGoIos).toBeVisible();
      await expect(fastGoIos).toContainText('iPhone');
      // Must have direct Android app link
      const fastGoAndroid = fastGoCard.locator('a[href="https://play.google.com/store/apps/details?id=br.pass.appfastgodriver"]');
      await expect(fastGoAndroid).toBeVisible();
      await expect(fastGoAndroid).toContainText('Android');
      // Must have exactly 6 symmetrical actions in the 2-column grid
      await expect(fastGoCard.locator('.grid a')).toHaveCount(6);
      // Must NOT have Google Maps button
      await expect(fastGoCard.locator('a[href*="maps"]')).toHaveCount(0);

      // Check Orientações card
      const infoCard = appResults.filter({ has: page.locator('h2', { hasText: 'Transporte por Aplicativo — Orientações' }) });
      await expect(infoCard).toHaveCount(1);
      await expect(infoCard.locator('a[href*="maps"]')).toHaveCount(0);
      await expect(infoCard.locator('p')).toContainText('Fast Go Drive');
      await expect(infoCard.locator('p')).not.toContainText('Caiçara Driver');
      await expect(infoCard.locator('p')).not.toContainText('Woptin');

      // 1.9 Reset Modality to 'all'
      await mobilitySelect.selectOption('all');
      await expect(page.locator('#services-page-grid article')).toHaveCount(14);

      // 1.10 Proximity check for Barra Velha services in mobility: no fake distance, no disappearance
      await page.evaluate(() => {
        navigator.geolocation.getCurrentPosition = (success) => {
          success({ coords: { latitude: -23.7789, longitude: -45.3589 } });
        };
      });
      await page.locator('#services-nearby').click();
      await expect(page.locator('#services-page-grid article')).toHaveCount(14);
      for (const bvName of ['Jessé Locadora de Carros e Motos', 'Ponto de Táxi — Balsa (Barra Velha)', 'NOVA Aluguel de Carros', 'Travessia de Balsa São Sebastião–Ilhabela', 'Fast Go Drive']) {
        const card = page.locator('#services-page-grid article').filter({ has: page.locator('h2', { hasText: bvName }) });
        await expect(card).toHaveCount(1);
        await expect(card.locator('p.text-secondary')).toHaveCount(0);
      }

      // ==========================================
      // 2. REORGANIZED ESSENTIALS CATEGORY
      // ==========================================
      await category.selectOption('essentials');
      await expect(category).toHaveValue('essentials');

      // Mobility select must disappear, practical select must appear
      await expect(page.locator('#services-mobility-filter')).toHaveCount(0);
      const practicalSelect = page.locator('#services-practical-filter');
      await expect(practicalSelect).toBeVisible();
      await expect(practicalSelect).toHaveValue('all');

      // Mobility option must NOT be inside practicalSelect
      await expect(practicalSelect.locator('option[value="mobility"]')).toHaveCount(0);

      // Total practical services = 19
      await expect(page.locator('#services-page-grid article')).toHaveCount(19);

      // 2.1 Practical: Coworking (3)
      await practicalSelect.selectOption('coworking');
      await expect(practicalSelect).toHaveValue('coworking');
      await expect(page.locator('#services-page-grid article')).toHaveCount(3);
      for (const cw of ['Vila Hub', 'Blue Cowork Ilhabela', 'Reserva Ilhabela — Coworking']) {
        await expect(page.locator('#services-page-grid article').filter({ has: page.locator('h2', { hasText: cw }) })).toHaveCount(1);
      }

      // 2.2 Practical: Saúde e emergência (4)
      await practicalSelect.selectOption('health');
      await expect(practicalSelect).toHaveValue('health');
      await expect(page.locator('#services-page-grid article')).toHaveCount(4);
      for (const healthName of ['Hospital Municipal Governador Mário Covas Jr.', 'Farma Ponte — Vila', 'Farma Ponte — Barra Velha', 'Drogaria São Paulo — Perequê']) {
        await expect(page.locator('#services-page-grid article').filter({ has: page.locator('h2', { hasText: healthName }) })).toHaveCount(1);
      }

      // 2.3 Practical: Lavanderias (3)
      await practicalSelect.selectOption('laundry');
      await expect(practicalSelect).toHaveValue('laundry');
      await expect(page.locator('#services-page-grid article')).toHaveCount(3);
      for (const laundryName of ['Bubble Box Lavanderia Self Service', 'Lavanderia Lavaki Ilhabela 24h', 'Lavanderia Lavô Ilhabela Sul']) {
        await expect(page.locator('#services-page-grid article').filter({ has: page.locator('h2', { hasText: laundryName }) })).toHaveCount(1);
      }

      // 2.4 Practical: Apoio náutico e marinas (2)
      await practicalSelect.selectOption('nautical');
      await expect(practicalSelect).toHaveValue('nautical');
      await expect(page.locator('#services-page-grid article')).toHaveCount(2);
      for (const marinaName of ['Marina Porto Ilhabela', 'Centro Náutico Ilhabela']) {
        await expect(page.locator('#services-page-grid article').filter({ has: page.locator('h2', { hasText: marinaName }) })).toHaveCount(1);
      }

      // 2.5 Practical: Supermercados e conveniência (4)
      await practicalSelect.selectOption('supermarket');
      await expect(practicalSelect).toHaveValue('supermarket');
      await expect(page.locator('#services-page-grid article')).toHaveCount(4);
      for (const supName of ['Supermercado do Frade — Perequê', 'Supermercados Minimaxx', 'Supermercado Colina — Barra Velha', 'Adega da Mica']) {
        await expect(page.locator('#services-page-grid article').filter({ has: page.locator('h2', { hasText: supName }) })).toHaveCount(1);
      }

      // 2.6 Practical: Informações turísticas (2)
      await practicalSelect.selectOption('tourist-info');
      await expect(practicalSelect).toHaveValue('tourist-info');
      await expect(page.locator('#services-page-grid article')).toHaveCount(2);
      for (const citName of ['Centro de Informações Turísticas — Barra Velha', 'Centro de Informações Turísticas — Vila']) {
        await expect(page.locator('#services-page-grid article').filter({ has: page.locator('h2', { hasText: citName }) })).toHaveCount(1);
      }

      // 2.7 Practical: Aluguel de equipamentos (1)
      await practicalSelect.selectOption('equipment');
      await expect(practicalSelect).toHaveValue('equipment');
      await expect(page.locator('#services-page-grid article')).toHaveCount(1);
      await expect(page.locator('#services-page-grid article h2')).toContainText('BL3 Armação — Aluguel de Equipamentos');

      // 2.8 Reset Practical to 'all'
      await practicalSelect.selectOption('all');
      await expect(page.locator('#services-page-grid article')).toHaveCount(19);

      // Integrity checks
      await expect(page.locator('#services-page-grid')).not.toContainText('Rudá Destinos');
    });
  }
}
