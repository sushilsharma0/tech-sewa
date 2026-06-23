import type { NextFunction, Request, Response } from "express";
import { User } from "../models/User.js";
import { ApiError } from "../utils/apiError.js";
import { verifyAccessToken } from "../utils/tokens.js";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: string;
        permissions: string[];
      };
    }
  }
}

export async function requireAuth(req: Request, _res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  const token = header?.startsWith("Bearer ") ? header.slice(7) : undefined;

  if (!token) return next(new ApiError(401, "Authentication required"));

  const payload = verifyAccessToken(token);
  const user = await User.findById(payload.sub).select("role permissions status").lean();

  if (!user || user.status !== "active") return next(new ApiError(401, "Account is not active"));

  req.user = {
    id: String(user._id),
    role: user.role,
    permissions: user.permissions ?? []
  };
  next();
}

export function requireRole(...roles: string[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) return next(new ApiError(403, "Forbidden"));
    next();
  };
}

export function requirePermission(permission: string) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user?.permissions.includes(permission) && req.user?.role !== "admin") {
      return next(new ApiError(403, "Missing permission"));
    }
    next();
  };
}
