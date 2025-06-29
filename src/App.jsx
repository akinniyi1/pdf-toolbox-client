import React, { useEffect, useState } from "react";
import WelcomePreview from "./components/WelcomePreview";
import LoginRegister from "./components/LoginRegister";
import ToolMenu from "./components/ToolMenu";
import ToolAction from "./components/ToolAction";

function App() {
  const [stage, setStage] = useState("video"); // video -> auth -> tool
  const [selectedTool, setSelectedTool] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("pdf_user");
    if (stored) {
      setUser(JSON.parse(stored));
      setStage("tool");
    }
  }, []);

  const handleVideoEnd = () => {
    if (!user) setStage("auth");
  };

  const handleAuthComplete = (user) => {
    setUser(user);
    localStorage.setItem("pdf_user", JSON.stringify(user));
    setStage("tool");
  };

  const handleSelectTool = (tool) => setSelectedTool(tool);
  const handleBack = () => setSelectedTool(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 text-gray-800">
      <header className="text-center py-4 text-2xl font-bold bg-white shadow">
        PDF Toolbox
      </header>

      <div className="max-w-xl mx-auto mt-6 p-4">
        {stage === "video" && <WelcomePreview onEnd={handleVideoEnd} />}
        {stage === "auth" && <LoginRegister onComplete={handleAuthComplete} />}
        {stage === "tool" && !selectedTool && (
          <ToolMenu onSelect={handleSelectTool} />
        )}
        {stage === "tool" && selectedTool && (
          <ToolAction tool={selectedTool} onBack={handleBack} user={user} />
        )}
      </div>
    </div>
  );
}

export default App;
