import axios from "axios";

const BASE_URL = "https://pdf-toolbox-server.onrender.com";

export const registerUser = async (email, password) => {
  const res = await axios.post(`${BASE_URL}/register`, { email, password });
  return res.data;
};

export const loginUser = async (email, password) => {
  const res = await axios.post(`${BASE_URL}/login`, { email, password });
  return res.data;
};

export const getUserData = async (email) => {
  const res = await axios.get(`${BASE_URL}/user/${email}`);
  return res.data;
};

export const updateUserData = async (email, data) => {
  const res = await axios.post(`${BASE_URL}/user/${email}`, data);
  return res.data;
};
