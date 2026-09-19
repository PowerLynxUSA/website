export type ContactFormValues = {
  name: string;
  company: string;
  country: string;
  email: string;
  phone: string;
  inquiryType: string;
  message: string;
  website?: string;
};

export const contactRecipients = [
  'info@powerlinkus.com',
  'orders@powerlinkus.com',
] as const;

export function getInquiryRecipient(data: Pick<ContactFormValues, 'inquiryType'>) {
  return data.inquiryType === 'Quote Request'
    ? contactRecipients[1]
    : contactRecipients[0];
}