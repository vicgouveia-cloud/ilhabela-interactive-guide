const {test,expect}=require('@playwright/test');
const path=require('node:path');
for(const width of [390,1440]) for(const lang of ['pt','en','es','fr','he']) {
 test(`visual discovery ${lang} ${width}px`,async({page},info)=>{
  const evidence=name=>process.env.VISUAL_EVIDENCE_DIR ? path.resolve(process.env.VISUAL_EVIDENCE_DIR,name) : info.outputPath(name);
  await page.setViewportSize({width,height:900});
  async function expectAligned(selector) {
   await expect.poll(()=>page.evaluate(selector=>{
    const header=document.querySelector('.site-header').getBoundingClientRect().height;
    const filters=innerWidth>=768?document.querySelector('.home-discovery').offsetHeight:0;
    return Math.abs(document.querySelector(selector).getBoundingClientRect().top-header-filters-12);
   },selector)).toBeLessThan(3);
  }
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('/');
  await page.waitForFunction(()=>typeof touristSpots!=='undefined' && document.querySelectorAll('#spots-grid > article').length===touristSpots.length);
  await page.locator('#lang-btn').click();
  await page.locator(`#language-menu button[onclick="setLanguage('${lang}')"]`).click();
  await expect(page.locator('html')).toHaveAttribute('lang',lang);
  await expect(page.locator('html')).toHaveAttribute('dir',lang==='he'?'rtl':'ltr');
  await expect(page.locator('#map')).toBeVisible();
  await expect(page.locator('#tab-map')).toHaveClass(/active/);
  const total=await page.evaluate(()=>touristSpots.length);
  await expect(page.locator('#spots-grid > article')).toHaveCount(total);
  const mismatches=await page.evaluate(()=>{
   const failures=[];
   for(const el of document.querySelectorAll('[data-i18n]')) if(el.textContent!==t(el.dataset.i18n)) failures.push(el.dataset.i18n);
   for(const attr of ['placeholder','aria-label','alt']) for(const el of document.querySelectorAll(`[data-i18n-${attr}]`)) if(el.getAttribute(attr)!==t(el.getAttribute(`data-i18n-${attr}`))) failures.push(attr);
   const cards=[...document.querySelectorAll('#spots-grid > article')];
   cards.forEach((el,i)=>{const tr=getSpotTranslation(touristSpots[i]);if(el.querySelector('h3').textContent!==tr.title || el.querySelector('p').textContent!==(tr.subtitle||tr.description||''))failures.push(touristSpots[i].id)});
   return failures;
  });
  expect(mismatches).toEqual([]);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
  if(width===390) {
   expect(await page.locator('#search-input').evaluate(el=>el.getBoundingClientRect().bottom)).toBeLessThan(600);
  }
  await page.screenshot({path:evidence(`after-${lang}-${width}.png`)});
  await page.locator('#search-input').fill('Jabaquara');
  await expect(page.locator('#spots-grid > article')).toHaveCount(1);
  await expect(page.locator('#results-count-num')).toHaveText('1');
  expect(await page.evaluate(()=>mapMarkers.length)).toBe(1);
  expect(await page.evaluate(()=>getFilteredSpots().map(s=>s.id))).toEqual(['praia-do-jabaquara']);
  await page.locator('#tab-grid').focus();await page.keyboard.press('Enter');
  await expectAligned('#explore-section');
  await expect(page.locator('#search-input')).toHaveValue('Jabaquara');
  await expect(page.locator('#spots-grid > article')).toHaveCount(1);
  await page.locator('#tab-map').click();
  await expectAligned('#map-section');
  await expect(page.locator('#search-input')).toHaveValue('Jabaquara');
  await page.locator('#clear-search-btn').click();
  const cat=page.locator('.cat-pill[data-cat="cachoeiras"]');
  await cat.scrollIntoViewIfNeeded();await cat.click();
  const expected=await page.evaluate(()=>touristSpots.filter(s=>s.category==='cachoeiras').length);
  await expect(page.locator('#spots-grid > article')).toHaveCount(expected);
  await expect(cat).toHaveAttribute('aria-pressed','true');
  expect(await page.evaluate(()=>mapMarkers.length)).toBe(expected);
  await page.locator('#tab-grid').click();
  await expect(page.locator('#tab-grid')).toHaveClass(/active/);
  await expectAligned('#explore-section');
  await expect(cat).toHaveAttribute('aria-pressed','true');
  if(width===390) expect(await page.locator('#spots-grid').evaluate(el=>getComputedStyle(el).gridTemplateColumns.split(' ').length)).toBe(1);
  const details=page.locator('#spots-grid .attraction-card-details').first();
  await details.focus();await page.keyboard.press('Enter');
  await expect(page.locator('#spot-modal')).toBeVisible();
  await expect(page.locator('#spot-modal-title')).toHaveText(await page.evaluate(()=>getSpotTranslation(getFilteredSpots()[0]).title));
  await page.evaluate(()=>closeSpotModal());
  await page.locator('#tab-map').click();
  await expect(page.locator('#tab-map')).toHaveClass(/active/);
  await expectAligned('#map-section');
  await expect(cat).toHaveAttribute('aria-pressed','true');
  await expect(page.locator('#map')).toBeVisible();
  expect(await page.evaluate(()=>{
   const reset=document.querySelector('.map-overlay-btn').getBoundingClientRect();
   return [...document.querySelectorAll('#map .leaflet-control')].every(el=>{
    const r=el.getBoundingClientRect();return reset.right<=r.left||reset.left>=r.right||reset.bottom<=r.top||reset.top>=r.bottom;
   });
  })).toBe(true);
  await page.screenshot({path:evidence(`map-${lang}-${width}.png`)});
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('lang',lang);
  await expect(page.locator('#spots-grid > article')).toHaveCount(total);
  await page.locator('#tab-grid').click();
  await expectAligned('#explore-section');
  await page.waitForFunction(()=>[...document.querySelectorAll('#spots-grid > article img')].slice(0,4).every(img=>img.complete && img.naturalWidth>0));

  await page.evaluate(()=>Promise.all([...document.querySelectorAll('#spots-grid > article img')].slice(0,4).map(img=>img.decode())));
  await page.screenshot({path:evidence(`cards-${lang}-${width}.png`)});
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
  expect(errors).toEqual([]);
 });
}
