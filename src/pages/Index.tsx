import { lazy, Suspense, useEffect, useState } from "react";
import { Hero } from "@/components/Hero";
import { Seo } from "@/components/Seo";
import { FirstSectionSkeleton } from "@/components/LoadingSkeletons";
import { NonCriticalErrorBoundary } from "@/components/ErrorBoundary";

// Defer below-the-fold sections so the hero (LCP) ships first.
const Categories = lazy(() => import("@/components/Categories").then((m) => ({ default: m.Categories })));
const FeaturedProducts = lazy(() => import("@/components/FeaturedProducts").then((m) => ({ default: m.FeaturedProducts })));
const WhyChoose = lazy(() => import("@/components/WhyChoose").then((m) => ({ default: m.WhyChoose })));
const PromoBanner = lazy(() => import("@/components/PromoBanner").then((m) => ({ default: m.PromoBanner })));
const Testimonials = lazy(() => import("@/components/Testimonials").then((m) => ({ default: m.Testimonials })));

const SectionFallback = ({ h = "30vh" }: { h?: string }) => (
  <div className="bg-background" style={{ minHeight: h }} aria-hidden />
);

const DeferredHomeSections = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setShow(true), 350);
    return () => window.clearTimeout(id);
  }, []);

  if (!show) return <FirstSectionSkeleton />;

  return (
    <>
      <NonCriticalErrorBoundary fallback={<FirstSectionSkeleton />}>
        <Suspense fallback={<FirstSectionSkeleton />}>
          <Categories />
        </Suspense>
      </NonCriticalErrorBoundary>
      <NonCriticalErrorBoundary>
        <Suspense fallback={<SectionFallback h="60vh" />}>
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
