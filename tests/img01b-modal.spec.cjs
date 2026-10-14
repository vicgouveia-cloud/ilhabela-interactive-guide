const { test, expect } = require('@playwright/test');

const photos=[
  {id:'praia-do-pinto',image:'assets/images/praia-do-pinto_commons.webp'},
  {id:'praia-da-pacuiba',image:'assets/images/praia-da-pacuiba-costao_commons.webp'},
  {id:'cachoeira-do-poco-fundo',image:'assets/images/cachoeira-do-poco-fundo-acesso_commons.webp'}
];

for (const spot of photos) for (const width of [390,1440]) for (const lang of ['pt','he']) {
  test('IMG-01B '+spot.id+' '+lang+' '+width+'px', async ({page}) => {
    await page.setViewportSize({width,height:850});
    const browserErrors=[];
    page.on('pageerror',err=>browserErrors.push(err.message));
    await page.goto('/',{waitUntil:'domcontentloaded'});
    await page.waitForFunction(()=>typeof openSpotModal==='function' && typeof setLanguage==='function');
    await page.evaluate(([id,language])=>{setLanguage(language);openSpotModal(id);},[spot.id,lang]);
    const modal=page.locator('#spot-modal');
    await expect(modal).toBeVisible();
    await expect(modal.locator('#modal-main-img')).toHaveAttribute('src',spot.image);
    await expect.poll(()=>modal.locator('#modal-main-img').evaluate(img=>img.complete&&img.naturalWidth>0)).toBe(true);
    await expect(page.locator('html')).toHaveAttribute('dir',lang==='he'?'rtl':'ltr');
    const license=modal.locator('[data-photo-license]');
    await expect(license).toBeVisible();
    await expect(license.getByRole('link',{name:'CC BY-SA 4.0'})).toHaveAttribute('href','https://creativecommons.org/licenses/by-sa/4.0/');
    const caption=await page.evaluate(id=>{const spot=touristSpots.find(s=>s.id===id);return spot.photoCaption[currentLang];},spot.id);
    await expect(license).toContainText(caption);
    const creditLink=modal.locator('#modal-photo-credit');
    await expect(creditLink).toHaveAttribute('href',/commons\.wikimedia\.org\/wiki\/File:/);
    expect(browserErrors).toEqual([]);
  });
}

for(const spot of photos) {
  test('IMG-01B static SEO '+spot.id,async({page})=>{
    await page.goto('/lugares/'+spot.id+'/',{waitUntil:'domcontentloaded'});
    await expect(page.locator('img.hero')).toHaveAttribute('src','/'+spot.image);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content','https://ilhabelatrip.com/'+spot.image);
    await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute('content','https://ilhabelatrip.com/'+spot.image);
    await expect(page.getByRole('link',{name:'CC BY-SA 4.0'})).toHaveAttribute('href','https://creativecommons.org/licenses/by-sa/4.0/');
    await expect.poll(()=>page.locator('img.hero').evaluate(img=>img.complete&&img.naturalWidth>0)).toBe(true);
  });
}
