import { Star } from "lucide-react";

const reviews = [
  {
    name: "Priya Sharma",
    role: "Surat",
    initials: "PS",
    rating: 5,
    text: "MARTIFY made shopping so easy. The WhatsApp inquiry feature is brilliant — got product details within minutes.",
  },
  {
    name: "Rahul Mehta",
    role: "Mumbai",
    initials: "RM",
    rating: 5,
    text: "Loved the curated collection. Premium quality at honest prices. The website looks stunning and works perfectly.",
  },
  {
    name: "Anjali Patel",
    role: "Ahmedabad",
    initials: "AP",
    rating: 5,
    text: "Best place for home & kitchen essentials. The team is super responsive and the products are exactly as shown.",
  },
];

export const Testimonials = () => {
  return (
    <section className="py-20 lg:py-28 bg-gradient-soft">
      <div className="container-page">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Customer Stories</div>
          <h2 className="font-display font-bold text-3xl lg:text-5xl tracking-tight">
            Loved by thousands of smart shoppers
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <article
              key={r.name}
              className="bg-card rounded-3xl p-7 shadow-card hover-lift animate-fade-in-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: r.rating }).map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-foreground/80 leading-relaxed mb-6">"{r.text}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="w-11 h-11 rounded-full bg-gradient-hero flex items-center justify-center text-primary-foreground font-display font-bold">
                  {r.initials}
                </div>
                <div>
                  <div className="font-display font-semibold">{r.name}</div>
                  <div className="text-sm text-muted-foreground">{r.role}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
