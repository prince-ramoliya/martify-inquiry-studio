import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const root = document.getElementById("root");

if (root) {
  root.textContent = "";
  createRoot(root).render(<App />);
}
