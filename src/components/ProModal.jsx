import React, { useState } from "react";

function ProModal({ onClose, onUpgrade }) {
  const [step, setStep] = useState(1);
  const tonAddress = "UQD-iJ1whFaOz-42NRmJPJ9U7bKAjsXgPiaY-cqRiHeq8AKs";
  const tonAmount = 0.5;

  const paymentLink = `https://tonkeeper.com/transfer/${tonAddress}?amount=${tonAmount}&text=PDF%20Toolbox%20Upgrade`;

  const handlePaid = () => {
    // Simulate payment confirmation (manual for now)
    alert("Thanks for upgrading to Pro!");
    onUpgrade();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl w-[90%] max-w-md space-y-4 shadow-xl text-center">
        <h2 className="text-xl font-bold text-blue-700">Upgrade to Pro</h2>

        {step === 1 && (
          <>
            <p className="text-gray-600">
              You’ve used all 3 free tools. Upgrade to unlock unlimited access.
            </p>

            <button
              onClick={() => setStep(2)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl mt-4"
            >
              Upgrade for {tonAmount} TON
            </button>

            <button
              onClick={onClose}
              className="text-gray-400 text-sm mt-2 underline"
            >
              Maybe later
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <p className="text-gray-600">Use Tonkeeper to complete payment.</p>

            <a
              href={paymentLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl"
            >
              Pay 0.5 TON
            </a>

            <button
              onClick={handlePaid}
              className="w-full mt-3 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-xl"
            >
              I have paid
            </button>

            <button
              onClick={() => setStep(1)}
              className="text-gray-400 text-sm mt-2 underline"
            >
              ← Back
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default ProModal;
