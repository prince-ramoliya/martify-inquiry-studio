import { useParams, Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { ProductCard } from "@/components/ProductCard";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { categories, getCategory, productsByCategory } from "@/data/products";

const CategoryPage = () => {
  const { slug = "" } = useParams();
  const cat = getCategory(slug);
  const items = productsByCategory(slug);
  const others = categories.filter((c) => c.slug !== slug);

  if (!cat) {
    return (
      <div className="container-page py-32 text-center">
        <h1 className="font-display font-bold text-3xl mb-4">Category not found</h1>
        <Link to="/shop"><Button variant="hero">Back to shop</Button></Link>
      </div>
    );
  }

  return (
    <>
      <Seo title={`${cat.name} — MARTIFY`} description={cat.description} />

      {/* Hero with image */}
      <section className="relative bg-gradient-dark text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img src={cat.image} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary-deep via-primary-deep/80 to-primary-deep/30" />
        <div className="container-page relative py-20 lg:py-28">
          <nav className="text-sm text-primary-foreground/70 mb-4 flex gap-2">
            <Link to="/" className="hover:text-primary-foreground">Home</Link>
            <span>/</span>
            <Link to="/shop" className="hover:text-primary-foreground">Shop</Link>
            <span>/</span>
            <span className="text-primary-foreground">{cat.name}</span>
          </nav>
          <div className="text-sm font-semibold opacity-80 uppercase tracking-wider mb-3">{cat.tagline}</div>
          <h1 className="font-display font-extrabold text-4xl lg:text-6xl max-w-3xl">{cat.name}</h1>
          <p className="mt-5 text-lg text-primary-foreground/80 max-w-2xl">{cat.description}</p>
          <div className="mt-6 inline-flex items-center gap-3 text-sm">
            <span className="px-3 py-1 rounded-full glass-dark">{items.length} products</span>
            <span className="px-3 py-1 rounded-full glass-dark">In stock</span>
          </div>
        </div>
      </section>

      {/* Intro strip */}
      <section className="py-10 border-b border-border">
        <div className="container-page grid md:grid-cols-3 gap-6 text-sm">
          {[
            { t: "Curated collection", d: "Every product is hand-picked by our team." },
            { t: "Trusted brands", d: "We only stock what we'd buy ourselves." },
            { t: "WhatsApp inquiry", d: "Ask questions, get fast honest answers." },
          ].map((b) => (
            <div key={b.t}>
              <div className="font-display font-bold mb-1">{b.t}</div>
              <div className="text-muted-foreground">{b.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Products */}
      <section className="py-16 lg:py-20">
        <div className="container-page">
          <div className="flex items-end justify-between mb-8">
            <h2 className="font-display font-bold text-2xl lg:text-3xl">All {cat.name}</h2>
            <Link to="/shop" className="text-primary text-sm font-medium hover:underline">View entire shop</Link>
          </div>
          {items.length === 0 ? (
            <div className="py-20 text-center text-muted-foreground">No products in this category yet.</div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {items.map((p, i) => <ProductCard key={p.id} p={p} i={i} priority />)}
            </div>
          )}
        </div>
      </section>

      {/* Related categories */}
      <section className="py-16 lg:py-24 bg-gradient-soft">
        <div className="container-page">
          <h2 className="font-display font-bold text-2xl lg:text-3xl mb-8">Explore other categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {others.map((c) => (
              <Link key={c.slug} to={`/category/${c.slug}`} className="group relative aspect-square rounded-2xl overflow-hidden shadow-card hover-lift">
                <img src={c.image} alt={c.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-deep/90 to-transparent" />
                <div className="absolute inset-0 p-4 flex items-end text-primary-foreground">
                  <div className="font-display font-bold text-sm leading-tight">{c.name}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container-page">
          <div className="rounded-3xl bg-gradient-hero p-10 lg:p-14 text-primary-foreground text-center shadow-glow">
            <h3 className="font-display font-bold text-2xl lg:text-4xl mb-3">Can't find what you need?</h3>
            <p className="opacity-80 mb-6 max-w-xl mx-auto">Drop us a WhatsApp message — we'll source it for you.</p>
            <a href="https://wa.me/919879177924" target="_blank" rel="noopener noreferrer">
              <Button variant="whatsapp" size="xl">Send WhatsApp inquiry <ArrowRight /></Button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default CategoryPage;
