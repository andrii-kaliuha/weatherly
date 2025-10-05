import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { configure } from "mobx";
import "./index.css";
import { App } from "./App.tsx";

configure({
  enforceActions: "never",
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
