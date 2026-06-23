import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { ContentItem } from "../../types";
import { Card } from "../ui/Card";

export function ArticleCard({ item, type = "news" }: { item: ContentItem; type?: "news" | "reviews" }) {
  return (
    <motion.article initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
      <Card className="overflow-hidden">
        <Link to={`/${type}/${item.slug}`}>
          <img className="aspect-[16/9] w-full object-cover" loading="lazy" src={item.banner || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop"} alt={item.title} />
          <div className="p-4">
            <h3 className="line-clamp-2 text-lg font-bold">{item.title}</h3>
            <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">{item.excerpt}</p>
          </div>
        </Link>
      </Card>
    </motion.article>
  );
}
