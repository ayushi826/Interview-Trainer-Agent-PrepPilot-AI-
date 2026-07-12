import api from "./api";

/**
 * Uploads a resume PDF for the logged-in user.
 * Expected backend contract: POST /resume/upload (multipart/form-data, field "file")
 * Returns: { id, fileName, extractedText, uploadedAt }
 */
export async function uploadResume(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post("/resume/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
}
