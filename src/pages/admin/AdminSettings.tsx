import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { useSiteSettings } from "@/hooks/useContent";
import { supabase } from "@/integrations/supabase/client";

const AdminSettings = () => {
  const settings = useSiteSettings();
  const [form, setForm] = useState<any>(null);

  useEffect(() => { if (settings && !form) setForm(settings); }, [settings, form]);

  if (!form) return <div className="text-muted-foreground">Loading…</div>;

  const save = async () => {
    const { error } = await supabase.from("site_settings").update(form).eq("id", 1);
    if (error) return toast.error(error.message);
    toast.success("Saved");
  };

  const f = (k: string) => ({ value: form[k] ?? "", onChange: (e: any) => setForm({ ...form, [k]: e.target.value }) });

  return (
    <div>
      <h1 className="font-display font-extrabold text-3xl mb-6">Site Settings</h1>
      <div className="space-y-6 max-w-2xl">
        <section className="bg-card rounded-2xl p-6 shadow-card space-y-4">
          <h2 className="font-display font-bold">Branding</h2>
          <ImageUploader value={form.logo_url} onChange={(url) => setForm({ ...form, logo_url: url })} folder="brand" label="Logo (transparent PNG/SVG)" />
          <div><Label>Brand name</Label><Input {...f("brand_name")} /></div>
        </section>
        <section className="bg-card rounded-2xl p-6 shadow-card space-y-4">
          <h2 className="font-display font-bold">Contact</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <div><Label>Phone</Label><Input {...f("contact_phone")} /></div>
            <div><Label>Email</Label><Input type="email" {...f("contact_email")} /></div>
          </div>
          <div><Label>WhatsApp number (digits with country code, e.g. 919879177924)</Label><Input {...f("whatsapp_number")} /></div>
          <div><Label>Address</Label><Textarea rows={3} {...f("address")} /></div>
        </section>
        <section className="bg-card rounded-2xl p-6 shadow-card space-y-4">
          <h2 className="font-display font-bold">Promo Banner</h2>
          <ImageUploader value={form.promo_banner_image} onChange={(url) => setForm({ ...form, promo_banner_image: url })} folder="promo" label="Promo image" />
          <div><Label>Title</Label><Input {...f("promo_banner_title")} /></div>
          <div><Label>Subtitle</Label><Input {...f("promo_banner_subtitle")} /></div>
          <div className="grid sm:grid-cols-2 gap-3">
            <div><Label>CTA label</Label><Input {...f("promo_banner_cta")} /></div>
            <div><Label>CTA link</Label><Input {...f("promo_banner_to")} /></div>
          </div>
        </section>
        <Button variant="hero" size="lg" onClick={save}>Save settings</Button>
      </div>
    </div>
  );
};
export default AdminSettings;
