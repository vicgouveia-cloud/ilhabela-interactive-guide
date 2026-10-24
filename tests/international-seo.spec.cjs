const {test,expect}=require('@playwright/test');
const fs=require('node:fs');
for(const lang of ['en','es','fr','he'])for(const width of [390,1440]){
  test(`international entry, discovery and trip ${lang} ${width}`,async({page},info)=>{
    await page.setViewportSize({width,height:900});
    const errors=[];page.on('pageerror',e=>errors.push(e.message));
    await page.goto(`/${lang}/o-que-fazer/`);
    await expect(page.locator('article')).toHaveCount(50);
    await expect(page.locator('html')).toHaveAttribute('lang',lang);
    if(lang==='he')await expect(page.locator('html')).toHaveAttribute('dir','rtl');
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
    await page.locator('article[data-spot="praia-do-curral"] h2 a').click();
    await expect(page).toHaveURL(new RegExp('/'+lang+'/lugares/praia-do-curral/'));
    await expect(page.locator('h1')).not.toBeEmpty();
    expect(await page.locator('.hero').evaluate(img=>img.complete&&img.naturalWidth>0)).toBe(true);
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
    await page.screenshot({path:info.outputPath(`attraction-${lang}-${width}.png`),fullPage:true});
    await page.locator('[data-analytics="add_trip"]').click();
    await page.waitForFunction(()=>typeof tripSelection!=='undefined' && document.readyState==='complete');
    await expect(page.locator('#spot-modal')).toBeVisible();
    expect(await page.evaluate(()=>tripSelection)).toContain('praia-do-curral');
    expect(await page.evaluate(()=>currentLang)).toBe(lang);
    await page.keyboard.press('Escape');
    await page.goto(`/${lang}/`);
    await expect(page.locator('#map .leaflet-tile-loaded').first()).toBeVisible();
    expect(await page.evaluate(()=>mapMarkers.length)).toBe(50);
    await page.locator('#tab-grid').click();
    await expect(page.locator('#spots-grid > .glass-card')).toHaveCount(50);
    await expect.poll(()=>page.locator('#spots-grid img').evaluateAll(imgs=>imgs.slice(0,4).every(img=>img.complete&&img.naturalWidth>0))).toBe(true);
    await page.screenshot({path:info.outputPath(`home-${lang}-${width}.png`),fullPage:false});
    expect(errors).toEqual([]);
  });
  test(`indexable HTML without JavaScript ${lang} ${width}`,async({browser})=>{
    const context=await browser.newContext({javaScriptEnabled:false,viewport:{width,height:900}});
    const page=await context.newPage();
    await page.goto(`${process.env.PREVIEW_URL||'http://127.0.0.1:4173'}/${lang}/lugares/pico-de-sao-sebastiao/`);
    await expect(page.locator('h1')).not.toBeEmpty();
    await expect(page.locator('.card')).toHaveCount(3);
    expect(await page.locator('link[rel="alternate"]').count()).toBe(6);
    await context.close();
  });
}
test('compiled assets remove runtime CSS compiler and defer map scripts',async({page})=>{
  const requests=[];page.on('request',r=>requests.push(r.url()));
  await page.goto('/');
  await page.waitForFunction(()=>map&&mapMarkers.length===50);
  expect(requests.some(u=>u.includes('cdn.tailwindcss.com')||u.includes('unpkg.com'))).toBe(false);
  await expect(page.locator('script[src="/assets/build/leaflet.js"]')).toHaveAttribute('defer','');
  expect(await page.locator('#lang-btn').evaluate(el=>getComputedStyle(el).display)).toBe('flex');
  const raw=fs.statSync('app.js').size,compressed=fs.statSync('assets/build/app.js').size;
  expect(compressed).toBeLessThan(raw*0.85);
});
