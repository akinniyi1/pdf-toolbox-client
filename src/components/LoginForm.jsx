import React, { useState } from "react";

function Login({ onLogin, setAdmin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState("");

  const BASE = "https://pdf-toolbox-server.onrender.com";

  const handleSubmit = async () => {
    if (!email || !password) return setError("All fields required");

    try {
      const res = await fetch(`${BASE}/${isRegistering ? "register" : "login"}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) return setError(data.error || "Something went wrong");

      onLogin(data.user || { email });
      if (email === "akinrinadeakinniyi9@gmail.com") setAdmin(true);
    } catch {
      setError("Server error");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-16 bg-white shadow-md rounded-xl p-6">
      <h2 className="text-xl font-bold mb-4 text-center">
        {isRegistering ? "Register" : "Login"}
      </h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
      {error && <p className="text-red-600 mb-2">{error}</p>}

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        {isRegistering ? "Create Account" : "Login"}
      </button>

      <p
        onClick={() => {
          setIsRegistering(!isRegistering);
          setError("");
        }}
        className="mt-4 text-sm text-blue-600 cursor-pointer text-center"
      >
        {isRegistering ? "Have an account? Login" : "Don't have account? Register"}
      </p>
    </div>
  );
}

export default Login;
