import React, { useState, useEffect } from "react";
import { getUserData, updateUserData } from "../lib/userAPI";
import { nanoid } from "nanoid";

function CodeForm({ onLogin }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState(""); // "new" or "existing"

  useEffect(() => {
    const saved = localStorage.getItem("user_id");
    if (saved) {
      onLogin(saved);
    }
  }, [onLogin]);

  const handleGenerate = () => {
    const newCode = "user_" + nanoid(10).toLowerCase();
    setCode(newCode);
    setStatus("new");
    setError("");
  };

  const handleSubmit = async () => {
    if (!code) {
      setError("Please enter or generate a code");
      return;
    }

    try {
      const res = await getUserData(code);

      if (res && status !== "new") {
        localStorage.setItem("user_id", code);
        onLogin(code);
      } else if (status === "new") {
        // Create new account
        await updateUserData(code, { count: 0, pro: false, proUntil: null });
        localStorage.setItem("user_id", code);
        onLogin(code);
      } else {
        setError("This code is new. Please click Generate to register or try another code.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-white p-4">
      <div className="bg-white shadow-xl rounded-xl p-6 w-full max-w-sm space-y-4">
        <h1 className="text-xl font-bold text-center text-blue-700">
          Enter or Create Your Access Code
        </h1>

        <input
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
            setStatus("");
          }}
          placeholder="Enter your code"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          onClick={handleGenerate}
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition"
        >
          Generate
        </button>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
        >
          Enter PDF Toolbox
        </button>

        <p className="text-xs text-gray-500 text-center mt-2">
          Keep your code safe. You’ll need it to log in again later.
        </p>
      </div>
    </div>
  );
}

export default CodeForm;
