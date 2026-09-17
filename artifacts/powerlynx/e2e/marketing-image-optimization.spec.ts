import { expect, test, type Locator, type Page } from '@playwright/test';

async function expectResponsiveWebp(page: Page, image: Locator) {
  await expect(image).toHaveAttribute('src', /\.webp(?:\?|$)/);

  const srcSet = await image.getAttribute('srcset');
  expect(srcSet).toMatch(/\.webp\s+\d+w/);

  for (const candidate of srcSet?.split(',').map((value) => value.trim().split(/\s+/)[0]) ?? []) {
    const response = await page.request.get(new URL(candidate, page.url()).toString());
    expect(response.ok(), `${candidate} should be available`).toBeTruthy();
  }
}

test.describe('optimized marketing images', () => {
  test('Home keeps the hero eager and serves every responsive variant', async ({ page }) => {
    await page.goto('/');
    const hero = page.getByTestId('img-home-hero');

    await expectResponsiveWebp(page, hero);
    await expect(hero).toHaveAttribute('loading', 'eager');
    await expect(hero).toHaveAttribute('fetchpriority', 'high');

    const collage = page.getByTestId('img-home-collage');
    await expectResponsiveWebp(page, collage);
    await expect(collage).toHaveAttribute('loading', 'lazy');
  });

  test('About lazy-loads below-the-fold photos and serves every responsive variant', async ({ page }) => {
    await page.goto('/about');

    for (const testId of ['img-about-warehouse', 'img-about-technician']) {
      const image = page.getByTestId(testId);
      await expectResponsiveWebp(page, image);
      await expect(image).toHaveAttribute('loading', 'lazy');
    }
  });
});