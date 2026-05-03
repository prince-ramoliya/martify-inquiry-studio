import { lazy, Suspense, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/Layout";
import { AuthProvider } from "@/hooks/useAuth";
import { AdminGuard } from "@/components/AdminGuard";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import Index from "./pages/Index";

/**
 * Wrap React.lazy with a small retry helper so transient network blips
 * (or stale chunks immediately after a deploy) don't blank the page.
 */
const lazyWithRetry = <T extends { default: React.ComponentType<unknown> }>(
  factory: () => Promise<T>,
  retries = 2,
  delayMs = 400,
) =>
  lazy(async () => {
    let lastErr: unknown;
    for (let i = 0; i <= retries; i++) {
      try {
        return await factory();
      } catch (err) {
        lastErr = err;
        await new Promise((r) => setTimeout(r, delayMs * (i + 1)));
      }
    }
    throw lastErr;
  });

// Lazy-load every non-home route to keep the initial JS bundle tiny.
const Shop = lazy(() => import("./pages/Shop"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Cart = lazy(() => import("./pages/Cart"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const FAQ = lazy(() => import("./pages/FAQ"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminSetup = lazy(() => import("./pages/admin/AdminSetup"));
const AdminLayout = lazy(() => import("@/components/admin/AdminLayout").then((m) => ({ default: m.AdminLayout })));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminHero = lazy(() => import("./pages/admin/AdminHero"));
const AdminCategories = lazy(() => import("./pages/admin/AdminCategories"));
const AdminProducts = lazy(() => import("./pages/admin/AdminProducts"));
const AdminSettings = lazy(() => import("./pages/admin/AdminSettings"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 60_000, refetchOnWindowFocus: false },
  },
});

const RouteFallback = () => <div className="min-h-[40vh]" aria-hidden />;

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-center" />
      <BrowserRouter>
        <AuthProvider>
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/setup" element={<AdminSetup />} />
              <Route path="/admin" element={<AdminGuard><AdminLayout /></AdminGuard>}>
                <Route index element={<AdminDashboard />} />
                <Route path="hero" element={<AdminHero />} />
                <Route path="categories" element={<AdminCategories />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="settings" element={<AdminSettings />} />
              </Route>
              <Route element={<Layout />}>
                <Route path="/" element={<Index />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/category/:slug" element={<CategoryPage />} />
                <Route path="/product/:slug" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Suspense>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
