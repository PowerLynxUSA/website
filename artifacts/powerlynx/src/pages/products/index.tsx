import { products, productLines, categories } from '@/data/products';
import { Link } from 'wouter';
import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, ChevronRight, X, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ModelBadge } from '@/components/model-badge';
import textureUrl from '@/assets/generated/texture-metal.jpg';
import { useLanguage } from '@/i18n';
import { localizeProduct, localizedCategoryLabel, localizedLineLabel, localizedA2LBadgeLabel } from '@/i18n/products';

export function ProductsIndex() {
  const [search, setSearch] = useState("");
  const [activeLine, setActiveLine] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const { t, language } = useLanguage();

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
       const localized = localizeProduct(p, language);
       const matchesSearch = `${p.name} ${localized.name}`.toLowerCase().includes(search.toLowerCase()) ||
                            p.models.toLowerCase().includes(search.toLowerCase());
      const matchesLine = activeLine ? p.line === activeLine : true;
      const matchesCategory = activeCategory ? p.category === activeCategory : true;
      
      return matchesSearch && matchesLine && matchesCategory;
    });
   }, [search, activeLine, activeCategory, language]);

  return (
    <div className="flex flex-col min-h-screen bg-background pb-24">
      {/* HEADER */}
      <div className="bg-secondary text-secondary-foreground relative py-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={textureUrl} alt="" className="w-full h-full object-cover opacity-10" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tight text-white mb-4">
             {t('products.title')}
          </h1>
          <p className="text-secondary-foreground/70 max-w-2xl text-lg">
             {t('products.description')}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8 flex flex-col md:flex-row gap-8 items-start">
        {/* SIDEBAR FILTERS */}
        <aside className="w-full md:w-64 shrink-0 space-y-8 md:sticky md:top-28 self-start">
          <div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                 placeholder={t('products.search')}
                className="pl-9 rounded-none border-border bg-card font-mono"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-display font-bold uppercase tracking-widest text-sm flex items-center gap-2 border-b border-border pb-2">
              <SlidersHorizontal className="w-4 h-4" />
               {t('products.productLine')}
            </h3>
            <div className="flex flex-col gap-2">
              <Button 
                variant={activeLine === null ? "default" : "outline"} 
                className="justify-start rounded-none uppercase font-bold tracking-wider text-xs h-9"
                onClick={() => setActiveLine(null)}
              >
                 {t('products.allLines')}
              </Button>
              {productLines.map(line => (
                <Button 
                  key={line}
                  variant={activeLine === line ? "default" : "outline"} 
                  className="justify-start rounded-none uppercase font-bold tracking-wider text-xs h-9"
                  onClick={() => { setActiveLine(line); setActiveCategory(null); }}
                >
                   {localizedLineLabel(line, language)}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-display font-bold uppercase tracking-widest text-sm border-b border-border pb-2">
               {t('products.category')}
            </h3>
            <div className="flex flex-col gap-1 max-h-[40vh] overflow-y-auto pr-2 scrollbar-thin">
              <button 
                onClick={() => setActiveCategory(null)}
                className={`text-left text-sm py-1.5 transition-colors ${activeCategory === null ? 'text-primary font-bold' : 'text-muted-foreground hover:text-foreground'}`}
              >
                 {t('products.allCategories')}
              </button>
              {categories
                .filter(c => !activeLine || products.find(p => p.category === c && p.line === activeLine))
                .map(category => (
                <button 
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`text-left text-sm py-1.5 transition-colors ${activeCategory === category ? 'text-primary font-bold' : 'text-muted-foreground hover:text-foreground'}`}
                >
                   {localizedCategoryLabel(category, language)}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* MAIN LIST */}
        <main className="flex-1 w-full">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
            <div className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
               {t('products.showing')} {filteredProducts.length} {filteredProducts.length === 1 ? t('products.result') : t('products.results')}
            </div>
            
            {(search || activeLine || activeCategory) && (
              <Button 
                variant="ghost" 
                size="sm"
                className="text-xs uppercase tracking-widest font-bold text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={() => { setSearch(""); setActiveLine(null); setActiveCategory(null); }}
              >
                 <X className="w-3 h-3 mr-2" /> {t('products.clearFilters')}
              </Button>
            )}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="py-24 text-center bg-card border border-border border-dashed">
               <p className="text-lg font-bold text-muted-foreground uppercase tracking-widest mb-2">{t('products.noProducts')}</p>
               <p className="text-sm text-muted-foreground/70">{t('products.adjustFilters')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {filteredProducts.map(product => {
                 const localized = localizeProduct(product, language);
                 return (
                <Link key={product.slug} href={`/products/${product.slug}`} data-testid={`link-product-${product.slug}`}>
                  <div className="group flex flex-col h-full bg-card border border-border hover:border-primary transition-all duration-300 hover:shadow-lg">
                    <div className="aspect-[4/3] bg-white flex items-center justify-center relative overflow-hidden border-b border-border">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                        data-testid={`img-product-${product.slug}`}
                      />
                      <div className="absolute top-3 left-3 flex flex-col items-start gap-1.5">
                        <Badge variant={product.line === 'HVAC Tool' ? 'default' : 'secondary'} className="rounded-none uppercase tracking-widest text-[10px]">
                           {localizedLineLabel(product.line, language)}
                        </Badge>
                        {product.a2lCompatible && (
                          <Badge
                            className="rounded-none uppercase tracking-widest text-[10px] bg-emerald-600 text-white gap-1"
                            data-testid={`badge-a2l-${product.slug}`}
                          >
                            <ShieldCheck className="w-3 h-3" />
                            {localizedA2LBadgeLabel(language)}
                          </Badge>
                        )}
                      </div>
                      <ChevronRight className="absolute top-3 right-3 w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors group-hover:translate-x-1" />
                    </div>
                    
                    <div className="p-6 flex-1 flex flex-col">
                       <div className="text-xs font-bold text-primary mb-2 uppercase tracking-wider line-clamp-1">{localized.category}</div>
                       <h3 className="font-bold text-lg leading-tight mb-4 group-hover:text-primary transition-colors">{localized.name}</h3>
                       <p className="text-sm text-muted-foreground mb-6 line-clamp-3">{localized.summary}</p>
                      
                      <div className="mt-auto pt-4 border-t border-border/50">
                        <ModelBadge models={product.models} size="sm" />
                      </div>
                    </div>
                  </div>
                </Link>
                 );
               })}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
