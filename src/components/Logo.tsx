import { Link } from "react-router-dom";
import logoSrc from "@/assets/martify-logo.svg";

export const Logo = ({ variant = "default" }: { variant?: "default" | "light" }) => {
  const isLight = variant === "light";
  return (
    <Link to="/" className="flex items-center group" aria-label="MARTIFY home">
      <img
        src={logoSrc}
        alt="MARTIFY"
        className={`h-9 sm:h-10 md:h-11 w-auto transition-spring group-hover:scale-[1.03] ${
          isLight ? "brightness-0 invert" : ""
        }`}
        width={196}
        height={54}
      />
    </Link>
  );
};
