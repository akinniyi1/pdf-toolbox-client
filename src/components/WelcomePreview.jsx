import React, { useEffect, useState } from "react";
import { updateUserData } from "../lib/userAPI";

function generateUID() {
  return "user-" + Math.random().toString(36).substring(2, 10);
}

function WelcomePreview({ onEnd }) {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const uid = localStorage.getItem("pdfToolboxUID");
    if (!uid) {
      const newId = generateUID();
      localStorage.setItem("pdfToolboxUID", newId);
    }
  }, []);

  const handleContinue = async () => {
    if (!username.trim()) {
      alert("Please enter your name.");
      return;
    }
    const uid = localStorage.getItem("pdfToolboxUID");
    await updateUserData(uid, { username });
    onEnd();
  };

  return (
    <div className="text-center space-y-4 p-4">
      <video
        src="/preview.mp4"
        className="rounded-xl mx-auto"
        autoPlay
        muted
        onEnded={() => {}}
        controls
      />
      <div>
        <input
          className="border p-2 rounded w-full max-w-xs"
          placeholder="Enter your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          onClick={handleContinue}
          className="mt-2 block mx-auto bg-blue-600 text-white px-4 py-2 rounded-xl"
        >
          Enter PDF Toolbox
        </button>
      </div>
    </div>
  );
}

export default WelcomePreview;
