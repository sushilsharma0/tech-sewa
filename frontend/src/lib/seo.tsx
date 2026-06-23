import { Helmet } from "react-helmet-async";

type SeoProps = {
  title: string;
  description?: string;
  image?: string;
  canonical?: string;
  schema?: Record<string, unknown>;
};

export function Seo({ title, description, image, canonical, schema }: SeoProps) {
  const siteTitle = `${title} | TechSewa Nepal`;
  return (
    <Helmet>
      <title>{siteTitle}</title>
      {description ? <meta name="description" content={description} /> : null}
      {canonical ? <link rel="canonical" href={canonical} /> : null}
      <meta property="og:title" content={siteTitle} />
      {description ? <meta property="og:description" content={description} /> : null}
      {image ? <meta property="og:image" content={image} /> : null}
      <meta name="twitter:card" content="summary_large_image" />
      {schema ? <script type="application/ld+json">{JSON.stringify(schema)}</script> : null}
    </Helmet>
  );
}
