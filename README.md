# CSA Frontend Project

Golden-path **todo app** for CSA frontend mentoring — wired to [CSA-Backend-Project](../CSA-Backend-Project) and aligned with [materi CSA FE](../materi%20CSA%20FE/materi%20CSA/).

## Prerequisites

- Node.js 20+ (22.12+ recommended for Vite)
- pnpm
- MySQL for the backend

## Run locally

### 1. Backend (terminal 1)

```bash
cd ../CSA-Backend-Project
npm install
cp .env.example .env
# configure MySQL in .env
npm run dev
```

API: `http://localhost:3000/api/v1`

### 2. Frontend (terminal 2)

```bash
pnpm install
cp .env.example .env
pnpm dev
```

App: `http://localhost:5173`

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Vite dev server |
| `pnpm run lint` | Biome check |
| `pnpm run lint:fix` | Biome fix |
| `pnpm run build` | Production build |

## Architecture

Feature-based hybrid layout (see `docs/MODULE-MAP.md`):

- `src/app/` — router, provider, thin route pages
- `src/features/auth/` — login, register, JWT session
- `src/features/todos/` — CRUD, filters, dashboard summary
- `src/lib/api-client.ts` — HTTP client for CSA backend
- `design/stitch/` — Stitch HTML + screenshots (design reference)

## Backend endpoints used

- `POST /auth/signup`, `POST /auth/login`, `GET /auth/me`
- `GET /todos/dashboard/summary`
- `GET /todos`, `/todos/today`, `/todos/overdue`, `/todos/completed`, `/todos/deleted`
- `POST /todos`, `GET /todos/:id`, `PUT /todos/:id`, `PATCH /todos/:id/status`, `DELETE /todos/:id`, `PATCH /todos/:id/restore`

## Mentor note

Token is stored in `localStorage` for teaching/demo purposes. See materi Fase 2 module **04-Autentikasi-dan-Request** for production tradeoffs.
# CSA-Frontend-Project
