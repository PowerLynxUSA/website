import { ShieldCheck, HardHat, Cog, CheckCircle2 } from 'lucide-react';
import aboutWarehouseUrl from '@/assets/generated/about-technician-branded-v2.jpg';
import textureUrl from '@/assets/generated/texture-metal.jpg';
import { useLanguage } from '@/i18n';
import { useDocumentMeta } from '@/hooks/use-document-meta';

export function About() {
  const { t } = useLanguage();

  useDocumentMeta({
    title: 'About Powerlink Inc.',
    description: 'Learn about Powerlink Inc., the American company behind POWERLYNX HVAC/R tools — engineering precision equipment trusted by technicians across North America.',
    path: '/about',
  });

  return (
    <div className="flex flex-col min-h-screen bg-background">
      
      {/* HEADER */}
      <div className="bg-secondary text-secondary-foreground relative py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={textureUrl} alt="" className="w-full h-full object-cover opacity-20 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/90 to-transparent" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="font-display text-5xl md:text-7xl font-bold uppercase tracking-tight text-white mb-6 max-w-3xl">
             {t('about.heroTitle')}
          </h1>
          <p className="text-secondary-foreground/80 max-w-2xl text-xl font-medium">
             {t('about.heroDescription')}
          </p>
        </div>
      </div>

      {/* STORY SECTION */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-muted border border-border z-0" />
              <img 
                src={aboutWarehouseUrl} 
                alt="POWERLYNX HVAC Technician" 
                className="relative z-10 w-full h-auto shadow-2xl object-cover"
              />
            </div>
            
            <div className="space-y-8">
              <div>
                 <h2 className="font-display text-4xl font-bold uppercase tracking-tight mb-4">{t('about.mission')}</h2>
                <div className="w-12 h-1 bg-primary mb-6" />
                <p className="text-lg text-muted-foreground leading-relaxed">
                   {t('about.missionDescription')}
                </p>
              </div>
              
              <div>
                 <h2 className="font-display text-3xl font-bold uppercase tracking-tight mb-4">{t('about.standard')}</h2>
                <ul className="space-y-4">
                  {[
                    t('about.standard1'),
                    t('about.standard2'),
                    t('about.standard3'),
                    t('about.standard4'),
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                      <span className="text-foreground font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="py-24 bg-muted border-y border-border">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
             <h2 className="font-display text-4xl font-bold uppercase tracking-tight mb-4">{t('about.why')}</h2>
             <p className="text-muted-foreground text-lg">{t('about.whyDescription')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-8 border border-border text-center">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="w-8 h-8" />
              </div>
               <h3 className="font-display text-xl font-bold uppercase tracking-widest mb-3">{t('about.safety')}</h3>
               <p className="text-muted-foreground">{t('about.safetyDescription')}</p>
            </div>
            <div className="bg-card p-8 border border-border text-center shadow-lg border-primary/50 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-6">
                <HardHat className="w-8 h-8" />
              </div>
               <h3 className="font-display text-xl font-bold uppercase tracking-widest mb-3">{t('about.jobsite')}</h3>
               <p className="text-muted-foreground">{t('about.jobsiteDescription')}</p>
            </div>
            <div className="bg-card p-8 border border-border text-center">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Cog className="w-8 h-8" />
              </div>
               <h3 className="font-display text-xl font-bold uppercase tracking-widest mb-3">{t('about.precision')}</h3>
               <p className="text-muted-foreground">{t('about.precisionDescription')}</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
