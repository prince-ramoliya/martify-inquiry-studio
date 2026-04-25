import { Facebook, Instagram, Mail, MapPin, MessageCircle, Phone, Twitter, Youtube } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "./ui/button";
import { WHATSAPP_NUMBER, buildWhatsAppLink, categories } from "@/data/products";

export const Footer = () => {
  return (
    <footer id="contact" className="bg-gradient-dark text-primary-foreground relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-glow/20 rounded-full blur-3xl" aria-hidden />
      <div className="container-page relative pt-20 pb-10">
        <div className="grid lg:grid-cols-12 gap-12 mb-14">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Logo variant="light" />
            <p className="mt-6 text-primary-foreground/70 leading-relaxed max-w-sm">
              MARTIFY is your one-stop premium supermarket — curated products, smart prices, instant WhatsApp support.
            </p>
            <a
              href={buildWhatsAppLink("Hello MARTIFY, I'd like to know more about your products.")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block"
            >
              <Button variant="whatsapp" size="lg">
                <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
              </Button>
            </a>
            <div className="flex gap-3 mt-6">
              {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full glass-dark flex items-center justify-center hover:bg-primary-glow transition-smooth">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="font-display font-bold text-base mb-5">Quick Links</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              {["Home", "Shop", "About", "Contact", "FAQ", "Wishlist"].map((l) => (
                <li key={l}><a href="#" className="hover:text-primary-foreground transition-smooth">{l}</a></li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="lg:col-span-3">
            <h4 className="font-display font-bold text-base mb-5">Categories</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              {categories.map((c) => (
                <li key={c.slug}><a href="#" className="hover:text-primary-foreground transition-smooth">{c.name}</a></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h4 className="font-display font-bold text-base mb-5">Get in Touch</h4>
            <ul className="space-y-4 text-sm text-primary-foreground/70">
              <li className="flex gap-3">
                <Phone className="w-4 h-4 mt-0.5 shrink-0 text-primary-glow" />
                <a href={`tel:+${WHATSAPP_NUMBER}`} className="hover:text-primary-foreground">+91 98791 77924</a>
              </li>
              <li className="flex gap-3">
                <Mail className="w-4 h-4 mt-0.5 shrink-0 text-primary-glow" />
                <a href="mailto:martifyforsale@gmail.com" className="hover:text-primary-foreground break-all">martifyforsale@gmail.com</a>
              </li>
              <li className="flex gap-3">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-primary-glow" />
                <span>Mahalakshmi campus, opp. Vishvambhar arcade, Gajera compound, Mota Varachha, Surat 394105</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between gap-4 text-sm text-primary-foreground/60">
          <div>© {new Date().getFullYear()} MARTIFY Super Mart. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary-foreground">Privacy</a>
            <a href="#" className="hover:text-primary-foreground">Terms</a>
            <a href="#" className="hover:text-primary-foreground">FAQ</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
