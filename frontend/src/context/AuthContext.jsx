import { createContext, useContext, useEffect, useState } from "react";
import { fetchCurrentUser, loginUser, registerUser } from "../services/authService.js";
import { clearSession, getToken, saveSession } from "../services/authStorage.js";

const AuthContext = createContext(null);

/**
 * Wraps the app and exposes the current logged-in user plus
 * login / register / logout actions to every page via useAuth().
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On first load, don't just trust whatever's cached in localStorage -
  // a token could have expired since the last visit. If a token exists,
  // verify it against the backend (GET /api/auth/me) and use that as the
  // source of truth. If it's invalid, the api.js response interceptor
  // will already clear the stale session on the 401.
  useEffect(() => {
    async function restoreSession() {
      const token = getToken();
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const freshUser = await fetchCurrentUser();
        setUser(freshUser);
      } catch {
        // Token was invalid/expired - fall back to nothing (interceptor
        // already cleared storage for us).
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    restoreSession();
  }, []);

  async function login(credentials) {
    const data = await loginUser(credentials);
    const loggedInUser = { id: data.id, name: data.name, email: data.email };
    saveSession({ token: data.token, user: loggedInUser });
    setUser(loggedInUser);
    return loggedInUser;
  }

  async function register(details) {
    // Backend only returns { message: "Registration successful" } - it does
    // NOT log the user in automatically. The caller (Register page) should
    // show this message and send the user to /login.
    return registerUser(details);
  }

  function logout() {
    clearSession();
    setUser(null);
  }

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Hook for reading/using auth state from any component:
 *   const { user, login, logout, isAuthenticated } = useAuth();
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside an <AuthProvider>");
  }
  return context;
}
