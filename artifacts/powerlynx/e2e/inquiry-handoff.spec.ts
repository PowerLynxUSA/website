import { expect, test, type Page } from '@playwright/test';
import {
  contactRecipients,
  createMailtoLink,
  type ContactFormValues,
} from '../src/lib/contact-mailto';
import type { TranslationKey } from '../src/i18n/translations';

const inquiry: ContactFormValues = {
  name: 'José O’Connor',
  company: 'Heat & Cool + Co.',
  country: 'México / USA',
  email: 'jose+quotes@example.com',
  phone: '+1 (201) 555-0199',
  inquiryType: 'Quote Request',
  message: 'Need 20 units & mounting kits.\nPlease quote “rush” delivery + tax.',
};

const englishLabels: Partial<Record<TranslationKey, string>> = {
  'contact.sendInquiry': 'Send an Inquiry',
  'contact.fullName': 'Full Name',
  'contact.company': 'Company',
  'contact.country': 'Country',
  'contact.email': 'Email Address',
  'contact.phone': 'Phone Number',
  'contact.inquiryType': 'Inquiry Type',
  'contact.message': 'Message',
};

const translate = (key: TranslationKey) => englishLabels[key] ?? key;

async function submitInquiry(page: Page) {
  await page.goto('/contact');
  await page.getByLabel('Full Name').fill(inquiry.name);
  await page.getByLabel('Company').fill(inquiry.company);
  await page.getByLabel('Email Address').fill(inquiry.email);
  await page.getByLabel('Phone Number').fill(inquiry.phone);
  await page.getByLabel('Country').fill(inquiry.country);
  await page.getByRole('combobox', { name: 'Inquiry Type' }).click();
  await page.getByRole('option', { name: 'Quote Request' }).click();
  await page.getByLabel('Message').fill(inquiry.message);
  await page.getByRole('button', { name: 'Open Email' }).click();
}

test('mailto draft preserves recipients, subject, line breaks, and special characters', () => {
  const link = createMailtoLink(inquiry, translate);
  const parsed = new URL(link);

  expect(parsed.protocol).toBe('mailto:');
  expect(parsed.pathname).toBe(contactRecipients.join(','));
  expect(parsed.searchParams.get('subject')).toBe(
    '[POWERLYNX] Quote Request — José O’Connor',
  );
  expect(parsed.searchParams.get('body')).toBe(
    [
      'POWERLYNX — Send an Inquiry',
      '',
      'Full Name: José O’Connor',
      'Company: Heat & Cool + Co.',
      'Country: México / USA',
      'Email Address: jose+quotes@example.com',
      'Phone Number: +1 (201) 555-0199',
      'Inquiry Type: Quote Request',
      '',
      'Message:',
      'Need 20 units & mounting kits.',
      'Please quote “rush” delivery + tax.',
    ].join('\n'),
  );
});

for (const [device, viewport] of Object.entries({
  desktop: { width: 1440, height: 900 },
  mobile: { width: 390, height: 844 },
})) {
  test(`${device} submission shows guidance when no mail client opens`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await submitInquiry(page);

    const status = page.getByRole('main').getByRole('status');
    await expect(status).toContainText('Email Draft Ready');
    await expect(status).toContainText(
      'Your email app should now be open with the inquiry prepared.',
    );
    await expect(status).toContainText(contactRecipients[0]);
    await expect(status).toContainText(contactRecipients[1]);
    await expect(page.getByRole('button', { name: 'Send Another Message' })).toBeVisible();
  });
}