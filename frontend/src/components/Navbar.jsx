import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

/**
 * Top navigation bar shown on every page.
 * Shows Dashboard/Upload/Interview/History + Logout when logged in,
 * or Login/Register when logged out.
 */
export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <nav className="w-full bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
      <Link to="/" className="text-xl font-bold tracking-tight">
        PrepPilot <span className="text-indigo-400">AI</span>
      </Link>

      <div className="flex items-center gap-6 text-sm font-medium">
        {isAuthenticated ? (
          <>
            <Link to="/dashboard" className="hover:text-indigo-400 transition">
              Dashboard
            </Link>
            <Link to="/upload-resume" className="hover:text-indigo-400 transition">
              Upload Resume
            </Link>
            <Link to="/interview" className="hover:text-indigo-400 transition">
              Interview
            </Link>
            <Link to="/history" className="hover:text-indigo-400 transition">
              History
            </Link>
            <span className="text-slate-400 hidden sm:inline">
              Hi, {user?.name || "there"}
            </span>
            <button
              onClick={handleLogout}
              className="bg-indigo-600 hover:bg-indigo-500 transition px-3 py-1.5 rounded-md"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-indigo-400 transition">
              Login
            </Link>
            <Link
              to="/register"
              className="bg-indigo-600 hover:bg-indigo-500 transition px-3 py-1.5 rounded-md"
            >
              Sign up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
