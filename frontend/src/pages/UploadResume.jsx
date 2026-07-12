import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ResumeUpload from "../components/ResumeUpload.jsx";
import { uploadResume } from "../services/resumeService.js";

export default function UploadResumePage() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  async function handleUpload() {
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const data = await uploadResume(file);
      setResult(data);
      // Remember which resume to use when generating interview questions.
      if (data?.id) {
        localStorage.setItem("preppilot_resume_id", data.id);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Upload failed. Please try again with a valid PDF."
      );
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="flex-1 px-4 py-16 flex flex-col items-center">
      <div className="w-full max-w-xl">
        <h1 className="text-3xl font-bold text-slate-900 mb-2 text-center">Upload Resume</h1>
        <p className="text-slate-500 text-center mb-8">
          Upload your resume as a PDF so PrepPilot can tailor interview questions to your background.
        </p>

        <ResumeUpload onFileSelected={setFile} disabled={uploading} />

        {error && (
          <div className="mt-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-md px-3 py-2">
            {error}
          </div>
        )}

        {result && (
          <div className="mt-4 text-sm text-green-700 bg-green-50 border border-green-200 rounded-md px-3 py-2">
            "{result.fileName}" uploaded successfully.
          </div>
        )}

        <div className="mt-6 flex gap-3 justify-center">
          <button
            onClick={handleUpload}
            disabled={!file || uploading}
            className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium rounded-md px-5 py-2 transition"
          >
            {uploading ? "Uploading..." : "Upload Resume"}
          </button>
          {result && (
            <button
              onClick={() => navigate("/interview")}
              className="bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-md px-5 py-2 transition"
            >
              Continue to Interview
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
