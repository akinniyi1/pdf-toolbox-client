import React, { useState } from "react";

function SupportForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSend = async () => {
    const res = await fetch("https://pdf-toolbox-server.onrender.com/support", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, message }),
    });

    if (res.ok) setSent(true);
  };

  if (sent) return <p className="text-green-600 text-center mt-4">Message sent!</p>;

  return (
    <div className="mt-8 p-4 border rounded bg-white max-w-sm mx-auto shadow">
      <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
      <input
        className="w-full p-2 mb-2 border rounded"
        placeholder="Your registered email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <textarea
        className="w-full p-2 mb-2 border rounded"
        placeholder="Describe your issue"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={4}
      />
      <button
        className="bg-blue-600 text-white w-full py-2 rounded"
        onClick={handleSend}
      >
        Send
      </button>
    </div>
  );
}

export default SupportForm;
