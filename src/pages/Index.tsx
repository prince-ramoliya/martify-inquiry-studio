import { Hero } from "@/components/Hero";
import { OfferBanner } from "@/components/OfferBanner";
import { Categories } from "@/components/Categories";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { WhyChoose } from "@/components/WhyChoose";
import { PromoBanner } from "@/components/PromoBanner";
import { Testimonials } from "@/components/Testimonials";
import { Seo } from "@/components/Seo";

const Index = () => (
  <>
    <Seo
      title="MARTIFY Super Mart — Pick smart. Shop smart."
      description="Curated supermarket from Surat — beauty, kitchen, decor, electronics, stationary, toys. Browse, save & inquire on WhatsApp."
    />
    <Hero />
    <OfferBanner />
    <Categories />
    <FeaturedProducts />
    <WhyChoose />
    <PromoBanner />
    <Testimonials />
  </>
);

export default Index;
