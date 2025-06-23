import React, { useState, useEffect } from "react";
import ToolMenu from "./components/ToolMenu";
import FileUpload from "./components/FileUpload";

function App() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedTool, setSelectedTool] = useState(null);

  const handleFileSelect = (files) => {
    setUploadedFiles(files);
    setSelectedTool(null); // Reset tool on new upload
  };

  const handleToolClick = (tool) => {
    setSelectedTool(tool);
  };

  const handleNext = async () => {
    if (!uploadedFiles.length || !selectedTool) return;

    const formData = new FormData();
    uploadedFiles.forEach((file) => {
      formData.append("files", file);
    });
    formData.append("tool", selectedTool.name);

    try {
      const response = await fetch("https://pdf-toolbox-server.onrender.com/process", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.download) {
        window.open(result.download, "_blank");
      } else {
        alert(result.message || "Done!");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    }
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
        {uploadedFiles.length > 0 && (
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
