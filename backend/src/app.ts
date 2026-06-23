import express from "express";
import { authRoutes } from "./routes/authRoutes.js";
import { apiRoutes } from "./routes/apiRoutes.js";
import { seoRoutes } from "./routes/seoRoutes.js";
import { errorHandler, notFound } from "./middleware/error.js";
import { registerSecurity } from "./middleware/security.js";

export const app = express();

registerSecurity(app);
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/health", (_req, res) => res.json({ success: true, status: "ok" }));
app.use("/", seoRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", apiRoutes);

app.use((_req, _res, next) => next(notFound));
app.use(errorHandler);
