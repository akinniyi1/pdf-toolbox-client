// src/components/ProModal.jsx
import React from "react";

export default function ProModal({ user, onClose, onUpgrade }) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg max-w-sm w-full p-6 space-y-4">
        {/* Header */}
        <h2 className="text-xl font-bold text-center text-blue-700">
          Upgrade to Pro
        </h2>

        {/* Show their profile */}
        {user && (
          <div className="flex flex-col items-center space-y-2">
            {user.avatar && (
              <img
                src={user.avatar}
                alt="avatar"
                className="w-16 h-16 rounded-full"
              />
            )}
            <div className="font-semibold">
              @{user.username || user.name}
            </div>
            <div className="text-sm text-gray-500">ID: {user.id}</div>
          </div>
        )}

        {/* Pitch */}
        <p className="text-sm text-gray-600 text-center">
          You’ve reached your free limit. Upgrade to Pro to unlock:
        </p>
        <ul className="list-disc pl-6 text-sm text-gray-700 space-y-1">
          <li>Unlimited PDF edits</li>
          <li>Large file support</li>
          <li>OCR (text extraction)</li>
        </ul>

        {/* Actions */}
        <button
          onClick={() => onUpgrade(user.id)}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-xl shadow"
        >
          🔓 Pay 0.5 TON to Unlock Pro
        </button>
        <button
          onClick={onClose}
          className="w-full text-sm text-gray-500 hover:underline text-center mt-2"
        >
          Maybe later
        </button>
      </div>
    </div>
  );
}
