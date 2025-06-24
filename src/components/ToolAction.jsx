import React, { useState } from "react";
import FileUpload from "./FileUpload";

function ToolAction({ tool, onBack }) {
  const [files, setFiles] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");

  const handleFileAdd = (file) => {
    // avoid duplicates by name
    setFiles((prev) => {
      if (prev.find((f) => f.name === file.name && f.size === file.size)) {
        return prev;
      }
      return [...prev, file];
    });
  };

  const handleReset = () => {
    setFiles([]);
    setDownloadUrl("");
  };

  const handleProcess = async () => {
    // validation
    if (files.length < 1) return;
    if (tool.name === "Merge PDF" && files.length < 2) {
      alert("Select at least 2 PDFs to merge.");
      return;
    }

    setProcessing(true);
    setDownloadUrl("");

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));
    formData.append("tool", tool.name);

    try {
      const resp = await fetch("https://pdf-toolbox-server.onrender.com/process", {
        method: "POST",
        body: formData,
      });
      const result = await resp.json();
      if (result.download) {
        setDownloadUrl(result.download);
      } else if (result.error) {
        alert(result.error);
      } else {
        alert(result.message || "Done!");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur p-6 rounded-2xl shadow-md space-y-4">
      <button
        onClick={onBack}
        className="text-blue-600 underline text-sm"
      >
        ← Back
      </button>
      <h2 className="text-xl font-semibold">{tool.name}</h2>

      <FileUpload
        files={files}
        onFileAdd={handleFileAdd}
        onReset={handleReset}
      />

      <button
        onClick={handleProcess}
        disabled={
          processing ||
          files.length < 1 ||
          (tool.name === "Merge PDF" && files.length < 2)
        }
        className={`w-full mt-2 px-4 py-2 rounded-xl shadow text-white font-medium transition ${
          processing
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {processing ? "Processing..." : "Process"}
      </button>

      {downloadUrl && (
        <div className="mt-4 text-center">
          <a
            href={downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-600 text-white px-6 py-2 rounded-xl shadow hover:bg-green-700 transition"
          >
            Download {tool.name}
          </a>
        </div>
      )}
    </div>
  );
}

export default ToolAction;
