import api from "./api";

/**
 * Generates interview questions for a chosen job role.
 * Expected backend contract: POST /interview/generate { jobRole, resumeId }
 * Returns: { sessionId, jobRole, questions: [{ id, text }] }
 */
export async function generateInterview({ jobRole, resumeId }) {
  const response = await api.post("/interview/generate", { jobRole, resumeId });
  return response.data;
}

/**
 * Submits an answer to a question for AI evaluation.
 * Expected backend contract:
 *   POST /interview/submit { sessionId, questionId, answerText }
 * Returns: { score, strengths: [], weaknesses: [], betterAnswer }
 */
export async function submitAnswer({ sessionId, questionId, answerText }) {
  const response = await api.post("/interview/submit", {
    sessionId,
    questionId,
    answerText,
  });
  return response.data;
}
