import { useNavigate } from "react-router-dom";
import logoSrc from "@/assets/martify-logo.svg";

export const Logo = ({ variant = "default" }: { variant?: "default" | "light" }) => {
  const isLight = variant === "light";
  const nav = useNavigate();

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    nav("/");
  };

  return (
    <a href="/" onClick={onClick} className="flex items-center group cursor-pointer" aria-label="MARTIFY home">
      <img
        src={logoSrc}
        alt="MARTIFY"
        className={`h-12 sm:h-11 md:h-12 w-auto transition-spring group-hover:scale-[1.03] ${isLight ? "brightness-0 invert" : ""}`}
        width={196}
        height={54}
      />
    </a>
  );
};
