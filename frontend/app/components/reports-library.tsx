"use client";

import { useMemo, useState } from "react";
import { Project, ReportRecord, ReportStatus, ReportType, useAnalysisState } from "./analysis-state";
import { SectionHeader } from "./shell";
import { Badge, Button, Card, EmptyState } from "./ui";

type ReportSort = "newest" | "oldest" | "project" | "report_type";

export function ReportsLibrary({ apiBaseUrl }: { apiBaseUrl: string }) {
  const { projects, reports } = useAnalysisState();
  const [search, setSearch] = useState("");
  const [projectFilter, setProjectFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState<ReportStatus | "all">("all");
  const [sort, setSort] = useState<ReportSort>("newest");
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);

  const visibleReports = useMemo(
    () => sortReports(filterReports(reports, search, projectFilter, statusFilter), sort),
    [projectFilter, reports, search, sort, statusFilter],
  );
  const selectedReport = reports.find((report) => report.id === selectedReportId) ?? null;

  return (
    <section className="reports-library" id="reports" aria-labelledby="reports-library-title">
      <Card className="report-library-toolbar">
        <SectionHeader
          title="Reports Library"
          detail="Review generated management reports, open report details, and download PDF or CSV outputs."
        />
        <div className="report-controls" aria-label="Report search and filters">
          <label className="form-field">
            <span>Search reports</span>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search title, project, analysis, or theme"
              type="search"
            />
          </label>
          <label className="form-field">
            <span>Project</span>
            <select value={projectFilter} onChange={(event) => setProjectFilter(event.target.value)}>
              <option value="all">All projects</option>
              <option value="none">No project</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
          </label>
          <label className="form-field">
            <span>Status</span>
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as ReportStatus | "all")}>
              <option value="all">All statuses</option>
              <option value="Ready">Ready</option>
            </select>
          </label>
          <label className="form-field">
            <span>Sort</span>
            <select value={sort} onChange={(event) => setSort(event.target.value as ReportSort)}>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="project">Project</option>
              <option value="report_type">Report type</option>
            </select>
          </label>
        </div>
      </Card>

      {selectedReport ? (
        <ReportViewer
          apiBaseUrl={apiBaseUrl}
          report={selectedReport}
          project={projects.find((project) => project.id === selectedReport.projectId) ?? null}
          onBack={() => setSelectedReportId(null)}
        />
      ) : null}

      {visibleReports.length ? (
        <section className="report-card-grid" aria-label="Generated reports">
          {visibleReports.map((report) => (
            <ReportCard
              apiBaseUrl={apiBaseUrl}
              key={report.id}
              report={report}
              onOpen={() => setSelectedReportId(report.id)}
            />
          ))}
        </section>
      ) : (
        <Card className="reports-empty-card">
          <EmptyState
            title={reports.length ? "No reports match your filters" : "No reports yet"}
            description={
              reports.length
                ? "Adjust search, project, status, or sorting to find the report you need."
                : "Run an analysis to generate a management PDF and add it to the Reports Library."
            }
            action={
              <div className="download-actions">
                <a className="download-link" href="#analysis">
                  Start new analysis
                </a>
                <a className="download-link subtle" href="/surveyiq-sample-dataset.csv" download>
                  Download sample dataset
                </a>
              </div>
            }
          />
        </Card>
      )}
    </section>
  );
}

function ReportCard({
  apiBaseUrl,
  onOpen,
  report,
}: {
  apiBaseUrl: string;
  onOpen: () => void;
  report: ReportRecord;
}) {
  return (
    <article className="report-card">
      <div className="report-card-header">
        <div>
          <h3>{report.title}</h3>
          <span>{report.projectName || "No project"} / {report.sourceAnalysisName}</span>
        </div>
        <Badge tone="success">{report.status}</Badge>
      </div>
      <div className="report-card-meta">
        <span>{report.reportType}</span>
        <span>{formatDateTime(report.createdAt)}</span>
        <span>{formatNumber(report.responseCount)} responses</span>
      </div>
      <div className="report-card-themes" aria-label="Top themes">
        {report.topThemes.slice(0, 3).map((theme) => (
          <Badge key={theme.label} tone="ai">
            {theme.label}: {theme.value}
          </Badge>
        ))}
      </div>
      <SentimentInline sentiment={report.sentimentSummary} />
      <div className="report-card-actions">
        <Button type="button" variant="secondary" onClick={onOpen}>
          View report
        </Button>
        <a className="download-link subtle" href={`${apiBaseUrl}${report.pdfDownloadUrl}`}>
          Download PDF
        </a>
        {report.csvDownloadUrl ? (
          <a className="download-link subtle" href={`${apiBaseUrl}${report.csvDownloadUrl}`}>
            Download CSV
          </a>
        ) : null}
      </div>
    </article>
  );
}

function ReportViewer({
  apiBaseUrl,
  onBack,
  project,
  report,
}: {
  apiBaseUrl: string;
  onBack: () => void;
  project: Project | null;
  report: ReportRecord;
}) {
  return (
    <Card className="report-viewer">
      <div className="project-detail-topline">
        <button className="text-button" type="button" onClick={onBack}>
          Reports
        </button>
        <span>/</span>
        <strong>{report.title}</strong>
      </div>
      <SectionHeader
        actions={
          <div className="download-actions">
            <a className="download-link" href={`${apiBaseUrl}${report.pdfDownloadUrl}`}>
              Download PDF
            </a>
            {report.csvDownloadUrl ? (
              <a className="download-link subtle" href={`${apiBaseUrl}${report.csvDownloadUrl}`}>
                Download CSV
              </a>
            ) : null}
          </div>
        }
        title={report.title}
        detail={`${report.reportType} / ${project?.name ?? report.projectName ?? "No project"} / ${formatDateTime(report.createdAt)}`}
      />

      <section className="report-viewer-grid">
        <ReportMetric label="Responses" value={formatNumber(report.responseCount)} />
        <ReportMetric label="Top themes" value={String(report.topThemes.length)} />
        <ReportMetric label="Status" value={report.status} />
        <ReportMetric label="Source analysis" value={report.sourceAnalysisName} />
      </section>

      <section className="report-document">
        <div className="report-document-section">
          <h3>Executive Summary</h3>
          <p>{report.executiveSummary}</p>
        </div>

        <div className="report-document-grid">
          <div className="report-document-section">
            <h3>Theme Summary</h3>
            {report.topThemes.length ? (
              report.topThemes.map((theme) => (
                <div className="count-row" key={theme.label}>
                  <span>{theme.label}</span>
                  <strong>{theme.value}</strong>
                </div>
              ))
            ) : (
              <p className="muted">No theme summary is available for this report.</p>
            )}
          </div>
          <div className="report-document-section">
            <h3>Sentiment Summary</h3>
            {Object.entries(normalizeSentiment(report.sentimentSummary)).map(([sentiment, count]) => (
              <div className="count-row" key={sentiment}>
                <span>{sentiment}</span>
                <strong>{count}</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="report-document-section">
          <h3>Recommended Actions</h3>
          {report.recommendedActions.length ? (
            <ol className="action-summary-list">
              {report.recommendedActions.map((action) => (
                <li key={action}>{action}</li>
              ))}
            </ol>
          ) : (
            <p className="muted">No recommended actions were returned for this report.</p>
          )}
        </div>

        {report.datasetOverview ? (
          <div className="report-document-section">
            <h3>Dataset Overview</h3>
            <div className="report-dataset-grid">
              <ReportMetric label="File" value={report.datasetOverview.filename} />
              <ReportMetric label="Rows" value={formatNumber(report.datasetOverview.rowCount)} />
              <ReportMetric
                label="Feedback columns"
                value={
                  report.datasetOverview.selectedFeedbackColumns.length
                    ? report.datasetOverview.selectedFeedbackColumns.join(", ")
                    : "Not recorded"
                }
              />
            </div>
          </div>
        ) : null}
      </section>
    </Card>
  );
}

function ReportMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="metric-card">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function SentimentInline({ sentiment }: { sentiment: Record<string, number> }) {
  const normalized = normalizeSentiment(sentiment);
  return (
    <div className="report-sentiment-inline" aria-label="Sentiment summary">
      <Badge tone="success">Positive {normalized.positive}</Badge>
      <Badge tone="warning">Neutral {normalized.neutral}</Badge>
      <Badge tone="danger">Negative {normalized.negative}</Badge>
    </div>
  );
}

function filterReports(
  reports: ReportRecord[],
  search: string,
  projectFilter: string,
  statusFilter: ReportStatus | "all",
) {
  const query = search.trim().toLowerCase();
  return reports.filter((report) => {
    const matchesSearch =
      !query ||
      [
        report.title,
        report.projectName ?? "",
        report.sourceAnalysisName,
        report.reportType,
        ...report.topThemes.map((theme) => theme.label),
      ].some((value) => value.toLowerCase().includes(query));
    const matchesProject =
      projectFilter === "all" ||
      (projectFilter === "none" && !report.projectId) ||
      report.projectId === projectFilter;
    const matchesStatus = statusFilter === "all" || report.status === statusFilter;
    return matchesSearch && matchesProject && matchesStatus;
  });
}

function sortReports(reports: ReportRecord[], sort: ReportSort) {
  return [...reports].sort((left, right) => {
    if (sort === "oldest") {
      return new Date(left.createdAt).getTime() - new Date(right.createdAt).getTime();
    }
    if (sort === "project") {
      return (left.projectName ?? "No project").localeCompare(right.projectName ?? "No project");
    }
    if (sort === "report_type") {
      return left.reportType.localeCompare(right.reportType);
    }
    return new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime();
  });
}

function normalizeSentiment(sentiment: Record<string, number>) {
  return {
    positive: sentiment.positive ?? sentiment.Positive ?? 0,
    neutral: sentiment.neutral ?? sentiment.Neutral ?? 0,
    negative: sentiment.negative ?? sentiment.Negative ?? 0,
  };
}

function formatDateTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "-";
  }
  return date.toLocaleString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
}

function formatNumber(value: number) {
  return new Intl.NumberFormat().format(value);
}
