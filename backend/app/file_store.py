from __future__ import annotations

import json
import re
import uuid
from pathlib import Path

import pandas as pd
from fastapi import HTTPException, UploadFile


BASE_DIR = Path(__file__).resolve().parent.parent
STORAGE_DIR = BASE_DIR / "storage"
UPLOAD_DIR = STORAGE_DIR / "uploads"
RESULT_DIR = STORAGE_DIR / "results"

SUPPORTED_EXTENSIONS = {".csv", ".xls", ".xlsx"}
STORAGE_ID_PATTERN = re.compile(r"^[a-f0-9]{32}$")


def ensure_storage() -> None:
    UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
    RESULT_DIR.mkdir(parents=True, exist_ok=True)


def new_upload_id() -> str:
    return uuid.uuid4().hex


def validate_storage_id(value: str, label: str) -> str:
    if not STORAGE_ID_PATTERN.fullmatch(value):
        raise HTTPException(status_code=400, detail=f"Invalid {label}.")
    return value


def file_extension(filename: str) -> str:
    return Path(filename).suffix.lower()


async def save_upload(upload_id: str, file: UploadFile) -> Path:
    ensure_storage()

    extension = file_extension(file.filename or "")
    if extension not in SUPPORTED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail="Unsupported file type. Upload a CSV, XLS, or XLSX file.",
        )

    destination = UPLOAD_DIR / f"{upload_id}{extension}"
    with destination.open("wb") as output:
        while chunk := await file.read(1024 * 1024):
            output.write(chunk)

    return destination


def upload_path(upload_id: str) -> Path:
    safe_upload_id = validate_storage_id(upload_id, "upload ID")
    matches = [
        UPLOAD_DIR / f"{safe_upload_id}{extension}"
        for extension in SUPPORTED_EXTENSIONS
        if (UPLOAD_DIR / f"{safe_upload_id}{extension}").exists()
    ]
    if not matches:
        raise HTTPException(status_code=404, detail="Upload not found.")
    return matches[0]


def result_path(analysis_id: str) -> Path:
    safe_analysis_id = validate_storage_id(analysis_id, "analysis ID")
    path = RESULT_DIR / f"{safe_analysis_id}.csv"
    if not path.exists():
        raise HTTPException(status_code=404, detail="Analysis result not found.")
    return path


def read_table(path: Path) -> pd.DataFrame:
    try:
        if path.suffix.lower() == ".csv":
            return pd.read_csv(path)
        return pd.read_excel(path)
    except Exception as exc:
        raise HTTPException(
            status_code=400,
            detail=f"Could not read file. Check that it is a valid CSV or Excel workbook. {exc}",
        ) from exc


def dataframe_preview(df: pd.DataFrame, rows: int = 10) -> list[dict]:
    clean_df = df.head(rows).where(pd.notnull(df), None)
    return json.loads(clean_df.to_json(orient="records", date_format="iso"))
