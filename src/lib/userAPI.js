import axios from "axios";

const BASE_URL = "https://pdf-toolbox-server.onrender.com";

export async function getUserData(id) {
  try {
    const res = await axios.get(`${BASE_URL}/user/${id}`);
    return res.data;
  } catch (err) {
    console.error("Get user failed:", err.message);
    throw err;
  }
}

export async function updateUserData(id, data) {
  try {
    const res = await axios.post(`${BASE_URL}/user/${id}`, data);
    return res.data;
  } catch (err) {
    console.error("Update user failed:", err.message);
    throw err;
  }
}
