import { Link } from "react-router-dom";
import type { Product } from "../../types";
import { formatPrice } from "../../lib/utils";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";

export function ProductCard({ product, list = false }: { product: Product; list?: boolean }) {
  return (
    <Card className={list ? "grid gap-4 p-4 sm:grid-cols-[160px_1fr_auto]" : "overflow-hidden"}>
      <Link to={`/product/${product.slug}`}>
        <img
          className={list ? "aspect-square w-full rounded-md object-cover" : "aspect-square w-full object-cover"}
          loading="lazy"
          src={product.images?.[0] || "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=1000&auto=format&fit=crop"}
          alt={product.name}
        />
      </Link>
      <div className={list ? "" : "p-4"}>
        <Link to={`/product/${product.slug}`} className="line-clamp-2 text-lg font-bold hover:text-primary">
          {product.name}
        </Link>
        <p className="mt-2 text-sm text-muted-foreground">{product.brand?.name || "TechSewa verified"}</p>
        <p className="mt-3 text-xl font-black">{formatPrice(product.price?.official, product.price?.currency)}</p>
      </div>
      <div className={list ? "flex items-center" : "px-4 pb-4"}>
        <Button className="w-full" variant="secondary" onClick={() => (window.location.href = `/compare?add=${product._id}`)}>
          Compare
        </Button>
      </div>
    </Card>
  );
}
