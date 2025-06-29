import React, { useState } from "react";
import ProModal from "./ProModal";
import axios from "axios";

export default function ToolAction({ tool, onBack, user }) {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [downloadLink, setDownloadLink] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleProcess = async () => {
    setError("");
    if (!files.length) return setError("Please select at least one file");

    if (!user.pro && user.count >= 3) {
      return setShowModal(true);
    }

    try {
      setLoading(true);
      const formData = new FormData();
      files.forEach((f) => formData.append("files", f));
      formData.append("tool", tool);
      formData.append("user", user.email);

      const res = await axios.post(
        "https://pdf-toolbox-server.onrender.com/process",
        formData
      );
      setDownloadLink(res.data.download);

      // update count on server
      await axios.post(`https://pdf-toolbox-server.onrender.com/user/${user.email}`, {
        count: user.count + 1,
      });
    } catch (err) {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">{tool}</h2>
      <p className="text-sm mb-2 text-gray-500">Logged in as: {user.email}</p>
      <p className="text-sm mb-4 text-gray-600">
        You’ve used {user.count || 0}/3 free tools {user.pro && "(Pro user)"}
      </p>

      <input
        type="file"
        multiple
        accept=".pdf"
        onChange={(e) => setFiles(Array.from(e.target.files))}
        className="mb-4"
      />

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <div className="flex gap-3">
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded"
          onClick={onBack}
        >
          Back
        </button>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handleProcess}
          disabled={loading}
        >
          {loading ? "Processing..." : "Process"}
        </button>
      </div>

      {downloadLink && (
        <a
          href={downloadLink}
          className="block mt-4 text-blue-700 underline"
          target="_blank"
        >
          Download File
        </a>
      )}

      {showModal && <ProModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
