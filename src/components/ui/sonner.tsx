import { Toaster as Sonner, toast } from "sonner";
import { CheckCircle2, AlertCircle, AlertTriangle, Info, Loader2 } from "lucide-react";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <>
      {/* Premium, jank-free enter/exit motion (GPU-only transforms) */}
      <style>{`
        [data-sonner-toaster][data-y-position='top'] [data-sonner-toast] {
          will-change: transform, opacity;
          transition: transform 320ms cubic-bezier(0.22, 1, 0.36, 1),
                      opacity 220ms cubic-bezier(0.22, 1, 0.36, 1) !important;
        }
        [data-sonner-toaster] [data-sonner-toast][data-mounted='true'] {
          animation: lov-toast-in 380ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        [data-sonner-toaster] [data-sonner-toast][data-removed='true'] {
          animation: lov-toast-out 240ms cubic-bezier(0.4, 0, 1, 1) both !important;
        }
        @keyframes lov-toast-in {
          0%   { opacity: 0; transform: translate3d(0, -16px, 0) scale(0.96); }
          60%  { opacity: 1; }
          100% { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
        }
        @keyframes lov-toast-out {
          0%   { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
          100% { opacity: 0; transform: translate3d(0, -12px, 0) scale(0.97); }
        }
        @media (prefers-reduced-motion: reduce) {
          [data-sonner-toaster] [data-sonner-toast] { animation: none !important; transition: opacity 150ms linear !important; }
        }
      `}</style>

      <Sonner
        theme="light"
        className="toaster group"
        offset={16}
        gap={10}
        icons={{
          success: <CheckCircle2 className="w-[18px] h-[18px]" />,
          error: <AlertCircle className="w-[18px] h-[18px]" />,
          warning: <AlertTriangle className="w-[18px] h-[18px]" />,
          info: <Info className="w-[18px] h-[18px]" />,
          loading: <Loader2 className="w-[18px] h-[18px] animate-spin" />,
        }}
        toastOptions={{
          unstyled: false,
          classNames: {
            toast:
              "group pointer-events-auto flex items-center gap-3 w-full max-w-[92vw] sm:max-w-md " +
              "rounded-2xl border border-border/60 bg-background/90 backdrop-blur-xl " +
              "px-4 py-3 my-[10px] shadow-[0_12px_40px_-12px_hsl(var(--foreground)/0.28)] " +
              "text-foreground",
            title: "text-sm font-semibold font-display leading-tight",
            description: "text-xs text-muted-foreground leading-snug mt-0.5",
            icon: "shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary",
            actionButton:
              "ml-auto shrink-0 h-8 px-3 rounded-full bg-primary text-primary-foreground " +
              "text-xs font-semibold hover:bg-primary/90 transition-colors",
            cancelButton:
              "shrink-0 h-8 px-3 rounded-full bg-muted text-muted-foreground text-xs font-medium",
            closeButton:
              "!left-auto !right-2 !top-2 !bg-transparent !border-0 !text-muted-foreground hover:!text-foreground",
            success:
              "!border-emerald-500/30 [&_[data-icon]]:!bg-emerald-500/10 [&_[data-icon]]:!text-emerald-600 dark:[&_[data-icon]]:!text-emerald-400",
            error:
              "!border-destructive/40 [&_[data-icon]]:!bg-destructive/10 [&_[data-icon]]:!text-destructive",
            warning:
              "!border-amber-500/40 [&_[data-icon]]:!bg-amber-500/10 [&_[data-icon]]:!text-amber-600 dark:[&_[data-icon]]:!text-amber-400",
            info:
              "!border-primary/30 [&_[data-icon]]:!bg-primary/10 [&_[data-icon]]:!text-primary",
          },
        }}
        {...props}
      />
    </>
  );
};

export { Toaster, toast };
