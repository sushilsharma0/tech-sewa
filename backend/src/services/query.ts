import type { FilterQuery, Model } from "mongoose";

export type ListOptions = {
  page?: number;
  limit?: number;
  sort?: string;
  search?: string;
  filters?: FilterQuery<unknown>;
};

export async function listResources<T>(model: Model<T>, options: ListOptions = {}) {
  const page = Math.max(Number(options.page) || 1, 1);
  const limit = Math.min(Math.max(Number(options.limit) || 12, 1), 50);
  const skip = (page - 1) * limit;
  const query: FilterQuery<T> = { ...(options.filters as FilterQuery<T>) };

  if (options.search) query.$text = { $search: options.search };

  const [items, total] = await Promise.all([
    model.find(query).sort(options.sort ?? "-createdAt").skip(skip).limit(limit).lean(),
    model.countDocuments(query)
  ]);

  return {
    items,
    page,
    limit,
    total,
    pages: Math.ceil(total / limit)
  };
}
