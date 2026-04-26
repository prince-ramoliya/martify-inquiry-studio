import { useEffect, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import promo from "@/assets/promo-banner.webp";
import beauty from "@/assets/cat-beauty.webp";
import kitchen from "@/assets/cat-kitchen.webp";

type Banner = {
  eyebrow: string;
  title: string;
  italic?: string;
  description: string;
  cta: string;
  to: string;
  image: string;
  tone: "royal" | "ivory" | "noir";
};

// Max 3 banners — easy to swap to real data later
const banners: Banner[] = [
  {
    eyebrow: "Festive Edit · Limited Time",
    title: "Up to 30% off",
    italic: "festive home essentials.",
    description: "Hand-picked kitchen, decor and lifestyle pieces — only while stocks last at the Surat store.",
    cta: "Shop the edit",
    to: "/shop",
    image: promo,
    tone: "royal",
  },
  {
    eyebrow: "New In · Beauty",
    title: "Glow, naturally",
    italic: "skincare you'll repurchase.",
    description: "Curated beauty & personal care from brands our customers actually love and come back for.",
    cta: "Explore beauty",
    to: "/category/beauty",
    image: beauty,
    tone: "ivory",
  },
  {
    eyebrow: "Bestseller · Kitchen",
    title: "The kitchen, upgraded",
    italic: "tools that last.",
    description: "Premium build, modern design — kitchen essentials trusted by 2,000+ Surat households.",
    cta: "Browse kitchen",
    to: "/category/kitchen",
    image: kitchen,
    tone: "noir",
  },
];

const toneStyles: Record<Banner["tone"], { wrap: string; overlay: string; text: string; eyebrow: string; cta: string }> = {
  royal: {
    wrap: "bg-gradient-dark",
    overlay: "bg-gradient-to-r from-primary-deep via-primary-deep/85 to-primary-deep/20",
    text: "text-primary-foreground",
    eyebrow: "text-primary-foreground/80",
    cta: "bg-primary-foreground text-primary hover:bg-primary-foreground/90",
  },
  ivory: {
    wrap: "bg-gradient-soft",
    overlay: "bg-gradient-to-r from-background via-background/85 to-transparent",
    text: "text-foreground",
    eyebrow: "text-primary",
    cta: "",
  },
  noir: {
    wrap: "bg-foreground",
    overlay: "bg-gradient-to-r from-foreground via-foreground/85 to-foreground/10",
    text: "text-background",
    eyebrow: "text-background/70",
    cta: "bg-background text-foreground hover:bg-background/90",
  },
};

export const OfferBanner = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = banners.length;

  useEffect(() => {
    if (paused || total <= 1) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % total), 5500);
    return () => clearInterval(t);
  }, [paused, total]);

  const go = (n: number) => setIndex((n + total) % total);

  return (
    <section className="py-10 lg:py-16">
      <div className="container-page">
        <div
          className="relative overflow-hidden rounded-3xl shadow-elev"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          aria-roledescription="carousel"
        >
          <div
            className="flex transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {banners.map((b, i) => {
              const s = toneStyles[b.tone];
              return (
                <div
                  key={i}
                  className={`relative shrink-0 w-full ${s.wrap}`}
                  aria-hidden={i !== index}
                  aria-label={`Banner ${i + 1} of ${total}`}
                >
                  <div className="absolute inset-0 opacity-60">
                    <img
                      src={b.image}
                      alt=""
                      loading={i === 0 ? "eager" : "lazy"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className={`absolute inset-0 ${s.overlay}`} />
                  <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-primary-glow/20 blur-3xl pointer-events-none" />

                  <div className={`relative px-6 py-12 sm:px-10 sm:py-16 lg:px-16 lg:py-20 max-w-2xl ${s.text}`}>
                    <div className={`text-xs sm:text-sm font-grotesk font-semibold uppercase tracking-[0.18em] mb-4 ${s.eyebrow}`}>
                      {b.eyebrow}
                    </div>
                    <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl leading-[1.05] mb-4">
                      {b.title}
                      {b.italic && (
                        <>
                          <br />
                          <span className="italic font-medium opacity-95">{b.italic}</span>
                        </>
                      )}
                    </h2>
                    <p className="text-base sm:text-lg opacity-80 mb-8 max-w-lg">{b.description}</p>
                    <Link to={b.to}>
                      <Button variant="hero" size="xl" className={s.cta}>
                        {b.cta} <ArrowRight />
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {total > 1 && (
            <>
              {/* Arrows */}
              <button
                onClick={() => go(index - 1)}
                aria-label="Previous banner"
                className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full glass flex items-center justify-center hover:bg-background transition-smooth shadow-card"
              >
                <ChevronLeft className="w-5 h-5 text-foreground" />
              </button>
              <button
                onClick={() => go(index + 1)}
                aria-label="Next banner"
                className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full glass flex items-center justify-center hover:bg-background transition-smooth shadow-card"
              >
                <ChevronRight className="w-5 h-5 text-foreground" />
              </button>

              {/* Dots */}
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2">
                {banners.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => go(i)}
                    aria-label={`Go to banner ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      i === index ? "w-8 bg-primary-foreground" : "w-2 bg-primary-foreground/50 hover:bg-primary-foreground/80"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
