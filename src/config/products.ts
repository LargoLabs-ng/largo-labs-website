/**
 * PRODUCT DIRECTORY
 * ─────────────────────────────────────────────────────────────────────────────
 * Every product developed under Largo Labs Ltd is listed here. The Products
 * page, the homepage feature, the footer and the sitemap all read from this
 * list — to add a product, add one object below. Nothing else needs changing.
 *
 * Only list real products. Keep this file free of imports (the pre-launch
 * check script reads it).
 */

export type Product = {
  /** URL-safe id, used for the anchor link (/products#<slug>). */
  slug: string;
  name: string;
  category: string;
  /** Short brand line, if the product has one. */
  tagline?: string;
  /** One or two sentences: what the product is. */
  summary: string;
  /** Longer description for the Products page. */
  description: string;
  /** Primary use cases, written as short phrases. */
  useCases: string[];
  /** Who the product is for. */
  audience: string;
  /** Live website. `null` until the confirmed URL is supplied — the link is hidden. */
  url: string | null;
  /**
   * Optional screenshot in /public, e.g. "/products/wetin-dey.webp" (1600×1000
   * recommended). Without one, a branded panel is shown instead.
   */
  image?: { src: string; alt: string; width: number; height: number };
  /** Product brand colours, used for the branded panel. */
  brand: { primary: string; dark: string; light: string; accent: string };
  /** Set to true for the product shown on the homepage. */
  featured?: boolean;
};

export const products: Product[] = [
  {
    slug: "wetin-dey",
    name: "Wetin Dey",
    category: "Event ticketing platform",
    tagline: "Your plug for what's happening",
    summary:
      "An event ticketing platform that helps organisers publish event pages, sell and distribute tickets, and keep in touch with attendees.",
    description:
      "Wetin Dey gives event organisers one place to run ticketing. An organiser creates an event page, sets up tickets, and shares a link. Attendees buy their tickets online and receive them digitally. Organisers can then see who has bought tickets and follow up with attendees before and after the event.",
    useCases: [
      "Creating a public page for an event",
      "Selling and distributing tickets online",
      "Tracking ticket purchases in one place",
      "Sending follow-ups and updates to attendees",
      "Scanning attendees in at the door",
    ],
    audience:
      "Event organisers — from student associations and community groups to independent promoters — who need a simple way to sell tickets and stay in contact with the people attending.",
    // Confirmed live URL. Update this when Wetin Dey moves to its own domain.
    url: "https://wetindey-six.vercel.app",
    // Captured from the live site on 25 Oct 2026. Replace when the site changes.
    image: {
      src: "/products/wetin-dey.webp",
      alt: "The Wetin Dey homepage, headed “Wetin dey this weekend?”, with buttons to find events or host one",
      width: 800,
      height: 581,
    },
    // Colours taken from the live Wetin Dey site.
    brand: {
      primary: "#390A41",
      dark: "#35063E",
      light: "#FFF7F3",
      accent: "#F5C451",
    },
    featured: true,
  },
];

export const featuredProduct = products.find((p) => p.featured) ?? products[0];
