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
from pydantic import BaseModel

from .analysis import (
    AnalysisResult,
    analyse_feedback_with_openai,
    build_overall_results,
    clean_feedback_values,
)
from .file_store import (
    RESULT_DIR,
    dataframe_preview,
    ensure_storage,
    new_upload_id,
    read_table,
    result_path,
    save_upload,
    upload_path,
)


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


class AnalyseRequest(BaseModel):
    upload_id: str
    feedback_column: str


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

    return UploadResponse(
        upload_id=upload_id,
        filename=file.filename or saved_path.name,
        columns=[str(column) for column in df.columns],
        preview=dataframe_preview(df),
        row_count=len(df),
    )


@app.post("/analyse", response_model=AnalysisResult)
def analyse_feedback(request: AnalyseRequest) -> AnalysisResult:
    path = upload_path(request.upload_id)
    df = read_table(path)

    if request.feedback_column not in df.columns:
        raise HTTPException(status_code=400, detail="Selected feedback column was not found.")

    feedback_values = clean_feedback_values(df[request.feedback_column])
    payload = analyse_feedback_with_openai(feedback_values)
    overall = build_overall_results(payload)

    analysis_id = uuid.uuid4().hex
    result_df = pd.DataFrame([item.model_dump() for item in payload.results])
    output_path = RESULT_DIR / f"{analysis_id}.csv"
    result_df.to_csv(output_path, index=False)
    logger.info(
        "Feedback analysis completed",
        extra={
            "upload_id": request.upload_id,
            "analysis_id": analysis_id,
            "responses": len(payload.results),
        },
    )

    return AnalysisResult(
        analysis_id=analysis_id,
        results=payload.results,
        overall=overall,
        download_url=f"/download/{analysis_id}",
    )


@app.get("/download/{analysis_id}")
def download_analysis(analysis_id: str) -> FileResponse:
    path = result_path(analysis_id)
    return FileResponse(
        path,
        media_type="text/csv",
        filename=f"analysed-feedback-{analysis_id}.csv",
    )
