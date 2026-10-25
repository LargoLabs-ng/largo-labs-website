import { site } from "@/config/site";

function clean(url: string) {
  return url.replace(/\/+$/, "");
}

/**
 * The confirmed production URL, or null if no domain has been set.
 * Priority: NEXT_PUBLIC_SITE_URL env var → site.domain in config.
 */
export const productionUrl: string | null = process.env.NEXT_PUBLIC_SITE_URL
  ? clean(process.env.NEXT_PUBLIC_SITE_URL)
  : site.domain
    ? clean(site.domain)
    : null;

/**
 * Best available absolute base URL (for sitemap, Open Graph, etc.).
 * Falls back to the Vercel deployment URL, then localhost.
 */
export const baseUrl: string =
  productionUrl ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export function absoluteUrl(path = "/") {
  return `${baseUrl}${path === "/" ? "" : path}`;
}
