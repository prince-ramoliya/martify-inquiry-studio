import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { categories } from "@/data/products";

export const Categories = () => {
  return (
    <section className="py-10 md:py-20 lg:py-28">
      <div className="container-page">
        {/* Header */}
        <div className="flex items-end justify-between gap-4 mb-6 md:mb-12">
          <div className="max-w-2xl">
            <div className="text-[11px] md:text-sm font-semibold text-primary uppercase tracking-wider mb-1.5 md:mb-3">
              Shop by Category
            </div>
            <h2 className="font-display font-bold text-2xl md:text-4xl lg:text-5xl tracking-tight leading-tight">
              Six departments.
              <span className="hidden md:inline"> </span>
              <span className="block md:inline italic text-muted-foreground">One trusted shop.</span>
            </h2>
          </div>
          <Link
            to="/shop"
            className="shrink-0 text-sm font-semibold text-primary inline-flex items-center gap-1 hover:gap-2 transition-all"
          >
            <span className="hidden md:inline">Browse the full shop</span>
            <span className="md:hidden">View all</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* MOBILE: clean 2-column compact tiles */}
        <div className="grid grid-cols-2 gap-3 md:hidden">
          {categories.map((cat, i) => (
            <Link
              key={cat.slug}
              to={`/category/${cat.slug}`}
              className="group relative rounded-2xl overflow-hidden bg-card shadow-card animate-fade-in-up active:scale-[0.98] transition-transform"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="aspect-square bg-muted overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-3">
                <h3 className="font-display font-semibold text-sm leading-tight line-clamp-1">
                  {cat.name}
                </h3>
                <div className="mt-0.5 text-[11px] text-muted-foreground">
                  {cat.count} products
                </div>
              </div>
              <span className="absolute top-2 right-2 w-7 h-7 rounded-full bg-background/85 backdrop-blur flex items-center justify-center text-foreground shadow-sm">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          ))}
        </div>

        {/* DESKTOP: original immersive grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-4 lg:gap-6">
          {categories.map((cat, i) => (
            <Link
              key={cat.slug}
              to={`/category/${cat.slug}`}
              className="group relative aspect-square rounded-3xl overflow-hidden bg-muted hover-lift shadow-card animate-fade-in-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <img
                src={cat.image}
                alt={cat.name}
                loading="lazy"
                width={800}
                height={800}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-deep/90 via-primary-deep/30 to-transparent" />
              <div className="absolute inset-0 p-5 lg:p-7 flex flex-col justify-end text-primary-foreground">
                <div className="text-xs font-medium opacity-80 mb-1">{cat.count} products</div>
                <div className="flex items-end justify-between gap-2">
                  <div>
                    <h3 className="font-display font-bold text-lg lg:text-2xl leading-tight">{cat.name}</h3>
                    <div className="text-xs opacity-70 italic mt-1">{cat.tagline}</div>
                  </div>
                  <div className="w-10 h-10 rounded-full glass flex items-center justify-center group-hover:bg-primary-foreground group-hover:text-primary transition-smooth">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

