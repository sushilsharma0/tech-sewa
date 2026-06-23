# API Endpoints

Base URL: `/api`

## Auth

- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/refresh`
- `POST /auth/logout`
- `POST /auth/forgot-password`
- `POST /auth/reset-password`
- `POST /auth/verify-email`
- `POST /auth/google`

## Public

- `GET /news`
- `GET /news/:slug`
- `GET /reviews`
- `GET /reviews/:slug`
- `GET /products`
- `GET /products/:slug`
- `GET /brands`
- `GET /brands/:slug`
- `GET /search?q=iphone`
- `GET /compare?ids=id1,id2,id3,id4`
- `GET /products/:productId/price-history`

## Admin

Requires JWT and `admin` or `editor` role.

- `GET /admin/stats`
- `GET|POST /admin/news`
- `PATCH|DELETE /admin/news/:id`
- `GET|POST /admin/reviews`
- `PATCH|DELETE /admin/reviews/:id`
- `GET|POST /admin/products`
- `PATCH|DELETE /admin/products/:id`
- `POST /admin/products/:productId/price`
- `GET|POST /admin/brands`
- `PATCH|DELETE /admin/brands/:id`
- `GET|POST /admin/advertisements`
- `PATCH|DELETE /admin/advertisements/:id`
- `GET|POST /admin/media`
- `PATCH|DELETE /admin/media/:id`
- `GET|POST /admin/comments`
- `PATCH|DELETE /admin/comments/:id`
- `GET|POST /admin/users`
- `PATCH|DELETE /admin/users/:id`
- `GET|POST /admin/settings`
- `PATCH|DELETE /admin/settings/:id`

## SEO

- `GET /robots.txt`
- `GET /sitemap.xml`
