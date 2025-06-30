import React, { useState, useEffect } from "react";
import ToolMenu from "./components/ToolMenu";
import ToolAction from "./components/ToolAction";
import WelcomePreview from "./components/WelcomePreview";
import axios from "axios";

const BASE_URL = "https://pdf-toolbox-server.onrender.com";

function App() {
  const [selectedTool, setSelectedTool] = useState(null);
  const [showPreview, setShowPreview] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.expand();

      const id = `tg_${tg.initDataUnsafe?.user?.id}`;
      const username = tg.initDataUnsafe?.user?.username || "";
      const first_name = tg.initDataUnsafe?.user?.first_name || "";
      const photo_url = username
        ? `https://t.me/i/userpic/320/${username}.jpg`
        : "";

      // Fetch or create user
      axios
        .post(`${BASE_URL}/user/${id}`, {
          first_name,
          username,
          photo_url,
        })
        .then(() => {
          return axios.get(`${BASE_URL}/user/${id}`);
        })
        .then((res) => {
          setUser({ ...res.data, id });
        })
        .catch(() => {
          alert("❌ Failed to load user");
        });
    }
  }, []);

  const handleVideoEnd = () => setShowPreview(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 font-sans">
      <header className="text-center py-6 text-2xl font-bold text-blue-700 shadow">
        PDF Toolbox Bot
      </header>

      <div className="max-w-xl mx-auto mt-8 px-4">
        {showPreview ? (
          <WelcomePreview onEnd={handleVideoEnd} />
        ) : !selectedTool ? (
          <ToolMenu onSelect={setSelectedTool} user={user} />
        ) : (
          <ToolAction tool={selectedTool} onBack={() => setSelectedTool(null)} user={user} />
        )}
      </div>
    </div>
  );
}

export default App;
