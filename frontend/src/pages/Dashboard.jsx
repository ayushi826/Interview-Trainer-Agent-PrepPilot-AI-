import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { fetchHistory } from "../services/historyService.js";

export default function Dashboard() {
  const { user } = useAuth();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const data = await fetchHistory();
        if (!cancelled) setSessions(data);
      } catch (err) {
        if (!cancelled) {
          setError(err.response?.data?.message || "Could not load dashboard data.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const totalInterviews = sessions.length;
  const averageScore =
    totalInterviews > 0
      ? (
          sessions.reduce((sum, s) => sum + Number(s.averageScore || 0), 0) / totalInterviews
        ).toFixed(1)
      : "0.0";
  const recentSessions = [...sessions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <div className="flex-1 px-4 py-16 flex flex-col items-center">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-slate-900 mb-1">
          Welcome back{user?.name ? `, ${user.name}` : ""}
        </h1>
        <p className="text-slate-500 mb-8">Here's how your interview prep is going.</p>

        {loading && <p className="text-slate-500">Loading...</p>}
        {!loading && error && <p className="text-red-600 text-sm">{error}</p>}

        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
              <StatCard label="Total Interviews" value={totalInterviews} />
              <StatCard label="Average Score" value={`${averageScore}/10`} />
              <StatCard
                label="Best Score"
                value={
                  totalInterviews > 0
                    ? `${Math.max(...sessions.map((s) => Number(s.averageScore || 0)))}/10`
                    : "0/10"
                }
              />
            </div>

            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-900">Recent Interviews</h2>
              <Link to="/history" className="text-sm text-indigo-600 hover:underline">
                View all
              </Link>
            </div>

            {recentSessions.length === 0 ? (
              <div className="text-center bg-white border border-slate-200 rounded-xl p-10">
                <p className="text-slate-500 mb-4">No interviews yet — let's fix that.</p>
                <Link
                  to="/interview"
                  className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-md px-5 py-2 transition"
                >
                  Start an interview
                </Link>
              </div>
            ) : (
              <div className="bg-white border border-slate-200 rounded-xl divide-y divide-slate-100 shadow-sm">
                {recentSessions.map((s) => (
                  <div
                    key={s.sessionId}
                    className="flex items-center justify-between px-4 py-3 text-sm"
                  >
                    <div>
                      <p className="font-medium text-slate-900">{s.jobRole}</p>
                      <p className="text-slate-500 text-xs">
                        {new Date(s.date).toLocaleDateString()}
                      </p>
                    </div>
                    <span className="font-semibold text-indigo-600">{s.averageScore}/10</span>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm text-center">
      <p className="text-2xl font-bold text-slate-900">{value}</p>
      <p className="text-slate-500 text-sm mt-1">{label}</p>
    </div>
  );
}
