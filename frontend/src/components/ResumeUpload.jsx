import { useRef, useState } from "react";

const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB, matches backend multipart limit

/**
 * Drag-and-drop (or click-to-browse) file picker restricted to PDFs.
 * Calls onFileSelected(file) once a valid file is chosen.
 */
export default function ResumeUpload({ onFileSelected, disabled }) {
  const inputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");

  function validateAndSet(file) {
    if (!file) return;
    if (file.type !== "application/pdf") {
      setError("Only PDF files are supported.");
      return;
    }
    if (file.size > MAX_SIZE_BYTES) {
      setError("File is too large. Max size is 5MB.");
      return;
    }
    setError("");
    setSelectedFile(file);
    onFileSelected?.(file);
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragActive(false);
    if (disabled) return;
    const file = e.dataTransfer.files?.[0];
    validateAndSet(file);
  }

  function handleInputChange(e) {
    const file = e.target.files?.[0];
    validateAndSet(file);
  }

  return (
    <div className="w-full">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        onClick={() => !disabled && inputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition
          ${dragActive ? "border-indigo-500 bg-indigo-50" : "border-slate-300 bg-white"}
          ${disabled ? "opacity-60 cursor-not-allowed" : "hover:border-indigo-400"}`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={handleInputChange}
          disabled={disabled}
        />
        <p className="text-slate-700 font-medium">
          {selectedFile ? selectedFile.name : "Drag & drop your resume here"}
        </p>
        <p className="text-slate-400 text-sm mt-1">
          {selectedFile ? "Click to choose a different file" : "or click to browse (PDF, max 5MB)"}
        </p>
      </div>
      {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
    </div>
  );
}
