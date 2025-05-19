
# Resume Skill Extractor - Python Backend

This is the Python backend for the Resume Skill Extractor application. It provides API endpoints for extracting skills from uploaded PDF resumes.

## Setup Instructions

1. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

2. Run the application:
   ```
   python app.py
   ```

The server will start on http://localhost:5000

## API Endpoints

### GET /api/status
Check if the backend is running.

### POST /api/extract-skills
Upload a PDF resume and extract skills.

**Request:**
- Form data with a "file" field containing the PDF document

**Response:**
- JSON object with extracted skills, including name, category, and confidence level

## Implementation Notes

- This backend uses Flask with CORS support to allow requests from the React frontend
- PDF text extraction is handled using PyPDF2
- Skill matching uses regex pattern matching against predefined skill lists
- For demonstration purposes, if no skills are found, mock data will be returned
