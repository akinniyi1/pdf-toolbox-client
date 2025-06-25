// src/lib/ton.js
import { TonConnect } from "@tonconnect/sdk";

export const tonConnect = new TonConnect({
  manifestUrl: "https://pdf-toolbox-client.onrender.com/tonconnect-manifest.json"
});
