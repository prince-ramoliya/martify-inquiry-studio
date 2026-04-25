import { useEffect, useState } from "react";
import { ArrowRight, MessageCircle, ShoppingBag, Sparkles, Star, Truck } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import lifestyle from "@/assets/hero-lifestyle.jpg";
import secondary from "@/assets/hero-secondary.jpg";
import promo from "@/assets/promo-banner.jpg";
import beauty from "@/assets/cat-beauty.jpg";
import kitchen from "@/assets/cat-kitchen.jpg";
import { buildWhatsAppLink } from "@/data/products";

type Slide = {
  eyebrow: string;
  title: string;
  italic: string;
  description: string;
  cta: string;
  to: string;
  image: string;
  accent: string;
};

const slides: Slide[] = [
  {
    eyebrow: "New Season · 2025",
    title: "Smart picks for",
    italic: "homes you actually live in.",
    description:
      "MARTIFY is a Surat-based supermarket curating products you'll love — kitchen, beauty, decor, electronics & more.",
    cta: "Browse the shop",
    to: "/shop",
    image: lifestyle,
    accent: "Featured Edit",
  },
  {
    eyebrow: "Festive Sale · Limited Time",
    title: "Up to 30% off",
    italic: "festive home essentials.",
    description:
      "Hand-picked kitchen, decor and lifestyle pieces — only while stocks last at the Surat store.",
    cta: "Shop the edit",
    to: "/shop",
    image: promo,
    accent: "Save 30%",
  },
  {
    eyebrow: "New In · Beauty",
    title: "Glow, naturally.",
    italic: "Skincare you'll repurchase.",
    description:
      "Curated beauty & personal care from brands our customers actually love and come back for.",
    cta: "Explore beauty",
    to: "/category/beauty",
    image: beauty,
    accent: "Bestsellers",
  },
];

const trustItems = [
  { icon: Star, label: "4.9 / 5 from 2,400+ reviews" },
  { icon: Truck, label: "Same-day pickup in Surat" },
  { icon: ShoppingBag, label: "500+ curated products" },
];

export const Hero = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = slides.length;

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % total), 5000);
    return () => clearInterval(t);
  }, [paused, total]);

  const current = slides[index];

  return (
    <section
      className="relative bg-gradient-soft overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
    >
      {/* Decorative gradient blobs */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-primary-glow/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-primary/10 blur-3xl pointer-events-none" />

      <div className="container-page relative pt-10 pb-14 lg:pt-16 lg:pb-20">
        {/* Top eyebrow row */}
        <div className="flex items-center justify-between mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-[0.2em]">
            <span className="w-8 h-px bg-primary" />
            Surat · Est. 2019
          </div>
          <div className="hidden md:inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-background/70 backdrop-blur-sm border border-border">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold">Open today · 9 AM – 10 PM</span>
          </div>
        </div>

        {/* Hero grid */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left — rotating copy */}
          <div className="lg:col-span-6 space-y-7 min-h-[420px] lg:min-h-[480px] flex flex-col justify-center">
            <div key={index} className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-5">
                <Sparkles className="w-3.5 h-3.5" />
                {current.eyebrow}
              </div>
              <h1 className="font-display font-extrabold text-[clamp(2.25rem,6vw,4.75rem)] leading-[1.02] tracking-tight">
                {current.title}
                <br />
                <span className="italic font-semibold text-primary">{current.italic}</span>
              </h1>
              <p className="text-base lg:text-lg text-muted-foreground max-w-xl leading-relaxed mt-6">
                {current.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link to={current.to}>
                <Button variant="hero" size="lg">
                  {current.cta} <ArrowRight />
                </Button>
              </Link>
              <a
                href={buildWhatsAppLink("Hello MARTIFY, I'd like to know more.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="lg">
                  <MessageCircle /> Chat with us
                </Button>
              </a>
            </div>

            {/* Slide controls + dots */}
            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center gap-2">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      i === index ? "w-10 bg-primary" : "w-2 bg-primary/30 hover:bg-primary/60"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-grotesk font-medium text-muted-foreground tabular-nums">
                {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* Right — rotating image stage */}
          <div className="lg:col-span-6 relative">
            <div className="relative h-[420px] sm:h-[480px] lg:h-[560px]">
              {/* Main image — crossfades */}
              <div className="absolute inset-0 rounded-[2rem] overflow-hidden shadow-elev">
                {slides.map((s, i) => (
                  <img
                    key={i}
                    src={s.image}
                    alt={s.title}
                    loading={i === 0 ? "eager" : "lazy"}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${
                      i === index ? "opacity-100 scale-100" : "opacity-0 scale-105"
                    }`}
                  />
                ))}
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />

                {/* Floating accent chip */}
                <div
                  key={`chip-${index}`}
                  className="absolute top-5 left-5 px-4 py-2 rounded-full bg-background/90 backdrop-blur-md shadow-card animate-fade-in"
                >
                  <span className="text-xs font-grotesk font-semibold text-primary uppercase tracking-wider">
                    {current.accent}
                  </span>
                </div>

                {/* Bottom-left stat card */}
                <div className="absolute bottom-5 left-5 right-5 sm:right-auto sm:max-w-xs glass rounded-2xl p-4 shadow-card animate-fade-in-up">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-gradient-hero flex items-center justify-center shrink-0">
                      <Sparkles className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <div className="font-display font-bold text-sm leading-tight">
                        Curated by hand
                      </div>
                      <div className="text-xs text-muted-foreground">
                        500+ products, 6 categories
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating secondary image */}
              <div className="hidden lg:block absolute -bottom-6 -right-6 w-44 h-44 rounded-3xl overflow-hidden shadow-elev border-4 border-background animate-float">
                <img src={secondary} alt="" className="w-full h-full object-cover" />
              </div>

              {/* Floating rating badge */}
              <div className="hidden sm:flex absolute -top-4 right-4 lg:right-12 items-center gap-2 px-4 py-2.5 rounded-full bg-background shadow-elev animate-float-slow">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-primary text-primary" />
                  ))}
                </div>
                <span className="text-xs font-grotesk font-bold">4.9</span>
              </div>
            </div>
          </div>
        </div>

        {/* Trust strip */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-3 lg:gap-4">
          {trustItems.map((t) => (
            <div
              key={t.label}
              className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-background/70 backdrop-blur-sm border border-border hover:border-primary/40 hover:shadow-card transition-smooth"
            >
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center shrink-0">
                <t.icon className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm font-grotesk font-semibold text-foreground">
                {t.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
