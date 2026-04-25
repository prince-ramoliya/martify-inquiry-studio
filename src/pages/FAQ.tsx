import { useState } from "react";
import { ChevronDown, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { buildWhatsAppLink } from "@/data/products";

const groups = [
  {
    title: "Ordering & Inquiries",
    items: [
      { q: "How do I order from MARTIFY?", a: "MARTIFY is inquiry-based. Add products to your cart or wishlist, then click 'Send WhatsApp Inquiry'. Our team will confirm availability, share final pricing and arrange pickup or delivery." },
      { q: "Do you have an online checkout?", a: "Not yet. We've found that families prefer talking to a real person before paying — so we keep it personal on WhatsApp." },
      { q: "Can I see the product before paying?", a: "Yes. You can visit our Mota Varachha store, or we can share photos and videos over WhatsApp before you confirm." },
    ],
  },
  {
    title: "Delivery & Pickup",
    items: [
      { q: "Do you deliver?", a: "We deliver across Surat. For nearby areas it's same-day. For other cities in Gujarat we use trusted courier partners — discussed on WhatsApp." },
      { q: "Is delivery free?", a: "Free delivery in Surat for orders above ₹999. Outside Surat, charges depend on weight and distance." },
      { q: "Can I pick up from the store?", a: "Absolutely. Just let us know on WhatsApp and we'll keep your items ready." },
    ],
  },
  {
    title: "Products & Quality",
    items: [
      { q: "Are your products genuine?", a: "Yes. Every product is sourced from authorized distributors or directly from brands. We don't stock counterfeits — ever." },
      { q: "Do you offer warranty?", a: "Most electronics and appliances carry the manufacturer's warranty. We help with claims if anything goes wrong." },
      { q: "What if I receive a damaged item?", a: "Reach out within 48 hours on WhatsApp with a photo. We'll arrange a free exchange or refund." },
    ],
  },
  {
    title: "Returns & Support",
    items: [
      { q: "Can I return a product?", a: "Yes — within 7 days of delivery for unused, unopened items. Hygiene products (skincare, etc.) can't be returned once opened." },
      { q: "How do I get support?", a: "WhatsApp is fastest. You can also call or email — details on the Contact page." },
      { q: "Where can I leave feedback?", a: "We love feedback! Send it on WhatsApp, or leave a Google review for our store." },
    ],
  },
];

const Item = ({ q, a, defaultOpen }: { q: string; a: string; defaultOpen?: boolean }) => {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div className="bg-card rounded-2xl shadow-card overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between gap-4 p-5 lg:p-6 text-left">
        <span className="font-display font-semibold text-base lg:text-lg">{q}</span>
        <ChevronDown className={`w-5 h-5 shrink-0 text-primary transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <div className={`grid transition-all duration-300 ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden">
          <p className="px-5 lg:px-6 pb-6 text-muted-foreground leading-relaxed">{a}</p>
        </div>
      </div>
    </div>
  );
};

const FAQ = () => (
  <>
    <Seo title="FAQ — MARTIFY Super Mart" description="Frequently asked questions about ordering, delivery, returns and support at MARTIFY." />
    <PageHeader
      eyebrow="Help center"
      title="Questions, answered honestly."
      description="Can't find what you're looking for? Send us a quick WhatsApp — we usually reply in under 5 minutes."
      crumbs={[{ label: "FAQ" }]}
    />

    <section className="py-12 lg:py-16">
      <div className="container-page max-w-4xl space-y-12">
        {groups.map((g) => (
          <div key={g.title}>
            <h2 className="font-display font-bold text-2xl lg:text-3xl mb-5">{g.title}</h2>
            <div className="space-y-3">
              {g.items.map((it, i) => <Item key={it.q} q={it.q} a={it.a} defaultOpen={i === 0} />)}
            </div>
          </div>
        ))}
      </div>
    </section>

    <section className="py-16 bg-gradient-soft">
      <div className="container-page">
        <div className="rounded-3xl bg-gradient-hero p-10 lg:p-14 text-primary-foreground text-center shadow-glow">
          <h3 className="font-display font-bold text-2xl lg:text-4xl mb-3">Still have a question?</h3>
          <p className="opacity-80 mb-6">We'd much rather chat than guess what you need.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href={buildWhatsAppLink("Hello MARTIFY, I have a question.")} target="_blank" rel="noopener noreferrer">
              <Button variant="whatsapp" size="xl"><MessageCircle /> WhatsApp us</Button>
            </a>
            <Link to="/contact">
              <Button variant="outline" size="xl" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Other ways to reach us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default FAQ;
