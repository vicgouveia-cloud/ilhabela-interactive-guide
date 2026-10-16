const {test,expect}=require('@playwright/test');
const fs=require('node:fs');
test('header contact: languages, mobile/desktop, menu, keyboard and shared form',async({page})=>{
 fs.mkdirSync('evidence/mobile-header-fit',{recursive:true});
 for(const width of [320, 330, 360, 390, 1440]) {
  await page.setViewportSize({width,height:844});
  await page.goto('/');
  for(const lang of ['pt','en','es','fr','he']) {
   await page.evaluate(lang=>setLanguage(lang),lang);
   const entry=page.locator('header .contact-header-entry');
   await expect(entry).toBeVisible();
   const title = page.locator('header [data-i18n="brandTitle"]').first();
   expect(await title.evaluate(el => el.getBoundingClientRect().height)).toBeLessThan(30);
   const aligned = await page.locator('header .header-brand, header .header-controls').evaluateAll(els => els.map(el => {const r=el.getBoundingClientRect();return r.y+r.height/2;}));
   expect(Math.abs(aligned[0]-aligned[1])).toBeLessThan(2);
   const headerBox = await page.locator('.site-header').boundingBox();
   const entryBox = await entry.boundingBox();
   expect(entryBox.y).toBeGreaterThanOrEqual(headerBox.y);
   expect(entryBox.y+entryBox.height).toBeLessThanOrEqual(headerBox.y+headerBox.height);
   await expect(entry).toHaveAccessibleName({pt:'Fale com a gente',en:'Get in touch',es:'Habla con nosotros',fr:'Contactez-nous',he:'דברו איתנו'}[lang]);
   const boxes=await page.locator('header a[href="#hero"], header .contact-header-entry, #language-selector').evaluateAll(els=>els.map(el=>{const r=el.getBoundingClientRect();return {x:r.x,y:r.y,right:r.right,bottom:r.bottom}}));
   for(const b of boxes) {expect(b.x).toBeGreaterThanOrEqual(0);expect(b.right).toBeLessThanOrEqual(width);}
   for(let i=0;i<boxes.length;i++)for(let j=i+1;j<boxes.length;j++)expect(boxes[i].right<=boxes[j].x || boxes[j].right<=boxes[i].x).toBe(true);
   await page.locator('#lang-btn').click(); await expect(page.locator('#language-menu')).toBeVisible();
   await page.locator('#lang-btn').click(); await expect(page.locator('#language-menu')).toBeHidden();
   await page.screenshot({path:`evidence/mobile-header-fit/${lang}-${width}-header.png`});
   await entry.focus();await page.keyboard.press('Enter');
   await expect(page.locator('#contact-subject')).toBeFocused();
   await expect(page.locator('#contact-dialog')).not.toContainText('Formspree');
   await expect(page.locator('#contact-intro')).not.toBeEmpty();
   await expect(page.locator('#contact-dialog')).toHaveAttribute('dir',lang==='he'?'rtl':'ltr');
   await expect(page.locator('#contact-dialog')).toHaveCount(1);
   await page.screenshot({path:`evidence/mobile-header-fit/${lang}-${width}-dialog.png`});
   await page.keyboard.press('Escape');await expect(entry).toBeFocused();
  }
 }
 await page.setViewportSize({width: 320, height: 844});
 for(const path of ['/en/','/servicos/']) {
  await page.goto(path);
  expect(await page.locator('header [data-i18n="brandTitle"]').first().evaluate(el=>el.getBoundingClientRect().height)).toBeLessThan(30);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await page.locator('header .contact-header-entry').click();
  await expect(page.locator('#contact-dialog')).toBeVisible();
 }
});
