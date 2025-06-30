import React from "react";

const tools = [
  { name: "Merge PDF", icon: "🔗" },
  { name: "Split PDF", icon: "✂️" },
  { name: "Compress PDF", icon: "📦" },
  { name: "Lock PDF", icon: "🔒" },
  { name: "Unlock PDF", icon: "🔓" },
  { name: "PDF to Word", icon: "📝" },
  { name: "PDF to Image", icon: "🖼️" },
];

export default function ToolMenu({ onSelect }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {tools.map((tool) => (
        <button
          key={tool.name}
          onClick={() => onSelect(tool.name)}
          className="flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow hover:shadow-lg transition"
        >
          <span className="text-4xl">{tool.icon}</span>
          <span className="mt-2 text-sm font-medium">{tool.name}</span>
        </button>
      ))}
    </div>
  );
}
