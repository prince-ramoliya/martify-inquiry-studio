import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const clearLegacyCaches = () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .getRegistrations()
      .then((registrations) => registrations.forEach((registration) => registration.unregister()))
      .catch(() => undefined);
  }

  if ("caches" in window) {
    caches
      .keys()
      .then((keys) => Promise.all(keys.map((key) => caches.delete(key))))
      .catch(() => undefined);
  }
};

const root = document.getElementById("root");

clearLegacyCaches();

if (root) {
  root.textContent = "";
  createRoot(root).render(<App />);
}
