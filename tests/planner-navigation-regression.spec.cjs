const {test,expect}=require('@playwright/test');
for(const lang of ['pt','en','es','fr','he']) for(const width of [320,390,1440]) {
  test('planner navigation, focus, reload and deep link: '+lang+' '+width,async({page})=>{
    await page.setViewportSize({width,height:900});
    const errors=[];page.on('pageerror',e=>errors.push(e.message));
    await page.goto('/');
    await page.evaluate(lang=>setLanguage(lang),lang);
    const cta=page.locator(width<768?'#bottom-nav a[href="/?view=trip"]':'header a[href="/?view=trip"]');
    const modal=page.locator('#planner-modal');
    await cta.click();
    await expect(page.locator('#planner-summary-view')).toBeVisible();
    expect(await modal.evaluate(el=>el.contains(document.activeElement))).toBe(true);
    if(width>=768) await expect(page.locator('#planner-close')).toBeFocused();
    expect(await page.evaluate(()=>document.body.style.overflow)).toBe('hidden');
    await page.locator(width<768?'#bottom-nav a[href="/#map-section"]':'#planner-close').click();
    await expect(modal).toBeHidden();
    await expect(cta).toBeFocused();
    expect(await page.evaluate(()=>document.body.style.overflow)).toBe('');
    await page.reload();
    await expect(modal).toBeHidden();
    await cta.click();
    await expect(page.locator('#planner-summary-view')).toBeVisible();
    await page.locator(width<768?'#bottom-nav a[href="/#map-section"]':'#planner-close').click();
    await page.goto('/?view=trip&utm_source=regression#explore-section');
    await expect(page.locator('#planner-summary-view')).toBeVisible();
    await page.locator(width<768?'#bottom-nav a[href="/#map-section"]':'#planner-close').click();
    expect(new URL(page.url()).searchParams.has('view')).toBe(false);
    expect(new URL(page.url()).searchParams.get('utm_source')).toBe('regression');
    expect(new URL(page.url()).hash).toBe('#explore-section');
    await page.reload();
    await expect(modal).toBeHidden();
    await expect(page.locator('html')).toHaveAttribute('dir',lang==='he'?'rtl':'ltr');
    expect(errors).toEqual([]);
  });
}
