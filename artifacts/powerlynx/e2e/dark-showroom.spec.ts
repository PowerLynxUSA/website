import { test, expect } from '@playwright/test';

test('dark showroom toggle swaps section theme and images', async ({ page }) => {
  await page.goto('/');
  const section = page.locator('section').filter({ hasText: 'Featured Products' }).first();
  await expect(page.getByRole('button', { name: 'Light Showroom' })).toHaveAttribute('aria-pressed', 'true');
  await expect(section).toHaveClass(/bg-\[#0D0F10\]/);
  await expect(section.locator('img[data-testid^="img-featured-"]').first()).toHaveAttribute('src', /products-dark/);

  const toggle = page.getByRole('button', { name: 'Light Showroom' });
  await toggle.click();
  await expect(page.getByRole('button', { name: 'Dark Showroom' })).toHaveAttribute('aria-pressed', 'false');
  await expect(section.locator('img[data-testid^="img-featured-"]').first()).not.toHaveAttribute('src', /products-dark/);
});

test('global theme toggle switches every page theme and persists', async ({ page }) => {
  await page.goto('/');
  const toggle = page.getByTestId('button-theme-toggle').first();

  await expect(page.locator('html')).not.toHaveClass(/dark/);
  await toggle.click();
  await expect(page.locator('html')).toHaveClass(/dark/);
  await expect(toggle).toHaveAttribute('aria-label', 'Switch to light theme');

  await page.reload();
  await expect(page.locator('html')).toHaveClass(/dark/);
  for (const route of ['/about', '/products', '/contact']) {
    await page.goto(route);
    await expect(page.locator('html')).toHaveClass(/dark/);
  }

  await page.goto('/');
  const lightToggle = page.getByTestId('button-theme-toggle').first();
  await lightToggle.click();
  await expect(page.locator('html')).not.toHaveClass(/dark/);
});

test('products mega menu uses the showroom panel styling', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('navigation').getByRole('link', { name: 'Products' }).hover();

  const menu = page.getByTestId('menu-products-dropdown');
  await expect(menu).toBeVisible();
  await expect(menu.locator('> div').first()).toHaveClass(/bg-\[#101417\]/);
});