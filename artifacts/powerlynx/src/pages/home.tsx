import { Link } from 'wouter';
import { ArrowRight, ShieldCheck, Wrench, Zap, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ModelBadge } from '@/components/model-badge';
import { products, productLines } from '@/data/products';
import markUrl from '@/assets/brand/powerlynx-mark.png';
import catalogCollageUrl from '@/assets/brand/catalog-hero-collage.jpeg';
import heroBgUrl from '@/assets/generated/hero-technician.jpg';
import textureUrl from '@/assets/generated/texture-metal.jpg';
import { useLanguage } from '@/i18n';
import { localizeProducts, localizedLineLabel } from '@/i18n/products';

export function Home() {
  const { t, language } = useLanguage();
  const featuredProducts = localizeProducts(products.slice(0, 4), language);

  return (
    <div className="flex flex-col min-h-screen">
      {/* HERO SECTION */}
      <section className="relative h-[88vh] min-h-[680px] flex items-end justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-secondary/35 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/75 to-transparent z-10" />
          <img 
            src={heroBgUrl} 
            alt="Confident HVAC technician on a rooftop with the American flag" 
            className="w-full h-full object-cover object-[center_8%]"
          />
        </div>
        
        <div className="container relative z-20 px-4 pb-16 md:pb-20 text-center">
          <h1 className="font-display text-[2.1rem] md:text-[3.15rem] lg:text-[4.2rem] font-bold text-white uppercase tracking-tight mb-2 animate-in slide-in-from-bottom-8 duration-700">
             POWER <span className="text-primary">DELIVERED</span>
          </h1>
          <h2 className="font-display text-[2.1rem] md:text-[3.15rem] lg:text-[4.2rem] font-bold text-white uppercase tracking-tight mb-6 animate-in slide-in-from-bottom-8 duration-700 delay-100">
             {t('home.heroDescription1')}
          </h2>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-secondary-foreground/80 mb-10 font-medium animate-in slide-in-from-bottom-8 duration-700 delay-150">
             {t('home.heroDescription2')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in slide-in-from-bottom-8 duration-700 delay-300">
            <Button size="lg" asChild className="text-lg h-14 px-8 rounded-none font-bold uppercase tracking-widest w-full sm:w-auto">
               <Link href="/products">{t('home.viewCatalog')}</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-lg h-14 px-8 rounded-none font-bold uppercase tracking-widest w-full sm:w-auto bg-transparent text-white border-white hover:bg-white hover:text-secondary">
               <Link href="/about">{t('home.ourStandards')}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CREDIBILITY STRIP */}
      <section className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-primary-foreground/20">
            <div className="flex flex-col items-center gap-3 px-4 pt-4 md:pt-0">
              <ShieldCheck className="w-8 h-8" />
               <h3 className="font-display font-bold text-xl uppercase tracking-widest">{t('home.certifiedQuality')}</h3>
               <p className="text-sm font-medium text-primary-foreground/80">{t('home.certifiedQualityDescription')}</p>
            </div>
            <div className="flex flex-col items-center gap-3 px-4 pt-8 md:pt-0">
              <Wrench className="w-8 h-8" />
               <h3 className="font-display font-bold text-xl uppercase tracking-widest">{t('home.tradeEngineered')}</h3>
               <p className="text-sm font-medium text-primary-foreground/80">{t('home.tradeEngineeredDescription')}</p>
            </div>
            <div className="flex flex-col items-center gap-3 px-4 pt-8 md:pt-0">
              <Zap className="w-8 h-8" />
               <h3 className="font-display font-bold text-xl uppercase tracking-widest">{t('home.precisionPerformance')}</h3>
               <p className="text-sm font-medium text-primary-foreground/80">{t('home.precisionPerformanceDescription')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED CATEGORY COLLAGE */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight mb-6">
                 {t('home.equipmentLineup')} <br/>
                 <span className="text-primary">{t('home.equipmentLineupAccent')}</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-lg">
                 {t('home.equipmentLineupDescription')}
              </p>
              
              <div className="space-y-4 mb-10">
                {productLines.map(line => (
                  <div key={line} className="flex items-center gap-4 p-4 bg-background border border-border">
                    <div className="w-12 h-12 bg-muted flex items-center justify-center text-primary font-display font-bold text-xl">
                      {line === 'HVAC Tool' ? 'T' : 'S'}
                    </div>
                    <div>
                       <h4 className="font-bold text-lg uppercase tracking-wide">{localizedLineLabel(line, language)} Series</h4>
                       <p className="text-sm text-muted-foreground">{line === 'HVAC Tool' ? t('home.toolSeries') : t('home.supplySeries')}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button asChild className="rounded-none font-bold uppercase tracking-widest gap-2">
                <Link href="/products">
                   {t('home.exploreCategories')} <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
            
            <div className="relative group">
              <div className="absolute inset-0 bg-primary/5 translate-x-4 translate-y-4 transition-transform group-hover:translate-x-2 group-hover:translate-y-2" />
              <img 
                src={catalogCollageUrl} 
                alt="POWERLYNX Featured Tools Collage" 
                className="relative z-10 w-full h-auto border border-border bg-white shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={textureUrl} alt="" className="w-full h-full object-cover opacity-[0.03] grayscale" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
            <div>
               <h2 className="font-display text-4xl font-bold uppercase tracking-tight mb-2">{t('home.featuredProducts')}</h2>
               <p className="text-muted-foreground">{t('home.topRequested')}</p>
            </div>
            <Button variant="outline" asChild className="rounded-none font-bold uppercase tracking-widest gap-2">
              <Link href="/products">
                 {t('home.viewAll')} <ChevronRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <Link key={product.slug} href={`/products/${product.slug}`}>
                <div className="group h-full flex flex-col bg-card border border-border hover:border-primary transition-colors duration-300">
                  <div className="aspect-square bg-white p-6 flex items-center justify-center relative overflow-hidden border-b border-border">
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors" />
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                      data-testid={`img-featured-${product.slug}`}
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="text-xs font-bold text-primary mb-2 uppercase tracking-wider">{product.category}</div>
                    <h3 className="font-bold text-lg leading-tight mb-4 group-hover:text-primary transition-colors">{product.name}</h3>
                    <div className="mt-auto pt-4 border-t border-border">
                      <ModelBadge models={product.models} size="sm" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-secondary text-secondary-foreground py-24 text-center">
        <div className="container mx-auto px-4">
          <img src={markUrl} alt="" className="w-12 h-12 mx-auto mb-8 opacity-50 brightness-0 invert" style={{ filter: 'brightness(0) invert(1)' }} />
           <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight mb-6 text-white">{t('home.readyToStock')}</h2>
           <p className="max-w-2xl mx-auto text-lg text-secondary-foreground/70 mb-10">{t('home.partnerDescription')}</p>
          <Button size="lg" asChild className="text-lg h-14 px-8 rounded-none font-bold uppercase tracking-widest">
             <Link href="/contact">{t('home.becomeDistributor')}</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
