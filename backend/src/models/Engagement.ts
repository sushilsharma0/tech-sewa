import { Schema, model } from "mongoose";

const commentSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    targetType: { type: String, enum: ["news", "review", "product"], required: true },
    target: { type: Schema.Types.ObjectId, required: true, index: true },
    body: { type: String, required: true },
    status: { type: String, enum: ["pending", "approved", "rejected", "spam"], default: "pending" },
    parent: { type: Schema.Types.ObjectId, ref: "Comment" }
  },
  { timestamps: true }
);

const savedItemSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    targetType: { type: String, enum: ["article", "product"], required: true },
    target: { type: Schema.Types.ObjectId, required: true }
  },
  { timestamps: true }
);

const notificationSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", index: true },
    title: { type: String, required: true },
    body: String,
    type: { type: String, enum: ["breaking_news", "price_drop", "system", "comment"], required: true },
    url: String,
    readAt: Date
  },
  { timestamps: true }
);

export const Comment = model("Comment", commentSchema);
export const SavedItem = model("SavedItem", savedItemSchema);
export const Notification = model("Notification", notificationSchema);
