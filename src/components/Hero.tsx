import { useEffect, useMemo, useState } from "react";
import { ArrowRight, MessageCircle, Sparkles, Star, Truck, ShieldCheck } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import banner1 from "@/assets/hero-banner-1.webp";
import banner2 from "@/assets/hero-banner-2.webp";
import banner3 from "@/assets/hero-banner-3.webp";
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

const fallbackSlides: Slide[] = [
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
    to: "/category/beauty-care",
    image: banner3,
    accent: "Bestsellers",
  },
];

const marqueeItems = [
  { icon: Star, label: "4.9 / 5 from 2,400+ reviews" },
  { icon: Truck, label: "Same-day pickup in Surat" },
  { icon: ShieldCheck, label: "100% genuine products" },
  { icon: Sparkles, label: "500+ curated essentials" },
  { icon: MessageCircle, label: "Order via WhatsApp" },
  { icon: Star, label: "Trusted by 10,000+ families" },
  { icon: Truck, label: "Free home delivery in Surat" },
];

export const Hero = () => {
  const [dbSlides, setDbSlides] = useState<Slide[]>([]);
  const [whatsappNumber, setWhatsappNumber] = useState<string | null>(null);
  const slides: Slide[] = useMemo(() => {
    if (dbSlides.length === 0) return fallbackSlides;
    return dbSlides;
  }, [dbSlides]);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = slides.length;

  useEffect(() => { if (index >= total) setIndex(0); }, [total, index]);

  useEffect(() => {
    let cancelled = false;
    let idleId = 0;
    let timerId: ReturnType<typeof setTimeout> | null = null;
    const loadContent = async () => {
      try {
        const { supabase } = await import("@/integrations/supabase/client");
        const [hero, settings] = await Promise.all([
          supabase.from("hero_slides").select("eyebrow,title,italic,description,cta_label,cta_to,image_url,accent").eq("active", true).order("position", { ascending: true }),
          supabase.from("site_settings").select("whatsapp_number").eq("id", 1).maybeSingle(),
        ]);
        if (cancelled) return;
        if (hero.data?.length) {
          setDbSlides(hero.data.map((s) => ({
            eyebrow: s.eyebrow,
            title: s.title,
            italic: s.italic,
            description: s.description,
            cta: s.cta_label,
            to: s.cta_to,
            image: s.image_url,
            accent: s.accent,
          })));
        }
        if (settings.data?.whatsapp_number) setWhatsappNumber(settings.data.whatsapp_number);
      } catch {
        // Keep the fast static fallback if the backend is slow or unavailable.
      }
    };
    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(loadContent, { timeout: 2500 });
    } else {
      timerId = setTimeout(loadContent, 1200);
    }
    return () => {
      cancelled = true;
      if ("cancelIdleCallback" in window) window.cancelIdleCallback(idleId);
      if (timerId) clearTimeout(timerId);
    };
  }, []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % total), 5000);
    return () => clearInterval(t);
  }, [paused, total]);

  const current = slides[index];

  return (
    <section className="relative" aria-roledescription="carousel">
      {/* MOBILE: compact hero — half-height, minimal content */}
      <div className="md:hidden relative">
        <div
          className="relative w-full h-[42vh] min-h-[280px] max-h-[380px] overflow-hidden bg-foreground"
          onTouchStart={() => setPaused(true)}
        >
          {slides.map((s, i) => {
            const shouldRender = i === 0 || i <= index + 1;
            return (
              <img
                key={i}
                src={shouldRender ? s.image : undefined}
                alt={s.title}
                loading={i === 0 ? "eager" : "lazy"}
                fetchPriority={i === 0 ? "high" : "low"}
                decoding={i === 0 ? "sync" : "async"}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-out ${
                  i === index ? "opacity-100 scale-100" : "opacity-0 scale-105"
                }`}
              />
            );
          })}

          {/* Single soft overlay for legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/75 via-foreground/30 to-transparent" />

          {/* Content — bottom-anchored, condensed */}
          <div className="absolute inset-x-0 bottom-0 z-10">
            <div className="container-page pb-5">
              <div key={index} className="text-primary-foreground animate-fade-in-up">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full glass-dark text-[10px] font-semibold uppercase tracking-[0.18em] mb-2.5">
                  <Sparkles className="w-3 h-3" />
                  {current.eyebrow}
                </div>
                <h1 className="font-display font-extrabold text-[1.625rem] leading-[1.1] tracking-tight max-w-[14ch]">
                  {current.title}{" "}
                  <span className="italic font-semibold">{current.italic}</span>
                </h1>

                <div className="flex items-center justify-between gap-3 mt-4">
                  <Link to={current.to}>
                    <Button variant="hero" size="sm" className="shadow-glow h-10 px-5">
                      {current.cta} <ArrowRight />
                    </Button>
                  </Link>

                  {/* Slide dots */}
                  <div className="flex items-center gap-1.5">
                    {slides.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setIndex(i)}
                        aria-label={`Go to slide ${i + 1}`}
                        className={`h-1 rounded-full transition-all duration-500 ${
                          i === index ? "w-6 bg-primary-foreground" : "w-1.5 bg-primary-foreground/40"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DESKTOP / TABLET hero (original) */}
      <div className="hidden md:block">
      {/* Full-bleed banner */}
      <div
        className="relative w-full h-[78vh] min-h-[520px] max-h-[820px] overflow-hidden bg-foreground"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
      >
        {/* Slides */}
        {slides.map((s, i) => {
          // Only render slides that have been or will soon be visible to avoid
          // blocking the LCP with non-critical hero images.
          const shouldRender = i === 0 || i <= index + 1;
          return (
            <img
              key={i}
              src={shouldRender ? s.image : undefined}
              alt={s.title}
              loading={i === 0 ? "eager" : "lazy"}
              fetchPriority={i === 0 ? "high" : "low"}
              decoding={i === 0 ? "sync" : "async"}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-out ${
                i === index ? "opacity-100 scale-100" : "opacity-0 scale-105"
              }`}
            />
          );
        })}

        {/* Overlays for legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/55 to-foreground/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-foreground/30 lg:bg-none" />

        {/* Top bar */}
        <div className="absolute top-0 inset-x-0 z-10">
          <div className="container-page pt-5 sm:pt-7 flex items-center justify-between text-primary-foreground">
            <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em]">
              <span className="w-6 sm:w-8 h-px bg-primary-foreground/70" />
              Surat · Est. 2019
            </div>
            <div className="hidden sm:inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full glass-dark">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-semibold">Open today · 9 AM – 10 PM</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="absolute inset-0 z-10 flex items-end lg:items-center">
          <div className="container-page w-full pb-10 sm:pb-14 lg:pb-0">
            <div key={index} className="max-w-2xl text-primary-foreground animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-dark text-[10px] sm:text-xs font-semibold uppercase tracking-[0.18em] mb-4 sm:mb-5">
                <Sparkles className="w-3.5 h-3.5" />
                {current.eyebrow}
              </div>
              <h1 className="font-display font-extrabold text-[clamp(2rem,6vw,4.75rem)] leading-[1.02] tracking-tight">
                {current.title}
                <br />
                <span className="italic font-semibold">{current.italic}</span>
              </h1>
              <p className="text-base sm:text-lg text-primary-foreground/85 max-w-xl leading-relaxed mt-4 sm:mt-6">
                {current.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mt-6 sm:mt-8">
                <Link to={current.to}>
                  <Button variant="hero" size="xl" className="w-full sm:w-auto shadow-glow">
                    {current.cta} <ArrowRight />
                  </Button>
                </Link>
                <a
                  href={whatsappNumber ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello, I'd like to know more.")}` : buildWhatsAppLink("Hello MARTIFY, I'd like to know more.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button
                    variant="outline"
                    size="xl"
                    className="w-full sm:w-auto bg-background/10 backdrop-blur-md border-primary-foreground/40 text-primary-foreground hover:bg-background hover:text-foreground"
                  >
                    <MessageCircle /> Chat with us
                  </Button>
                </a>
              </div>

              {/* Slide controls */}
              <div className="flex items-center gap-4 mt-7 sm:mt-10">
                <div className="flex items-center gap-2">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setIndex(i)}
                      aria-label={`Go to slide ${i + 1}`}
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        i === index
                          ? "w-10 bg-primary-foreground"
                          : "w-2 bg-primary-foreground/40 hover:bg-primary-foreground/70"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-grotesk font-medium text-primary-foreground/70 tabular-nums">
                  {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating accent chip */}
        <div className="hidden lg:flex absolute top-24 right-8 xl:right-16 items-center gap-2 px-4 py-2.5 rounded-full bg-background shadow-elev animate-float-slow z-10">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-primary text-primary" />
            ))}
          </div>
          <span className="text-xs font-grotesk font-bold">4.9 · 2,400+</span>
        </div>
      </div>
      </div>

      {/* Infinite marquee strip */}
      <div className="border-y border-border bg-background">
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
