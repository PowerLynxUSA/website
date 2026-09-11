import { products, categoryGroups, categoryTree } from '@/data/products';
import { Link, useSearch } from 'wouter';
import { useState, useMemo, useEffect } from 'react';
import { Search, SlidersHorizontal, ChevronRight, ChevronDown, X, ShieldCheck, ListFilter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ModelBadge } from '@/components/model-badge';
import textureUrl from '@/assets/generated/texture-metal.jpg';
import { useLanguage } from '@/i18n';
import {
  localizeProduct,
  localizedCategoryLabel,
  localizedCategoryGroupLabel,
  localizedA2LBadgeLabel,
} from '@/i18n/products';
import { useDocumentMeta } from '@/hooks/use-document-meta';

export function ProductsIndex() {
  const searchParamsString = useSearch();
  const [search, setSearch] = useState("");
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    "Tubing Tools": true,
    "Utility & Hand Tools": true,
  });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const { t, language } = useLanguage();

  // Deep-link support: /products?group=... and/or /products?category=...
  // let the header's category menu land directly on a pre-filtered view.
  useEffect(() => {
    const params = new URLSearchParams(searchParamsString);
    const group = params.get('group');
    const category = params.get('category');
    setActiveGroup(group && categoryGroups.includes(group as any) ? group : null);
    setActiveCategory(category && categoryTree.some(g => g.items.some(item => item.kind === 'category' ? item.category === category : item.categories.includes(category))) ? category : null);
  }, [searchParamsString]);

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  useDocumentMeta({
    title: 'HVAC/R Tools & Equipment Catalog',
    description: 'Browse the full POWERLYNX catalog of professional HVAC/R tools and equipment from Powerlink Inc., including manifold gauges and A2L-compatible instruments.',
    path: '/products',
  });

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
       const localized = localizeProduct(p, language);
       const matchesSearch = `${p.name} ${localized.name}`.toLowerCase().includes(search.toLowerCase()) ||
                            p.models.toLowerCase().includes(search.toLowerCase());
      const matchesGroup = activeGroup ? p.categoryGroup === activeGroup : true;
      const matchesCategory = activeCategory ? p.category === activeCategory : true;
      
      return matchesSearch && matchesGroup && matchesCategory;
    });
   }, [search, activeGroup, activeCategory, language]);

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

      {/* MOBILE FILTER TOGGLE */}
      <div className="container mx-auto px-4 mt-8 md:hidden">
        <Button
          variant="outline"
          className="w-full justify-between rounded-none uppercase font-bold tracking-widest text-xs h-11"
          onClick={() => setMobileFiltersOpen(open => !open)}
          data-testid="button-toggle-mobile-filters"
        >
          <span className="flex items-center gap-2">
            <ListFilter className="w-4 h-4" />
             {t('products.filters')}
          </span>
          <ChevronDown className={`w-4 h-4 transition-transform ${mobileFiltersOpen ? 'rotate-180' : ''}`} />
        </Button>
      </div>

      <div className="container mx-auto px-4 mt-4 md:mt-8 flex flex-col md:flex-row gap-8 items-start">
        {/* SIDEBAR FILTERS */}
        <aside
          className={`w-full md:w-64 shrink-0 space-y-8 md:sticky md:top-28 self-start ${mobileFiltersOpen ? 'block' : 'hidden'} md:block`}
          data-testid="sidebar-filters"
        >
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
                variant={activeGroup === null ? "default" : "outline"} 
                className="justify-start rounded-none uppercase font-bold tracking-wider text-xs h-9"
                onClick={() => setActiveGroup(null)}
              >
                 {t('products.allLines')}
              </Button>
              {categoryGroups.map(group => (
                <Button 
                  key={group}
                  variant={activeGroup === group ? "default" : "outline"} 
                  className="justify-start rounded-none uppercase font-bold tracking-wider text-xs h-9"
                  onClick={() => { setActiveGroup(group); setActiveCategory(null); }}
                >
                   {localizedCategoryGroupLabel(group, language)}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-display font-bold uppercase tracking-widest text-sm border-b border-border pb-2">
               {t('products.category')}
            </h3>
            <div className="flex flex-col gap-1 max-h-[60vh] overflow-y-auto pr-2 scrollbar-thin">
              <button
                onClick={() => setActiveCategory(null)}
                className={`text-left text-sm py-1.5 transition-colors ${activeCategory === null ? 'text-primary font-bold' : 'text-muted-foreground hover:text-foreground'}`}
                data-testid="button-category-all"
              >
                 {t('products.allCategories')}
              </button>

              {categoryTree.map(({ group, items }) => {
                const groupCategories = items.flatMap(item => item.kind === 'category' ? [item.category] : item.categories);
                const groupHasMatch = !activeGroup || group === activeGroup;
                if (!groupHasMatch) return null;

                return (
                  <div key={group} className="pt-3 first:pt-0">
                    <div className="text-[11px] font-display font-bold uppercase tracking-widest text-foreground/80 mb-1.5 mt-2">
                       {localizedCategoryGroupLabel(group, language)}
                    </div>
                    {items.map(item => {
                      if (item.kind === 'category') {
                        const category = item.category;
                        const hasMatch = !activeGroup || products.some(p => p.category === category && p.categoryGroup === activeGroup);
                        if (!hasMatch) return null;
                        return (
                          <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`w-full text-left text-sm py-1.5 pl-2 transition-colors ${activeCategory === category ? 'text-primary font-bold' : 'text-muted-foreground hover:text-foreground'}`}
                            data-testid={`button-category-${category}`}
                          >
                             {localizedCategoryLabel(category, language)}
                          </button>
                        );
                      }

                      const sectionCategories = item.categories.filter(
                        category => !activeGroup || products.some(p => p.category === category && p.categoryGroup === activeGroup),
                      );
                      if (sectionCategories.length === 0) return null;
                      const isOpen = openSections[item.section] ?? true;

                      return (
                        <div key={item.section} className="mt-1">
                          <button
                            onClick={() => toggleSection(item.section)}
                            className="w-full flex items-center justify-between text-left text-sm py-1.5 pl-2 font-bold text-foreground hover:text-primary transition-colors"
                            data-testid={`button-section-${item.section}`}
                          >
                            <span>{localizedCategoryGroupLabel(item.section, language)}</span>
                            <ChevronDown className={`w-3.5 h-3.5 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                          </button>
                          {isOpen && (
                            <div className="flex flex-col gap-1 pl-4 border-l border-border ml-2">
                              {sectionCategories.map(category => (
                                <button
                                  key={category}
                                  onClick={() => setActiveCategory(category)}
                                  className={`text-left text-sm py-1.5 transition-colors ${activeCategory === category ? 'text-primary font-bold' : 'text-muted-foreground hover:text-foreground'}`}
                                  data-testid={`button-category-${category}`}
                                >
                                   {localizedCategoryLabel(category, language)}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </aside>

        {/* MAIN LIST */}
        <main className="flex-1 w-full">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
            <div className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
               {t('products.showing')} {filteredProducts.length} {filteredProducts.length === 1 ? t('products.result') : t('products.results')}
            </div>
            
            {(search || activeGroup || activeCategory) && (
              <Button 
                variant="ghost" 
                size="sm"
                className="text-xs uppercase tracking-widest font-bold text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={() => { setSearch(""); setActiveGroup(null); setActiveCategory(null); }}
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
                        <Badge variant={product.categoryGroup === 'HVAC Tools and Instruments' ? 'default' : 'secondary'} className="rounded-none uppercase tracking-widest text-[10px]">
                           {localizedCategoryGroupLabel(product.categoryGroup, language)}
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
