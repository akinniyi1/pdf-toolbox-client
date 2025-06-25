import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import TonConnectUIProvider from "./lib/ton.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <TonConnectUIProvider manifestUrl="https://pdf-toolbox-client.onrender.com/tonconnect-manifest.json">
    <App />
  </TonConnectUIProvider>
);
