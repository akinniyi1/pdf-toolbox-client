import React, { useEffect, useState } from "react";

function AdminPanel({ user, onLogout }) {
  const [users, setUsers] = useState({});
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const resUsers = await fetch(
        `https://pdf-toolbox-server.onrender.com/admin/users?email=${user.email}`
      );
      const dataUsers = await resUsers.json();
      setUsers(dataUsers);

      const resMsgs = await fetch(
        `https://pdf-toolbox-server.onrender.com/admin/messages?email=${user.email}`
      );
      const dataMsgs = await resMsgs.json();
      setMessages(dataMsgs);
    };

    fetchData();
  }, [user]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        <button onClick={onLogout} className="bg-red-500 text-white px-4 py-1 rounded">
          Logout
        </button>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold text-lg">Registered Users</h3>
        <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto max-h-64">
          {JSON.stringify(users, null, 2)}
        </pre>
      </div>

      <div>
        <h3 className="font-semibold text-lg">Support Messages</h3>
        <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto max-h-64">
          {JSON.stringify(messages, null, 2)}
        </pre>
      </div>
    </div>
  );
}

export default AdminPanel;
