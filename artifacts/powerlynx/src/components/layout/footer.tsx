import { Link } from 'wouter';
import { Phone, Mail, MapPin } from 'lucide-react';
import logoUrl from '@/assets/brand/powerlynx-logo.png';
import { useLanguage } from '@/i18n';

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-secondary text-secondary-foreground pt-16 pb-8 border-t-4 border-primary">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <img src={logoUrl} alt="POWERLYNX" className="h-12 object-contain mb-6 invert brightness-0" style={{ filter: 'brightness(0) invert(1)' }} />
            <p className="text-secondary-foreground/70 text-sm mb-6 max-w-sm">
              {t('home.heroDescription1')}
            </p>
          </div>

          <div>
            <h3 className="font-display text-xl font-bold tracking-widest uppercase mb-6 text-white">{t('footer.company')}</h3>
            <ul className="flex flex-col gap-3">
              <li>
                <Link href="/" className="text-secondary-foreground/70 hover:text-primary transition-colors font-bold tracking-wide uppercase text-sm">{t('nav.home')}</Link>
              </li>
              <li>
                <Link href="/about" className="text-secondary-foreground/70 hover:text-primary transition-colors font-bold tracking-wide uppercase text-sm">{t('nav.about')}</Link>
              </li>
              <li>
                <Link href="/products" className="text-secondary-foreground/70 hover:text-primary transition-colors font-bold tracking-wide uppercase text-sm">{t('nav.products')}</Link>
              </li>
              <li>
                <Link href="/contact" className="text-secondary-foreground/70 hover:text-primary transition-colors font-bold tracking-wide uppercase text-sm">{t('nav.contact')}</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-xl font-bold tracking-widest uppercase mb-6 text-white">{t('footer.contact')}</h3>
            <ul className="flex flex-col gap-4 text-sm text-secondary-foreground/70">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span>
                  Powerlink Inc.<br />
                  915 Secaucus Rd<br />
                  Secaucus, NJ 07094<br />
                  United States
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a href="tel:8888187693" className="hover:text-primary transition-colors font-bold">
                  888-818-POWER
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-xl font-bold tracking-widest uppercase mb-6 text-white">{t('footer.inquiries')}</h3>
            <ul className="flex flex-col gap-4 text-sm text-secondary-foreground/70">
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <div>
                   <span className="block text-xs uppercase tracking-wider text-secondary-foreground/50">{t('footer.general')}</span>
                  <a href="mailto:info@powerlinkus.com" className="hover:text-primary transition-colors font-bold">
                    info@powerlinkus.com
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <div>
                   <span className="block text-xs uppercase tracking-wider text-secondary-foreground/50">{t('contact.ordersQuotes')}</span>
                  <a href="mailto:orders@powerlinkus.com" className="hover:text-primary transition-colors font-bold">
                    orders@powerlinkus.com
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-secondary-foreground/50 text-sm font-bold tracking-widest uppercase">
             © {new Date().getFullYear()} Powerlink Inc. {t('footer.rights')}
          </p>
          <p className="text-secondary-foreground/30 text-xs font-bold tracking-widest uppercase">
             {t('footer.tagline')}
          </p>
        </div>
      </div>
    </footer>
  );
}
