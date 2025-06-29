import React from "react";

export default function ProModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow max-w-md">
        <h2 className="text-xl font-bold mb-4">Upgrade Required</h2>
        <p className="mb-4">
          You’ve used all 3 free tools. To continue using this app, please upgrade to Pro.
        </p>
        <div className="flex justify-end gap-3">
          <button className="bg-gray-300 px-4 py-2 rounded" onClick={onClose}>
            Cancel
          </button>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded"
            onClick={() => window.open("https://t.me/your_payment_link", "_blank")}
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
}
