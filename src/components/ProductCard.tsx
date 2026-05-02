import { Heart, MessageCircle, ShoppingCart } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { buildProductInquiry, formatPrice, type Product } from "@/data/products";
import { useCart, useWishlist } from "@/store/cart";
import { flyToCart } from "@/lib/flyToCart";

export const ProductCard = ({ p, i = 0 }: { p: Product; i?: number }) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const addItem = useCart((s) => s.addItem);
  const wishHas = useWishlist((s) => s.ids.includes(p.id));
  const wishToggle = useWishlist((s) => s.toggle);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    flyToCart(imgRef.current);
    addItem(p);
    toast.success(`${p.name} added to cart`, {
      description: formatPrice(p.price),
      action: { label: "View cart", onClick: () => (window.location.href = "/cart") },
    });
  };

  const handleWish = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    wishToggle(p.id);
    toast(wishHas ? "Removed from wishlist" : "Saved to wishlist", { description: p.name });
  };

  return (
    <article
      className="group relative bg-card rounded-3xl overflow-hidden shadow-card hover-lift animate-fade-in-up"
      style={{ animationDelay: `${i * 50}ms` }}
    >
      <Link to={`/product/${p.slug}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            ref={imgRef}
            src={p.image}
            alt={p.name}
            loading={i < 4 ? "eager" : "lazy"}
            decoding="async"
            fetchPriority={i < 4 ? "high" : "auto"}
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
            onClick={handleWish}
            aria-label="Toggle wishlist"
            className={`absolute top-3 right-3 w-10 h-10 rounded-full glass flex items-center justify-center transition-smooth ${
              wishHas ? "bg-primary text-primary-foreground" : "hover:bg-primary hover:text-primary-foreground"
            }`}
          >
            <Heart className={`w-4 h-4 ${wishHas ? "fill-current" : ""}`} />
          </button>

          {/* Desktop hover actions */}
          <div className="hidden md:flex absolute inset-x-3 bottom-3 gap-2 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <Button variant="hero" size="sm" className="flex-1" onClick={handleAdd}>
              <ShoppingCart className="w-4 h-4" /> Add
            </Button>
            <a
              href={buildProductInquiry(p)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex-1"
            >
              <Button variant="whatsapp" size="sm" className="w-full">
                <MessageCircle className="w-4 h-4" />
              </Button>
            </a>
          </div>
        </div>
        <div className="p-4 lg:p-5">
          <div className="text-xs text-muted-foreground mb-1">{p.category}</div>
          <h3 className="font-display font-semibold text-base leading-snug line-clamp-1">{p.name}</h3>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-display font-bold text-lg text-primary">{formatPrice(p.price)}</span>
            {p.mrp && p.mrp > p.price && (
              <span className="text-xs text-muted-foreground line-through">{formatPrice(p.mrp)}</span>
            )}
          </div>

          {/* Mobile-only persistent actions */}
          <div className="md:hidden mt-3 flex items-stretch gap-2 w-full">
            <Button
              variant="hero"
              size="sm"
              className="flex-1 min-w-0 h-9 px-2 text-xs gap-1"
              onClick={handleAdd}
            >
              <ShoppingCart className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Add</span>
            </Button>
            <a
              href={buildProductInquiry(p)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              aria-label="Send inquiry on WhatsApp"
              className="shrink-0"
            >
              <Button
                type="button"
                variant="whatsapp"
                size="icon"
                className="h-9 w-9 rounded-full"
              >
                <MessageCircle className="w-4 h-4" />
              </Button>
            </a>
          </div>
        </div>
      </Link>
    </article>
  );
};
