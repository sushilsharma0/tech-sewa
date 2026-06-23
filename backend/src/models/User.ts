import bcrypt from "bcryptjs";
import { Schema, model } from "mongoose";

export type UserRole = "admin" | "editor" | "author" | "moderator" | "user";

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, index: true },
    password: { type: String, required: true, select: false },
    avatar: String,
    role: { type: String, enum: ["admin", "editor", "author", "moderator", "user"], default: "user" },
    permissions: [{ type: String }],
    status: { type: String, enum: ["active", "pending", "banned"], default: "pending", index: true },
    emailVerifiedAt: Date,
    refreshTokenHash: { type: String, select: false },
    otpHash: { type: String, select: false },
    otpExpiresAt: Date,
    googleId: String,
    lastLoginAt: Date
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = function (candidate: string) {
  return bcrypt.compare(candidate, this.password);
};

export const User = model("User", userSchema);
