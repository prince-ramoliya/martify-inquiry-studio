import { useMemo, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { useCategories, useProducts, type DbProduct } from "@/hooks/useContent";
import { supabase } from "@/integrations/supabase/client";

const slugify = (s: string) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const AdminProducts = () => {
  const { rows } = useProducts();
  const { rows: cats } = useCategories();
  const [open, setOpen] = useState<Partial<DbProduct> | null>(null);
  const [filter, setFilter] = useState("");
  const isEdit = !!open?.id;

  const filtered = useMemo(() => rows.filter((r) => r.name.toLowerCase().includes(filter.toLowerCase())), [rows, filter]);

  const save = async () => {
    if (!open?.name || !open?.image_url) { toast.error("Name and image required"); return; }
    const payload: any = {
      name: open.name,
      slug: open.slug || slugify(open.name),
      category_id: open.category_id ?? null,
      short_description: open.short_description ?? "",
      description: open.description ?? "",
      price: Number(open.price ?? 0),
      mrp: open.mrp ? Number(open.mrp) : null,
      image_url: open.image_url,
      gallery: open.gallery ?? [],
      features: typeof open.features === "string" ? (open.features as any).split("\n").filter(Boolean) : (open.features ?? []),
      specs: open.specs ?? [],
      badge: open.badge || null,
      rating: Number(open.rating ?? 4.8),
      review_count: Number(open.review_count ?? 0),
      in_stock: open.in_stock ?? true,
      featured: open.featured ?? false,
      position: open.position ?? rows.length,
      active: open.active ?? true,
    };
    const q = isEdit ? supabase.from("products").update(payload).eq("id", open.id!) : supabase.from("products").insert(payload);
    const { error } = await q;
    if (error) return toast.error(error.message);
    toast.success(isEdit ? "Updated" : "Added"); setOpen(null);
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
  };

  const featuresText = Array.isArray(open?.features) ? (open!.features as string[]).join("\n") : ((open?.features as any) ?? "");
  const specsText = Array.isArray(open?.specs) ? (open!.specs as any[]).map((s) => `${s.label}: ${s.value}`).join("\n") : "";

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <h1 className="font-display font-extrabold text-3xl">Products</h1>
        <div className="flex gap-2">
          <Input placeholder="Search…" value={filter} onChange={(e) => setFilter(e.target.value)} className="w-48" />
          <Button variant="hero" onClick={() => setOpen({ active: true, in_stock: true, rating: 4.8, position: rows.length })}><Plus className="w-4 h-4" /> New</Button>
        </div>
      </div>

      <div className="grid gap-3">
        {filtered.map((r) => {
          const cat = cats.find((c) => c.id === r.category_id);
          return (
            <div key={r.id} className="bg-card rounded-2xl p-4 shadow-card flex items-center gap-4">
              <img src={r.image_url} alt="" className="w-16 h-16 object-cover rounded-lg" />
              <div className="flex-1 min-w-0">
                <div className="font-display font-bold truncate">{r.name}</div>
                <div className="text-xs text-muted-foreground truncate">{cat?.name ?? "—"} · ₹{r.price} {r.featured && "· Featured"} {!r.active && "· Hidden"}</div>
              </div>
              <Button variant="outline" size="sm" onClick={() => setOpen(r)}>Edit</Button>
              <Button variant="ghost" size="icon" onClick={() => remove(r.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
            </div>
          );
        })}
        {filtered.length === 0 && <div className="text-muted-foreground text-sm">No products yet.</div>}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm flex items-start justify-center p-4 overflow-y-auto" onClick={() => setOpen(null)}>
          <div className="bg-card rounded-3xl p-6 w-full max-w-2xl my-8" onClick={(e) => e.stopPropagation()}>
            <h2 className="font-display font-bold text-xl mb-4">{isEdit ? "Edit product" : "New product"}</h2>
            <div className="space-y-3">
              <ImageUploader value={open.image_url} onChange={(url) => setOpen({ ...open, image_url: url })} folder="products" label="Main image" />
              <div className="grid sm:grid-cols-2 gap-3">
                <div><Label>Name</Label><Input value={open.name ?? ""} onChange={(e) => setOpen({ ...open, name: e.target.value, slug: open.slug || slugify(e.target.value) })} /></div>
                <div><Label>Slug</Label><Input value={open.slug ?? ""} onChange={(e) => setOpen({ ...open, slug: slugify(e.target.value) })} /></div>
              </div>
              <div className="grid sm:grid-cols-3 gap-3">
                <div>
                  <Label>Category</Label>
                  <Select value={open.category_id ?? "none"} onValueChange={(v) => setOpen({ ...open, category_id: v === "none" ? null : v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">— none —</SelectItem>
                      {cats.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div><Label>Price (₹)</Label><Input type="number" value={open.price ?? 0} onChange={(e) => setOpen({ ...open, price: Number(e.target.value) })} /></div>
                <div><Label>MRP (₹)</Label><Input type="number" value={open.mrp ?? ""} onChange={(e) => setOpen({ ...open, mrp: e.target.value ? Number(e.target.value) : null })} /></div>
              </div>
              <div><Label>Short description</Label><Input value={open.short_description ?? ""} onChange={(e) => setOpen({ ...open, short_description: e.target.value })} /></div>
              <div><Label>Description</Label><Textarea rows={4} value={open.description ?? ""} onChange={(e) => setOpen({ ...open, description: e.target.value })} /></div>
              <div>
                <Label>Features (one per line)</Label>
                <Textarea rows={4} value={featuresText} onChange={(e) => setOpen({ ...open, features: e.target.value.split("\n").filter(Boolean) as any })} />
              </div>
              <div>
                <Label>Specs (one per line, "Label: Value")</Label>
                <Textarea rows={4} value={specsText} onChange={(e) => {
                  const specs = e.target.value.split("\n").filter(Boolean).map((line) => {
                    const [label, ...rest] = line.split(":"); return { label: label.trim(), value: rest.join(":").trim() };
                  });
                  setOpen({ ...open, specs: specs as any });
                }} />
              </div>
              <div className="grid sm:grid-cols-3 gap-3">
                <div><Label>Badge</Label><Input value={open.badge ?? ""} onChange={(e) => setOpen({ ...open, badge: e.target.value })} placeholder="New / Hot" /></div>
                <div><Label>Rating</Label><Input type="number" step="0.1" max="5" value={open.rating ?? 4.8} onChange={(e) => setOpen({ ...open, rating: Number(e.target.value) })} /></div>
                <div><Label>Position</Label><Input type="number" value={open.position ?? 0} onChange={(e) => setOpen({ ...open, position: Number(e.target.value) })} /></div>
              </div>
              <div className="flex flex-wrap gap-4 pt-2">
                <label className="flex items-center gap-2"><Switch checked={!!open.active} onCheckedChange={(v) => setOpen({ ...open, active: v })} /> Active</label>
                <label className="flex items-center gap-2"><Switch checked={!!open.featured} onCheckedChange={(v) => setOpen({ ...open, featured: v })} /> Featured</label>
                <label className="flex items-center gap-2"><Switch checked={open.in_stock !== false} onCheckedChange={(v) => setOpen({ ...open, in_stock: v })} /> In stock</label>
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <Button variant="outline" className="flex-1" onClick={() => setOpen(null)}>Cancel</Button>
              <Button variant="hero" className="flex-1" onClick={save}>Save</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default AdminProducts;
