import { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { ErrorBoundary, NonCriticalErrorBoundary } from "@/components/ErrorBoundary";
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
const Shop = lazyWithRetry(() => import("./pages/Shop"));
const CategoryPage = lazyWithRetry(() => import("./pages/CategoryPage"));
const ProductDetail = lazyWithRetry(() => import("./pages/ProductDetail"));
const Cart = lazyWithRetry(() => import("./pages/Cart"));
const Wishlist = lazyWithRetry(() => import("./pages/Wishlist"));
const About = lazyWithRetry(() => import("./pages/About"));
const Contact = lazyWithRetry(() => import("./pages/Contact"));
const FAQ = lazyWithRetry(() => import("./pages/FAQ"));
const NotFound = lazyWithRetry(() => import("./pages/NotFound"));
const AdminRoutes = lazyWithRetry(() => import("./pages/admin/AdminRoutes"));
const Sonner = lazyWithRetry(() => import("@/components/ui/sonner").then((m) => ({ default: () => <m.Toaster position="top-center" /> })));

const useChunkErrorRecovery = () => {
  useEffect(() => {
    const KEY = "__chunk_reload_at__";
    const isChunkErr = (msg: string) =>
      /Loading chunk [\d]+ failed/i.test(msg) ||
      /Failed to fetch dynamically imported module/i.test(msg) ||
      /Importing a module script failed/i.test(msg);
    const maybeReload = (msg: string) => {
      if (!isChunkErr(msg)) return;
      const last = Number(safeSessionGet(KEY) ?? 0);
      if (Date.now() - last > 60_000) {
        safeSessionSet(KEY, String(Date.now()));
        reloadWithFreshUrl();
      }
    };
    const onErr = (e: ErrorEvent) => maybeReload(e.message ?? "");
    const onRej = (e: PromiseRejectionEvent) =>
      maybeReload((e.reason as { message?: string })?.message ?? String(e.reason ?? ""));
    window.addEventListener("error", onErr);
    window.addEventListener("unhandledrejection", onRej);
    return () => {
      window.removeEventListener("error", onErr);
      window.removeEventListener("unhandledrejection", onRej);
    };
  }, []);
};

const safeSessionGet = (key: string) => {
  try { return window.sessionStorage.getItem(key); } catch { return null; }
};

const safeSessionSet = (key: string, value: string) => {
  try { window.sessionStorage.setItem(key, value); } catch { /* no-op */ }
};

const reloadWithFreshUrl = () => {
  const url = new URL(window.location.href);
  url.searchParams.set("martify_reload", String(Date.now()));
  window.location.replace(url.toString());
};

const DeferredToaster = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setShow(true), 700);
    return () => window.clearTimeout(id);
  }, []);

  if (!show) return null;
  return (
    <NonCriticalErrorBoundary>
      <Suspense fallback={null}>
        <Sonner />
      </Suspense>
    </NonCriticalErrorBoundary>
  );
};

const PageLoadFallback = () => (
  <main className="min-h-[55vh] bg-background flex items-center justify-center px-6">
    <div className="text-center space-y-3">
      <div className="mx-auto h-11 w-11 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-display font-black shadow-glow">
        M
      </div>
      <p className="text-sm font-semibold text-foreground">Opening MARTIFY…</p>
    </div>
  </main>
);

const withPageFallback = (element: React.ReactNode) => (
  <Suspense fallback={<PageLoadFallback />}>{element}</Suspense>
);

const AppShell = () => {
  useChunkErrorRecovery();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/*" element={withPageFallback(<AdminRoutes />)} />
        <Route element={<Layout />}>
          <Route path="/" element={<Index />} />
          <Route path="/shop" element={withPageFallback(<Shop />)} />
          <Route path="/category/:slug" element={withPageFallback(<CategoryPage />)} />
          <Route path="/product/:slug" element={withPageFallback(<ProductDetail />)} />
          <Route path="/cart" element={withPageFallback(<Cart />)} />
          <Route path="/wishlist" element={withPageFallback(<Wishlist />)} />
          <Route path="/about" element={withPageFallback(<About />)} />
          <Route path="/contact" element={withPageFallback(<Contact />)} />
          <Route path="/faq" element={withPageFallback(<FAQ />)} />
          <Route path="*" element={withPageFallback(<NotFound />)} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

const App = () => (
  <ErrorBoundary>
    <DeferredToaster />
    <AppShell />
  </ErrorBoundary>
);

export default App;
