import { Link, useLocation } from 'wouter';
import { Phone, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/layout/language-switcher';
import logoUrl from '@/assets/brand/powerlynx-logo.png';
import markUrl from '@/assets/brand/powerlynx-mark.png';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Products', path: '/products' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export function Header() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <img
            src={logoUrl}
            alt="POWERLYNX"
            className="h-[52px] object-contain hidden md:block animate-logo-glow transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <img
            src={markUrl}
            alt="POWERLYNX"
            className="h-[52px] object-contain md:hidden animate-logo-glow transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`text-sm font-bold tracking-widest uppercase transition-colors hover:text-primary ${
                location === item.path ? 'text-primary' : 'text-foreground'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <LanguageSwitcher />

          <Button asChild className="gap-2 font-bold tracking-wider rounded-none uppercase">
            <a href="tel:8888187693">
              <Phone className="w-4 h-4" />
              888-818-POWER
            </a>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <Button asChild size="icon" variant="outline" className="rounded-none">
            <a href="tel:8888187693">
              <Phone className="w-4 h-4" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background py-4 px-4 flex flex-col gap-4 animate-in slide-in-from-top-4">
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-lg font-bold tracking-widest uppercase transition-colors ${
                  location === item.path ? 'text-primary' : 'text-foreground'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="pt-4 border-t border-border">
            <LanguageSwitcher variant="mobile" />
          </div>
        </div>
      )}
    </header>
  );
}
