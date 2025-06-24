import React from "react";

const tools = [
  { name: "Merge PDF", emoji: "📎" },
  { name: "Split PDF", emoji: "✂️" },
  { name: "Compress PDF", emoji: "🗜️" },
  { name: "Protect PDF", emoji: "🔐" },
  { name: "Unlock PDF", emoji: "🔓" },
  { name: "PDF to Word", emoji: "📝" },
  { name: "PDF to Image", emoji: "📷" },
];

function ToolMenu({ onSelect, selected }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {tools.map((tool) => (
        <button
          key={tool.name}
          onClick={() => onSelect(tool)}
          className={`p-4 text-left rounded-xl shadow border transition font-medium text-sm ${
            selected?.name === tool.name
              ? "bg-blue-600 text-white"
              : "bg-white hover:bg-blue-50 text-gray-800"
          }`}
        >
          <span className="text-lg mr-2">{tool.emoji}</span>
          {tool.name}
        </button>
      ))}
    </div>
  );
}

export default ToolMenu;
