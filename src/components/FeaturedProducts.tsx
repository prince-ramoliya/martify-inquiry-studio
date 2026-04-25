import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { ProductCard } from "./ProductCard";
import { featuredProducts } from "@/data/products";

export const FeaturedProducts = () => {
  return (
    <section className="py-20 lg:py-28 bg-gradient-soft">
      <div className="container-page">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <div className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">This week's picks</div>
            <h2 className="font-display font-bold text-3xl lg:text-5xl tracking-tight">
              Hand-selected by our team
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md">
            Every Monday we refresh this list with products our customers are loving and asking us to restock.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {featuredProducts.slice(0, 8).map((p, i) => (
            <ProductCard key={p.id} p={p} i={i} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/shop">
            <Button variant="outline" size="lg">View all products</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
