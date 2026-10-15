const { test, expect } = require('@playwright/test');

const castelhanosExpected = [
  {
    image: 'assets/images/baia-de-castelhanos_verified.jpg',
    author: 'João Vitor Oliveira Martins',
    source: 'https://commons.wikimedia.org/wiki/File:Praia_de_Castelhanos_-_Ilhabela_-_SP.jpg',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    adaptation: {
      pt: 'Imagem redimensionada.',
      en: 'Resized image.',
      he: 'תמונה שונה בגודלה.'
    }
  },
  {
    image: 'assets/images/baia-de-castelhanos_verified_2.jpg',
    author: 'João Vitor Oliveira Martins',
    source: 'https://commons.wikimedia.org/wiki/File:Castelhanos_-_Ilhabela_-_sp.jpg',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    adaptation: {
      pt: 'Imagem redimensionada.',
      en: 'Resized image.',
      he: 'תמונה שונה בגודלה.'
    }
  },
  {
    image: 'assets/images/mirante-do-coracao_verified.jpg',
    author: 'Louise Cristina Araujo Ferri',
    source: 'https://commons.wikimedia.org/wiki/File:Mirante_do_Cora%C3%A7%C3%A3o_-_Praia_de_Castelhanos.jpg',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    adaptation: {
      pt: 'Imagem redimensionada.',
      en: 'Resized image.',
      he: 'תמונה שונה בגודלה.'
    }
  }
];

const boneteExpected = [
  {
    image: 'assets/images/praia-do-bonete_verified.jpg',
    author: 'Jcornelius',
    source: 'https://commons.wikimedia.org/wiki/File:Praia_do_Bonete,_Ilhabela,_2021.jpg',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    adaptation: {
      pt: 'Imagem redimensionada.',
      en: 'Resized image.',
      he: 'תמונה שונה בגודלה.'
    }
  },
  {
    image: 'assets/images/praia-do-bonete_verified_2.jpg',
    author: 'Eduardofebronio',
    source: 'https://commons.wikimedia.org/wiki/File:Praia_do_Bonete_-_Ilhabela.jpg',
    license: 'CC BY-SA 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    adaptation: {
      pt: 'Imagem redimensionada.',
      en: 'Resized image.',
      he: 'תמונה שונה בגודלה.'
    }
  },
  {
    image: 'assets/images/praia-do-bonete_verified_3.jpg',
    author: 'florent1024',
    source: 'https://commons.wikimedia.org/wiki/File:Bonete,_Ilhabela_-_SP,_Brazil_-_panoramio.jpg',
    license: 'CC BY-SA 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    adaptation: {
      pt: 'Imagem redimensionada.',
      en: 'Resized image.',
      he: 'תמונה שונה בגודלה.'
    }
  }
];

async function verifyAttributionState(modal, expected, lang = 'pt') {
  await expect(modal.locator('#modal-main-img')).toHaveAttribute('src', expected.image);

  const creditLink = modal.locator('#modal-photo-credit');
  await expect(creditLink).toBeVisible();
  await expect(creditLink).toHaveAttribute('href', expected.source);
  await expect(creditLink).toContainText(expected.author);

  const licenseEl = modal.locator('#modal-photo-license');
  await expect(licenseEl).toBeVisible();
  await expect(licenseEl.getByRole('link', { name: expected.license })).toHaveAttribute('href', expected.licenseUrl);
  await expect(licenseEl).toContainText(expected.author);
  if (expected.adaptation && expected.adaptation[lang]) {
    await expect(licenseEl).toContainText(expected.adaptation[lang]);
  }
}

test.describe('Castelhanos and Bonete Photo Gallery Attributions', () => {
  test('Baía de Castelhanos: 3 images thumbnail navigation, attributions and adaptations', async ({ page }) => {
    await page.goto('/?spot=baia-de-castelhanos', { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => setLanguage('pt'));
    const modal = page.locator('#spot-modal');
    await expect(modal).toBeVisible();

    const thumbs = modal.locator('.modal-thumb-btn');
    await expect(thumbs).toHaveCount(3);

    // Initial image (index 0)
    await verifyAttributionState(modal, castelhanosExpected[0], 'pt');

    // Click thumbnail 1
    await thumbs.nth(1).click();
    await verifyAttributionState(modal, castelhanosExpected[1], 'pt');

    // Click thumbnail 2
    await thumbs.nth(2).click();
    await verifyAttributionState(modal, castelhanosExpected[2], 'pt');

    // Navigate back to 0
    await thumbs.nth(0).click();
    await verifyAttributionState(modal, castelhanosExpected[0], 'pt');
  });

  test('Praia do Bonete: 3 images arrow navigation, attributions and adaptations', async ({ page }) => {
    await page.goto('/?spot=praia-do-bonete', { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => setLanguage('pt'));
    const modal = page.locator('#spot-modal');
    await expect(modal).toBeVisible();

    const nextBtn = modal.locator('button[aria-label="Próxima foto"]');
    const prevBtn = modal.locator('button[aria-label="Foto anterior"]');

    // Image 0 initially
    await verifyAttributionState(modal, boneteExpected[0], 'pt');

    // Next arrow -> Image 1
    await nextBtn.click();
    await verifyAttributionState(modal, boneteExpected[1], 'pt');

    // Next arrow -> Image 2
    await nextBtn.click();
    await verifyAttributionState(modal, boneteExpected[2], 'pt');

    // Next arrow -> wrap around to Image 0
    await nextBtn.click();
    await verifyAttributionState(modal, boneteExpected[0], 'pt');

    // Prev arrow -> wrap around to Image 2
    await prevBtn.click();
    await verifyAttributionState(modal, boneteExpected[2], 'pt');
  });

  test('Language switching preserves attributions, updates adaptations and supports Hebrew RTL', async ({ page }) => {
    await page.goto('/?spot=baia-de-castelhanos', { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => setLanguage('pt'));
    const modal = page.locator('#spot-modal');
    await expect(modal).toBeVisible();

    // Verify PT
    await verifyAttributionState(modal, castelhanosExpected[0], 'pt');
    await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');

    // Switch to EN
    await page.evaluate(() => setLanguage('en'));
    await verifyAttributionState(modal, castelhanosExpected[0], 'en');
    await expect(modal.locator('#modal-photo-credit')).toContainText('Photo: João Vitor Oliveira Martins');
    await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');

    // Switch to HE (RTL)
    await page.evaluate(() => setLanguage('he'));
    await verifyAttributionState(modal, castelhanosExpected[0], 'he');
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');

    // Navigate in HE to image 1
    const thumbs = modal.locator('.modal-thumb-btn');
    await thumbs.nth(1).click();
    await verifyAttributionState(modal, castelhanosExpected[1], 'he');
  });

  test('Safe fallback for galleries without individual secondary attributions', async ({ page }) => {
    await page.goto('/?spot=praia-da-fome', { waitUntil: 'domcontentloaded' });
    const modal = page.locator('#spot-modal');
    await expect(modal).toBeVisible();

    // Image 0 has credit
    await expect(modal.locator('#modal-photo-credit')).toBeVisible();

    // Image 1 thumbnail click
    const thumbs = modal.locator('.modal-thumb-btn');
    await thumbs.nth(1).click();

    // Credit and license should be hidden to avoid misattribution
    await expect(modal.locator('#modal-photo-credit')).toBeHidden();
    await expect(modal.locator('#modal-photo-license')).toBeHidden();
  });
});
