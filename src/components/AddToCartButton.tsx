import { Plus, Minus, ShoppingCart } from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";
import { useCart } from "@/store/cart";
import { flyToCart } from "@/lib/flyToCart";
import type { Product } from "@/data/products";
import { formatPrice } from "@/data/commerce";
import { cn } from "@/lib/utils";

type Props = {
  product: Product;
  imageRef?: React.RefObject<HTMLImageElement | null>;
  className?: string;
  /** "compact" = card-button size, "default" = larger e.g. PDP */
  size?: "compact" | "default";
};

/**
 * Blinkit-style add-to-cart control.
 * - When qty === 0: shows an "ADD" button.
 * - When qty > 0: morphs into [-  qty  +] stepper.
 */
export const AddToCartButton = ({ product, imageRef, className, size = "compact" }: Props) => {
  const items = useCart((s) => s.items);
  const addItem = useCart((s) => s.addItem);
  const setQty = useCart((s) => s.setQty);
  const inCart = items.find((i) => i.id === product.id);
  const qty = inCart?.qty ?? 0;
  const localImg = useRef<HTMLImageElement>(null);

  const sizeCls =
    size === "compact"
      ? "h-9 text-xs"
      : "h-11 text-sm";

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    flyToCart((imageRef?.current) || localImg.current);
    addItem(product, 1);
    if (qty === 0) {
      toast.success(`${product.name} added`, {
        description: formatPrice(product.price),
      });
    }
  };

  const handleInc = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQty(product.id, qty + 1);
  };

  const handleDec = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQty(product.id, qty - 1);
  };

  if (qty === 0) {
    return (
      <button
        type="button"
        onClick={handleAdd}
        className={cn(
          "group/add relative w-full inline-flex items-center justify-center gap-1.5",
          "rounded-xl border-2 border-primary text-primary bg-background",
          "font-bold uppercase tracking-wide",
          "hover:bg-primary hover:text-primary-foreground transition-colors",
          "active:scale-[0.97]",
          sizeCls,
          className,
        )}
        aria-label={`Add ${product.name} to cart`}
      >
        <ShoppingCart className="w-3.5 h-3.5" />
        <span>ADD</span>
      </button>
    );
  }

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={cn(
        "w-full inline-flex items-stretch overflow-hidden rounded-xl",
        "bg-primary text-primary-foreground font-bold",
        "shadow-card animate-fade-in",
        sizeCls,
        className,
      )}
    >
      <button
        type="button"
        onClick={handleDec}
        aria-label="Decrease quantity"
        className="flex-1 flex items-center justify-center hover:bg-primary/85 active:scale-95 transition-transform"
      >
        <Minus className="w-3.5 h-3.5" />
      </button>
      <div className="flex-1 flex items-center justify-center tabular-nums select-none">
        {qty}
      </div>
      <button
        type="button"
        onClick={handleInc}
        aria-label="Increase quantity"
        className="flex-1 flex items-center justify-center hover:bg-primary/85 active:scale-95 transition-transform"
      >
        <Plus className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
