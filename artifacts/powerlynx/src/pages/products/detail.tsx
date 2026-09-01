import { useRoute, Link } from 'wouter';
import { products } from '@/data/products';
import { ArrowLeft, Check, CheckCircle2, ChevronRight, Share2, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function ProductDetail() {
  const [, params] = useRoute('/products/:slug');
  const slug = params?.slug;
  
  const product = products.find(p => p.slug === slug);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="font-display text-4xl font-bold uppercase mb-4">Product Not Found</h1>
        <p className="text-muted-foreground mb-8">The requested product could not be located in the catalog.</p>
        <Button asChild className="rounded-none uppercase tracking-widest font-bold">
          <Link href="/products">Return to Catalog</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* BREADCRUMBS */}
      <div className="bg-muted border-b border-border py-3">
        <div className="container mx-auto px-4 flex items-center text-xs font-bold uppercase tracking-widest text-muted-foreground">
          <Link href="/products" className="hover:text-primary transition-colors flex items-center gap-1">
            <ArrowLeft className="w-3 h-3" /> Catalog
          </Link>
          <ChevronRight className="w-3 h-3 mx-2 opacity-50" />
          <span>{product.line}</span>
          <ChevronRight className="w-3 h-3 mx-2 opacity-50" />
          <span className="text-foreground truncate">{product.category}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* PRODUCT VISUAL / MOCK */}
          <div className="space-y-6">
            <div className="aspect-[4/3] bg-card border border-border flex items-center justify-center p-8 relative">
              <Badge variant="outline" className="absolute top-4 left-4 rounded-none uppercase tracking-widest font-bold bg-background">
                {product.models.split(',')[0]}
              </Badge>
              <div className="text-center opacity-30">
                <div className="w-48 h-48 rounded-full border-4 border-dashed border-muted-foreground/30 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-16 h-16" />
                </div>
                <p className="font-mono text-sm uppercase tracking-widest">Image Reference</p>
              </div>
            </div>
            
            {/* ACTIONS */}
            <div className="flex gap-4">
              <Button variant="outline" className="flex-1 rounded-none uppercase font-bold tracking-widest gap-2">
                <Printer className="w-4 h-4" /> Print Spec Sheet
              </Button>
              <Button variant="outline" className="flex-1 rounded-none uppercase font-bold tracking-widest gap-2">
                <Share2 className="w-4 h-4" /> Share
              </Button>
            </div>
          </div>

          {/* PRODUCT DETAILS */}
          <div>
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Badge className="rounded-none uppercase tracking-widest bg-primary text-primary-foreground">
                  {product.line}
                </Badge>
                <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">{product.category}</span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight text-foreground mb-6">
                {product.name}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {product.summary}
              </p>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="font-display text-xl font-bold uppercase tracking-widest mb-4 border-b border-border pb-2">Features</h3>
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
                <h3 className="font-display text-xl font-bold uppercase tracking-widest mb-4 border-b border-border pb-2">Specifications</h3>
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
                  For distributor pricing and availability, contact our sales team.
                </p>
                <Button size="lg" asChild className="rounded-none uppercase font-bold tracking-widest w-full sm:w-auto px-8">
                  <Link href="/contact">Request a Quote</Link>
                </Button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
