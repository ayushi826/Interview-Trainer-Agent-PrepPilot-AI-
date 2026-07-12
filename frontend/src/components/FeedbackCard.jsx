/**
 * Displays the AI evaluation of a submitted answer.
 * feedback shape: { score, strengths: [], weaknesses: [], betterAnswer }
 */
export default function FeedbackCard({ feedback, onNext, isLastQuestion }) {
  const score = feedback.score ?? 0;

  const scoreColor =
    score >= 8 ? "text-green-600" : score >= 5 ? "text-amber-600" : "text-red-600";

  return (
    <div className="w-full bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-900">AI Feedback</h3>
        <span className={`text-2xl font-bold ${scoreColor}`}>{score}/10</span>
      </div>

      {feedback.strengths?.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-green-700 mb-1">Strengths</h4>
          <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
            {feedback.strengths.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        </div>
      )}

      {feedback.weaknesses?.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-red-700 mb-1">Areas to Improve</h4>
          <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
            {feedback.weaknesses.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        </div>
      )}

      {feedback.betterAnswer && (
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-indigo-700 mb-1">A Stronger Answer</h4>
          <p className="text-sm text-slate-700 bg-indigo-50 border border-indigo-100 rounded-md p-3">
            {feedback.betterAnswer}
          </p>
        </div>
      )}

      <button
        onClick={onNext}
        className="mt-2 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-md px-5 py-2 transition"
      >
        {isLastQuestion ? "Finish Interview" : "Next Question"}
      </button>
    </div>
  );
}
