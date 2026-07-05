"use client";

import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";

const storageKey = "surveyiq-workspace-state-v1";

export const projectCategories = [
  "Customer Experience",
  "Employee Experience",
  "Market Research",
  "Product Research",
  "Support",
  "Operations",
  "Other",
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export type AnalysedResponse = {
  original_response: string;
  theme: string;
  sentiment: "positive" | "neutral" | "negative";
  confidence: number;
  reason: string;
  source_row_index?: number | null;
  source_feedback_column?: string | null;
};

export type AnalysisOverall = {
  summary_of_main_themes: string;
  counts_by_theme: Record<string, number>;
  counts_by_sentiment: Record<string, number>;
  executive_summary: string;
  recommended_actions?: string[];
};

export type AnalysisResult = {
  analysis_id: string;
  results: AnalysedResponse[];
  overall: AnalysisOverall;
  download_url: string;
  report_download_url?: string | null;
  selected_feedback_columns?: string[];
  quantitative_summary?: Record<string, unknown>;
  cross_analysis?: unknown;
  enhanced_executive_summary?: string | null;
};

export type LatestAnalysis = {
  analysis: AnalysisResult;
  completedAt: string;
  filename: string;
  rowCount: number;
  selectedFeedbackColumns: string[];
  projectId?: string | null;
};

export type ProjectActivity = {
  id: string;
  type:
    | "project_created"
    | "analysis_completed"
    | "report_generated"
    | "csv_exported"
    | "pdf_downloaded"
    | "project_updated"
    | "project_archived"
    | "project_duplicated";
  label: string;
  detail: string;
  createdAt: string;
};

export type ReportStatus = "Ready";
export type ReportType = "Management PDF";

export type ReportRecord = {
  id: string;
  title: string;
  projectId?: string | null;
  projectName?: string | null;
  sourceAnalysisId: string;
  sourceAnalysisName: string;
  createdAt: string;
  reportType: ReportType;
  status: ReportStatus;
  pdfDownloadUrl: string;
  csvDownloadUrl?: string | null;
  responseCount: number;
  topThemes: Array<{ label: string; value: number }>;
  sentimentSummary: Record<string, number>;
  executiveSummary: string;
  recommendedActions: string[];
  datasetOverview?: {
    filename: string;
    rowCount: number;
    selectedFeedbackColumns: string[];
  };
};

export type ProjectAnalysisRecord = {
  id: string;
  title: string;
  status: "Complete";
  responseCount: number;
  createdAt: string;
  downloadUrl: string;
  reportDownloadUrl?: string | null;
  sentimentCounts: Record<string, number>;
  themeCounts: Record<string, number>;
  executiveSummary: string;
};

export type ProjectReportRecord = {
  id: string;
  title: string;
  executiveSummary: string;
  createdAt: string;
  downloadUrl: string;
  csvDownloadUrl?: string | null;
  responseCount: number;
  topThemes: Array<{ label: string; value: number }>;
  sentimentSummary: Record<string, number>;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  category: ProjectCategory;
  owner: string;
  color: string;
  icon: string;
  createdAt: string;
  updatedAt: string;
  archived: boolean;
  analyses: ProjectAnalysisRecord[];
  reports: ProjectReportRecord[];
  activity: ProjectActivity[];
};

export type CreateProjectInput = Pick<Project, "name" | "description" | "category" | "owner" | "color" | "icon">;
export type UpdateProjectInput = Partial<CreateProjectInput>;

type PersistedWorkspaceState = {
  reports: ReportRecord[];
  projects: Project[];
  selectedProjectId: string | null;
  latestAnalysis: LatestAnalysis | null;
};

type AnalysisStateContextValue = PersistedWorkspaceState & {
  createProject: (input: CreateProjectInput) => Project;
  updateProject: (projectId: string, input: UpdateProjectInput) => void;
  archiveProject: (projectId: string) => void;
  deleteProject: (projectId: string) => void;
  duplicateProject: (projectId: string) => void;
  setSelectedProjectId: (projectId: string | null) => void;
  setLatestAnalysis: (analysis: LatestAnalysis | null) => void;
  recordCompletedAnalysis: (analysis: LatestAnalysis) => void;
  addProjectActivity: (projectId: string, activity: Omit<ProjectActivity, "id" | "createdAt">) => void;
};

const AnalysisStateContext = createContext<AnalysisStateContextValue | null>(null);

export function AnalysisStateProvider({ children }: { children: ReactNode }) {
  const [reports, setReports] = useState<ReportRecord[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectIdState] = useState<string | null>(null);
  const [latestAnalysis, setLatestAnalysis] = useState<LatestAnalysis | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(storageKey);
      if (stored) {
        const parsed = JSON.parse(stored) as PersistedWorkspaceState;
        setReports(Array.isArray(parsed.reports) ? parsed.reports : []);
        setProjects(Array.isArray(parsed.projects) ? parsed.projects : []);
        setSelectedProjectIdState(parsed.selectedProjectId ?? null);
        setLatestAnalysis(parsed.latestAnalysis ?? null);
      }
    } catch (error) {
      console.warn("SurveyIQ could not load local workspace state.", safeError(error));
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }
    try {
      window.localStorage.setItem(storageKey, JSON.stringify({ reports, projects, selectedProjectId, latestAnalysis }));
    } catch (error) {
      console.warn("SurveyIQ could not save local workspace state.", safeError(error));
    }
  }, [isHydrated, latestAnalysis, projects, reports, selectedProjectId]);

  function createProject(input: CreateProjectInput) {
    const now = new Date().toISOString();
    const project: Project = {
      ...input,
      id: createId("project"),
      createdAt: now,
      updatedAt: now,
      archived: false,
      analyses: [],
      reports: [],
      activity: [
        {
          id: createId("activity"),
          type: "project_created",
          label: "Project created",
          detail: `${input.name} was created.`,
          createdAt: now,
        },
      ],
    };
    setProjects((current) => [project, ...current]);
    setSelectedProjectIdState(project.id);
    return project;
  }

  function updateProject(projectId: string, input: UpdateProjectInput) {
    const now = new Date().toISOString();
    if (input.name) {
      setReports((current) =>
        current.map((report) =>
          report.projectId === projectId ? { ...report, projectName: input.name ?? report.projectName } : report,
        ),
      );
    }
    setProjects((current) =>
      current.map((project) =>
        project.id === projectId
          ? {
              ...project,
              ...input,
              updatedAt: now,
              activity: [
                createActivity("project_updated", "Project updated", "Project settings were updated.", now),
                ...project.activity,
              ],
            }
          : project,
      ),
    );
  }

  function archiveProject(projectId: string) {
    const now = new Date().toISOString();
    setProjects((current) =>
      current.map((project) =>
        project.id === projectId
          ? {
              ...project,
              archived: true,
              updatedAt: now,
              activity: [
                createActivity("project_archived", "Project archived", "Project was archived.", now),
                ...project.activity,
              ],
            }
          : project,
      ),
    );
    if (selectedProjectId === projectId) {
      setSelectedProjectIdState(null);
    }
  }

  function deleteProject(projectId: string) {
    setProjects((current) => current.filter((project) => project.id !== projectId));
    setReports((current) =>
      current.map((report) =>
        report.projectId === projectId ? { ...report, projectId: null, projectName: null } : report,
      ),
    );
    if (selectedProjectId === projectId) {
      setSelectedProjectIdState(null);
    }
    if (latestAnalysis?.projectId === projectId) {
      setLatestAnalysis(null);
    }
  }

  function duplicateProject(projectId: string) {
    const source = projects.find((project) => project.id === projectId);
    if (!source) {
      return;
    }
    const now = new Date().toISOString();
    const duplicate: Project = {
      ...source,
      id: createId("project"),
      name: `${source.name} Copy`,
      createdAt: now,
      updatedAt: now,
      archived: false,
      analyses: [],
      reports: [],
      activity: [
        createActivity(
          "project_duplicated",
          "Project duplicated",
          `Created from ${source.name}. Analyses and reports were not copied.`,
          now,
        ),
      ],
    };
    setProjects((current) => [duplicate, ...current]);
    setSelectedProjectIdState(duplicate.id);
  }

  function setSelectedProjectId(projectId: string | null) {
    setSelectedProjectIdState(projectId);
  }

  function recordCompletedAnalysis(analysis: LatestAnalysis) {
    const projectId = selectedProjectId;
    const project = projects.find((item) => item.id === projectId) ?? null;
    const nextAnalysis = { ...analysis, projectId };
    setLatestAnalysis(nextAnalysis);
    const reportRecord = analysis.analysis.report_download_url
      ? buildReportRecord(nextAnalysis, project?.name ?? null)
      : null;

    if (reportRecord) {
      setReports((current) => [reportRecord, ...current.filter((report) => report.id !== reportRecord.id)]);
    }

    if (!projectId) {
      return;
    }

    const now = analysis.completedAt;
    setProjects((current) =>
      current.map((project) => {
        if (project.id !== projectId) {
          return project;
        }
        const analysisRecord = buildProjectAnalysisRecord(nextAnalysis);
        const reports = reportRecord
          ? [buildProjectReportRecord(reportRecord), ...project.reports.filter((report) => report.id !== reportRecord.id)]
          : project.reports;
        const reportActivity = analysis.analysis.report_download_url
          ? [createActivity("report_generated", "Report generated", "Management PDF report is ready.", now)]
          : [];
        return {
          ...project,
          updatedAt: now,
          analyses: [analysisRecord, ...project.analyses],
          reports,
          activity: [
            ...reportActivity,
            createActivity("analysis_completed", "Analysis completed", `${analysis.filename} was analysed.`, now),
            ...project.activity,
          ],
        };
      }),
    );
  }

  function addProjectActivity(projectId: string, activity: Omit<ProjectActivity, "id" | "createdAt">) {
    const now = new Date().toISOString();
    setProjects((current) =>
      current.map((project) =>
        project.id === projectId
          ? {
              ...project,
              updatedAt: now,
              activity: [createActivity(activity.type, activity.label, activity.detail, now), ...project.activity],
            }
          : project,
      ),
    );
  }

  const value = useMemo(
    () => ({
      reports,
      projects,
      selectedProjectId,
      latestAnalysis,
      createProject,
      updateProject,
      archiveProject,
      deleteProject,
      duplicateProject,
      setSelectedProjectId,
      setLatestAnalysis,
      recordCompletedAnalysis,
      addProjectActivity,
    }),
    [latestAnalysis, projects, reports, selectedProjectId],
  );

  return <AnalysisStateContext.Provider value={value}>{children}</AnalysisStateContext.Provider>;
}

export function useAnalysisState() {
  const context = useContext(AnalysisStateContext);
  if (!context) {
    throw new Error("useAnalysisState must be used inside AnalysisStateProvider.");
  }
  return context;
}

function buildProjectAnalysisRecord(latest: LatestAnalysis): ProjectAnalysisRecord {
  return {
    id: latest.analysis.analysis_id,
    title: latest.filename,
    status: "Complete",
    responseCount: latest.analysis.results.length,
    createdAt: latest.completedAt,
    downloadUrl: latest.analysis.download_url,
    reportDownloadUrl: latest.analysis.report_download_url,
    sentimentCounts: latest.analysis.overall.counts_by_sentiment,
    themeCounts: latest.analysis.overall.counts_by_theme,
    executiveSummary: latest.analysis.enhanced_executive_summary || latest.analysis.overall.executive_summary,
  };
}

function buildReportRecord(latest: LatestAnalysis, projectName: string | null): ReportRecord {
  const topThemes = Object.entries(latest.analysis.overall.counts_by_theme)
    .sort(([, left], [, right]) => right - left)
    .slice(0, 6)
    .map(([label, value]) => ({ label, value }));
  return {
    id: `${latest.analysis.analysis_id}-report`,
    title: `${latest.filename} Management Report`,
    projectId: latest.projectId ?? null,
    projectName,
    sourceAnalysisId: latest.analysis.analysis_id,
    sourceAnalysisName: latest.filename,
    createdAt: latest.completedAt,
    reportType: "Management PDF",
    status: "Ready",
    pdfDownloadUrl: latest.analysis.report_download_url ?? "",
    csvDownloadUrl: latest.analysis.download_url,
    responseCount: latest.analysis.results.length,
    topThemes,
    sentimentSummary: latest.analysis.overall.counts_by_sentiment,
    executiveSummary: latest.analysis.enhanced_executive_summary || latest.analysis.overall.executive_summary,
    recommendedActions: (latest.analysis.overall.recommended_actions ?? []).filter(Boolean),
    datasetOverview: {
      filename: latest.filename,
      rowCount: latest.rowCount,
      selectedFeedbackColumns: latest.selectedFeedbackColumns.length
        ? latest.selectedFeedbackColumns
        : latest.analysis.selected_feedback_columns ?? [],
    },
  };
}

function buildProjectReportRecord(report: ReportRecord): ProjectReportRecord {
  return {
    id: report.id,
    title: report.title,
    executiveSummary: report.executiveSummary,
    createdAt: report.createdAt,
    downloadUrl: report.pdfDownloadUrl,
    csvDownloadUrl: report.csvDownloadUrl,
    responseCount: report.responseCount,
    topThemes: report.topThemes,
    sentimentSummary: report.sentimentSummary,
  };
}

function createActivity(
  type: ProjectActivity["type"],
  label: string,
  detail: string,
  createdAt: string,
): ProjectActivity {
  return {
    id: createId("activity"),
    type,
    label,
    detail,
    createdAt,
  };
}

function createId(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function safeError(error: unknown) {
  return error instanceof Error ? { name: error.name, message: error.message } : { message: "Unknown local storage error" };
}
