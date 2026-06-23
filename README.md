# TechSewa Nepal

TechSewa Nepal is an enterprise-style MERN platform for tech news, product reviews, Nepali product pricing, price tracking, product comparison, ads, SEO content, user accounts, and an admin panel.

The project is built as a TypeScript monorepo with a React/Vite frontend and an Express/MongoDB backend.

## Features

- Tech news, reviews, product listings, brand pages, search, and comparison pages
- Mobile, laptop, smartwatch, and tablet price pages for Nepal
- Product detail pages with gallery, variants, prices, specs, affiliate links, and price history
- Admin dashboard for content, products, brands, ads, media, users, comments, and settings
- JWT authentication with refresh tokens and role-based access control
- MongoDB Atlas with Mongoose models
- Optional Redis caching for production
- SEO helpers, dynamic meta tags, sitemap, robots.txt, Open Graph, and schema-ready pages
- Responsive public layout, mobile bottom navigation, dark/light mode, skeleton loading states
- Free API fallback data for local frontend development when MongoDB has no content
- Deployment setup for Vercel frontend and Ubuntu VPS backend with PM2 and Nginx

## Tech Stack

**Frontend**

- React 18
- Vite
- TypeScript
- Tailwind CSS
- TanStack Query
- Axios
- React Router DOM
- Framer Motion
- Lucide icons

**Backend**

- Node.js
- Express.js
- TypeScript
- MongoDB Atlas
- Mongoose
- Redis
- JWT
- Helmet, CORS, compression, rate limiting, XSS and NoSQL injection protection

## Project Structure

```text
techsewa/
  backend/
    src/
      config/        Environment, MongoDB, Redis
      controllers/   Auth and resource controllers
      middleware/    Security, auth, cache, error handling
      models/        Mongoose schemas
      routes/        Auth, API, SEO routes
      services/      Query, comparison, price tracking logic
      utils/         Shared backend helpers
  frontend/
    src/
      components/    UI, layout, home, product, admin components
      contexts/      Theme provider
      hooks/         TanStack Query hooks
      lib/           API clients, SEO helpers, free API fallback
      pages/         Public, auth, user, admin pages
      routes/        React Router config
      types/         Shared frontend types
  deploy/
    nginx/           Nginx config
    pm2/             PM2 config
  docs/
    API.md
    ARCHITECTURE.md
    DEPLOYMENT.md
```

## Local Setup

Install dependencies from the root:

```bash
npm install
```

Create environment files:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

On Windows PowerShell, if `npm run ...` is blocked by execution policy, use:

```bash
npm.cmd run dev
```

## Environment Variables

### Backend

Required values in `backend/.env`:

```env
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:5173
API_URL=http://localhost:5000
MONGODB_URI=your-mongodb-atlas-uri
REDIS_ENABLED=false
REDIS_URL=redis://localhost:6379
JWT_ACCESS_SECRET=replace-with-a-long-access-secret
JWT_REFRESH_SECRET=replace-with-a-long-refresh-secret
ACCESS_TOKEN_TTL=15m
REFRESH_TOKEN_TTL=30d
```

For local development, keep `REDIS_ENABLED=false` unless Redis is running.

### Frontend

Required values in `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
VITE_SITE_URL=http://localhost:5173
VITE_ADSENSE_CLIENT=ca-pub-your-publisher-id
VITE_FREE_PRODUCTS_API=https://dummyjson.com/products
VITE_FREE_POSTS_API=https://dummyjson.com/posts
```

`VITE_FREE_PRODUCTS_API` and `VITE_FREE_POSTS_API` are used as development fallback data sources when your MongoDB collections are empty.

## Running the App

Run both frontend and backend:

```bash
npm run dev
```

Run only the backend:

```bash
npm run dev --workspace backend
```

Run only the frontend:

```bash
npm run dev --workspace frontend
```

Local URLs:

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000`
- Health check: `http://localhost:5000/health`
- Admin panel: `http://localhost:5173/admin`

## Admin Access

The admin UI is available at:

```text
http://localhost:5173/admin
```

Backend admin APIs require an authenticated user with `admin` or `editor` role.

For local testing:

1. Register a user from `/register`.
2. Open MongoDB Atlas.
3. Update that user:

```json
{
  "role": "admin",
  "status": "active",
  "permissions": []
}
```

4. Login and open `/admin`.

## Useful Scripts

From the root:

```bash
npm run dev       # run frontend and backend together
npm run build     # build backend and frontend
npm run lint      # run lint scripts
npm run format    # format files with Prettier
```

Workspace-specific examples:

```bash
npm run build --workspace backend
npm run build --workspace frontend
```

## API Overview

Core public endpoints:

- `GET /api/news`
- `GET /api/news/:slug`
- `GET /api/reviews`
- `GET /api/reviews/:slug`
- `GET /api/products`
- `GET /api/products/:slug`
- `GET /api/brands`
- `GET /api/search?q=iphone`
- `GET /api/compare?ids=id1,id2`

Core admin endpoints:

- `GET /api/admin/stats`
- `GET|POST|PATCH|DELETE /api/admin/news`
- `GET|POST|PATCH|DELETE /api/admin/products`
- `GET|POST|PATCH|DELETE /api/admin/reviews`
- `GET|POST|PATCH|DELETE /api/admin/brands`
- `POST /api/admin/products/:productId/price`

See [docs/API.md](docs/API.md) for the full list.

## Data Model

Implemented backend collections include:

- Users
- News
- Reviews
- Categories
- Tags
- Products
- Brands
- Price histories
- Comments
- Saved items
- Notifications
- Advertisements
- Media
- Settings
- Analytics

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for more details.

## Deployment

Recommended production setup:

- Frontend: Vercel
- Backend: Ubuntu VPS with PM2 and Nginx
- Database: MongoDB Atlas
- Cache: Redis
- Media storage: Cloudinary or S3

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

## Notes

- Google AdSense requires a real publisher ID like `ca-pub-1234567890123456`.
- Redis is optional locally, but recommended in production for read-heavy pages.
- The free API fallback is for demo/development only. Production content should come from MongoDB through the admin panel or import scripts.
