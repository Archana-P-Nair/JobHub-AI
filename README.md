# 🚀 JobHub AI — AI-Powered Job Portal

> A full-stack job portal application powered by **Google Gemini AI** that intelligently matches candidates to jobs based on their skills and profile, built with **React**, **Node.js/Express**, and **MongoDB**.

[![CI Pipeline](https://github.com/Archana-P-Nair/JobHub-AI/actions/workflows/ci.yml/badge.svg)](https://github.com/Archana-P-Nair/JobHub-AI/actions/workflows/ci.yml)
[![Node.js](https://img.shields.io/badge/Node.js-v20-green)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-v19-blue)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen)](https://www.mongodb.com/atlas)
[![Powered by Gemini](https://img.shields.io/badge/AI-Gemini%202.5%20Flash-orange)](https://ai.google.dev/)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
- [CI/CD Pipeline](#cicd-pipeline)
- [Deployment](#deployment)
- [Screenshots](#screenshots)

---

## 🌟 Overview

**JobHub AI** is a modern, intelligent job portal that bridges the gap between recruiters and candidates using the power of artificial intelligence. Instead of manually browsing through hundreds of job listings, candidates receive **personalized, AI-generated job recommendations** scored and ranked by Google Gemini based on their skills, headline, and experience.

Recruiters get a clean, intuitive dashboard to post jobs, manage applications, and view analytics. Candidates can browse jobs, save favourites, apply with one click, and track their application status — all in one place.

---

## ✨ Features

### 👤 Candidate Features
| Feature | Description |
|---|---|
| 🤖 AI Job Recommendations | Google Gemini 2.5 Flash analyses your profile and scores each job by compatibility |
| 🔍 Browse & Search Jobs | Full-text search with filters for location, employment type, and remote preference |
| 🔖 Save Jobs | Bookmark interesting jobs for later review |
| 📄 One-Click Apply | Apply directly through the platform |
| 📊 Application Tracker | View all submitted applications and their status in real-time |
| 👤 Profile Management | Update name, headline, skills, LinkedIn, GitHub, and upload resume |

### 🏢 Recruiter Features
| Feature | Description |
|---|---|
| 📝 Post Jobs | Create detailed job listings with salary range, skills, employment type |
| 📋 Manage Applications | View all applicants per job with their profiles |
| ✅ Update Status | Approve, reject, or shortlist applicants |
| 📈 Analytics Dashboard | View job performance and application statistics with charts |
| ✏️ Edit / Delete Jobs | Full control over published job listings |

### 🔐 Authentication
- JWT-based secure authentication
- Role-based access control (Candidate / Recruiter)
- Protected routes on both frontend and backend

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **React 19** | UI framework |
| **React Router v7** | Client-side routing |
| **Axios** | HTTP client for API calls |
| **React Hook Form** | Form validation and management |
| **React Hot Toast** | Elegant toast notifications |
| **Lucide React** | Icon library |
| **TailwindCSS v4** | Utility-first styling |
| **Vite** | Lightning-fast dev server and build tool |

### Backend
| Technology | Purpose |
|---|---|
| **Node.js + Express v5** | REST API server |
| **MongoDB + Mongoose** | NoSQL database and ODM |
| **Google Gemini 2.5 Flash** | AI-powered job recommendations |
| **JWT (jsonwebtoken)** | Secure authentication tokens |
| **bcrypt** | Password hashing |
| **Multer** | Resume file upload handling |
| **dotenv** | Environment variable management |
| **CORS** | Cross-origin request handling |

### DevOps & Deployment
| Technology | Purpose |
|---|---|
| **GitHub Actions** | CI pipeline — lint, build verification |
| **Vercel** | Frontend and Backend deployment (serverless) |
| **MongoDB Atlas** | Cloud-hosted database |
| **Git** | Version control |

---

## 🏗️ Architecture

```
┌──────────────────────────────────────────────┐
│              CLIENT (Vercel)                  │
│  React + Vite SPA                             │
│  - Auth Context (JWT stored in localStorage) │
│  - Protected Routes                           │
│  - Axios API Client → VITE_API_URL            │
└────────────────────┬─────────────────────────┘
                     │  HTTPS API Calls (/api/*)
                     ▼
┌──────────────────────────────────────────────┐
│            BACKEND (Vercel Serverless)        │
│  Node.js + Express                            │
│  ┌─────────┐  ┌───────────┐  ┌────────────┐ │
│  │  Auth   │  │   Jobs    │  │    AI      │ │
│  │ Routes  │  │  Routes   │  │  Routes    │ │
│  └────┬────┘  └─────┬─────┘  └─────┬──────┘ │
│       │             │              │         │
│  ┌────▼─────────────▼──────────────▼──────┐ │
│  │          Middleware Layer               │ │
│  │  authMiddleware · authorize · multer    │ │
│  └───────────────────┬─────────────────────┘ │
└──────────────────────┼──────────────────────┘
                       │
         ┌─────────────┴──────────────┐
         ▼                            ▼
┌─────────────────┐        ┌──────────────────┐
│  MongoDB Atlas  │        │  Google Gemini   │
│  (Database)     │        │  2.5 Flash (AI)  │
└─────────────────┘        └──────────────────┘
```

---

## 📁 Project Structure

```
JobHub-AI/
├── .github/
│   └── workflows/
│       └── ci.yml              # GitHub Actions CI pipeline
│
├── client/                     # React frontend (Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── ai/             # AIRecommendationCard
│   │   │   ├── auth/           # LoginForm, RegisterForm, RoleSelector
│   │   │   ├── dashboard/      # DashboardLayout, Sidebar, Topbar
│   │   │   ├── jobs/           # JobCard, JobGrid, JobFilters, SearchBar, Pagination
│   │   │   ├── recruiter/      # CreateJob, RecruiterJobCard, ApplicantCard
│   │   │   └── ui/             # Button, Input, Spinner, Card
│   │   ├── constants/
│   │   │   └── navigation.js   # Sidebar nav config for each role
│   │   ├── context/
│   │   │   └── AuthContext.jsx # Global auth state (user, token, login, logout)
│   │   ├── pages/
│   │   │   ├── candidate/      # Dashboard, BrowseJobs, SavedJobs, JobDetails, Profile, MyApplications
│   │   │   └── recruiter/      # Dashboard, Analytics, ApplicantsPage, EditJob
│   │   ├── services/           # Axios API service modules
│   │   │   ├── api.js          # Axios base instance with JWT interceptor
│   │   │   ├── aiService.js
│   │   │   ├── authService.js
│   │   │   ├── candidateService.js
│   │   │   ├── jobService.js
│   │   │   └── applicationService.js
│   │   └── App.jsx             # Root component with all routes
│   └── package.json
│
├── server/                     # Node.js + Express backend
│   ├── api/
│   │   └── index.js            # Vercel serverless entry point
│   ├── config/
│   │   └── db.js               # MongoDB connection (singleton pattern)
│   ├── controllers/            # Route handler logic
│   │   ├── authController.js
│   │   ├── aiController.js
│   │   ├── jobController.js
│   │   ├── applicationController.js
│   │   ├── candidateController.js
│   │   └── recruiterController.js
│   ├── middleware/
│   │   ├── authMiddleware.js   # JWT verification
│   │   ├── authorize.js        # Role-based access control
│   │   ├── recruiterMiddleware.js
│   │   └── uploadResume.js     # Multer config
│   ├── models/
│   │   ├── User.js             # User schema (candidate + recruiter)
│   │   ├── Job.js              # Job listing schema
│   │   └── Application.js      # Job application schema
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── aiRoutes.js
│   │   ├── jobRoutes.js
│   │   ├── applicationRoutes.js
│   │   ├── candidateRoutes.js
│   │   └── recruiterRoutes.js
│   ├── services/
│   │   └── geminiService.js    # Google Gemini AI integration
│   ├── validators/
│   │   └── jobValidator.js     # Express-validator rules for jobs
│   ├── app.js                  # Express app setup (CORS, routes)
│   ├── server.js               # Local server entry point
│   ├── vercel.json             # Vercel backend routing config
│   └── package.json
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18 or higher
- **npm** v8 or higher
- A **MongoDB Atlas** account (free tier works perfectly)
- A **Google Gemini API Key** (free at [Google AI Studio](https://aistudio.google.com/))

### 1. Clone the Repository
```bash
git clone https://github.com/Archana-P-Nair/JobHub-AI.git
cd JobHub-AI
```

### 2. Set Up the Backend
```bash
cd server
npm install
```

Create a `.env` file in the `server/` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secure_random_jwt_secret
GEMINI_API_KEY=your_google_gemini_api_key
```

Start the backend dev server:
```bash
npm run dev
```
> The server will start on `http://localhost:5000`

### 3. Set Up the Frontend
Open a **new terminal** window:
```bash
cd client
npm install
```

Create a `.env` file in the `client/` directory:
```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend dev server:
```bash
npm run dev
```
> The app will open at `http://localhost:5173`

---

## 🔐 Environment Variables

### Backend (`server/.env`)

| Variable | Description | Required |
|---|---|---|
| `PORT` | Port for the local dev server | No (default: 5000) |
| `MONGO_URI` | MongoDB Atlas connection string | ✅ Yes |
| `JWT_SECRET` | Secret key for signing JWT tokens (use a long random string) | ✅ Yes |
| `GEMINI_API_KEY` | Google Gemini API Key from AI Studio | ✅ Yes |

### Frontend (`client/.env`)

| Variable | Description | Required |
|---|---|---|
| `VITE_API_URL` | Full base URL of the backend API | ✅ Yes |

---

## 📡 API Reference

All endpoints are prefixed with `/api`.

### 🔐 Auth Routes — `/api/auth`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/auth/register` | No | Register a new user (candidate or recruiter) |
| `POST` | `/auth/login` | No | Login and receive JWT token |

**Request Body (Register):**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "candidate"
}
```

---

### 💼 Job Routes — `/api/jobs`

| Method | Endpoint | Auth | Role | Description |
|---|---|---|---|---|
| `GET` | `/jobs` | No | — | Fetch all active jobs (supports filters & pagination) |
| `GET` | `/jobs/:id` | No | — | Get a single job by ID |
| `GET` | `/jobs/recruiter/my` | ✅ | Recruiter | Get jobs posted by the logged-in recruiter |
| `POST` | `/jobs` | ✅ | Recruiter | Create a new job listing |
| `PUT` | `/jobs/:id` | ✅ | Recruiter | Edit an existing job |
| `DELETE` | `/jobs/:id` | ✅ | Recruiter | Delete a job |

**Query Parameters for `GET /jobs`:**

| Param | Type | Description |
|---|---|---|
| `search` | string | Search by job title or keywords |
| `location` | string | Filter by city or location |
| `employmentType` | string | `Full-Time`, `Part-Time`, `Internship`, `Contract` |
| `remote` | boolean | Filter remote jobs (`true`/`false`) |
| `sort` | string | `newest` or `oldest` |
| `page` | number | Page number for pagination |
| `limit` | number | Results per page |

---

### 📬 Application Routes — `/api/applications`

| Method | Endpoint | Auth | Role | Description |
|---|---|---|---|---|
| `POST` | `/applications/:jobId` | ✅ | Candidate | Apply for a job |
| `GET` | `/applications/my` | ✅ | Candidate | Get all applications submitted by the user |

---

### 👤 Candidate Routes — `/api/candidate`

| Method | Endpoint | Auth | Role | Description |
|---|---|---|---|---|
| `GET` | `/candidate/profile` | ✅ | Candidate | Fetch the logged-in candidate's profile |
| `PUT` | `/candidate/profile` | ✅ | Candidate | Update profile (supports resume upload via multipart) |
| `GET` | `/candidate/saved-jobs` | ✅ | Candidate | Get all saved jobs |
| `POST` | `/candidate/saved-jobs/:jobId` | ✅ | Candidate | Toggle save/unsave a job |

---

### 🏢 Recruiter Routes — `/api/recruiter`

| Method | Endpoint | Auth | Role | Description |
|---|---|---|---|---|
| `GET` | `/recruiter/analytics` | ✅ | Recruiter | Get dashboard analytics and application stats |
| `GET` | `/recruiter/jobs/:jobId/applicants` | ✅ | Recruiter | Get all applicants for a specific job |
| `PUT` | `/recruiter/applications/:id` | ✅ | Recruiter | Update an application's status |

---

### 🤖 AI Routes — `/api/ai`

| Method | Endpoint | Auth | Role | Description |
|---|---|---|---|---|
| `GET` | `/ai/recommendations` | ✅ | Candidate | Get personalized AI-powered job recommendations |

**How it Works:**
1. The backend fetches the candidate's profile (name, headline, skills).
2. All active jobs are retrieved from the database.
3. A structured prompt is sent to **Google Gemini 2.5 Flash**.
4. Gemini scores each job and returns ranked recommendations with reasons.

---

## ⚙️ CI/CD Pipeline

This project uses **GitHub Actions** for Continuous Integration and **Vercel** for Continuous Deployment.

### CI — GitHub Actions (`.github/workflows/ci.yml`)

The pipeline runs automatically on every **push** or **pull request** to the `master` branch and performs these steps:

```
Push to master
      │
      ▼
┌─────────────────────────────────┐
│  GitHub Actions Runner          │
│                                 │
│  1. Checkout code               │
│  2. Setup Node.js v20           │
│  3. npm install (server)        │
│  4. npm install (client)        │
│  5. npm run lint (client)       │
│  6. npm run build (client)  ✅  │
└─────────────────────────────────┘
      │
      ▼
  Build passes → Vercel auto-deploys
```

### CD — Vercel Auto-Deploy

Vercel is configured to watch the GitHub repository. Any commit successfully merged to `master` after passing CI is automatically deployed to production.

---

## 🌐 Deployment

This project is deployed as **two separate Vercel projects** (recommended approach):

### Backend Deployment

1. Go to [vercel.com](https://vercel.com) → **New Project** → Import `JobHub-AI`
2. Set **Root Directory** to `server`
3. Add these **Environment Variables** in Vercel settings:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `GEMINI_API_KEY`
4. Deploy — Vercel will use `server/vercel.json` to route all requests to Express.

### Frontend Deployment

1. Create another **New Project** → Import the same `JobHub-AI` repo
2. Set **Root Directory** to `client`
3. Add this **Environment Variable**:
   - `VITE_API_URL` → `https://your-backend-url.vercel.app/api`
4. Deploy — Vercel detects Vite and builds the React SPA automatically.

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request — the CI pipeline will automatically validate your changes!

---

## 📄 License

This project is licensed under the **ISC License**.

---

## 👩‍💻 Author

**Archana P. Nair**

- GitHub: [@Archana-P-Nair](https://github.com/Archana-P-Nair)

---

<p align="center">Built with ❤️ using React, Node.js, MongoDB & Google Gemini AI</p>
