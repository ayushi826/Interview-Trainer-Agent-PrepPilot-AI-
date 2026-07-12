import axios from "axios";
import { getToken, clearSession } from "./authStorage.js";

// Base URL comes from an environment variable so we can point at
// localhost during development and the Render URL in production.
// Vite exposes env vars prefixed with VITE_ via import.meta.env.
const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach the JWT (once we have one) to every outgoing request automatically.
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// If a request that WAS carrying a token comes back 401, the token is
// expired/invalid - clear the stale session and send the user back to
// login. We only do this when a token was actually sent, so a wrong-
// password 401 on the login form itself doesn't trigger a redirect loop.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const hadToken = Boolean(error.config?.headers?.Authorization);

    if (status === 401 && hadToken) {
      clearSession();
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
