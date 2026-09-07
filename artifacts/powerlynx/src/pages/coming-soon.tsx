import { Link } from 'wouter';
import { ArrowRight, Mail, Phone } from 'lucide-react';
import logoUrl from '@/assets/brand/powerlynx-logo.png';
import heroBgUrl from '@/assets/generated/hero-technician.jpg';
import textureUrl from '@/assets/generated/texture-metal.jpg';
import { useLanguage } from '@/i18n';

export function ComingSoon() {
  const { t } = useLanguage();

  return (
    <main className="relative min-h-[100dvh] overflow-hidden bg-[#10161b] text-[#f6f3ed]">
      <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:48px_48px]" />
      <div className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-[#f14d2f]/10 blur-3xl" />

      <div className="relative mx-auto flex min-h-[100dvh] w-full max-w-[1440px] flex-col px-5 py-5 sm:px-8 lg:px-12">
        <header className="flex items-center justify-between border-b border-white/10 pb-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-[116px] items-center justify-center bg-[#f6f3ed] px-2 py-1.5 sm:h-14 sm:w-[138px]">
              <img src={logoUrl} alt="POWERLYNX — Power Delivered." className="h-full w-full object-contain" />
            </div>
            <div className="hidden border-l border-white/15 pl-4 sm:block">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/45">Powerlink Inc.</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-white/75">HVAC / R systems</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-right">
            <span className="h-2 w-2 rounded-full bg-[#f14d2f]" aria-hidden="true" />
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-white/60 sm:text-xs">
              {t('coming.launching')}
            </span>
          </div>
        </header>

        <div className="grid flex-1 items-center gap-10 py-10 lg:grid-cols-[minmax(0,0.84fr)_minmax(460px,1.16fr)] lg:gap-16 lg:py-14">
          <section className="max-w-xl">
            <p className="mb-5 flex items-center gap-3 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#f14d2f]">
              <span className="h-px w-8 bg-[#f14d2f]" />
              New tools. Same field standard.
            </p>
            <h1 className="max-w-lg font-display text-[clamp(3.6rem,8vw,7.7rem)] font-bold uppercase leading-[0.84] tracking-[-0.055em] text-[#f6f3ed]">
              {t('coming.powerIs')}
              <span className="mt-2 block text-[#f14d2f]">{t('coming.coming')}</span>
            </h1>
            <p className="mt-8 max-w-lg text-base leading-7 text-white/62 sm:text-lg sm:leading-8">
              {t('coming.description')}
            </p>

            <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:gap-6">
              <a
                href="mailto:info@powerlinkus.com"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.13em] text-white/72 transition-colors hover:text-[#f14d2f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f14d2f]"
              >
                <Mail className="h-4 w-4" aria-hidden="true" /> info@powerlinkus.com
              </a>
              <span className="hidden h-4 w-px bg-white/20 sm:block" aria-hidden="true" />
              <a
                href="tel:8888187693"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.13em] text-white/72 transition-colors hover:text-[#f14d2f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f14d2f]"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                <span>
                  888-818-POWER <span className="text-[0.78em]">(7693)</span>
                </span>
              </a>
            </div>
          </section>

          <section className="relative min-h-[360px] lg:min-h-[560px]">
            <div className="relative h-full min-h-[360px] overflow-hidden border border-white/15 bg-[#202a31] shadow-2xl shadow-black/25 lg:min-h-[560px]">
              <img src={heroBgUrl} alt="HVAC/R technician at work in the field" className="absolute inset-0 h-full w-full object-cover object-[center_25%] opacity-60" />
              <img src={textureUrl} alt="" className="absolute inset-0 h-full w-full object-cover opacity-25 mix-blend-overlay" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#10161b] via-[#10161b]/10 to-[#10161b]/25" />
              <div className="absolute inset-0 [background-image:linear-gradient(rgba(241,77,47,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(241,77,47,0.15)_1px,transparent_1px)] [background-size:42px_42px] opacity-35" />

              <div className="absolute left-5 top-5 flex items-center gap-2 border border-white/20 bg-[#10161b]/85 px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-white sm:left-8 sm:top-8">
                <span className="h-1.5 w-1.5 rounded-full bg-[#f14d2f]" aria-hidden="true" />
                Concept 01 / Field Manual
              </div>
              <div className="absolute bottom-6 left-5 right-5 sm:bottom-9 sm:left-8 sm:right-8">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#f14d2f]">The next standard is taking shape</p>
                <p className="mt-2 max-w-sm font-display text-3xl font-bold uppercase leading-none text-white sm:text-5xl">Ready for the real world.</p>
              </div>
            </div>
          </section>
        </div>

        <footer className="flex flex-col gap-4 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/35">© Powerlink Inc. / POWERLYNX</p>
          <Link
            href="/website"
            className="group inline-flex items-center gap-3 self-start text-xs font-bold uppercase tracking-[0.16em] text-white transition-colors hover:text-[#f14d2f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f14d2f] sm:self-auto"
            data-testid="link-preview-site"
            aria-label="View the website in progress"
          >
            View the website in progress
            <span className="flex h-8 w-8 items-center justify-center border border-[#f14d2f] text-[#f14d2f] transition-transform group-hover:translate-x-1">
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </Link>
        </footer>
      </div>
    </main>
  );
}