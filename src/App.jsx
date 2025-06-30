import React, { useState, useEffect } from "react";
import WelcomePreview from "./components/WelcomePreview";
import ToolMenu from "./components/ToolMenu";
import ToolAction from "./components/ToolAction";
import ProModal from "./components/ProModal";

function App() {
  const [showPreview, setShowPreview] = useState(true);
  const [selectedTool, setSelectedTool] = useState(null);

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.expand();
    }
  }, []);

  const handlePreviewEnd = () => setShowPreview(false);
  const handleSelect = (tool) => setSelectedTool(tool);
  const handleBack = () => setSelectedTool(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white font-sans">
      <header className="text-center py-5 text-3xl font-bold text-blue-700 shadow-md">
        PDF Toolbox Bot
      </header>

      <main className="max-w-3xl mx-auto px-4 mt-6">
        {showPreview ? (
          <WelcomePreview onEnd={handlePreviewEnd} />
        ) : selectedTool ? (
          <ToolAction tool={selectedTool} onBack={handleBack} />
        ) : (
          <ToolMenu onSelect={handleSelect} />
        )}
      </main>

      <ProModal />
    </div>
  );
}

export default App;
