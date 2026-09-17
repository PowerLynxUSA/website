import { Link, useLocation } from 'wouter';
import { Phone, Menu, X, ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/layout/language-switcher';
import { ThemeToggle } from '@/components/theme-toggle';
import { getResponsiveMarketingImage } from '@/lib/marketing-images';
import { useLanguage } from '@/i18n';
import { categoryTree, products } from '@/data/products';
import { localizedCategoryGroupLabel, localizedCategoryLabel } from '@/i18n/products';
import { getResponsiveProductImage } from '@/lib/product-images';
import { useTheme } from '@/components/theme-provider';

export function Header() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null);
  const { t, language } = useLanguage();
  const { resolvedTheme } = useTheme();
  const [isProductsMenuOpen, setIsProductsMenuOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const logoImage = getResponsiveMarketingImage(
    'brand',
    resolvedTheme === 'dark' ? 'powerlynx-logo-dark' : 'powerlynx-logo',
    '160px',
  );
  const markImage = getResponsiveMarketingImage(
    'brand',
    resolvedTheme === 'dark' ? 'powerlynx-mark-dark' : 'powerlynx-mark',
    '160px',
  );

  const categoryImage = (category: string) => {
    const product = products.find((item) => item.category === category);
    return product ? getResponsiveProductImage(product.image, '40px') : null;
  };

  const renderCategoryLink = (category: string, thumbnailSize = 'h-9 w-9') => {
    const image = categoryImage(category);

    return (
      <span
        className="group relative block"
        onMouseEnter={() => setHoveredCategory(category)}
        onMouseLeave={() => setHoveredCategory(null)}
        onFocus={() => setHoveredCategory(category)}
        onBlur={() => setHoveredCategory(null)}
      >
        <Link
          href={`/products?category=${encodeURIComponent(category)}`}
          onClick={() => {
            setIsProductsMenuOpen(false);
            setHoveredCategory(null);
          }}
          className="flex w-full items-center gap-2 text-[13px] font-semibold leading-tight text-white hover:text-primary transition-colors"
        >
          {image && (
            <img
              src={image.src}
              srcSet={image.srcSet}
              sizes={image.sizes}
              alt=""
              className={`${thumbnailSize} shrink-0 rounded-sm border border-border bg-white object-contain p-0.5 transition-transform duration-200 group-hover:scale-110`}
              loading="lazy"
            />
          )}
          <span>{localizedCategoryLabel(category, language)}</span>
        </Link>
        {image && (
          <span
            className={`pointer-events-none absolute left-12 top-1/2 z-30 -translate-y-1/2 rounded-md border border-white/10 bg-[#1B1F21] p-2 shadow-2xl transition-all duration-200 ${
              hoveredCategory === category
                ? 'visible scale-100 opacity-100'
                : 'invisible scale-90 opacity-0'
            }`}
            aria-hidden="true"
          >
            <img
              src={image.src}
              srcSet={image.srcSet}
              sizes="128px"
              alt=""
              className="h-28 w-28 rounded-sm bg-white object-contain"
            />
          </span>
        )}
      </span>
    );
  };

  useEffect(() => {
    setIsProductsMenuOpen(false);
    setIsMobileMenuOpen(false);
    setOpenMobileGroup(null);
    setHoveredCategory(null);
  }, [location]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <img
            src={logoImage.src}
            srcSet={logoImage.srcSet}
            sizes={logoImage.sizes}
            alt="POWERLYNX"
            className="h-[62px] object-contain hidden md:block transition-transform duration-500 group-hover:scale-[1.03] [clip-path:inset(0_0_22%_0)]"
            decoding="async"
          />
          <img
            src={markImage.src}
            srcSet={markImage.srcSet}
            sizes={markImage.sizes}
            alt="POWERLYNX"
            className="h-[62px] object-contain md:hidden transition-transform duration-500 group-hover:scale-[1.03]"
            decoding="async"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className={`text-sm font-bold tracking-widest uppercase transition-colors hover:text-primary ${
              location === '/' ? 'text-primary' : 'text-foreground'
            }`}
          >
            {t('nav.home')}
          </Link>
          <Link
            href="/about"
            className={`text-sm font-bold tracking-widest uppercase transition-colors hover:text-primary ${
              location === '/about' ? 'text-primary' : 'text-foreground'
            }`}
          >
            {t('nav.about')}
          </Link>

          {/* Products mega menu */}
          <div
            className="relative"
            onMouseEnter={() => setIsProductsMenuOpen(true)}
            onMouseLeave={() => setIsProductsMenuOpen(false)}
          >
            <Link
              href="/products"
              onClick={() => setIsProductsMenuOpen(false)}
              aria-expanded={isProductsMenuOpen}
              className={`flex items-center gap-1 text-sm font-bold tracking-widest uppercase transition-colors hover:text-primary ${
                location.startsWith('/products') ? 'text-primary' : 'text-foreground'
              }`}
            >
              {t('nav.products')}
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isProductsMenuOpen ? 'rotate-180' : ''}`} />
            </Link>

            <div
              className={`absolute left-1/2 top-full -translate-x-1/2 pt-4 transition-all duration-200 ${
                isProductsMenuOpen
                  ? 'opacity-100 visible translate-y-0 pointer-events-auto'
                  : 'opacity-0 invisible translate-y-1 pointer-events-none'
              }`}
              data-testid="menu-products-dropdown"
            >
              <div className="w-[min(860px,calc(100vw-2rem))] overflow-hidden border border-white/10 bg-[#101417] text-white shadow-2xl shadow-black/30">
                <div className="grid grid-cols-[minmax(190px,0.7fr)_minmax(0,1.3fr)] divide-x divide-white/10">
                  {categoryTree.map(({ group, items }) => (
                    <div key={group} className="p-4">
                      <Link
                        href={`/products?group=${encodeURIComponent(group)}`}
                        onClick={() => setIsProductsMenuOpen(false)}
                          className="mb-3 block text-xs font-extrabold uppercase tracking-widest text-primary hover:underline underline-offset-4"
                      >
                        {localizedCategoryGroupLabel(group, language)}
                      </Link>
                      <ul className={group === 'HVAC Tools and Instruments' ? 'grid grid-cols-2 gap-x-4 gap-y-2.5' : 'space-y-2.5'}>
                        {items.map((item) =>
                          item.kind === 'category' ? (
                            <li key={item.category}>
                              {renderCategoryLink(item.category)}
                            </li>
                          ) : (
                            <li key={item.section} className="col-span-2">
                                <div className="mt-3 mb-2 inline-flex w-fit items-center rounded-sm border border-primary/90 bg-primary/10 px-2 py-1 text-[10px] font-extrabold uppercase tracking-[0.12em] text-primary shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)] first:mt-0">
                                {item.section}
                              </div>
                               <ul className="grid grid-cols-2 gap-x-4 gap-y-2 border-l border-white/15 pl-2">
                                {item.categories.map((category) => (
                                  <li key={category}>
                                    {renderCategoryLink(category, 'h-8 w-8')}
                                  </li>
                                ))}
                              </ul>
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                  ))}
                </div>
                <Link
                  href="/products"
                  onClick={() => setIsProductsMenuOpen(false)}
                  className="block bg-primary py-3 text-center text-xs font-bold uppercase tracking-widest text-primary-foreground transition-colors hover:bg-primary/85"
                >
                  {t('nav.viewCatalog')}
                </Link>
              </div>
            </div>
          </div>

          <Link
            href="/contact"
            className={`text-sm font-bold tracking-widest uppercase transition-colors hover:text-primary ${
              location === '/contact' ? 'text-primary' : 'text-foreground'
            }`}
          >
            {t('nav.contact')}
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <LanguageSwitcher />

          <Button asChild className="gap-2 font-bold tracking-wider rounded-none uppercase">
            <a href="tel:8888187693">
              <Phone className="w-4 h-4" />
              <span className="whitespace-nowrap">
                888-818-POWER <span className="text-[0.97em] font-semibold tracking-normal">(7693)</span>
              </span>
            </a>
          </Button>
          <ThemeToggle />
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <LanguageSwitcher variant="compact" />
          <Button asChild size="icon" variant="outline" className="rounded-none" aria-label={t('contact.callUs')}>
            <a href="tel:8888187693">
              <Phone className="w-4 h-4" />
            </a>
          </Button>
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? t('nav.contact') : t('nav.home')}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div id="mobile-navigation" className="md:hidden border-t border-border bg-background py-4 px-4 flex flex-col gap-4 animate-in slide-in-from-top-4 max-h-[calc(100vh-5rem)] overflow-y-auto">
          <nav className="flex flex-col gap-4">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-lg font-bold tracking-widest uppercase transition-colors ${
                location === '/' ? 'text-primary' : 'text-foreground'
              }`}
            >
              {t('nav.home')}
            </Link>
            <Link
              href="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-lg font-bold tracking-widest uppercase transition-colors ${
                location === '/about' ? 'text-primary' : 'text-foreground'
              }`}
            >
              {t('nav.about')}
            </Link>

            {/* Products (expandable category tree) */}
            <div>
              <div className="flex items-center justify-between">
                <Link
                  href="/products"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-lg font-bold tracking-widest uppercase transition-colors ${
                    location.startsWith('/products') ? 'text-primary' : 'text-foreground'
                  }`}
                >
                  {t('nav.products')}
                </Link>
                <button
                  type="button"
                  onClick={() => setOpenMobileGroup((prev) => (prev === 'products' ? null : 'products'))}
                  aria-label={t('nav.products')}
                  aria-expanded={openMobileGroup === 'products'}
                  className="p-1 text-foreground"
                >
                  <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${openMobileGroup === 'products' ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {openMobileGroup === 'products' && (
                <div className="mt-3 pl-3 border-l border-border flex flex-col gap-4">
                  {categoryTree.map(({ group, items }) => (
                    <div key={group}>
                      <Link
                        href={`/products?group=${encodeURIComponent(group)}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block text-xs font-bold uppercase tracking-widest text-primary mb-2"
                      >
                        {localizedCategoryGroupLabel(group, language)}
                      </Link>
                      <ul className="space-y-2">
                        {items.map((item) =>
                          item.kind === 'category' ? (
                            <li key={item.category}>
                              <Link
                                href={`/products?category=${encodeURIComponent(item.category)}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-sm text-muted-foreground"
                              >
                                {localizedCategoryLabel(item.category, language)}
                              </Link>
                            </li>
                          ) : (
                            <li key={item.section}>
                              <div className="mt-2 mb-2 inline-flex w-fit items-center rounded-sm border border-primary/80 bg-primary/10 px-2 py-1 text-[10px] font-extrabold uppercase tracking-[0.12em] text-primary first:mt-0">
                                {item.section}
                              </div>
                              <ul className="space-y-2 pl-2">
                                {item.categories.map((category) => (
                                  <li key={category}>
                                    <Link
                                      href={`/products?category=${encodeURIComponent(category)}`}
                                      onClick={() => setIsMobileMenuOpen(false)}
                                      className="text-sm text-muted-foreground"
                                    >
                                      {localizedCategoryLabel(category, language)}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-lg font-bold tracking-widest uppercase transition-colors ${
                location === '/contact' ? 'text-primary' : 'text-foreground'
              }`}
            >
              {t('nav.contact')}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
