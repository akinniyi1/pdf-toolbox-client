import React from "react";

const tools = [
  { name: "Merge PDF", icon: "🔗" },
  { name: "Split PDF", icon: "✂️" },
  { name: "Compress PDF", icon: "📦" },
];

export default function ToolMenu({ onSelect }) {
  return (
    <div className="max-w-md mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold text-center text-blue-700">
        PDF Toolbox
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
        {tools.map((t) => (
          <button
            key={t.name}
            onClick={() => onSelect(t.name)}
            className="flex flex-col items-center p-4 bg-white rounded-xl shadow hover:shadow-lg transition"
          >
            <span className="text-4xl">{t.icon}</span>
            <span className="mt-2 text-sm font-medium">{t.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
