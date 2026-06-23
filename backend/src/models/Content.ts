import { Schema, model } from "mongoose";

const seoSchema = new Schema(
  {
    metaTitle: String,
    metaDescription: String,
    canonicalUrl: String,
    ogImage: String,
    schemaType: String
  },
  { _id: false }
);

const contentBase = {
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, index: true },
  excerpt: String,
  body: { type: String, required: true },
  banner: String,
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
  status: { type: String, enum: ["draft", "published", "archived"], default: "draft", index: true },
  publishedAt: Date,
  views: { type: Number, default: 0, index: true },
  isTrending: { type: Boolean, default: false, index: true },
  isFeatured: { type: Boolean, default: false, index: true },
  seo: seoSchema
};

const reviewSchema = new Schema(
  {
    ...contentBase,
    product: { type: Schema.Types.ObjectId, ref: "Product" },
    rating: { type: Number, min: 0, max: 10, required: true },
    pros: [String],
    cons: [String],
    sections: [
      {
        title: String,
        score: Number,
        body: String
      }
    ],
    verdict: String,
    affiliateLinks: [
      {
        store: String,
        url: String,
        label: String
      }
    ]
  },
  { timestamps: true }
);

const newsSchema = new Schema(contentBase, { timestamps: true });

newsSchema.index({ title: "text", excerpt: "text", body: "text" });
reviewSchema.index({ title: "text", excerpt: "text", body: "text" });

export const News = model("News", newsSchema);
export const Review = model("Review", reviewSchema);
