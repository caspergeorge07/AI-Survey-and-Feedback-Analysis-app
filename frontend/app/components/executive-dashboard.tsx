"use client";

import { SectionHeader } from "./shell";
import { Badge, Card } from "./ui";

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

const kpis: Kpi[] = [
  { label: "Total Projects", value: "12", detail: "4 active feedback programs", status: "Tracked", tone: "ai" },
  { label: "Analyses Completed", value: "38", detail: "6 completed this month", status: "Updated", tone: "success" },
  { label: "Responses Analysed", value: "18,420", detail: "Across survey and support exports", status: "Live", tone: "neutral" },
  { label: "Average Positive Sentiment", value: "64%", detail: "Up 7 points from prior period", status: "Improving", tone: "success" },
];

const recentAnalyses: RecentAnalysis[] = [
  {
    name: "Q3 Customer Feedback",
    project: "Customer Experience",
    responses: "2,840",
    sentiment: "68% positive",
    status: "Complete",
    date: "Today",
  },
  {
    name: "Product Onboarding Survey",
    project: "Product Research",
    responses: "1,126",
    sentiment: "54% positive",
    status: "Complete",
    date: "Yesterday",
  },
  {
    name: "Employee Pulse Comments",
    project: "People Insights",
    responses: "3,902",
    sentiment: "49% positive",
    status: "Review",
    date: "Jul 3",
  },
  {
    name: "Support Satisfaction Export",
    project: "Operations",
    responses: "918",
    sentiment: "61% positive",
    status: "Complete",
    date: "Jul 1",
  },
];

const recentReports: RecentReport[] = [
  {
    title: "Executive Customer Feedback Brief",
    detail: "Themes, sentiment, risks, and recommended actions",
    status: "Ready",
  },
  {
    title: "Onboarding Friction Summary",
    detail: "Product research report with negative highlights",
    status: "Draft",
  },
  {
    title: "People Pulse Management Report",
    detail: "Department-level feedback intelligence",
    status: "Ready",
  },
];

const topThemes: ThemeDatum[] = [
  { label: "Ease of use", value: 86 },
  { label: "Response speed", value: 72 },
  { label: "Reporting quality", value: 64 },
  { label: "Setup guidance", value: 48 },
  { label: "Export workflow", value: 38 },
];

const sentiment: SentimentDatum[] = [
  { label: "Positive", value: 64, tone: "success" },
  { label: "Neutral", value: 23, tone: "warning" },
  { label: "Negative", value: 13, tone: "danger" },
];

const recommendedActions = [
  "Prioritize onboarding guidance for new users before the next release.",
  "Improve visibility of PDF and CSV exports in post-analysis workflows.",
  "Create a follow-up review for teams with lower sentiment scores.",
];

const activity: ActivityItem[] = [
  {
    action: "Analysis completed",
    detail: "Q3 Customer Feedback produced 7 canonical themes.",
    time: "18 min ago",
  },
  {
    action: "Report generated",
    detail: "Executive Customer Feedback Brief is ready to download.",
    time: "1 hr ago",
  },
  {
    action: "Dataset profiled",
    detail: "Product Onboarding Survey detected 2 qualitative columns.",
    time: "Yesterday",
  },
  {
    action: "CSV exported",
    detail: "Support Satisfaction Export analysis was downloaded.",
    time: "Jul 1",
  },
];

const maxThemeValue = Math.max(...topThemes.map((theme) => theme.value));

export function ExecutiveDashboard() {
  return (
    <section className="dashboard" id="dashboard" aria-labelledby="dashboard-title">
      <Card className="dashboard-welcome">
        <div>
          <p className="eyebrow">Executive workspace</p>
          <h2 id="dashboard-title">Welcome back to SurveyIQ</h2>
          <p>
            Track feedback intelligence across recent analyses, reports, themes, sentiment, and recommended actions.
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

      <section className="dashboard-kpi-grid" aria-label="Workspace KPI summary">
        {kpis.map((kpi) => (
          <KpiCard key={kpi.label} kpi={kpi} />
        ))}
      </section>

      <section className="dashboard-grid dashboard-grid-main">
        <Card className="dashboard-panel dashboard-panel-wide">
          <SectionHeader title="Recent Analyses" detail="Latest workspace analyses" />
          <div className="table-wrap dashboard-table-wrap">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Analysis</th>
                  <th>Project</th>
                  <th>Responses</th>
                  <th>Sentiment</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentAnalyses.map((analysis) => (
                  <tr key={analysis.name}>
                    <td>
                      <strong>{analysis.name}</strong>
                    </td>
                    <td>{analysis.project}</td>
                    <td>{analysis.responses}</td>
                    <td>{analysis.sentiment}</td>
                    <td>
                      <Badge tone={analysis.status === "Complete" ? "success" : "warning"}>{analysis.status}</Badge>
                    </td>
                    <td>{analysis.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="dashboard-panel">
          <SectionHeader title="Quick Actions" detail="Common workspace tasks" />
          <div className="quick-action-list">
            <a href="#analysis">
              <strong>Start new analysis</strong>
              <span>Upload CSV or Excel feedback</span>
            </a>
            <a href="/surveyiq-sample-dataset.csv" download>
              <strong>Download sample dataset</strong>
              <span>Try the wizard with demo data</span>
            </a>
            <a href="#reports">
              <strong>Open report library</strong>
              <span>Review generated outputs</span>
            </a>
          </div>
        </Card>
      </section>

      <section className="dashboard-grid dashboard-grid-insights">
        <Card className="dashboard-panel">
          <SectionHeader title="Top Themes" detail="Highest-volume feedback topics" />
          <div className="theme-chart" aria-label="Top themes by response count">
            {topThemes.map((theme) => (
              <div className="theme-bar-row" key={theme.label}>
                <span>{theme.label}</span>
                <div className="theme-bar-track" aria-hidden="true">
                  <div style={{ width: `${Math.round((theme.value / maxThemeValue) * 100)}%` }} />
                </div>
                <strong>{theme.value}</strong>
              </div>
            ))}
          </div>
        </Card>

        <Card className="dashboard-panel">
          <SectionHeader title="Sentiment" detail="Average across recent analyses" />
          <div className="sentiment-summary" aria-label="Sentiment distribution">
            <div
              className="sentiment-donut"
              aria-hidden="true"
              style={{
                background: `conic-gradient(var(--color-success) 0 64%, var(--color-warning) 64% 87%, var(--color-danger) 87% 100%)`,
              }}
            >
              <span>64%</span>
            </div>
            <div className="sentiment-legend">
              {sentiment.map((item) => (
                <div className="sentiment-legend-row" key={item.label}>
                  <Badge tone={item.tone}>{item.label}</Badge>
                  <strong>{item.value}%</strong>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card className="dashboard-panel">
          <SectionHeader title="Recommended Actions" detail="AI-generated management next steps" />
          <ol className="action-summary-list">
            {recommendedActions.map((action) => (
              <li key={action}>{action}</li>
            ))}
          </ol>
        </Card>
      </section>

      <section className="dashboard-grid dashboard-grid-secondary" id="reports">
        <Card className="dashboard-panel">
          <SectionHeader title="Recent Reports" detail="Executive-ready outputs" />
          <div className="report-list">
            {recentReports.map((report) => (
              <article className="report-row" key={report.title}>
                <div>
                  <strong>{report.title}</strong>
                  <span>{report.detail}</span>
                </div>
                <Badge tone={report.status === "Ready" ? "success" : "warning"}>{report.status}</Badge>
              </article>
            ))}
          </div>
        </Card>

        <Card className="dashboard-panel">
          <SectionHeader title="Recent Activity" detail="Workspace timeline" />
          <ol className="activity-feed">
            {activity.map((item) => (
              <li key={`${item.action}-${item.time}`}>
                <div>
                  <strong>{item.action}</strong>
                  <span>{item.detail}</span>
                </div>
                <time>{item.time}</time>
              </li>
            ))}
          </ol>
        </Card>
      </section>
    </section>
  );
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
