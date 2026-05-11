import { Hero } from "@/components/Hero";
import { Seo } from "@/components/Seo";
import { Categories } from "@/components/Categories";
import { NonCriticalErrorBoundary } from "@/components/ErrorBoundary";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { WhyChoose } from "@/components/WhyChoose";
import { PromoBanner } from "@/components/PromoBanner";
import { Testimonials } from "@/components/Testimonials";

const DeferredHomeSections = () => {
  return (
    <>
      <NonCriticalErrorBoundary>
        <Categories />
      </NonCriticalErrorBoundary>
      <NonCriticalErrorBoundary>
        <FeaturedProducts />
      </NonCriticalErrorBoundary>
      <NonCriticalErrorBoundary>
        <WhyChoose />
      </NonCriticalErrorBoundary>
      <NonCriticalErrorBoundary>
        <PromoBanner />
      </NonCriticalErrorBoundary>
      <NonCriticalErrorBoundary>
        <Testimonials />
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
