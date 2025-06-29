import React from "react";

function ProModal({ visible, onClose, onUpgrade }) {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg max-w-sm">
        <h2 className="text-xl font-bold mb-4">Upgrade to Pro</h2>
        <p className="mb-4">Unlock unlimited tool usage and remove usage limits.</p>

        <div className="flex gap-4">
          <button
            onClick={onUpgrade}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            I have paid
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProModal;
