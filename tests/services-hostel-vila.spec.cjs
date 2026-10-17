const {test,expect}=require('@playwright/test');
const cases=[['pt',320],['en',390],['es',390],['fr',1440],['he',390]];
for(const [lang,width] of cases) {
  test(`Hostel da Vila three services and filters in ${lang} at ${width}px`,async({page})=>{
    await page.setViewportSize({width,height:900});
    await page.goto('/servicos/',{waitUntil:'domcontentloaded'});
    await page.waitForFunction(()=>document.querySelectorAll('#services-page-grid article').length>0);
    await page.evaluate(value=>setLanguage(value),lang);
    await expect(page.locator('html')).toHaveAttribute('dir',lang==='he'?'rtl':'ltr');
    const category=page.locator('#services-category-select');
    await category.selectOption('stay');
    const stay=page.locator('#services-stay-filter');
    await expect(stay).toBeVisible();
    for(const type of ['hostel','hotel','pousada','alternative'])
      await expect(stay.locator(`option[value="${type}"]`)).toHaveCount(1);
    await stay.selectOption('hostel');
    const hostel=page.locator('#services-page-grid article').filter({has:page.locator('h2',{hasText:'Hostel da Vila'})});
    await expect(hostel).toHaveCount(1);
    await expect(hostel.locator('img')).toHaveAttribute('src','/assets/images/hostel-da-vila_oficial.webp');
    await hostel.locator('img').scrollIntoViewIfNeeded();
    await hostel.locator('img').evaluate(img=>img.decode());
    await category.selectOption('food');
    await page.locator('[data-service-food-filter="type"]').selectOption('bar');
    const bar=page.locator('#services-page-grid article').filter({has:page.locator('h2',{hasText:'Floresta Bar'})});
    await expect(bar).toHaveCount(1);
    await expect(bar.locator('img')).toHaveAttribute('src','/assets/images/floresta-bar_oficial.webp');
    await expect(bar).toContainText({pt:'Recomendado',en:'Recommended',es:'Recomendado',fr:'Recommandé',he:'מומלץ'}[lang]);
    await bar.locator('img').scrollIntoViewIfNeeded();
    await bar.locator('img').evaluate(img=>img.decode());
    await category.selectOption('experience');
    const experience=page.locator('#services-experience-filter');
    await expect(experience).toBeVisible();
    await experience.selectOption('wellness');
    const yoga=page.locator('#services-page-grid article').filter({has:page.locator('h2',{hasText:'Aula de Yoga — Hostel da Vila'})});
    await expect(yoga).toHaveCount(1);
    await expect(yoga.locator('img')).toHaveAttribute('src','/assets/images/aula-yoga-hostel-da-vila_oficial.webp');
    await yoga.locator('img').scrollIntoViewIfNeeded();
    await yoga.locator('img').evaluate(img=>img.decode());
  });
}
