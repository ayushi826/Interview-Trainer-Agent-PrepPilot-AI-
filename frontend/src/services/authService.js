import api from "./api";

/**
 * Registers a new user.
 * Backend contract: POST /api/auth/register { name, email, password }
 * Returns: { message } - registration does NOT log the user in.
 */
export async function registerUser({ name, email, password }) {
  const response = await api.post("/auth/register", { name, email, password });
  return response.data;
}

/**
 * Logs an existing user in.
 * Backend contract: POST /api/auth/login { email, password }
 * Returns: { token, id, name, email }
 */
export async function loginUser({ email, password }) {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
}

/**
 * Fetches the currently logged-in user using the stored JWT.
 * Backend contract: GET /api/auth/me (Authorization: Bearer <token>)
 * Returns: { id, name, email, role }
 */
export async function fetchCurrentUser() {
  const response = await api.get("/auth/me");
  return response.data;
}
