import { Link, useLocation } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";

const policies = [
  {
    title: "Ordering",
    body: "MARTIFY is inquiry-based. Add products to your cart or wishlist, send the list on WhatsApp, and our team confirms current availability, pricing, pickup, and delivery details before you pay.",
  },
  {
    title: "Payments",
    body: "There is no online checkout on this website right now. Payment is arranged only after the order details are confirmed with our team.",
  },
  {
    title: "Delivery & pickup",
    body: "Pickup is available from our store. Local delivery and courier options are discussed on WhatsApp based on product size, availability, and destination.",
  },
  {
    title: "Returns & exchanges",
    body: "Unused, unopened products may be eligible for return or exchange within 7 days. Damaged items should be reported within 48 hours with photos so our team can help quickly.",
  },
  {
    title: "Privacy",
    body: "We only use the information you share to respond to inquiries, confirm orders, and provide support. We do not sell your personal information.",
  },
  {
    title: "Terms",
    body: "Product images, availability, prices, and offers are for browsing and inquiry purposes and can change before final confirmation.",
  },
];

const Policies = () => {
  const { pathname } = useLocation();
  const pageTitle = pathname === "/privacy" ? "Privacy Policy" : pathname === "/terms" ? "Terms & Conditions" : "Store Policies";

  return (
    <>
      <Seo title={`${pageTitle} — MARTIFY`} description="MARTIFY store policies for ordering, payments, delivery, returns, privacy, and terms." />
      <PageHeader
        eyebrow="Policies"
        title={pageTitle}
        description="Clear, simple policies for browsing, inquiries, pickup, delivery, returns, privacy, and terms."
        crumbs={[{ label: pageTitle }]}
      />

      <section className="py-12 lg:py-16">
        <div className="container-page max-w-4xl">
          <div className="grid gap-4">
            {policies.map((policy) => (
              <article key={policy.title} className="bg-card rounded-3xl p-6 shadow-card">
                <h2 className="font-display font-bold text-xl mb-2">{policy.title}</h2>
                <p className="text-muted-foreground leading-relaxed">{policy.body}</p>
              </article>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/shop">
              <Button variant="hero" size="lg">Continue shopping</Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg">Contact us</Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Policies;