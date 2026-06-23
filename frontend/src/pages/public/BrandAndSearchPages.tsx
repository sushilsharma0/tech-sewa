import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Card } from "../../components/ui/Card";
import { Seo } from "../../lib/seo";
import { fetcher } from "../../lib/api";
import { useBrands } from "../../hooks/useResources";
import type { Brand, ContentItem, Product } from "../../types";

export function BrandsPage() {
  const brands = useBrands();
  return (
    <>
      <Seo title="Brands" description="Browse phone, laptop, tablet, and smartwatch brands available in Nepal." />
      <section className="container py-8">
        <h1 className="text-3xl font-black md:text-4xl">Brands</h1>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
          {brands.data?.items.map((brand) => (
            <Link key={brand._id} to={`/brands/${brand.slug}`}>
              <Card className="grid aspect-square place-items-center p-5 text-center">
                {brand.logo ? <img className="h-12" src={brand.logo} alt={brand.name} /> : null}
                <div className="font-bold">{brand.name}</div>
                <p className="text-xs text-muted-foreground">{brand.productCount ?? 0} products</p>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

export function SearchPage() {
  const [q, setQ] = useState("");
  const { data } = useQuery({
    queryKey: ["search", q],
    queryFn: () => fetcher<{ news: ContentItem[]; reviews: ContentItem[]; products: Product[]; brands: Brand[] }>("/search", { q }),
    enabled: q.length > 1
  });

  return (
    <>
      <Seo title="Search" description="Live search across products, news, reviews, and brands." />
      <section className="container py-8">
        <h1 className="text-3xl font-black md:text-4xl">Search</h1>
        <input className="mt-6 h-12 w-full rounded-lg border border-border bg-card px-4 text-lg outline-none focus:border-primary" value={q} onChange={(event) => setQ(event.target.value)} placeholder="Search phones, reviews, news, brands" />
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {(["products", "news", "reviews", "brands"] as const).map((group) => (
            <Card key={group} className="p-5">
              <h2 className="font-bold capitalize">{group}</h2>
              <div className="mt-3 grid gap-2 text-sm">
                {(data?.[group] ?? []).map((item: any) => <Link key={item._id} className="text-muted-foreground hover:text-primary" to={group === "products" ? `/product/${item.slug}` : group === "brands" ? `/brands/${item.slug}` : `/${group}/${item.slug}`}>{item.name ?? item.title}</Link>)}
              </div>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
