import { lazy, Suspense, useEffect, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

import { PageLayout } from '@/components/layout/page-layout';
import { ThemeProvider } from '@/components/theme-provider';
import { LanguageProvider } from '@/i18n';

// Each route's page component is its own code-split chunk, so visiting "/"
// only downloads Home's code instead of the whole site (products catalog,
// contact form, etc.) up front.
const Home = lazy(() => import('@/pages/home').then((m) => ({ default: m.Home })));
const About = lazy(() => import('@/pages/about').then((m) => ({ default: m.About })));
const Contact = lazy(() => import('@/pages/contact').then((m) => ({ default: m.Contact })));
const ProductsIndex = lazy(() =>
  import('@/pages/products/index').then((m) => ({ default: m.ProductsIndex })),
);
const ProductDetail = lazy(() =>
  import('@/pages/products/detail').then((m) => ({ default: m.ProductDetail })),
);
const ComingSoon = lazy(() => import('@/pages/coming-soon').then((m) => ({ default: m.ComingSoon })));

const queryClient = new QueryClient();

function RouteFallback() {
  return (
    <div className="min-h-[60vh] w-full flex items-center justify-center" aria-hidden="true">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
    </div>
  );
}

function Router() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location]);

  return (
    <RoutedErrorBoundary>
      <Suspense fallback={<RouteFallback />}>
        <Switch>
          <Route path="/coming-soon" component={ComingSoon} />
          <Route>
            <PageLayout>
              <Switch>
                <Route path="/" component={Home} />
                <Route path="/website" component={Home} />
                <Route path="/about" component={About} />
                <Route path="/contact" component={Contact} />
                <Route path="/products" component={ProductsIndex} />
                <Route path="/products/:slug" component={ProductDetail} />
                <Route component={NotFound} />
              </Switch>
            </PageLayout>
          </Route>
        </Switch>
      </Suspense>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider>
          <LanguageProvider>
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
              <Router />
            </WouterRouter>
            <Toaster />
          </LanguageProvider>
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
