import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "./ProductCard";
import type { Product } from "@/data/products";

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  products: Product[];
  viewAllTo?: string;
};

export const ProductRow = ({ eyebrow, title, subtitle, products, viewAllTo = "/shop" }: Props) => {
  if (!products.length) return null;
  return (
    <section className="py-10 md:py-16">
      <div className="container-page">
        <div className="flex items-end justify-between gap-4 mb-5 md:mb-8">
          <div>
            {eyebrow && (
              <div className="text-xs md:text-sm font-semibold text-primary uppercase tracking-wider mb-1.5 md:mb-3">
                {eyebrow}
              </div>
            )}
            <h2 className="font-display font-bold text-2xl md:text-4xl tracking-tight">{title}</h2>
            {subtitle && (
              <p className="hidden md:block text-muted-foreground mt-2 max-w-md">{subtitle}</p>
            )}
          </div>
          <Link
            to={viewAllTo}
            className="shrink-0 text-sm font-semibold text-primary inline-flex items-center gap-1 hover:gap-2 transition-all"
          >
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="-mx-4 px-4 md:mx-0 md:px-0 overflow-x-auto no-scrollbar snap-x snap-mandatory">
          <div className="flex gap-3 md:gap-5 pb-2">
            {products.map((p, i) => (
              <div
                key={p.id}
                className="snap-start shrink-0 w-[58%] sm:w-[40%] md:w-[280px] lg:w-[300px]"
              >
                <ProductCard p={p} i={i} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
