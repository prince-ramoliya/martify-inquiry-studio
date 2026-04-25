import { ShoppingBag } from "lucide-react";

export const Logo = ({ variant = "default" }: { variant?: "default" | "light" }) => {
  const isLight = variant === "light";
  return (
    <a href="/" className="flex items-center gap-2 group">
      <div className="relative">
        <div className="w-10 h-10 rounded-xl bg-gradient-hero flex items-center justify-center shadow-glow group-hover:scale-105 transition-spring">
          <ShoppingBag className="w-5 h-5 text-primary-foreground" strokeWidth={2.5} />
        </div>
      </div>
      <div className="flex flex-col leading-none">
        <span className={`font-display font-extrabold text-xl tracking-tight ${isLight ? "text-primary-foreground" : "text-foreground"}`}>
          MARTIFY
        </span>
        <span className={`text-[10px] font-medium ${isLight ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
          Pick smart. Shop smart.
        </span>
      </div>
    </a>
  );
};
