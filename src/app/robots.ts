import type { MetadataRoute } from "next";
import { absoluteUrl, productionUrl } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: absoluteUrl("/sitemap.xml"),
    ...(productionUrl ? { host: productionUrl } : {}),
  };
}
