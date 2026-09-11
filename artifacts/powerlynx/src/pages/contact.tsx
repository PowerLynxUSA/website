import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Phone, Mail, MapPin, Building2, Send, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import textureUrl from '@/assets/generated/texture-metal.jpg';
import { useLanguage } from '@/i18n';
import type { TranslationKey } from '@/i18n/translations';
import { useDocumentMeta } from '@/hooks/use-document-meta';

type ContactFormValues = {
  name: string;
  company: string;
  country: string;
  email: string;
  phone: string;
  inquiryType: string;
  message: string;
};

function createContactSchema(t: (key: TranslationKey) => string) {
  return z.object({
    name: z.string().min(2, t('contact.validationName')),
    company: z.string().min(2, t('contact.validationCompany')),
    country: z.string().min(2, t('contact.validationCountry')),
    email: z.string().email(t('contact.validationEmail')),
    phone: z.string().min(10, t('contact.validationPhone')),
    inquiryType: z.string().min(1, t('contact.validationInquiryType')),
    message: z.string().min(10, t('contact.validationMessage')),
  });
}

const contactRecipients = ['info@powerlinkus.com', 'orders@powerlinkus.com'];

function createMailtoLink(data: ContactFormValues) {
  const subject = `[POWERLYNX] ${data.inquiryType} from ${data.name}`;
  const body = [
    'POWERLYNX Website Inquiry',
    '',
    `Name: ${data.name}`,
    `Company: ${data.company}`,
    `Country: ${data.country}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    `Inquiry Type: ${data.inquiryType}`,
    '',
    'Message:',
    data.message,
  ].join('\n');

  return `mailto:${contactRecipients.join(',')}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function Contact() {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [isSubmitted, setIsSubmitted] = useState(false);

  useDocumentMeta({
    title: 'Contact Powerlink Inc.',
    description: 'Get in touch with Powerlink Inc. for POWERLYNX HVAC/R tools — sales inquiries, distribution, and support across North America.',
    path: '/contact',
  });
  const contactSchema = createContactSchema(t);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      company: "",
      country: "",
      email: "",
      phone: "",
      inquiryType: "",
      message: "",
    },
  });

  function onSubmit(data: ContactFormValues) {
    window.location.href = createMailtoLink(data);
    setIsSubmitted(true);
    toast({
       title: t('contact.emailDraftReady'),
       description: t('contact.emailDraftDescription'),
    });
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* HEADER */}
      <div className="bg-secondary text-secondary-foreground relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={textureUrl} alt="" className="w-full h-full object-cover opacity-10" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tight text-white mb-4">
             {t('contact.title')}
          </h1>
          <p className="text-secondary-foreground/70 max-w-2xl text-lg">
             {t('contact.description')}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          
          {/* INFO COLUMN */}
          <div className="lg:col-span-1 space-y-10">
            <div>
               <h2 className="font-display text-2xl font-bold uppercase tracking-widest mb-6 border-b border-border pb-2">{t('contact.headquarters')}</h2>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block font-bold text-foreground mb-1">Powerlink Inc.</strong>
                     <span className="text-muted-foreground text-sm font-medium">{t('contact.companyTagline')}</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <address className="not-italic text-muted-foreground text-sm font-medium leading-relaxed">
                    915 Secaucus Rd<br />
                    Secaucus, NJ 07094<br />
                    United States
                  </address>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                     <strong className="block text-xs uppercase tracking-widest text-muted-foreground mb-1">{t('contact.callUs')}</strong>
                    <a href="tel:8888187693" className="text-lg font-bold text-foreground hover:text-primary transition-colors">
                      888-818-POWER <span className="text-sm font-normal text-muted-foreground">(7693)</span>
                    </a>
                  </div>
                </li>
              </ul>
            </div>

            <div>
               <h2 className="font-display text-2xl font-bold uppercase tracking-widest mb-6 border-b border-border pb-2">{t('contact.emailDirectory')}</h2>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-muted text-muted-foreground flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                     <strong className="block text-xs uppercase tracking-widest text-muted-foreground mb-1">{t('contact.generalInquiries')}</strong>
                    <a href="mailto:info@powerlinkus.com" className="font-bold text-foreground hover:text-primary transition-colors">
                      info@powerlinkus.com
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-muted text-muted-foreground flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                     <strong className="block text-xs uppercase tracking-widest text-muted-foreground mb-1">{t('contact.ordersQuotes')}</strong>
                    <a href="mailto:orders@powerlinkus.com" className="font-bold text-foreground hover:text-primary transition-colors">
                      orders@powerlinkus.com
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* FORM COLUMN */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-border p-6 md:p-10 shadow-sm">
               <h2 className="font-display text-3xl font-bold uppercase tracking-tight mb-2">{t('contact.sendInquiry')}</h2>
               <p className="text-foreground/80 font-semibold mb-8">{t('contact.sendInquiryDescription')}</p>

              {isSubmitted ? (
                <div className="py-16 text-center animate-in fade-in zoom-in duration-500">
                  <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                    <h3 className="font-display text-3xl font-bold uppercase tracking-tight mb-2">{t('contact.emailDraftReady')}</h3>
                   <p className="text-foreground/80 font-semibold max-w-md mx-auto mb-8">{t('contact.emailDraftDescription')}</p>
                   <div className="mb-8 text-sm text-muted-foreground">
                      <p className="mb-2 font-bold uppercase tracking-widest">{t('contact.recipients')}</p>
                     <p>{contactRecipients.join(' · ')}</p>
                   </div>
                  <Button variant="outline" onClick={() => { setIsSubmitted(false); form.reset(); }} className="rounded-none uppercase font-bold tracking-widest">
                     {t('contact.sendAnother')}
                  </Button>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                           <FormLabel className="uppercase tracking-widest text-xs font-bold text-muted-foreground">{t('contact.fullName')}</FormLabel>
                            <FormControl>
                               <Input placeholder={t('contact.namePlaceholder')} className="rounded-none bg-background focus-visible:ring-primary h-12" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem>
                           <FormLabel className="uppercase tracking-widest text-xs font-bold text-muted-foreground">{t('contact.company')}</FormLabel>
                            <FormControl>
                               <Input placeholder={t('contact.companyPlaceholder')} className="rounded-none bg-background focus-visible:ring-primary h-12" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                           <FormLabel className="uppercase tracking-widest text-xs font-bold text-muted-foreground">{t('contact.email')}</FormLabel>
                            <FormControl>
                               <Input type="email" placeholder={t('contact.emailPlaceholder')} className="rounded-none bg-background focus-visible:ring-primary h-12" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                           <FormLabel className="uppercase tracking-widest text-xs font-bold text-muted-foreground">{t('contact.phone')}</FormLabel>
                            <FormControl>
                              <Input type="tel" placeholder="(555) 123-4567" className="rounded-none bg-background focus-visible:ring-primary h-12" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem>
                           <FormLabel className="uppercase tracking-widest text-xs font-bold text-muted-foreground">{t('contact.country')}</FormLabel>
                            <FormControl>
                               <Input placeholder={t('contact.countryPlaceholder')} className="rounded-none bg-background focus-visible:ring-primary h-12" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="inquiryType"
                        render={({ field }) => (
                          <FormItem>
                           <FormLabel className="uppercase tracking-widest text-xs font-bold text-muted-foreground">{t('contact.inquiryType')}</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="rounded-none bg-background focus-visible:ring-primary h-12">
                                   <SelectValue placeholder={t('contact.selectType')} />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                 <SelectItem value="Product Inquiry">{t('contact.productInquiry')}</SelectItem>
                                 <SelectItem value="Quote Request">{t('contact.quoteRequest')}</SelectItem>
                                 <SelectItem value="Distribution Partnership">{t('contact.distributionPartnership')}</SelectItem>
                                 <SelectItem value="Other">{t('contact.other')}</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription className="text-xs">
                               {t('contact.mailtoDescription')}
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                           <FormLabel className="uppercase tracking-widest text-xs font-bold text-muted-foreground">{t('contact.message')}</FormLabel>
                          <FormControl>
                            <Textarea 
                               placeholder={t('contact.messagePlaceholder')}
                              className="rounded-none bg-background focus-visible:ring-primary min-h-[150px] resize-y" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full md:w-auto rounded-none font-bold uppercase tracking-widest h-14 px-8 gap-2"
                    >
                       <Send className="w-4 h-4" /> {t('contact.openEmail')}
                    </Button>
                  </form>
                </Form>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
