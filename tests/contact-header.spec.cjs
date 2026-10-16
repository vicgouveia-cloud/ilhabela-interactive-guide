const {test,expect}=require('@playwright/test');
const fs=require('node:fs');
test('header contact: languages, mobile/desktop, menu, keyboard and shared form',async({page})=>{
 fs.mkdirSync('evidence/contact-header',{recursive:true});
 for(const width of [390,1440]) {
  await page.setViewportSize({width,height:844});
  await page.goto('/');
  for(const lang of ['pt','en','es','fr','he']) {
   await page.evaluate(lang=>setLanguage(lang),lang);
   const entry=page.locator('header .contact-header-entry');
   await expect(entry).toBeVisible();
   await expect(entry).toHaveAccessibleName({pt:'Fale com a gente',en:'Get in touch',es:'Habla con nosotros',fr:'Contactez-nous',he:'דברו איתנו'}[lang]);
   const boxes=await page.locator('header a[href="#hero"], header .contact-header-entry, #language-selector').evaluateAll(els=>els.map(el=>{const r=el.getBoundingClientRect();return {x:r.x,y:r.y,right:r.right,bottom:r.bottom}}));
   for(const b of boxes) {expect(b.x).toBeGreaterThanOrEqual(0);expect(b.right).toBeLessThanOrEqual(width);}
   for(let i=0;i<boxes.length;i++)for(let j=i+1;j<boxes.length;j++)expect(boxes[i].right<=boxes[j].x || boxes[j].right<=boxes[i].x).toBe(true);
   await page.locator('#lang-btn').click(); await expect(page.locator('#language-menu')).toBeVisible();
   await page.locator('#lang-btn').click(); await expect(page.locator('#language-menu')).toBeHidden();
   await page.screenshot({path:`evidence/contact-header/${lang}-${width}-header.png`});
   await entry.focus();await page.keyboard.press('Enter');
   await expect(page.locator('#contact-subject')).toBeFocused();
   await expect(page.locator('#contact-dialog')).not.toContainText('Formspree');
   await expect(page.locator('#contact-intro')).not.toBeEmpty();
   await expect(page.locator('#contact-dialog')).toHaveAttribute('dir',lang==='he'?'rtl':'ltr');
   await expect(page.locator('#contact-dialog')).toHaveCount(1);
   await page.screenshot({path:`evidence/contact-header/${lang}-${width}-dialog.png`});
   await page.keyboard.press('Escape');await expect(entry).toBeFocused();
  }
 }
 for(const path of ['/en/','/servicos/']) {
  await page.goto(path);await page.locator('header .contact-header-entry').click();
  await expect(page.locator('#contact-dialog')).toBeVisible();
 }
});
