import { useQuery } from "@tanstack/react-query";
import { DataTable } from "../../components/admin/DataTable";
import { Card } from "../../components/ui/Card";
import { fetcher } from "../../lib/api";
import { Seo } from "../../lib/seo";

export function AdminDashboard() {
  const { data } = useQuery({ queryKey: ["admin-stats"], queryFn: () => fetcher<Record<string, number>>("/admin/stats") });
  const cards = ["users", "products", "news", "reviews", "brands", "views", "activeAds", "adRevenue"];
  return (
    <>
      <Seo title="Admin Dashboard" />
      <h1 className="text-3xl font-black">Admin Dashboard</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((key) => <Card key={key} className="p-5"><p className="text-sm capitalize text-muted-foreground">{key}</p><p className="mt-2 text-3xl font-black">{data?.[key] ?? 0}</p></Card>)}
      </div>
      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        {["Revenue Graph", "Visitors Graph", "Product View Graph"].map((chart) => <Card key={chart} className="grid h-72 place-items-center p-5 text-muted-foreground">{chart}</Card>)}
      </div>
    </>
  );
}

export function AdminResourcePage({ resource }: { resource: string }) {
  const { data } = useQuery({ queryKey: ["admin", resource], queryFn: () => fetcher<{ items: Array<Record<string, unknown>> }>(`/admin/${resource}`) });
  return (
    <>
      <Seo title={`Admin ${resource}`} />
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="text-3xl font-black capitalize">{resource}</h1>
        <button className="h-10 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground">Create</button>
      </div>
      <DataTable title={`${resource} management`} rows={data?.items ?? []} />
    </>
  );
}
