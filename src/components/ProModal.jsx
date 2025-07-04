import React from "react";

export default function ProModal({ onClose, onUpgrade }) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 max-w-sm space-y-4">
        <h3 className="text-lg font-bold text-center">Upgrade to Pro</h3>
        <p className="text-sm text-gray-600 text-center">
          Unlock unlimited PDF tools and large-file support.
        </p>
        <button
          onClick={onUpgrade}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
        >
          🔓 Upgrade Now
        </button>
        <button
          onClick={onClose}
          className="w-full text-sm text-gray-500 hover:underline"
        >
          Maybe Later
        </button>
      </div>
    </div>
  );
}
