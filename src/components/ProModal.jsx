import React from "react";
import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
import { TonConnectButton } from "@tonconnect/ui-react";

function ProModal({ onClose, onUpgrade }) {
  const [tonConnectUI] = useTonConnectUI();
  const userAddress = useTonAddress();
  const connected = !!userAddress;

  const handleUpgrade = async () => {
    try {
      await tonConnectUI.sendTransaction({
        validUntil: Math.floor(Date.now() / 1000) + 600,
        messages: [
          {
            address: "UQD-iJ1whFaOz-42NRmJPJ9U7bKAjsXgPiaY-cqRiHeq8AKs",
            amount: "500000000", // 0.5 TON
          },
        ],
      });

      localStorage.setItem("pdfToolboxPro", "1");
      alert("✅ Payment sent. You’re now Pro!");
      onUpgrade();
    } catch (err) {
      console.error("❌ Payment failed:", err);
      alert("❌ Payment failed or cancelled.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg max-w-sm w-full p-6 space-y-4">
        <h2 className="text-xl font-bold text-center text-blue-700">
          Upgrade to Pro
        </h2>
        <p className="text-sm text-gray-600 text-center">
          You've reached your free limit. Upgrade to unlock full tools.
        </p>

        <ul className="list-disc pl-6 text-sm text-gray-700 space-y-1">
          <li>Unlimited PDF edits</li>
          <li>Large file support</li>
          <li>OCR text extraction</li>
        </ul>

        {!connected ? (
          <div className="text-center">
            <TonConnectButton className="w-full" />
          </div>
        ) : (
          <button
            onClick={handleUpgrade}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-xl shadow"
          >
            🔓 Pay 0.5 TON to Unlock Pro
          </button>
        )}

        <button
          onClick={onClose}
          className="w-full text-sm text-gray-500 hover:underline text-center mt-2"
        >
          Maybe later
        </button>
      </div>
    </div>
  );
}

export default ProModal;
