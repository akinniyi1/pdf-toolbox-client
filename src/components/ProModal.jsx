import React from "react";
import { TonConnectButton, useTonConnectUI } from "@tonconnect/ui-react";

function ProModal({ onClose, onUpgrade }) {
  // pull out just the account from the hook
  const { account } = useTonConnectUI();
  const connected = Boolean(account);

  // build our payment request once
  const paymentRequest = {
    validUntil: Math.floor(Date.now() / 1000) + 600,
    messages: [
      {
        address: "UQD-iJ1whFaOz-42NRmJPJ9U7bKAjsXgPiaY-cqRiHeq8AKs",
        amount: "500000000", // 0.5 TON in nanotons
      },
    ],
  };

  const handleSuccess = () => {
    // called when the TON wallet confirms the transaction
    localStorage.setItem("pdfToolboxPro", "1");
    alert("✅ Payment confirmed – you’re now Pro!");
    onUpgrade();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg max-w-sm w-full p-6 space-y-4">
        <h2 className="text-xl font-bold text-center text-blue-700">
          Upgrade to Pro
        </h2>
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
            {/* this button handles wallet connection */}
            <TonConnectButton className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-xl shadow">
              🔌 Connect TON Wallet
            </TonConnectButton>
          </div>
        ) : (
          <div className="text-center">
            {/* this button both connects (if needed) and sends the tx */}
            <TonConnectButton
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-xl shadow"
              request={paymentRequest}
              onSuccess={handleSuccess}
            >
              🔓 Pay 0.5 TON to Unlock Pro
            </TonConnectButton>
          </div>
        )}

        <button
          onClick={onClose}
          className="w-full text-sm text-gray-500 hover:underline mt-2"
        >
          Maybe later
        </button>
      </div>
    </div>
  );
}

export default ProModal;
