const {test,expect}=require('@playwright/test');
const rank={language:0,photo_camera:1,public:2,chat:3,call:4,map:5};
for(const lang of ['pt','en','es','fr','he'])for(const width of [320,390,1440]){
 test(`global service action order, equal size, no Rudá: ${lang} ${width}px`,async({page})=>{
   await page.setViewportSize({width,height:880});
   await page.goto('/servicos/',{waitUntil:'domcontentloaded'});
   await page.waitForFunction(()=>document.querySelectorAll('#services-page-grid article').length>0);
   await page.evaluate(l=>setLanguage(l),lang);
   await expect(page.locator('html')).toHaveAttribute('dir',lang==='he'?'rtl':'ltr');
   const category=page.locator('#services-category-select');
   for(const value of ['food','stay','tour','essentials','experience']){
     await category.selectOption(value);
     await expect(page.locator('#services-page-grid article').first()).toBeVisible();
     await expect(page.locator('#services-page-grid')).not.toContainText('Rudá Destinos');
     await expect(page.locator('#services-page-grid [data-contact-entry]')).toHaveCount(0);
     // Photo origins stay in catalog metadata, but not superimposed on venue cards.
     await expect(page.locator('#services-page-grid article span.absolute.bottom-2.right-2')).toHaveCount(0);
     const cardCount=await page.locator('#services-page-grid article').count();
     for(let i=0;i<Math.min(5,cardCount);i++){
       const card=page.locator('#services-page-grid article').nth(i);
       const info=await card.locator('.grid.grid-cols-2 a').evaluateAll(nodes=>nodes.map(el=>{
         const rect=el.getBoundingClientRect();
         return {icon:el.querySelector('.material-symbols-outlined')?.textContent.trim(),className:el.className,width:rect.width,height:rect.height,href:el.getAttribute('href')};
       }));
       expect(info.length).toBeGreaterThan(0);
       expect(info.at(-1).icon).toBe('map');
       const ordering=info.map(x=>rank[x.icon]);
       for(const index of ordering)expect(index).toBeDefined();
       expect(ordering).toEqual([...ordering].sort((a,b)=>a-b));
       expect(new Set(info.map(x=>Math.round(x.width))).size).toBe(1);
       expect(new Set(info.map(x=>Math.round(x.height))).size).toBe(1);
       expect(info.every(x=>!x.className.includes('col-span-2'))).toBe(true);
       expect(info.every(x=>x.width>70&&x.height>=44)).toBe(true);
     }
   }
   await category.selectOption('stay');
   await page.locator('#services-stay-filter').selectOption('hostel');
   const gaya=page.locator('#services-page-grid article').filter({has:page.locator('h2',{hasText:'Recanto de Gaya'})});
   await expect(gaya).toHaveCount(1);
   await expect(gaya.locator('a[href="https://www.instagram.com/recantodegaya_/"]')).toContainText('Instagram');
 });
}
