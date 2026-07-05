"use client";

import { ChangeEvent, DragEvent, FormEvent, RefObject, useMemo, useRef, useState } from "react";
import { SectionHeader } from "./shell";
import { Badge, Button, Card, EmptyState, ErrorState, LoadingState } from "./ui";

type PreviewRow = Record<string, string | number | boolean | null>;

type ColumnType =
  | "qualitative_text"
  | "numeric"
  | "rating"
  | "categorical"
  | "boolean"
  | "date"
  | "unknown";

type ColumnRole =
  | "feedback_column"
  | "rating_column"
  | "segment_column"
  | "date_column"
  | "identifier_column"
  | "ignore";

type ColumnProfile = {
  column_name: string;
  inferred_type: ColumnType;
  non_empty_count: number;
  missing_count: number;
  unique_count: number;
  sample_values: string[];
  suggested_role: ColumnRole;
};

type UploadResponse = {
  upload_id: string;
  filename: string;
  columns: string[];
  preview: PreviewRow[];
  row_count: number;
  column_profiles: ColumnProfile[];
  feedback_column?: string | null;
  feedback_columns?: string[];
};

type AnalysedResponse = {
  original_response: string;
  theme: string;
  sentiment: "positive" | "neutral" | "negative";
  confidence: number;
  reason: string;
  source_row_index?: number | null;
  source_feedback_column?: string | null;
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
  selected_feedback_columns?: string[];
  quantitative_summary?: Record<string, unknown>;
  cross_analysis?: unknown;
  enhanced_executive_summary?: string | null;
};

type ColumnConfig = {
  enabled: boolean;
  role: ColumnRole;
};

type AnalysisOptions = {
  themes: boolean;
  sentiment: boolean;
  confidence: boolean;
  executiveSummary: boolean;
  recommendedActions: boolean;
  crossAnalysis: boolean;
  quantitativeSummary: boolean;
  pdfReport: boolean;
  csvExport: boolean;
};

type WizardStep = "upload" | "profile" | "columns" | "options" | "review" | "processing" | "results";

type DatasetIntelligenceWizardProps = {
  apiBaseUrl: string;
};

const wizardSteps: Array<{ id: WizardStep; label: string }> = [
  { id: "upload", label: "Upload" },
  { id: "profile", label: "Dataset Profile" },
  { id: "columns", label: "Column Selection" },
  { id: "options", label: "Analysis Options" },
  { id: "review", label: "Review" },
  { id: "processing", label: "Run Analysis" },
];

const defaultOptions: AnalysisOptions = {
  themes: true,
  sentiment: true,
  confidence: true,
  executiveSummary: true,
  recommendedActions: true,
  crossAnalysis: true,
  quantitativeSummary: true,
  pdfReport: true,
  csvExport: true,
};

const roleLabels: Record<ColumnRole, string> = {
  feedback_column: "Feedback column",
  rating_column: "Rating column",
  segment_column: "Segment column",
  date_column: "Date column",
  identifier_column: "Identifier column",
  ignore: "Ignore",
};

const typeLabels: Record<ColumnType, string> = {
  qualitative_text: "Qualitative text",
  numeric: "Numeric",
  rating: "Rating",
  categorical: "Categorical",
  boolean: "Boolean",
  date: "Date",
  unknown: "Unknown",
};

const genericErrorMessage = "Something went wrong. Please try again or check the uploaded file.";
const maxUserErrorLength = 500;

async function readApiResponse<T>(response: Response, fallbackMessage: string): Promise<T> {
  let data: unknown = null;

  const contentType = response.headers.get("content-type")?.toLowerCase() ?? "";
  if (contentType.includes("application/json")) {
    try {
      data = await response.json();
    } catch {
      data = null;
    }
  } else {
    try {
      data = await response.text();
    } catch {
      data = null;
    }
  }

  if (!response.ok) {
    throw new Error(userFacingErrorMessage(data, fallbackMessage));
  }

  return data as T;
}

function userFacingErrorMessage(value: unknown, fallbackMessage = genericErrorMessage): string {
  const fallback = sanitizeUserMessage(fallbackMessage, genericErrorMessage);
  const message = extractErrorMessage(value, fallback);

  if (message === fallback && isUnrecognisedErrorObject(value)) {
    logSafeErrorDetails(value);
  }

  return message;
}

function extractErrorMessage(value: unknown, fallbackMessage: string): string {
  if (typeof value === "string") {
    return sanitizeUserMessage(value, fallbackMessage);
  }

  if (value instanceof Error) {
    return sanitizeUserMessage(value.message, fallbackMessage);
  }

  if (Array.isArray(value)) {
    const messages = value
      .map((item) => extractErrorMessage(item, ""))
      .filter(Boolean);
    return sanitizeUserMessage(messages.join("; "), fallbackMessage);
  }

  const record = asRecord(value);
  if (!Object.keys(record).length) {
    return fallbackMessage;
  }

  if ("detail" in record) {
    return extractErrorMessage(record.detail, fallbackMessage);
  }

  if ("error" in record) {
    return extractErrorMessage(record.error, fallbackMessage);
  }

  if (typeof record.message === "string") {
    return sanitizeUserMessage(record.message, fallbackMessage);
  }

  if (typeof record.msg === "string") {
    const location = Array.isArray(record.loc)
      ? record.loc.map((item) => String(item)).filter(Boolean).join(".")
      : "";
    const message = location ? `${location}: ${record.msg}` : record.msg;
    return sanitizeUserMessage(message, fallbackMessage);
  }

  return fallbackMessage;
}

function sanitizeUserMessage(message: string, fallbackMessage: string): string {
  const trimmed = message.trim();
  if (!trimmed) {
    return fallbackMessage;
  }

  if (containsInternalDetails(trimmed)) {
    return fallbackMessage;
  }

  return trimmed.length > maxUserErrorLength ? `${trimmed.slice(0, maxUserErrorLength)}...` : trimmed;
}

function containsInternalDetails(message: string) {
  return (
    /Traceback \(most recent call last\)/i.test(message) ||
    /\bFile ".*", line \d+/i.test(message) ||
    /\bat\s+\S+\s+\(/.test(message) ||
    /[A-Z]:[\\/]+Users[\\/]/i.test(message) ||
    /\/Users\/|\/home\/|\/var\/|\/tmp\//i.test(message) ||
    /\bsk-[A-Za-z0-9_-]{12,}/.test(message)
  );
}

function isUnrecognisedErrorObject(value: unknown) {
  return typeof value === "object" && value !== null && !Array.isArray(value) && !(value instanceof Error);
}

function logSafeErrorDetails(value: unknown) {
  if (process.env.NODE_ENV === "production") {
    return;
  }

  console.warn("SurveyIQ received an unreadable API error payload.", redactErrorPayload(value));
}

function redactErrorPayload(value: unknown, depth = 0): unknown {
  if (depth > 3) {
    return "[Truncated]";
  }
  if (value instanceof Error) {
    return {
      name: value.name,
      message: containsInternalDetails(value.message) ? "[Redacted]" : value.message.slice(0, maxUserErrorLength),
    };
  }
  if (typeof value === "string") {
    return containsInternalDetails(value) ? "[Redacted]" : value.slice(0, maxUserErrorLength);
  }
  if (Array.isArray(value)) {
    return value.slice(0, 10).map((item) => redactErrorPayload(item, depth + 1));
  }
  const record = asRecord(value);
  if (!Object.keys(record).length) {
    return "[Unserializable]";
  }
  return Object.fromEntries(
    Object.entries(record).map(([key, item]) => [
      key,
      /key|token|secret|password|authorization/i.test(key) ? "[Redacted]" : redactErrorPayload(item, depth + 1),
    ]),
  );
}

export function DatasetIntelligenceWizard({ apiBaseUrl }: DatasetIntelligenceWizardProps) {
  const [step, setStep] = useState<WizardStep>("upload");
  const [file, setFile] = useState<File | null>(null);
  const [upload, setUpload] = useState<UploadResponse | null>(null);
  const [columnConfig, setColumnConfig] = useState<Record<string, ColumnConfig>>({});
  const [analysisOptions, setAnalysisOptions] = useState<AnalysisOptions>(defaultOptions);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalysing, setIsAnalysing] = useState(false);
  const [error, setError] = useState("");
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const columnProfiles = useMemo(() => upload?.column_profiles ?? [], [upload]);
  const selectedQualitativeColumns = useMemo(
    () =>
      columnProfiles
        .filter((profile) => {
          const config = columnConfig[profile.column_name];
          return config?.enabled && config.role === "feedback_column";
        })
        .map((profile) => profile.column_name),
    [columnConfig, columnProfiles],
  );
  const selectedSegmentColumns = useMemo(
    () => selectedColumnsForRole(columnProfiles, columnConfig, "segment_column"),
    [columnConfig, columnProfiles],
  );
  const selectedRatingColumns = useMemo(
    () => selectedColumnsForRole(columnProfiles, columnConfig, "rating_column"),
    [columnConfig, columnProfiles],
  );
  const previewColumns = useMemo(() => {
    if (!upload?.preview.length) {
      return upload?.columns ?? [];
    }
    return Object.keys(upload.preview[0]);
  }, [upload]);
  const datasetStats = useMemo(() => buildDatasetStats(columnProfiles), [columnProfiles]);
  const estimates = useMemo(
    () => buildEstimates(columnProfiles, selectedQualitativeColumns, upload?.row_count ?? 0),
    [columnProfiles, selectedQualitativeColumns, upload?.row_count],
  );

  function resetForNewFile(nextFile: File | null) {
    setFile(nextFile);
    setUpload(null);
    setColumnConfig({});
    setAnalysis(null);
    setError("");
    setStep("upload");
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    resetForNewFile(event.target.files?.[0] ?? null);
  }

  function handleDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setIsDragActive(false);
    const droppedFile = event.dataTransfer.files?.[0] ?? null;
    if (droppedFile) {
      resetForNewFile(droppedFile);
    }
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
      const response = await fetch(`${apiBaseUrl}/upload`, {
        method: "POST",
        body: formData,
      });
      const data = normalizeUploadResponse(await readApiResponse<unknown>(response, "Upload failed."), file.name);
      setUpload(data);
      setColumnConfig(buildInitialColumnConfig(data.column_profiles, data.feedback_columns ?? []));
      setStep("profile");
    } catch (caught) {
      setError(userFacingErrorMessage(caught, "Upload failed. Please check the file and try again."));
    } finally {
      setIsUploading(false);
    }
  }

  async function handleAnalyse() {
    if (!upload) {
      setError("Upload a dataset before starting analysis.");
      setStep("upload");
      return;
    }
    if (!selectedQualitativeColumns.length) {
      setError("Enable at least one qualitative feedback column before analysis.");
      setStep("columns");
      return;
    }

    setIsAnalysing(true);
    setError("");
    setAnalysis(null);
    setStep("processing");

    try {
      const response = await fetch(`${apiBaseUrl}/analyse`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          upload_id: upload.upload_id,
          feedback_column: selectedQualitativeColumns[0],
          feedback_columns: selectedQualitativeColumns,
        }),
      });
      const data = await readApiResponse<AnalysisResult>(response, "Analysis failed.");
      setAnalysis(data);
      setStep("results");
    } catch (caught) {
      setError(userFacingErrorMessage(caught, "Analysis failed. Please review your selections and try again."));
      setStep("review");
    } finally {
      setIsAnalysing(false);
    }
  }

  function updateColumnConfig(columnName: string, updates: Partial<ColumnConfig>) {
    setColumnConfig((current) => ({
      ...current,
      [columnName]: {
        ...current[columnName],
        ...updates,
      },
    }));
  }

  function canContinueFromCurrentStep() {
    if (step === "upload") {
      return Boolean(file);
    }
    if (step === "columns" || step === "review") {
      return selectedQualitativeColumns.length > 0;
    }
    return true;
  }

  return (
    <section className="wizard-shell" id="analysis">
      <WizardProgress currentStep={step} />
      {error ? <ErrorState message={error} /> : null}

      {step === "upload" ? (
        <UploadStep
          file={file}
          isDragActive={isDragActive}
          isUploading={isUploading}
          onBrowse={() => fileInputRef.current?.click()}
          onDragEnter={() => setIsDragActive(true)}
          onDragLeave={() => setIsDragActive(false)}
          onDragOver={(event) => event.preventDefault()}
          onDrop={handleDrop}
          onFileChange={handleFileChange}
          onSubmit={handleUpload}
          fileInputRef={fileInputRef}
        />
      ) : null}

      {step === "profile" && upload ? (
        <DatasetProfileStep
          stats={datasetStats}
          upload={upload}
          previewColumns={previewColumns}
          onBack={() => setStep("upload")}
          onContinue={() => setStep("columns")}
        />
      ) : null}

      {step === "columns" && upload ? (
        <ColumnIntelligenceStep
          columnConfig={columnConfig}
          profiles={columnProfiles}
          selectedQualitativeColumns={selectedQualitativeColumns}
          onBack={() => setStep("profile")}
          onContinue={() => setStep("options")}
          onUpdateColumn={updateColumnConfig}
        />
      ) : null}

      {step === "options" ? (
        <AnalysisOptionsStep
          estimates={estimates}
          options={analysisOptions}
          onBack={() => setStep("columns")}
          onContinue={() => setStep("review")}
          onToggle={(option) =>
            setAnalysisOptions((current) => ({
              ...current,
              [option]: !current[option],
            }))
          }
        />
      ) : null}

      {step === "review" && upload ? (
        <ReviewStep
          estimates={estimates}
          options={analysisOptions}
          selectedQualitativeColumns={selectedQualitativeColumns}
          selectedRatingColumns={selectedRatingColumns}
          selectedSegmentColumns={selectedSegmentColumns}
          upload={upload}
          onBack={() => setStep("options")}
          onStartAnalysis={handleAnalyse}
          canStart={canContinueFromCurrentStep() && !isAnalysing}
        />
      ) : null}

      {step === "processing" ? (
        <ProcessingStep
          estimatedTime={estimates.processingTimeLabel}
          isAnalysing={isAnalysing}
        />
      ) : null}

      {step === "results" && analysis ? (
        <ResultsStep
          analysis={analysis}
          apiBaseUrl={apiBaseUrl}
          options={analysisOptions}
          onStartNew={() => resetForNewFile(null)}
        />
      ) : null}
    </section>
  );
}

function UploadStep({
  file,
  fileInputRef,
  isDragActive,
  isUploading,
  onBrowse,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDrop,
  onFileChange,
  onSubmit,
}: {
  file: File | null;
  fileInputRef: RefObject<HTMLInputElement | null>;
  isDragActive: boolean;
  isUploading: boolean;
  onBrowse: () => void;
  onDragEnter: () => void;
  onDragLeave: () => void;
  onDragOver: (event: DragEvent<HTMLLabelElement>) => void;
  onDrop: (event: DragEvent<HTMLLabelElement>) => void;
  onFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <Card className="wizard-card upload-card">
      <form onSubmit={onSubmit}>
        <label
          className={isDragActive ? "upload-dropzone is-active" : "upload-dropzone"}
          htmlFor="surveyiq-upload-input"
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDragOver={onDragOver}
          onDrop={onDrop}
        >
          <span className="upload-icon" aria-hidden="true">Upload</span>
          <strong>Drop your survey dataset here</strong>
          <span>SurveyIQ profiles every column, recommends feedback fields, and prepares executive-ready AI analysis.</span>
          <input
            accept=".csv,.xls,.xlsx"
            id="surveyiq-upload-input"
            onChange={onFileChange}
            ref={fileInputRef}
            type="file"
          />
        </label>

        <div className="upload-actions">
          <Button type="button" variant="secondary" onClick={onBrowse}>
            Browse files
          </Button>
          <a className="download-link subtle" download href="/surveyiq-sample-dataset.csv">
            Download sample dataset
          </a>
          <Button type="submit" disabled={isUploading || !file}>
            {isUploading ? "Uploading..." : "Upload dataset"}
          </Button>
        </div>

        <div className="upload-guidance" aria-label="Upload guidance">
          <span>Supported formats: CSV, Excel (.xlsx)</span>
          <span>Maximum file size: 25 MB for local MVP testing</span>
          {file ? <strong>Selected: {file.name}</strong> : <span>No file selected</span>}
        </div>
      </form>
    </Card>
  );
}

function DatasetProfileStep({
  onBack,
  onContinue,
  previewColumns,
  stats,
  upload,
}: {
  onBack: () => void;
  onContinue: () => void;
  previewColumns: string[];
  stats: DatasetStats;
  upload: UploadResponse;
}) {
  return (
    <>
      <section className="metric-grid">
        <MetricCard label="Dataset" value={upload.filename} />
        <MetricCard label="Rows" value={String(upload.row_count)} />
        <MetricCard label="Columns" value={String(upload.columns.length)} />
        <MetricCard label="Missing values" value={String(stats.missingValues)} />
        <MetricCard label="Duplicate rows" value="Not reported by current API" />
        <MetricCard label="Recommended feedback fields" value={String(stats.feedbackColumns)} />
      </section>

      <Card className="wizard-card">
        <SectionHeader title="Detected column types" detail="SurveyIQ profiling summary" />
        <div className="type-summary-grid">
          {Object.entries(stats.typeCounts).map(([type, count]) => (
            <div className="type-summary" key={type}>
              <span>{typeLabels[type as ColumnType] ?? type}</span>
              <strong>{count}</strong>
            </div>
          ))}
        </div>
      </Card>

      <Card className="wizard-card">
        <SectionHeader title="Preview" detail={`First ${upload.preview.length} rows`} />
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

      <WizardActions onBack={onBack} onContinue={onContinue} />
    </>
  );
}

function ColumnIntelligenceStep({
  columnConfig,
  onBack,
  onContinue,
  onUpdateColumn,
  profiles,
  selectedQualitativeColumns,
}: {
  columnConfig: Record<string, ColumnConfig>;
  onBack: () => void;
  onContinue: () => void;
  onUpdateColumn: (columnName: string, updates: Partial<ColumnConfig>) => void;
  profiles: ColumnProfile[];
  selectedQualitativeColumns: string[];
}) {
  const groups = groupColumnProfiles(profiles);

  return (
    <>
      <Card className="wizard-card">
        <SectionHeader
          title="Column Intelligence"
          detail={`${selectedQualitativeColumns.length} qualitative feedback columns selected`}
        />
        <p className="muted">
          SurveyIQ preselects recommended roles. You can disable a column, change its role, or ignore it before analysis.
        </p>
      </Card>

      {groups.map((group) => (
        <Card className="wizard-card" key={group.title}>
          <SectionHeader title={group.title} detail={`${group.columns.length} columns`} />
          <div className="column-intelligence-list">
            {group.columns.map((profile) => {
              const config = columnConfig[profile.column_name] ?? {
                enabled: false,
                role: "ignore" as ColumnRole,
              };
              return (
                <article className="column-intelligence-row" key={profile.column_name}>
                  <label className="column-enable">
                    <input
                      checked={config.enabled}
                      onChange={(event) =>
                        onUpdateColumn(profile.column_name, {
                          enabled: event.target.checked,
                          role: event.target.checked && config.role === "ignore" ? profile.suggested_role : config.role,
                        })
                      }
                      type="checkbox"
                    />
                    <span>
                      <strong>{profile.column_name}</strong>
                      <small>{profile.sample_values.slice(0, 3).join(", ") || "No sample values"}</small>
                    </span>
                  </label>
                  <div className="column-meta">
                    <Badge tone="ai">{typeLabels[profile.inferred_type]}</Badge>
                    <Badge>{roleLabels[profile.suggested_role]}</Badge>
                    <Badge tone={recommendationTone(recommendationConfidence(profile))}>
                      {Math.round(recommendationConfidence(profile) * 100)}% confidence
                    </Badge>
                  </div>
                  <label className="role-selector">
                    <span className="sr-only">Role for {profile.column_name}</span>
                    <select
                      value={config.role}
                      onChange={(event) =>
                        onUpdateColumn(profile.column_name, {
                          enabled: event.target.value !== "ignore",
                          role: event.target.value as ColumnRole,
                        })
                      }
                    >
                      {Object.entries(roleLabels).map(([role, label]) => (
                        <option key={role} value={role}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </label>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => onUpdateColumn(profile.column_name, { enabled: false, role: "ignore" })}
                  >
                    Ignore
                  </Button>
                </article>
              );
            })}
          </div>
        </Card>
      ))}

      <WizardActions
        continueDisabled={selectedQualitativeColumns.length === 0}
        onBack={onBack}
        onContinue={onContinue}
      />
    </>
  );
}

function AnalysisOptionsStep({
  estimates,
  onBack,
  onContinue,
  onToggle,
  options,
}: {
  estimates: AnalysisEstimates;
  onBack: () => void;
  onContinue: () => void;
  onToggle: (option: keyof AnalysisOptions) => void;
  options: AnalysisOptions;
}) {
  const optionRows: Array<{ key: keyof AnalysisOptions; label: string; description: string }> = [
    { key: "themes", label: "Generate Themes", description: "Group responses into canonical business themes." },
    { key: "sentiment", label: "Generate Sentiment", description: "Classify responses as positive, neutral, or negative." },
    { key: "confidence", label: "Generate Confidence Scores", description: "Show certainty for AI assignments." },
    { key: "executiveSummary", label: "Executive Summary", description: "Produce leadership-ready summary text." },
    { key: "recommendedActions", label: "Recommended Actions", description: "Create practical next steps from feedback patterns." },
    { key: "crossAnalysis", label: "Cross-analysis", description: "Use available segment and rating context." },
    { key: "quantitativeSummary", label: "Quantitative Summary", description: "Summarize numeric and rating columns." },
    { key: "pdfReport", label: "PDF Report", description: "Generate a management-ready PDF report." },
    { key: "csvExport", label: "CSV Export", description: "Generate analysed response-level CSV output." },
  ];

  return (
    <>
      <Card className="wizard-card">
        <SectionHeader title="Analysis Options" detail={`Estimated processing time: ${estimates.processingTimeLabel}`} />
        <div className="option-grid">
          {optionRows.map((item) => (
            <label className="option-card" key={item.key}>
              <input checked={options[item.key]} onChange={() => onToggle(item.key)} type="checkbox" />
              <span>
                <strong>{item.label}</strong>
                <small>{item.description}</small>
              </span>
            </label>
          ))}
        </div>
      </Card>
      <WizardActions onBack={onBack} onContinue={onContinue} />
    </>
  );
}

function ReviewStep({
  canStart,
  estimates,
  onBack,
  onStartAnalysis,
  options,
  selectedQualitativeColumns,
  selectedRatingColumns,
  selectedSegmentColumns,
  upload,
}: {
  canStart: boolean;
  estimates: AnalysisEstimates;
  onBack: () => void;
  onStartAnalysis: () => void;
  options: AnalysisOptions;
  selectedQualitativeColumns: string[];
  selectedRatingColumns: string[];
  selectedSegmentColumns: string[];
  upload: UploadResponse;
}) {
  return (
    <>
      <Card className="wizard-card">
        <SectionHeader title="Review Analysis Setup" detail={upload.filename} />
        <div className="review-grid">
          <ReviewBlock title="Selected qualitative columns" values={selectedQualitativeColumns} />
          <ReviewBlock title="Selected segment columns" values={selectedSegmentColumns} emptyLabel="None selected" />
          <ReviewBlock title="Selected rating columns" values={selectedRatingColumns} emptyLabel="None selected" />
          <ReviewBlock title="Reports to generate" values={selectedReports(options)} />
          <MetricCard label="Estimated responses" value={String(estimates.responseCount)} />
          <MetricCard label="Estimated OpenAI calls" value={estimates.openAiCallsLabel} />
          <MetricCard label="Estimated processing time" value={estimates.processingTimeLabel} />
        </div>
      </Card>
      <div className="wizard-actions">
        <Button type="button" variant="secondary" onClick={onBack}>
          Back
        </Button>
        <Button type="button" disabled={!canStart} onClick={onStartAnalysis}>
          Start Analysis
        </Button>
      </div>
    </>
  );
}

function ProcessingStep({
  estimatedTime,
  isAnalysing,
}: {
  estimatedTime: string;
  isAnalysing: boolean;
}) {
  const stages = [
    "Uploading",
    "Profiling",
    "AI Analysis",
    "Theme Consolidation",
    "Cross-analysis",
    "Executive Summary",
    "PDF Generation",
  ];

  return (
    <Card className="wizard-card processing-card">
      <SectionHeader title="Analysis in progress" detail={`Estimated duration: ${estimatedTime}`} />
      {isAnalysing ? <LoadingState label="SurveyIQ is analysing your dataset" /> : null}
      <p className="muted">
        Live backend progress is not available in this local MVP yet. The analysis is running, and results will appear automatically when the backend completes.
      </p>
      <ol className="processing-stage-list" aria-label="Processing stages">
        {stages.map((stage, index) => (
          <li className={index < 2 ? "complete" : index === 2 ? "active" : ""} key={stage}>
            <span>{stage}</span>
          </li>
        ))}
      </ol>
    </Card>
  );
}

function ResultsStep({
  analysis,
  apiBaseUrl,
  onStartNew,
  options,
}: {
  analysis: AnalysisResult;
  apiBaseUrl: string;
  onStartNew: () => void;
  options: AnalysisOptions;
}) {
  return (
    <section className="results" id="results">
      <Card className="wizard-card">
        <SectionHeader
          actions={
            <div className="download-actions">
              {options.csvExport ? (
                <a className="download-link" href={`${apiBaseUrl}${analysis.download_url}`}>
                  Download analysed CSV
                </a>
              ) : null}
              {options.pdfReport && analysis.report_download_url ? (
                <a className="download-link subtle" href={`${apiBaseUrl}${analysis.report_download_url}`}>
                  Download PDF report
                </a>
              ) : null}
              <Button type="button" variant="secondary" onClick={onStartNew}>
                Start new analysis
              </Button>
            </div>
          }
          title="Analysis Results"
        />
        <p>{analysis.enhanced_executive_summary || analysis.overall.executive_summary}</p>
        <p className="muted">{analysis.overall.summary_of_main_themes}</p>
        <div className="grid two">
          <CountList title="Themes" counts={analysis.overall.counts_by_theme} />
          <CountList title="Sentiment" counts={analysis.overall.counts_by_sentiment} />
        </div>
      </Card>

      <Card className="wizard-card">
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
                {item.source_feedback_column ? <Badge>{item.source_feedback_column}</Badge> : null}
              </div>
              <p>{item.original_response}</p>
              <p className="muted">{item.reason}</p>
            </article>
          ))}
        </div>
      </Card>
    </section>
  );
}

function WizardProgress({ currentStep }: { currentStep: WizardStep }) {
  const currentIndex =
    currentStep === "results" ? wizardSteps.length : wizardSteps.findIndex((item) => item.id === currentStep);

  return (
    <nav className="wizard-progress" aria-label="Analysis progress">
      {wizardSteps.map((item, index) => {
        const status = index < currentIndex ? "complete" : index === currentIndex ? "current" : "pending";
        return (
          <div className={`wizard-progress-step ${status}`} key={item.id} aria-current={status === "current" ? "step" : undefined}>
            <span>{index + 1}</span>
            <strong>{item.label}</strong>
          </div>
        );
      })}
    </nav>
  );
}

function WizardActions({
  continueDisabled = false,
  onBack,
  onContinue,
}: {
  continueDisabled?: boolean;
  onBack: () => void;
  onContinue: () => void;
}) {
  return (
    <div className="wizard-actions">
      <Button type="button" variant="secondary" onClick={onBack}>
        Back
      </Button>
      <Button type="button" disabled={continueDisabled} onClick={onContinue}>
        Continue
      </Button>
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="metric-card">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function ReviewBlock({
  emptyLabel = "None",
  title,
  values,
}: {
  emptyLabel?: string;
  title: string;
  values: string[];
}) {
  return (
    <div className="review-block">
      <h3>{title}</h3>
      {values.length ? (
        <div className="badge-list">
          {values.map((value) => (
            <Badge key={value}>{value}</Badge>
          ))}
        </div>
      ) : (
        <p className="muted">{emptyLabel}</p>
      )}
    </div>
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

type DatasetStats = {
  feedbackColumns: number;
  missingValues: number;
  typeCounts: Partial<Record<ColumnType, number>>;
};

type AnalysisEstimates = {
  openAiCallsLabel: string;
  processingTimeLabel: string;
  responseCount: number;
};

function buildInitialColumnConfig(
  profiles: ColumnProfile[],
  recommendedFeedbackColumns: string[] = [],
): Record<string, ColumnConfig> {
  const recommendedFeedback = new Set(recommendedFeedbackColumns);
  return profiles.reduce<Record<string, ColumnConfig>>((acc, profile) => {
    const isRecommendedFeedback =
      profile.suggested_role === "feedback_column" ||
      profile.inferred_type === "qualitative_text" ||
      recommendedFeedback.has(profile.column_name);
    acc[profile.column_name] = {
      enabled: isRecommendedFeedback || profile.suggested_role !== "ignore",
      role: isRecommendedFeedback ? "feedback_column" : profile.suggested_role,
    };
    return acc;
  }, {});
}

function buildDatasetStats(profiles: ColumnProfile[]): DatasetStats {
  return {
    feedbackColumns: profiles.filter((profile) => profile.suggested_role === "feedback_column").length,
    missingValues: profiles.reduce((total, profile) => total + profile.missing_count, 0),
    typeCounts: profiles.reduce<Partial<Record<ColumnType, number>>>((acc, profile) => {
      acc[profile.inferred_type] = (acc[profile.inferred_type] ?? 0) + 1;
      return acc;
    }, {}),
  };
}

function buildEstimates(
  profiles: ColumnProfile[],
  selectedQualitativeColumns: string[],
  rowCount: number,
): AnalysisEstimates {
  const selectedProfiles = profiles.filter((profile) => selectedQualitativeColumns.includes(profile.column_name));
  const responseCount = selectedProfiles.length
    ? selectedProfiles.reduce((total, profile) => total + profile.non_empty_count, 0)
    : rowCount;
  const batches = Math.max(1, Math.ceil(Math.max(responseCount, 1) / 50));
  const estimatedCalls = 3 * batches + 2;
  const estimatedSeconds = Math.max(45, estimatedCalls * 14);
  return {
    openAiCallsLabel: `Approximately ${estimatedCalls}`,
    processingTimeLabel: `${Math.ceil(estimatedSeconds / 60)}-${Math.ceil(estimatedSeconds / 60) + 1} minutes`,
    responseCount,
  };
}

function selectedColumnsForRole(
  profiles: ColumnProfile[],
  columnConfig: Record<string, ColumnConfig>,
  role: ColumnRole,
) {
  return profiles
    .filter((profile) => {
      const config = columnConfig[profile.column_name];
      return config?.enabled && config.role === role;
    })
    .map((profile) => profile.column_name);
}

function groupColumnProfiles(profiles: ColumnProfile[]) {
  const groupDefinitions = [
    { title: "Qualitative Columns", matcher: (profile: ColumnProfile) => profile.inferred_type === "qualitative_text" },
    { title: "Rating Columns", matcher: (profile: ColumnProfile) => profile.inferred_type === "rating" },
    { title: "Numeric Columns", matcher: (profile: ColumnProfile) => profile.inferred_type === "numeric" },
    {
      title: "Categorical Columns",
      matcher: (profile: ColumnProfile) => profile.inferred_type === "categorical" || profile.inferred_type === "boolean",
    },
    { title: "Date Columns", matcher: (profile: ColumnProfile) => profile.inferred_type === "date" },
    { title: "Identifier Columns", matcher: (profile: ColumnProfile) => profile.suggested_role === "identifier_column" },
    { title: "Other Columns", matcher: (profile: ColumnProfile) => profile.inferred_type === "unknown" },
  ];

  const assigned = new Set<string>();
  return groupDefinitions
    .map((group) => {
      const columns = profiles.filter((profile) => {
        if (assigned.has(profile.column_name) || !group.matcher(profile)) {
          return false;
        }
        assigned.add(profile.column_name);
        return true;
      });
      return { ...group, columns };
    })
    .filter((group) => group.columns.length > 0);
}

function selectedReports(options: AnalysisOptions) {
  return [
    options.csvExport ? "Analysed CSV" : null,
    options.pdfReport ? "Management PDF" : null,
    options.executiveSummary ? "Executive summary" : null,
    options.recommendedActions ? "Recommended actions" : null,
    options.quantitativeSummary ? "Quantitative summary" : null,
    options.crossAnalysis ? "Cross-analysis" : null,
  ].filter(Boolean) as string[];
}

function recommendationConfidence(profile: ColumnProfile) {
  if (profile.suggested_role === "ignore") {
    return 0.62;
  }
  if (
    (profile.inferred_type === "qualitative_text" && profile.suggested_role === "feedback_column") ||
    (profile.inferred_type === "rating" && profile.suggested_role === "rating_column") ||
    (profile.inferred_type === "date" && profile.suggested_role === "date_column")
  ) {
    return 0.92;
  }
  if (profile.suggested_role === "segment_column" || profile.suggested_role === "identifier_column") {
    return 0.84;
  }
  return 0.72;
}

function recommendationTone(confidence: number) {
  if (confidence >= 0.9) {
    return "success";
  }
  if (confidence >= 0.75) {
    return "ai";
  }
  return "warning";
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

function normalizeUploadResponse(raw: unknown, fallbackFilename: string): UploadResponse {
  const record = asRecord(raw);
  const preview = normalisePreview(record.preview);
  const columns = stringArray(record.columns).length
    ? stringArray(record.columns)
    : preview.length
      ? Object.keys(preview[0])
      : [];
  const rowCount = numberValue(record.row_count) ?? numberValue(record.rowCount) ?? numberValue(record.rows) ?? preview.length;
  const feedbackColumns = uniqueStrings([
    ...stringArray(record.feedback_columns),
    ...stringArray(record.feedbackColumns),
    ...stringArray(record.recommended_feedback_columns),
    ...stringArray(record.recommendedFeedbackColumns),
    ...singleStringArray(record.feedback_column),
    ...singleStringArray(record.feedbackColumn),
  ]);
  const profileRecords = firstRecordArray([
    record.column_profiles,
    record.columnProfiles,
    record.profiles,
    asRecord(record.dataset_profile).column_profiles,
    asRecord(record.datasetProfile).columnProfiles,
    asRecord(record.profile).column_profiles,
  ]);

  return {
    upload_id:
      stringValue(record.upload_id) ??
      stringValue(record.uploadId) ??
      stringValue(record.file_id) ??
      stringValue(record.fileId) ??
      "",
    filename: stringValue(record.filename) ?? fallbackFilename,
    columns,
    preview,
    row_count: rowCount,
    column_profiles: normalizeColumnProfiles(profileRecords, columns, preview, rowCount, feedbackColumns),
    feedback_column: feedbackColumns[0] ?? null,
    feedback_columns: feedbackColumns,
  };
}

function normalizeColumnProfiles(
  profileRecords: Record<string, unknown>[],
  columns: string[],
  preview: PreviewRow[],
  rowCount: number,
  recommendedFeedbackColumns: string[],
): ColumnProfile[] {
  const byColumn = new Map<string, Record<string, unknown>>();
  for (const profile of profileRecords) {
    const columnName = profileColumnName(profile);
    if (columnName) {
      byColumn.set(columnName, profile);
    }
  }

  const orderedColumns = columns.length ? columns : profileRecords.map(profileColumnName).filter(Boolean);
  return uniqueStrings(orderedColumns).map((columnName) => {
    const rawProfile = byColumn.get(columnName) ?? {};
    const values = preview.map((row) => row[columnName]).filter((value) => value !== null && value !== undefined && String(value).trim() !== "");
    const inferredType =
      normalizeColumnType(
        stringValue(rawProfile.inferred_type) ??
          stringValue(rawProfile.inferredType) ??
          stringValue(rawProfile.type) ??
          stringValue(rawProfile.data_type) ??
          stringValue(rawProfile.dataType),
      ) ?? inferColumnType(columnName, values);
    const suggestedRole =
      normalizeColumnRole(
        stringValue(rawProfile.suggested_role) ??
          stringValue(rawProfile.suggestedRole) ??
          stringValue(rawProfile.role) ??
          stringValue(rawProfile.feedback_column),
      ) ?? suggestColumnRole(columnName, inferredType, values, recommendedFeedbackColumns);
    const sampleValues = stringArray(rawProfile.sample_values).length
      ? stringArray(rawProfile.sample_values)
      : stringArray(rawProfile.sampleValues).length
        ? stringArray(rawProfile.sampleValues)
        : uniqueStrings(values.map((value) => String(value))).slice(0, 5);
    const nonEmptyCount = numberValue(rawProfile.non_empty_count) ?? numberValue(rawProfile.nonEmptyCount) ?? values.length;
    return {
      column_name: columnName,
      inferred_type: inferredType,
      non_empty_count: nonEmptyCount,
      missing_count: numberValue(rawProfile.missing_count) ?? numberValue(rawProfile.missingCount) ?? Math.max(rowCount - nonEmptyCount, 0),
      unique_count: numberValue(rawProfile.unique_count) ?? numberValue(rawProfile.uniqueCount) ?? uniqueStrings(values.map((value) => String(value))).length,
      sample_values: sampleValues,
      suggested_role: suggestedRole,
    };
  });
}

function profileColumnName(profile: Record<string, unknown>) {
  return (
    stringValue(profile.column_name) ??
    stringValue(profile.columnName) ??
    stringValue(profile.name) ??
    stringValue(profile.column) ??
    stringValue(profile.field) ??
    stringValue(profile.key) ??
    ""
  );
}

function inferColumnType(columnName: string, values: unknown[]): ColumnType {
  const name = columnName.toLowerCase();
  const textValues = values.map((value) => String(value).trim()).filter(Boolean);
  if (!textValues.length) {
    return "unknown";
  }
  if (nameIncludes(name, ["feedback", "comment", "response", "suggestion", "verbatim", "free_text", "free text"])) {
    return "qualitative_text";
  }
  if (nameIncludes(name, ["date", "time", "submitted", "created", "updated"]) && mostlyDateLike(textValues)) {
    return "date";
  }
  if (textValues.every((value) => ["true", "false", "yes", "no", "y", "n", "0", "1"].includes(value.toLowerCase()))) {
    return "boolean";
  }
  const numericValues = textValues.map(Number).filter((value) => Number.isFinite(value));
  if (numericValues.length / textValues.length >= 0.9) {
    const uniqueCount = new Set(numericValues).size;
    const min = Math.min(...numericValues);
    const max = Math.max(...numericValues);
    if (nameIncludes(name, ["rating", "score", "nps", "csat", "satisfaction"]) || (uniqueCount <= 11 && min >= 0 && max <= 10)) {
      return "rating";
    }
    return "numeric";
  }
  const averageWords = textValues.reduce((total, value) => total + value.split(/\s+/).length, 0) / textValues.length;
  const averageLength = textValues.reduce((total, value) => total + value.length, 0) / textValues.length;
  if (averageWords >= 7 || averageLength >= 35) {
    return "qualitative_text";
  }
  return new Set(textValues).size <= Math.min(50, Math.max(10, textValues.length * 0.6)) ? "categorical" : "unknown";
}

function suggestColumnRole(
  columnName: string,
  inferredType: ColumnType,
  values: unknown[],
  recommendedFeedbackColumns: string[],
): ColumnRole {
  const name = columnName.toLowerCase();
  if (recommendedFeedbackColumns.includes(columnName) || inferredType === "qualitative_text") {
    return "feedback_column";
  }
  if (inferredType === "rating") {
    return "rating_column";
  }
  if (inferredType === "date") {
    return "date_column";
  }
  if (nameIncludes(name, ["id", "identifier", "uuid", "respondent"]) && new Set(values.map(String)).size >= values.length * 0.8) {
    return "identifier_column";
  }
  if (
    inferredType === "categorical" &&
    nameIncludes(name, ["department", "region", "location", "team", "role", "product", "service", "category", "segment"])
  ) {
    return "segment_column";
  }
  return "ignore";
}

function normalizeColumnType(value: string | null): ColumnType | null {
  if (!value) {
    return null;
  }
  const normalized = value.toLowerCase().trim().replaceAll("-", "_").replaceAll(" ", "_");
  if (["qualitative_text", "text", "free_text", "feedback"].includes(normalized)) {
    return "qualitative_text";
  }
  if (["numeric", "number", "integer", "float"].includes(normalized)) {
    return "numeric";
  }
  if (["rating", "score"].includes(normalized)) {
    return "rating";
  }
  if (["categorical", "category", "segment"].includes(normalized)) {
    return "categorical";
  }
  if (["boolean", "bool"].includes(normalized)) {
    return "boolean";
  }
  if (["date", "datetime", "timestamp"].includes(normalized)) {
    return "date";
  }
  return "unknown";
}

function normalizeColumnRole(value: string | null): ColumnRole | null {
  if (!value) {
    return null;
  }
  const normalized = value.toLowerCase().trim().replaceAll("-", "_").replaceAll(" ", "_");
  if (["feedback_column", "feedback", "qualitative", "qualitative_column"].includes(normalized)) {
    return "feedback_column";
  }
  if (["rating_column", "rating", "score_column"].includes(normalized)) {
    return "rating_column";
  }
  if (["segment_column", "segment", "categorical_column", "group"].includes(normalized)) {
    return "segment_column";
  }
  if (["date_column", "date", "datetime"].includes(normalized)) {
    return "date_column";
  }
  if (["identifier_column", "identifier", "id"].includes(normalized)) {
    return "identifier_column";
  }
  if (["ignore", "ignored", "none"].includes(normalized)) {
    return "ignore";
  }
  return null;
}

function normalisePreview(value: unknown): PreviewRow[] {
  if (!Array.isArray(value)) {
    return [];
  }
  return value.filter((item): item is PreviewRow => typeof item === "object" && item !== null && !Array.isArray(item)) as PreviewRow[];
}

function firstRecordArray(values: unknown[]) {
  for (const value of values) {
    if (Array.isArray(value)) {
      return value.filter((item): item is Record<string, unknown> => typeof item === "object" && item !== null && !Array.isArray(item));
    }
  }
  return [];
}

function asRecord(value: unknown): Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value) ? (value as Record<string, unknown>) : {};
}

function stringValue(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function numberValue(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function stringArray(value: unknown) {
  return Array.isArray(value) ? uniqueStrings(value.map((item) => String(item)).filter(Boolean)) : [];
}

function singleStringArray(value: unknown) {
  const text = stringValue(value);
  return text ? [text] : [];
}

function uniqueStrings(values: string[]) {
  return Array.from(new Set(values.filter((value) => value.trim()).map((value) => value.trim())));
}

function nameIncludes(name: string, hints: string[]) {
  return hints.some((hint) => name.includes(hint));
}

function mostlyDateLike(values: string[]) {
  const matches = values.filter((value) => !Number.isNaN(Date.parse(value))).length;
  return matches / values.length >= 0.8;
}
