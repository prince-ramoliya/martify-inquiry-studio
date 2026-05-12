import { categories, imageByCategory } from "./catalog";

// Unique product imagery
import p1 from "@/assets/products/p1-blender.webp";
import p2 from "@/assets/products/p2-toaster.webp";
import p3 from "@/assets/products/p3-kettle.webp";
import p4 from "@/assets/products/p4-airfryer.webp";
import p5 from "@/assets/products/p5-mixer.webp";
import p6 from "@/assets/products/p6-induction.webp";
import p7 from "@/assets/products/p7-jars.webp";
import p8 from "@/assets/products/p8-tawa.webp";
import p9 from "@/assets/products/p9-serum.webp";
import p10 from "@/assets/products/p10-cream.webp";
import p11 from "@/assets/products/p11-aloe.webp";
import p12 from "@/assets/products/p12-haircare.webp";
import p13 from "@/assets/products/p13-sunscreen.webp";
import p14 from "@/assets/products/p14-lipbalm.webp";
import p15 from "@/assets/products/p15-hairdryer.webp";
import p16 from "@/assets/products/p16-facewash.webp";
import p17 from "@/assets/products/p17-speaker.webp";
import p18 from "@/assets/products/p18-headphones.webp";
import p19 from "@/assets/products/p19-earbuds.webp";
import p20 from "@/assets/products/p20-powerbank.webp";
import p21 from "@/assets/products/p21-bulb.webp";
import p22 from "@/assets/products/p22-charger.webp";
import p23 from "@/assets/products/p23-vase.webp";
import p24 from "@/assets/products/p24-clock.webp";
import p25 from "@/assets/products/p25-candle.webp";
import p26 from "@/assets/products/p26-cushion.webp";
import p27 from "@/assets/products/p27-lamp.webp";
import p28 from "@/assets/products/p28-frame.webp";
import p29 from "@/assets/products/p29-notebook.webp";
import p30 from "@/assets/products/p30-pens.webp";
import p31 from "@/assets/products/p31-organizer.webp";
import p32 from "@/assets/products/p32-stickynotes.webp";
import p33 from "@/assets/products/p33-sketchbook.webp";
import p34 from "@/assets/products/p34-blocks.webp";
import p35 from "@/assets/products/p35-football.webp";
import p36 from "@/assets/products/p36-bear.webp";
import p37 from "@/assets/products/p37-badminton.webp";
import p38 from "@/assets/products/p38-yogamat.webp";

const productImages: Record<string, string> = {
  p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15, p16,
  p17, p18, p19, p20, p21, p22, p23, p24, p25, p26, p27, p28, p29, p30,
  p31, p32, p33, p34, p35, p36, p37, p38,
};

const deterministicReviews = (id: string) => 42 + Number(id.replace(/\D/g, "")) * 7;

export { categories, type Category } from "./catalog";
export { WHATSAPP_NUMBER, buildCartInquiry, buildProductInquiry, buildWhatsAppLink, formatPrice } from "./commerce";

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
    image: productImages[id] ?? imageByCategory[catSlug],
    price,
    mrp: opts.mrp ?? Math.round(price * 1.25),
    rating: opts.rating ?? 4.5,
    reviewCount: opts.reviewCount ?? deterministicReviews(id),
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
