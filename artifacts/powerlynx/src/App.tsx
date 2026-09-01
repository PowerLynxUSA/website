import { type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

import { PageLayout } from '@/components/layout/page-layout';
import { Home } from '@/pages/home';
import { About } from '@/pages/about';
import { Contact } from '@/pages/contact';
import { ProductsIndex } from '@/pages/products/index';
import { ProductDetail } from '@/pages/products/detail';

const queryClient = new QueryClient();

function Router() {
  return (
    <PageLayout>
      <RoutedErrorBoundary>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/products" component={ProductsIndex} />
          <Route path="/products/:slug" component={ProductDetail} />
          <Route component={NotFound} />
        </Switch>
      </RoutedErrorBoundary>
    </PageLayout>
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
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
