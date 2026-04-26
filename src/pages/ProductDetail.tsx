import { useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Check, Heart, Minus, MessageCircle, Plus, Share2, ShoppingCart, Star, Truck, ShieldCheck, RotateCw } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/PageHeader";
import { ProductCard } from "@/components/ProductCard";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { buildProductInquiry, formatPrice, getProduct, productsByCategory } from "@/data/products";
import { useCart, useWishlist } from "@/store/cart";
import { flyToCart } from "@/lib/flyToCart";

const ProductDetail = () => {
  const { slug = "" } = useParams();
  const product = getProduct(slug);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<"desc" | "specs" | "reviews">("desc");
  const imgRef = useRef<HTMLImageElement>(null);
  const addItem = useCart((s) => s.addItem);
  const wishHas = useWishlist((s) => product && s.ids.includes(product.id));
  const wishToggle = useWishlist((s) => s.toggle);

  if (!product) {
    return (
      <div className="container-page py-32 text-center">
        <h1 className="font-display font-bold text-3xl mb-4">Product not found</h1>
        <Link to="/shop"><Button variant="hero">Back to shop</Button></Link>
      </div>
    );
  }

  const related = productsByCategory(product.categorySlug).filter((p) => p.id !== product.id).slice(0, 4);

  const onAdd = () => {
    flyToCart(imgRef.current);
    addItem(product, qty);
    toast.success(`Added ${qty} × ${product.name}`, { description: formatPrice(product.price * qty) });
  };

  return (
    <>
      <Seo title={`${product.name} — MARTIFY`} description={product.shortDescription} />

      <section className="py-8 lg:py-12 border-b border-border">
        <div className="container-page">
          <nav className="text-sm text-muted-foreground mb-6 flex flex-wrap gap-2">
            <Link to="/" className="hover:text-primary">Home</Link><span>/</span>
            <Link to="/shop" className="hover:text-primary">Shop</Link><span>/</span>
            <Link to={`/category/${product.categorySlug}`} className="hover:text-primary">{product.category}</Link><span>/</span>
            <span className="text-foreground">{product.name}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-muted shadow-card">
                <img ref={imgRef} src={product.image} alt={product.name} className="w-full h-full object-cover" />
                {product.badge && (
                  <span className="absolute top-4 left-4 px-3 py-1 text-xs font-bold rounded-full bg-gradient-hero text-primary-foreground shadow-card">
                    {product.badge}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-4 gap-3">
                {[1, 2, 3, 4].map((n) => (
                  <button key={n} className="aspect-square rounded-xl overflow-hidden bg-muted ring-2 ring-transparent hover:ring-primary transition-smooth">
                    <img src={product.image} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="space-y-6">
              <div>
                <Link to={`/category/${product.categorySlug}`} className="text-sm font-medium text-primary uppercase tracking-wider">{product.category}</Link>
                <h1 className="font-display font-extrabold text-3xl lg:text-5xl tracking-tight mt-2">{product.name}</h1>
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-muted"}`} />
                    ))}
                    <span className="text-sm font-medium ml-1">{product.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">({product.reviewCount} reviews)</span>
                </div>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed">{product.shortDescription}</p>

              <div className="flex items-baseline gap-3">
                <span className="font-display font-extrabold text-4xl text-primary">{formatPrice(product.price)}</span>
                {product.mrp && product.mrp > product.price && (
                  <>
                    <span className="text-lg text-muted-foreground line-through">{formatPrice(product.mrp)}</span>
                    <span className="px-2 py-1 text-xs font-bold rounded-full bg-accent text-primary">
                      {Math.round((1 - product.price / product.mrp) * 100)}% OFF
                    </span>
                  </>
                )}
              </div>

              <ul className="space-y-2">
                {product.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              {/* === MOBILE buttons (app-like stacked layout) === */}
              <div className="space-y-3 sm:hidden">
                {/* Qty selector + wishlist row */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center bg-muted rounded-full p-1 h-14 flex-1">
                    <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-12 h-12 rounded-full bg-background shadow-sm flex items-center justify-center transition-smooth active:scale-95">
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="flex-1 text-center font-bold font-grotesk text-base">{qty}</span>
                    <button onClick={() => setQty(qty + 1)} className="w-12 h-12 rounded-full bg-background shadow-sm flex items-center justify-center transition-smooth active:scale-95">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <Button
                    variant={wishHas ? "default" : "outline"}
                    size="xl"
                    className="w-14 h-14 px-0 rounded-full"
                    onClick={() => {
                      wishToggle(product.id);
                      toast(wishHas ? "Removed from wishlist" : "Added to wishlist");
                    }}
                    aria-label="Wishlist"
                  >
                    <Heart className={wishHas ? "fill-current" : ""} />
                  </Button>
                  <Button
                    variant="outline"
                    size="xl"
                    className="w-14 h-14 px-0 rounded-full"
                    onClick={() => {
                      if (navigator.share) navigator.share({ title: product.name, url: window.location.href });
                      else { navigator.clipboard.writeText(window.location.href); toast("Link copied"); }
                    }}
                    aria-label="Share"
                  >
                    <Share2 />
                  </Button>
                </div>
                {/* Primary CTA */}
                <Button variant="hero" size="xl" className="w-full shadow-glow" onClick={onAdd}>
                  <ShoppingCart /> Add to Cart · {formatPrice(product.price * qty)}
                </Button>
                {/* Secondary CTA */}
                <a href={buildProductInquiry(product)} target="_blank" rel="noopener noreferrer" className="block">
                  <Button variant="whatsapp" size="xl" className="w-full">
                    <MessageCircle /> Send Inquiry on WhatsApp
                  </Button>
                </a>
              </div>

              {/* === DESKTOP buttons === */}
              <div className="hidden sm:block space-y-3">
                <div className="flex items-stretch gap-3">
                  <div className="flex items-center bg-muted rounded-full p-1 h-14">
                    <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-12 h-12 rounded-full hover:bg-background flex items-center justify-center transition-smooth">
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center font-semibold font-grotesk">{qty}</span>
                    <button onClick={() => setQty(qty + 1)} className="w-12 h-12 rounded-full hover:bg-background flex items-center justify-center transition-smooth">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <Button variant="hero" size="xl" className="flex-1" onClick={onAdd}>
                    <ShoppingCart /> Add to Cart
                  </Button>
                </div>
                <div className="grid grid-cols-[1fr_1fr_auto] gap-3">
                  <Button
                    variant={wishHas ? "default" : "outline"}
                    size="xl"
                    onClick={() => {
                      wishToggle(product.id);
                      toast(wishHas ? "Removed from wishlist" : "Added to wishlist");
                    }}
                  >
                    <Heart className={wishHas ? "fill-current" : ""} /> Wishlist
                  </Button>
                  <a href={buildProductInquiry(product)} target="_blank" rel="noopener noreferrer" className="contents">
                    <Button variant="whatsapp" size="xl" className="w-full">
                      <MessageCircle /> Send Inquiry
                    </Button>
                  </a>
                  <Button
                    variant="outline"
                    size="xl"
                    className="w-14 h-14 px-0"
                    onClick={() => {
                      if (navigator.share) navigator.share({ title: product.name, url: window.location.href });
                      else { navigator.clipboard.writeText(window.location.href); toast("Link copied"); }
                    }}
                    aria-label="Share"
                  >
                    <Share2 />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border">
                {[
                  { i: Truck, t: "Pickup in store" },
                  { i: ShieldCheck, t: "Quality assured" },
                  { i: RotateCw, t: "Easy exchange" },
                ].map((b) => (
                  <div key={b.t} className="flex flex-col items-center gap-2 text-xs text-center text-muted-foreground">
                    <b.i className="w-5 h-5 text-primary" />
                    {b.t}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-16">
        <div className="container-page max-w-4xl">
          <div className="flex gap-2 border-b border-border mb-8">
            {([
              { v: "desc", l: "Description" },
              { v: "specs", l: "Specifications" },
              { v: "reviews", l: `Reviews (${product.reviewCount})` },
            ] as const).map((t) => (
              <button
                key={t.v}
                onClick={() => setTab(t.v)}
                className={`px-5 py-3 text-sm font-display font-semibold border-b-2 transition-smooth ${
                  tab === t.v ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {t.l}
              </button>
            ))}
          </div>
          {tab === "desc" && <p className="text-muted-foreground leading-relaxed text-base">{product.description}</p>}
          {tab === "specs" && (
            <div className="rounded-2xl border border-border overflow-hidden">
              {product.specs.map((s, i) => (
                <div key={s.label} className={`grid grid-cols-2 px-5 py-4 ${i % 2 ? "bg-muted/40" : ""}`}>
                  <div className="font-medium">{s.label}</div>
                  <div className="text-muted-foreground">{s.value}</div>
                </div>
              ))}
            </div>
          )}
          {tab === "reviews" && (
            <div className="space-y-6">
              {[
                { n: "Riya P.", r: 5, t: "Exactly as described — quality is great and shipping was fast." },
                { n: "Arjun S.", r: 5, t: "Loved it. The MARTIFY team replied on WhatsApp within minutes." },
                { n: "Meera K.", r: 4, t: "Good product for the price. Recommended." },
              ].map((r) => (
                <div key={r.n} className="bg-card rounded-2xl p-6 shadow-card">
                  <div className="flex gap-1 mb-2">{[...Array(r.r)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}</div>
                  <p className="text-foreground/80 mb-3">"{r.t}"</p>
                  <div className="text-sm font-semibold">{r.n}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Related */}
      <section className="py-16 bg-gradient-soft">
        <div className="container-page">
          <h2 className="font-display font-bold text-2xl lg:text-3xl mb-8">You may also like</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {related.map((p, i) => <ProductCard key={p.id} p={p} i={i} />)}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetail;
