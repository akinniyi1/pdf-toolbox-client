import React from "react";

const tools = [
  { name: "Merge PDF", emoji: "🧩" },
  { name: "Split PDF", emoji: "✂️" },
  { name: "Compress PDF", emoji: "📦" },
  { name: "Protect PDF", emoji: "🔐" },
  { name: "Unlock PDF", emoji: "🔓" },
  { name: "PDF to Word", emoji: "📝" },
  { name: "PDF to Excel", emoji: "📊" },
  { name: "PDF to Image", emoji: "🖼️" }
];

const ToolMenu = ({ onSelect, selected }) => {
  return (
    <div className="grid grid-cols-2 gap-4 p-6">
      {tools.map((tool) => (
        <button
          key={tool.name}
          onClick={() => onSelect(tool)}
          className={`bg-white rounded-xl p-4 flex items-center gap-3 text-left transition border ${
            selected?.name === tool.name
              ? "border-blue-600 ring-2 ring-blue-300"
              : "border-transparent"
          }`}
        >
          <span className="text-2xl">{tool.emoji}</span>
          <span className="text-sm font-medium">{tool.name}</span>
        </button>
      ))}
    </div>
  );
};

export default ToolMenu;
