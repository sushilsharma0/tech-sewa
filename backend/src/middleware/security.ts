import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import type { Express } from "express";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import morgan from "morgan";
import xss from "xss-clean";
import { env } from "../config/env.js";

export function registerSecurity(app: Express) {
  app.set("trust proxy", 1);
  app.use(helmet());
  app.use(
    cors({
      origin: env.CLIENT_URL,
      credentials: true
    })
  );
  app.use(compression());
  app.use(cookieParser());
  app.use(mongoSanitize());
  app.use(xss());
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      limit: 500,
      standardHeaders: true,
      legacyHeaders: false
    })
  );
  if (env.NODE_ENV !== "test") app.use(morgan("combined"));
}
