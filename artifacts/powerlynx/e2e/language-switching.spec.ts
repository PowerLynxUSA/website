import { expect, test, type Page } from '@playwright/test';

const languageCodes = ['EN', 'ES', 'ZH', 'ZH-TW', 'PT', 'FR', 'DE', 'JA', 'KO'];

async function openDesktopLanguageMenu(page: Page) {
  await page.getByTestId('button-language-switcher').click();
}

async function openMobileLanguageMenu(page: Page) {
  await page.getByRole('button', { name: /home|contact|menu/i }).click();
  await page.getByTestId('button-language-switcher-mobile').click();
}

test.describe('language switching', () => {
  test('changes language without changing the current route and persists after reload', async ({
    page,
  }) => {
    await page.goto('/products/thermal-imaging-camera');
    const routeBeforeSwitch = new URL(page.url()).pathname;

    await openDesktopLanguageMenu(page);
    await page.getByTestId('option-language-FR').click();

    expect(new URL(page.url()).pathname).toBe(routeBeforeSwitch);
    await expect(page.locator('html')).toHaveAttribute('data-language', 'FR');
    await expect(page.getByRole('heading', { name: /caméra thermique/i })).toBeVisible();
    await expect(page.evaluate(() => localStorage.getItem('powerlynx-language'))).resolves.toBe('FR');

    await page.reload();

    await expect(page.locator('html')).toHaveAttribute('data-language', 'FR');
    await expect(page.getByTestId('button-language-switcher')).toContainText('FR');
    await expect(page.getByRole('heading', { name: /caméra thermique/i })).toBeVisible();
  });

  test('desktop and mobile selectors expose the same nine languages', async ({ page }) => {
    await page.goto('/');

    await openDesktopLanguageMenu(page);
    await expect(page.locator('[data-testid^="option-language-"]')).toHaveCount(
      languageCodes.length,
    );
    await expect(page.locator('[data-testid^="option-language-"]').evaluateAll((options) =>
      options.map((option) => option.getAttribute('data-testid')),
    )).resolves.toEqual(languageCodes.map((code) => `option-language-${code}`));

    await page.setViewportSize({ width: 390, height: 844 });
    await page.reload();
    await openMobileLanguageMenu(page);

    const mobileOptions = page.locator('[data-testid^="option-language-"]');
    await expect(mobileOptions).toHaveCount(languageCodes.length);
    await expect(mobileOptions.evaluateAll((options) =>
      options.map((option) => option.getAttribute('data-testid')),
    )).resolves.toEqual(languageCodes.map((code) => `option-language-${code}`));
  });

  test('contact form validation messages follow the selected language', async ({ page }) => {
    await page.goto('/contact');
    await openDesktopLanguageMenu(page);
    await page.getByTestId('option-language-FR').click();

    await page.getByRole('button', { name: /ouvrir l'e-mail/i }).click();

    await expect(page.getByText("Le nom est obligatoire")).toBeVisible();
    await expect(page.getByText("Le nom de l'entreprise est obligatoire")).toBeVisible();
    await expect(page.getByText('Le pays est obligatoire')).toBeVisible();
    await expect(page.getByText('Adresse e-mail invalide')).toBeVisible();
    await expect(page.getByText('Numéro de téléphone valide requis')).toBeVisible();
    await expect(page.getByText("Sélectionnez un type de demande")).toBeVisible();
    await expect(page.getByText('Le message doit comporter au moins 10 caractères')).toBeVisible();
  });
});