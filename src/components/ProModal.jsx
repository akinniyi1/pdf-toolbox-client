import React from "react";

function ProModal({ onClose, onUpgrade }) {
  const walletLink = `https://app.tonkeeper.com/transfer/UQD-iJ1whFaOz-42NRmJPJ9U7bKAjsXgPiaY-cqRiHeq8AKs?amount=500000000&text=PDF%20Toolbox%20Pro`;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow space-y-4">
        <h2 className="text-xl font-bold text-center text-blue-700">Upgrade to Pro</h2>
        <ul className="list-disc pl-6 text-sm text-gray-700">
          <li>Unlimited tool use</li>
          <li>Large file support</li>
          <li>OCR features</li>
        </ul>

        <a
          href={walletLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-block text-center bg-green-600 text-white py-2 px-4 rounded-xl hover:bg-green-700 transition"
        >
          Pay 0.5 TON
        </a>

        <button onClick={onUpgrade} className="text-sm text-center text-blue-600 w-full">
          I’ve paid — Activate
        </button>

        <button
          onClick={onClose}
          className="w-full text-sm text-gray-500 hover:underline text-center"
        >
          Maybe later
        </button>
      </div>
    </div>
  );
}

export default ProModal;
