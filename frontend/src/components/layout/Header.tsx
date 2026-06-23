import { Menu, Moon, Search, Sun } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "../ui/Button";
import { useTheme } from "../../contexts/ThemeContext";

const navItems = [
  ["News", "/news"],
  ["Reviews", "/reviews"],
  ["Mobile Price", "/mobile-price-nepal"],
  ["Laptop Price", "/laptop-price-nepal"],
  ["Compare", "/compare"],
  ["Brands", "/brands"]
];

export function Header() {
  const { theme, toggleTheme } = useTheme();
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 text-xl font-black">
          <span className="grid size-9 place-items-center rounded-md bg-primary text-primary-foreground">TS</span>
          <span>TechSewa</span>
        </Link>
        <nav className="hidden items-center gap-5 text-sm font-semibold lg:flex">
          {navItems.map(([label, href]) => (
            <NavLink key={href} to={href} className={({ isActive }) => (isActive ? "text-primary" : "text-muted-foreground hover:text-foreground")}>
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <Button variant="ghost" aria-label="Search" onClick={() => (window.location.href = "/search")}>
            <Search size={18} />
          </Button>
          <Button variant="ghost" aria-label="Toggle theme" onClick={toggleTheme}>
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </Button>
          <Button className="hidden sm:inline-flex" variant="secondary" onClick={() => (window.location.href = "/login")}>
            Login
          </Button>
          <Button className="lg:hidden" variant="ghost" aria-label="Menu">
            <Menu size={20} />
          </Button>
        </div>
      </div>
    </header>
  );
}
