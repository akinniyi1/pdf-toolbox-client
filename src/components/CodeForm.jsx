import React, { useState } from "react";
import axios from "axios";

const BASE_URL = "https://pdf-toolbox-server.onrender.com";

function CodeForm({ onSubmit }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const generateCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let id = "";
    for (let i = 0; i < 6; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return "user_" + id;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!code) {
      setError("Please enter or generate a code");
      return;
    }

    try {
      // If new, register. If existing, proceed.
      await axios.post(`${BASE_URL}/user/${code}`, { count: 0, pro: false });
      onSubmit(code);
    } catch (err) {
      setError("Something went wrong.");
      console.error(err);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow text-center space-y-4">
      <h2 className="text-xl font-semibold">Enter or Create Your Access Code</h2>
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter your 6-char code"
        className="border px-4 py-2 rounded w-full text-center"
      />
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex justify-between gap-4">
        <button
          onClick={() => setCode(generateCode())}
          className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
        >
          Generate
        </button>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          Enter PDF Toolbox
        </button>
      </div>
    </div>
  );
}

export default CodeForm;
