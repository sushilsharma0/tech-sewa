import bcrypt from "bcryptjs";
import type { Request, Response } from "express";
import { User } from "../models/User.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "../utils/tokens.js";

function publicUser(user: any) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    permissions: user.permissions,
    avatar: user.avatar,
    status: user.status
  };
}

export const register = asyncHandler(async (req: Request, res: Response) => {
  const existing = await User.findOne({ email: req.body.email });
  if (existing) throw new ApiError(409, "Email already registered");

  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    status: "active"
  });

  res.status(201).json({ success: true, data: publicUser(user) });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findOne({ email: req.body.email }).select("+password +refreshTokenHash");
  if (!user || !(await (user as any).comparePassword(req.body.password))) {
    throw new ApiError(401, "Invalid credentials");
  }
  if (user.status !== "active") throw new ApiError(403, "Account is not active");

  const accessToken = signAccessToken({
    sub: String(user._id),
    role: user.role,
    permissions: user.permissions ?? []
  });
  const refreshToken = signRefreshToken({ sub: String(user._id), role: user.role });

  user.refreshTokenHash = await bcrypt.hash(refreshToken, 12);
  user.lastLoginAt = new Date();
  await user.save();

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: 30 * 24 * 60 * 60 * 1000
  });
  res.json({ success: true, data: { user: publicUser(user), accessToken } });
});

export const refresh = asyncHandler(async (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;
  if (!token) throw new ApiError(401, "Refresh token missing");

  const payload = verifyRefreshToken(token);
  const user = await User.findById(payload.sub).select("+refreshTokenHash");
  if (!user?.refreshTokenHash || !(await bcrypt.compare(token, user.refreshTokenHash))) {
    throw new ApiError(401, "Invalid refresh token");
  }

  const accessToken = signAccessToken({
    sub: String(user._id),
    role: user.role,
    permissions: user.permissions ?? []
  });

  res.json({ success: true, data: { accessToken, user: publicUser(user) } });
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  res.clearCookie("refreshToken");
  if (req.user?.id) await User.findByIdAndUpdate(req.user.id, { $unset: { refreshTokenHash: 1 } });
  res.json({ success: true });
});
