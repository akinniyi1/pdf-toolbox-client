import React, { useState } from "react";

export default function ToolAction({ tool, onBack }) {
  const [files, setFiles] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files).filter((f) => f.name.endsWith(".pdf")));
  };

  const handleProcess = async () => {
    setError("");
    if (!files.length) return setError("Please select at least one PDF.");

    setProcessing(true);
    const form = new FormData();
    files.forEach((f) => form.append("files", f));
    form.append("tool", tool);

    try {
      const res = await fetch("https://pdf-toolbox-server.onrender.com/process", {
        method: "POST",
        body: form,
      });
      const data = await res.json();
      if (data.download) {
        setDownloadUrl(data.download);
      } else {
        setError(data.error || "Processing failed");
      }
    } catch {
      setError("Network error");
    }
    setProcessing(false);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-4">
      <button onClick={onBack} className="text-blue-600 underline">← Back</button>
      <h2 className="text-xl font-semibold text-center">{tool}</h2>

      <input
        type="file"
        accept=".pdf"
        multiple
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-700 mb-2"
      />

      {error && <p className="text-red-500">{error}</p>}

      <button
        onClick={handleProcess}
        disabled={processing}
        className={`w-full py-2 rounded text-white ${
          processing ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {processing ? "Processing..." : "Process"}
      </button>

      {downloadUrl && (
        <a
          href={downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center text-green-600 underline mt-2"
        >
          Download Result
        </a>
      )}
    </div>
  );
}
