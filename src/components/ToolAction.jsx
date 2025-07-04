import React, { useState } from "react";
import axios from "axios";
import ProModal from "./ProModal";

const BASE_URL = "https://pdf-toolbox-server.onrender.com";

export default function ToolAction({ tool, onBack }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setError("");
    setFile(e.target.files[0]);
  };

  const handleProcess = async () => {
    if (!file) {
      setError("Please select a PDF first.");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("tool", tool);

    try {
      setLoading(true);
      const response = await axios.post(`${BASE_URL}/process`, formData, {
        responseType: "blob",
        headers: { "Content-Type": "multipart/form-data" },
      });
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${tool.replace(/\s+/g, "_")}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch {
      setError("Processing failed, try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow space-y-4">
      <button onClick={onBack} className="text-blue-600 underline text-sm">
        ← Back
      </button>
      <h2 className="text-xl font-semibold text-center">{tool}</h2>

      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        className="block w-full border rounded p-2"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        onClick={handleProcess}
        disabled={loading}
        className={`w-full py-2 text-white rounded ${
          loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Processing..." : "Process PDF"}
      </button>
    </div>
  );
}
