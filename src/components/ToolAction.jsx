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

  const telegramUserId = window.Telegram?.WebApp?.initDataUnsafe?.user?.id;

  useEffect(() => {
    async function fetchUserStatus() {
      try {
        const user = await getUserData(telegramUserId);
        setUsedCount(user.count || 0);
        setIsPro(user.pro || false);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    }

    if (telegramUserId) {
      fetchUserStatus();
    }
  }, [telegramUserId]);

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
    if (files.length < 1) return;
    if (tool.name === "Merge PDF" && files.length < 2) {
      alert("Select at least 2 PDFs to merge.");
      return;
    }

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
          await updateUserData(telegramUserId, { count: newCount });
        }
      } else {
        alert(result.message || "Done!");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    } finally {
      setProcessing(false);
    }
  };

  const handleUpgrade = async () => {
    setShowProModal(false);
    await updateUserData(telegramUserId, { pro: true });
    setIsPro(true);
  };

  return (
    <div className="bg-white/90 backdrop-blur p-6 rounded-2xl shadow-md space-y-4">
      <button onClick={onBack} className="text-blue-600 underline text-sm">← Back</button>

      <h2 className="text-xl font-semibold text-center">{tool.name}</h2>

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
            processing
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {processing ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Processing...</span>
            </div>
          ) : (
            "Process"
          )}
        </button>
      </div>

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

      {showProModal && (
        <ProModal onClose={() => setShowProModal(false)} onUpgrade={handleUpgrade} />
      )}
    </div>
  );
}

export default ToolAction;
