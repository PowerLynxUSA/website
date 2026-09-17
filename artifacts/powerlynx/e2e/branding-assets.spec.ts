import { expect, test } from '@playwright/test';

test('English uses Montserrat and the Brazing Torch uses the uploaded product image', async ({ page }) => {
  await page.goto('/products/brazing-torch');
  await expect(page.locator('html')).toHaveAttribute('data-language', 'EN');
  const heading = page.getByRole('heading', { name: 'Brazing Torch', exact: true });
  await expect(heading).toBeVisible();
  await page.evaluate(() => document.fonts.ready);

  const englishFonts = await page.locator('body').evaluate((body) => {
    return {
      body: getComputedStyle(body).fontFamily,
      loaded: document.fonts.check('16px Montserrat'),
    };
  });
  const headingFont = await heading.evaluate((element) => getComputedStyle(element).fontFamily);
  expect(englishFonts.body).toContain('Montserrat');
  expect(headingFont).toContain('Montserrat');
  expect(englishFonts.loaded).toBe(true);

  const imageSources = await page.locator('img').evaluateAll((images) =>
    images.map((image) => image.currentSrc || image.getAttribute('src') || ''),
  );
  expect(imageSources.some((source) => source.includes('brazing-torch'))).toBe(true);
});

test('localized languages keep their existing font profile', async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.setItem('powerlynx-language', 'ES');
  });
  await page.goto('/products/brazing-torch');
  await expect(page.locator('html')).toHaveAttribute('data-language', 'ES');

  const spanishFont = await page.locator('body').evaluate((body) => getComputedStyle(body).fontFamily);
  expect(spanishFont).toContain('Inter');
  expect(spanishFont).not.toContain('Montserrat');
});