import React, { useState, useEffect } from "react";

function ToolAction({ tool, onBack, user, updateUser }) {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [download, setDownload] = useState("");
  const [error, setError] = useState("");

  const handleProcess = async () => {
    setError("");
    setMessage("");
    setDownload("");

    if (!file) return setError("Please select a file");

    if (!user.pro && user.count >= 3) {
      return setError("Free limit reached. Upgrade to Pro.");
    }

    const formData = new FormData();
    formData.append("tool", tool);
    formData.append("files", file);

    try {
      const res = await fetch("https://pdf-toolbox-server.onrender.com/process", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.error) return setError(data.error);

      setMessage(data.message);
      setDownload(data.download);

      if (!user.pro) {
        const newCount = user.count + 1;
        const updatedUser = { ...user, count: newCount };
        await updateUser(updatedUser);
      }
    } catch (err) {
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-2">{tool}</h2>
      <p className="mb-2">Logged in as: <b>{user.email}</b></p>
      <p className="text-sm mb-4">
        {user.pro ? "Pro User ✅" : `You've used ${user.count}/3 tools (Free limit)`}
      </p>

      <input type="file" onChange={(e) => setFile(e.target.files[0])} className="mb-4" />
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {message && <p className="text-green-600 mb-2">{message}</p>}
      {download && (
        <a
          href={download}
          className="block bg-green-600 text-white text-center p-2 rounded mb-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          Download Result
        </a>
      )}

      <div className="flex gap-4">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handleProcess}
        >
          Process
        </button>
        <button
          className="bg-gray-400 text-white px-4 py-2 rounded"
          onClick={onBack}
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default ToolAction;
