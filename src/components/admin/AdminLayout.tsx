import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { Image, Layers, LogOut, Package, Settings as SettingsIcon, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const items = [
  { to: "/admin", end: true, label: "Dashboard", icon: Store },
  { to: "/admin/hero", label: "Hero Banners", icon: Image },
  { to: "/admin/categories", label: "Categories", icon: Layers },
  { to: "/admin/products", label: "Products", icon: Package },
  { to: "/admin/settings", label: "Site Settings", icon: SettingsIcon },
];

export const AdminLayout = () => {
  const { signOut, user } = useAuth();
  const nav = useNavigate();
  const onLogout = async () => { await signOut(); nav("/"); };

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col lg:flex-row">
      <aside className="lg:w-64 lg:min-h-screen bg-card border-b lg:border-b-0 lg:border-r border-border">
        <div className="p-4 lg:p-6 flex items-center justify-between lg:block">
          <Link to="/" className="font-display font-extrabold text-xl">MARTIFY <span className="text-primary">·</span> Admin</Link>
          <Button variant="ghost" size="sm" onClick={onLogout} className="lg:hidden"><LogOut className="w-4 h-4" /></Button>
        </div>
        <nav className="flex lg:flex-col gap-1 px-2 pb-3 lg:px-4 overflow-x-auto">
          {items.map((it) => (
            <NavLink key={it.to} to={it.to} end={it.end}
              className={({ isActive }) => `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-smooth ${isActive ? "bg-primary text-primary-foreground" : "hover:bg-accent"}`}>
              <it.icon className="w-4 h-4" /> {it.label}
            </NavLink>
          ))}
        </nav>
        <div className="hidden lg:block p-4 border-t border-border mt-4">
          <div className="text-xs text-muted-foreground mb-2 truncate">{user?.email}</div>
          <Button variant="outline" size="sm" className="w-full" onClick={onLogout}><LogOut className="w-4 h-4" /> Sign out</Button>
        </div>
      </aside>
      <main className="flex-1 p-4 lg:p-8 max-w-6xl">
        <Outlet />
      </main>
    </div>
  );
};
