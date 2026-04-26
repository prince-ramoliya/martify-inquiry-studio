import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { useCategories, type DbCategory } from "@/hooks/useContent";
import { supabase } from "@/integrations/supabase/client";

const slugify = (s: string) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const AdminCategories = () => {
  const { rows } = useCategories();
  const [open, setOpen] = useState<Partial<DbCategory> | null>(null);
  const isEdit = !!open?.id;

  const save = async () => {
    if (!open?.name) { toast.error("Name required"); return; }
    const payload: any = {
      name: open.name,
      slug: open.slug || slugify(open.name),
      image_url: open.image_url ?? null,
      description: open.description ?? "",
      position: open.position ?? rows.length,
      active: open.active ?? true,
    };
    const q = isEdit ? supabase.from("categories").update(payload).eq("id", open.id!) : supabase.from("categories").insert(payload);
    const { error } = await q;
    if (error) return toast.error(error.message);
    toast.success(isEdit ? "Updated" : "Added"); setOpen(null);
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this category? Products will be unlinked.")) return;
    const { error } = await supabase.from("categories").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display font-extrabold text-3xl">Categories</h1>
        <Button variant="hero" onClick={() => setOpen({ active: true, position: rows.length })}><Plus className="w-4 h-4" /> New category</Button>
      </div>
      <div className="grid gap-3">
        {rows.map((r) => (
          <div key={r.id} className="bg-card rounded-2xl p-4 shadow-card flex items-center gap-4">
            {r.image_url ? <img src={r.image_url} alt="" className="w-16 h-16 object-cover rounded-lg" /> : <div className="w-16 h-16 bg-muted rounded-lg" />}
            <div className="flex-1 min-w-0">
              <div className="font-display font-bold">{r.name}</div>
              <div className="text-xs text-muted-foreground">/{r.slug} · pos {r.position} · {r.active ? "Active" : "Hidden"}</div>
            </div>
            <Button variant="outline" size="sm" onClick={() => setOpen(r)}>Edit</Button>
            <Button variant="ghost" size="icon" onClick={() => remove(r.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
          </div>
        ))}
        {rows.length === 0 && <div className="text-muted-foreground text-sm">No categories yet.</div>}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto" onClick={() => setOpen(null)}>
          <div className="bg-card rounded-3xl p-6 w-full max-w-lg my-8" onClick={(e) => e.stopPropagation()}>
            <h2 className="font-display font-bold text-xl mb-4">{isEdit ? "Edit category" : "New category"}</h2>
            <div className="space-y-3">
              <ImageUploader value={open.image_url} onChange={(url) => setOpen({ ...open, image_url: url })} folder="categories" label="Category image" />
              <div><Label>Name</Label><Input value={open.name ?? ""} onChange={(e) => setOpen({ ...open, name: e.target.value, slug: open.slug || slugify(e.target.value) })} /></div>
              <div><Label>Slug</Label><Input value={open.slug ?? ""} onChange={(e) => setOpen({ ...open, slug: slugify(e.target.value) })} /></div>
              <div><Label>Description</Label><Textarea value={open.description ?? ""} onChange={(e) => setOpen({ ...open, description: e.target.value })} /></div>
              <div><Label>Position</Label><Input type="number" value={open.position ?? 0} onChange={(e) => setOpen({ ...open, position: Number(e.target.value) })} /></div>
              <div className="flex items-center gap-2"><Switch checked={!!open.active} onCheckedChange={(v) => setOpen({ ...open, active: v })} /><Label>Active</Label></div>
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
export default AdminCategories;
