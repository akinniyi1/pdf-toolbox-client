// src/components/ToolAction.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import ProModal from "./ProModal";

const BASE_URL = "https://pdf-toolbox-server.onrender.com";

export default function ToolAction({ tool, onBack, user }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showProModal, setShowProModal] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    if (user && !user.pro && user.count >= 3) {
      setShowProModal(true);
    }
  }, [user]);

  const handleFileChange = (e) => {
    setError("");
    setFile(e.target.files[0]);
  };

  const handleProcess = async () => {
    console.log("▶️ handleProcess called with user:", user);

    if (!file) {
      setError("Please select a PDF file first.");
      return;
    }

    if (!user?.id) {
      console.warn("⚠️ user.id missing, continuing without it");
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("tool", tool);
    formData.append("userId", user?.id || "");

    try {
      setLoading(true);
      setError("");

      const response = await axios.post(
        `${BASE_URL}/process`,
        formData,
        {
          responseType: "blob",
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${tool.replace(/\s+/g, "_")}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err) {
      console.error("Process error:", err);
      setError(
        err.response?.data?.error ||
        "Network error or server unavailable."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative p-6 bg-white shadow rounded-xl space-y-4">
      {/* Profile & Back Buttons */}
      <div className="flex justify-between">
        <button
          onClick={() => setShowProfile((v) => !v)}
          className="text-purple-600 hover:underline text-sm"
        >
          {showProfile ? "Hide Profile" : "Profile"}
        </button>
        <button onClick={onBack} className="text-blue-600 underline text-sm">
          ← Back
        </button>
      </div>

      {/* Profile Overlay */}
      {showProfile && user && (
        <div className="absolute top-10 right-6 bg-gray-50 border rounded-lg p-4 shadow-lg w-64">
          {user.avatar && (
            <img
              src={user.avatar}
              alt="avatar"
              className="w-16 h-16 rounded-full mx-auto mb-2"
            />
          )}
          <p className="text-center font-semibold">
            {user.username || user.name}
          </p>
          <p className="text-sm text-gray-600 text-center">{user.name}</p>
          <p className="text-xs text-gray-500 text-center">ID: {user.id}</p>
        </div>
      )}

      {/* Tool Title */}
      <h2 className="text-xl font-semibold text-center">{tool}</h2>

      {/* File Input */}
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="block w-full border rounded p-2"
      />

      {/* Error Message */}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Process Button */}
      <button
        onClick={handleProcess}
        disabled={loading}
        className={`w-full py-2 rounded-xl text-white ${
          loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Processing..." : "Process PDF"}
      </button>

      {/* Pro Modal */}
      {showProModal && (
        <ProModal
          onClose={() => setShowProModal(false)}
          onUpgrade={() => {
            /* handle upgrade flow */
          }}
        />
      )}
    </div>
  );
}
