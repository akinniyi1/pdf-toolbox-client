import React, { useState, useEffect } from "react";
import ToolMenu from "./components/ToolMenu";
import FileUpload from "./components/FileUpload";

function App() {
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileSelect = (file) => {
    setUploadedFile(file);
    console.log("Selected file:", file);
  };

  // ✅ Telegram WebApp support
  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.expand();
      console.log("Telegram WebApp loaded ✅");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <header className="text-center py-5 text-xl font-bold text-blue-700">
        PDF Toolbox Bot
      </header>
      <div className="max-w-xl mx-auto space-y-6">
        <FileUpload onFileSelect={handleFileSelect} />
        <ToolMenu />
      </div>
    </div>
  );
}

export default App;
