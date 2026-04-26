import { Link } from "react-router-dom";
import { Image, Layers, Package, Settings as SettingsIcon } from "lucide-react";
import { useHeroSlides, useCategories, useProducts } from "@/hooks/useContent";

const cards = [
  { to: "/admin/hero", label: "Hero Banners", icon: Image, key: "hero" },
  { to: "/admin/categories", label: "Categories", icon: Layers, key: "cat" },
  { to: "/admin/products", label: "Products", icon: Package, key: "prod" },
  { to: "/admin/settings", label: "Site Settings", icon: SettingsIcon, key: "set" },
];

const AdminDashboard = () => {
  const { rows: hero } = useHeroSlides();
  const { rows: cats } = useCategories();
  const { rows: prods } = useProducts();
  const counts: Record<string, number | string> = { hero: hero.length, cat: cats.length, prod: prods.length, set: "—" };

  return (
    <div>
      <h1 className="font-display font-extrabold text-3xl mb-2">Dashboard</h1>
      <p className="text-muted-foreground mb-8">Manage everything that appears on your storefront.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {cards.map((c) => (
          <Link key={c.to} to={c.to} className="bg-card rounded-2xl p-6 shadow-card hover-lift flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center"><c.icon className="w-6 h-6 text-primary" /></div>
            <div>
              <div className="font-display font-bold text-lg">{c.label}</div>
              <div className="text-sm text-muted-foreground">{counts[c.key]} items</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default AdminDashboard;
