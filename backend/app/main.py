from __future__ import annotations

import logging
import os
import uuid
from pathlib import Path

import pandas as pd
from dotenv import load_dotenv
from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel, Field

from .analysis import (
    AnalysisResult,
    analyse_feedback_with_openai,
    build_overall_results,
)
from .dataset_intelligence import (
    ColumnProfile,
    build_cross_analysis,
    build_enhanced_executive_summary,
    build_quantitative_summary,
    build_segment_summary,
    clean_feedback_entries,
    profile_dataframe_columns,
)
from .file_store import (
    REPORT_DIR,
    RESULT_DIR,
    dataframe_preview,
    ensure_storage,
    new_upload_id,
    read_table,
    report_path,
    result_path,
    save_upload,
    upload_path,
)
from .reporting import generate_management_report_pdf


BACKEND_DIR = Path(__file__).resolve().parent.parent

load_dotenv(BACKEND_DIR / ".env")
logging.basicConfig(level=os.getenv("LOG_LEVEL", "INFO"))
logger = logging.getLogger(__name__)

ensure_storage()

app = FastAPI(title="AI Survey and Feedback Analysis API")

default_frontend_origins = ["http://localhost:3000", "http://127.0.0.1:3000"]
configured_frontend_origins = [
    origin.strip()
    for origin in os.getenv("FRONTEND_ORIGIN", "").split(",")
    if origin.strip()
]
allowed_frontend_origins = sorted(
    set(default_frontend_origins + configured_frontend_origins)
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_frontend_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class UploadResponse(BaseModel):
    upload_id: str
    filename: str
    columns: list[str]
    preview: list[dict]
    row_count: int
    column_profiles: list[ColumnProfile] = Field(default_factory=list)


class AnalyseRequest(BaseModel):
    upload_id: str
    feedback_column: str | None = Field(
        default=None,
        description="Legacy single feedback column selector.",
    )
    feedback_columns: list[str] | None = Field(
        default=None,
        description="One or more feedback columns to analyse.",
    )

    def normalized_feedback_columns(self) -> list[str]:
        requested_columns = self.feedback_columns or (
            [self.feedback_column] if self.feedback_column else []
        )
        selected: list[str] = []
        for column in requested_columns:
            if column and column not in selected:
                selected.append(column)
        return selected


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/upload", response_model=UploadResponse)
async def upload_file(file: UploadFile = File(...)) -> UploadResponse:
    upload_id = new_upload_id()
    saved_path = await save_upload(upload_id, file)
    df = read_table(saved_path)
    logger.info(
        "Uploaded file parsed",
        extra={"upload_id": upload_id, "rows": len(df), "columns": len(df.columns)},
    )
    column_profiles = profile_dataframe_columns(df)

    return UploadResponse(
        upload_id=upload_id,
        filename=file.filename or saved_path.name,
        columns=[str(column) for column in df.columns],
        preview=dataframe_preview(df),
        row_count=len(df),
        column_profiles=column_profiles,
    )


@app.post("/analyse", response_model=AnalysisResult)
def analyse_feedback(request: AnalyseRequest) -> AnalysisResult:
    path = upload_path(request.upload_id)
    df = read_table(path)
    column_profiles = profile_dataframe_columns(df)
    selected_feedback_columns = _selected_feedback_columns(request, df)

    feedback_entries = clean_feedback_entries(df, selected_feedback_columns)
    feedback_values = [entry.original_response for entry in feedback_entries]
    payload = analyse_feedback_with_openai(feedback_values)
    for item, entry in zip(payload.results, feedback_entries, strict=True):
        item.source_row_index = entry.source_row_index
        item.source_feedback_column = entry.source_feedback_column

    overall = build_overall_results(payload)
    quantitative_summary = build_quantitative_summary(df, column_profiles)
    segment_summary = build_segment_summary(df, column_profiles)
    cross_analysis = build_cross_analysis(
        df,
        column_profiles,
        payload.results,
        quantitative_summary,
    )
    enhanced_executive_summary = build_enhanced_executive_summary(
        base_summary=overall.executive_summary,
        quantitative_summary=quantitative_summary,
        segment_summary=segment_summary,
        cross_analysis=cross_analysis,
    )
    overall.executive_summary = enhanced_executive_summary

    analysis_id = uuid.uuid4().hex
    result_df = pd.DataFrame([item.model_dump() for item in payload.results])
    output_path = RESULT_DIR / f"{analysis_id}.csv"
    result_df.to_csv(output_path, index=False)
    report_output_path = REPORT_DIR / f"{analysis_id}.pdf"
    try:
        generate_management_report_pdf(
            report_output_path,
            analysis_id=analysis_id,
            results=payload.results,
            overall=overall,
            row_count=len(df),
            selected_feedback_columns=selected_feedback_columns,
            column_profiles=column_profiles,
            quantitative_summary=quantitative_summary,
            segment_summary=segment_summary,
            cross_analysis=cross_analysis,
            enhanced_executive_summary=enhanced_executive_summary,
        )
    except Exception as exc:
        logger.exception("Management report generation failed", extra={"analysis_id": analysis_id})
        raise HTTPException(status_code=500, detail=f"Management report generation failed: {exc}") from exc

    logger.info(
        "Feedback analysis completed",
        extra={
            "upload_id": request.upload_id,
            "analysis_id": analysis_id,
            "responses": len(payload.results),
            "feedback_columns": len(selected_feedback_columns),
        },
    )

    return AnalysisResult(
        analysis_id=analysis_id,
        results=payload.results,
        overall=overall,
        download_url=f"/download/{analysis_id}",
        report_download_url=f"/download-report/{analysis_id}",
        column_profiles=column_profiles,
        selected_feedback_columns=selected_feedback_columns,
        quantitative_summary=quantitative_summary,
        segment_summary=segment_summary,
        cross_analysis=cross_analysis,
        enhanced_executive_summary=enhanced_executive_summary,
    )


@app.get("/download/{analysis_id}")
def download_analysis(analysis_id: str) -> FileResponse:
    path = result_path(analysis_id)
    return FileResponse(
        path,
        media_type="text/csv",
        filename=f"analysed-feedback-{analysis_id}.csv",
    )


@app.get("/download-report/{analysis_id}")
def download_management_report(analysis_id: str) -> FileResponse:
    path = report_path(analysis_id)
    return FileResponse(
        path,
        media_type="application/pdf",
        filename=f"management-report-{analysis_id}.pdf",
    )


def _selected_feedback_columns(request: AnalyseRequest, df: pd.DataFrame) -> list[str]:
    requested_columns = request.normalized_feedback_columns()
    selected: list[str] = []
    for column in requested_columns:
        if column not in df.columns:
            raise HTTPException(status_code=400, detail=f"Selected feedback column was not found: {column}")
        selected.append(column)

    if not selected:
        raise HTTPException(status_code=400, detail="Select at least one feedback column before analysing feedback.")
    return selected
