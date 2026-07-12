import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

/**
 * Wrap any page element with this to require login:
 *   <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
 * Unauthenticated users are redirected to /login.
 */
export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    // Auth state is still being restored from localStorage - avoid a
    // flash-redirect to /login while we don't yet know if there's a session.
    return (
      <div className="flex-1 flex items-center justify-center py-20 text-slate-500">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
