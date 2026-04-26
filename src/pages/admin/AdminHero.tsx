import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { useHeroSlides, type DbHeroSlide } from "@/hooks/useContent";
import { supabase } from "@/integrations/supabase/client";

const empty = (pos: number): Partial<DbHeroSlide> => ({
  eyebrow: "", title: "", italic: "", description: "", cta_label: "Shop now", cta_to: "/shop",
  image_url: "", accent: "", position: pos, active: true,
});

const AdminHero = () => {
  const { rows } = useHeroSlides();
  const [draft, setDraft] = useState<Partial<DbHeroSlide> | null>(null);
  const [editing, setEditing] = useState<DbHeroSlide | null>(null);

  const open = editing ?? draft;
  const startNew = () => { setDraft(empty(rows.length)); setEditing(null); };
  const close = () => { setDraft(null); setEditing(null); };

  const save = async () => {
    if (!open) return;
    if (!open.title || !open.image_url) { toast.error("Title and image are required"); return; }
    if (editing) {
      const { error } = await supabase.from("hero_slides").update(open as any).eq("id", editing.id);
      if (error) return toast.error(error.message);
      toast.success("Updated");
    } else {
      const { error } = await supabase.from("hero_slides").insert(open as any);
      if (error) return toast.error(error.message);
      toast.success("Added");
    }
    close();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this slide?")) return;
    const { error } = await supabase.from("hero_slides").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display font-extrabold text-3xl">Hero Banners</h1>
        <Button variant="hero" onClick={startNew}><Plus className="w-4 h-4" /> New slide</Button>
      </div>

      <div className="grid gap-4">
        {rows.map((r) => (
          <div key={r.id} className="bg-card rounded-2xl p-4 shadow-card flex items-center gap-4">
            <img src={r.image_url} alt="" className="w-24 h-16 object-cover rounded-lg" />
            <div className="flex-1 min-w-0">
              <div className="text-xs text-muted-foreground">{r.eyebrow}</div>
              <div className="font-display font-bold truncate">{r.title} <span className="italic font-normal">{r.italic}</span></div>
              <div className="text-xs text-muted-foreground">Position {r.position} · {r.active ? "Active" : "Hidden"}</div>
            </div>
            <Button variant="outline" size="sm" onClick={() => { setEditing(r); setDraft(null); }}>Edit</Button>
            <Button variant="ghost" size="icon" onClick={() => remove(r.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
          </div>
        ))}
        {rows.length === 0 && <div className="text-muted-foreground text-sm">No slides yet — click "New slide".</div>}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto" onClick={close}>
          <div className="bg-card rounded-3xl p-6 w-full max-w-xl my-8" onClick={(e) => e.stopPropagation()}>
            <h2 className="font-display font-bold text-xl mb-4">{editing ? "Edit slide" : "New slide"}</h2>
            <div className="space-y-3">
              <ImageUploader value={open.image_url} onChange={(url) => (editing ? setEditing({ ...editing, image_url: url }) : setDraft({ ...open, image_url: url }))} folder="hero" label="Banner image" />
              <Field label="Eyebrow" value={open.eyebrow ?? ""} onChange={(v) => set(open, editing, setEditing, setDraft, "eyebrow", v)} />
              <Field label="Title (line 1)" value={open.title ?? ""} onChange={(v) => set(open, editing, setEditing, setDraft, "title", v)} />
              <Field label="Italic (line 2)" value={open.italic ?? ""} onChange={(v) => set(open, editing, setEditing, setDraft, "italic", v)} />
              <div>
                <Label>Description</Label>
                <Textarea value={open.description ?? ""} onChange={(e) => set(open, editing, setEditing, setDraft, "description", e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="CTA label" value={open.cta_label ?? ""} onChange={(v) => set(open, editing, setEditing, setDraft, "cta_label", v)} />
                <Field label="CTA link" value={open.cta_to ?? ""} onChange={(v) => set(open, editing, setEditing, setDraft, "cta_to", v)} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Accent chip" value={open.accent ?? ""} onChange={(v) => set(open, editing, setEditing, setDraft, "accent", v)} />
                <Field label="Position" type="number" value={String(open.position ?? 0)} onChange={(v) => set(open, editing, setEditing, setDraft, "position", Number(v))} />
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={!!open.active} onCheckedChange={(v) => set(open, editing, setEditing, setDraft, "active", v)} />
                <Label>Active (visible on site)</Label>
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <Button variant="outline" className="flex-1" onClick={close}>Cancel</Button>
              <Button variant="hero" className="flex-1" onClick={save}>Save</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

function Field({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <div>
      <Label>{label}</Label>
      <Input type={type} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}
function set(open: any, editing: any, setEditing: any, setDraft: any, k: string, v: any) {
  if (editing) setEditing({ ...editing, [k]: v });
  else setDraft({ ...open, [k]: v });
}

export default AdminHero;
