import type { Brand, ContentItem, Paginated, Product } from "../types";

const productsApi = import.meta.env.VITE_FREE_PRODUCTS_API ?? "https://dummyjson.com/products";
const postsApi = import.meta.env.VITE_FREE_POSTS_API ?? "https://dummyjson.com/posts";

type DummyProduct = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  brand?: string;
  rating?: number;
  thumbnail?: string;
  images?: string[];
  stock?: number;
  discountPercentage?: number;
  dimensions?: Record<string, number>;
};

type DummyPost = {
  id: number;
  title: string;
  body: string;
  views?: number;
  tags?: string[];
};

function toNepaliPrice(usd: number) {
  return Math.round(usd * 133);
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function mapCategory(category?: string): Product["category"] {
  if (category === "laptops") return "laptop";
  if (category === "tablets") return "tablet";
  if (category?.includes("watch")) return "smartwatch";
  if (category === "smartphones") return "mobile";
  return "accessory";
}

function mapProduct(item: DummyProduct): Product {
  return {
    _id: `dummy-${item.id}`,
    name: item.title,
    slug: `dummy-${item.id}-${slugify(item.title)}`,
    category: mapCategory(item.category),
    images: item.images?.length ? item.images : item.thumbnail ? [item.thumbnail] : [],
    brand: {
      _id: `brand-${slugify(item.brand ?? item.category)}`,
      name: item.brand ?? item.category,
      slug: slugify(item.brand ?? item.category)
    },
    price: {
      currency: "NPR",
      official: toNepaliPrice(item.price),
      market: toNepaliPrice(Math.max(item.price - (item.discountPercentage ?? 0), 1)),
      stores: [
        {
          name: "Demo Store",
          price: toNepaliPrice(item.price),
          availability: item.stock ? "in_stock" : "out_of_stock"
        }
      ]
    },
    specifications: {
      category: item.category,
      rating: item.rating ?? 0,
      stock: item.stock ?? 0,
      width: item.dimensions?.width ?? "N/A",
      height: item.dimensions?.height ?? "N/A"
    },
    rating: item.rating ? Math.round(item.rating * 2) : 8
  };
}

function endpointForCategory(category?: string) {
  if (category === "mobile") return `${productsApi}/category/smartphones`;
  if (category === "laptop") return `${productsApi}/category/laptops`;
  if (category === "tablet") return `${productsApi}/category/tablets`;
  if (category === "smartwatch") return `${productsApi}/category/mens-watches`;
  return `${productsApi}?limit=24`;
}

export async function fetchFreeProducts(params?: Record<string, unknown>): Promise<Paginated<Product>> {
  const category = String(params?.category ?? "");
  const limit = Number(params?.limit ?? 12);
  const response = await fetch(endpointForCategory(category));
  const data = (await response.json()) as { products: DummyProduct[]; total?: number };
  const items = data.products.map(mapProduct).slice(0, limit);

  return {
    items,
    page: 1,
    limit,
    total: data.total ?? items.length,
    pages: 1
  };
}

export async function fetchFreeProductBySlug(slug?: string): Promise<Product> {
  const match = slug?.match(/^dummy-(\d+)/);
  if (!match) throw new Error("Product not found");
  const response = await fetch(`${productsApi}/${match[1]}`);
  const item = (await response.json()) as DummyProduct;
  return mapProduct(item);
}

export async function fetchFreePosts(params?: Record<string, unknown>): Promise<Paginated<ContentItem>> {
  const limit = Number(params?.limit ?? 12);
  const response = await fetch(`${postsApi}?limit=${limit}`);
  const data = (await response.json()) as { posts: DummyPost[]; total?: number };

  return {
    items: data.posts.map((post) => ({
      _id: `dummy-post-${post.id}`,
      title: post.title,
      slug: `dummy-post-${post.id}-${slugify(post.title)}`,
      excerpt: post.body,
      banner: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
      views: post.views ?? 0,
      publishedAt: new Date().toISOString()
    })),
    page: 1,
    limit,
    total: data.total ?? data.posts.length,
    pages: 1
  };
}

export async function fetchFreeBrands(): Promise<Paginated<Brand>> {
  const products = await fetchFreeProducts({ limit: 30 });
  const brands = Array.from(new Map(products.items.map((product) => [product.brand?.slug, product.brand])).values()).filter(Boolean) as Brand[];

  return {
    items: brands.map((brand) => ({ ...brand, productCount: products.items.filter((product) => product.brand?.slug === brand.slug).length })),
    page: 1,
    limit: brands.length,
    total: brands.length,
    pages: 1
  };
}
