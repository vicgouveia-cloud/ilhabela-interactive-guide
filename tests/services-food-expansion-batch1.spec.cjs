const { test, expect } = require('@playwright/test');
const path = require('node:path');

const batch1Names = [
  'Pescadora — Cozinha do Mar',
  'Restaurante Nova Iorqui',
  'Espaço Tangará',
  'Prainha do Julião Bar & Restaurante'
];

for (const language of ['pt', 'en', 'es', 'fr', 'he']) {
  for (const width of [320, 390, 1440]) {
    test(`SVC-FOOD-01A: batch 1 food expansion discovery in ${language} at ${width}px`, async ({ page }, testInfo) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/servicos/', { waitUntil: 'domcontentloaded' });
      await page.waitForFunction(() => document.querySelectorAll('#services-page-grid article').length > 0);
      await page.evaluate(l => setLanguage(l), language);
      await expect(page.locator('html')).toHaveAttribute('dir', language === 'he' ? 'rtl' : 'ltr');

      // 1. Navigate to food category
      const category = page.locator('#services-category-select');
      await category.selectOption('food');
      await expect(page.locator('#services-page-grid article')).toHaveCount(68);

      // 2. Verify all 4 batch 1 restaurants are present
      for (const name of batch1Names) {
        const card = page.locator('#services-page-grid article').filter({ has: page.locator('h2', { hasText: name, exact: true }) });
        await expect(card).toHaveCount(1);

        // Visual integrity: no unauthorized photo, clean SVG fallback
        await expect(card.locator('img')).toHaveCount(0);
        await expect(card.locator('.material-symbols-outlined', { hasText: 'restaurant' })).toBeVisible();

        // Neutrality: no recommended or featured badges
        await expect(card.locator('span.absolute.top-3.right-3')).toHaveCount(0);

        // Google Maps direction button must exist (all have verified physical addresses)
        await expect(card.locator('a[href^="https://www.google.com/maps/search/"]')).toHaveCount(1);

        // Buttons must be in grid-cols-2 with standard dimensions and canonical order
        const buttons = await card.locator('.grid.grid-cols-2 a').evaluateAll(nodes => nodes.map(el => {
          const rect = el.getBoundingClientRect();
          return {
            icon: el.querySelector('.material-symbols-outlined')?.textContent.trim(),
            className: el.className,
            width: rect.width,
            height: rect.height
          };
        }));
        expect(buttons.length).toBeGreaterThanOrEqual(3);
        expect(new Set(buttons.map(b => Math.round(b.width))).size).toBe(1);
        expect(new Set(buttons.map(b => Math.round(b.height))).size).toBe(1);
        expect(buttons.every(b => !b.className.includes('col-span-2'))).toBe(true);
        expect(buttons.at(-1).icon).toBe('map');
      }

      // 3. Verify specific contact links
      const pescadora = page.locator('#services-page-grid article').filter({ has: page.locator('h2', { hasText: 'Pescadora — Cozinha do Mar' }) });
      await expect(pescadora.locator('a[href="https://www.instagram.com/pescadoracozinhadomar/"]')).toHaveCount(1);
      await expect(pescadora.locator('a[href="tel:+551238962650"]')).toHaveCount(1);

      const novaiorqui = page.locator('#services-page-grid article').filter({ has: page.locator('h2', { hasText: 'Restaurante Nova Iorqui' }) });
      await expect(novaiorqui.locator('a[href="https://www.novaiorqui.com.br/"]')).toHaveCount(1);
      await expect(novaiorqui.locator('a[href="https://www.instagram.com/novaiorquiilhabela/"]')).toHaveCount(1);
      await expect(novaiorqui.locator('a[href^="https://wa.me/5512981784866"]')).toHaveCount(1);
      await expect(novaiorqui.locator('a[href="tel:+551238941833"]')).toHaveCount(1);

      const tangara = page.locator('#services-page-grid article').filter({ has: page.locator('h2', { hasText: 'Espaço Tangará' }) });
      await expect(tangara.locator('a[href="https://tangarailhabela.com.br/"]')).toHaveCount(1);
      await expect(tangara.locator('a[href="https://www.instagram.com/tangarailhabela/"]')).toHaveCount(1);
      await expect(tangara.locator('a[href^="https://wa.me/5512996428825"]')).toHaveCount(1);

      const juliao = page.locator('#services-page-grid article').filter({ has: page.locator('h2', { hasText: 'Prainha do Julião Bar & Restaurante' }) });
      await expect(juliao.locator('a[href="https://prainhadojuliao.com.br/"]')).toHaveCount(1);
      await expect(juliao.locator('a[href="https://www.instagram.com/prainhadojuliao/"]')).toHaveCount(1);
      await expect(juliao.locator('a[href^="https://wa.me/5512991810008"]')).toHaveCount(1);
      await expect(juliao.locator('a[href="tel:+551238941867"]')).toHaveCount(1);

      // 4. Test food shortcut filters
      // Kiosk shortcut: Prainha do Julião must appear
      await page.locator('[data-service-food-shortcut="kiosk"]').click();
      await expect(page.locator('#services-page-grid article').filter({ has: page.locator('h2', { hasText: 'Prainha do Julião Bar & Restaurante' }) })).toHaveCount(1);

      // Bar shortcut: Nova Iorqui, Tangará and Prainha do Julião must appear
      await page.locator('[data-service-food-shortcut="bar"]').click();
      for (const barName of ['Restaurante Nova Iorqui', 'Espaço Tangará', 'Prainha do Julião Bar & Restaurante']) {
        await expect(page.locator('#services-page-grid article').filter({ has: page.locator('h2', { hasText: barName }) })).toHaveCount(1);
      }

      // Restaurant shortcut: all 4 must appear
      await page.locator('[data-service-food-shortcut="restaurant"]').click();
      for (const rName of batch1Names) {
        await expect(page.locator('#services-page-grid article').filter({ has: page.locator('h2', { hasText: rName }) })).toHaveCount(1);
      }

      // Reset to all
      await page.locator('[data-service-food-shortcut="all"]').click();
      await expect(page.locator('#services-page-grid article')).toHaveCount(68);

      // 5. Visual screenshots for delivery artifacts
      if ((language === 'pt' || language === 'he') && (width === 390 || width === 1440)) {
        const shotName = `svc_food_01a_${width === 1440 ? 'desktop' : 'mobile'}_${language}.png`;
        await page.screenshot({ path: testInfo.outputPath(shotName), fullPage: false });
      }
    });
  }
}
