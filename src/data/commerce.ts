export const WHATSAPP_NUMBER = "919879177924";

export const formatPrice = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export function buildWhatsAppLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildProductInquiry(p: { name: string; category: string; price: number; slug: string }) {
  const link = `${typeof window !== "undefined" ? window.location.origin : ""}/product/${p.slug}`;
  return buildWhatsAppLink(
    `Hello MARTIFY, I am interested in this product:\n\nProduct Name: ${p.name}\nCategory: ${p.category}\nPrice: ${formatPrice(p.price)}\nProduct Link: ${link}\n\nPlease share more details.`
  );
}

export function buildCartInquiry(items: { name: string; qty: number; price: number }[]) {
  const lines = items.map((it, i) => `${i + 1}. ${it.name} × ${it.qty} — ${formatPrice(it.price * it.qty)}`).join("\n");
  const total = items.reduce((s, it) => s + it.price * it.qty, 0);
  return buildWhatsAppLink(
    `Hello MARTIFY, I am interested in these products:\n\n${lines}\n\nEstimated Total: ${formatPrice(total)}\n\nPlease share availability and details.`
  );
}