import type { TranslationKey } from '@/i18n/translations';

export type ContactFormValues = {
  name: string;
  company: string;
  country: string;
  email: string;
  phone: string;
  inquiryType: string;
  message: string;
};

export const contactRecipients = ['info@powerlinkus.com', 'orders@powerlinkus.com'];

export function createMailtoLink(
  data: ContactFormValues,
  t: (key: TranslationKey) => string,
) {
  const subject = `[POWERLYNX] ${data.inquiryType} — ${data.name}`;
  const body = [
    `POWERLYNX — ${t('contact.sendInquiry')}`,
    '',
    `${t('contact.fullName')}: ${data.name}`,
    `${t('contact.company')}: ${data.company}`,
    `${t('contact.country')}: ${data.country}`,
    `${t('contact.email')}: ${data.email}`,
    `${t('contact.phone')}: ${data.phone}`,
    `${t('contact.inquiryType')}: ${data.inquiryType}`,
    '',
    `${t('contact.message')}:`,
    data.message,
  ].join('\n');

  return `mailto:${contactRecipients.join(',')}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}