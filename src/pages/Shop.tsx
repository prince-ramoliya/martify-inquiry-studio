import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { PageHeader } from "@/components/PageHeader";
import { Seo } from "@/components/Seo";
import { categories, products } from "@/data/products";
import { Button } from "@/components/ui/button";

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "new", label: "New Arrivals" },
];

const Shop = () => {
  const [activeCat, setActiveCat] = useState<string>("all");
  const [sort, setSort] = useState("featured");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    let list = products.slice();
    if (activeCat !== "all") list = list.filter((p) => p.categorySlug === activeCat);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    if (sort === "new") list.sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew));
    if (sort === "featured") list.sort((a, b) => Number(!!b.isFeatured) - Number(!!a.isFeatured));
    return list;
  }, [activeCat, sort, query]);

  return (
    <>
      <Seo title="Shop — MARTIFY Super Mart" description="Browse all premium products at MARTIFY: kitchen, beauty, decor, electronics, stationary, toys & sports." />
      <PageHeader
        eyebrow="The Shop"
        title="Browse everything we stock."
        description="500+ hand-picked products across six departments. Filter by category, sort how you like, save to wishlist or inquire on WhatsApp."
        crumbs={[{ label: "Shop" }]}
      />

      <section className="py-10 lg:py-16">
        <div className="container-page">
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Sidebar */}
            <aside className="lg:col-span-3">
              <div className="sticky top-24 space-y-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search the shop..."
                    className="w-full h-11 pl-10 pr-4 bg-muted rounded-full text-sm border border-transparent focus:border-primary focus:bg-background outline-none transition-smooth"
                  />
                </div>

                <div className="bg-card rounded-3xl p-6 shadow-card">
                  <h3 className="font-display font-bold text-base mb-4 flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4 text-primary" /> Categories
                  </h3>
                  <div className="space-y-1">
                    <button
                      onClick={() => setActiveCat("all")}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-smooth flex justify-between items-center ${
                        activeCat === "all" ? "bg-accent text-primary font-semibold" : "hover:bg-accent/50"
                      }`}
                    >
                      All Products <span className="text-xs text-muted-foreground">{products.length}</span>
                    </button>
                    {categories.map((c) => {
                      const count = products.filter((p) => p.categorySlug === c.slug).length;
                      return (
                        <button
                          key={c.slug}
                          onClick={() => setActiveCat(c.slug)}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-smooth flex justify-between items-center ${
                            activeCat === c.slug ? "bg-accent text-primary font-semibold" : "hover:bg-accent/50"
                          }`}
                        >
                          {c.name} <span className="text-xs text-muted-foreground">{count}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-gradient-hero rounded-3xl p-6 text-primary-foreground shadow-glow">
                  <div className="text-xs font-semibold opacity-80 uppercase tracking-wider mb-2">Need help?</div>
                  <div className="font-display font-bold text-lg mb-3 leading-tight">Talk to a real person on WhatsApp</div>
                  <Button variant="whatsapp" size="sm" asChild>
                    <a href="https://wa.me/919879177924" target="_blank" rel="noopener noreferrer">Chat now</a>
                  </Button>
                </div>
              </div>
            </aside>

            {/* Grid */}
            <div className="lg:col-span-9">
              <div className="flex items-center justify-between mb-6">
                <div className="text-sm text-muted-foreground">
                  Showing <span className="font-semibold text-foreground">{filtered.length}</span> products
                </div>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="h-10 px-4 bg-muted rounded-full text-sm font-medium outline-none focus:bg-background border border-transparent focus:border-primary"
                >
                  {sortOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>

              {filtered.length === 0 ? (
                <div className="text-center py-20 bg-card rounded-3xl">
                  <p className="text-muted-foreground">No products match your filters.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                  {filtered.map((p, i) => <ProductCard key={p.id} p={p} i={i} />)}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Shop;
