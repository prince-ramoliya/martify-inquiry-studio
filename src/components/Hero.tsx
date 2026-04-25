import { useEffect, useState } from "react";
import { ArrowRight, MessageCircle, Sparkles, Star, Truck, ShieldCheck } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import banner1 from "@/assets/banner-1.jpg";
import banner2 from "@/assets/banner-2.jpg";
import banner3 from "@/assets/banner-3.jpg";
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
      "Surat's curated supermarket — kitchen, beauty, decor, electronics & more. Inquire on WhatsApp, pick up in-store.",
    cta: "Browse the shop",
    to: "/shop",
    image: banner1,
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
    image: banner2,
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
    image: banner3,
    accent: "Bestsellers",
  },
];

// Marquee strip items
const marqueeItems = [
  { icon: Star, label: "4.9 / 5 from 2,400+ reviews" },
  { icon: Truck, label: "Same-day pickup in Surat" },
  { icon: ShieldCheck, label: "100% genuine products" },
  { icon: Sparkles, label: "500+ curated essentials" },
  { icon: MessageCircle, label: "Order via WhatsApp" },
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
    <section className="relative bg-gradient-soft overflow-hidden" aria-roledescription="carousel">
      {/* Decorative blobs */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-primary-glow/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-primary/10 blur-3xl pointer-events-none" />

      <div
        className="container-page relative pt-6 pb-10 sm:pt-10 sm:pb-14 lg:pt-14 lg:pb-16"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Top eyebrow row */}
        <div className="flex items-center justify-between mb-5 sm:mb-7">
          <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-medium text-muted-foreground uppercase tracking-[0.2em]">
            <span className="w-6 sm:w-8 h-px bg-primary" />
            Surat · Est. 2019
          </div>
          <div className="hidden sm:inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-background/70 backdrop-blur-sm border border-border">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold">Open today · 9 AM – 10 PM</span>
          </div>
        </div>

        {/* === MOBILE: image-first banner === */}
        <div className="lg:hidden">
          {/* Banner image card */}
          <div
            className="relative rounded-3xl overflow-hidden shadow-elev aspect-[4/3] sm:aspect-[16/10] mb-5"
            onTouchStart={() => setPaused(true)}
          >
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
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/15 to-transparent" />

            {/* Top-left accent chip */}
            <div
              key={`m-chip-${index}`}
              className="absolute top-3 left-3 px-3 py-1.5 rounded-full bg-background/90 backdrop-blur-md shadow-card animate-fade-in"
            >
              <span className="text-[10px] font-grotesk font-semibold text-primary uppercase tracking-wider">
                {current.accent}
              </span>
            </div>

            {/* Bottom copy on mobile */}
            <div key={`m-copy-${index}`} className="absolute inset-x-4 bottom-4 text-primary-foreground animate-fade-in-up">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/90 text-[10px] font-semibold uppercase tracking-wider mb-2">
                <Sparkles className="w-3 h-3" />
                {current.eyebrow}
              </div>
              <h1 className="font-display font-extrabold text-[clamp(1.5rem,7vw,2.25rem)] leading-[1.05] tracking-tight">
                {current.title}{" "}
                <span className="italic font-semibold">{current.italic}</span>
              </h1>
            </div>

            {/* Dots */}
            <div className="absolute top-3 right-3 flex items-center gap-1.5">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === index ? "w-7 bg-primary-foreground" : "w-1.5 bg-primary-foreground/50"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Description + CTAs */}
          <div key={`m-body-${index}`} className="space-y-4 animate-fade-in-up">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {current.description}
            </p>
            <div className="grid grid-cols-2 gap-3">
              <Link to={current.to} className="contents">
                <Button variant="hero" size="lg" className="w-full">
                  {current.cta} <ArrowRight />
                </Button>
              </Link>
              <a
                href={buildWhatsAppLink("Hello MARTIFY, I'd like to know more.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="lg" className="w-full">
                  <MessageCircle /> Chat
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* === DESKTOP: two-column layout === */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-7 min-h-[480px] flex flex-col justify-center">
            <div key={index} className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-5">
                <Sparkles className="w-3.5 h-3.5" />
                {current.eyebrow}
              </div>
              <h1 className="font-display font-extrabold text-[clamp(2.75rem,5vw,4.75rem)] leading-[1.02] tracking-tight">
                {current.title}
                <br />
                <span className="italic font-semibold text-primary">{current.italic}</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl leading-relaxed mt-6">
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

          <div className="lg:col-span-6 relative">
            <div className="relative h-[560px]">
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
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />
                <div
                  key={`chip-${index}`}
                  className="absolute top-5 left-5 px-4 py-2 rounded-full bg-background/90 backdrop-blur-md shadow-card animate-fade-in"
                >
                  <span className="text-xs font-grotesk font-semibold text-primary uppercase tracking-wider">
                    {current.accent}
                  </span>
                </div>
                <div className="absolute bottom-5 left-5 max-w-xs glass rounded-2xl p-4 shadow-card animate-fade-in-up">
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

              <div className="hidden xl:flex absolute -top-4 right-4 lg:right-12 items-center gap-2 px-4 py-2.5 rounded-full bg-background shadow-elev animate-float-slow">
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
      </div>

      {/* Auto horizontal-scrolling marquee strip */}
      <div className="border-y border-border bg-background/60 backdrop-blur-sm">
        <div className="marquee py-3 sm:py-4">
          <div className="marquee__inner">
            {[...marqueeItems, ...marqueeItems].map((t, i) => (
              <div key={i} className="flex items-center gap-2 sm:gap-3 shrink-0">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-accent flex items-center justify-center">
                  <t.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                </div>
                <span className="text-xs sm:text-sm font-grotesk font-semibold text-foreground whitespace-nowrap">
                  {t.label}
                </span>
                <span className="text-primary/30 ml-3">•</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
