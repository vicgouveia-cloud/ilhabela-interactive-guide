const {test,expect}=require('@playwright/test');
const languages={
 pt:'Contato pelo Instagram',
 en:'Contact on Instagram',
 fr:'Contacter sur Instagram',
 es:'Contactar por Instagram',
 he:'יצירת קשר באינסטגרם'
};
for(const lang of Object.keys(languages))for(const width of [320,390,1440]){
 test(`Recanto de Gaya recommended and Instagram-first: ${lang} ${width}px`,async({page})=>{
   await page.setViewportSize({width,height:900});
   await page.goto('/servicos/',{waitUntil:'domcontentloaded'});
   await page.waitForFunction(()=>document.querySelectorAll('#services-page-grid article').length>0);
   await page.evaluate(l=>setLanguage(l),lang);
   await expect(page.locator('html')).toHaveAttribute('dir',lang==='he'?'rtl':'ltr');
   const category=page.locator('#services-category-select');
   await category.selectOption('stay');
   await page.locator('#services-stay-filter').selectOption('hostel');
   const recanto=page.locator('#services-page-grid article').filter({has:page.locator('h2',{hasText:'Recanto de Gaya'})});
   await expect(recanto).toHaveCount(1);
   await expect(recanto).not.toHaveClass(/md:col-span-2/);
   await expect(recanto.locator('span.absolute.top-3.right-3')).toHaveText({
     pt:'Recomendado',en:'Recommended',fr:'Recommandé',es:'Recomendado',he:'מומלץ'
   }[lang]);
   await expect(recanto.locator('img')).toHaveCount(0);
   const left=recanto.locator('span.absolute.top-3.left-3');
   await expect(left).toHaveText({pt:'Hostel',en:'Hostel',fr:'Auberge de jeunesse',es:'Hostel',he:'הוסטל'}[lang]);
   const contact=recanto.locator('a[href="https://www.instagram.com/recantodegaya_/"]');
   await expect(contact).toHaveCount(1);
   await expect(contact).toHaveText(languages[lang]);
   await expect(contact).toHaveAttribute('target','_blank');
   await expect(contact).toHaveClass(/bg-primary/);
   const links=recanto.locator('.grid.grid-cols-2 a');
   await expect(links).toHaveCount(2);
   await expect(links.nth(0)).toHaveAttribute('href','https://www.instagram.com/recantodegaya_/');
   await expect(links.nth(1)).toContainText('Google Maps');
   await expect(recanto.locator('a[href^="https://wa.me/"]')).toHaveCount(0);
   await expect(recanto.locator('a[href^="tel:"]')).toHaveCount(0);
   await expect(recanto).toContainText('Perequê');
 });
}
