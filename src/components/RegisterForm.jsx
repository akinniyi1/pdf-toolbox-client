import React, { useState } from "react";

function RegisterForm({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    try {
      const res = await fetch("https://pdf-toolbox-server.onrender.com/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) return setError(data.error || "Failed");

      onRegister(data.user || { email });
    } catch {
      setError("Server error");
    }
  };

  return (
    <div className="max-w-sm mx-auto bg-white p-6 rounded shadow mt-10">
      <h2 className="text-lg font-bold mb-4 text-center">Register</h2>
      <input
        className="w-full mb-2 border p-2 rounded"
        type="email"
        placeholder="Enter Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="w-full mb-2 border p-2 rounded"
        type="password"
        placeholder="Enter Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p className="text-red-500">{error}</p>}
      <button
        onClick={handleRegister}
        className="w-full bg-blue-600 text-white p-2 rounded"
      >
        Create Account
      </button>
    </div>
  );
}

export default RegisterForm;
