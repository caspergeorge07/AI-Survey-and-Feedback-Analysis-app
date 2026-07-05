"use client";

import { LatestAnalysis, useAnalysisState } from "./analysis-state";
import { SectionHeader } from "./shell";
import { Badge, Card, EmptyState } from "./ui";

type Kpi = {
  label: string;
  value: string;
  detail: string;
  status: string;
  tone?: "neutral" | "success" | "warning" | "danger" | "ai";
};

type RecentAnalysis = {
  name: string;
  project: string;
  responses: string;
  sentiment: string;
  status: string;
  date: string;
};

type RecentReport = {
  title: string;
  detail: string;
  status: string;
  url?: string;
};

type ThemeDatum = {
  label: string;
  value: number;
};

type SentimentDatum = {
  label: "Positive" | "Neutral" | "Negative";
  value: number;
  tone: "success" | "warning" | "danger";
};

type ActivityItem = {
  action: string;
  detail: string;
  time: string;
};

type DashboardData = {
  kpis: Kpi[];
  recentAnalyses: RecentAnalysis[];
  recentReports: RecentReport[];
  topThemes: ThemeDatum[];
  sentiment: SentimentDatum[];
  recommendedActions: string[];
  activity: ActivityItem[];
  hasAnalysis: boolean;
};

const emptyDashboard: DashboardData = {
  kpis: [
    { label: "Responses Analysed", value: "0", detail: "Run an analysis to populate this dashboard.", status: "Empty", tone: "neutral" },
    { label: "Detected Themes", value: "0", detail: "Themes will appear after analysis.", status: "Empty", tone: "neutral" },
    { label: "Sentiment Distribution", value: "-", detail: "Positive / neutral / negative", status: "Empty", tone: "neutral" },
    { label: "Confidence Summary", value: "-", detail: "Average confidence will appear here.", status: "Empty", tone: "neutral" },
    { label: "Recommended Actions", value: "0", detail: "Actions will appear after analysis.", status: "Empty", tone: "neutral" },
  ],
  recentAnalyses: [],
  recentReports: [],
  topThemes: [],
  sentiment: [
    { label: "Positive", value: 0, tone: "success" },
    { label: "Neutral", value: 0, tone: "warning" },
    { label: "Negative", value: 0, tone: "danger" },
  ],
  recommendedActions: [],
  activity: [],
  hasAnalysis: false,
};

export function ExecutiveDashboard({ apiBaseUrl }: { apiBaseUrl: string }) {
  const { latestAnalysis } = useAnalysisState();
  const dashboard = latestAnalysis ? buildDashboardData(latestAnalysis, apiBaseUrl) : emptyDashboard;
  const maxThemeValue = Math.max(...dashboard.topThemes.map((theme) => theme.value), 1);

  return (
    <section className="dashboard" id="dashboard" aria-labelledby="dashboard-title">
      <Card className="dashboard-welcome">
        <div>
          <p className="eyebrow">Executive workspace</p>
          <h2 id="dashboard-title">Welcome back to SurveyIQ</h2>
          <p>
            Track feedback intelligence from the latest completed analysis, including themes, sentiment, confidence,
            reports, and recommended actions.
          </p>
        </div>
        <div className="dashboard-welcome-actions" aria-label="Dashboard quick links">
          <a className="download-link" href="#analysis">
            Start new analysis
          </a>
          <a className="download-link subtle" href="#reports">
            View reports
          </a>
        </div>
      </Card>

      <section className="dashboard-kpi-grid" aria-label="Latest analysis KPI summary">
        {dashboard.kpis.map((kpi) => (
          <KpiCard key={kpi.label} kpi={kpi} />
        ))}
      </section>

      <section className="dashboard-grid dashboard-grid-main">
        <Card className="dashboard-panel dashboard-panel-wide">
          <SectionHeader title="Recent Analysis" detail="Most recent completed run" />
          {dashboard.recentAnalyses.length ? (
            <div className="table-wrap dashboard-table-wrap">
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>Analysis</th>
                    <th>Dataset</th>
                    <th>Responses</th>
                    <th>Sentiment</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboard.recentAnalyses.map((analysis) => (
                    <tr key={analysis.name}>
                      <td>
                        <strong>{analysis.name}</strong>
                      </td>
                      <td>{analysis.project}</td>
                      <td>{analysis.responses}</td>
                      <td>{analysis.sentiment}</td>
                      <td>
                        <Badge tone="success">{analysis.status}</Badge>
                      </td>
                      <td>{analysis.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <DashboardEmpty title="No completed analysis yet" detail="Run the Dataset Intelligence Wizard to populate recent analysis data." />
          )}
        </Card>

        <Card className="dashboard-panel">
          <SectionHeader title="Quick Actions" detail="Common workspace tasks" />
          <div className="quick-action-list">
            <a href="#analysis">
              <strong>Start new analysis</strong>
              <span>Upload CSV or Excel feedback</span>
            </a>
            {latestAnalysis?.analysis.download_url ? (
              <a href={`${apiBaseUrl}${latestAnalysis.analysis.download_url}`}>
                <strong>Download latest CSV</strong>
                <span>Export analysed response data</span>
              </a>
            ) : (
              <a href="/surveyiq-sample-dataset.csv" download>
                <strong>Download sample dataset</strong>
                <span>Try the wizard with sample data</span>
              </a>
            )}
            {latestAnalysis?.analysis.report_download_url ? (
              <a href={`${apiBaseUrl}${latestAnalysis.analysis.report_download_url}`}>
                <strong>Download latest PDF</strong>
                <span>Open the latest management report</span>
              </a>
            ) : (
              <a href="#reports">
                <strong>Open report area</strong>
                <span>Reports appear after analysis</span>
              </a>
            )}
          </div>
        </Card>
      </section>

      <section className="dashboard-grid dashboard-grid-insights">
        <Card className="dashboard-panel">
          <SectionHeader title="Top Themes" detail="Highest-volume feedback topics" />
          {dashboard.topThemes.length ? (
            <div className="theme-chart" aria-label="Top themes by response count">
              {dashboard.topThemes.map((theme) => (
                <div className="theme-bar-row" key={theme.label}>
                  <span>{theme.label}</span>
                  <div className="theme-bar-track" aria-hidden="true">
                    <div style={{ width: `${Math.max(8, Math.round((theme.value / maxThemeValue) * 100))}%` }} />
                  </div>
                  <strong>{theme.value}</strong>
                </div>
              ))}
            </div>
          ) : (
            <DashboardEmpty title="No themes yet" detail="Theme counts will appear after the next completed analysis." />
          )}
        </Card>

        <Card className="dashboard-panel">
          <SectionHeader title="Sentiment" detail="Latest analysis distribution" />
          {dashboard.hasAnalysis ? (
            <div className="sentiment-summary" aria-label="Sentiment distribution">
              <div
                className="sentiment-donut"
                aria-hidden="true"
                style={{ background: sentimentGradient(dashboard.sentiment) }}
              >
                <span>{dashboard.sentiment[0].value}%</span>
              </div>
              <div className="sentiment-legend">
                {dashboard.sentiment.map((item) => (
                  <div className="sentiment-legend-row" key={item.label}>
                    <Badge tone={item.tone}>{item.label}</Badge>
                    <strong>{item.value}%</strong>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <DashboardEmpty title="No sentiment yet" detail="Positive, neutral, and negative distribution will appear after analysis." />
          )}
        </Card>

        <Card className="dashboard-panel">
          <SectionHeader title="Recommended Actions" detail="AI-generated management next steps" />
          {dashboard.recommendedActions.length ? (
            <ol className="action-summary-list">
              {dashboard.recommendedActions.map((action) => (
                <li key={action}>{action}</li>
              ))}
            </ol>
          ) : (
            <DashboardEmpty title="No actions yet" detail="Recommended actions will appear when the backend returns executive insights." />
          )}
        </Card>
      </section>

      <section className="dashboard-grid dashboard-grid-secondary" id="reports">
        <Card className="dashboard-panel">
          <SectionHeader title="Recent Reports" detail="Generated outputs from the latest analysis" />
          {dashboard.recentReports.length ? (
            <div className="report-list">
              {dashboard.recentReports.map((report) =>
                report.url ? (
                  <a className="report-row" href={report.url} key={report.title}>
                    <div>
                      <strong>{report.title}</strong>
                      <span>{report.detail}</span>
                    </div>
                    <Badge tone="success">{report.status}</Badge>
                  </a>
                ) : (
                  <article className="report-row" key={report.title}>
                    <div>
                      <strong>{report.title}</strong>
                      <span>{report.detail}</span>
                    </div>
                    <Badge tone="success">{report.status}</Badge>
                  </article>
                ),
              )}
            </div>
          ) : (
            <DashboardEmpty title="No reports yet" detail="CSV and PDF outputs will appear here after analysis completes." />
          )}
        </Card>

        <Card className="dashboard-panel">
          <SectionHeader title="Recent Activity" detail="Latest local MVP activity" />
          {dashboard.activity.length ? (
            <ol className="activity-feed">
              {dashboard.activity.map((item) => (
                <li key={`${item.action}-${item.time}`}>
                  <div>
                    <strong>{item.action}</strong>
                    <span>{item.detail}</span>
                  </div>
                  <time>{item.time}</time>
                </li>
              ))}
            </ol>
          ) : (
            <DashboardEmpty title="No activity yet" detail="Completed analyses and generated exports will appear here." />
          )}
        </Card>
      </section>
    </section>
  );
}

function buildDashboardData(latest: LatestAnalysis, apiBaseUrl: string): DashboardData {
  const { analysis } = latest;
  const sentimentCounts = normalizeSentimentCounts(analysis.overall.counts_by_sentiment);
  const sentimentTotal = Object.values(sentimentCounts).reduce((total, count) => total + count, 0);
  const sentiment = buildSentimentData(sentimentCounts, sentimentTotal || analysis.results.length);
  const positivePercent = sentiment.find((item) => item.label === "Positive")?.value ?? 0;
  const neutralPercent = sentiment.find((item) => item.label === "Neutral")?.value ?? 0;
  const negativePercent = sentiment.find((item) => item.label === "Negative")?.value ?? 0;
  const topThemes = Object.entries(analysis.overall.counts_by_theme)
    .sort(([, left], [, right]) => right - left)
    .slice(0, 5)
    .map(([label, value]) => ({ label, value }));
  const confidence = averageConfidence(analysis.results);
  const recommendedActions = (analysis.overall.recommended_actions ?? []).filter(Boolean).slice(0, 5);
  const selectedColumns = latest.selectedFeedbackColumns.length
    ? latest.selectedFeedbackColumns
    : analysis.selected_feedback_columns ?? [];
  const completedLabel = formatCompletedAt(latest.completedAt);

  return {
    kpis: [
      {
        label: "Responses Analysed",
        value: formatNumber(analysis.results.length),
        detail: `${formatNumber(latest.rowCount || analysis.results.length)} dataset rows reviewed`,
        status: "Live",
        tone: "ai",
      },
      {
        label: "Detected Themes",
        value: formatNumber(topThemes.length),
        detail: topThemes.length ? `${topThemes[0].label} is the leading theme` : "No themes returned",
        status: "Updated",
        tone: "success",
      },
      {
        label: "Sentiment Distribution",
        value: `${positivePercent}% / ${neutralPercent}% / ${negativePercent}%`,
        detail: "Positive / neutral / negative",
        status: positivePercent >= negativePercent ? "Stable" : "Review",
        tone: positivePercent >= negativePercent ? "success" : "warning",
      },
      {
        label: "Confidence Summary",
        value: confidence === null ? "-" : `${confidence}% avg`,
        detail: "Mean confidence across analysed responses",
        status: confidence !== null && confidence >= 75 ? "Strong" : "Review",
        tone: confidence !== null && confidence >= 75 ? "success" : "warning",
      },
      {
        label: "Recommended Actions",
        value: formatNumber(recommendedActions.length),
        detail: recommendedActions.length ? "Ready for leadership review" : "No actions returned",
        status: "AI",
        tone: "ai",
      },
    ],
    recentAnalyses: [
      {
        name: `Analysis ${analysis.analysis_id}`,
        project: latest.filename,
        responses: formatNumber(analysis.results.length),
        sentiment: `${positivePercent}% positive`,
        status: "Complete",
        date: completedLabel,
      },
    ],
    recentReports: buildReports(analysis, apiBaseUrl, topThemes.length, analysis.results.length),
    topThemes,
    sentiment,
    recommendedActions,
    activity: buildActivity(latest, topThemes.length, selectedColumns, completedLabel),
    hasAnalysis: true,
  };
}

function buildReports(analysis: LatestAnalysis["analysis"], apiBaseUrl: string, themeCount: number, responseCount: number) {
  const reports: RecentReport[] = [];
  if (analysis.report_download_url) {
    reports.push({
      title: "Management PDF Report",
      detail: `${formatNumber(themeCount)} themes and ${formatNumber(responseCount)} analysed responses`,
      status: "Ready",
      url: `${apiBaseUrl}${analysis.report_download_url}`,
    });
  }
  if (analysis.download_url) {
    reports.push({
      title: "Analysed CSV Export",
      detail: "Response-level themes, sentiment, confidence, and reasons",
      status: "Ready",
      url: `${apiBaseUrl}${analysis.download_url}`,
    });
  }
  return reports;
}

function buildActivity(latest: LatestAnalysis, themeCount: number, selectedColumns: string[], completedLabel: string) {
  const activity: ActivityItem[] = [
    {
      action: "Analysis completed",
      detail: `${latest.filename} produced ${formatNumber(themeCount)} detected themes.`,
      time: completedLabel,
    },
  ];

  if (selectedColumns.length) {
    activity.push({
      action: "Feedback columns analysed",
      detail: selectedColumns.join(", "),
      time: completedLabel,
    });
  }
  if (latest.analysis.report_download_url) {
    activity.push({
      action: "PDF report generated",
      detail: "Management report is ready to download.",
      time: completedLabel,
    });
  }
  if (latest.analysis.download_url) {
    activity.push({
      action: "CSV export generated",
      detail: "Analysed response-level export is ready.",
      time: completedLabel,
    });
  }

  return activity;
}

function KpiCard({ kpi }: { kpi: Kpi }) {
  return (
    <article className="dashboard-kpi-card">
      <div className="dashboard-kpi-topline">
        <span>{kpi.label}</span>
        <Badge tone={kpi.tone ?? "neutral"}>{kpi.status}</Badge>
      </div>
      <strong>{kpi.value}</strong>
      <p>{kpi.detail}</p>
    </article>
  );
}

function DashboardEmpty({ detail, title }: { detail: string; title: string }) {
  return (
    <div className="dashboard-empty-panel">
      <EmptyState description={detail} title={title} />
    </div>
  );
}

function normalizeSentimentCounts(counts: Record<string, number>) {
  return {
    positive: counts.positive ?? counts.Positive ?? 0,
    neutral: counts.neutral ?? counts.Neutral ?? 0,
    negative: counts.negative ?? counts.Negative ?? 0,
  };
}

function buildSentimentData(counts: ReturnType<typeof normalizeSentimentCounts>, total: number): SentimentDatum[] {
  const safeTotal = Math.max(total, 1);
  return [
    { label: "Positive", value: Math.round((counts.positive / safeTotal) * 100), tone: "success" },
    { label: "Neutral", value: Math.round((counts.neutral / safeTotal) * 100), tone: "warning" },
    { label: "Negative", value: Math.round((counts.negative / safeTotal) * 100), tone: "danger" },
  ];
}

function sentimentGradient(sentiment: SentimentDatum[]) {
  const positive = sentiment.find((item) => item.label === "Positive")?.value ?? 0;
  const neutral = sentiment.find((item) => item.label === "Neutral")?.value ?? 0;
  const positiveEnd = positive;
  const neutralEnd = positive + neutral;
  return `conic-gradient(var(--color-success) 0 ${positiveEnd}%, var(--color-warning) ${positiveEnd}% ${neutralEnd}%, var(--color-danger) ${neutralEnd}% 100%)`;
}

function averageConfidence(results: LatestAnalysis["analysis"]["results"]) {
  const confidenceValues = results
    .map((result) => result.confidence)
    .filter((value) => Number.isFinite(value));
  if (!confidenceValues.length) {
    return null;
  }
  return Math.round((confidenceValues.reduce((total, value) => total + value, 0) / confidenceValues.length) * 100);
}

function formatCompletedAt(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "Just now";
  }
  return date.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatNumber(value: number) {
  return new Intl.NumberFormat().format(value);
}
