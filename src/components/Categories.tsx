import { ArrowUpRight } from "lucide-react";
import { categories } from "@/data/products";

export const Categories = () => {
  return (
    <section id="categories" className="py-20 lg:py-28">
      <div className="container-page">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Shop by Category</div>
            <h2 className="font-display font-bold text-3xl lg:text-5xl tracking-tight">
              Curated collections for every corner of your life
            </h2>
          </div>
          <a href="#shop" className="text-primary font-medium inline-flex items-center gap-1 hover:gap-2 transition-all">
            View all categories <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
          {categories.map((cat, i) => (
            <a
              key={cat.slug}
              href={`#category-${cat.slug}`}
              className="group relative aspect-[4/5] md:aspect-square rounded-3xl overflow-hidden bg-muted hover-lift shadow-card animate-fade-in-up"
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
                  <h3 className="font-display font-bold text-lg lg:text-2xl leading-tight">{cat.name}</h3>
                  <div className="w-10 h-10 rounded-full glass flex items-center justify-center group-hover:bg-primary-foreground group-hover:text-primary transition-smooth">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
