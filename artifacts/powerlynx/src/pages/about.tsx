import { ShieldCheck, HardHat, Wrench, Zap, Globe, Users } from 'lucide-react';
import aboutWarehouseUrl from '@/assets/generated/about-warehouse.jpg';
import aboutTechnicianUrl from '@/assets/generated/about-technician-branded-v3.jpg';
import textureUrl from '@/assets/generated/texture-metal.jpg';
import { useLanguage } from '@/i18n';
import { useDocumentMeta } from '@/hooks/use-document-meta';

export function About() {
  const { t } = useLanguage();

  useDocumentMeta({
    title: t('about.metaTitle'),
    description: t('about.metaDescription'),
    path: '/about',
  });

  return (
    <div className="flex flex-col min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">

      {/* HERO */}
      <div className="bg-secondary text-secondary-foreground relative pt-32 pb-24 overflow-hidden border-b border-primary/20">
        <div className="absolute inset-0 z-0">
          <img src={textureUrl} alt="" className="w-full h-full object-cover opacity-20 mix-blend-overlay grayscale" />
          <div className="absolute inset-0 bg-gradient-to-b from-secondary/80 via-secondary/90 to-secondary" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-block bg-primary/10 border border-primary/30 px-3 py-1 mb-6">
               <span className="font-display font-medium text-primary tracking-widest uppercase text-sm" data-testid="text-about-launch">
                 {t('about.launch')}
               </span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold uppercase tracking-tight text-white mb-6 leading-[1.1]" data-testid="text-hero-title">
               {t('about.heroTitle')}
            </h1>
            <p className="text-secondary-foreground/70 max-w-2xl text-xl font-medium leading-relaxed" data-testid="text-hero-desc">
               {t('about.heroDescription')}
            </p>
          </div>
        </div>
      </div>

      {/* THE BELIEF (Massive Typography) */}
      <section className="py-32 bg-card relative overflow-hidden">
         <div className="absolute top-0 right-0 w-1/3 h-full bg-muted/30 -skew-x-12 translate-x-16 z-0" />
         <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-5xl">
               <div className="w-16 h-2 bg-primary mb-10" />
               <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-foreground leading-[1.15]" data-testid="text-belief">
                 "{t('about.belief')}"
               </h2>
            </div>
         </div>
      </section>

      {/* SOURCING & WAREHOUSE */}
      <section className="py-24 bg-muted border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative group" data-testid="img-warehouse-container">
              <div className="absolute -inset-4 bg-primary/5 border border-primary/20 z-0 transition-transform duration-500 group-hover:-translate-x-2 group-hover:-translate-y-2" />
              <img
                src={aboutWarehouseUrl}
                alt="HVAC/R equipment distribution warehouse"
                className="relative z-10 w-full h-auto shadow-2xl object-cover grayscale-[0.2] contrast-125 transition-all duration-700 group-hover:grayscale-0 group-hover:contrast-100"
              />
              <div className="absolute -bottom-6 -right-6 z-20 bg-card p-6 shadow-xl border border-border hidden md:block">
                 <div className="font-display text-4xl font-bold text-primary">2026</div>
                 <div className="text-sm text-muted-foreground uppercase tracking-wider font-bold">{t('about.brandLaunch')}</div>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                 <h2 className="font-display text-4xl font-bold uppercase tracking-tight mb-4" data-testid="text-sourcing-title">
                   {(() => {
                     const title = t('about.sourcingTitle');
                     const sentences = title.split('. ').filter(Boolean);
                     if (sentences.length < 2) return title;
                     const lastIndex = sentences.length - 1;
                     return sentences.map((sentence, i) => (
                       <span key={i} className={i === lastIndex ? 'text-primary' : ''}>
                         {sentence}{i < lastIndex ? '. ' : ''}
                       </span>
                     ));
                   })()}
                 </h2>
                <p className="text-lg font-semibold text-foreground/90 leading-relaxed" data-testid="text-sourcing-desc">
                   {(() => {
                     const desc = t('about.sourcingDescription');
                     const parts = desc.split('POWERLYNX');
                     if (parts.length < 2) return desc;
                     return parts.map((part, i) => (
                       <span key={i}>
                         {part}
                         {i < parts.length - 1 && <strong className="font-extrabold text-primary">POWERLYNX</strong>}
                       </span>
                     ));
                   })()}
                </p>
                <p className="text-lg font-semibold text-foreground/90 leading-relaxed mt-5" data-testid="text-brand-story">
                   {t('about.brandStory')}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
                 <div className="flex items-start gap-4">
                   <Globe className="w-11 h-11 text-primary shrink-0 mt-1" strokeWidth={1.5} />
                   <div>
                      <h4 className="font-bold text-foreground mb-1 uppercase tracking-wide text-base">{t('about.globalSourcing')}</h4>
                      <p className="text-foreground/80 font-medium text-base leading-relaxed">{t('about.globalSourcingDesc')}</p>
                   </div>
                 </div>
                 <div className="flex items-start gap-4">
                   <ShieldCheck className="w-11 h-11 text-primary shrink-0 mt-1" strokeWidth={1.5} />
                   <div>
                      <h4 className="font-bold text-foreground mb-1 uppercase tracking-wide text-base">{t('about.disciplinedQuality')}</h4>
                      <p className="text-foreground/80 font-medium text-base leading-relaxed">{t('about.disciplinedQualityDesc')}</p>
                   </div>
                 </div>
                 <div className="flex items-start gap-4 sm:col-span-2">
                   <Users className="w-11 h-11 text-primary shrink-0 mt-1" strokeWidth={1.5} />
                   <div>
                      <h4 className="font-bold text-foreground mb-1 uppercase tracking-wide text-base">{t('about.marketFeedback')}</h4>
                      <p className="text-foreground/80 font-medium text-base leading-relaxed">{t('about.marketFeedbackDesc')}</p>
                   </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THE FOUR PROMISES */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
             <h2 className="font-display text-4xl font-bold uppercase tracking-tight mb-4" data-testid="text-promises-title">{t('about.promisesTitle')}</h2>
             <div className="w-16 h-1 bg-primary mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Promise 1 */}
            <div className="bg-card p-10 border border-border shadow-sm hover:shadow-md hover:border-primary/50 transition-all duration-300 group" data-testid="card-promise-reliability">
              <div className="w-14 h-14 bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                <ShieldCheck className="w-7 h-7" />
              </div>
               <h3 className="font-display text-2xl font-bold uppercase tracking-wide mb-3">{t('about.promiseReliability')}</h3>
               <p className="text-foreground/80 font-semibold text-lg">{t('about.promiseReliabilityDesc')}</p>
            </div>

            {/* Promise 2 */}
            <div className="bg-card p-10 border border-border shadow-sm hover:shadow-md hover:border-primary/50 transition-all duration-300 group" data-testid="card-promise-quality">
              <div className="w-14 h-14 bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                <Wrench className="w-7 h-7" />
              </div>
               <h3 className="font-display text-2xl font-bold uppercase tracking-wide mb-3">{t('about.promiseQuality')}</h3>
               <p className="text-foreground/80 font-semibold text-lg">{t('about.promiseQualityDesc')}</p>
            </div>

            {/* Promise 3 */}
            <div className="bg-card p-10 border border-border shadow-sm hover:shadow-md hover:border-primary/50 transition-all duration-300 group" data-testid="card-promise-design">
              <div className="w-14 h-14 bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                <HardHat className="w-7 h-7" />
              </div>
               <h3 className="font-display text-2xl font-bold uppercase tracking-wide mb-3">{t('about.promiseDesign')}</h3>
               <p className="text-foreground/80 font-semibold text-lg">{t('about.promiseDesignDesc')}</p>
            </div>

            {/* Promise 4 */}
            <div className="bg-card p-10 border border-border shadow-sm hover:shadow-md hover:border-primary/50 transition-all duration-300 group" data-testid="card-promise-agility">
              <div className="w-14 h-14 bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                <Zap className="w-7 h-7" />
              </div>
               <h3 className="font-display text-2xl font-bold uppercase tracking-wide mb-3">{t('about.promiseAgility')}</h3>
               <p className="text-foreground/80 font-semibold text-lg">{t('about.promiseAgilityDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CLOSING / PLEDGE */}
      <section className="py-0 bg-secondary text-secondary-foreground overflow-hidden">
         <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-12 md:p-24 flex flex-col justify-center relative">
               <div className="absolute inset-0 z-0">
                 <img src={textureUrl} alt="" className="w-full h-full object-cover opacity-10 mix-blend-overlay grayscale" />
               </div>
               <div className="relative z-10 max-w-xl">
                  <div className="w-16 h-1 bg-primary mb-8" />
                  <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-white mb-6 leading-[1.05]" data-testid="text-closing-title">
                    {t('about.closingTitle')}
                  </h2>
                  <p className="text-xl text-secondary-foreground/70 font-medium leading-relaxed mb-10" data-testid="text-closing-desc">
                     {t('about.closingDescription')}
                  </p>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-3 mb-10 text-white font-display text-lg uppercase tracking-wide" data-testid="list-delivered-promises">
                    {[
                      t('about.deliveredPerformance'),
                      t('about.deliveredQuality'),
                      t('about.deliveredValue'),
                      t('about.deliveredPromises'),
                    ].map((item) => (
                      <div key={item} className="border-l-2 border-primary pl-3">{item}</div>
                    ))}
                  </div>
                  <div className="inline-flex items-center gap-3 text-sm tracking-widest uppercase font-bold text-primary bg-primary/10 px-4 py-2 border border-primary/20">
                     <div className="w-2 h-2 rounded-full bg-primary" />
                     {t('about.headquarters')}
                  </div>
               </div>
            </div>
            <div className="h-80 lg:h-auto w-full relative group overflow-hidden" data-testid="img-technician-container">
               <img src={aboutTechnicianUrl} alt="POWERLYNX Technician" className="w-full h-full object-cover grayscale-[0.1] contrast-125 transition-transform duration-1000 group-hover:scale-105" />
               <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-secondary via-secondary/20 to-transparent opacity-80" />
            </div>
         </div>
      </section>
    </div>
  );
}
