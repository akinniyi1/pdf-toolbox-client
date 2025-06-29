import React, { useState } from "react";

function UsernameScreen({ onSubmit }) {
  const [username, setUsername] = useState("");

  const handleSubmit = () => {
    if (!username.trim()) return alert("Enter a valid name");
    localStorage.setItem("pdfToolboxName", username);
    onSubmit();
  };

  return (
    <div className="p-6 text-center space-y-4">
      <h2 className="text-xl font-semibold text-blue-700">Welcome to PDF Toolbox</h2>
      <p className="text-sm text-gray-600">Enter your name to begin:</p>

      <input
        type="text"
        placeholder="Your name"
        className="border rounded-xl px-4 py-2 w-full"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-xl shadow"
      >
        🚀 Enter PDF Toolbox
      </button>
    </div>
  );
}

export default UsernameScreen;
