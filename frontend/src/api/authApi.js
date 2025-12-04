import axios from "axios";

const API = "http://localhost:5000/api/users";

export const registerUser = async (formData) => {
  try {
    const res = await axios.post(`${API}/register`, formData);
    return res.data;
  } catch (error) {
    return { error: error.response?.data?.message || "Register failed" };
  }
};

export const loginUser = async (formData) => {
  try {
    const res = await axios.post(`${API}/login`, formData);
    return res.data;
  } catch (error) {
    return { error: error.response?.data?.message || "Login failed" };
  }
};
