// src/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://your-backend-url.onrender.com/api", // 🔴 Replace with your Render backend URL
  withCredentials: true,
});

// Add token automatically to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
