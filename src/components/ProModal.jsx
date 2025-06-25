import React from "react";
import { TonConnectButton, useTonConnectUI } from "@tonconnect/ui-react";

function ProModal({ onClose, onUpgrade }) {
  const [{ state }, setOptions] = useTonConnectUI();
  const connected = state.status === "connected";

  const handleUpgrade = () => {
    localStorage.setItem("pdfToolboxPro", "1");
    alert("✅ Payment request sent. You're now Pro!");
    onUpgrade();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg max-w-sm w-full p-6 space-y-4">
        <h2 className="text-xl font-bold text-center text-blue-700">Upgrade to Pro</h2>
        <p className="text-sm text-gray-600 text-center">
          You’ve reached your free limit (3 PDF edits). Upgrade to Pro to unlock:
        </p>
        <ul className="list-disc pl-6 text-sm text-gray-700 space-y-1">
          <li>Unlimited tools</li>
          <li>Large file support</li>
          <li>Text extraction (OCR)</li>
        </ul>

        {!connected ? (
          <div className="text-center">
            <TonConnectButton className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-xl shadow justify-center">
              Connect TON Wallet
            </TonConnectButton>
          </div>
        ) : (
          <TonConnectButton
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-xl shadow justify-center"
            request={{
              validUntil: Math.floor(Date.now() / 1000) + 600,
              messages: [
                {
                  address: "UQD-iJ1whFaOz-42NRmJPJ9U7bKAjsXgPiaY-cqRiHeq8AKs", // Your wallet
                  amount: "500000000" // 0.5 TON in nanotons
                }
              ]
            }}
            onClick={handleUpgrade}
          >
            🔓 Pay 0.5 TON to Unlock Pro
          </TonConnectButton>
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
