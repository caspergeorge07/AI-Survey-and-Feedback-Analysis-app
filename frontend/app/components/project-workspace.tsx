"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  CreateProjectInput,
  Project,
  ProjectActivity,
  ProjectCategory,
  projectCategories,
  UpdateProjectInput,
  useAnalysisState,
} from "./analysis-state";
import { SectionHeader } from "./shell";
import { Badge, Button, Card, EmptyState } from "./ui";

type ProjectSort = "recent" | "alphabetical" | "most_analyses" | "newest" | "oldest";
type ProjectStatusFilter = "active" | "archived" | "all";
type ProjectTab = "overview" | "analyses" | "reports" | "activity" | "settings";

const icons = ["CX", "EX", "MR", "PR", "SU", "OP", "OT"];

const defaultProjectForm: CreateProjectInput = {
  name: "",
  description: "",
  category: "Customer Experience",
  owner: "SurveyIQ User",
  color: "#1455d9",
  icon: "CX",
};

export function ProjectWorkspace({ apiBaseUrl }: { apiBaseUrl: string }) {
  const { createProject, projects, selectedProjectId, setSelectedProjectId } = useAnalysisState();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [openedProjectId, setOpenedProjectId] = useState<string | null>(selectedProjectId);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<ProjectCategory | "All">("All");
  const [status, setStatus] = useState<ProjectStatusFilter>("active");
  const [sort, setSort] = useState<ProjectSort>("recent");

  const visibleProjects = useMemo(
    () => sortProjects(filterProjects(projects, search, category, status), sort),
    [category, projects, search, sort, status],
  );
  const openedProject = projects.find((project) => project.id === openedProjectId) ?? null;
  const stats = useMemo(() => buildWorkspaceStats(projects), [projects]);

  function handleCreateProject(input: CreateProjectInput) {
    const project = createProject(input);
    setOpenedProjectId(project.id);
    setIsCreateOpen(false);
  }

  function openProject(projectId: string) {
    setOpenedProjectId(projectId);
    setSelectedProjectId(projectId);
  }

  return (
    <section className="projects-workspace" id="projects" aria-labelledby="projects-title">
      <Card className="project-toolbar-card">
        <SectionHeader
          actions={
            <Button type="button" onClick={() => setIsCreateOpen(true)}>
              Create project
            </Button>
          }
          title="Projects"
          detail="Organise analyses, reports, and activity into a local workspace."
        />
        <section className="project-stats-grid" aria-label="Project statistics">
          <ProjectStat label="Projects" value={String(stats.totalProjects)} detail={`${stats.activeProjects} active`} />
          <ProjectStat label="Analyses" value={String(stats.totalAnalyses)} detail="Completed locally" />
          <ProjectStat label="Responses" value={formatNumber(stats.totalResponses)} detail="Analysed responses" />
          <ProjectStat label="Reports" value={String(stats.totalReports)} detail="Generated PDFs" />
        </section>
        <div className="project-controls" aria-label="Project search and filters">
          <label className="form-field">
            <span>Search</span>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search projects"
              type="search"
            />
          </label>
          <label className="form-field">
            <span>Category</span>
            <select value={category} onChange={(event) => setCategory(event.target.value as ProjectCategory | "All")}>
              <option value="All">All categories</option>
              {projectCategories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label className="form-field">
            <span>Status</span>
            <select value={status} onChange={(event) => setStatus(event.target.value as ProjectStatusFilter)}>
              <option value="active">Active</option>
              <option value="archived">Archived</option>
              <option value="all">All</option>
            </select>
          </label>
          <label className="form-field">
            <span>Sort</span>
            <select value={sort} onChange={(event) => setSort(event.target.value as ProjectSort)}>
              <option value="recent">Recently updated</option>
              <option value="alphabetical">Alphabetical</option>
              <option value="most_analyses">Most analyses</option>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
          </label>
        </div>
      </Card>

      {visibleProjects.length ? (
        <section className="project-card-grid" aria-label="Project cards">
          {visibleProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              isSelected={project.id === selectedProjectId}
              onOpen={() => openProject(project.id)}
            />
          ))}
        </section>
      ) : (
        <Card className="project-empty-card">
          <EmptyState
            title={projects.length ? "No projects match your filters" : "Create your first project"}
            description={
              projects.length
                ? "Adjust search, category, status, or sorting to find the project you need."
                : "Projects organise analyses, reports, exports, and activity while the MVP uses local browser storage."
            }
            action={
              <Button type="button" onClick={() => setIsCreateOpen(true)}>
                Create project
              </Button>
            }
          />
        </Card>
      )}

      {openedProject ? (
        <ProjectDetail
          apiBaseUrl={apiBaseUrl}
          project={openedProject}
          onBack={() => setOpenedProjectId(null)}
          onOpenAnalysis={() => {
            setSelectedProjectId(openedProject.id);
            document.querySelector("#analysis")?.scrollIntoView({ behavior: "smooth" });
          }}
        />
      ) : null}

      {isCreateOpen ? (
        <CreateProjectModal
          onCancel={() => setIsCreateOpen(false)}
          onCreate={handleCreateProject}
        />
      ) : null}
    </section>
  );
}

function ProjectCard({
  isSelected,
  onOpen,
  project,
}: {
  isSelected: boolean;
  onOpen: () => void;
  project: Project;
}) {
  const stats = buildProjectStats(project);
  return (
    <article className={isSelected ? "project-card selected" : "project-card"}>
      <div className="project-card-accent" style={{ background: project.color }} aria-hidden="true" />
      <div className="project-card-header">
        <span className="project-icon" style={{ borderColor: project.color, color: project.color }}>
          {project.icon}
        </span>
        <div>
          <h3>{project.name}</h3>
          <span>{project.category}</span>
        </div>
        <Badge tone={project.archived ? "warning" : "success"}>{project.archived ? "Archived" : "Active"}</Badge>
      </div>
      <p>{project.description || "No description yet."}</p>
      <div className="project-card-stats">
        <ProjectMiniStat label="Responses" value={formatNumber(stats.responses)} />
        <ProjectMiniStat label="Analyses" value={String(stats.analyses)} />
        <ProjectMiniStat label="Reports" value={String(stats.reports)} />
      </div>
      <div className="project-card-footer">
        <span>Updated {formatDate(project.updatedAt)}</span>
        <Button type="button" variant="secondary" onClick={onOpen}>
          Open project
        </Button>
      </div>
    </article>
  );
}

function ProjectDetail({
  apiBaseUrl,
  onBack,
  onOpenAnalysis,
  project,
}: {
  apiBaseUrl: string;
  onBack: () => void;
  onOpenAnalysis: () => void;
  project: Project;
}) {
  const [tab, setTab] = useState<ProjectTab>("overview");
  const stats = buildProjectStats(project);

  return (
    <Card className="project-detail">
      <div className="project-detail-topline">
        <button className="text-button" type="button" onClick={onBack}>
          Projects
        </button>
        <span>/</span>
        <strong>{project.name}</strong>
      </div>
      <SectionHeader
        actions={
          <div className="download-actions">
            <Button type="button" variant="secondary" onClick={onOpenAnalysis}>
              New analysis
            </Button>
            <a className="download-link subtle" href="#reports">
              Reports
            </a>
          </div>
        }
        title={project.name}
        detail={`${project.category} project owned by ${project.owner}`}
      />
      <nav className="project-tabs" aria-label="Project detail tabs">
        {(["overview", "analyses", "reports", "activity", "settings"] as ProjectTab[]).map((item) => (
          <button
            key={item}
            className={tab === item ? "active" : ""}
            type="button"
            onClick={() => setTab(item)}
          >
            {tabLabel(item)}
          </button>
        ))}
      </nav>

      {tab === "overview" ? <ProjectOverview project={project} stats={stats} /> : null}
      {tab === "analyses" ? <ProjectAnalyses apiBaseUrl={apiBaseUrl} project={project} /> : null}
      {tab === "reports" ? <ProjectReports apiBaseUrl={apiBaseUrl} project={project} /> : null}
      {tab === "activity" ? <ProjectActivityTimeline activity={project.activity} /> : null}
      {tab === "settings" ? <ProjectSettings project={project} /> : null}
    </Card>
  );
}

function ProjectOverview({ project, stats }: { project: Project; stats: ReturnType<typeof buildProjectStats> }) {
  const topThemes = Object.entries(stats.themeCounts)
    .sort(([, left], [, right]) => right - left)
    .slice(0, 5);
  const totalSentiment = Object.values(stats.sentimentCounts).reduce((total, value) => total + value, 0) || 1;

  return (
    <div className="project-tab-panel">
      <section className="project-stats-grid">
        <ProjectStat label="Responses analysed" value={formatNumber(stats.responses)} detail="Across this project" />
        <ProjectStat label="Total analyses" value={String(stats.analyses)} detail="Completed runs" />
        <ProjectStat label="Total reports" value={String(stats.reports)} detail="PDF outputs" />
        <ProjectStat label="Latest activity" value={project.activity[0] ? formatDate(project.activity[0].createdAt) : "-"} detail={project.activity[0]?.label ?? "No activity"} />
      </section>

      <section className="project-overview-grid">
        <div className="project-insight-panel">
          <h3>Sentiment Summary</h3>
          {(["positive", "neutral", "negative"] as const).map((sentiment) => (
            <div className="count-row" key={sentiment}>
              <span>{sentiment}</span>
              <strong>{Math.round(((stats.sentimentCounts[sentiment] ?? 0) / totalSentiment) * 100)}%</strong>
            </div>
          ))}
        </div>
        <div className="project-insight-panel">
          <h3>Theme Summary</h3>
          {topThemes.length ? (
            topThemes.map(([theme, count]) => (
              <div className="count-row" key={theme}>
                <span>{theme}</span>
                <strong>{count}</strong>
              </div>
            ))
          ) : (
            <p className="muted">Themes appear after project analyses complete.</p>
          )}
        </div>
        <div className="project-insight-panel">
          <h3>Latest Activity</h3>
          {project.activity.slice(0, 4).map((item) => (
            <div className="activity-mini-row" key={item.id}>
              <strong>{item.label}</strong>
              <span>{item.detail}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function ProjectAnalyses({ apiBaseUrl, project }: { apiBaseUrl: string; project: Project }) {
  const { addProjectActivity } = useAnalysisState();
  if (!project.analyses.length) {
    return <ProjectPanelEmpty title="No analyses yet" description="Run a new analysis and assign it to this project." />;
  }
  return (
    <div className="table-wrap project-table-wrap">
      <table className="dashboard-table">
        <thead>
          <tr>
            <th>Analysis</th>
            <th>Status</th>
            <th>Responses</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {project.analyses.map((analysis) => (
            <tr key={analysis.id}>
              <td>
                <strong>{analysis.title}</strong>
              </td>
              <td>
                <Badge tone="success">{analysis.status}</Badge>
              </td>
              <td>{formatNumber(analysis.responseCount)}</td>
              <td>{formatDate(analysis.createdAt)}</td>
              <td>
                <div className="table-actions">
                  <a className="download-link subtle" href="#results">
                    View Results
                  </a>
                  <a
                    className="download-link subtle"
                    href={`${apiBaseUrl}${analysis.downloadUrl}`}
                    onClick={() =>
                      addProjectActivity(project.id, {
                        type: "csv_exported",
                        label: "CSV exported",
                        detail: `${analysis.title} CSV was downloaded.`,
                      })
                    }
                  >
                    Download CSV
                  </a>
                  {analysis.reportDownloadUrl ? (
                    <a
                      className="download-link subtle"
                      href={`${apiBaseUrl}${analysis.reportDownloadUrl}`}
                      onClick={() =>
                        addProjectActivity(project.id, {
                          type: "pdf_downloaded",
                          label: "PDF downloaded",
                          detail: `${analysis.title} PDF was downloaded.`,
                        })
                      }
                    >
                      Download PDF
                    </a>
                  ) : null}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ProjectReports({ apiBaseUrl, project }: { apiBaseUrl: string; project: Project }) {
  const { addProjectActivity } = useAnalysisState();
  if (!project.reports.length) {
    return <ProjectPanelEmpty title="No reports yet" description="Generated PDF reports will appear here." />;
  }
  return (
    <div className="project-report-list">
      {project.reports.map((report) => (
        <article className="report-row" key={report.id}>
          <div>
            <strong>{report.title}</strong>
            <span>{report.executiveSummary}</span>
            <small>Created {formatDate(report.createdAt)}</small>
          </div>
          <a
            className="download-link subtle"
            href={`${apiBaseUrl}${report.downloadUrl}`}
            onClick={() =>
              addProjectActivity(project.id, {
                type: "pdf_downloaded",
                label: "PDF downloaded",
                detail: `${report.title} was downloaded.`,
              })
            }
          >
            Download
          </a>
        </article>
      ))}
    </div>
  );
}

function ProjectActivityTimeline({ activity }: { activity: ProjectActivity[] }) {
  if (!activity.length) {
    return <ProjectPanelEmpty title="No activity yet" description="Project activity appears as work is completed." />;
  }
  return (
    <ol className="project-timeline">
      {activity.map((item) => (
        <li key={item.id}>
          <span className="timeline-dot" aria-hidden="true" />
          <div>
            <strong>{item.label}</strong>
            <p>{item.detail}</p>
            <time>{formatDate(item.createdAt)}</time>
          </div>
        </li>
      ))}
    </ol>
  );
}

function ProjectSettings({ project }: { project: Project }) {
  const { archiveProject, deleteProject, duplicateProject, updateProject } = useAnalysisState();
  const [form, setForm] = useState<UpdateProjectInput>({
    name: project.name,
    description: project.description,
    category: project.category,
    owner: project.owner,
    color: project.color,
    icon: project.icon,
  });

  function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    updateProject(project.id, form);
  }

  function handleDelete() {
    if (window.confirm(`Delete ${project.name}? This removes the local project record only.`)) {
      deleteProject(project.id);
    }
  }

  return (
    <form className="project-settings" onSubmit={handleSave}>
      <ProjectFormFields form={form as CreateProjectInput} onChange={(next) => setForm(next)} />
      <div className="project-danger-zone">
        <Button type="submit">Save changes</Button>
        <Button type="button" variant="secondary" onClick={() => archiveProject(project.id)}>
          Archive
        </Button>
        <Button type="button" variant="secondary" onClick={() => duplicateProject(project.id)}>
          Duplicate
        </Button>
        <Button type="button" variant="ghost" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </form>
  );
}

function CreateProjectModal({
  onCancel,
  onCreate,
}: {
  onCancel: () => void;
  onCreate: (input: CreateProjectInput) => void;
}) {
  const [form, setForm] = useState<CreateProjectInput>(defaultProjectForm);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.name.trim()) {
      return;
    }
    onCreate({ ...form, name: form.name.trim(), owner: form.owner.trim() || "SurveyIQ User" });
  }

  return (
    <div className="modal-scrim" role="presentation">
      <section className="project-modal" role="dialog" aria-modal="true" aria-labelledby="create-project-title">
        <SectionHeader title="Create Project" detail="Create a local workspace project for analyses and reports." />
        <form onSubmit={handleSubmit}>
          <ProjectFormFields form={form} onChange={setForm} />
          <div className="modal-actions">
            <Button type="button" variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={!form.name.trim()}>
              Create project
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
}

function ProjectFormFields({
  form,
  onChange,
}: {
  form: CreateProjectInput;
  onChange: (input: CreateProjectInput) => void;
}) {
  return (
    <div className="project-form-grid">
      <label className="form-field">
        <span>Name</span>
        <input value={form.name} onChange={(event) => onChange({ ...form, name: event.target.value })} required />
      </label>
      <label className="form-field">
        <span>Owner</span>
        <input value={form.owner} onChange={(event) => onChange({ ...form, owner: event.target.value })} />
      </label>
      <label className="form-field full">
        <span>Description</span>
        <textarea value={form.description} onChange={(event) => onChange({ ...form, description: event.target.value })} />
      </label>
      <label className="form-field">
        <span>Category</span>
        <select value={form.category} onChange={(event) => onChange({ ...form, category: event.target.value as ProjectCategory })}>
          {projectCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>
      <label className="form-field">
        <span>Icon</span>
        <select value={form.icon} onChange={(event) => onChange({ ...form, icon: event.target.value })}>
          {icons.map((icon) => (
            <option key={icon} value={icon}>
              {icon}
            </option>
          ))}
        </select>
      </label>
      <label className="form-field">
        <span>Colour</span>
        <input value={form.color} onChange={(event) => onChange({ ...form, color: event.target.value })} type="color" />
      </label>
    </div>
  );
}

function ProjectPanelEmpty({ description, title }: { description: string; title: string }) {
  return (
    <div className="project-panel-empty">
      <EmptyState title={title} description={description} />
    </div>
  );
}

function ProjectStat({ detail, label, value }: { detail: string; label: string; value: string }) {
  return (
    <div className="metric-card">
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{detail}</small>
    </div>
  );
}

function ProjectMiniStat({ label, value }: { label: string; value: string }) {
  return (
    <span>
      <strong>{value}</strong>
      {label}
    </span>
  );
}

function buildWorkspaceStats(projects: Project[]) {
  return projects.reduce(
    (stats, project) => {
      const projectStats = buildProjectStats(project);
      stats.totalProjects += 1;
      stats.activeProjects += project.archived ? 0 : 1;
      stats.totalAnalyses += projectStats.analyses;
      stats.totalResponses += projectStats.responses;
      stats.totalReports += projectStats.reports;
      return stats;
    },
    { activeProjects: 0, totalAnalyses: 0, totalProjects: 0, totalReports: 0, totalResponses: 0 },
  );
}

function buildProjectStats(project: Project) {
  return project.analyses.reduce(
    (stats, analysis) => {
      stats.analyses += 1;
      stats.responses += analysis.responseCount;
      stats.reports = project.reports.length;
      for (const [sentiment, count] of Object.entries(analysis.sentimentCounts)) {
        stats.sentimentCounts[sentiment.toLowerCase()] = (stats.sentimentCounts[sentiment.toLowerCase()] ?? 0) + count;
      }
      for (const [theme, count] of Object.entries(analysis.themeCounts)) {
        stats.themeCounts[theme] = (stats.themeCounts[theme] ?? 0) + count;
      }
      return stats;
    },
    {
      analyses: 0,
      reports: project.reports.length,
      responses: 0,
      sentimentCounts: {} as Record<string, number>,
      themeCounts: {} as Record<string, number>,
    },
  );
}

function filterProjects(
  projects: Project[],
  search: string,
  category: ProjectCategory | "All",
  status: ProjectStatusFilter,
) {
  const query = search.trim().toLowerCase();
  return projects.filter((project) => {
    const matchesSearch =
      !query ||
      [project.name, project.description, project.category, project.owner].some((value) =>
        value.toLowerCase().includes(query),
      );
    const matchesCategory = category === "All" || project.category === category;
    const matchesStatus =
      status === "all" || (status === "active" && !project.archived) || (status === "archived" && project.archived);
    return matchesSearch && matchesCategory && matchesStatus;
  });
}

function sortProjects(projects: Project[], sort: ProjectSort) {
  return [...projects].sort((left, right) => {
    if (sort === "alphabetical") {
      return left.name.localeCompare(right.name);
    }
    if (sort === "most_analyses") {
      return right.analyses.length - left.analyses.length;
    }
    if (sort === "newest") {
      return new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime();
    }
    if (sort === "oldest") {
      return new Date(left.createdAt).getTime() - new Date(right.createdAt).getTime();
    }
    return new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime();
  });
}

function tabLabel(tab: ProjectTab) {
  return tab.charAt(0).toUpperCase() + tab.slice(1);
}

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "-";
  }
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

function formatNumber(value: number) {
  return new Intl.NumberFormat().format(value);
}
