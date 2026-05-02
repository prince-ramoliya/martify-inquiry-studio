import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/store/cart";

export const WhatsAppFloat = () => {
  const cartCount = useCart((s) => s.items.reduce((a, i) => a + i.qty, 0));
  const lastAdded = useCart((s) => s.lastAddedId);

  return (
    <Link
      to="/cart"
      id="cart-target-mobile"
      aria-label={`View cart${cartCount > 0 ? ` (${cartCount} items)` : ""}`}
      className={`md:hidden fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-glow flex items-center justify-center hover:scale-110 transition-spring ${
        lastAdded ? "animate-bounce-once" : ""
      }`}
    >
      {cartCount > 0 && (
        <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-25" />
      )}
      <ShoppingCart className="w-6 h-6 relative" />
      {cartCount > 0 && (
        <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1.5 text-[11px] font-bold rounded-full bg-foreground text-background flex items-center justify-center border-2 border-background">
          {cartCount}
        </span>
      )}
    </Link>
  );
};
