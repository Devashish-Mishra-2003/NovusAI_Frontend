// src/pages/ScanPage.tsx
import React, { useState } from "react";

type UploadState = "idle" | "uploading" | "done" | "error";

const ScanPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [notes, setNotes] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setUploadState("idle");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setUploadState("uploading");
    try {
      // TODO: send to backend for analysis
      await new Promise((res) => setTimeout(res, 1200));
      setUploadState("done");
    } catch {
      setUploadState("error");
    }
  };

  return (
    <div className="min-h-screen bg-base-100 flex flex-col">
      {/* Header */}
      <header className="border-b border-base-200 px-4 md:px-6 py-3 flex justify-between items-center">
        <div>
          <h1 className="text-lg md:text-xl font-semibold">
            Scan with Novus<span className="text-primary">AI</span>
          </h1>
          <p className="text-xs md:text-sm text-base-content/60">
            Upload internal docs, research papers, patents and more for deep analysis.
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 px-4 md:px-6 py-6">
        <div className="max-w-4xl mx-auto grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)]">
          {/* Upload card */}
          <form
            onSubmit={handleSubmit}
            className="card bg-base-100 border border-dashed border-primary/40 shadow-sm"
          >
            <div className="card-body gap-4">
              <h2 className="card-title text-sm md:text-base">
                Upload a document for analysis
              </h2>
              <p className="text-xs md:text-sm text-base-content/60">
                Drag and drop internal docs, research papers, technical reports, or patents.
              </p>

              <label
                htmlFor="scan-file-input"
                className="flex flex-col items-center justify-center gap-2 border border-dashed border-base-300 rounded-xl py-8 px-4 text-center cursor-pointer hover:border-primary/60 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  ⬆
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">
                    Click to browse or drop a file
                  </p>
                  <p className="text-xs text-base-content/60">
                    PDF, DOCX, TXT up to 10MB
                  </p>
                </div>
                <input
                  id="scan-file-input"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>

              {file && (
                <div className="mt-2 text-xs md:text-sm flex items-center justify-between gap-2 rounded-lg bg-base-200/60 px-3 py-2">
                  <span className="truncate">{file.name}</span>
                  <span className="text-[11px] uppercase text-base-content/60">
                    {uploadState === "uploading"
                      ? "Analyzing..."
                      : uploadState === "done"
                      ? "Ready to view"
                      : uploadState === "error"
                      ? "Error"
                      : "Selected"}
                  </span>
                </div>
              )}

              <div className="form-control mt-2">
                <label className="label">
                  <span className="label-text text-xs md:text-sm">
                    Optional instructions for NovusAI
                  </span>
                </label>
                <textarea
                  rows={3}
                  className="textarea textarea-bordered text-sm"
                  placeholder="E.g. 'Summarize this paper, extract key insights, and list potential applications.'"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>

              <div className="card-actions justify-end mt-2">
                <button
                  type="submit"
                  className="btn btn-primary btn-sm md:btn-md"
                  disabled={!file || uploadState === "uploading"}
                >
                  {uploadState === "uploading" ? "Scanning..." : "Scan with AI"}
                </button>
              </div>
            </div>
          </form>

          {/* Right side: results placeholder */}
          <section className="card bg-base-100 border border-base-200 shadow-sm">
            <div className="card-body gap-3">
              <h2 className="card-title text-sm md:text-base">
                Analysis output
              </h2>
              <p className="text-xs md:text-sm text-base-content/60">
                NovusAI will analyze your internal docs, research papers, or patents and show structured insights here.
              </p>
              <div className="mt-2 text-xs md:text-sm text-base-content/60">
                <p className="opacity-70">
                  No scan yet. Upload a document and run a scan to see the analysis.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default ScanPage;
