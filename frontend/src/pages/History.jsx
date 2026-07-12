import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchHistory } from "../services/historyService.js";

export default function History() {
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
          setError(
            err.response?.data?.message || "Could not load your interview history."
          );
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

  return (
    <div className="flex-1 px-4 py-16 flex flex-col items-center">
      <div className="w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-slate-900 mb-2 text-center">
          Interview History
        </h1>
        <p className="text-slate-500 text-center mb-8">
          Every past mock interview, with your average score.
        </p>

        {loading && <p className="text-slate-500 text-center">Loading...</p>}

        {!loading && error && (
          <p className="text-red-600 text-sm text-center">{error}</p>
        )}

        {!loading && !error && sessions.length === 0 && (
          <div className="text-center bg-white border border-slate-200 rounded-xl p-10">
            <p className="text-slate-500 mb-4">You haven't completed any interviews yet.</p>
            <Link
              to="/interview"
              className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-md px-5 py-2 transition"
            >
              Start your first interview
            </Link>
          </div>
        )}

        {!loading && !error && sessions.length > 0 && (
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-100 text-slate-600 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3">Job Role</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Questions</th>
                  <th className="px-4 py-3">Avg. Score</th>
                </tr>
              </thead>
              <tbody>
                {sessions.map((s) => (
                  <tr key={s.sessionId} className="border-t border-slate-100">
                    <td className="px-4 py-3 font-medium text-slate-900">{s.jobRole}</td>
                    <td className="px-4 py-3 text-slate-600">
                      {new Date(s.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-slate-600">{s.questionCount}</td>
                    <td className="px-4 py-3 font-semibold text-indigo-600">
                      {s.averageScore}/10
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
