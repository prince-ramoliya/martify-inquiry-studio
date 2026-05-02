import { useEffect, useState } from "react";
import { Heart, Menu, Phone, Search, ShoppingCart, X } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Logo } from "./Logo";
import { Button } from "./ui/button";
import { useCart, useWishlist } from "@/store/cart";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
  { label: "FAQ", to: "/faq" },
];

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const cartCount = useCart((s) => s.items.reduce((a, i) => a + i.qty, 0));
  const wishCount = useWishlist((s) => s.ids.length);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-smooth ${
        scrolled ? "glass shadow-card" : "bg-background border-b border-transparent"
      }`}
    >
      <div className="container-page relative flex items-center justify-between h-16 md:h-20 gap-4 my-[8px]">
        {/* MOBILE: hamburger left */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden rounded-full -ml-2"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>

        {/* MOBILE: centered logo */}
        <div className="lg:hidden absolute left-1/2 -translate-x-1/2">
          <Logo />
        </div>

        {/* DESKTOP: logo on the left */}
        <div className="hidden lg:block">
          <Logo />
        </div>

        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `px-4 py-2 text-sm font-medium rounded-full transition-smooth ${
                  isActive
                    ? "bg-accent text-primary"
                    : "text-foreground/80 hover:text-primary hover:bg-accent"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-2 flex-1 max-w-xs mx-2">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full h-10 pl-10 pr-4 bg-muted rounded-full text-sm border border-transparent focus:border-primary focus:bg-background outline-none transition-smooth"
            />
          </div>
        </div>

        <div className="flex items-center gap-1 md:gap-2">
          <Link to="/wishlist">
            <Button variant="ghost" size="icon" className="rounded-full relative" aria-label="Wishlist">
              <Heart className="w-5 h-5" />
              {wishCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 text-[10px] font-bold rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                  {wishCount}
                </span>
              )}
            </Button>
          </Link>
          <Link to="/cart" className="hidden md:block">
            <Button variant="ghost" size="icon" className="rounded-full relative" aria-label="Cart" id="cart-target">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-4 h-4 px-1 text-[10px] font-bold rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Button>
          </Link>
          <Link to="/contact" className="hidden lg:block">
            <Button variant="hero" size="sm">
              <Phone className="w-4 h-4" />
              Contact
            </Button>
          </Link>
        </div>
      </div>

      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          open ? "max-h-96 border-t border-border" : "max-h-0"
        }`}
      >
        <div className="container-page py-4 flex flex-col gap-1 bg-background">
          <div className="relative mb-3 md:hidden">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full h-10 pl-10 pr-4 bg-muted rounded-full text-sm outline-none"
            />
          </div>
          {navLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `px-4 py-3 text-sm font-medium rounded-lg ${isActive ? "bg-accent text-primary" : "hover:bg-accent"}`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <Link to="/contact">
            <Button variant="hero" className="mt-2 w-full">
              <Phone className="w-4 h-4" /> Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};
