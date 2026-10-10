const { test, expect } = require('@playwright/test');
const fs = require('node:fs');
const path = require('node:path');
for (const width of [390,1440]) for (const lang of ['pt','en','es','fr','he']) {
  test(`preservation scope ${lang} ${width}`, async ({page}) => {
    await page.setViewportSize({width,height:900});
    await page.goto('/');
    await page.waitForFunction(() => typeof openSpotModal === 'function' && typeof setLanguage === 'function');
    await page.evaluate(lang => setLanguage(lang), lang);
    await expect(page.locator('html')).toHaveAttribute('dir',lang==='he'?'rtl':'ltr');
    const checks=await page.evaluate(() => touristSpots.map(spot => {
      openSpotModal(spot.id);
      const content=document.getElementById('spot-modal-content');
      const heading=[...content.querySelectorAll('strong')].find(el=>el.textContent.includes(t('ecoTipTitle')));
      const box=heading?.parentElement;
      return {id:spot.id,expected:getSpotTranslation(spot).ecoTip,actual:box?.querySelector('p')?.textContent,
        hasOriginalStyle:box?.className==='p-4 rounded-2xl bg-secondary-container/30 border border-secondary/20 space-y-1',
        warning:content.textContent.includes(t('repellentTipText'))||content.textContent.includes(t('repellentTipTitle')),
        overflow:document.querySelector('#spot-modal .modal-sheet').scrollWidth>document.querySelector('#spot-modal .modal-sheet').clientWidth+1};
    }));
    expect(checks).toHaveLength(50);
    for(const check of checks){expect(check.actual,check.id).toBe(check.expected);expect(check.hasOriginalStyle,check.id).toBe(true);expect(check.warning,check.id).toBe(false);expect(check.overflow,check.id).toBe(false);}
    await page.evaluate(()=>openSpotModal('praia-do-bonete'));
    const title=await page.evaluate(()=>t('ecoTipTitle'));
    await page.locator('#spot-modal-content strong').filter({hasText:title}).scrollIntoViewIfNeeded();
    const folder=path.resolve(__dirname,'../../preservation-scope-evidence');fs.mkdirSync(folder,{recursive:true});
    await page.screenshot({path:path.join(folder,`bonete-${lang}-${width}.png`)});
  });
}
