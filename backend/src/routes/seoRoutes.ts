import { Router } from "express";
import { env } from "../config/env.js";
import { News, Review } from "../models/Content.js";
import { Product } from "../models/Product.js";

export const seoRoutes = Router();

seoRoutes.get("/robots.txt", (_req, res) => {
  res.type("text/plain").send(`User-agent: *\nAllow: /\nSitemap: ${env.API_URL}/sitemap.xml\n`);
});

seoRoutes.get("/sitemap.xml", async (_req, res, next) => {
  try {
    const [news, reviews, products] = await Promise.all([
      News.find({ status: "published" }).select("slug updatedAt").lean(),
      Review.find({ status: "published" }).select("slug updatedAt").lean(),
      Product.find({ status: "published" }).select("slug updatedAt").lean()
    ]);

    const urls = [
      "",
      "news",
      "reviews",
      "mobile-price-nepal",
      "laptop-price-nepal",
      "smartwatch-price-nepal",
      "tablet-price-nepal",
      "compare",
      "brands",
      ...news.map((item) => `news/${item.slug}`),
      ...reviews.map((item) => `reviews/${item.slug}`),
      ...products.map((item) => `product/${item.slug}`)
    ];

    res.type("application/xml").send(
      `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls
        .map((url) => `<url><loc>${env.CLIENT_URL}/${url}</loc></url>`)
        .join("")}</urlset>`
    );
  } catch (error) {
    next(error);
  }
});
