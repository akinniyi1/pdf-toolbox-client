import React, { useState } from "react";
import WelcomePreview from "./components/WelcomePreview";
import ToolMenu from "./components/ToolMenu";
import ToolAction from "./components/ToolAction";

export default function App() {
  const [showPreview, setShowPreview] = useState(true);
  const [selectedTool, setSelectedTool] = useState(null);

  const handlePreviewEnd = () => setShowPreview(false);
  const handleSelect = (tool) => setSelectedTool(tool);
  const handleBack = () => setSelectedTool(null);

  if (showPreview) return <WelcomePreview onEnd={handlePreviewEnd} />;
  if (selectedTool)
    return <ToolAction tool={selectedTool} onBack={handleBack} />;
  return <ToolMenu onSelect={handleSelect} />;
}
