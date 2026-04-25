import { MessageCircle } from "lucide-react";
import { buildWhatsAppLink } from "@/data/products";

export const WhatsAppFloat = () => (
  <a
    href={buildWhatsAppLink("Hello MARTIFY, I'd like to inquire about your products.")}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat on WhatsApp"
    className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[hsl(142_70%_45%)] text-white shadow-glow flex items-center justify-center hover:scale-110 transition-spring"
  >
    <span className="absolute inset-0 rounded-full bg-[hsl(142_70%_45%)] animate-ping opacity-30" />
    <MessageCircle className="w-6 h-6 relative" />
  </a>
);
