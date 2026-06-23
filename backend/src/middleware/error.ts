import type { ErrorRequestHandler } from "express";
import { ApiError } from "../utils/apiError.js";

export const notFound = new ApiError(404, "Route not found");

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  const statusCode = error instanceof ApiError ? error.statusCode : 500;
  const message = error instanceof Error ? error.message : "Internal server error";

  res.status(statusCode).json({
    success: false,
    message,
    details: error instanceof ApiError ? error.details : undefined,
    stack: process.env.NODE_ENV === "production" ? undefined : error.stack
  });
};
