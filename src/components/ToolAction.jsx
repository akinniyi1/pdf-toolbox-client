import React, { useState, useEffect } from "react";
import FileUpload from "./FileUpload";
import ProModal from "./ProModal";
import { getUserData, updateUserData } from "../lib/userAPI";

function ToolAction({ tool, onBack }) {
  const [files, setFiles] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [showProModal, setShowProModal] = useState(false);
  const [usedCount, setUsedCount] = useState(0);
  const [isPro, setIsPro] = useState(false);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    async function fetchUser() {
      const data = await getUserData(userId);
      setUsedCount(data.count || 0);
      setIsPro(data.pro || false);
    }
    if (userId) fetchUser();
  }, [userId]);

  const handleFileAdd = (file) => {
    setFiles((prev) => {
      if (prev.find((f) => f.name === file.name && f.size === file.size)) return prev;
      return [...prev, file];
    });
  };

  const handleReset = () => {
    setFiles([]);
    setDownloadUrl("");
  };

  const handleProcess = async () => {
    if (!userId) return alert("User ID not found");
    if (!isPro && usedCount >= 3) {
      setShowProModal(true);
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

        if (!isPro) {
          const newCount = usedCount + 1;
          setUsedCount(newCount);
          await updateUserData(userId, { count: newCount });
        }
      } else {
        alert(result.message || "Failed");
      }
    } catch (err) {
      alert("Something went wrong.");
    } finally {
      setProcessing(false);
    }
  };

  const handleUpgrade = async () => {
    await updateUserData(userId, {
      pro: true,
      proUntil: Date.now() + 7 * 24 * 60 * 60 * 1000,
    });
    setIsPro(true);
    setShowProModal(false);
  };

  return (
    <div className="bg-white/90 backdrop-blur p-6 rounded-2xl shadow-md space-y-4">
      <button onClick={onBack} className="text-blue-600 underline text-sm">← Back</button>

      <h2 className="text-xl font-semibold text-center">{tool.name}</h2>

      <p className="text-center text-sm text-gray-600">
        ID: {userId} <br /> You’ve used {usedCount}/3 tools {isPro && "(Pro User)"}
      </p>

      <FileUpload files={files} onFileAdd={handleFileAdd} onReset={handleReset} />

      <div className="text-center">
        <button
          onClick={handleProcess}
          disabled={
            processing ||
            files.length < 1 ||
            (tool.name === "Merge PDF" && files.length < 2)
          }
          className={`w-full mt-2 px-4 py-2 rounded-xl shadow text-white font-medium transition ${
            processing ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {processing ? "Processing..." : "Process"}
        </button>
      </div>

      {downloadUrl && (
        <div className="mt-4 text-center">
          <a
            href={downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-600 text-white px-6 py-2 rounded-xl shadow hover:bg-green-700"
          >
            Download
          </a>
        </div>
      )}

      {showProModal && (
        <ProModal onClose={() => setShowProModal(false)} onUpgrade={handleUpgrade} />
      )}
    </div>
  );
}

export default ToolAction;
