import React, { useState } from "react";
import { getUserData, updateUserData } from "../lib/userAPI";

function generateCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return `user_${code}`;
}

function CodeForm({ onLogin }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleGenerate = () => {
    const newCode = generateCode();
    setCode(newCode);
    setError("");
  };

  const handleSubmit = async () => {
    if (!code) return;

    try {
      const user = await getUserData(code);
      localStorage.setItem("pdf_toolbox_code", code);
      onLogin(code, user);
    } catch (err) {
      // User not found — ask to create new
      const shouldCreate = window.confirm(
        "This is a new code. It will create a new account. Do you want to proceed?"
      );
      if (shouldCreate) {
        try {
          await updateUserData(code, { count: 0, pro: false });
          localStorage.setItem("pdf_toolbox_code", code);
          onLogin(code, { count: 0, pro: false });
        } catch (e) {
          console.error(e);
          setError("Failed to create account. Please try again later.");
        }
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <h2 className="text-xl font-bold">Enter or Create Your Access Code</h2>

      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="border p-2 rounded w-64 text-center"
        placeholder="e.g. user_ABC123"
      />

      <button
        onClick={handleGenerate}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Generate
      </button>

      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Enter PDF Toolbox
      </button>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <p className="text-xs text-gray-500 max-w-xs text-center">
        Store your code safely. You'll need it to access your account next time.
      </p>
    </div>
  );
}

export default CodeForm;
