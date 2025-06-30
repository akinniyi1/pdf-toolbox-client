import React, { useState, useEffect } from "react";
import axios from "axios";
import ProModal from "./ProModal";

const BASE_URL = "https://pdf-toolbox-server.onrender.com"; // Your backend

const ToolAction = ({ tool, onBack }) => {
  const [file, setFile] = useState(null);
  const [user, setUser] = useState(null);
  const [showProModal, setShowProModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (tg?.initDataUnsafe?.user) {
      const { id, username, first_name, photo_url } = tg.initDataUnsafe.user;
      const userId = `tg_${id}`;
      const data = {
        id: userId,
        username: username || first_name || "Guest",
        avatar: photo_url || "",
      };
      setUser(data);
      fetchUserInfo(userId);
    }
  }, []);

  const fetchUserInfo = async (userId) => {
    try {
      const res = await axios.get(`${BASE_URL}/user/${userId}`);
      setUser((prev) => ({ ...prev, ...res.data }));
    } catch (err) {
      console.error("Failed to fetch user info:", err);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResponseMsg("");
  };

  const handleProcess = async () => {
    if (!file || !user) return;
    if (!user.pro && user.count >= 3) {
      setShowProModal(true);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("tool", tool.name);
    formData.append("userId", user.id);

    try {
      setLoading(true);
      const res = await axios.post(`${BASE_URL}/process`, formData);
      setResponseMsg(res.data.message || "Processed successfully!");
      await fetchUserInfo(user.id); // Update usage count
    } catch (err) {
      console.error(err);
      setResponseMsg("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white shadow rounded-lg space-y-4">
      <button onClick={onBack} className="text-blue-500 underline">
        ← Back to Menu
      </button>

      <h2 className="text-xl font-bold text-gray-800">{tool.name}</h2>

      {user && (
        <div className="bg-gray-100 p-3 rounded-md">
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Used:</strong> {user.count || 0}/3 tools</p>
          {user.avatar && (
            <img
              src={user.avatar}
              alt="User avatar"
              className="w-16 h-16 rounded-full mt-2"
            />
          )}
        </div>
      )}

      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="block w-full border rounded p-2"
      />

      <button
        onClick={handleProcess}
        className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Processing..." : "Process PDF"}
      </button>

      {responseMsg && (
        <div className="text-center text-sm text-red-500 mt-2">
          {responseMsg}
        </div>
      )}

      <ProModal visible={showProModal} onClose={() => setShowProModal(false)} />
    </div>
  );
};

export default ToolAction;
