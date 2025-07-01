import React, { useState, useEffect } from "react";
import axios from "axios";
import WelcomePreview from "./components/WelcomePreview";
import ToolMenu from "./components/ToolMenu";
import ToolAction from "./components/ToolAction";

const API = "https://pdf-toolbox-server.onrender.com";

export default function App() {
  const [showPreview, setShowPreview] = useState(true);
  const [selectedTool, setSelectedTool] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (window.Telegram?.WebApp?.initDataUnsafe?.user) {
      const tg = window.Telegram.WebApp.initDataUnsafe.user;
      const id = `tg_${tg.id}`;
      // upsert basic profile
      axios.post(`${API}/user/${id}`, {
        first_name: tg.first_name,
        username: tg.username,
      });
      // fetch full record
      axios.get(`${API}/user/${id}`).then((r) => {
        setUser({ id, ...r.data });
      });
    }
  }, []);

  const onPreviewEnd = () => setShowPreview(false);
  if (showPreview) return <WelcomePreview onEnd={onPreviewEnd} />;

  if (selectedTool)
    return (
      <ToolAction
        tool={selectedTool}
        onBack={() => setSelectedTool(null)}
        user={user}
      />
    );

  return <ToolMenu onSelect={setSelectedTool} user={user} />;
}
