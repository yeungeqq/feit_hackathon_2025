# AdaptEd – Early Detection for Learning Disability

This project provides a web platform for **teachers** and **students** to run and manage educational tests, including the **Rapid Automatized Naming (RAN) Test**, handwriting recognition (future), behavioral questionnaire (future), and result reporting.

## 🔑 Login Credentials

- **Teacher account**

  - Email: `teacher@test.com`
  - Password: `1234`
  - Redirects to: `/homepage`
- **Student account**

  - Email: `sarah.d@gmail.com`
  - Password: `1234`
  - Redirects to: `/student-dashboard`

Any other credentials will return an *Invalid credentials* error.

## 🚀 Features

- Teacher dashboard to conduct actual tests and assign tasks for students.
- Student dashboard to complete assigned tasks, games, and exercises.
- **RAN Test** with:
  - Fixed grid of colors.
  - Voice recording via microphone.
  - Backend transcription with **AssemblyAI API**.
  - Automatic scoring: accuracy, errors, speed (items/minute).
- Storage of scores for student profiles, with the latest results displayed dynamically.

## 🛠 Tech Stack

### Frontend

- React + TypeScript
- Vite
- TailwindCSS (UI styling)

### Backend

- Node.js + Express
- Multer (file uploads)
- AssemblyAI (speech-to-text API)
- TypeScript

### AI/ML Usage

- **RAN Test**: Speech-to-text (AssemblyAI) + scoring alignment.
- **Potential Extensions**:
  - Handwriting recognition (CNN, OCR models).
  - Behavioral questionnaires (NLP for free text).
  - Automated report generation (LLMs).

## 🌐 APIs Used

### 1. **AssemblyAI API** (external)
- `POST /v2/upload` → Upload audio file and get `upload_url`.
- `POST /v2/transcript` → Create transcription request.
- `GET /v2/transcript/:id` → Poll for transcription result (completed/error).
- Returns transcript + word-level timestamps used for scoring.

### 2. **AdaptEd Backend API** (internal, Express server)

#### RAN Test
- `POST /api/ran/sessions`  
  Create a new RAN test session.  
  **Body:** `{ studentId, grid, durationMs }`  
  **Response:** `{ id, uploadUrl }`

- `POST /api/ran/sessions/:id/audio`  
  Upload recorded audio blob.  

- `POST /api/ran/sessions/:id/score`  
  Start scoring (sends audio to AssemblyAI, polls transcript, calculates metrics).

- `GET /api/ran/sessions/:id`  
  Retrieve session status and result.  
  **Response:** `{ id, studentId, grid, durationMs, status, result }`

