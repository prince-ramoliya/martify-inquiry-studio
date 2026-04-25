import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import heroImg from "@/assets/hero-collage.jpg";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-soft">
      <div className="absolute inset-0 bg-gradient-curve" aria-hidden />
      {/* Floating shapes */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary-glow/20 rounded-full blur-3xl animate-float-slow" aria-hidden />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" aria-hidden />

      <div className="container-page relative pt-12 pb-20 lg:pt-20 lg:pb-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass shadow-card">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground/80">India's Smart Supermarket</span>
            </div>

            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] tracking-tight">
              Everything You Need.
              <br />
              <span className="bg-gradient-hero bg-clip-text text-transparent">All In One Place.</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              Discover premium products for your home, lifestyle, kitchen, electronics,
              beauty and more — curated for smart shoppers.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="xl">
                Explore Products <ArrowRight />
              </Button>
              <Button variant="outline" size="xl">
                Contact Us
              </Button>
            </div>

            <div className="flex flex-wrap gap-8 pt-4">
              {[
                { v: "500+", l: "Products" },
                { v: "6", l: "Categories" },
                { v: "10K+", l: "Happy Customers" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-display font-bold text-2xl lg:text-3xl text-foreground">{s.v}</div>
                  <div className="text-sm text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right visual */}
          <div className="relative animate-scale-in">
            <div className="relative rounded-3xl overflow-hidden shadow-xl">
              <img
                src={heroImg}
                alt="Premium MARTIFY product collection"
                width={1280}
                height={1280}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-deep/30 to-transparent" />
            </div>

            {/* Floating cards */}
            <div className="absolute -left-4 top-12 glass rounded-2xl p-4 shadow-elev animate-float hidden sm:block">
              <div className="text-xs text-muted-foreground">Trusted by</div>
              <div className="font-display font-bold text-lg">10,000+ Customers</div>
            </div>
            <div className="absolute -right-4 bottom-12 glass rounded-2xl p-4 shadow-elev animate-float-slow hidden sm:block">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-medium">Live WhatsApp Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
