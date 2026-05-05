import { ShoppingBag, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/store/cart";
import { formatPrice } from "@/data/commerce";

/**
 * Blinkit-style sticky "view cart" bar — mobile only.
 * Appears at the bottom whenever the cart has items.
 */
export const CartStickyBar = () => {
  const items = useCart((s) => s.items);
  const count = items.reduce((a, i) => a + i.qty, 0);
  const total = items.reduce((a, i) => a + i.qty * i.price, 0);

  if (count === 0) return null;

  return (
    <div
      className="md:hidden fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 pointer-events-none"
      role="region"
      aria-label="Cart summary"
    >
      <Link
        to="/cart"
        className="pointer-events-auto group flex items-center justify-between gap-3 rounded-2xl bg-primary text-primary-foreground px-4 py-3 shadow-glow animate-slide-up"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative w-10 h-10 rounded-xl bg-primary-foreground/15 flex items-center justify-center shrink-0">
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1.5 text-[11px] font-bold rounded-full bg-background text-foreground border-2 border-primary flex items-center justify-center">
              {count}
            </span>
          </div>
          <div className="min-w-0">
            <div className="text-[11px] font-medium opacity-85 leading-tight">
              {count} item{count > 1 ? "s" : ""}
            </div>
            <div className="font-display font-bold text-base leading-tight truncate">
              {formatPrice(total)}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1.5 font-semibold text-sm">
          View cart
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </div>
      </Link>
    </div>
  );
};
