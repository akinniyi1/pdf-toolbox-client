import React, { useState, useEffect } from "react";
import ToolMenu from "./components/ToolMenu";
import ToolAction from "./components/ToolAction";
import WelcomePreview from "./components/WelcomePreview";

function App() {
  const [selectedTool, setSelectedTool] = useState(null);
  const [showPreview, setShowPreview] = useState(true);
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.expand();
    }

    const saved = localStorage.getItem("pdfUsername");
    if (saved) setUsername(saved);
  }, []);

  const handleSelect = (tool) => {
    setSelectedTool(tool);
  };

  const handleBack = () => {
    setSelectedTool(null);
  };

  const handleVideoEnd = () => {
    setShowPreview(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 font-sans">
      <header className="text-center py-6 text-2xl font-bold text-blue-700 shadow">
        PDF Toolbox Bot
        {username && (
          <div className="text-sm text-gray-500 mt-1">👤 {username}</div>
        )}
      </header>

      <div className="max-w-xl mx-auto mt-8 px-4">
        {showPreview ? (
          <WelcomePreview onEnd={handleVideoEnd} />
        ) : !selectedTool ? (
          <ToolMenu onSelect={handleSelect} selected={selectedTool} />
        ) : (
          <ToolAction tool={selectedTool} onBack={handleBack} />
        )}
      </div>
    </div>
  );
}

export default App;
