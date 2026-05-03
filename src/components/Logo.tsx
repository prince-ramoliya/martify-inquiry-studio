import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import logoSrc from "@/assets/martify-logo.svg";
import { useSiteSettings } from "@/hooks/useContent";

export const Logo = ({ variant = "default" }: { variant?: "default" | "light" }) => {
  const isLight = variant === "light";
  const settings = useSiteSettings();
  const src = settings?.logo_url || logoSrc;
  const nav = useNavigate();

  const clicks = useRef<number[]>([]);
  const onClick = (e: React.MouseEvent) => {
    const now = Date.now();
    clicks.current = [...clicks.current.filter((t) => now - t < 1200), now];
    if (clicks.current.length >= 3) {
      e.preventDefault();
      clicks.current = [];
      nav("/admin/login");
      return;
    }
    nav("/");
  };

  return (
    <a href="/" onClick={onClick} className="flex items-center group cursor-pointer" aria-label="MARTIFY home">
      <img
        src={src}
        alt={settings?.brand_name ?? "MARTIFY"}
        className={`h-12 sm:h-11 md:h-12 w-auto transition-spring group-hover:scale-[1.03] ${isLight ? "brightness-0 invert" : ""}`}
        width={196}
        height={54}
      />
    </a>
  );
};
