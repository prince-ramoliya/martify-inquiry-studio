import { useState } from "react";
import { Clock, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/PageHeader";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { buildWhatsAppLink } from "@/data/products";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hello MARTIFY, I'm ${form.name}.\n\n${form.message}\n\nReach me at: ${form.phone || form.email}`;
    window.open(buildWhatsAppLink(msg), "_blank");
    toast.success("Opening WhatsApp...", { description: "We'll continue the chat there." });
  };

  return (
    <>
      <Seo title="Contact — MARTIFY Super Mart" description="Get in touch with MARTIFY Super Mart in Surat. Phone, WhatsApp, email and store address." />
      <PageHeader
        eyebrow="Say hello"
        title="We're a WhatsApp message away."
        description="Drop us a note, send a quick WhatsApp, or come visit our store in Mota Varachha, Surat."
        crumbs={[{ label: "Contact" }]}
      />

      {/* Contact info cards */}
      <section className="py-12 lg:py-16">
        <div className="container-page">
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { i: MessageCircle, t: "WhatsApp", v: "+91 98791 77924", a: "Chat now", href: buildWhatsAppLink("Hello MARTIFY!") },
              { i: Phone, t: "Call us", v: "+91 98791 77924", a: "Tap to call", href: "tel:+919879177924" },
              { i: Mail, t: "Email", v: "martifyforsale@gmail.com", a: "Send email", href: "mailto:martifyforsale@gmail.com" },
            ].map((c) => (
              <a key={c.t} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                className="group bg-card rounded-3xl p-7 shadow-card hover-lift">
                <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center mb-4 group-hover:bg-gradient-hero group-hover:text-primary-foreground transition-smooth">
                  <c.i className="w-5 h-5 text-primary group-hover:text-primary-foreground" />
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{c.t}</div>
                <div className="font-display font-bold text-base mt-1 break-words">{c.v}</div>
                <div className="text-sm text-primary mt-2 font-medium">{c.a} →</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Form + map */}
      <section className="py-12 lg:py-20 bg-gradient-soft">
        <div className="container-page grid lg:grid-cols-2 gap-10">
          <div className="bg-card rounded-3xl p-8 lg:p-10 shadow-elev">
            <h2 className="font-display font-bold text-2xl lg:text-3xl mb-2">Send us a message</h2>
            <p className="text-sm text-muted-foreground mb-6">We'll continue the conversation on WhatsApp.</p>
            <form onSubmit={submit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" className="h-12 px-4 bg-muted rounded-2xl text-sm outline-none focus:bg-background border border-transparent focus:border-primary" />
                <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone (optional)" className="h-12 px-4 bg-muted rounded-2xl text-sm outline-none focus:bg-background border border-transparent focus:border-primary" />
              </div>
              <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" className="w-full h-12 px-4 bg-muted rounded-2xl text-sm outline-none focus:bg-background border border-transparent focus:border-primary" />
              <textarea required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={5} placeholder="How can we help?" className="w-full px-4 py-3 bg-muted rounded-2xl text-sm outline-none focus:bg-background border border-transparent focus:border-primary resize-none" />
              <Button type="submit" variant="hero" size="lg" className="w-full">
                <Send /> Send message
              </Button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="bg-card rounded-3xl overflow-hidden shadow-elev">
              <iframe
                title="MARTIFY location"
                src="https://www.google.com/maps?q=Mota+Varachha+Surat&output=embed"
                className="w-full h-72 border-0"
                loading="lazy"
              />
              <div className="p-6">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <div className="font-display font-bold">Visit our store</div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Mahalakshmi campus, opp. Vishvambhar arcade,<br />
                      Gajera compound, Mota Varachha,<br />
                      Surat 394105
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-3xl p-6 shadow-card flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="font-display font-bold">Store hours</div>
                <div className="text-sm text-muted-foreground">Mon – Sat · 10:00 AM – 9:00 PM · Sun closed</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Big WhatsApp CTA */}
      <section className="py-16">
        <div className="container-page">
          <div className="rounded-3xl bg-gradient-dark p-10 lg:p-14 text-primary-foreground flex flex-col md:flex-row items-center justify-between gap-6 shadow-elev">
            <div>
              <h3 className="font-display font-bold text-2xl lg:text-4xl">Prefer WhatsApp? We do too.</h3>
              <p className="opacity-70 mt-2">Most replies under 5 minutes during shop hours.</p>
            </div>
            <a href={buildWhatsAppLink("Hello MARTIFY!")} target="_blank" rel="noopener noreferrer">
              <Button variant="whatsapp" size="xl"><MessageCircle /> Open WhatsApp</Button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
