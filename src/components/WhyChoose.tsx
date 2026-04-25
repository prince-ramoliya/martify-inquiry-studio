import { Award, Headphones, Layers, ShieldCheck, Sparkles, Tag } from "lucide-react";

const items = [
  { icon: Award, title: "Premium Quality", desc: "Carefully curated products from trusted brands." },
  { icon: ShieldCheck, title: "Trusted Collection", desc: "Verified, authentic items that stand the test of time." },
  { icon: Layers, title: "Multiple Categories", desc: "Beauty, kitchen, decor, electronics — all in one place." },
  { icon: Tag, title: "Affordable Pricing", desc: "Smart prices on premium products, every day." },
  { icon: Sparkles, title: "Smart Shopping", desc: "Easy browsing, wishlists & instant inquiries." },
  { icon: Headphones, title: "WhatsApp Support", desc: "Quick replies from real humans, fast." },
];

export const WhyChoose = () => {
  return (
    <section id="about" className="py-20 lg:py-28 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary-glow/10 rounded-full blur-3xl" aria-hidden />
      <div className="container-page relative">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Why MARTIFY</div>
          <h2 className="font-display font-bold text-3xl lg:text-5xl tracking-tight">
            Built on trust, designed for smart living
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {items.map((it, i) => (
            <div
              key={it.title}
              className="group relative p-7 rounded-3xl glass shadow-card hover-lift animate-fade-in-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-hero flex items-center justify-center mb-5 shadow-glow group-hover:scale-110 transition-spring">
                <it.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-display font-bold text-xl mb-2">{it.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
