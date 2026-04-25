import { Link } from "react-router-dom";
import { ArrowRight, Heart, Leaf, Sparkles, Users } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { categories } from "@/data/products";
import lifestyle from "@/assets/hero-lifestyle.jpg";
import secondary from "@/assets/hero-secondary.jpg";

const About = () => {
  return (
    <>
      <Seo title="About — MARTIFY Super Mart" description="A small Surat-based supermarket on a mission to bring honest, premium products to every Indian home." />
      <PageHeader
        eyebrow="Our story"
        title="A neighbourhood supermarket, made for the modern home."
        description="MARTIFY started in 2019 with a simple idea — make it easy for families in Surat to find premium, trustworthy products without the noise of a typical mart."
        crumbs={[{ label: "About" }]}
      />

      {/* Story */}
      <section className="py-16 lg:py-24">
        <div className="container-page grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-6">
            <div className="text-sm font-semibold text-primary uppercase tracking-wider">The beginning</div>
            <h2 className="font-display font-bold text-3xl lg:text-5xl leading-tight">
              Built from a single shelf in Mota Varachha.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We opened our first counter with twelve products and a notebook. Customers asked for more — better skincare,
              honest kitchen tools, gifts that didn't feel cheap. So we listened, sourced, and grew. Six years later we're a
              500+ product supermarket trusted by families across Gujarat.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Every product on our shelf is picked by a real person on our team — not an algorithm.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src={lifestyle} alt="MARTIFY shop" className="rounded-3xl shadow-elev w-full h-72 object-cover" />
            <img src={secondary} alt="Family at MARTIFY" className="rounded-3xl shadow-elev w-full h-72 object-cover mt-12" />
          </div>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="py-16 lg:py-24 bg-gradient-soft">
        <div className="container-page grid md:grid-cols-2 gap-6">
          {[
            { i: Sparkles, t: "Our mission", d: "Bring honestly priced, premium products to every Indian home — without overwhelming choice." },
            { i: Leaf, t: "Our vision", d: "Become the most trusted modern supermarket experience for families across India, online and offline." },
          ].map((b) => (
            <div key={b.t} className="bg-card rounded-3xl p-8 lg:p-10 shadow-card">
              <div className="w-14 h-14 rounded-2xl bg-gradient-hero flex items-center justify-center mb-5 shadow-glow">
                <b.i className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-display font-bold text-2xl mb-3">{b.t}</h3>
              <p className="text-muted-foreground leading-relaxed">{b.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why customers trust us */}
      <section className="py-16 lg:py-24">
        <div className="container-page">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Why families trust us</div>
            <h2 className="font-display font-bold text-3xl lg:text-5xl">Six years. 10,000+ customers. One promise.</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { v: "10K+", l: "Happy customers" },
              { v: "500+", l: "Curated products" },
              { v: "4.9★", l: "Average rating" },
              { v: "<5min", l: "WhatsApp reply" },
            ].map((s) => (
              <div key={s.l} className="bg-card rounded-3xl p-8 text-center shadow-card hover-lift">
                <div className="font-display font-extrabold text-4xl lg:text-5xl text-primary">{s.v}</div>
                <div className="text-sm text-muted-foreground mt-2">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 lg:py-24 bg-gradient-soft">
        <div className="container-page">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <h2 className="font-display font-bold text-3xl lg:text-4xl">What we stock</h2>
            <Link to="/shop" className="text-primary text-sm font-medium">View shop →</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {categories.map((c) => (
              <Link key={c.slug} to={`/category/${c.slug}`} className="group relative h-48 rounded-3xl overflow-hidden shadow-card hover-lift">
                <img src={c.image} alt={c.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-deep/90 to-transparent" />
                <div className="absolute inset-0 p-5 flex items-end text-primary-foreground">
                  <div>
                    <div className="font-display font-bold text-lg">{c.name}</div>
                    <div className="text-xs opacity-70">{c.count} products</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 lg:py-24">
        <div className="container-page">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">The MARTIFY family</div>
            <h2 className="font-display font-bold text-3xl lg:text-5xl">Real people, on the floor and on WhatsApp.</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { n: "Hiren P.", r: "Founder" },
              { n: "Pooja S.", r: "Buyer & Curator" },
              { n: "Ravi K.", r: "Store Manager" },
              { n: "Anita M.", r: "Customer Care" },
            ].map((m, i) => (
              <div key={m.n} className="bg-card rounded-3xl p-6 text-center shadow-card animate-fade-in-up" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-hero flex items-center justify-center text-primary-foreground font-display font-bold text-xl mb-4">
                  {m.n.split(" ").map((p) => p[0]).join("")}
                </div>
                <div className="font-display font-bold">{m.n}</div>
                <div className="text-sm text-muted-foreground">{m.r}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container-page">
          <div className="rounded-3xl bg-gradient-hero p-10 lg:p-16 text-primary-foreground text-center shadow-glow">
            <Users className="w-10 h-10 mx-auto mb-4 opacity-80" />
            <h3 className="font-display font-bold text-3xl lg:text-5xl mb-3">Come visit our store.</h3>
            <p className="opacity-80 mb-6 max-w-xl mx-auto">Or just say hi on WhatsApp — we'd love to hear from you.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/contact"><Button variant="hero" size="xl" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">Get in touch <ArrowRight /></Button></Link>
              <Link to="/shop"><Button variant="outline" size="xl" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">Browse the shop</Button></Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
