import { Schema, model } from "mongoose";

const brandSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true, index: true },
    logo: String,
    cover: String,
    description: String,
    website: String,
    productCount: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export const Brand = model("Brand", brandSchema);
