import beauty from "@/assets/cat-beauty.jpg";
import kitchen from "@/assets/cat-kitchen.jpg";
import decor from "@/assets/cat-decor.jpg";
import stationary from "@/assets/cat-stationary.jpg";
import electronics from "@/assets/cat-electronics.jpg";
import toys from "@/assets/cat-toys.jpg";

export const WHATSAPP_NUMBER = "919879177924";

export const categories = [
  { slug: "beauty-care", name: "Beauty & Care", count: 124, image: beauty },
  { slug: "home-kitchen", name: "Home & Kitchen", count: 86, image: kitchen },
  { slug: "home-decor", name: "Home Decor", count: 64, image: decor },
  { slug: "stationary", name: "Stationary", count: 92, image: stationary },
  { slug: "electronics", name: "Electronics", count: 73, image: electronics },
  { slug: "toys-sports", name: "Toys & Sports", count: 58, image: toys },
];

export type Product = {
  id: string;
  name: string;
  category: string;
  categorySlug: string;
  image: string;
  price: string;
  badge?: string;
};

export const featuredProducts: Product[] = [
  { id: "1", name: "Wireless Pro Blender", category: "Home & Kitchen", categorySlug: "home-kitchen", image: kitchen, price: "₹2,499", badge: "New" },
  { id: "2", name: "Hydra Glow Serum", category: "Beauty & Care", categorySlug: "beauty-care", image: beauty, price: "₹899", badge: "Trending" },
  { id: "3", name: "Smart Bluetooth Speaker", category: "Electronics", categorySlug: "electronics", image: electronics, price: "₹3,299" },
  { id: "4", name: "Ceramic Vase Set", category: "Home Decor", categorySlug: "home-decor", image: decor, price: "₹1,199" },
  { id: "5", name: "Premium Notebook Bundle", category: "Stationary", categorySlug: "stationary", image: stationary, price: "₹649" },
  { id: "6", name: "Build & Play Block Kit", category: "Toys & Sports", categorySlug: "toys-sports", image: toys, price: "₹1,499", badge: "Hot" },
  { id: "7", name: "Stainless Steel Toaster", category: "Home & Kitchen", categorySlug: "home-kitchen", image: kitchen, price: "₹1,899" },
  { id: "8", name: "Studio Headphones", category: "Electronics", categorySlug: "electronics", image: electronics, price: "₹4,499", badge: "Premium" },
];

export function buildWhatsAppLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildProductInquiry(p: Product) {
  const link = `${typeof window !== "undefined" ? window.location.origin : ""}/product/${p.id}`;
  return buildWhatsAppLink(
    `Hello MARTIFY, I am interested in this product:\n\nProduct Name: ${p.name}\nCategory: ${p.category}\nProduct Link: ${link}\n\nPlease share more details.`
  );
}
