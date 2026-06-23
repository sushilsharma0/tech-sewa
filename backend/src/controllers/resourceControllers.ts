import type { Request, Response } from "express";
import slugify from "slugify";
import { Brand } from "../models/Brand.js";
import { News, Review } from "../models/Content.js";
import { Product } from "../models/Product.js";
import { Advertisement, Analytics, Media, Setting } from "../models/Platform.js";
import { User } from "../models/User.js";
import { Comment } from "../models/Engagement.js";
import { listResources } from "../services/query.js";
import { compareProducts } from "../services/comparisonService.js";
import { getPriceHistory, updateProductPrice } from "../services/priceTrackingService.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const models = {
  news: News,
  reviews: Review,
  products: Product,
  brands: Brand,
  advertisements: Advertisement,
  media: Media,
  settings: Setting,
  comments: Comment,
  users: User
};

function slugFrom(input: string) {
  return slugify(input, { lower: true, strict: true, trim: true });
}

export function listController(modelName: keyof typeof models, defaultFilters = {}) {
  return asyncHandler(async (req: Request, res: Response) => {
    const data = await listResources(models[modelName] as any, {
      page: Number(req.query.page),
      limit: Number(req.query.limit),
      sort: req.query.sort as string,
      search: req.query.search as string,
      filters: {
        ...defaultFilters,
        ...(req.query.category ? { category: req.query.category } : {}),
        ...(req.query.brand ? { brand: req.query.brand } : {}),
        ...(req.query.status ? { status: req.query.status } : {})
      }
    });
    res.json({ success: true, data });
  });
}

export function detailController(modelName: keyof typeof models, bySlug = true) {
  return asyncHandler(async (req: Request, res: Response) => {
    const query = bySlug ? { slug: req.params.slug } : { _id: req.params.id };
    const item = await (models[modelName] as any).findOne(query).lean();
    if (!item) throw new ApiError(404, "Resource not found");
    res.json({ success: true, data: item });
  });
}

export function createController(modelName: keyof typeof models) {
  return asyncHandler(async (req: Request, res: Response) => {
    const payload = {
      ...req.body,
      slug: req.body.slug ?? (req.body.title || req.body.name ? slugFrom(req.body.title ?? req.body.name) : undefined),
      author: req.body.author ?? req.user?.id
    };
    const item = await (models[modelName] as any).create(payload);
    res.status(201).json({ success: true, data: item });
  });
}

export function updateController(modelName: keyof typeof models) {
  return asyncHandler(async (req: Request, res: Response) => {
    const payload = {
      ...req.body,
      ...(req.body.title || req.body.name ? { slug: req.body.slug ?? slugFrom(req.body.title ?? req.body.name) } : {})
    };
    const item = await (models[modelName] as any).findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true
    });
    if (!item) throw new ApiError(404, "Resource not found");
    res.json({ success: true, data: item });
  });
}

export function deleteController(modelName: keyof typeof models) {
  return asyncHandler(async (req: Request, res: Response) => {
    const item = await (models[modelName] as any).findByIdAndDelete(req.params.id);
    if (!item) throw new ApiError(404, "Resource not found");
    res.json({ success: true });
  });
}

export const search = asyncHandler(async (req: Request, res: Response) => {
  const q = String(req.query.q ?? "");
  const [news, reviews, products, brands] = await Promise.all([
    News.find({ $text: { $search: q }, status: "published" }).limit(8).lean(),
    Review.find({ $text: { $search: q }, status: "published" }).limit(8).lean(),
    Product.find({ $text: { $search: q }, status: "published" }).limit(8).lean(),
    Brand.find({ name: new RegExp(q, "i") }).limit(8).lean()
  ]);
  res.json({ success: true, data: { news, reviews, products, brands } });
});

export const compare = asyncHandler(async (req: Request, res: Response) => {
  const ids = String(req.query.ids ?? "").split(",").filter((id): id is string => Boolean(id));
  const data = await compareProducts(ids);
  res.json({ success: true, data });
});

export const priceHistory = asyncHandler(async (req: Request, res: Response) => {
  const data = await getPriceHistory(String(req.params.productId));
  res.json({ success: true, data });
});

export const priceUpdate = asyncHandler(async (req: Request, res: Response) => {
  const data = await updateProductPrice({ productId: String(req.params.productId), ...req.body });
  res.json({ success: true, data });
});

export const dashboardStats = asyncHandler(async (_req: Request, res: Response) => {
  const [users, products, news, reviews, brands, views, ads] = await Promise.all([
    User.countDocuments(),
    Product.countDocuments(),
    News.countDocuments(),
    Review.countDocuments(),
    Brand.countDocuments(),
    Analytics.countDocuments(),
    Advertisement.countDocuments({ isActive: true })
  ]);

  res.json({
    success: true,
    data: { users, products, news, reviews, brands, views, activeAds: ads, adRevenue: 0 }
  });
});
