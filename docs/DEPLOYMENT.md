# Deployment

## Frontend: Vercel

1. Set project root to `frontend`.
2. Build command: `npm run build`.
3. Output directory: `dist`.
4. Environment variables:
   - `VITE_API_URL=https://api.techsewa.com/api`
   - `VITE_SITE_URL=https://techsewa.com`
   - `VITE_ADSENSE_CLIENT=ca-pub-xxxxxxxxxxxxxxxx`

## Backend: Ubuntu VPS

1. Install Node.js 22, Nginx, PM2, and Redis.
2. Copy `backend/.env.example` to `backend/.env`.
3. Set production values for MongoDB Atlas, JWT secrets, Redis, Cloudinary, SMTP, and URLs.
4. Run:

```bash
npm install
npm run build --workspace backend
pm2 start deploy/pm2/ecosystem.config.cjs
pm2 save
```

## Nginx

Use `deploy/nginx/techsewa-api.conf` and point DNS to the VPS.

## MongoDB Atlas

Create indexes after initial deployment:

```bash
db.news.createIndex({ title: "text", excerpt: "text", body: "text" })
db.reviews.createIndex({ title: "text", excerpt: "text", body: "text" })
db.products.createIndex({ name: "text", "specifications.processor": "text", "specifications.gpu": "text" })
db.products.createIndex({ category: 1, "price.official": 1 })
```
