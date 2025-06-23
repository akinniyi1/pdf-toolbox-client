import React from "react";
import ToolMenu from "./components/ToolMenu";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <header className="text-center py-5 text-xl font-bold text-blue-700">
        PDF Toolbox Bot
      </header>
      <ToolMenu />
    </div>
  );
}

export default App;
