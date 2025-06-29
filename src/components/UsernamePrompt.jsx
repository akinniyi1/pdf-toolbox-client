import React, { useState } from "react";

function UsernamePrompt({ onSet }) {
  const [username, setUsername] = useState("");

  const handleSubmit = () => {
    const clean = username.trim();
    if (clean.length < 3) {
      alert("Username must be at least 3 characters.");
      return;
    }
    onSet(clean);
  };

  return (
    <div className="bg-white/90 backdrop-blur p-6 rounded-2xl shadow-md space-y-4 text-center">
      <h2 className="text-xl font-bold text-blue-700">Enter Your Username</h2>
      <p className="text-sm text-gray-600">To track your usage and upgrades</p>

      <input
        type="text"
        className="w-full border border-gray-300 rounded-xl px-4 py-2 text-center"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-xl shadow mt-2"
      >
        Continue
      </button>
    </div>
  );
}

export default UsernamePrompt;
