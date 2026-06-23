# Architecture

## Frontend

React + Vite + TypeScript powers the public website, user dashboard, and admin panel.

Key folders:

- `src/components`: reusable UI, layout, product, home, and admin components.
- `src/pages`: route-level screens for public, auth, user, and admin surfaces.
- `src/routes`: React Router configuration for all requested URLs.
- `src/hooks`: TanStack Query data hooks.
- `src/lib`: API client, SEO helpers, and utilities.

## Backend

Express + TypeScript exposes modular REST APIs.

Key folders:

- `src/config`: environment, MongoDB, Redis.
- `src/models`: Mongoose models for users, content, products, brands, platform data, engagement.
- `src/controllers`: auth and resource controllers.
- `src/routes`: auth, API, sitemap, and robots routes.
- `src/middleware`: security, auth/RBAC, caching, error handling.
- `src/services`: query pagination, comparison engine, price tracking engine.

## Collections

Implemented models cover:

- `users`
- `news`
- `reviews`
- `categories`
- `tags`
- `products`
- `brands`
- `pricehistories`
- `comments`
- `saveditems`
- `notifications`
- `advertisements`
- `media`
- `settings`
- `analytics`

## Traffic Readiness

The app is structured for 100,000+ monthly visitors with:

- Redis response caching for read-heavy pages.
- Indexed MongoDB text search and product category/price filters.
- Pagination limits and server-side filtering.
- Lazy loaded images and code-splittable route structure.
- Helmet, compression, CORS, rate limiting, XSS and NoSQL injection protection.
- Stateless JWT access tokens with refresh token rotation storage.
