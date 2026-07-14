# StudyNest — Frontend (Client)

React + TypeScript + Vite + Tailwind CSS client for the StudyNest platform.

## Setup (local)

```bash
npm install
cp .env.example .env   # set VITE_API_URL to your backend URL
npm run dev              # starts on http://localhost:5173
```

Make sure the backend server is running first (see `studynest-server/README.md`).

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start Vite dev server with hot reload |
| `npm run build` | Type-check and build production bundle to `dist/` |
| `npm run preview` | Preview the production build locally |

## Environment Variables

See `.env.example`. `VITE_API_URL` is baked into the build at build time — if you change it, you
must rebuild (and redeploy) for the change to take effect. This is the #1 cause of "API calls
failing after deploy" bugs with Vite.

## Folder Structure

```
src/
├── api/          → axios request functions per resource
├── components/
│   ├── layout/   → Navbar, Footer
│   ├── ui/       → ResourceCard, SkeletonCard, ProtectedRoute, etc.
│   └── sections/ → Home page sections
├── context/      → AuthContext (global user state)
├── pages/        → one file per route
├── types/        → shared TypeScript interfaces
└── constants/    → subjects, resource types, sort options
```
