import { useTheme } from "next-themes";
import { Toaster as Sonner, toast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      offset={16}
      gap={10}
      toastOptions={{
        unstyled: false,
        classNames: {
          toast:
            "group pointer-events-auto flex items-center gap-3 w-full max-w-[92vw] sm:max-w-md " +
            "rounded-2xl border border-border/60 bg-background/85 backdrop-blur-xl " +
            "px-4 py-3 shadow-[0_10px_40px_-10px_hsl(var(--foreground)/0.25)] " +
            "text-foreground",
          title: "text-sm font-semibold font-display leading-tight",
          description: "text-xs text-muted-foreground leading-snug mt-0.5",
          icon: "shrink-0 text-primary",
          actionButton:
            "ml-auto shrink-0 h-8 px-3 rounded-full bg-primary text-primary-foreground " +
            "text-xs font-semibold hover:bg-primary/90 transition-colors",
          cancelButton:
            "shrink-0 h-8 px-3 rounded-full bg-muted text-muted-foreground text-xs font-medium",
          closeButton:
            "!left-auto !right-2 !top-2 !bg-transparent !border-0 !text-muted-foreground hover:!text-foreground",
          success:
            "!border-emerald-500/30 [&_[data-icon]]:!text-emerald-500",
          error:
            "!border-destructive/40 [&_[data-icon]]:!text-destructive",
          warning:
            "!border-amber-500/40 [&_[data-icon]]:!text-amber-500",
          info:
            "!border-primary/30 [&_[data-icon]]:!text-primary",
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
