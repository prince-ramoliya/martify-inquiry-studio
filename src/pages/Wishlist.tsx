import { Link } from "react-router-dom";
import { Heart, MessageCircle, ShoppingCart, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/PageHeader";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { useCart, useWishlist } from "@/store/cart";
import { buildProductInquiry, formatPrice, getProduct } from "@/data/products";

const Wishlist = () => {
  const ids = useWishlist((s) => s.ids);
  const remove = useWishlist((s) => s.remove);
  const addItem = useCart((s) => s.addItem);
  const items = ids.map(getProduct).filter(Boolean) as NonNullable<ReturnType<typeof getProduct>>[];

  return (
    <>
      <Seo title="Your Wishlist — MARTIFY" description="Saved products you want to come back to." />
      <PageHeader
        eyebrow="Saved for later"
        title={items.length === 0 ? "No saved items yet." : `${items.length} product${items.length > 1 ? "s" : ""} saved.`}
        description="Tap the heart on any product to save it here. Send the whole list to us on WhatsApp anytime."
        crumbs={[{ label: "Wishlist" }]}
      />

      <section className="py-12 lg:py-16">
        <div className="container-page">
          {items.length === 0 ? (
            <div className="max-w-md mx-auto text-center py-16">
              <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center mx-auto mb-6">
                <Heart className="w-9 h-9 text-primary" />
              </div>
              <h2 className="font-display font-bold text-2xl mb-3">Your wishlist is empty</h2>
              <p className="text-muted-foreground mb-6">Find something you love and save it here.</p>
              <Link to="/shop"><Button variant="hero" size="lg">Explore the shop</Button></Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-5">
              {items.map((p, i) => (
                <div key={p.id} className="bg-card rounded-3xl p-5 shadow-card flex gap-5 animate-fade-in-up" style={{ animationDelay: `${i * 50}ms` }}>
                  <Link to={`/product/${p.slug}`} className="shrink-0">
                    <img src={p.image} alt={p.name} className="w-28 h-28 rounded-2xl object-cover" />
                  </Link>
                  <div className="flex-1 min-w-0 flex flex-col">
                    <div className="text-xs text-muted-foreground">{p.category}</div>
                    <Link to={`/product/${p.slug}`} className="font-display font-semibold hover:text-primary line-clamp-1">{p.name}</Link>
                    <div className="font-display font-bold text-primary mt-1">{formatPrice(p.price)}</div>
                    <div className="mt-auto flex flex-wrap gap-2">
                      <Button size="sm" variant="hero" onClick={() => { addItem(p); toast.success(`${p.name} added to cart`); }}>
                        <ShoppingCart /> Add
                      </Button>
                      <a href={buildProductInquiry(p)} target="_blank" rel="noopener noreferrer">
                        <Button size="sm" variant="whatsapp"><MessageCircle /></Button>
                      </a>
                      <Button size="sm" variant="ghost" onClick={() => { remove(p.id); toast("Removed from wishlist"); }}>
                        <Trash2 />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Wishlist;
