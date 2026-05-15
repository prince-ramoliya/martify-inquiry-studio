import { Heart } from "lucide-react";
import { WhatsAppIcon } from "./icons/WhatsAppIcon";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { AddToCartButton } from "./AddToCartButton";
import { buildProductInquiry, formatPrice, type Product } from "@/data/products";
import { useWishlist } from "@/store/cart";

export const ProductCard = ({ p, i = 0, priority = false }: { p: Product; i?: number; priority?: boolean }) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const wishHas = useWishlist((s) => s.ids.includes(p.id));
  const wishToggle = useWishlist((s) => s.toggle);
  const eagerImage = priority && i < 4;

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
      <Link to={`/product/${p.slug}`} className="block" aria-label={`View ${p.name}`}>
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            ref={imgRef}
            src={p.image}
            alt={p.name}
            loading={eagerImage ? "eager" : "lazy"}
            decoding="async"
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
        </div>
      </Link>

      <div className="p-4 lg:p-5">
        <Link to={`/product/${p.slug}`} className="block">
          <div className="text-xs text-muted-foreground mb-1">{p.category}</div>
          <h3 className="font-display font-semibold text-base leading-snug line-clamp-1">{p.name}</h3>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-display font-bold text-lg text-primary">{formatPrice(p.price)}</span>
            {p.mrp && p.mrp > p.price && (
              <span className="text-xs text-muted-foreground line-through">{formatPrice(p.mrp)}</span>
            )}
          </div>
        </Link>

        {/* Blinkit-style ADD / stepper + inquiry */}
        <div className="mt-3 flex items-stretch gap-2 w-full">
          <div className="flex-1 min-w-0">
            <AddToCartButton product={p} imageRef={imgRef} />
          </div>
          <a
            href={buildProductInquiry(p)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Send inquiry on WhatsApp"
            className="shrink-0"
          >
            <Button
              type="button"
              variant="whatsapp"
              size="icon"
              className="h-9 w-9 rounded-xl"
            >
              <WhatsAppIcon className="w-4 h-4" />
            </Button>
          </a>
        </div>
      </div>
    </article>
  );
};
