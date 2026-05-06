import { Component, type ReactNode } from "react";

type Props = { children: ReactNode };
type State = { hasError: boolean; isChunkError: boolean };
type NonCriticalProps = { children: ReactNode; fallback?: ReactNode };
type NonCriticalState = { hasError: boolean };

const CHUNK_RELOAD_KEY = "__chunk_reload_at__";

const isChunkLoadError = (err: unknown): boolean => {
  const msg = (err as { message?: string; name?: string })?.message ?? "";
  const name = (err as { name?: string })?.name ?? "";
  return (
    name === "ChunkLoadError" ||
    /Loading chunk [\d]+ failed/i.test(msg) ||
    /Failed to fetch dynamically imported module/i.test(msg) ||
    /Importing a module script failed/i.test(msg) ||
    /dynamically imported module/i.test(msg)
  );
};

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, isChunkError: false };

  static getDerivedStateFromError(error: unknown): State {
    return { hasError: true, isChunkError: isChunkLoadError(error) };
  }

  componentDidCatch(error: unknown) {
    if (isChunkLoadError(error)) {
      // Avoid an infinite reload loop: only auto-reload once per minute.
      const last = Number(sessionStorage.getItem(CHUNK_RELOAD_KEY) ?? 0);
      const now = Date.now();
      if (now - last > 60_000) {
        sessionStorage.setItem(CHUNK_RELOAD_KEY, String(now));
        window.location.reload();
      }
    }
    // eslint-disable-next-line no-console
    console.error("[ErrorBoundary]", error);
  }

  handleReload = () => {
    sessionStorage.removeItem(CHUNK_RELOAD_KEY);
    window.location.reload();
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg-background text-foreground">
        <div className="max-w-md w-full text-center space-y-4">
          <div className="text-5xl">⚠️</div>
          <h1 className="font-display font-bold text-2xl">
            {this.state.isChunkError ? "Updating to the latest version…" : "Something went wrong"}
          </h1>
          <p className="text-muted-foreground text-sm">
            {this.state.isChunkError
              ? "A new version of the site is available. Reloading now…"
              : "Please reload the page. If the problem persists, try again in a moment."}
          </p>
          <button
            onClick={this.handleReload}
            className="inline-flex items-center justify-center h-11 px-6 rounded-full bg-primary text-primary-foreground font-semibold shadow-card hover:bg-primary/90 transition-colors"
          >
            Reload page
          </button>
        </div>
      </div>
    );
  }
}

export class NonCriticalErrorBoundary extends Component<NonCriticalProps, NonCriticalState> {
  state: NonCriticalState = { hasError: false };

  static getDerivedStateFromError(): NonCriticalState {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    // eslint-disable-next-line no-console
    console.warn("[NonCriticalErrorBoundary] Deferred section skipped", error);
  }

  render() {
    if (this.state.hasError) return this.props.fallback ?? null;
    return this.props.children;
  }
}
