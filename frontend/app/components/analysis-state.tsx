"use client";

import { createContext, ReactNode, useContext, useMemo, useState } from "react";

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
};

type AnalysisStateContextValue = {
  latestAnalysis: LatestAnalysis | null;
  setLatestAnalysis: (analysis: LatestAnalysis | null) => void;
};

const AnalysisStateContext = createContext<AnalysisStateContextValue | null>(null);

export function AnalysisStateProvider({ children }: { children: ReactNode }) {
  const [latestAnalysis, setLatestAnalysis] = useState<LatestAnalysis | null>(null);
  const value = useMemo(() => ({ latestAnalysis, setLatestAnalysis }), [latestAnalysis]);

  return <AnalysisStateContext.Provider value={value}>{children}</AnalysisStateContext.Provider>;
}

export function useAnalysisState() {
  const context = useContext(AnalysisStateContext);
  if (!context) {
    throw new Error("useAnalysisState must be used inside AnalysisStateProvider.");
  }
  return context;
}
