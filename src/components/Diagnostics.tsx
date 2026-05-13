import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

type FailedRequest = { url: string; status: number | string; at: string };

const APP_VERSION =
  (typeof __APP_VERSION__ !== "undefined" && __APP_VERSION__) || "dev";

declare const __APP_VERSION__: string;

/**
 * On-page diagnostics panel.
 * Open by appending `?debug=1` to any URL, or by setting
 * localStorage.setItem("martify:debug", "1"). Press Esc or click × to close.
 */
export const Diagnostics = () => {
  const location = useLocation();
  const [enabled, setEnabled] = useState(false);
  const [open, setOpen] = useState(true);
  const [failed, setFailed] = useState<FailedRequest[]>([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fromQuery = params.get("debug") === "1";
    const fromStorage =
      typeof localStorage !== "undefined" &&
      localStorage.getItem("martify:debug") === "1";
    if (fromQuery) localStorage.setItem("martify:debug", "1");
    setEnabled(fromQuery || fromStorage);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const push = (r: FailedRequest) =>
      setFailed((prev) => [r, ...prev].slice(0, 25));

    const origFetch = window.fetch.bind(window);
    window.fetch = async (...args: Parameters<typeof fetch>) => {
      const url = typeof args[0] === "string" ? args[0] : (args[0] as Request).url;
      try {
        const res = await origFetch(...args);
        if (!res.ok)
          push({ url, status: res.status, at: new Date().toLocaleTimeString() });
        return res;
      } catch (err) {
        push({
          url,
          status: (err as Error)?.message ?? "network error",
          at: new Date().toLocaleTimeString(),
        });
        throw err;
      }
    };

    const onError = (e: ErrorEvent) =>
      push({
        url: e.filename || "script error",
        status: e.message,
        at: new Date().toLocaleTimeString(),
      });
    window.addEventListener("error", onError);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.fetch = origFetch;
      window.removeEventListener("error", onError);
      window.removeEventListener("keydown", onKey);
    };
  }, [enabled]);

  if (!enabled || !open) {
    if (enabled)
      return (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-3 left-3 z-[60] px-3 h-9 rounded-full bg-foreground text-background text-xs font-mono shadow-lg"
        >
          debug
        </button>
      );
    return null;
  }

  const disable = () => {
    localStorage.removeItem("martify:debug");
    setEnabled(false);
  };

  return (
    <div className="fixed bottom-3 left-3 z-[60] max-w-[92vw] w-80 bg-foreground text-background rounded-2xl shadow-2xl text-xs font-mono overflow-hidden">
      <div className="flex items-center justify-between px-3 py-2 border-b border-background/20">
        <span className="font-bold">MARTIFY · diagnostics</span>
        <div className="flex gap-1">
          <button
            onClick={disable}
            className="px-2 py-0.5 rounded bg-background/15 hover:bg-background/25"
            title="Disable diagnostics"
          >
            off
          </button>
          <button
            onClick={() => setOpen(false)}
            className="px-2 py-0.5 rounded bg-background/15 hover:bg-background/25"
          >
            ×
          </button>
        </div>
      </div>
      <div className="p-3 space-y-1.5">
        <div>
          <span className="opacity-60">version:</span> {APP_VERSION}
        </div>
        <div className="break-all">
          <span className="opacity-60">route:</span> {location.pathname}
          {location.search}
        </div>
        <div>
          <span className="opacity-60">ua:</span>{" "}
          {navigator.userAgent.slice(0, 60)}…
        </div>
        <div>
          <span className="opacity-60">online:</span> {String(navigator.onLine)}
        </div>
      </div>
      <div className="px-3 pb-3">
        <div className="opacity-60 mb-1">failed requests ({failed.length})</div>
        <div className="max-h-40 overflow-auto space-y-1">
          {failed.length === 0 && <div className="opacity-50">none</div>}
          {failed.map((r, i) => (
            <div key={i} className="border border-background/20 rounded p-1.5">
              <div className="flex justify-between gap-2">
                <span className="text-red-300">{String(r.status)}</span>
                <span className="opacity-60">{r.at}</span>
              </div>
              <div className="break-all">{r.url}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
