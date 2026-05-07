import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X, ArrowUpDown, MessageCircle } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { PageHeader } from "@/components/PageHeader";
import { Seo } from "@/components/Seo";
import { categories, products } from "@/data/products";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

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
  const [sortOpen, setSortOpen] = useState(false);

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

  const activeCatLabel =
    activeCat === "all" ? "All Products" : categories.find((c) => c.slug === activeCat)?.name ?? "";
  const activeSortLabel = sortOptions.find((o) => o.value === sort)?.label ?? "Sort";

  return (
    <>
      <Seo
        title="Shop — MARTIFY Super Mart"
        description="Browse all premium products at MARTIFY: kitchen, beauty, decor, electronics, stationary, toys & sports."
      />

      {/* Desktop page header */}
      <div className="hidden lg:block">
        <PageHeader
          eyebrow="The Shop"
          title="Browse everything we stock."
          description="500+ hand-picked products across six departments. Filter by category, sort how you like, save to wishlist or inquire on WhatsApp."
          crumbs={[{ label: "Shop" }]}
        />
      </div>

      {/* === MOBILE APP-STYLE TOOLBAR (non-sticky) === */}
      <div className="lg:hidden bg-background border-b border-border">
        <div className="container-page py-3 space-y-3">
          {/* Title + count */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display font-extrabold text-xl leading-tight">Shop</h1>
              <p className="text-xs text-muted-foreground">
                {filtered.length} {filtered.length === 1 ? "product" : "products"}
              </p>
            </div>
            <a
              href="https://wa.me/919879177924"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-card active:scale-95 transition-transform"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full h-12 pl-11 pr-10 bg-muted rounded-full text-sm border border-transparent focus:border-primary focus:bg-background outline-none transition-smooth"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background flex items-center justify-center"
                aria-label="Clear"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category chips - horizontal scroll */}
          <div className="-mx-4 px-4 overflow-x-auto no-scrollbar">
            <div className="flex gap-2 w-max">
              <button
                onClick={() => setActiveCat("all")}
                className={`px-4 h-9 rounded-full text-xs font-grotesk font-semibold whitespace-nowrap transition-smooth active:scale-95 ${
                  activeCat === "all"
                    ? "bg-primary text-primary-foreground shadow-card"
                    : "bg-muted text-foreground"
                }`}
              >
                All ({products.length})
              </button>
              {categories.map((c) => {
                const count = products.filter((p) => p.categorySlug === c.slug).length;
                const active = activeCat === c.slug;
                return (
                  <button
                    key={c.slug}
                    onClick={() => setActiveCat(c.slug)}
                    className={`px-4 h-9 rounded-full text-xs font-grotesk font-semibold whitespace-nowrap transition-smooth active:scale-95 ${
                      active
                        ? "bg-primary text-primary-foreground shadow-card"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    {c.name} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Filter / sort row */}
          <div className="flex items-center gap-2">
            <Sheet open={sortOpen} onOpenChange={setSortOpen}>
              <SheetTrigger asChild>
                <button className="flex-1 h-11 px-4 bg-muted rounded-full text-xs font-grotesk font-semibold flex items-center justify-between active:scale-[0.98] transition-transform">
                  <span className="flex items-center gap-2">
                    <ArrowUpDown className="w-3.5 h-3.5 text-primary" />
                    Sort: {activeSortLabel}
                  </span>
                </button>
              </SheetTrigger>
              <SheetContent side="bottom" className="rounded-t-3xl">
                <SheetHeader>
                  <SheetTitle className="font-display">Sort by</SheetTitle>
                </SheetHeader>
                <div className="mt-4 space-y-1 pb-6">
                  {sortOptions.map((o) => (
                    <button
                      key={o.value}
                      onClick={() => {
                        setSort(o.value);
                        setSortOpen(false);
                      }}
                      className={`w-full text-left px-4 h-12 rounded-xl text-sm font-medium transition-smooth ${
                        sort === o.value ? "bg-accent text-primary" : "hover:bg-muted"
                      }`}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              </SheetContent>
            </Sheet>

            <Sheet>
              <SheetTrigger asChild>
                <button className="h-11 px-4 bg-primary text-primary-foreground rounded-full text-xs font-grotesk font-semibold flex items-center gap-2 active:scale-[0.98] transition-transform">
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  Filter
                </button>
              </SheetTrigger>
              <SheetContent side="bottom" className="rounded-t-3xl max-h-[80vh] overflow-y-auto">
                <SheetHeader>
                  <SheetTitle className="font-display">Filter products</SheetTitle>
                </SheetHeader>
                <div className="mt-4 pb-6">
                  <h4 className="text-xs font-grotesk font-bold uppercase tracking-wider text-muted-foreground mb-3">
                    Category
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setActiveCat("all")}
                      className={`h-12 px-4 rounded-xl text-sm font-grotesk font-semibold ${
                        activeCat === "all"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      All ({products.length})
                    </button>
                    {categories.map((c) => {
                      const count = products.filter((p) => p.categorySlug === c.slug).length;
                      return (
                        <button
                          key={c.slug}
                          onClick={() => setActiveCat(c.slug)}
                          className={`h-12 px-4 rounded-xl text-sm font-grotesk font-semibold ${
                            activeCat === c.slug
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          }`}
                        >
                          {c.name} ({count})
                        </button>
                      );
                    })}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      <section className="pb-10 lg:py-16 pt-4 lg:pt-0">
        <div className="container-page">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Desktop sidebar */}
            <aside className="hidden lg:block lg:col-span-3">
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
                  <div className="text-xs font-semibold opacity-80 uppercase tracking-wider mb-2">
                    Need help?
                  </div>
                  <div className="font-display font-bold text-lg mb-3 leading-tight">
                    Talk to a real person on WhatsApp
                  </div>
                  <Button variant="whatsapp" size="sm" asChild>
                    <a href="https://wa.me/919879177924" target="_blank" rel="noopener noreferrer">
                      Chat now
                    </a>
                  </Button>
                </div>
              </div>
            </aside>

            {/* Grid */}
            <div className="lg:col-span-9">
              {/* Desktop top bar */}
              <div className="hidden lg:flex items-center justify-between mb-6">
                <div className="text-sm text-muted-foreground">
                  Showing <span className="font-semibold text-foreground">{filtered.length}</span> products
                  {activeCat !== "all" && <> in <span className="font-semibold text-foreground">{activeCatLabel}</span></>}
                </div>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="h-10 px-4 bg-muted rounded-full text-sm font-medium outline-none focus:bg-background border border-transparent focus:border-primary"
                >
                  {sortOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>

              {filtered.length === 0 ? (
                <div className="text-center py-20 bg-card rounded-3xl">
                  <p className="text-muted-foreground mb-3">No products match your filters.</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setQuery("");
                      setActiveCat("all");
                    }}
                  >
                    Clear filters
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-6">
                  {filtered.map((p, i) => (
                    <ProductCard key={p.id} p={p} i={i} priority />
                  ))}
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
