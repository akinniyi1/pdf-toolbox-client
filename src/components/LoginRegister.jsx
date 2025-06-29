import React, { useState } from "react";
import axios from "axios";

const BASE = "https://pdf-toolbox-server.onrender.com";

export default function LoginRegister({ onComplete }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("login");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      const endpoint = `${BASE}/${mode}`;
      const res = await axios.post(endpoint, { email, password });
      onComplete(res.data);
    } catch (err) {
      console.error(err);
      setError("Server error. Please check your details.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4 text-center">
        {mode === "login" ? "Login to PDF Toolbox" : "Create an Account"}
      </h2>

      <input
        type="email"
        className="w-full mb-3 p-2 border rounded"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="w-full mb-4 p-2 border rounded"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && <div className="text-red-500 mb-3">{error}</div>}

      <button
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        onClick={handleSubmit}
      >
        {mode === "login" ? "Login" : "Register"}
      </button>

      <p className="text-center mt-4 text-sm">
        {mode === "login" ? "Don't have an account?" : "Already registered?"}{" "}
        <span
          className="text-blue-600 cursor-pointer underline"
          onClick={() => {
            setMode(mode === "login" ? "register" : "login");
            setError("");
          }}
        >
          {mode === "login" ? "Register here" : "Login instead"}
        </span>
      </p>
    </div>
  );
}
