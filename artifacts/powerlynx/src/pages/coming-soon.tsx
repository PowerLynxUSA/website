import { Link } from 'wouter';
import { Phone, Mail, ArrowRight } from 'lucide-react';
import logoUrl from '@/assets/brand/powerlynx-logo.png';
import heroBgUrl from '@/assets/generated/hero-technician.jpg';
import textureUrl from '@/assets/generated/texture-metal.jpg';

export function ComingSoon() {
  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center overflow-hidden bg-secondary text-white">
      {/* Background layers */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBgUrl}
          alt=""
          className="w-full h-full object-cover object-[center_8%] opacity-25"
        />
        <img
          src={textureUrl}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/95 via-secondary/90 to-secondary" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_hsl(var(--secondary))_75%)]" />
      </div>

      {/* Scanning glow line */}
      <div
        className="absolute left-0 right-0 h-px bg-primary/60 z-10 animate-scan-line"
        style={{ boxShadow: '0 0 20px 2px hsl(var(--primary) / 0.6)' }}
      />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center text-center px-6 max-w-3xl mx-auto">
        <img
          src={logoUrl}
          alt="POWERLYNX"
          className="h-16 md:h-20 object-contain mb-10 brightness-0 invert drop-shadow-[0_0_24px_rgba(255,255,255,0.15)]"
        />

        <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-primary/40 bg-primary/10 rounded-full mb-8">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Launching Soon</span>
        </div>

        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold uppercase tracking-tight leading-[0.95] mb-6">
          Power Is <span className="text-primary">Coming.</span>
        </h1>

        <p className="text-base md:text-lg text-white/70 font-medium max-w-xl mb-12">
          POWERLYNX is preparing a new lineup of precision-engineered HVAC/R tools and equipment.
          Our full catalog and distributor portal launch shortly — built for technicians who
          demand accuracy, durability, and ease of use on every job.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
          <a
            href="mailto:info@powerlinkus.com"
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white/80 hover:text-primary transition-colors"
          >
            <Mail className="w-4 h-4" /> info@powerlinkus.com
          </a>
          <span className="hidden sm:block w-px h-4 bg-white/20" />
          <a
            href="tel:8888187693"
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white/80 hover:text-primary transition-colors"
          >
            <Phone className="w-4 h-4" /> 888-818-POWER
          </a>
        </div>

        {/* Divider */}
        <div className="w-16 h-0.5 bg-primary/40 mb-8" />

        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors"
          data-testid="link-preview-site"
        >
          Preview Demo Site
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
