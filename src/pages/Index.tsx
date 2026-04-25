import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Categories } from "@/components/Categories";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { WhyChoose } from "@/components/WhyChoose";
import { PromoBanner } from "@/components/PromoBanner";
import { Testimonials } from "@/components/Testimonials";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    document.title = "MARTIFY Super Mart — Pick smart. Shop smart.";
    const meta = document.querySelector('meta[name="description"]') || (() => {
      const m = document.createElement("meta");
      m.setAttribute("name", "description");
      document.head.appendChild(m);
      return m;
    })();
    meta.setAttribute(
      "content",
      "MARTIFY Super Mart — premium products across beauty, home, kitchen, electronics, decor & more. Browse, wishlist, and inquire on WhatsApp."
    );
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Categories />
        <FeaturedProducts />
        <WhyChoose />
        <PromoBanner />
        <Testimonials />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default Index;
