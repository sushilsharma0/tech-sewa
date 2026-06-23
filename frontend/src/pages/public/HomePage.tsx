import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArticleCard } from "../../components/home/ArticleCard";
import { ProductCard } from "../../components/product/ProductCard";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Skeleton } from "../../components/ui/Skeleton";
import { Seo } from "../../lib/seo";
import { useBrands, useNews, useProducts, useReviews } from "../../hooks/useResources";

function Section({ title, children, href }: { title: string; children: React.ReactNode; href?: string }) {
  return (
    <section className="container py-8">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="text-2xl font-black">{title}</h2>
        {href ? <Link className="text-sm font-semibold text-primary" to={href}>View all</Link> : null}
      </div>
      {children}
    </section>
  );
}

export function HomePage() {
  const news = useNews({ limit: 6 });
  const reviews = useReviews({ limit: 3 });
  const mobiles = useProducts({ category: "mobile", limit: 4 });
  const laptops = useProducts({ category: "laptop", limit: 4 });
  const brands = useBrands();

  return (
    <>
      <Seo title="Tech News, Reviews and Prices in Nepal" description="Latest technology news, mobile prices, laptop prices, reviews, comparisons, and buying guides for Nepal." />
      <section className="border-b border-border bg-card">
        <div className="container grid gap-6 py-6 lg:grid-cols-[1.45fr_0.55fr]">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="relative min-h-[420px] overflow-hidden rounded-lg">
            <img className="absolute inset-0 h-full w-full object-cover" src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1800&auto=format&fit=crop" alt="Tech devices" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-transparent" />
            <div className="absolute bottom-0 max-w-3xl p-6 text-white md:p-8">
              <p className="mb-3 inline-flex rounded-md bg-accent px-3 py-1 text-xs font-bold uppercase">Breaking</p>
              <h1 className="text-3xl font-black md:text-5xl">Nepal's smarter home for tech buying decisions</h1>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-200 md:text-base">Compare phones, track prices, read reviews, and follow the latest tech news from one fast, mobile-first platform.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button onClick={() => (window.location.href = "/mobile-price-nepal")}>Browse Prices</Button>
                <Button variant="secondary" onClick={() => (window.location.href = "/compare")}>Compare Products</Button>
              </div>
            </div>
          </motion.div>
          <div className="grid gap-4">
            {["Trending News", "Latest Videos", "Sponsored"].map((title) => (
              <Card key={title} className="p-5">
                <p className="text-sm font-semibold text-primary">{title}</p>
                <h2 className="mt-2 text-xl font-bold">Flagship launches, price drops, and buying guides</h2>
                <p className="mt-2 text-sm text-muted-foreground">Updated hourly for Nepali buyers.</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <div className="border-b border-border bg-primary py-3 text-primary-foreground">
        <div className="container flex gap-4 overflow-hidden text-sm font-semibold">
          <span>Breaking News</span>
          <span className="whitespace-nowrap text-primary-foreground/85">New phones, laptop offers, review verdicts, and market price updates across Nepal.</span>
        </div>
      </div>
      <Section title="Latest News" href="/news">
        {news.isLoading ? <Skeleton className="h-64" /> : <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{news.data?.items.map((item) => <ArticleCard key={item._id} item={item} />)}</div>}
      </Section>
      <Section title="Featured Reviews" href="/reviews">
        <div className="grid gap-5 md:grid-cols-3">{reviews.data?.items.map((item) => <ArticleCard key={item._id} item={item} type="reviews" />)}</div>
      </Section>
      <Section title="Mobile Price In Nepal" href="/mobile-price-nepal">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{mobiles.data?.items.map((item) => <ProductCard key={item._id} product={item} />)}</div>
      </Section>
      <Section title="Laptop Price In Nepal" href="/laptop-price-nepal">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{laptops.data?.items.map((item) => <ProductCard key={item._id} product={item} />)}</div>
      </Section>
      <Section title="Best Lists and Comparisons">
        <div className="grid gap-4 md:grid-cols-3">
          {["Best Phones Under Rs. 20000", "Best Phones Under Rs. 30000", "Best Gaming Laptops", "Best Camera Phones", "Top Comparisons", "Popular Brands"].map((title) => (
            <Card key={title} className="p-5"><h3 className="font-bold">{title}</h3><p className="mt-2 text-sm text-muted-foreground">Curated and updated with Nepali pricing.</p></Card>
          ))}
        </div>
      </Section>
      <Section title="Popular Brands" href="/brands">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
          {brands.data?.items.map((brand) => <Card key={brand._id} className="grid place-items-center p-5 text-center font-bold">{brand.logo ? <img className="mb-2 h-10" src={brand.logo} alt={brand.name} /> : null}{brand.name}</Card>)}
        </div>
      </Section>
      <section className="container pb-10">
        <Card className="grid gap-4 p-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h2 className="text-2xl font-black">Get price drops and buying guides</h2>
            <p className="mt-2 text-sm text-muted-foreground">Newsletter, alerts, affiliate offers, and sponsored updates are ready to integrate.</p>
          </div>
          <form className="flex gap-2">
            <input className="h-10 rounded-md border border-border bg-background px-3" placeholder="Email address" />
            <Button>Subscribe</Button>
          </form>
        </Card>
      </section>
    </>
  );
}
