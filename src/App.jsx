import React, { useState, useEffect } from "react";
import ToolMenu from "./components/ToolMenu";
import FileUpload from "./components/FileUpload";

function App() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [selectedTool, setSelectedTool] = useState(null);

  const handleFileSelect = (file) => {
    setUploadedFile(file);
    setSelectedTool(null); // Reset tool on new upload
  };

  const handleToolClick = (tool) => {
    setSelectedTool(tool);
  };

  const handleNext = () => {
    if (!uploadedFile || !selectedTool) return;
    alert(`Prepare to ${selectedTool.name} "${uploadedFile.name}"`);
    // 👉 In next step, this will send the file to backend
  };

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.expand();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <header className="text-center py-5 text-xl font-bold text-blue-700">
        PDF Toolbox Bot
      </header>
      <div className="max-w-xl mx-auto space-y-6">
        <FileUpload onFileSelect={handleFileSelect} />
        {uploadedFile && (
          <>
            <ToolMenu onSelect={handleToolClick} selected={selectedTool} />
            <div className="text-center">
              <button
                onClick={handleNext}
                className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-xl shadow hover:bg-blue-700"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
