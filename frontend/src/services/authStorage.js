// Central place for auth-related localStorage keys so the token/user
// storage logic isn't duplicated (and can't drift out of sync) between
// the Axios interceptor (api.js) and the AuthContext.

export const TOKEN_KEY = "preppilot_token";
export const USER_KEY = "preppilot_user";

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function getStoredUser() {
  const raw = localStorage.getItem(USER_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function saveSession({ token, user }) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}
