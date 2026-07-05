# AI Survey and Feedback Analysis MVP

A local full-stack MVP for uploading survey data, previewing columns, selecting a free-text feedback column, analysing responses with the OpenAI API, and downloading an analysed CSV plus a management PDF report.

## Project Structure

```text
backend/      FastAPI API, local upload/result/report storage, pandas parsing, OpenAI analysis
frontend/     Next.js app for upload, preview, analysis, and download
sample_data/  Example CSV to test the flow
README.md     Setup and troubleshooting
```

## Requirements

- Python 3.10+
- Node.js 20+
- pnpm 11+ recommended
- An OpenAI API key

## Backend Setup

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
```

Edit `backend/.env` and set:

```env
OPENAI_API_KEY=sk-your-api-key-here
OPENAI_MODEL=gpt-4o-mini
OPENAI_ANALYSIS_BATCH_SIZE=50
FRONTEND_ORIGIN=http://localhost:3000
```

If `FRONTEND_ORIGIN` is omitted, the backend allows both `http://localhost:3000` and `http://127.0.0.1:3000`. You can also set `FRONTEND_ORIGIN` to a comma-separated list if you use additional local URLs, for example:

```env
FRONTEND_ORIGIN=http://localhost:3000,http://127.0.0.1:3000
```

Run the backend:

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Check it is running at `http://localhost:8000/health`.

## Frontend Setup

Open a second terminal:

```bash
cd frontend
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

If your backend runs somewhere other than `http://localhost:8000`, create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

Then restart `pnpm dev`.

## Using the App

1. Upload `sample_data/sample_feedback.csv` or your own `.csv`, `.xls`, or `.xlsx` file.
2. Review the first 10 rows and detected column names.
3. Select the column containing free-text feedback.
4. Click **Analyse feedback**.
5. Review per-response themes, sentiment, confidence, and reasons.
6. Download the analysed CSV.
7. Use the `report_download_url` returned by the API to download the management PDF report.

## Local File Handling

Uploaded files are stored in `backend/storage/uploads/`.
Analysed CSVs are stored in `backend/storage/results/`.
Management PDF reports are stored in `backend/storage/reports/`.
The `backend/storage/` folder is ignored by git.

## Common Troubleshooting

### `OPENAI_API_KEY is not set`

Create `backend/.env` from `backend/.env.example`, add your API key, and restart the backend.

### Browser says the API request failed

Confirm the backend is running:

```bash
curl http://localhost:8000/health
```

Also check that `FRONTEND_ORIGIN` in `backend/.env` matches the frontend URL.

### Excel upload fails

Make sure backend dependencies were installed with:

```bash
pip install -r requirements.txt
```

Excel support depends on `openpyxl`.

### `pnpm install` fails

Check your Node.js version:

```bash
node --version
```

Use Node.js 20 or newer. If `pnpm` is missing, enable it with:

```bash
corepack enable
```

### OpenAI analysis returns an error

Check that your API key is valid, your account has API access, and the model in `OPENAI_MODEL` is available to your account.

### Large files are slow

The backend analyses responses in batches using `OPENAI_ANALYSIS_BATCH_SIZE`, which defaults to `50`. Larger files will still take longer because each batch is analysed by the OpenAI API before the backend consolidates themes and results.
