import { useState } from "react";
import { Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type Props = { value?: string | null; onChange: (url: string) => void; folder?: string; label?: string };

export const ImageUploader = ({ value, onChange, folder = "uploads", label = "Image" }: Props) => {
  const [busy, setBusy] = useState(false);

  const upload = async (file: File) => {
    setBusy(true);
    try {
      const ext = file.name.split(".").pop() || "jpg";
      const path = `${folder}/${crypto.randomUUID()}.${ext}`;
      const { error } = await supabase.storage.from("media").upload(path, file, { cacheControl: "31536000", upsert: false });
      if (error) throw error;
      const { data: pub } = supabase.storage.from("media").getPublicUrl(path);
      onChange(pub.publicUrl);
      toast.success("Image uploaded");
    } catch (e: any) {
      toast.error(e?.message ?? "Upload failed");
    } finally { setBusy(false); }
  };

  return (
    <div>
      <div className="text-sm font-medium mb-2">{label}</div>
      <div className="flex items-center gap-3">
        {value ? (
          <img src={value} alt="" className="w-20 h-20 object-cover rounded-lg border border-border" />
        ) : (
          <div className="w-20 h-20 rounded-lg bg-muted border border-dashed border-border flex items-center justify-center text-muted-foreground text-xs">No image</div>
        )}
        <label className="cursor-pointer">
          <input type="file" accept="image/*" className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) upload(f); }} />
          <Button asChild variant="outline" size="sm" disabled={busy}>
            <span><Upload className="w-4 h-4" /> {busy ? "Uploading…" : value ? "Replace" : "Upload"}</span>
          </Button>
        </label>
      </div>
    </div>
  );
};
