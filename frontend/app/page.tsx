"use client";

import { AppLayout, ContentArea, PageHeader } from "./components/shell";
import { DatasetIntelligenceWizard } from "./components/dataset-wizard";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

export default function Home() {
  return (
    <AppLayout activeItem="Analysis">
      <ContentArea>
        <PageHeader
          actions={
            <a className="download-link subtle" href={`${API_BASE_URL}/health`} target="_blank">
              API health
            </a>
          }
          description="Upload CSV or Excel survey data, review SurveyIQ's column intelligence, configure analysis outputs, and generate executive-ready results."
          eyebrow="Dataset intelligence"
          title="New Analysis Wizard"
        />
        <DatasetIntelligenceWizard apiBaseUrl={API_BASE_URL} />
      </ContentArea>
    </AppLayout>
  );
}
