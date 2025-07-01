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

  // Check user usage if you still track trials
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
    if (!file) {
      setError("Please select a PDF file first.");
      return;
    }
    if (!user) {
      setError("User data missing.");
      return;
    }
    if (!user.pro && user.count >= 3) {
      setShowProModal(true);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);         // must match upload.single("file")
    formData.append("tool", tool);
    formData.append("userId", user.id);

    try {
      setLoading(true);
      setError("");

      const response = await axios.post(`${BASE_URL}/process`, formData, {
        responseType: "blob",              // important for binary PDF
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // create a download link
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${tool.replace(/\s+/g, "_")}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();

      // Optionally update usage count in parent or fetch fresh user data
    } catch (err) {
      console.error("Process error:", err);
      // if server returned JSON error instead of PDF
      if (err.response && err.response.data instanceof Blob) {
        // try to parse JSON
        const reader = new FileReader();
        reader.onload = () => {
          try {
            const msg = JSON.parse(reader.result).error;
            setError(msg || "Processing failed.");
          } catch {
            setError("Unexpected response format.");
          }
        };
        reader.readAsText(err.response.data);
      } else {
        setError("Network error or server unavailable.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
      <button onClick={onBack} className="text-blue-600 underline text-sm">
        ← Back
      </button>

      <h2 className="text-xl font-semibold text-center">{tool}</h2>

      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="block w-full text-gray-700 mb-2"
      />

      {error && <p className="text-red-500">{error}</p>}

      <button
        onClick={handleProcess}
        disabled={loading}
        className={`w-full py-2 rounded-xl text-white ${
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Processing..." : "Process PDF"}
      </button>

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
