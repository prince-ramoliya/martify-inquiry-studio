import { ArrowRight, MessageCircle, Sparkles, Star } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import lifestyle from "@/assets/hero-lifestyle.jpg";
import secondary from "@/assets/hero-secondary.jpg";
import { buildWhatsAppLink, categories } from "@/data/products";

const trustBrands = ["Trusted Quality", "Family Owned", "10K+ Customers", "WhatsApp Support", "Fast Replies", "Curated Picks", "Honest Pricing"];

export const Hero = () => {
  return (
    <section className="relative bg-background overflow-hidden">
      <div className="container-page pt-10 pb-16 lg:pt-16 lg:pb-24">
        {/* Top tag row */}
        <div className="flex items-center justify-between mb-10 animate-fade-in">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-widest">
            <span className="w-8 h-px bg-primary" />
            Surat • Est. 2019
          </div>
          <div className="hidden md:flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-primary text-primary" />)}
            </div>
            <span className="text-xs font-medium text-muted-foreground">4.9 from 2,400+ reviews</span>
          </div>
        </div>

        {/* Main editorial grid */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left — copy */}
          <div className="lg:col-span-7 space-y-8">
            <h1 className="font-display font-extrabold text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.95] tracking-tight animate-fade-in-up">
              Smart picks
              <br />
              for the homes
              <br />
              <span className="italic font-medium text-primary">we actually live in.</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed animate-fade-in-up" style={{ animationDelay: "120ms" }}>
              MARTIFY is a small Surat-based supermarket curating products you'll genuinely use —
              from kitchen essentials to skincare, decor and tech. Browse, save, and inquire on WhatsApp.
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: "240ms" }}>
              <Link to="/shop">
                <Button variant="hero" size="xl">
                  Browse the shop <ArrowRight />
                </Button>
              </Link>
              <a href={buildWhatsAppLink("Hello MARTIFY, I'd like to know more.")} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="xl">
                  <MessageCircle /> Chat with us
                </Button>
              </a>
            </div>
          </div>

          {/* Right — image collage */}
          <div className="lg:col-span-5 relative">
            <div className="relative grid grid-cols-5 grid-rows-6 gap-3 h-[480px] lg:h-[560px] animate-scale-in">
              <div className="col-span-3 row-span-4 rounded-3xl overflow-hidden shadow-elev relative group">
                <img src={lifestyle} alt="Customer using MARTIFY products at home" width={1024} height={1024} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="col-span-2 row-span-3 col-start-4 rounded-3xl overflow-hidden shadow-card relative group">
                <img src={secondary} alt="Family enjoying premium kitchen appliances" loading="lazy" width={1024} height={1024} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="col-span-2 row-span-3 col-start-4 row-start-4 rounded-3xl bg-gradient-hero text-primary-foreground p-5 flex flex-col justify-between shadow-glow">
                <Sparkles className="w-6 h-6" />
                <div>
                  <div className="font-display font-bold text-2xl leading-none">500+</div>
                  <div className="text-xs opacity-80 mt-1">Products curated by hand</div>
                </div>
              </div>
              <div className="col-span-3 row-span-2 row-start-5 rounded-3xl bg-accent p-5 flex items-center gap-4 shadow-card">
                <div className="flex -space-x-2">
                  {categories.slice(0, 3).map((c) => (
                    <img key={c.slug} src={c.image} alt="" className="w-10 h-10 rounded-full border-2 border-background object-cover" />
                  ))}
                </div>
                <div>
                  <div className="font-display font-bold text-sm">6 categories</div>
                  <div className="text-xs text-muted-foreground">Beauty, kitchen, decor & more</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee trust strip */}
      <div className="border-y border-border py-5 bg-secondary/40">
        <div className="marquee">
          <div className="marquee__inner">
            {[...trustBrands, ...trustBrands].map((b, i) => (
              <div key={i} className="flex items-center gap-3 text-sm font-display font-semibold text-muted-foreground whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                {b}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
