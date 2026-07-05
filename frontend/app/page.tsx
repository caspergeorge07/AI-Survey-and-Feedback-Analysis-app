"use client";

import { AppLayout, ContentArea, PageHeader } from "./components/shell";
import { AnalysisStateProvider } from "./components/analysis-state";
import { DatasetIntelligenceWizard } from "./components/dataset-wizard";
import { ExecutiveDashboard } from "./components/executive-dashboard";
import { ProjectWorkspace } from "./components/project-workspace";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

export default function Home() {
  return (
    <AppLayout activeItem="Dashboard">
      <AnalysisStateProvider>
        <ContentArea>
          <PageHeader
            actions={
              <>
                <a className="download-link" href="#analysis">
                  New analysis
                </a>
                <a className="download-link subtle" href={`${API_BASE_URL}/health`} target="_blank">
                  API health
                </a>
              </>
            }
            description="Monitor recent feedback intelligence, executive reports, sentiment patterns, and the next actions that matter most."
            eyebrow="Dashboard"
            title="Executive Dashboard"
          />
          <ExecutiveDashboard apiBaseUrl={API_BASE_URL} />

          <PageHeader
            description="Create local projects, organise analyses and reports, review activity, and choose which project new analyses belong to."
            eyebrow="Workspace"
            title="Projects"
          />
          <ProjectWorkspace apiBaseUrl={API_BASE_URL} />

          <PageHeader
            description="Upload CSV or Excel survey data, review SurveyIQ's column intelligence, configure analysis outputs, and generate executive-ready results."
            eyebrow="Dataset intelligence"
            title="New Analysis Wizard"
          />
          <DatasetIntelligenceWizard apiBaseUrl={API_BASE_URL} />
        </ContentArea>
      </AnalysisStateProvider>
    </AppLayout>
  );
}
