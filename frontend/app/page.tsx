"use client";

import { ChangeEvent, FormEvent, useMemo, useState } from "react";

type PreviewRow = Record<string, string | number | boolean | null>;

type UploadResponse = {
  upload_id: string;
  filename: string;
  columns: string[];
  preview: PreviewRow[];
  row_count: number;
};

type AnalysedResponse = {
  original_response: string;
  theme: string;
  sentiment: "positive" | "neutral" | "negative";
  confidence: number;
  reason: string;
};

type AnalysisResult = {
  analysis_id: string;
  results: AnalysedResponse[];
  overall: {
    summary_of_main_themes: string;
    counts_by_theme: Record<string, number>;
    counts_by_sentiment: Record<string, number>;
    executive_summary: string;
  };
  download_url: string;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

async function readApiResponse<T>(response: Response, fallbackMessage: string): Promise<T> {
  let data: unknown = null;

  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    const detail =
      data && typeof data === "object" && "detail" in data
        ? String((data as { detail: unknown }).detail)
        : fallbackMessage;
    throw new Error(detail);
  }

  return data as T;
}

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [upload, setUpload] = useState<UploadResponse | null>(null);
  const [selectedColumn, setSelectedColumn] = useState("");
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalysing, setIsAnalysing] = useState(false);
  const [error, setError] = useState("");

  const previewColumns = useMemo(() => {
    if (!upload?.preview.length) {
      return upload?.columns ?? [];
    }
    return Object.keys(upload.preview[0]);
  }, [upload]);

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const selected = event.target.files?.[0] ?? null;
    setFile(selected);
    setUpload(null);
    setSelectedColumn("");
    setAnalysis(null);
    setError("");
  }

  async function handleUpload(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!file) {
      setError("Choose a CSV or Excel file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setIsUploading(true);
    setError("");
    setAnalysis(null);

    try {
      const response = await fetch(`${API_BASE_URL}/upload`, {
        method: "POST",
        body: formData
      });
      const data = await readApiResponse<UploadResponse>(response, "Upload failed.");
      setUpload(data);
      setSelectedColumn(data.columns[0] ?? "");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Upload failed.");
    } finally {
      setIsUploading(false);
    }
  }

  async function handleAnalyse() {
    if (!upload || !selectedColumn) {
      setError("Upload a file and select a feedback column first.");
      return;
    }

    setIsAnalysing(true);
    setError("");
    setAnalysis(null);

    try {
      const response = await fetch(`${API_BASE_URL}/analyse`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          upload_id: upload.upload_id,
          feedback_column: selectedColumn
        })
      });
      const data = await readApiResponse<AnalysisResult>(response, "Analysis failed.");
      setAnalysis(data);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Analysis failed.");
    } finally {
      setIsAnalysing(false);
    }
  }

  return (
    <main className="shell">
      <section className="workspace">
        <header className="topbar">
          <div>
            <p className="eyebrow">Local MVP</p>
            <h1>AI Survey Feedback Analysis</h1>
          </div>
          <a className="download-link subtle" href={`${API_BASE_URL}/health`} target="_blank">
            API health
          </a>
        </header>

        <section className="panel">
          <form onSubmit={handleUpload} className="upload-row">
            <label className="file-picker">
              <span>CSV or Excel file</span>
              <input accept=".csv,.xls,.xlsx" type="file" onChange={handleFileChange} />
            </label>
            <button type="submit" disabled={isUploading}>
              {isUploading ? "Uploading..." : "Upload and preview"}
            </button>
          </form>
          {file ? <p className="muted">Selected: {file.name}</p> : null}
          {error ? <p className="error">{error}</p> : null}
        </section>

        {upload ? (
          <>
            <section className="grid two">
              <div className="panel">
                <div className="section-heading">
                  <h2>Detected Columns</h2>
                  <span>{upload.columns.length} columns</span>
                </div>
                <div className="column-list">
                  {upload.columns.map((column) => (
                    <button
                      className={selectedColumn === column ? "column active" : "column"}
                      key={column}
                      type="button"
                      onClick={() => setSelectedColumn(column)}
                    >
                      {column}
                    </button>
                  ))}
                </div>
              </div>

              <div className="panel">
                <div className="section-heading">
                  <h2>Feedback Column</h2>
                  <span>{upload.row_count} rows</span>
                </div>
                <select
                  value={selectedColumn}
                  onChange={(event) => setSelectedColumn(event.target.value)}
                >
                  {upload.columns.map((column) => (
                    <option key={column} value={column}>
                      {column}
                    </option>
                  ))}
                </select>
                <button className="analyse-button" type="button" onClick={handleAnalyse} disabled={isAnalysing}>
                  {isAnalysing ? "Analysing..." : "Analyse feedback"}
                </button>
              </div>
            </section>

            <section className="panel">
              <div className="section-heading">
                <h2>Preview</h2>
                <span>First 10 rows from {upload.filename}</span>
              </div>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      {previewColumns.map((column) => (
                        <th key={column}>{column}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {upload.preview.map((row, index) => (
                      <tr key={index}>
                        {previewColumns.map((column) => (
                          <td key={column}>{String(row[column] ?? "")}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        ) : null}

        {analysis ? (
          <section className="results">
            <div className="panel">
              <div className="section-heading">
                <h2>Overall Results</h2>
                <a className="download-link" href={`${API_BASE_URL}${analysis.download_url}`}>
                  Download analysed CSV
                </a>
              </div>
              <p>{analysis.overall.executive_summary}</p>
              <p className="muted">{analysis.overall.summary_of_main_themes}</p>
              <div className="grid two">
                <CountList title="Themes" counts={analysis.overall.counts_by_theme} />
                <CountList title="Sentiment" counts={analysis.overall.counts_by_sentiment} />
              </div>
            </div>

            <section className="panel">
              <div className="section-heading">
                <h2>Analysed Responses</h2>
                <span>{analysis.results.length} responses</span>
              </div>
              <div className="response-list">
                {analysis.results.map((item, index) => (
                  <article className="response-card" key={`${item.original_response}-${index}`}>
                    <div className="response-meta">
                      <span>{item.theme}</span>
                      <span className={`sentiment ${item.sentiment}`}>{item.sentiment}</span>
                      <span>{Math.round(item.confidence * 100)}% confidence</span>
                    </div>
                    <p>{item.original_response}</p>
                    <p className="muted">{item.reason}</p>
                  </article>
                ))}
              </div>
            </section>
          </section>
        ) : null}
      </section>
    </main>
  );
}

function CountList({ title, counts }: { title: string; counts: Record<string, number> }) {
  return (
    <div className="count-box">
      <h3>{title}</h3>
      {Object.entries(counts).map(([label, count]) => (
        <div className="count-row" key={label}>
          <span>{label}</span>
          <strong>{count}</strong>
        </div>
      ))}
    </div>
  );
}
