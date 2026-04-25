import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/data/products";

export type CartItem = {
  id: string;
  slug: string;
  name: string;
  category: string;
  image: string;
  price: number;
  qty: number;
};

type CartState = {
  items: CartItem[];
  lastAddedId: string | null;
  addItem: (p: Product, qty?: number) => void;
  removeItem: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  totalCount: () => number;
  totalPrice: () => number;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      lastAddedId: null,
      addItem: (p, qty = 1) => {
        set((s) => {
          const existing = s.items.find((i) => i.id === p.id);
          const items = existing
            ? s.items.map((i) => (i.id === p.id ? { ...i, qty: i.qty + qty } : i))
            : [...s.items, { id: p.id, slug: p.slug, name: p.name, category: p.category, image: p.image, price: p.price, qty }];
          return { items, lastAddedId: p.id };
        });
        // clear pulse trigger
        setTimeout(() => set({ lastAddedId: null }), 900);
      },
      removeItem: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
      setQty: (id, qty) =>
        set((s) => ({
          items: qty <= 0 ? s.items.filter((i) => i.id !== id) : s.items.map((i) => (i.id === id ? { ...i, qty } : i)),
        })),
      clear: () => set({ items: [] }),
      totalCount: () => get().items.reduce((s, i) => s + i.qty, 0),
      totalPrice: () => get().items.reduce((s, i) => s + i.qty * i.price, 0),
    }),
    { name: "martify-cart" }
  )
);

type WishlistState = {
  ids: string[];
  toggle: (id: string) => void;
  has: (id: string) => boolean;
  remove: (id: string) => void;
};

export const useWishlist = create<WishlistState>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (id) =>
        set((s) => ({
          ids: s.ids.includes(id) ? s.ids.filter((x) => x !== id) : [...s.ids, id],
        })),
      has: (id) => get().ids.includes(id),
      remove: (id) => set((s) => ({ ids: s.ids.filter((x) => x !== id) })),
    }),
    { name: "martify-wishlist" }
  )
);
