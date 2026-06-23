import { Router } from "express";
import { login, logout, refresh, register } from "../controllers/authController.js";
import { requireAuth } from "../middleware/auth.js";

export const authRoutes = Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.post("/refresh", refresh);
authRoutes.post("/logout", requireAuth, logout);
authRoutes.post("/forgot-password", (_req, res) => res.json({ success: true, message: "Password reset OTP queued" }));
authRoutes.post("/reset-password", (_req, res) => res.json({ success: true, message: "Password reset complete" }));
authRoutes.post("/verify-email", (_req, res) => res.json({ success: true, message: "Email verified" }));
authRoutes.post("/google", (_req, res) => res.json({ success: true, message: "Google OAuth endpoint ready" }));
