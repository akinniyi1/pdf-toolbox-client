import React, { useState } from "react";
import { getUserData, updateUserData } from "../lib/userAPI";

function generateCode() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = "user_";
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

function CodeForm({ onSubmit }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleGenerate = () => {
    const newCode = generateCode();
    setCode(newCode);
    setError("");
  };

  const handleSubmit = async () => {
    if (!code || code.length < 6) {
      setError("Please enter or generate a valid access code.");
      return;
    }

    try {
      let user = null;
      try {
        user = await getUserData(code);
      } catch (e) {
        // Not found — we will create a new user
      }

      if (!user) {
        const confirm = window.confirm(
          `This code does not exist. A new account will be created with ID: ${code}. Proceed?`
        );
        if (!confirm) return;

        await updateUserData(code, {
          count: 0,
          pro: false,
          expire: null,
        });
      }

      localStorage.setItem("userCode", code);
      onSubmit(code);
    } catch (err) {
      console.error("Error saving or retrieving user:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md text-center space-y-4">
        <h2 className="text-xl font-bold text-gray-800">Enter or Create Your Access Code</h2>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <input
          type="text"
          placeholder="Enter your access code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleGenerate}
          className="w-full py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          Generate
        </button>

        <button
          onClick={handleSubmit}
          className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Enter PDF Toolbox
        </button>

        <p className="text-sm text-gray-600 mt-2">
          ⚠️ Save your code. You will use it to log in next time. Clearing browser/Telegram data will require this code!
        </p>
      </div>
    </div>
  );
}

export default CodeForm;
