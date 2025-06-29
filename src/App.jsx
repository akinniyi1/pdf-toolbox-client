import React, { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import SupportChat from "./components/SupportChat";
import ToolMenu from "./components/ToolMenu";
import ToolAction from "./components/ToolAction";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  const [user, setUser] = useState(null);
  const [selectedTool, setSelectedTool] = useState(null);
  const [page, setPage] = useState("login"); // login, register, support, tools, admin

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.expand();
    }
  }, []);

  if (!user) {
    if (page === "login") return <LoginForm onSuccess={setUser} onSwitch={() => setPage("register")} />;
    if (page === "register") return <RegisterForm onSuccess={setUser} onSwitch={() => setPage("login")} />;
    return null;
  }

  if (user.isAdmin) return <AdminDashboard user={user} onLogout={() => setUser(null)} />;

  return (
    <div className="min-h-screen bg-gray-100 font-sans p-4 max-w-xl mx-auto">
      <header className="text-center py-6 text-xl font-bold text-blue-600">
        PDF Toolbox Bot
      </header>

      <div className="flex justify-between mb-4">
        <button onClick={() => setPage("support")} className="text-sm text-blue-500 underline">Support</button>
        <button onClick={() => setUser(null)} className="text-sm text-red-500 underline">Logout</button>
      </div>

      {page === "support" ? (
        <SupportChat email={user.email} />
      ) : selectedTool ? (
        <ToolAction tool={selectedTool} userEmail={user.email} onBack={() => setSelectedTool(null)} />
      ) : (
        <ToolMenu onSelect={setSelectedTool} />
      )}
    </div>
  );
}

export default App;
