import React, { useEffect, useState } from "react";

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
  const [user, setUser] = useState(null);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (tg?.initDataUnsafe?.user) {
      const { first_name, username, id, photo_url } = tg.initDataUnsafe.user;
      setUser({ first_name, username, id, photo_url });
    }
  }, []);

  return (
    <div className="space-y-6">
      {user && (
        <div className="bg-white rounded-xl p-4 shadow text-center">
          {user.photo_url && (
            <img
              src={user.photo_url}
              alt="profile"
              className="w-16 h-16 mx-auto rounded-full mb-2"
            />
          )}
          <div className="text-lg font-bold text-blue-600">
            @{user.username || "Unknown"}
          </div>
          <div className="text-sm text-gray-500">
            {user.first_name} | ID: {user.id}
          </div>
        </div>
      )}

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
    </div>
  );
}
