import { Search } from "lucide-react";

export function ProductFilters({ category }: { category: string }) {
  return (
    <aside className="rounded-lg border border-border bg-card p-4">
      <h2 className="font-bold">Filters</h2>
      <label className="mt-4 flex h-10 items-center gap-2 rounded-md border border-border px-3">
        <Search size={16} />
        <input className="w-full bg-transparent text-sm outline-none" placeholder={`Search ${category}`} />
      </label>
      {["Brand", "Price", "RAM", "Storage", category === "laptop" ? "GPU" : "5G", category === "mobile" ? "Refresh Rate" : "Processor"].map((filter) => (
        <div key={filter} className="mt-4">
          <label className="text-sm font-semibold">{filter}</label>
          <select className="mt-2 h-10 w-full rounded-md border border-border bg-background px-3 text-sm">
            <option>All</option>
            <option>Popular</option>
            <option>Premium</option>
          </select>
        </div>
      ))}
    </aside>
  );
}
