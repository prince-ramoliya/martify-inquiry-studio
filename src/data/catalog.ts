import beauty from "@/assets/cat-beauty.webp";
import kitchen from "@/assets/cat-kitchen.webp";
import decor from "@/assets/cat-decor.webp";
import stationary from "@/assets/cat-stationary.webp";
import electronics from "@/assets/cat-electronics.webp";
import toys from "@/assets/cat-toys.webp";

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

export const imageByCategory: Record<string, string> = {
  "beauty-care": beauty,
  "home-kitchen": kitchen,
  "home-decor": decor,
  "stationary": stationary,
  "electronics": electronics,
  "toys-sports": toys,
};