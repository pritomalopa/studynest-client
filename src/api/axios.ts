import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: `${API_URL}/api`,
  withCredentials: true, // sends the httpOnly JWT cookie
});

export const unwrapApiData = <T>(payload: unknown): T => {
  if (payload && typeof payload === "object" && payload !== null && "data" in payload) {
    const maybeEnvelope = payload as { data?: T };
    if (typeof maybeEnvelope.data !== "undefined") {
      return maybeEnvelope.data as T;
    }
  }

  return payload as T;
};

// Fallback: also attach Bearer token from localStorage if present
// (useful for environments where third-party cookies are blocked)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("studynest_token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
