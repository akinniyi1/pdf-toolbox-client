import React, { useState, useEffect } from "react";
import ToolMenu from "./components/ToolMenu";
import ToolAction from "./components/ToolAction";

function App() {
  const [selectedTool, setSelectedTool] = useState(null);
  const [showPreview, setShowPreview] = useState(true);

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.expand();
    }

    // Hide preview after 2.5 seconds
    const timer = setTimeout(() => setShowPreview(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleSelect = (tool) => {
    setSelectedTool(tool);
  };

  const handleBack = () => {
    setSelectedTool(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 font-sans">
      <header className="text-center py-6 text-2xl font-bold text-blue-700 shadow">
        PDF Toolbox Bot
      </header>

      <div className="max-w-xl mx-auto mt-8 px-4">
        {showPreview ? (
          <div className="flex justify-center items-center">
            <img
              src="/preview.png"
              alt="PDF merge preview"
              className="rounded-2xl shadow-md w-full max-w-sm"
            />
          </div>
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
