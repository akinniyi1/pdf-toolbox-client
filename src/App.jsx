import React, { useState, useEffect } from "react";
import ToolMenu from "./components/ToolMenu";
import ToolAction from "./components/ToolAction";
import WelcomePreview from "./components/WelcomePreview";
import axios from "axios";

const BACKEND_URL = "https://pdf-toolbox-server.onrender.com";

function App() {
  const [selectedTool, setSelectedTool] = useState(null);
  const [showPreview, setShowPreview] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Expand Telegram WebApp if available
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.expand();
    }
  }, []);

  const handleSelect = (tool) => {
    setSelectedTool(tool);
  };

  const handleBack = () => {
    setSelectedTool(null);
  };

  const handleVideoEnd = async () => {
    setShowPreview(false);

    // Get Telegram user data
    const tgUser = window.Telegram?.WebApp?.initDataUnsafe?.user;

    if (tgUser) {
      const userData = {
        id: `tg_${tgUser.id}`,
        name: tgUser.first_name || "User",
        username: tgUser.username || "",
        photo: tgUser.photo_url || "",
        pro: false,
        count: 0,
      };

      setUser(userData);

      try {
        await axios.post(`${BACKEND_URL}/user/${userData.id}`, userData);
      } catch (error) {
        console.error("Error saving user data:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 font-sans">
      <header className="text-center py-6 text-2xl font-bold text-blue-700 shadow">
        PDF Toolbox Bot
      </header>

      <div className="max-w-xl mx-auto mt-8 px-4">
        {showPreview ? (
          <WelcomePreview onEnd={handleVideoEnd} />
        ) : !selectedTool ? (
          <ToolMenu onSelect={handleSelect} selected={selectedTool} user={user} />
        ) : (
          <ToolAction tool={selectedTool} onBack={handleBack} user={user} />
        )}
      </div>
    </div>
  );
}

export default App;
