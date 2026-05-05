import { lazy, Suspense, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Header } from "./Header";

const Footer = lazy(() => import("./Footer").then((m) => ({ default: m.Footer })));
const WhatsAppFloat = lazy(() => import("./WhatsAppFloat").then((m) => ({ default: m.WhatsAppFloat })));
const CartStickyBar = lazy(() => import("./CartStickyBar").then((m) => ({ default: m.CartStickyBar })));

export const Layout = () => {
  const { pathname } = useLocation();
  const [showDeferredChrome, setShowDeferredChrome] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  useEffect(() => {
    const id = window.setTimeout(() => setShowDeferredChrome(true), 500);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      {showDeferredChrome && (
        <Suspense fallback={null}>
          <Footer />
          <WhatsAppFloat />
          <CartStickyBar />
        </Suspense>
      )}
    </div>
  );
};
