import React, { useState, useEffect } from "react";
import FileUpload from "./FileUpload";
import ProModal from "./ProModal";
import { getUserData, updateUserData } from "../lib/userAPI";

function ToolAction({ tool, onBack }) {
  const [files, setFiles] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [showProModal, setShowProModal] = useState(false);
  const [userData, setUserData] = useState(null);

  const userId = localStorage.getItem("pdfToolboxUID");

  useEffect(() => {
    const fetchUser = async () => {
      if (userId) {
        try {
          const user = await getUserData(userId);
          setUserData(user);
        } catch (err) {
          console.error("Error fetching user data:", err);
        }
      }
    };
    fetchUser();
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
    if (!userData || !userId) return;

    const isPro = userData.pro && new Date(userData.proUntil) > new Date();
    const usedCount = userData.count || 0;

    if (!isPro && usedCount >= 3) {
      setShowProModal(true);
      return;
    }

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

        if (!isPro) {
          const updated = { ...userData, count: usedCount + 1 };
          await updateUserData(userId, updated);
          setUserData(updated);
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
    const proUntil = new Date();
    proUntil.setDate(proUntil.getDate() + 30); // 30-day Pro

    const updated = { ...userData, pro: true, proUntil: proUntil.toISOString() };
    await updateUserData(userId, updated);
    setUserData(updated);
  };

  if (!userData) return null;

  return (
    <div className="bg-white/90 backdrop-blur p-6 rounded-2xl shadow-md space-y-4">
      <button onClick={onBack} className="text-blue-600 underline text-sm">← Back</button>

      <div className="text-center text-sm text-gray-600">
        <div>👤 <strong>{userData.username}</strong></div>
        <div>ID: <code>{userId}</code></div>
        {userData.pro && (
          <div className="text-green-600">⭐ Pro till: {new Date(userData.proUntil).toLocaleDateString()}</div>
        )}
      </div>

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
