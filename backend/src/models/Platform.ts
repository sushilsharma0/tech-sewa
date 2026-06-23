import { Schema, model } from "mongoose";

const priceHistorySchema = new Schema(
  {
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true, index: true },
    variant: String,
    store: String,
    price: { type: Number, required: true },
    currency: { type: String, default: "NPR" },
    source: { type: String, enum: ["manual", "import", "crawler"], default: "manual" }
  },
  { timestamps: true }
);

const advertisementSchema = new Schema(
  {
    name: { type: String, required: true },
    placement: {
      type: String,
      enum: ["home_hero", "home_sidebar", "article_inline", "article_sidebar", "product_sidebar", "admin"],
      required: true,
      index: true
    },
    kind: { type: String, enum: ["adsense", "banner", "sponsored"], required: true },
    image: String,
    html: String,
    url: String,
    isActive: { type: Boolean, default: true },
    startsAt: Date,
    endsAt: Date
  },
  { timestamps: true }
);

const mediaSchema = new Schema(
  {
    url: { type: String, required: true },
    publicId: String,
    provider: { type: String, enum: ["cloudinary", "s3", "local"], default: "cloudinary" },
    folder: String,
    mimeType: String,
    size: Number,
    uploadedBy: { type: Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

const settingSchema = new Schema(
  {
    key: { type: String, required: true, unique: true },
    value: Schema.Types.Mixed,
    group: { type: String, index: true }
  },
  { timestamps: true }
);

const analyticsSchema = new Schema(
  {
    path: { type: String, required: true, index: true },
    targetType: String,
    target: Schema.Types.ObjectId,
    user: { type: Schema.Types.ObjectId, ref: "User" },
    source: String,
    device: String,
    country: String
  },
  { timestamps: true }
);

export const PriceHistory = model("PriceHistory", priceHistorySchema);
export const Advertisement = model("Advertisement", advertisementSchema);
export const Media = model("Media", mediaSchema);
export const Setting = model("Setting", settingSchema);
export const Analytics = model("Analytics", analyticsSchema);
