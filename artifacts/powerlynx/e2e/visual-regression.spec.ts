import { expect, test, type Page } from '@playwright/test';

const viewports = {
  mobile: { width: 390, height: 844 },
  desktop: { width: 1440, height: 900 },
} as const;

const screens = [
  { name: 'home', path: '/' },
  { name: 'products-index', path: '/products' },
  { name: 'product-detail', path: '/products/thermal-imaging-camera' },
  { name: 'about', path: '/about' },
  { name: 'contact', path: '/contact' },
];

const lightThemeScreens = [
  { name: 'home', path: '/' },
  { name: 'about', path: '/about' },
];

async function setThemeBeforeLoad(page: Page, theme: 'light' | 'dark') {
  await page.addInitScript((selectedTheme) => {
    window.localStorage.setItem('powerlynx-theme', selectedTheme);
  }, theme);
}

async function clearThemeBeforeLoad(page: Page) {
  await page.addInitScript(() => {
    window.localStorage.removeItem('powerlynx-theme');
  });
}

async function prepareForScreenshot(page: Page) {
  // Freeze anything time-based / animated so screenshots are deterministic.
  await page.addStyleTag({
    content: `*, *::before, *::after { animation-duration: 0s !important; animation-delay: 0s !important; transition-duration: 0s !important; caret-color: transparent !important; }`,
  });
}

/**
 * Baseline visual regression coverage for the main screens on mobile and
 * desktop. These are pixel-diff snapshots (Playwright's toHaveScreenshot),
 * checked in under e2e/visual-regression.spec.ts-snapshots/. A meaningful
 * layout shift on any of these screens — including ones caused by a
 * translation of very different length breaking a layout — will fail CI.
 */
for (const [viewportName, viewportSize] of Object.entries(viewports)) {
  test.describe(`visual regression: ${viewportName}`, () => {
    test.use({ viewport: viewportSize });

    for (const { name, path } of screens) {
      test(`${name} (EN)`, async ({ page }) => {
        await clearThemeBeforeLoad(page);
        await page.goto(path);
        await prepareForScreenshot(page);
        await page.waitForLoadState('networkidle');
        await expect(page).toHaveScreenshot(`${viewportName}-${name}-en.png`, {
          fullPage: true,
          maxDiffPixelRatio: 0.02,
        });
      });
    }

    // A second language is included specifically to catch layout breakage
    // caused by longer/shorter translated strings (a common source of the
    // visual regressions this task guards against).
    test(`home (ES, translated strings)`, async ({ page }) => {
      await page.addInitScript(() => {
        window.localStorage.setItem('powerlynx-language', 'ES');
      });
      await clearThemeBeforeLoad(page);
      await page.goto('/');
      await prepareForScreenshot(page);
      await page.waitForLoadState('networkidle');
      await expect(page).toHaveScreenshot(`${viewportName}-home-es.png`, {
        fullPage: true,
        maxDiffPixelRatio: 0.02,
      });
    });

    for (const { name, path } of lightThemeScreens) {
      test(`${name} (EN, light theme)`, async ({ page }) => {
        await setThemeBeforeLoad(page, 'light');
        await page.goto(path);
        await prepareForScreenshot(page);
        await page.waitForLoadState('networkidle');
        await expect(page).toHaveScreenshot(`${viewportName}-${name}-en-light.png`, {
          fullPage: true,
          maxDiffPixelRatio: 0.02,
        });
      });
    }
  });
}
