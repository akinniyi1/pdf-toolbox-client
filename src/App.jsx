import React, { useState, useEffect } from "react";
import ToolMenu from "./components/ToolMenu";
import ToolAction from "./components/ToolAction";
import WelcomePreview from "./components/WelcomePreview";
import UsernameScreen from "./components/UsernameScreen";

function App() {
  const [selectedTool, setSelectedTool] = useState(null);
  const [step, setStep] = useState("preview"); // preview → username → tools

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.expand();
    }
  }, []);

  const handleVideoEnd = () => {
    setStep("username");
  };

  const handleUsernameSubmit = () => {
    setStep("tools");
  };

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
        {step === "preview" ? (
          <WelcomePreview onEnd={handleVideoEnd} />
        ) : step === "username" ? (
          <UsernameScreen onSubmit={handleUsernameSubmit} />
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
