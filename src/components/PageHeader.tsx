import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

type Crumb = { label: string; to?: string };

export const PageHeader = ({
  eyebrow,
  title,
  description,
  crumbs = [],
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  crumbs?: Crumb[];
}) => {
  return (
    <section className="relative bg-gradient-soft border-b border-border overflow-hidden">
      <div className="absolute -top-32 -right-20 w-96 h-96 bg-primary-glow/20 rounded-full blur-3xl" aria-hidden />
      <div className="container-page py-12 lg:py-20 relative">
        {crumbs.length > 0 && (
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-5 animate-fade-in">
            <Link to="/" className="hover:text-primary">Home</Link>
            {crumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <ChevronRight className="w-3.5 h-3.5" />
                {c.to ? <Link to={c.to} className="hover:text-primary">{c.label}</Link> : <span className="text-foreground">{c.label}</span>}
              </span>
            ))}
          </nav>
        )}
        {eyebrow && (
          <div className="text-sm font-semibold text-primary uppercase tracking-wider mb-3 animate-fade-in">{eyebrow}</div>
        )}
        <h1 className="font-display font-extrabold text-4xl lg:text-6xl tracking-tight max-w-4xl animate-fade-in-up">
          {title}
        </h1>
        {description && (
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl animate-fade-in-up" style={{ animationDelay: "120ms" }}>
            {description}
          </p>
        )}
      </div>
    </section>
  );
};
