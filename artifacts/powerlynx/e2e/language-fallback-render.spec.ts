import { expect, test, type Page } from '@playwright/test';

const languageCodes = ['ES', 'FR'];

const mainPages = [
  { name: 'home', path: '/' },
  { name: 'about', path: '/about' },
  { name: 'products index', path: '/products' },
  // A spread of product detail pages: some have dedicated technical copy
  // (thermal-imaging-camera), some rely on phrase-substitution fallback
  // (utility-torch), and some are code/measurement-only with nothing to
  // translate (tube-straightener) — covering all three keeps this render
  // check honest about how localizeProduct() actually behaves per product.
  { name: 'product detail (dedicated copy)', path: '/products/thermal-imaging-camera' },
  { name: 'product detail (phrase substitution)', path: '/products/utility-torch' },
  { name: 'product detail (codes/measurements only)', path: '/products/tube-straightener' },
  { name: 'contact', path: '/contact' },
  { name: 'coming soon', path: '/coming-soon' },
];

/**
 * Sets the active language before the app boots (same storage key the app
 * itself uses), so pages render in the target language from first paint
 * instead of requiring a UI interaction per test.
 */
async function withLanguage(page: Page, language: string) {
  await page.addInitScript((lang) => {
    window.localStorage.setItem('powerlynx-language', lang);
  }, language);
}

/**
 * Renders every major page in every supported non-English language and fails
 * if `t()` ever falls back to English (see the `[i18n-fallback]` console
 * warning emitted by src/i18n/index.tsx). This is the automated equivalent of
 * a human clicking through every language and eyeballing every page for
 * stray English text.
 */
test.describe('no English fallback when rendering pages in other languages', () => {
  for (const language of languageCodes) {
    test(`${language}: no i18n fallback warnings across main pages`, async ({ page }) => {
      const fallbackWarnings: string[] = [];
      page.on('console', (msg) => {
        const text = msg.text();
        if (
          msg.type() === 'warning' &&
          (text.includes('[i18n-fallback]') || text.includes('[i18n-product-fallback]'))
        ) {
          fallbackWarnings.push(text);
        }
      });
      page.on('pageerror', (error) => {
        throw error;
      });

      await withLanguage(page, language);

      for (const { name, path } of mainPages) {
        await page.goto(path);
        await expect(page.locator('html')).toHaveAttribute('data-language', language, {
          timeout: 10_000,
        });
        // The fallback warnings are emitted during render. Do not wait for
        // networkidle here: font and HMR requests can remain open indefinitely
        // even after the language marker and page content are ready.
        await page.waitForTimeout(100);
        expect(
          fallbackWarnings,
          `Found i18n fallback warning(s) while rendering the ${name} page (${path}) in ${language}`,
        ).toEqual([]);
      }
    });
  }
});
