// src/App.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import WelcomePreview from "./components/WelcomePreview";
import ToolMenu from "./components/ToolMenu";
import ToolAction from "./components/ToolAction";

const API_URL = "https://pdf-toolbox-server.onrender.com";

export default function App() {
  const [showPreview, setShowPreview] = useState(true);
  const [selectedTool, setSelectedTool] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    window.Telegram?.WebApp?.expand();

    const tgUser = window.Telegram?.WebApp?.initDataUnsafe?.user;
    if (tgUser) {
      const id = `tg_${tgUser.id}`;
      const profile = {
        id,
        name: tgUser.first_name,
        username: tgUser.username,
        avatar: tgUser.photo_url || "",
      };

      // Upsert to backend
      axios.post(`${API_URL}/user/${id}`, profile).catch(console.error);

      // Fetch their full record (including count/pro)
      axios
        .get(`${API_URL}/user/${id}`)
        .then((res) => setUser({ id, ...res.data }))
        .catch(console.error);
    }
  }, []);

  const handlePreviewEnd = () => setShowPreview(false);
  const handleSelect = (toolName) => setSelectedTool(toolName);
  const handleBack = () => setSelectedTool(null);

  if (showPreview) {
    return <WelcomePreview onEnd={handlePreviewEnd} />;
  }

  if (selectedTool) {
    return (
      <ToolAction
        tool={selectedTool}
        onBack={handleBack}
        user={user}
      />
    );
  }

  return <ToolMenu onSelect={handleSelect} user={user} />;
}
