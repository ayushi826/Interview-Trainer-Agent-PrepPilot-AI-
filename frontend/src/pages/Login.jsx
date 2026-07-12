import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function validate() {
    const newErrors = {};
    if (!form.email.trim()) newErrors.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) newErrors.email = "Enter a valid email.";
    if (!form.password) newErrors.password = "Password is required.";
    return newErrors;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setServerError("");
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSubmitting(true);
    try {
      await login(form);
      navigate("/dashboard");
    } catch (err) {
      setServerError(
        err.response?.data?.message || "Login failed. Check your credentials and try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex flex-1 items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm bg-white shadow-sm border border-slate-200 rounded-xl p-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Welcome back</h1>
        <p className="text-slate-500 text-sm mb-6">Log in to keep practicing.</p>

        {serverError && (
          <div className="mb-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-md px-3 py-2">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="you@example.com"
            />
            {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="••••••••"
            />
            {errors.password && <p className="text-red-600 text-xs mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium rounded-md py-2 transition"
          >
            {submitting ? "Logging in..." : "Log in"}
          </button>
        </form>

        <p className="text-sm text-slate-500 mt-6 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-indigo-600 font-medium hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
