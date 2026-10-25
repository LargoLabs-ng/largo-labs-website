import { site } from "@/config/site";
import { products } from "@/config/products";
import { baseUrl } from "@/lib/site-url";

/**
 * Organization + WebSite structured data. Only verified facts are included —
 * fields that are not yet configured are omitted, and no ratings or reviews
 * are ever added.
 */
export function OrganizationJsonLd() {
  const org: Record<string, unknown> = {
    "@type": "Organization",
    "@id": `${baseUrl}/#organization`,
    name: site.shortName,
    legalName: site.legalName,
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description: site.description,
    address: {
      "@type": "PostalAddress",
      addressCountry: site.countryCode,
      ...(site.address ? { streetAddress: site.address } : {}),
    },
    knowsAbout: [
      "Website design and development",
      "Software development",
      "Online platforms",
      "Digital product development",
      "IT consulting",
    ],
    ...(site.email ? { email: site.email } : {}),
    ...(site.phone ? { telephone: site.phone } : {}),
    ...(site.social.length ? { sameAs: site.social.map((s) => s.url) } : {}),
    brand: products.map((p) => ({ "@type": "Brand", name: p.name })),
  };

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      org,
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        url: baseUrl,
        name: site.shortName,
        publisher: { "@id": `${baseUrl}/#organization` },
        inLanguage: "en-NG",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe here: all values come from our own config.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
