// src/api/client.ts
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://novusai-backend.onrender.com";

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: false,
});

/**
 * Attach token from sessionStorage to every request
 */
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("novus_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Global 401 handler
 * (AuthContext will react to cleared token)
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      sessionStorage.removeItem("novus_token");
    }
    return Promise.reject(error);
  }
);
