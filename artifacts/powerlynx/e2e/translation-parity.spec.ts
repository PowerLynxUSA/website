import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { expect, test } from '@playwright/test';
import { translations } from '../src/i18n/translations';
import { readProductCatalog } from './lib/read-product-catalog';

const currentDir = path.dirname(fileURLToPath(import.meta.url));

const languageCodes = Object.keys(translations) as Array<keyof typeof translations>;
const nonEnglishLanguages = languageCodes.filter((code) => code !== 'EN');

/**
 * Some translatable strings are correctly identical to English because the
 * word is a genuine cognate in the target language (e.g. French "Contact" is
 * also "Contact"). A blanket "must differ from English" check would
 * false-positive on these, so they are named here explicitly instead of
 * silently exempted — any addition to this list should be a verified,
 * intentional cognate, not a shortcut around a real translation gap.
 */
const untranslatedValueAllowlist = new Set<string>([
  'ES:footer.general', // "General" is the same word in Spanish.
  'FR:nav.contact', // "Contact" is the same word in French.
  'FR:contact.message', // "Message" is the same word in French.
  'FR:footer.contact', // "Contact" is the same word in French.
]);

/**
 * Some strings are pure model codes and measurements (e.g. `AHS2: 1/4"`)
 * with nothing language-specific to translate — they are correctly identical
 * across every locale. A run of 3+ lowercase letters is a reliable signal
 * that a string contains real prose rather than just a code or unit.
 */
function containsTranslatableProse(text: string): boolean {
  return /[a-z]{3,}/.test(text);
}

/**
 * Product bullets that are correctly identical to English in a given
 * language because the unit/word is a genuine cognate there (verified by
 * checking every other supported language actually does translate it).
 * Format: "LANG:slug[bulletIndex]".
 */
const untranslatedProductBulletAllowlist = new Set<string>([
  'FR:led-penlight[0]', // "300 lumens" — "lumens" is the same word in French.
  'FR:led-headlight[0]', // "350 lumens" — "lumens" is the same word in French.
]);

/**
 * Regression guard for the "English leaks back in" bug: translations.ts stores
 * each locale as a Partial<Record<TranslationKey, string>>, so TypeScript will
 * not catch a locale that is missing a key added to English. If a locale is
 * missing a key, `t()` silently falls back to the English string at runtime.
 * These tests fail the build the moment any language's key set drifts from
 * English's, instead of relying on someone noticing English text on the site.
 */
test.describe('translation key parity (translations.ts)', () => {
  const englishKeys = Object.keys(translations.EN).sort();

  test('English has translation keys defined', () => {
    expect(englishKeys.length).toBeGreaterThan(0);
  });

  for (const code of nonEnglishLanguages) {
    test(`${code} has exactly the same keys as EN (no missing / no extra)`, () => {
      const localeKeys = Object.keys(translations[code]).sort();
      const missing = englishKeys.filter((key) => !localeKeys.includes(key));
      const extra = localeKeys.filter((key) => !englishKeys.includes(key));

      expect(missing, `${code} is missing translations for: ${missing.join(', ')}`).toEqual([]);
      expect(extra, `${code} has keys not present in EN: ${extra.join(', ')}`).toEqual([]);
    });

    test(`${code} has no empty translation values`, () => {
      const empty = Object.entries(translations[code])
        .filter(([, value]) => typeof value !== 'string' || value.trim().length === 0)
        .map(([key]) => key);

      expect(empty, `${code} has empty values for: ${empty.join(', ')}`).toEqual([]);
    });

    test(`${code} has translated content (not just copied English) for every translatable key`, () => {
      const untranslated = englishKeys.filter((key) => {
        if (untranslatedValueAllowlist.has(`${code}:${key}`)) return false;
        if (!containsTranslatableProse(translations.EN[key])) return false;
        return translations[code][key] === translations.EN[key];
      });

      expect(
        untranslated,
        `${code} has the exact English text for: ${untranslated.join(', ')}. If this is an intentional ` +
          `cognate (the correct translation happens to match English), add "${code}:<key>" to ` +
          `untranslatedValueAllowlist with a comment explaining why.`,
      ).toEqual([]);
    });
  }
});

/**
 * Same guard, applied to the product catalog's localized copy (products.ts),
 * which uses the same "Partial<Record<...>>" pattern (names, category
 * labels, category-group labels) plus a phrase-substitution fallback for
 * technical summaries/bullets — both have the same silent English-fallback
 * failure mode when a product or phrase is added without translations.
 *
 * Real catalog content (slug/category/categoryGroup/summary/bullets) is read
 * via the TypeScript compiler API (see e2e/lib/read-product-catalog.ts)
 * instead of importing src/data/products.ts directly, since that module
 * imports product photos (PNG) which only Vite can resolve.
 */
test.describe('translation key parity (products.ts localized product copy)', () => {
  const catalog = readProductCatalog(path.resolve(currentDir, '../src/data/products.ts'));
  const categories = [...new Set(catalog.map((product) => product.category))].sort();
  const categoryGroups = [...new Set(catalog.map((product) => product.categoryGroup))].sort();

  test('product catalog facts used by this test are non-empty (sanity check)', () => {
    expect(catalog.length).toBeGreaterThan(0);
    expect(categories.length).toBeGreaterThan(0);
    expect(categoryGroups.length).toBeGreaterThan(0);
  });

  for (const code of nonEnglishLanguages) {
    test(`${code} has a localized name, category, summary, and bullets for every product (no fallback warnings)`, async () => {
      const { localizeProduct } = await import('../src/i18n/products');

      const fallbackWarnings: string[] = [];
      const originalWarn = console.warn;
      console.warn = (...args: unknown[]) => {
        const message = args.join(' ');
        if (message.includes('[i18n-product-fallback]')) fallbackWarnings.push(message);
        else originalWarn(...args);
      };

      const nameFallback: string[] = [];
      const categoryFallback: string[] = [];
      const summaryFallback: string[] = [];
      const bulletsFallback: string[] = [];

      try {
        for (const product of catalog) {
          const localized = localizeProduct(product as any, code as any);
          if (localized.name === product.name) nameFallback.push(product.slug);
          if (localized.category === product.category) categoryFallback.push(product.slug);

          if (containsTranslatableProse(product.summary) && localized.summary === product.summary) {
            summaryFallback.push(product.slug);
          }

          // Check every translatable bullet independently — a product with
          // 3 bullets where only 1 gets translated is exactly the "English
          // mixed back in" regression this test exists to catch, and must
          // not be masked by checking whether *all* bullets stayed English.
          for (const [index, bullet] of product.bullets.entries()) {
            if (untranslatedProductBulletAllowlist.has(`${code}:${product.slug}[${index}]`)) continue;
            if (containsTranslatableProse(bullet) && localized.bullets[index] === bullet) {
              bulletsFallback.push(`${product.slug}[${index}]`);
            }
          }
        }
      } finally {
        console.warn = originalWarn;
      }

      expect(nameFallback, `${code} is missing localized names for: ${nameFallback.join(', ')}`).toEqual([]);
      expect(
        categoryFallback,
        `${code} is missing localized categories for: ${categoryFallback.join(', ')}`,
      ).toEqual([]);
      expect(
        summaryFallback,
        `${code} is showing untranslated English summaries for: ${summaryFallback.join(', ')}`,
      ).toEqual([]);
      expect(
        bulletsFallback,
        `${code} is showing untranslated English bullets for: ${bulletsFallback.join(', ')}`,
      ).toEqual([]);
      expect(
        fallbackWarnings,
        `localizeProduct() reported fallback warnings for ${code}:\n${fallbackWarnings.join('\n')}`,
      ).toEqual([]);
    });

    test(`${code} has a localized label for every category`, async () => {
      const { localizedCategoryLabel } = await import('../src/i18n/products');
      const missing = categories.filter((category) => localizedCategoryLabel(category, code as any) === category);

      expect(
        missing,
        `${code} is missing localized category labels for: ${missing.join(', ')} (falls back to English)`,
      ).toEqual([]);
    });

    test(`${code} has a localized label for every category group`, async () => {
      const { localizedCategoryGroupLabel } = await import('../src/i18n/products');
      const missing = categoryGroups.filter(
        (group) => localizedCategoryGroupLabel(group, code as any) === group,
      );

      expect(
        missing,
        `${code} is missing localized category-group labels for: ${missing.join(', ')} (falls back to English)`,
      ).toEqual([]);
    });
  }
});
