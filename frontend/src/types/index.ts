export type ContentItem = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  banner?: string;
  publishedAt?: string;
  views?: number;
  rating?: number;
  isTrending?: boolean;
};

export type Brand = {
  _id: string;
  name: string;
  slug: string;
  logo?: string;
  productCount?: number;
};

export type Product = {
  _id: string;
  name: string;
  slug: string;
  category: "mobile" | "laptop" | "smartwatch" | "tablet" | "accessory";
  images?: string[];
  brand?: Brand;
  price?: {
    currency: string;
    official?: number;
    market?: number;
    stores?: Array<{ name: string; price: number; url?: string; availability?: string }>;
  };
  specifications?: Record<string, string | number | boolean>;
  rating?: number;
};

export type Paginated<T> = {
  items: T[];
  page: number;
  limit: number;
  total: number;
  pages: number;
};
