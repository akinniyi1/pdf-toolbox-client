import React, { useEffect, useState } from "react";

function ProModal({ onClose, onUpgrade }) {
  const userCode = localStorage.getItem("userCode");
  const TON_ADDRESS = "UQD-iJ1whFaOz-42NRmJPJ9U7bKAjsXgPiaY-cqRiHeq8AKs";
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);

  const deepLink = `https://tonkeeper.com/transfer/${TON_ADDRESS}?amount=0.5&text=PDFToolbox-${userCode}`;

  const checkTransaction = async () => {
    try {
      const res = await fetch(`https://tonapi.io/v2/blockchain/accounts/${TON_ADDRESS}/transactions?limit=10`);
      const data = await res.json();
      const recent = data.transactions.find(
        (tx) =>
          tx.incoming &&
          tx.incoming.comment === `PDFToolbox-${userCode}` &&
          tx.incoming.value &&
          parseFloat(tx.incoming.value) >= 0.5 * 10 ** 9
      );
      if (recent) {
        setPaymentConfirmed(true);
        onUpgrade();
      } else {
        alert("No payment found yet. Please wait or check again.");
      }
    } catch (err) {
      alert("Error verifying payment.");
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-sm space-y-4 text-center">
        <h2 className="text-xl font-bold">Upgrade to Pro</h2>
        <p>Pay <strong>0.5 TON</strong> to unlock unlimited usage for 30 days.</p>
        <a
          href={deepLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          Pay 0.5 TON
        </a>
        <button
          onClick={checkTransaction}
          className="block w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          I Have Paid
        </button>
        <button
          onClick={onClose}
          className="text-sm text-gray-500 hover:underline mt-2"
        >
          Maybe Later
        </button>
      </div>
    </div>
  );
}

export default ProModal;
