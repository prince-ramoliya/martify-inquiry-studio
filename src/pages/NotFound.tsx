import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ShoppingBag, Heart, Phone, HelpCircle, Info } from "lucide-react";

const links = [
  { to: "/", label: "Home", icon: Home },
  { to: "/shop", label: "Shop", icon: ShoppingBag },
  { to: "/wishlist", label: "Wishlist", icon: Heart },
  { to: "/about", label: "About", icon: Info },
  { to: "/contact", label: "Contact", icon: Phone },
  { to: "/faq", label: "FAQ", icon: HelpCircle },
];

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404: route not found:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-background px-6 py-16">
      <div className="max-w-xl w-full text-center space-y-6">
        <div className="text-6xl font-display font-extrabold text-primary">404</div>
        <h1 className="font-display font-bold text-2xl">We couldn't find that page.</h1>
        <p className="text-muted-foreground text-sm break-all">
          Path: <span className="font-mono">{location.pathname}</span>
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4">
          {links.map((l) => (
            <Link key={l.to} to={l.to}>
              <Button variant="outline" className="w-full h-12 rounded-full">
                <l.icon className="w-4 h-4" /> {l.label}
              </Button>
            </Link>
          ))}
        </div>
        <Link to="/" className="inline-block pt-2">
          <Button variant="hero" size="lg" className="rounded-full">
            <Home className="w-4 h-4" /> Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
