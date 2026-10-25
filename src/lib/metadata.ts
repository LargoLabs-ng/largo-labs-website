import type { Metadata } from "next";
import { productionUrl } from "@/lib/site-url";
import { site } from "@/config/site";

/**
 * Builds consistent per-page metadata. Canonical URLs are only emitted once a
 * production domain is configured, so preview deployments never claim to be
 * the canonical site.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: productionUrl ? { canonical: path } : undefined,
    openGraph: {
      title: `${title} | ${site.shortName}`,
      description,
      url: path,
      siteName: site.legalName,
      type: "website",
      locale: "en_NG",
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${site.legalName} — software, platforms and websites` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${site.shortName}`,
      description,
      images: ["/opengraph-image"],
    },
  };
}
