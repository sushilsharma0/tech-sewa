import { Schema, model } from "mongoose";

const priceSchema = new Schema(
  {
    currency: { type: String, default: "NPR" },
    official: Number,
    market: Number,
    stores: [
      {
        name: String,
        price: Number,
        url: String,
        availability: { type: String, enum: ["in_stock", "out_of_stock", "preorder"], default: "in_stock" },
        updatedAt: Date
      }
    ]
  },
  { _id: false }
);

const productSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    brand: { type: Schema.Types.ObjectId, ref: "Brand", required: true, index: true },
    category: {
      type: String,
      enum: ["mobile", "laptop", "smartwatch", "tablet", "accessory"],
      required: true,
      index: true
    },
    images: [String],
    gallery: [String],
    variants: [
      {
        name: String,
        ram: String,
        storage: String,
        color: String,
        price: Number,
        sku: String
      }
    ],
    price: priceSchema,
    specifications: { type: Map, of: Schema.Types.Mixed },
    rating: { type: Number, min: 0, max: 10, default: 0 },
    affiliateLinks: [
      {
        store: String,
        label: String,
        url: String,
        commissionTag: String
      }
    ],
    status: { type: String, enum: ["draft", "published", "archived"], default: "draft", index: true },
    seo: {
      metaTitle: String,
      metaDescription: String,
      canonicalUrl: String,
      ogImage: String
    },
    views: { type: Number, default: 0 }
  },
  { timestamps: true }
);

productSchema.index({ name: "text", "specifications.processor": "text", "specifications.gpu": "text" });
productSchema.index({ category: 1, "price.official": 1 });

export const Product = model("Product", productSchema);
