import { useState } from "react";

/**
 * Shows a single interview question and lets the user type + submit an answer.
 * Calls onSubmit(answerText) when the user clicks Submit.
 */
export default function QuestionCard({ question, index, total, onSubmit, submitting }) {
  const [answer, setAnswer] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!answer.trim()) return;
    onSubmit(answer.trim());
  }

  return (
    <div className="w-full bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
      <p className="text-xs font-semibold text-indigo-600 mb-2 uppercase tracking-wide">
        Question {index + 1} of {total}
      </p>
      <h2 className="text-lg font-semibold text-slate-900 mb-4">{question.text}</h2>

      <form onSubmit={handleSubmit}>
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          rows={6}
          placeholder="Type your answer here..."
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
        />
        <button
          type="submit"
          disabled={!answer.trim() || submitting}
          className="mt-4 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium rounded-md px-5 py-2 transition"
        >
          {submitting ? "Evaluating..." : "Submit Answer"}
        </button>
      </form>
    </div>
  );
}
