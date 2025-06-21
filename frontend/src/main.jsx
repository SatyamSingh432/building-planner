import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { DrawingProvider } from "./context/DrawingContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DrawingProvider>
      <App />
    </DrawingProvider>
  </StrictMode>
);
