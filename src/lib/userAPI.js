import axios from "axios";

const BASE_URL = "https://your-server-url.onrender.com"; // Replace with your actual backend URL

export async function getUserData(userId) {
  const res = await axios.get(`${BASE_URL}/user/${userId}`);
  return res.data;
}

export async function updateUserData(userId, newData) {
  await axios.post(`${BASE_URL}/user/${userId}`, newData);
}
