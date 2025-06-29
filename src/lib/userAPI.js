import axios from "axios";

const BASE = "https://pdf-toolbox-server.onrender.com";

export async function getUserData(id) {
  const res = await axios.get(`${BASE}/user/${id}`);
  return res.data;
}

export async function updateUserData(id, data) {
  const res = await axios.post(`${BASE}/user/${id}`, data);
  return res.data;
}
