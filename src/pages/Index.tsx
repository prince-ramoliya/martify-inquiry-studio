import { lazy, Suspense, useEffect, useState } from "react";
import { Hero } from "@/components/Hero";
import { Seo } from "@/components/Seo";
import { Categories } from "@/components/Categories";
import { NonCriticalErrorBoundary } from "@/components/ErrorBoundary";

// Defer below-the-fold sections so the hero (LCP) ships first.
const FeaturedProducts = lazy(() => import("@/components/FeaturedProducts").then((m) => ({ default: m.FeaturedProducts })));
const WhyChoose = lazy(() => import("@/components/WhyChoose").then((m) => ({ default: m.WhyChoose })));
const PromoBanner = lazy(() => import("@/components/PromoBanner").then((m) => ({ default: m.PromoBanner })));
const Testimonials = lazy(() => import("@/components/Testimonials").then((m) => ({ default: m.Testimonials })));

const SectionFallback = ({ h = "30vh" }: { h?: string }) => (
  <div className="bg-background" style={{ minHeight: h }} aria-hidden />
);

const useAfterFirstPaint = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const run = () => setReady(true);
    const w = globalThis.window;
    if ("requestIdleCallback" in w) {
      const id = w.requestIdleCallback(run, { timeout: 1600 });
      return () => w.cancelIdleCallback(id);
    }
    const id = globalThis.setTimeout(run, 900);
    return () => globalThis.clearTimeout(id);
  }, []);

  return ready;
};

const DeferredHomeSections = () => {
  const showBelowFold = useAfterFirstPaint();

  return (
    <>
      <NonCriticalErrorBoundary>
        <Categories />
      </NonCriticalErrorBoundary>
      {!showBelowFold && <SectionFallback h="20vh" />}
      {showBelowFold && (
        <>
      <NonCriticalErrorBoundary>
        <Suspense fallback={<SectionFallback h="20vh" />}>
          <FeaturedProducts />
        </Suspense>
      </NonCriticalErrorBoundary>
      <NonCriticalErrorBoundary>
        <Suspense fallback={<SectionFallback />}>
          <WhyChoose />
        </Suspense>
      </NonCriticalErrorBoundary>
      <NonCriticalErrorBoundary>
        <Suspense fallback={<SectionFallback />}>
          <PromoBanner />
        </Suspense>
      </NonCriticalErrorBoundary>
      <NonCriticalErrorBoundary>
        <Suspense fallback={<SectionFallback />}>
          <Testimonials />
        </Suspense>
      </NonCriticalErrorBoundary>
        </>
      )}
    </>
  );
};

const Index = () => (
  <>
    <Seo
      title="MARTIFY Super Mart — Pick smart. Shop smart."
      description="Curated supermarket from Surat — beauty, kitchen, decor, electronics, stationary, toys. Browse, save & inquire on WhatsApp."
    />
    <Hero />
    <DeferredHomeSections />
  </>
);

export default Index;
