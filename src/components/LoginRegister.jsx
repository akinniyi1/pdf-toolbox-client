import React, { useState } from "react";
import axios from "axios";

const API_URL = "https://pdf-toolbox-server.onrender.com";

export default function LoginRegister({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const endpoint = isLogin ? "/login" : "/register";
      const response = await axios.post(`${API_URL}${endpoint}`, {
        email,
        password,
      });

      if (response.data && response.data.user) {
        onLogin(response.data.user);
      } else {
        setError("Something went wrong.");
      }
    } catch (err) {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError("Server error, please try again.");
      }
    }

    setLoading(false);
  };

  return (
    <div className="bg-white shadow-lg p-6 rounded-xl text-center">
      <h2 className="text-xl font-semibold text-blue-600 mb-4">
        {isLogin ? "Login to PDF Toolbox" : "Create Your Account"}
      </h2>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          id="email"
          name="email"
          required
          placeholder="Enter your email"
          className="w-full border rounded p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          id="password"
          name="password"
          required
          placeholder="Enter your password"
          className="w-full border rounded p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Please wait..." : isLogin ? "Login" : "Register"}
        </button>
      </form>

      <p className="mt-4 text-sm text-gray-600">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className="text-blue-600 underline"
        >
          {isLogin ? "Register here" : "Login here"}
        </button>
      </p>
    </div>
  );
}
