import { useMemo, useState } from "react";
import { ArticleCard } from "../../components/home/ArticleCard";
import { ProductCard } from "../../components/product/ProductCard";
import { ProductFilters } from "../../components/product/ProductFilters";
import { Button } from "../../components/ui/Button";
import { Seo } from "../../lib/seo";
import { useNews, useProducts, useReviews } from "../../hooks/useResources";

type ListingProps = {
  kind: "news" | "reviews" | "product";
  title: string;
  description: string;
  category?: string;
};

export function ListingPage({ kind, title, description, category }: ListingProps) {
  const [view, setView] = useState<"grid" | "list">("grid");
  const params = useMemo(() => ({ limit: 12, category }), [category]);
  const news = useNews(params);
  const reviews = useReviews(params);
  const products = useProducts(params);
  const query = kind === "news" ? news : kind === "reviews" ? reviews : products;

  return (
    <>
      <Seo title={title} description={description} />
      <section className="container py-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black md:text-4xl">{title}</h1>
            <p className="mt-2 max-w-2xl text-muted-foreground">{description}</p>
          </div>
          {kind === "product" ? (
            <div className="flex gap-2">
              <Button variant={view === "grid" ? "primary" : "secondary"} onClick={() => setView("grid")}>Grid</Button>
              <Button variant={view === "list" ? "primary" : "secondary"} onClick={() => setView("list")}>List</Button>
            </div>
          ) : null}
        </div>
        {kind === "product" ? (
          <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
            <ProductFilters category={category ?? "product"} />
            <div className={view === "grid" ? "grid gap-5 sm:grid-cols-2 xl:grid-cols-3" : "grid gap-5"}>
              {products.data?.items.map((product) => <ProductCard key={product._id} product={product} list={view === "list"} />)}
            </div>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {(query.data?.items ?? []).map((item: any) => <ArticleCard key={item._id} item={item} type={kind === "reviews" ? "reviews" : "news"} />)}
          </div>
        )}
      </section>
    </>
  );
}
