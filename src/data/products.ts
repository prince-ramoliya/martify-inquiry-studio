import beauty from "@/assets/cat-beauty.jpg";
import kitchen from "@/assets/cat-kitchen.jpg";
import decor from "@/assets/cat-decor.jpg";
import stationary from "@/assets/cat-stationary.jpg";
import electronics from "@/assets/cat-electronics.jpg";
import toys from "@/assets/cat-toys.jpg";

export const WHATSAPP_NUMBER = "919879177924";

export type Category = {
  slug: string;
  name: string;
  count: number;
  image: string;
  tagline: string;
  description: string;
};

export const categories: Category[] = [
  { slug: "beauty-care", name: "Beauty & Care", count: 124, image: beauty, tagline: "Glow, every day", description: "Skincare, haircare and personal care essentials curated for every routine." },
  { slug: "home-kitchen", name: "Home & Kitchen", count: 86, image: kitchen, tagline: "Cook smarter", description: "Premium appliances and kitchenware that make everyday cooking effortless." },
  { slug: "home-decor", name: "Home Decor", count: 64, image: decor, tagline: "Spaces that feel like you", description: "Vases, lighting and accents to refresh every corner of your home." },
  { slug: "stationary", name: "Stationary", count: 92, image: stationary, tagline: "Write your story", description: "Notebooks, pens and desk essentials for work, study and creativity." },
  { slug: "electronics", name: "Electronics", count: 73, image: electronics, tagline: "Tech, refined", description: "Speakers, headphones and gadgets that fit seamlessly into your life." },
  { slug: "toys-sports", name: "Toys & Sports", count: 58, image: toys, tagline: "Play more, smile more", description: "Toys, games and sports gear for kids and the young at heart." },
];

const imageByCategory: Record<string, string> = {
  "beauty-care": beauty,
  "home-kitchen": kitchen,
  "home-decor": decor,
  "stationary": stationary,
  "electronics": electronics,
  "toys-sports": toys,
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  image: string;
  price: number;
  mrp?: number;
  badge?: string;
  shortDescription: string;
  description: string;
  features: string[];
  specs: { label: string; value: string }[];
  rating: number;
  reviewCount: number;
  isFeatured?: boolean;
  isNew?: boolean;
};

const make = (
  id: string,
  name: string,
  catSlug: string,
  price: number,
  opts: Partial<Product> = {}
): Product => {
  const cat = categories.find((c) => c.slug === catSlug)!;
  return {
    id,
    slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
    name,
    category: cat.name,
    categorySlug: catSlug,
    image: imageByCategory[catSlug],
    price,
    mrp: opts.mrp ?? Math.round(price * 1.25),
    rating: opts.rating ?? 4.5,
    reviewCount: opts.reviewCount ?? Math.floor(Math.random() * 200) + 30,
    shortDescription: opts.shortDescription ?? `Premium ${cat.name.toLowerCase()} pick — quality you can feel.`,
    description:
      opts.description ??
      `Discover the ${name}, thoughtfully crafted for everyday excellence. Combining premium materials, modern design and trusted performance, it earns a place in your home from day one.`,
    features: opts.features ?? [
      "Premium build quality",
      "Modern minimal design",
      "Built to last",
      "Easy to use & clean",
    ],
    specs: opts.specs ?? [
      { label: "Brand", value: "MARTIFY Select" },
      { label: "Warranty", value: "1 Year" },
      { label: "Origin", value: "India" },
      { label: "Material", value: "Premium grade" },
    ],
    ...opts,
  };
};

export const products: Product[] = [
  // Home & Kitchen
  make("p1", "Wireless Pro Blender", "home-kitchen", 2499, { badge: "New", isNew: true, isFeatured: true, rating: 4.7 }),
  make("p2", "Stainless Steel Toaster", "home-kitchen", 1899, { isFeatured: true, rating: 4.6 }),
  make("p3", "Electric Kettle 1.7L", "home-kitchen", 1299, { rating: 4.8 }),
  make("p4", "Air Fryer Compact", "home-kitchen", 4999, { badge: "Hot", rating: 4.6 }),
  make("p5", "Hand Mixer Pro", "home-kitchen", 1599, { rating: 4.4 }),
  make("p6", "Induction Cooktop", "home-kitchen", 2799, { rating: 4.5 }),
  make("p7", "Glass Jar Set (6 pc)", "home-kitchen", 899),
  make("p8", "Non-Stick Tawa", "home-kitchen", 749),

  // Beauty & Care
  make("p9", "Hydra Glow Serum", "beauty-care", 899, { badge: "Trending", isFeatured: true, rating: 4.8 }),
  make("p10", "Vitamin C Face Cream", "beauty-care", 749, { rating: 4.7 }),
  make("p11", "Aloe Vera Gel 200ml", "beauty-care", 299, { rating: 4.6 }),
  make("p12", "Hair Care Combo", "beauty-care", 1199, { isFeatured: true, rating: 4.5 }),
  make("p13", "Sunscreen SPF 50", "beauty-care", 549),
  make("p14", "Lip Care Balm Pack", "beauty-care", 199),
  make("p15", "Hair Dryer 2000W", "beauty-care", 1899, { rating: 4.4 }),
  make("p16", "Face Wash Duo", "beauty-care", 449),

  // Electronics
  make("p17", "Smart Bluetooth Speaker", "electronics", 3299, { isFeatured: true, rating: 4.7 }),
  make("p18", "Studio Headphones", "electronics", 4499, { badge: "Premium", isFeatured: true, rating: 4.8 }),
  make("p19", "Wireless Earbuds Pro", "electronics", 2199, { isNew: true, rating: 4.6 }),
  make("p20", "Power Bank 20000mAh", "electronics", 1599),
  make("p21", "Smart LED Bulb Pack", "electronics", 899),
  make("p22", "USB-C Fast Charger", "electronics", 599),

  // Home Decor
  make("p23", "Ceramic Vase Set", "home-decor", 1199, { isFeatured: true, rating: 4.6 }),
  make("p24", "Wall Clock Minimal", "home-decor", 799),
  make("p25", "Scented Candle Trio", "home-decor", 649, { isNew: true }),
  make("p26", "Decorative Cushion (Set of 2)", "home-decor", 999),
  make("p27", "Table Lamp Modern", "home-decor", 1499),
  make("p28", "Photo Frame Collection", "home-decor", 749),

  // Stationary
  make("p29", "Premium Notebook Bundle", "stationary", 649, { isFeatured: true, rating: 4.7 }),
  make("p30", "Gel Pen Set (12 pc)", "stationary", 299),
  make("p31", "Desk Organizer", "stationary", 899),
  make("p32", "Sticky Notes Combo", "stationary", 199),
  make("p33", "A4 Sketch Book", "stationary", 349),

  // Toys & Sports
  make("p34", "Build & Play Block Kit", "toys-sports", 1499, { badge: "Hot", isFeatured: true, rating: 4.8 }),
  make("p35", "Football Match Pro", "toys-sports", 899, { rating: 4.5 }),
  make("p36", "Plush Bear 30cm", "toys-sports", 599),
  make("p37", "Badminton Racket Set", "toys-sports", 1299),
  make("p38", "Yoga Mat 6mm", "toys-sports", 799, { isNew: true }),
];

export const featuredProducts = products.filter((p) => p.isFeatured);
export const newArrivals = products.filter((p) => p.isNew);

export function getProduct(idOrSlug: string) {
  return products.find((p) => p.id === idOrSlug || p.slug === idOrSlug);
}

export function productsByCategory(slug: string) {
  return products.filter((p) => p.categorySlug === slug);
}

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export const formatPrice = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export function buildWhatsAppLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildProductInquiry(p: Product) {
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
