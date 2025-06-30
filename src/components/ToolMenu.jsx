import React from "react";

function ToolMenu({ onSelect, user }) {
  return (
    <div className="text-center">
      {user && (
        <div className="bg-white p-4 rounded shadow mb-6">
          <h2 className="text-xl font-bold mb-2">👤 Your Profile</h2>
          {user.photo_url && (
            <img
              src={user.photo_url}
              alt="profile"
              className="w-20 h-20 rounded-full mx-auto mb-2"
            />
          )}
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>Name:</strong> {user.first_name}</p>
          <p><strong>Username:</strong> @{user.username}</p>
          <p><strong>Pro:</strong> {user.pro ? "✅ Yes" : "❌ No"}</p>
          {user.proUntil && (
            <p><strong>Pro Expiry:</strong> {new Date(user.proUntil).toLocaleString()}</p>
          )}
        </div>
      )}

      <h3 className="text-lg font-semibold mb-2">📄 Choose a PDF Tool</h3>
      <div className="grid gap-2">
        <button className="btn" onClick={() => onSelect("Compress PDF")}>Compress PDF</button>
        <button className="btn" onClick={() => onSelect("Split PDF")}>Split PDF</button>
        <button className="btn" onClick={() => onSelect("Merge PDF")}>Merge PDF</button>
      </div>
    </div>
  );
}

export default ToolMenu;
