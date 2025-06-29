import React from "react";

function ProModal({ onClose, onUpgrade }) {
  const handleUpgrade = () => {
    const walletLink = `https://app.tonkeeper.com/transfer/UQD-iJ1whFaOz-42NRmJPJ9U7bKAjsXgPiaY-cqRiHeq8AKs?amount=500000000&text=PDF%20Toolbox%20Pro%20Upgrade`;
    window.open(walletLink, "_blank");
    onUpgrade();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg max-w-sm w-full p-6 space-y-4">
        <h2 className="text-xl font-bold text-center text-blue-700">Upgrade to Pro</h2>
        <p className="text-sm text-gray-600 text-center">
          You’ve reached your free limit (3 PDF edits). Upgrade to unlock:
        </p>
        <ul className="list-disc pl-6 text-sm text-gray-700 space-y-1">
          <li>Unlimited tools</li>
          <li>Large file support</li>
          <li>Text extraction (OCR)</li>
        </ul>

        <button
          onClick={handleUpgrade}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-xl shadow"
        >
          🔓 Pay 0.5 TON with Tonkeeper
        </button>

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
