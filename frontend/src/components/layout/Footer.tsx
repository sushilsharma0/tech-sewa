import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card pb-20 pt-10 lg:pb-10">
      <div className="container grid gap-8 md:grid-cols-4">
        <div>
          <h2 className="text-lg font-black">TechSewa Nepal</h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">Tech news, reviews, prices, and buying guides built for Nepali buyers.</p>
        </div>
        {[
          ["Explore", ["News", "Reviews", "Videos", "Brands"]],
          ["Prices", ["Mobile Price Nepal", "Laptop Price Nepal", "Smartwatch Price Nepal", "Tablet Price Nepal"]],
          ["Company", ["About", "Contact", "Privacy Policy", "Terms"]]
        ].map(([title, links]) => (
          <div key={title as string}>
            <h3 className="font-semibold">{title as string}</h3>
            <div className="mt-3 grid gap-2 text-sm text-muted-foreground">
              {(links as string[]).map((link) => (
                <Link key={link} to={`/${link.toLowerCase().replaceAll(" ", "-")}`} className="hover:text-primary">
                  {link}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </footer>
  );
}
