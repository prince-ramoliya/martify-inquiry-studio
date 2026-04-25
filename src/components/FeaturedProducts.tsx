import { Heart, MessageCircle, ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { type Product, buildProductInquiry, featuredProducts } from "@/data/products";

const ProductCard = ({ p, i }: { p: Product; i: number }) => (
  <article
    className="group relative bg-card rounded-3xl overflow-hidden shadow-card hover-lift animate-fade-in-up"
    style={{ animationDelay: `${i * 60}ms` }}
  >
    <div className="relative aspect-square overflow-hidden bg-muted">
      <img
        src={p.image}
        alt={p.name}
        loading="lazy"
        width={800}
        height={800}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      {p.badge && (
        <span className="absolute top-3 left-3 px-3 py-1 text-xs font-bold rounded-full bg-gradient-hero text-primary-foreground shadow-card">
          {p.badge}
        </span>
      )}
      <button
        aria-label="Add to wishlist"
        className="absolute top-3 right-3 w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-smooth"
      >
        <Heart className="w-4 h-4" />
      </button>

      {/* Quick actions reveal */}
      <div className="absolute inset-x-3 bottom-3 flex gap-2 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
        <Button variant="hero" size="sm" className="flex-1">
          <ShoppingCart className="w-4 h-4" /> Cart
        </Button>
        <a href={buildProductInquiry(p)} target="_blank" rel="noopener noreferrer" className="flex-1">
          <Button variant="whatsapp" size="sm" className="w-full">
            <MessageCircle className="w-4 h-4" /> Inquire
          </Button>
        </a>
      </div>
    </div>
    <div className="p-4 lg:p-5">
      <div className="text-xs text-muted-foreground mb-1">{p.category}</div>
      <h3 className="font-display font-semibold text-base lg:text-lg leading-snug line-clamp-1">{p.name}</h3>
      <div className="mt-2 font-display font-bold text-lg text-primary">{p.price}</div>
    </div>
  </article>
);

export const FeaturedProducts = () => {
  return (
    <section id="shop" className="py-20 lg:py-28 bg-gradient-soft">
      <div className="container-page">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Featured Picks</div>
          <h2 className="font-display font-bold text-3xl lg:text-5xl tracking-tight">
            Handpicked products our customers love
          </h2>
          <p className="mt-4 text-muted-foreground">
            Premium quality, smart pricing, instant WhatsApp inquiry.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {featuredProducts.map((p, i) => (
            <ProductCard key={p.id} p={p} i={i} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline" size="lg">View all products</Button>
        </div>
      </div>
    </section>
  );
};
