import { test, expect } from '@playwright/test';

test('dark showroom toggle swaps section theme and images', async ({ page }) => {
  await page.goto('/');
  const toggle = page.getByRole('button', { name: 'Dark Showroom' });
  await toggle.scrollIntoViewIfNeeded();
  await toggle.click();

  const section = page.locator('section').filter({ hasText: 'Featured Products' }).first();
  await expect(page.getByRole('button', { name: 'Light Showroom' })).toHaveAttribute('aria-pressed', 'true');
  await expect(section).toHaveClass(/bg-\[#0D0F10\]/);
  await expect(section.locator('img[data-testid^="img-featured-"]').first()).toHaveAttribute('src', /products-dark/);
});