import { Link } from "react-router-dom";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { PageHeader } from "@/components/PageHeader";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { useCart } from "@/store/cart";
import { buildCartInquiry, formatPrice } from "@/data/products";
import { toast } from "sonner";

const Cart = () => {
  const items = useCart((s) => s.items);
  const setQty = useCart((s) => s.setQty);
  const removeItem = useCart((s) => s.removeItem);
  const clear = useCart((s) => s.clear);
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);
  const totalItems = items.reduce((s, i) => s + i.qty, 0);

  return (
    <>
      <Seo title="Your Cart — MARTIFY" description="Review the products in your cart and send a combined WhatsApp inquiry." />
      <PageHeader
        eyebrow="Your Bag"
        title={items.length === 0 ? "Your cart is empty." : `${totalItems} item${totalItems > 1 ? "s" : ""} ready for inquiry.`}
        description="MARTIFY is inquiry-based. Add what you love, then send the whole list to us on WhatsApp — we'll confirm availability and details."
        crumbs={[{ label: "Cart" }]}
      />

      <section className="py-12 lg:py-16">
        <div className="container-page">
          {items.length === 0 ? (
            <div className="max-w-md mx-auto text-center py-16">
              <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-9 h-9 text-primary" />
              </div>
              <h2 className="font-display font-bold text-2xl mb-3">Nothing here yet</h2>
              <p className="text-muted-foreground mb-6">Browse the shop and add a few products to get started.</p>
              <Link to="/shop"><Button variant="hero" size="lg">Start shopping <ArrowRight /></Button></Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8 space-y-4">
                {items.map((item, idx) => (
                  <div
                    key={item.id}
                    className="group bg-card rounded-3xl p-4 lg:p-6 shadow-card flex gap-4 lg:gap-6 items-center animate-fade-in-up"
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    <Link to={`/product/${item.slug}`} className="shrink-0">
                      <img src={item.image} alt={item.name} className="w-20 h-20 lg:w-28 lg:h-28 rounded-2xl object-cover" />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-muted-foreground">{item.category}</div>
                      <Link to={`/product/${item.slug}`} className="font-display font-semibold text-base lg:text-lg hover:text-primary line-clamp-1">{item.name}</Link>
                      <div className="font-display font-bold text-primary mt-1">{formatPrice(item.price)}</div>
                    </div>
                    <div className="flex items-center bg-muted rounded-full p-1">
                      <button onClick={() => setQty(item.id, item.qty - 1)} className="w-8 h-8 rounded-full hover:bg-background flex items-center justify-center">
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center font-semibold text-sm">{item.qty}</span>
                      <button onClick={() => setQty(item.id, item.qty + 1)} className="w-8 h-8 rounded-full hover:bg-background flex items-center justify-center">
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="hidden md:block font-display font-bold w-24 text-right">{formatPrice(item.price * item.qty)}</div>
                    <button
                      onClick={() => { removeItem(item.id); toast("Removed from cart"); }}
                      className="w-9 h-9 rounded-full hover:bg-destructive/10 hover:text-destructive flex items-center justify-center transition-smooth"
                      aria-label="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                <div className="flex justify-between pt-4">
                  <Link to="/shop" className="text-sm font-medium text-primary hover:underline">← Continue shopping</Link>
                  <button onClick={() => { clear(); toast("Cart cleared"); }} className="text-sm font-medium text-muted-foreground hover:text-destructive">
                    Clear cart
                  </button>
                </div>
              </div>

              {/* Summary */}
              <aside className="lg:col-span-4">
                <div className="sticky top-24 bg-card rounded-3xl p-6 lg:p-8 shadow-elev space-y-5">
                  <h2 className="font-display font-bold text-xl">Inquiry Summary</h2>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between"><span className="text-muted-foreground">Items</span><span className="font-semibold">{totalItems}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span className="font-semibold">{formatPrice(total)}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Delivery</span><span className="font-semibold">Discuss on WhatsApp</span></div>
                  </div>
                  <div className="border-t border-border pt-4 flex justify-between items-baseline">
                    <span className="font-display font-bold">Estimated Total</span>
                    <span className="font-display font-extrabold text-2xl text-primary">{formatPrice(total)}</span>
                  </div>
                  <a
                    href={buildCartInquiry(items.map((i) => ({ name: i.name, qty: i.qty, price: i.price })))}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="whatsapp" size="lg" className="w-full">
                      <MessageCircle /> Send WhatsApp Inquiry
                    </Button>
                  </a>
                  <p className="text-xs text-muted-foreground text-center">
                    No online checkout — we'll confirm everything on WhatsApp.
                  </p>
                </div>
              </aside>
            </div>
          )}
        </div>
      </section>

      {/* Reassurance section */}
      <section className="py-16 bg-gradient-soft border-t border-border">
        <div className="container-page">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { t: "Real humans, fast replies", d: "Our team replies on WhatsApp usually within minutes during shop hours." },
              { t: "No payment online", d: "Pay only after you've seen, confirmed and are happy with your order." },
              { t: "Easy exchange", d: "Something not right? We'll help you exchange or refund — no hassle." },
            ].map((b) => (
              <div key={b.t} className="bg-card rounded-3xl p-6 shadow-card">
                <h3 className="font-display font-bold text-lg mb-2">{b.t}</h3>
                <p className="text-muted-foreground text-sm">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
