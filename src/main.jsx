import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { TonConnectUIProvider, manifestUrl } from "./lib/ton.js"; // ✅ FIXED

ReactDOM.createRoot(document.getElementById("root")).render(
  <TonConnectUIProvider manifestUrl={manifestUrl}>
    <App />
  </TonConnectUIProvider>
);
