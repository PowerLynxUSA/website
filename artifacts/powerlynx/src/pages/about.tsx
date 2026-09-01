import { ShieldCheck, HardHat, Cog, CheckCircle2 } from 'lucide-react';
import aboutWarehouseUrl from '@/assets/generated/about-warehouse.jpg';
import textureUrl from '@/assets/generated/texture-metal.jpg';

export function About() {
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
            Engineered for <br/> the <span className="text-primary">Trade.</span>
          </h1>
          <p className="text-secondary-foreground/80 max-w-2xl text-xl font-medium">
            Powerlink Inc. (POWERLYNX) is dedicated to manufacturing uncompromising HVAC/R tools and supply components. We build for the technicians who keep North America running.
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
                alt="POWERLYNX Warehouse" 
                className="relative z-10 w-full h-auto shadow-2xl grayscale contrast-125"
              />
            </div>
            
            <div className="space-y-8">
              <div>
                <h2 className="font-display text-4xl font-bold uppercase tracking-tight mb-4">Our Mission</h2>
                <div className="w-12 h-1 bg-primary mb-6" />
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We observed a market flooded with consumer-grade tools masquerading as professional equipment. POWERLYNX was founded with a single directive: produce HVAC/R equipment that never fails in the field. Every manifold, motor, and line set we manufacture is tested against the harsh realities of commercial and residential jobsites.
                </p>
              </div>
              
              <div>
                <h2 className="font-display text-3xl font-bold uppercase tracking-tight mb-4">The POWERLYNX Standard</h2>
                <ul className="space-y-4">
                  {[
                    "No compromises on material purity (99.9% pure C12200 copper).",
                    "Stringent factory QA on every batch.",
                    "Designed with input from veteran field technicians.",
                    "Built to exceed standard UL and CSA requirements."
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
            <h2 className="font-display text-4xl font-bold uppercase tracking-tight mb-4">Why Technicians Trust Us</h2>
            <p className="text-muted-foreground text-lg">We don't sell to the general public. Our entire supply chain and R&D process is built around the needs of the professional contractor.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-8 border border-border text-center">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="font-display text-xl font-bold uppercase tracking-widest mb-3">Safety Verified</h3>
              <p className="text-muted-foreground">Rigorous pressure, flame, and electrical testing ensures our gear keeps technicians safe.</p>
            </div>
            <div className="bg-card p-8 border border-border text-center shadow-lg border-primary/50 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-6">
                <HardHat className="w-8 h-8" />
              </div>
              <h3 className="font-display text-xl font-bold uppercase tracking-widest mb-3">Jobsite Tough</h3>
              <p className="text-muted-foreground">Shock-resistant, IP-rated, and weather-proofed housings designed for drops and impacts.</p>
            </div>
            <div className="bg-card p-8 border border-border text-center">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Cog className="w-8 h-8" />
              </div>
              <h3 className="font-display text-xl font-bold uppercase tracking-widest mb-3">Precision Machined</h3>
              <p className="text-muted-foreground">Tight tolerances on all fittings, flaring tools, and gauges for leak-free installations.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
