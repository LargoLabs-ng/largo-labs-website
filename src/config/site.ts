/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  LARGO LABS LTD — CENTRAL SITE CONFIGURATION
 * ─────────────────────────────────────────────────────────────────────────────
 *  Every company detail used on the website lives in this one file.
 *
 *  Values set to `null` are NOT YET CONFIRMED. The website hides anything that
 *  is `null`, so nothing invented ever appears on a public page. Fill these in
 *  as soon as the real details exist, then run `npm run check:launch` to see
 *  what is still missing.
 *
 *  Keep this file free of imports so the pre-launch check script can read it.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const site = {
  /** Official legal name, exactly as registered with the CAC. Do not change. */
  legalName: "LARGO LABS LTD",
  /** Shorter display name used in running text. */
  shortName: "Largo Labs",

  /** Country of registration. */
  country: "Nigeria",
  countryCode: "NG",

  /**
   * Business description from the company's CAC registration (verbatim).
   * Shown on the About page so reviewers can match the site to the registration.
   */
  registeredActivities:
    "The company provides digital and technology-driven services including website design and development, software solutions, online platforms, digital product creation, and IT consulting. Operations may include creating, managing, and supporting digital systems, platforms, and solutions for individuals, businesses, and organizations locally and internationally.",

  /** One-sentence description used in the footer, metadata and structured data. */
  description:
    "LARGO LABS LTD is a Nigerian technology company providing website design and development, software solutions, online platforms, digital product creation and IT consulting for individuals, businesses and organisations.",

  // ── TO BE SUPPLIED ────────────────────────────────────────────────────────

  /**
   * Production domain, including https:// and without a trailing slash.
   * e.g. "https://largolabs.com". Used for canonical URLs, sitemap and Open Graph.
   * Can also be set with the NEXT_PUBLIC_SITE_URL environment variable.
   */
  domain: null as string | null,

  /** Business email address (shown on Contact, footer and privacy policy). */
  email: "largo.labs1@gmail.com" as string | null,

  /** Business phone number in international format, e.g. "+234 800 000 0000". */
  phone: null as string | null,

  /**
   * Business address — only fill this in if you intend to publish it.
   * e.g. "12 Example Street, Calabar, Cross River State, Nigeria"
   */
  address: null as string | null,

  /**
   * CAC registration number (RC number). Optional. It is public information in
   * Nigeria and can help reviewers, but only add it if you want it displayed.
   */
  rcNumber: null as string | null,

  /** Verified social profiles. Leave empty until the accounts exist. */
  social: [] as { label: string; url: string }[],

  // ── LEGAL ─────────────────────────────────────────────────────────────────
  legal: {
    /** Date shown as "Last updated" on the Privacy Policy and Terms of Use. */
    lastUpdated: "25 October 2026",
    /**
     * How long enquiry messages are kept. This is a proposed default —
     * confirm it reflects what you actually do before launch.
     */
    enquiryRetention: "24 months after our last communication with you",
  },
} as const;

export type SiteConfig = typeof site;
