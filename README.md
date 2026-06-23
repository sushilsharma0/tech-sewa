# TechSewa Nepal

Production-ready MERN architecture for a GadgetByte-style tech news, reviews, product price tracking, comparison, advertising, and admin platform.

## Apps

- `backend`: Node.js, Express, TypeScript, MongoDB, Redis, JWT auth, RBAC.
- `frontend`: React, Vite, TypeScript, Tailwind CSS, TanStack Query, React Router, Framer Motion.

## Quick Start

```bash
npm install
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
npm run dev
```

## Production

- Frontend deploys to Vercel.
- Backend deploys to Ubuntu VPS with PM2 and Nginx.
- MongoDB Atlas stores application data.
- Redis handles caching, rate limit backing, sessions, and hot lists.
- Cloudinary stores media assets.

See `docs/API.md`, `docs/ARCHITECTURE.md`, and `docs/DEPLOYMENT.md`.
