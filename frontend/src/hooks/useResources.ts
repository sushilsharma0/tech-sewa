import { useQuery } from "@tanstack/react-query";
import { fetcher } from "../lib/api";
import { fetchFreeBrands, fetchFreePosts, fetchFreeProducts } from "../lib/freeApi";
import type { ContentItem, Paginated, Product, Brand } from "../types";

export function useNews(params?: Record<string, unknown>) {
  return useQuery({
    queryKey: ["news", params],
    queryFn: async () => {
      const data = await fetcher<Paginated<ContentItem>>("/news", params).catch(() => null);
      return data?.items.length ? data : fetchFreePosts(params);
    }
  });
}

export function useReviews(params?: Record<string, unknown>) {
  return useQuery({
    queryKey: ["reviews", params],
    queryFn: async () => {
      const data = await fetcher<Paginated<ContentItem>>("/reviews", params).catch(() => null);
      return data?.items.length ? data : fetchFreePosts(params);
    }
  });
}

export function useProducts(params?: Record<string, unknown>) {
  return useQuery({
    queryKey: ["products", params],
    queryFn: async () => {
      const data = await fetcher<Paginated<Product>>("/products", params).catch(() => null);
      return data?.items.length ? data : fetchFreeProducts(params);
    }
  });
}

export function useBrands() {
  return useQuery({
    queryKey: ["brands"],
    queryFn: async () => {
      const data = await fetcher<Paginated<Brand>>("/brands").catch(() => null);
      return data?.items.length ? data : fetchFreeBrands();
    }
  });
}
