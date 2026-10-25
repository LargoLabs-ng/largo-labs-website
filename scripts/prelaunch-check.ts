/**
 * Pre-launch check — lists every company detail that still needs to be
 * supplied before the website goes live.
 *
 *   npm run check:launch
 *
 * Exits with code 1 if a launch-blocking item is missing.
 */
import { site } from "../src/config/site.ts";
import { products } from "../src/config/products.ts";

type Item = { label: string; ok: boolean; blocking: boolean; where: string };

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || site.domain;

const items: Item[] = [
  { label: "Production domain (site.domain or NEXT_PUBLIC_SITE_URL)", ok: !!siteUrl, blocking: true, where: "src/config/site.ts → domain" },
  { label: "Domain uses https://", ok: !!siteUrl && siteUrl.startsWith("https://"), blocking: true, where: "src/config/site.ts → domain" },
  { label: "Business email address", ok: !!site.email, blocking: true, where: "src/config/site.ts → email" },
  { label: "FORMSPREE_FORM_ID environment variable", ok: !!process.env.FORMSPREE_FORM_ID, blocking: true, where: "Hosting env vars (or .env.local for local testing)" },
  ...products.map((p) => ({
    label: `${p.name} website URL`,
    ok: !!p.url && p.url.startsWith("https://"),
    blocking: true,
    where: `src/config/products.ts → ${p.slug}.url`,
  })),
  ...products.map((p) => ({
    label: `${p.name} screenshot (optional)`,
    ok: !!p.image,
    blocking: false,
    where: `src/config/products.ts → ${p.slug}.image`,
  })),
  { label: "Business phone number (optional)", ok: !!site.phone, blocking: false, where: "src/config/site.ts → phone" },
  { label: "Business address (optional)", ok: !!site.address, blocking: false, where: "src/config/site.ts → address" },
  { label: "RC number (optional)", ok: !!site.rcNumber, blocking: false, where: "src/config/site.ts → rcNumber" },
  { label: "Social profiles (optional)", ok: site.social.length > 0, blocking: false, where: "src/config/site.ts → social" },
];

let failed = false;
console.log("\nLargo Labs — pre-launch check\n");
for (const i of items) {
  const mark = i.ok ? "✔" : i.blocking ? "✘" : "–";
  if (!i.ok && i.blocking) failed = true;
  console.log(`  ${mark}  ${i.label}${i.ok ? "" : `\n       → ${i.where}`}`);
}
console.log(
  `\n  Also confirm manually: legal pages reviewed, enquiry retention period ("${site.legal.enquiryRetention}"), "Last updated" date (${site.legal.lastUpdated}).\n`,
);
if (failed) {
  console.log("  ✘ Not ready for launch — fill in the items marked ✘.\n");
  process.exit(1);
}
console.log("  ✔ All launch-blocking items are in place.\n");
