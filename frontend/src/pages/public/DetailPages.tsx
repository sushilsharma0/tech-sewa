import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { ProductCard } from "../../components/product/ProductCard";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { fetcher } from "../../lib/api";
import { fetchFreeProductBySlug } from "../../lib/freeApi";
import { Seo } from "../../lib/seo";
import { formatPrice } from "../../lib/utils";
import type { ContentItem, Product } from "../../types";

export function ArticleDetailPage({ type }: { type: "news" | "reviews" }) {
  const { slug } = useParams();
  const { data } = useQuery({ queryKey: [type, slug], queryFn: () => fetcher<ContentItem & { body: string; pros?: string[]; cons?: string[]; verdict?: string }>(`/${type}/${slug}`), enabled: Boolean(slug) });
  return (
    <>
      <Seo title={data?.title ?? "Article"} description={data?.excerpt} image={data?.banner} schema={{ "@context": "https://schema.org", "@type": type === "news" ? "NewsArticle" : "Review", headline: data?.title }} />
      <article className="container grid gap-8 py-8 lg:grid-cols-[1fr_320px]">
        <div>
          <p className="mb-3 text-sm text-muted-foreground"><Link to="/">Home</Link> / <Link to={`/${type}`}>{type}</Link></p>
          <h1 className="text-3xl font-black md:text-5xl">{data?.title}</h1>
          <p className="mt-4 text-muted-foreground">Published {data?.publishedAt ? new Date(data.publishedAt).toLocaleDateString() : "recently"} • {data?.views ?? 0} views</p>
          {data?.banner ? <img className="mt-6 aspect-[16/8] w-full rounded-lg object-cover" src={data.banner} alt={data.title} /> : null}
          {type === "reviews" ? <ReviewSummary data={data} /> : null}
          <div className="prose prose-slate mt-8 max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: data?.body ?? "" }} />
        </div>
        <aside className="grid content-start gap-4">
          <Card className="p-5"><h2 className="font-bold">Table of Contents</h2><p className="mt-2 text-sm text-muted-foreground">Overview, specifications, verdict, comments, related stories.</p></Card>
          <Card className="p-5"><h2 className="font-bold">Advertisement</h2><div className="mt-3 grid h-56 place-items-center rounded-md bg-muted text-sm text-muted-foreground">AdSense slot</div></Card>
          <Card className="p-5"><h2 className="font-bold">Comments</h2><textarea className="mt-3 h-28 w-full rounded-md border border-border bg-background p-3" placeholder="Join the discussion" /><Button className="mt-3">Post</Button></Card>
        </aside>
      </article>
    </>
  );
}

function ReviewSummary({ data }: { data?: any }) {
  return (
    <div className="mt-6 grid gap-4 md:grid-cols-3">
      <Card className="p-5"><p className="text-sm text-muted-foreground">Overall Rating</p><p className="mt-2 text-4xl font-black">{data?.rating ?? "8.5"}/10</p></Card>
      <Card className="p-5"><p className="font-bold">Pros</p><ul className="mt-2 text-sm text-muted-foreground">{(data?.pros ?? ["Strong performance", "Reliable battery"]).map((item: string) => <li key={item}>{item}</li>)}</ul></Card>
      <Card className="p-5"><p className="font-bold">Cons</p><ul className="mt-2 text-sm text-muted-foreground">{(data?.cons ?? ["Limited availability"]).map((item: string) => <li key={item}>{item}</li>)}</ul></Card>
    </div>
  );
}

export function ProductDetailPage() {
  const { slug } = useParams();
  const { data } = useQuery({
    queryKey: ["product", slug],
    queryFn: async () => fetcher<Product>(`/products/${slug}`).catch(() => fetchFreeProductBySlug(slug)),
    enabled: Boolean(slug)
  });
  const specs = Object.entries(data?.specifications ?? {});
  return (
    <>
      <Seo title={data?.name ?? "Product"} description={`${data?.name ?? "Product"} price in Nepal, specifications, reviews, and price history.`} schema={{ "@context": "https://schema.org", "@type": "Product", name: data?.name }} />
      <section className="container grid gap-8 py-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-4">
          <img className="aspect-square rounded-lg border border-border bg-card object-cover" src={data?.images?.[0] || "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=1000&auto=format&fit=crop"} alt={data?.name} />
          <div className="grid grid-cols-4 gap-3">{(data?.images ?? []).slice(0, 4).map((image) => <img key={image} className="aspect-square rounded-md border border-border object-cover" src={image} alt={data?.name} />)}</div>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Official product page</p>
          <h1 className="mt-2 text-3xl font-black md:text-5xl">{data?.name}</h1>
          <p className="mt-4 text-3xl font-black text-primary">{formatPrice(data?.price?.official, data?.price?.currency)}</p>
          <div className="mt-6 flex flex-wrap gap-3"><Button>Buy via Affiliate</Button><Button variant="secondary">Track Price</Button><Button variant="secondary">Add to Compare</Button></div>
          <Card className="mt-8 overflow-hidden">
            <div className="border-b border-border p-4 font-bold">Specifications</div>
            <div className="divide-y divide-border">{specs.map(([key, value]) => <div key={key} className="grid grid-cols-2 gap-4 p-4 text-sm"><span className="font-semibold capitalize">{key}</span><span className="text-muted-foreground">{String(value)}</span></div>)}</div>
          </Card>
        </div>
      </section>
      <section className="container pb-10">
        <Card className="p-5"><h2 className="text-xl font-black">Price History</h2><div className="mt-4 grid h-56 place-items-center rounded-md bg-muted text-muted-foreground">Chart ready for historical price data</div></Card>
      </section>
    </>
  );
}

export function BrandDetailPage() {
  return <GenericPage title="Brand Details" description="Brand profile, products, news, and reviews." />;
}

export function GenericPage({ title, description }: { title: string; description: string }) {
  return (
    <>
      <Seo title={title} description={description} />
      <section className="container py-10">
        <h1 className="text-3xl font-black md:text-4xl">{title}</h1>
        <p className="mt-3 max-w-3xl text-muted-foreground">{description}</p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {["Content", "Management", "Integrations"].map((item) => <Card key={item} className="p-5"><h2 className="font-bold">{item}</h2><p className="mt-2 text-sm text-muted-foreground">Production module scaffolded for this section.</p></Card>)}
        </div>
      </section>
    </>
  );
}

export function ComparisonPage() {
  return (
    <>
      <Seo title="Product Comparison" description="Compare 2 to 4 products, highlight better specs, share results, and export PDF." />
      <section className="container py-8">
        <h1 className="text-3xl font-black md:text-4xl">Compare Products</h1>
        <p className="mt-2 text-muted-foreground">Compare 2-4 phones, laptops, tablets, or watches side by side.</p>
        <Card className="mt-6 overflow-x-auto p-4">
          <div className="grid min-w-[720px] grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((slot) => <div key={slot} className="grid h-40 place-items-center rounded-md border border-dashed border-border text-sm text-muted-foreground">Add product {slot}</div>)}
          </div>
          <div className="mt-6 flex gap-3"><Button>Share</Button><Button variant="secondary">Export PDF</Button></div>
        </Card>
      </section>
    </>
  );
}
