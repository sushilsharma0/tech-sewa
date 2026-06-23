import { GitCompare, Home, Newspaper, Search, Smartphone } from "lucide-react";
import { NavLink } from "react-router-dom";

const items = [
  ["Home", "/", Home],
  ["News", "/news", Newspaper],
  ["Prices", "/mobile-price-nepal", Smartphone],
  ["Compare", "/compare", GitCompare],
  ["Search", "/search", Search]
];

export function MobileNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card lg:hidden">
      <div className="grid h-16 grid-cols-5">
        {items.map(([label, href, Icon]) => (
          <NavLink key={href as string} to={href as string} className={({ isActive }) => `grid place-items-center text-xs ${isActive ? "text-primary" : "text-muted-foreground"}`}>
            <Icon size={19} />
            <span>{label as string}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
