"use client";

import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import {
  AppLayout,
  ContentArea,
  PageHeader,
  SectionHeader,
} from "./components/shell";
import { Badge, Button, Card, EmptyState, ErrorState, LoadingState } from "./components/ui";

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
  report_download_url?: string | null;
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
    <AppLayout activeItem="Analysis">
      <ContentArea>
        <PageHeader
          actions={
            <a className="download-link subtle" href={`${API_BASE_URL}/health`} target="_blank">
              API health
            </a>
          }
          description="Upload survey data, preview columns, analyse free-text feedback, and export executive-ready outputs."
          eyebrow="Local MVP"
          title="AI Survey Feedback Analysis"
        />

        <Card>
          <form onSubmit={handleUpload} className="upload-row">
            <label className="file-picker">
              <span>CSV or Excel file</span>
              <input accept=".csv,.xls,.xlsx" type="file" onChange={handleFileChange} />
            </label>
            <Button type="submit" disabled={isUploading}>
              {isUploading ? "Uploading..." : "Upload and preview"}
            </Button>
          </form>
          {file ? <p className="muted">Selected: {file.name}</p> : null}
          {error ? <ErrorState message={error} /> : null}
        </Card>

        {upload ? (
          <>
            <section className="grid two">
              <Card>
                <SectionHeader detail={`${upload.columns.length} columns`} title="Detected Columns" />
                <div className="column-list">
                  {upload.columns.map((column) => (
                    <Button
                      className={selectedColumn === column ? "column active" : "column"}
                      key={column}
                      type="button"
                      variant="secondary"
                      onClick={() => setSelectedColumn(column)}
                    >
                      {column}
                    </Button>
                  ))}
                </div>
              </Card>

              <Card>
                <SectionHeader detail={`${upload.row_count} rows`} title="Feedback Column" />
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
                <Button className="analyse-button" type="button" onClick={handleAnalyse} disabled={isAnalysing}>
                  {isAnalysing ? "Analysing..." : "Analyse feedback"}
                </Button>
                {isAnalysing ? <LoadingState label="Analysing feedback" /> : null}
              </Card>
            </section>

            <Card>
              <SectionHeader detail={`First 10 rows from ${upload.filename}`} title="Preview" />
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
            </Card>
          </>
        ) : (
          <EmptyState
            description="Choose a CSV or Excel file to inspect the first 10 rows and select a feedback column."
            title="No dataset uploaded yet"
          />
        )}

        {analysis ? (
          <section className="results">
            <Card>
              <SectionHeader
                actions={
                  <div className="download-actions">
                    <a className="download-link" href={`${API_BASE_URL}${analysis.download_url}`}>
                      Download analysed CSV
                    </a>
                    {analysis.report_download_url ? (
                      <a className="download-link subtle" href={`${API_BASE_URL}${analysis.report_download_url}`}>
                        Download PDF report
                      </a>
                    ) : null}
                  </div>
                }
                title="Overall Results"
              />
              <p>{analysis.overall.executive_summary}</p>
              <p className="muted">{analysis.overall.summary_of_main_themes}</p>
              <div className="grid two">
                <CountList title="Themes" counts={analysis.overall.counts_by_theme} />
                <CountList title="Sentiment" counts={analysis.overall.counts_by_sentiment} />
              </div>
            </Card>

            <Card>
              <SectionHeader detail={`${analysis.results.length} responses`} title="Analysed Responses" />
              <div className="response-list">
                {analysis.results.map((item, index) => (
                  <article className="response-card" key={`${item.original_response}-${index}`}>
                    <div className="response-meta">
                      <Badge tone="ai">{item.theme}</Badge>
                      <Badge className={`sentiment ${item.sentiment}`} tone={sentimentTone(item.sentiment)}>
                        {item.sentiment}
                      </Badge>
                      <Badge>{Math.round(item.confidence * 100)}% confidence</Badge>
                    </div>
                    <p>{item.original_response}</p>
                    <p className="muted">{item.reason}</p>
                  </article>
                ))}
              </div>
            </Card>
          </section>
        ) : null}
      </ContentArea>
    </AppLayout>
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

function sentimentTone(sentiment: AnalysedResponse["sentiment"]) {
  if (sentiment === "positive") {
    return "success";
  }
  if (sentiment === "negative") {
    return "danger";
  }
  return "warning";
}
