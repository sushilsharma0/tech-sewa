import { Schema, model } from "mongoose";

const categorySchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    type: { type: String, enum: ["news", "review", "product", "video"], required: true },
    description: String,
    parent: { type: Schema.Types.ObjectId, ref: "Category" }
  },
  { timestamps: true }
);

const tagSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    usageCount: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export const Category = model("Category", categorySchema);
export const Tag = model("Tag", tagSchema);
