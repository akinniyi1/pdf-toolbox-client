import React from "react";

function ProModal({ onClose, onUpgrade }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm text-center">
        <h2 className="text-xl font-bold mb-2 text-red-600">Upgrade Required</h2>
        <p className="mb-4">You've reached the free tool limit. Upgrade to Pro to continue.</p>
        <div className="space-x-3">
          <button
            onClick={onUpgrade}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Upgrade to Pro
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProModal;
