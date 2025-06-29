import React, { useState } from "react";
import { updateUserData } from "../lib/userAPI";

function UsernameForm({ onComplete }) {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleStart = async () => {
    if (!username.trim()) {
      setError("Please enter a valid name.");
      return;
    }

    let userId = localStorage.getItem("pdfUserId");
    if (!userId) {
      userId = "pdf_user_" + Math.random().toString(36).substring(2, 10);
      localStorage.setItem("pdfUserId", userId);
    }

    localStorage.setItem("pdfUsername", username);

    await updateUserData(userId, { username, count: 0, pro: false });
    onComplete(); // Trigger next screen (ToolMenu)
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-white px-6">
      <h1 className="text-2xl font-bold text-blue-700 mb-4">Welcome to PDF Toolbox</h1>
      <p className="text-gray-600 mb-6 text-center">Enter your name to get started</p>

      <input
        type="text"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
          setError("");
        }}
        placeholder="Enter your name"
        className="w-full max-w-xs px-4 py-2 border border-gray-300 rounded-xl text-center focus:outline-none focus:ring focus:ring-blue-200"
      />
      {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}

      <button
        onClick={handleStart}
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl shadow"
      >
        Enter PDF Toolbox
      </button>
    </div>
  );
}

export default UsernameForm;
