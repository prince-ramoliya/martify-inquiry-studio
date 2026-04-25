import { useEffect, useState } from "react";
import { Heart, Menu, Phone, Search, ShoppingCart, X } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "./ui/button";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "#shop" },
  { label: "Categories", href: "#categories" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-smooth ${
        scrolled ? "glass shadow-card" : "bg-background"
      }`}
    >
      <div className="container-page flex items-center justify-between h-16 md:h-20 gap-4">
        <Logo />

        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary rounded-lg hover:bg-accent transition-smooth"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2 flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search premium products..."
              className="w-full h-10 pl-10 pr-4 bg-muted rounded-full text-sm border border-transparent focus:border-primary focus:bg-background outline-none transition-smooth"
            />
          </div>
        </div>

        <div className="flex items-center gap-1 md:gap-2">
          <Button variant="ghost" size="icon" className="rounded-full" aria-label="Wishlist">
            <Heart className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full relative" aria-label="Cart">
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 text-[10px] font-bold rounded-full bg-primary text-primary-foreground flex items-center justify-center">
              0
            </span>
          </Button>
          <Button variant="hero" size="sm" className="hidden md:inline-flex">
            <Phone className="w-4 h-4" />
            Contact
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden rounded-full"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
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
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="px-4 py-3 text-sm font-medium rounded-lg hover:bg-accent"
            >
              {l.label}
            </a>
          ))}
          <Button variant="hero" className="mt-2">
            <Phone className="w-4 h-4" /> Contact Us
          </Button>
        </div>
      </div>
    </header>
  );
};
