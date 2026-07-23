# PrepPilot AI — Interview Trainer Agent

An AI-powered interview preparation platform. Users upload their resume,
pick a job role, get AI-generated interview questions, submit answers, and
receive AI feedback (score, strengths, weaknesses, a better sample answer).

This repository is being built **feature by feature**. This first commit is
the **project scaffolding** — both apps boot, but most pages/endpoints are
placeholders that will be filled in as each feature is completed.

## Tech Stack

**Frontend:** React + Vite, TailwindCSS, Axios, React Router
**Backend:** Java 21, Spring Boot 3.3, Spring Security, JWT, Spring Data JPA, MySQL, Maven
**AI:** IBM Granite API
**RAG (later):** LangChain4j + PostgreSQL/pgvector
**Deploy:** Frontend → Vercel, Backend → Render, Database → MySQL (or Neon Postgres if you switch back)

## Project Structure

```
interview-trainer-agent/
├── backend/     Spring Boot API (Java 21, Maven)
└── frontend/    React + Vite SPA
```

## Prerequisites

- Java 21 (JDK)
- Maven 3.9+ (or use your IDE's bundled Maven)
- Node.js 18+ and npm
- A MySQL server (8.0+) running locally, or a hosted MySQL instance

## Backend — how to run

```bash
cd backend
cp .env.example .env      # fill in your real DB credentials, JWT secret, etc.
mvn spring-boot:run
```

The API starts on `http://localhost:8080`.

### Backend — how to test

```bash
# Health check
curl http://localhost:8080/api/health
# -> {"status":"UP","service":"PrepPilot AI backend"}

# Register
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Ayushi","email":"abc@gmail.com","password":"password123"}'
# -> {"message":"Registration successful"}

# Login (copy the token from the response)
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"abc@gmail.com","password":"password123"}'
# -> {"token":"...","id":1,"name":"Ayushi","email":"abc@gmail.com"}

# Get current user (replace TOKEN with the value above)
curl http://localhost:8080/api/auth/me \
  -H "Authorization: Bearer TOKEN"
# -> {"id":1,"name":"Ayushi","email":"abc@gmail.com","role":"USER"}
```

Error cases to try:
- Register with the same email twice → `409 Conflict`
- Register with a password under 8 characters → `400 Bad Request` with `fieldErrors`
- Login with the wrong password → `401 Unauthorized`
- Call `/api/auth/me` with no token → `401 Unauthorized`

## Frontend — how to run

```bash
cd frontend
cp .env.example .env      # points at your backend URL
npm install
npm run dev
```

Open the printed local URL (typically `http://localhost:5173`).

### Frontend — how to test

- Visit `/` — you should see the Navbar and the Dashboard placeholder page.
- Click through Dashboard / Upload Resume / Interview / History / Login —
  each route should render its placeholder page without errors.

## Environment Variables

Never commit real secrets. Copy `.env.example` → `.env` in both `backend/`
and `frontend/`, and fill in real values there. `.env` is git-ignored.

## Feature Roadmap

- [x] Project scaffolding
- [x] Authentication (Register / Login / JWT)
- [x] Resume upload + text extraction
- [x] Interview question generation (IBM Granite)
- [x] Answer evaluation (IBM Granite)
- [ ] Interview history
- [ ] Dashboard stats

Each feature will be added on top of this scaffold without breaking what
already works.
