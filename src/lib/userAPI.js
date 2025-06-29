import axios from "axios";

const BASE_URL = "https://pdf-toolbox-server.onrender.com";

export async function getUserData(username) {
  const res = await axios.get(`${BASE_URL}/user/${username}`);
  return res.data;
}

export async function updateUserData(username, data) {
  const res = await axios.post(`${BASE_URL}/user/${username}`, data);
  return res.data;
}
