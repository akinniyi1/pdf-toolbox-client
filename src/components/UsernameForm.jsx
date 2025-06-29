import React, { useState } from "react";

function UsernameForm({ onSubmit }) {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return alert("Enter a valid name");
    onSubmit(name.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-2xl shadow">
      <h2 className="text-lg font-semibold text-center text-blue-700">Enter Your Name</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full px-4 py-2 border rounded-xl"
        placeholder="Your name"
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700"
      >
        Continue
      </button>
    </form>
  );
}

export default UsernameForm;
