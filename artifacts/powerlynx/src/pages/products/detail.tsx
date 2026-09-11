import { useRoute, Link } from 'wouter';
import { products } from '@/data/products';
import { ArrowLeft, Check, ChevronRight, Share2, Printer, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ModelBadge } from '@/components/model-badge';
import { useEffect, useState } from 'react';
import { useLanguage } from '@/i18n';
import { localizeProduct, localizedCategoryGroupLabel, localizedA2LBadgeLabel } from '@/i18n/products';
import { useDocumentMeta } from '@/hooks/use-document-meta';

const PRODUCT_SCHEMA_ID = 'product-structured-data';

function useProductStructuredData(product: { name: string; slug: string; category: string; summary: string; image: string } | null) {
  useEffect(() => {
    if (!product) return;
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = PRODUCT_SCHEMA_ID;
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      description: product.summary,
      category: product.category,
      image: product.image.startsWith('http') ? product.image : `https://powerlinkus.com${product.image}`,
      brand: { '@type': 'Brand', name: 'POWERLYNX' },
      manufacturer: { '@type': 'Organization', name: 'Powerlink Inc.' },
      url: `https://powerlinkus.com/products/${product.slug}`,
    });
    document.head.appendChild(script);
    return () => {
      document.getElementById(PRODUCT_SCHEMA_ID)?.remove();
    };
  }, [product]);
}

export function ProductDetail() {
  const [, params] = useRoute('/products/:slug');
  const slug = params?.slug;
  
  const product = products.find(p => p.slug === slug);
  const images = product ? [product.image, ...(product.gallery || [])] : [];
  const [activeImage, setActiveImage] = useState(0);
  const { t, language } = useLanguage();
  const localizedProduct = product ? localizeProduct(product, language) : null;

  useDocumentMeta({
    title: localizedProduct ? `${localizedProduct.name} (${product!.models})` : 'Product Not Found',
    description: localizedProduct
      ? `${localizedProduct.name} from POWERLYNX by Powerlink Inc. — professional-grade HVAC/R equipment, models ${product!.models}.`
      : undefined,
    path: product ? `/products/${product.slug}` : undefined,
  });

  useProductStructuredData(
    product && localizedProduct
      ? { name: localizedProduct.name, slug: product.slug, category: localizedProduct.category, summary: localizedProduct.summary, image: product.image }
      : null
  );

  if (!product || !localizedProduct) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
         <h1 className="font-display text-4xl font-bold uppercase mb-4">{t('detail.productNotFound')}</h1>
         <p className="text-muted-foreground mb-8">{t('notFound.description')}</p>
        <Button asChild className="rounded-none uppercase tracking-widest font-bold">
           <Link href="/products">{t('detail.returnCatalog')}</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* BREADCRUMBS */}
      <div className="bg-muted border-b border-border py-3">
        <div className="container mx-auto px-4 flex items-center text-xs font-bold uppercase tracking-widest text-muted-foreground">
          <Link href="/products" className="hover:text-primary transition-colors flex items-center gap-1 shrink-0">
             <ArrowLeft className="w-3 h-3" /> {t('detail.catalog')}
          </Link>
          <ChevronRight className="w-3 h-3 mx-2 opacity-50" />
           <span className="shrink-0">{localizedCategoryGroupLabel(product.categoryGroup, language)}</span>
          <ChevronRight className="w-3 h-3 mx-2 opacity-50" />
           <span className="text-foreground truncate min-w-0">{localizedProduct.category}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* PRODUCT VISUAL / MOCK */}
          <div className="space-y-6">
            <div className="aspect-[4/3] bg-white border border-border flex items-center justify-center p-8 relative overflow-hidden">
              <img
                src={images[activeImage]}
                alt={product.name}
                className="w-full h-full object-contain"
                data-testid="img-product-detail"
              />
            </div>

            {images.length > 1 && (
              <div className="flex gap-3">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-20 h-20 bg-white border-2 flex items-center justify-center p-2 transition-colors ${activeImage === i ? 'border-primary' : 'border-border hover:border-primary/50'}`}
                    data-testid={`button-thumbnail-${i}`}
                  >
                    <img src={img} alt={`${product.name} view ${i + 1}`} className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}

            <ModelBadge models={product.models} size="lg" />
            
            {/* ACTIONS */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="outline" className="flex-1 rounded-none uppercase font-bold tracking-widest gap-2">
                 <Printer className="w-4 h-4" /> {t('detail.printSpec')}
              </Button>
              <Button variant="outline" className="flex-1 rounded-none uppercase font-bold tracking-widest gap-2">
                 <Share2 className="w-4 h-4" /> {t('detail.share')}
              </Button>
            </div>
          </div>

          {/* PRODUCT DETAILS */}
          <div>
            <div className="mb-8">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                 <Badge className="rounded-none uppercase tracking-widest bg-primary text-primary-foreground">
                   {localizedCategoryGroupLabel(product.categoryGroup, language)}
                </Badge>
                {product.a2lCompatible && (
                  <Badge
                    className="rounded-none uppercase tracking-widest bg-emerald-600 text-white gap-1.5"
                    data-testid="badge-a2l-compatible"
                  >
                    <ShieldCheck className="w-3 h-3" />
                    {localizedA2LBadgeLabel(language)}
                  </Badge>
                )}
                 <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">{localizedProduct.category}</span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight text-foreground mb-6">
                 {localizedProduct.name}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                 {localizedProduct.summary}
              </p>
            </div>

            <div className="space-y-8">
              <div>
                 <h3 className="font-display text-xl font-bold uppercase tracking-widest mb-4 border-b border-border pb-2">{t('detail.features')}</h3>
                <ul className="space-y-3">
                  {product.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="mt-1 bg-primary/10 text-primary p-1 rounded-full shrink-0">
                        <Check className="w-3 h-3 font-bold" />
                      </div>
                      <span className="text-foreground/90">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                 <h3 className="font-display text-xl font-bold uppercase tracking-widest mb-4 border-b border-border pb-2">{t('detail.specifications')}</h3>
                <div className="bg-card border border-border rounded-sm overflow-hidden">
                  <table className="w-full text-left text-sm">
                    <tbody className="divide-y divide-border">
                      {product.specs.map((spec, i) => (
                        <tr key={i} className="hover:bg-muted/50 transition-colors">
                          <th className="py-3 px-4 font-mono font-bold text-muted-foreground w-1/3 align-top">
                            {spec.label}
                          </th>
                          <td className="py-3 px-4 text-foreground font-medium">
                            {spec.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="pt-8 border-t border-border">
                <p className="text-sm text-muted-foreground mb-4">
                   {t('detail.pricing')}
                </p>
                <Button size="lg" asChild className="rounded-none uppercase font-bold tracking-widest w-full sm:w-auto px-8">
                   <Link href="/contact">{t('detail.requestQuote')}</Link>
                </Button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
