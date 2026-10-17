const {test,expect}=require('@playwright/test');
const translated={
  pt:{category:'Hospedagem',recommended:'Recomendado'},
  en:{category:'Accommodation',recommended:'Recommended'},
  fr:{category:'Hébergement',recommended:'Recommandé'},
  es:{category:'Alojamiento',recommended:'Recomendado'},
  he:{category:'לינה',recommended:'מומלץ'}
};
for(const lang of ['pt','en','es','fr','he']){
  for(const width of [320,390,1440]){
    test(`category/recommended badges are independent, ${lang}, ${width}px`,async({page})=>{
      await page.setViewportSize({width,height:860});
      await page.goto('/servicos/',{waitUntil:'domcontentloaded'});
      await page.waitForFunction(()=>document.querySelectorAll('#services-page-grid article').length>0);
      await page.evaluate(l=>setLanguage(l),lang);
      await expect(page.locator('html')).toHaveAttribute('dir',lang==='he'?'rtl':'ltr');
      const category=page.locator('#services-category-select');
      const first=async(name)=>{
        const card=page.locator('#services-page-grid article').filter({has:page.locator('h2',{hasText:name})});
        await expect(card).toHaveCount(1);
        await expect(card).not.toHaveClass(/md:col-span-2/);
        await expect(card.locator('img').locator('..')).toHaveClass(/h-28/);
        const left=card.locator('span.absolute.top-3.left-3');
        const right=card.locator('span.absolute.top-3.right-3');
        await expect(left).toHaveCount(1);
        await expect(right).toHaveCount(1);
        await expect(right).toHaveText(translated[lang].recommended);
        return {left,card};
      };
      await category.selectOption('tour');
      const portinho=await first('Portinho Passeios');
      const portinhoType=await page.evaluate(()=>getServiceTranslation(servicesData.find(s=>s.id==='portinho-passeios')).type);
      await expect(portinho.left).toHaveText(portinhoType);
      await category.selectOption('stay');
      const gloria=await first('La Gloria House');
      await expect(gloria.left).toHaveText(translated[lang].category);
      await category.selectOption('food');
      await page.locator('[data-service-food-filter="type"]').selectOption('bar');
      const floresta=await first('Floresta Bar');
      const florestaType=await page.evaluate(()=>getServiceTranslation(servicesData.find(s=>s.id==='floresta-bar')).type);
      await expect(floresta.left).toHaveText(florestaType);
      const records=await page.evaluate(()=>['portinho-passeios','la-gloria-house','floresta-bar'].map(id=>{
        const {featured,recommended,presentation}=servicesData.find(s=>s.id===id);
        return {featured,recommended,presentation};
      }));
      expect(records).toEqual(Array(3).fill({featured:true,recommended:true,presentation:'compact'}));
    });
  }
}
