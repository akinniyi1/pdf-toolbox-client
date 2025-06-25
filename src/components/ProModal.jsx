import React, { useEffect, useState } from "react";
import { tonConnect } from "../lib/ton";

function ProModal({ onClose, onUpgrade }) {
  const [walletConnected, setWalletConnected] = useState(false);

  useEffect(() => {
    try {
      tonConnect.restoreConnection();
      tonConnect.onStatusChange(wallet => {
        setWalletConnected(!!wallet);
      });
    } catch (e) {
      console.error("TON setup error:", e);
    }
  }, []);

  const handleConnect = () => {
    try {
      tonConnect.connectWallet();
    } catch (e) {
      alert("Failed to open wallet: " + e.message);
    }
  };

  const handlePay = async () => {
    try {
      const tx = {
        validUntil: Math.floor(Date.now() / 1000) + 600,
        messages: [
          {
            address: "UQD-iJ1whFaOz-42NRmJPJ9U7bKAjsXgPiaY-cqRiHeq8AKs", // your TON address
            amount: "500000000", // 0.5 TON
            payload: undefined
          }
        ]
      };

      await tonConnect.sendTransaction(tx);
      localStorage.setItem("pdfToolboxPro", "1");
      alert("✅ Payment sent. Pro unlocked!");
      onUpgrade();
    } catch (e) {
      alert("❌ Payment failed or canceled.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg max-w-sm w-full p-6 space-y-4">
        <h2 className="text-xl font-bold text-center text-blue-700">Upgrade to Pro</h2>
        <p className="text-sm text-gray-600 text-center">
          Unlock unlimited tools for <strong>0.5 TON</strong>
        </p>

        {!walletConnected ? (
          <button
            onClick={handleConnect}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-xl shadow"
          >
            🔌 Connect TON Wallet
          </button>
        ) : (
          <button
            onClick={handlePay}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-xl shadow"
          >
            🔓 Pay 0.5 TON to Unlock Pro
          </button>
        )}

        <button
          onClick={onClose}
          className="w-full text-xs text-gray-400 hover:underline mt-2"
        >
          Maybe later
        </button>
      </div>
    </div>
  );
}

export default ProModal;
