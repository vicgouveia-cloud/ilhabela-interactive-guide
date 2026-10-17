const {test,expect}=require('@playwright/test');
const cases=[
  ['praia-de-santa-tereza','praia-de-santa-tereza_prefeitura.webp'],
  ['praia-do-barreiros','praia-do-barreiros_prefeitura.webp'],
  ['praia-da-ponta-azeda','praia-da-ponta-azeda_prefeitura.webp']
];
for (const width of [320,390,1440]) for (const lang of ['pt','en','es','fr','he']) {
  test(`municipal photographs in guide and modal: ${lang} ${width}px`,async({page})=>{
    await page.setViewportSize({width,height:900});
    await page.goto('/',{waitUntil:'domcontentloaded'});
    await page.evaluate(lang=>setLanguage(lang),lang);
    await expect(page.locator('html')).toHaveAttribute('dir',lang==='he'?'rtl':'ltr');
    for (const [id,file] of cases) {
      const card=page.locator('#spots-grid article').filter({has:page.locator(`img[src$="${file}"]`)});
      await expect(card).toHaveCount(1);
      const cardImage=card.locator('img').first();
      await expect(cardImage).toHaveAttribute('src',`assets/images/${file}`);
      await cardImage.scrollIntoViewIfNeeded();
      await cardImage.evaluate(img=>img.decode());
      const caption=await page.evaluate(id=>touristSpots.find(s=>s.id===id).photoCaption[currentLang],id);
      await expect(cardImage).toHaveAttribute('alt',caption);
      await page.evaluate(id=>openSpotModal(id),id);
      const img=page.locator('#modal-main-img');
      await expect(img).toHaveAttribute('src',`assets/images/${file}`);
      await img.evaluate(img=>img.decode());
      await expect(img).toHaveAttribute('alt',caption);
      await expect(page.locator('#modal-photo-credit')).toContainText('Prefeitura de Ilhabela · Sectur Ilhabela');
      await expect(page.locator('#modal-photo-license')).toBeHidden();
      await page.evaluate(()=>closeSpotModal());
    }
  });
}
for (const [id,file] of cases) {
  test(`static SEO page for ${id} loads correct photo`,async({page})=>{
    await page.goto(`/lugares/${id}/`,{waitUntil:'domcontentloaded'});
    const hero=page.locator('img.hero');
    await expect(hero).toHaveAttribute('src',`/assets/images/${file}`);
    await hero.evaluate(img=>img.decode());
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content',`https://ilhabelatrip.com/assets/images/${file}`);
    await expect(page.locator('main')).toContainText('Prefeitura de Ilhabela · Sectur Ilhabela');
  });
}
