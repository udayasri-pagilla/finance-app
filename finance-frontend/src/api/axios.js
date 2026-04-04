import axios from "axios";

const api = axios.create({
  baseURL: "https://finance-app-t8vg.onrender.com/api || http://localhost:5000/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;