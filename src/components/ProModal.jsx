import React, { useState } from "react";

const ProModal = ({ email, onClose }) => {
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = async () => {
    const proUntil = new Date();
    proUntil.setDate(proUntil.getDate() + 30);

    try {
      await fetch(`https://pdf-toolbox-server.onrender.com/user/${email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pro: true, proUntil }),
      });

      alert("Your Pro plan has been activated!");
      window.location.reload();
    } catch (err) {
      alert("Something went wrong.");
    }
  };

  const tonLink = `https://app.tonkeeper.com/transfer/UQD-iJ1whFaOz-42NRmJPJ9U7bKAjsXgPiaY-cqRiHeq8AKs?amount=0.5&text=Upgrade+PDF+Toolbox`;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full">
        <h2 className="text-xl font-bold text-center mb-4">Upgrade to Pro</h2>
        <p className="text-sm text-gray-600 mb-4 text-center">
          You’ve used your 3 free tools. Pay 0.5 TON to unlock unlimited access for 30 days.
        </p>

        <a
          href={tonLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-2 rounded mb-3"
        >
          Pay 0.5 TON
        </a>

        <button
          onClick={handleConfirm}
          className="block w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded mb-2"
        >
          I Have Paid
        </button>

        <button
          onClick={onClose}
          className="block w-full text-center text-gray-600 mt-2 underline"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ProModal;
