import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

// ===== Types matching DB =====
export type DbHeroSlide = {
  id: string; eyebrow: string; title: string; italic: string; description: string;
  cta_label: string; cta_to: string; image_url: string; accent: string; position: number; active: boolean;
};
export type DbCategory = {
  id: string; name: string; slug: string; image_url: string | null; description: string | null;
  position: number; active: boolean;
};
export type DbProduct = {
  id: string; slug: string; name: string; category_id: string | null;
  short_description: string; description: string; price: number; mrp: number | null;
  image_url: string; gallery: string[]; features: string[];
  specs: { label: string; value: string }[]; badge: string | null; rating: number;
  review_count: number; in_stock: boolean; featured: boolean; position: number; active: boolean;
};
export type DbSettings = {
  logo_url: string | null; brand_name: string;
  contact_phone: string; contact_email: string; whatsapp_number: string; address: string;
  promo_banner_image: string | null; promo_banner_title: string;
  promo_banner_subtitle: string; promo_banner_cta: string; promo_banner_to: string;
};

function useRealtimeTable<T>(table: string, order: string, opts?: { activeOnly?: boolean; realtime?: boolean }) {
  const [rows, setRows] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const activeOnly = opts?.activeOnly ?? false;
  const realtime = opts?.realtime ?? true;

  const fetchRows = useCallback(async () => {
    let q: any = (supabase as any).from(table).select("*").order(order, { ascending: true });
    if (activeOnly) q = q.eq("active", true);
    return q;
  }, [table, order, activeOnly]);

  useEffect(() => {
    let mounted = true;
    const fetch = async () => {
      const { data } = await fetchRows();
      if (mounted) { setRows((data ?? []) as T[]); setLoading(false); }
    };
    fetch();
    if (!realtime) return () => { mounted = false; };
    const ch = supabase.channel(`rt:${table}:${Math.random().toString(36).slice(2)}`);
    ch.on("postgres_changes", { event: "*", schema: "public", table }, () => fetch())
      .subscribe();
    return () => { mounted = false; supabase.removeChannel(ch); };
  }, [fetchRows, realtime, table]);

  return { rows, loading };
}

export const useHeroSlides = (activeOnly = false, realtime = true) =>
  useRealtimeTable<DbHeroSlide>("hero_slides", "position", { activeOnly, realtime });
export const useCategories = (activeOnly = false, realtime = true) =>
  useRealtimeTable<DbCategory>("categories", "position", { activeOnly, realtime });
export const useProducts = (activeOnly = false, realtime = true) =>
  useRealtimeTable<DbProduct>("products", "position", { activeOnly, realtime });

export function useSiteSettings() {
  const [settings, setSettings] = useState<DbSettings | null>(null);
  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from("site_settings").select("*").eq("id", 1).maybeSingle();
      if (data) setSettings(data as DbSettings);
    };
    fetch();
    const ch = supabase.channel(`rt:site_settings:${Math.random().toString(36).slice(2)}`);
    ch.on("postgres_changes", { event: "*", schema: "public", table: "site_settings" }, () => fetch())
      .subscribe();
    return () => { supabase.removeChannel(ch); };
  }, []);
  return settings;
}
