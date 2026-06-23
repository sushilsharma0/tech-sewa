import { BarChart3, Bell, Image, Newspaper, Package, Settings, Tags, Users } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";

const links = [
  ["Dashboard", "/admin", BarChart3],
  ["News", "/admin/news", Newspaper],
  ["Reviews", "/admin/reviews", Tags],
  ["Products", "/admin/products", Package],
  ["Ads", "/admin/ads", Bell],
  ["Media", "/admin/media", Image],
  ["Users", "/admin/users", Users],
  ["Settings", "/admin/settings", Settings]
];

export function AdminLayout() {
  return (
    <div className="min-h-screen bg-background lg:grid lg:grid-cols-[260px_1fr]">
      <aside className="border-r border-border bg-card p-4 lg:min-h-screen">
        <div className="mb-6 text-xl font-black">TechSewa Admin</div>
        <nav className="grid gap-1">
          {links.map(([label, href, Icon]) => (
            <NavLink key={href as string} to={href as string} end={href === "/admin"} className={({ isActive }) => `flex items-center gap-3 rounded-md px-3 py-2 text-sm font-semibold ${isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}>
              <Icon size={18} />
              {label as string}
            </NavLink>
          ))}
        </nav>
      </aside>
      <section className="p-4 lg:p-8">
        <Outlet />
      </section>
    </div>
  );
}
