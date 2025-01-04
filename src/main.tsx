import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import { configure } from "mobx"; // Додайте цей імпорт
import "./index.css";
import "./font.css";
import App from "./App.tsx";

// // Конфігурація MobX
// configure({
//   enforceActions: "never", // Вимикає strict mode
// });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
