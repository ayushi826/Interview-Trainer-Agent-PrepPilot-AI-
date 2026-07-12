import api from "./api";

/**
 * Fetches the logged-in user's past interview sessions.
 * Expected backend contract: GET /history
 * Returns: [{ sessionId, jobRole, date, averageScore, questionCount }]
 */
export async function fetchHistory() {
  const response = await api.get("/history");
  return response.data;
}
