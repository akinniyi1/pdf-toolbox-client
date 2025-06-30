import React, { useState } from "react";

export default function ProModal() {
  const [open, setOpen] = useState(false);

  // You can toggle `open` when count >=3 in ToolAction

  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm text-center">
        <h3 className="text-lg font-bold mb-2">Upgrade to Pro</h3>
        <p className="mb-4">Unlock unlimited access to all tools.</p>
        <a
          href="https://t.me/your_payment_link"
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-green-600 text-white py-2 rounded mb-2"
        >
          Pay with TON
        </a>
        <button onClick={() => setOpen(false)} className="text-gray-600 underline">
          Maybe Later
        </button>
      </div>
    </div>
  );
}
