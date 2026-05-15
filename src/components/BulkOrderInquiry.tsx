import { useState } from "react";
import { Package } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { WhatsAppIcon } from "./icons/WhatsAppIcon";
import { buildWhatsAppLink, formatPrice, type Product } from "@/data/products";
import { toast } from "sonner";

const QTY_PRESETS = [10, 25, 50, 100, 250, 500];

export const BulkOrderInquiry = ({
  product,
  trigger,
}: {
  product: Product;
  trigger?: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  const [qty, setQty] = useState<number>(50);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [notes, setNotes] = useState("");

  const estimated = product.price * qty;
  const productLink =
    typeof window !== "undefined" ? `${window.location.origin}/product/${product.slug}` : "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || qty < 1) {
      toast.error("Please fill name, phone and quantity");
      return;
    }

    const message =
      `Hello MARTIFY, I would like to place a BULK ORDER inquiry.\n\n` +
      `*Product:* ${product.name}\n` +
      `*Category:* ${product.category}\n` +
      `*Unit Price:* ${formatPrice(product.price)}\n` +
      `*Quantity:* ${qty} units\n` +
      `*Estimated Value:* ${formatPrice(estimated)}\n` +
      `*Product Link:* ${productLink}\n\n` +
      `*Name:* ${name}\n` +
      (company ? `*Company:* ${company}\n` : "") +
      `*Phone:* ${phone}\n` +
      (city ? `*City:* ${city}\n` : "") +
      (notes ? `\n*Additional notes:*\n${notes}\n` : "") +
      `\nPlease share bulk pricing, MOQ, lead time and availability.`;

    window.open(buildWhatsAppLink(message), "_blank", "noopener,noreferrer");
    setOpen(false);
    toast.success("Opening WhatsApp with your bulk inquiry");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button variant="outline" size="xl" className="w-full">
            <Package /> Bulk Order Inquiry
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Bulk Order Inquiry</DialogTitle>
          <DialogDescription>
            Reselling or buying in bulk? Share your details and we'll send you the best
            wholesale price on WhatsApp.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-muted/50 rounded-xl p-3 flex items-center gap-3">
            <img src={product.image} alt={product.name} className="w-14 h-14 rounded-lg object-cover" />
            <div className="min-w-0">
              <div className="text-xs text-muted-foreground">{product.category}</div>
              <div className="font-semibold text-sm truncate">{product.name}</div>
              <div className="text-sm text-primary font-bold">{formatPrice(product.price)} / unit</div>
            </div>
          </div>

          <div>
            <Label className="mb-2 block">Quantity *</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {QTY_PRESETS.map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setQty(n)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-smooth ${
                    qty === n
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background border-border hover:border-primary"
                  }`}
                >
                  {n}+
                </button>
              ))}
            </div>
            <Input
              type="number"
              min={1}
              value={qty}
              onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
              placeholder="Enter quantity"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="bo-name">Your name *</Label>
              <Input id="bo-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" />
            </div>
            <div>
              <Label htmlFor="bo-phone">Phone *</Label>
              <Input id="bo-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 ..." />
            </div>
            <div>
              <Label htmlFor="bo-company">Company / Shop</Label>
              <Input id="bo-company" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Optional" />
            </div>
            <div>
              <Label htmlFor="bo-city">City</Label>
              <Input id="bo-city" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Optional" />
            </div>
          </div>

          <div>
            <Label htmlFor="bo-notes">Notes</Label>
            <Textarea
              id="bo-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Required date, customisation, GST, etc."
              rows={3}
            />
          </div>

          <div className="flex items-baseline justify-between bg-accent/40 rounded-xl p-3">
            <span className="text-sm font-medium">Estimated value</span>
            <span className="font-display font-bold text-lg text-primary">{formatPrice(estimated)}</span>
          </div>

          <DialogFooter className="gap-2 sm:gap-2">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="whatsapp" size="lg">
              <WhatsAppIcon className="w-4 h-4" /> Send on WhatsApp
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
