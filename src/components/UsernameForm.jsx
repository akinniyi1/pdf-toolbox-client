import React, { useState } from "react";

function UsernameForm({ onSubmit }) {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim().length < 2) {
      alert("Enter a valid name");
      return;
    }
    onSubmit(name.trim());
  };

  return (
    <div className="flex flex-col items-center justify-center h-[70vh] space-y-4">
      <h2 className="text-xl font-semibold text-blue-700">Welcome to PDF Toolbox</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring focus:border-blue-400"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700"
        >
          Enter PDF Toolbox
        </button>
      </form>
    </div>
  );
}

export default UsernameForm;
