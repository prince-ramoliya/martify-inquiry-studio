import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import promo from "@/assets/promo-banner.jpg";

export const PromoBanner = () => {
  return (
    <section className="py-12 lg:py-20">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-dark shadow-xl">
          <div className="absolute inset-0 opacity-40">
            <img src={promo} alt="" loading="lazy" width={1600} height={900} className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-primary-deep via-primary-deep/80 to-transparent" />
          <div className="absolute -right-20 -top-20 w-96 h-96 bg-primary-glow/30 rounded-full blur-3xl" />

          <div className="relative p-8 lg:p-16 max-w-2xl text-primary-foreground">
            <div className="text-sm font-semibold opacity-80 uppercase tracking-wider mb-4">New Arrivals</div>
            <h2 className="font-display font-extrabold text-3xl lg:text-5xl xl:text-6xl leading-[1.05] mb-4">
              Smart Products
              <br />
              For Smart Living
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-lg">
              Discover the latest premium picks, designed to elevate every part of your home and lifestyle.
            </p>
            <Button variant="hero" size="xl" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              Shop New Arrivals <ArrowRight />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
