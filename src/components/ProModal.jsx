import React from "react";

function ProModal({ onClose, onUpgrade }) {
  const tonAddress = "YOUR_TON_WALLET_ADDRESS_HERE"; // 🔁 replace this

  const handleTonClick = () => {
    const amount = 0.5;
    const url = `https://tonkeeper.com/transfer/${tonAddress}?amount=${amount}&text=PDF%20Toolbox%20Pro`;
    window.open(url, "_blank");

    setTimeout(() => {
      // Simulate payment success
      localStorage.setItem("pdfToolboxPro", "1");
      alert("✅ Pro unlocked! You now have full access.");
      onUpgrade();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg max-w-sm w-full p-6 space-y-4">
        <h2 className="text-xl font-bold text-center text-blue-700">Upgrade to Pro</h2>
        <p className="text-sm text-gray-600 text-center">
          You’ve reached your free limit. Unlock full access for just <strong>0.5 TON</strong>:
        </p>

        <button
          onClick={handleTonClick}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-xl shadow"
        >
          🔓 Pay with Tonkeeper
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
