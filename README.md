# LARGO LABS LTD — Official Website

The corporate website for **LARGO LABS LTD**, a technology company registered in Nigeria, and the home of its product directory (starting with **Wetin Dey**).

Built with Next.js 16 (App Router), TypeScript and Tailwind CSS 4. Every page is statically pre-rendered, and the only server code is the contact-form endpoint.

---

## 1. Quick start (on your computer)

You need **Node.js 22.18 or newer** (`node -v` to check).

```bash
npm install              # install dependencies (first time only)
npm run dev              # local preview at http://localhost:3000
npm run build            # production build (run before deploying)
npm run start            # serve the production build locally
npm run lint             # code checks
npm run check:launch     # lists company details still missing before launch
```

---

## 2. Pages

| Page | URL | Purpose |
|---|---|---|
| Home | `/` | Who Largo Labs is, services, Wetin Dey, process, contact CTA |
| About | `/about` | Company, focus, approach, parent/product structure, mission & vision, company information (incl. CAC activities) |
| Services | `/services` | Five registered services: what each involves, who it suits, problems solved, CTA |
| Products | `/products` | Product directory (Wetin Dey), built to grow |
| Contact | `/contact` | Enquiry form + verified contact channels |
| Privacy Policy | `/privacy` | Data practices of this site, NDPA 2023 rights |
| Terms of Use | `/terms` | Terms for this corporate website only |
| 404 | any unknown URL | Helpful not-found page |

Also generated: `/sitemap.xml`, `/robots.txt`, `/opengraph-image` (social preview), favicon/app icons, and Organization structured data (JSON-LD).

---

## 3. Where to edit things

| To change… | Edit |
|---|---|
| **Company details** (domain, email, phone, address, RC number, socials, legal dates) | `src/config/site.ts` |
| **Products** (add a product, Wetin Dey URL, screenshot) | `src/config/products.ts` |
| **Services**, enquiry types, "How we work" steps | `src/content/services.ts` |
| Navigation links | `src/content/navigation.ts` |
| Colours, fonts, spacing tokens | `src/app/globals.css` (`@theme` block) |
| Logo | `src/components/brand/Logo.tsx`, `src/app/icon.svg`, `src/app/favicon.ico`, `src/app/apple-icon.png`, `public/logo.png` |
| Privacy Policy / Terms text | `src/app/privacy/page.tsx`, `src/app/terms/page.tsx` |
| Page copy | `src/app/<page>/page.tsx` |

**Rule:** any value in `site.ts` or `products.ts` left as `null` is automatically hidden from the website. Nothing fake is ever shown — fill in the real value and it appears everywhere it's needed (footer, contact page, about page, structured data, privacy policy).

### Adding a new product
Add one object to the `products` array in `src/config/products.ts`. It automatically appears on the Products page, in the footer, in the About page structure diagram and in structured data. To show a real screenshot, put an image in `public/products/` and set the `image` field.

---

## 4. Environment variables

Copy `.env.example` → `.env.local` for local testing, and set the same variables in your hosting dashboard.

| Variable | Required | What it does |
|---|---|---|
| `FORMSPREE_FORM_ID` | **Yes** (for the form) | Formspree form ID. The server sends enquiries to `https://formspree.io/f/<ID>`. Kept server-side only. |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Live URL, e.g. `https://largolabs.com`. Turns on canonical URLs and search indexing, fixes sitemap/Open Graph links. Alternatively set `domain` in `site.ts`. |

### Setting up Formspree
1. Create a free account at formspree.io using the **business email** that should receive enquiries.
2. Create a new form. Copy the ID at the end of its endpoint (`https://formspree.io/f/`**`abcdwxyz`**).
3. Add `FORMSPREE_FORM_ID=abcdwxyz` to your hosting environment variables and redeploy.
4. Send a test enquiry from the live site and confirm it arrives in the inbox. (Formspree may ask you to confirm the first submission.)
5. Optional, in Formspree settings: enable reCAPTCHA/spam filtering, and restrict allowed domains to your domain.

### How the form behaves (honest states)
- Validates in the browser and again on the server (name, email format, enquiry type, message 20–5,000 chars).
- Spam protection: hidden honeypot field, minimum fill time, same-origin check, per-IP rate limit (5 per 10 minutes, best-effort per server instance), plus Formspree's own filtering.
- Shows **"Message sent"** only when Formspree accepts the message.
- If `FORMSPREE_FORM_ID` is missing, Formspree rejects the message, or the network fails, the visitor is told plainly that **their message has not been sent**, their text stays in the form, and the business email is offered as an alternative (once configured).

---

## 5. Deployment (Vercel — recommended)

1. Push this folder to a GitHub repository (under the company's GitHub organisation).
2. At vercel.com → **Add New → Project** → import the repository. Framework: Next.js (auto-detected). No build settings to change.
3. In **Settings → Environment Variables**, add `FORMSPREE_FORM_ID` and `NEXT_PUBLIC_SITE_URL`. Redeploy.
4. In **Settings → Domains**, add your domain (e.g. `largolabs.com` and `www.largolabs.com`). Add the DNS records Vercel shows at your domain registrar. Choose one as primary; Vercel redirects the other.
5. HTTPS certificates are issued automatically once DNS is correct. Confirm `https://` loads with a padlock.
6. Run through the pre-launch checklist below.

Any Node.js host that supports Next.js 16 works too (`npm run build` then `npm run start`).

---

## 6. Security measures implemented
- Security headers on every response: Content-Security-Policy, HSTS, X-Frame-Options DENY, nosniff, Referrer-Policy, Permissions-Policy; `X-Powered-By` removed.
- No secrets in client code — the Formspree ID is read only on the server.
- Server-side validation and sanitisation of all form input; request size limit; JSON-only endpoint.
- Fonts are self-hosted (no third-party requests on page load). No cookies, analytics or trackers.
- Preview deployments are `noindex` until a production domain is configured.

---

## 7. What was tested

- Production build, TypeScript and ESLint — pass with no errors or warnings.
- All 7 pages + 404 render with status 200/404, exactly one `<h1>` each, no console errors.
- No horizontal scrolling at 375px (mobile), 768px (tablet) and 1440px (desktop).
- All internal links and in-page anchors resolve; sitemap, robots, icons and OG image return correctly.
- Automated accessibility scan (axe, WCAG 2.1 AA) on every page at mobile and desktop widths — 0 violations.
- Keyboard: "Skip to content" link, visible focus styles, mobile menu closes on Escape and on navigation.
- Contact form: client validation and focus management; server rejects honeypot, too-fast, invalid, cross-origin and wrong-format requests; rate limit triggers on the 6th request; "not configured" and "delivery failed" states show honest messages and keep the visitor's text; success state displays only on a successful response.
- Canonical URLs, `index, follow` and absolute sitemap/OG URLs appear correctly when `NEXT_PUBLIC_SITE_URL` is set.

**Not yet tested (needs your accounts):** real delivery to the company inbox through Formspree; the live domain, DNS and HTTPS.

---

## 8. Information still needed

Run `npm run check:launch` at any time to see this list.

| Item | Where | Needed for launch? |
|---|---|---|
| Production domain | `site.ts → domain` or `NEXT_PUBLIC_SITE_URL` | **Yes** |
| Business email address | `site.ts → email` | ✔ Done — `largo.labs1@gmail.com` (consider a domain email like `hello@yourdomain` later) |
| Formspree form ID | env `FORMSPREE_FORM_ID` | ✔ Created — add it to the hosting environment variables when deploying (ask the project owner for the ID) |
| Wetin Dey's confirmed public URL | `products.ts → url` | ✔ Done — `https://wetindey-six.vercel.app` (update when it gets its own domain) |
| Wetin Dey screenshot | `products.ts → image` | ✔ Done — captured 25 Oct 2026 |
| Business phone | `site.ts → phone` | Optional (some reviewers prefer one) |
| Business address | `site.ts → address` | Optional — only if you want it public |
| RC number | `site.ts → rcNumber` | Optional — public CAC info; helps reviewers match the registration |
| Social profiles | `site.ts → social` | Optional |

### Items to confirm / legal review
- **Privacy Policy:** confirm the retention period (`site.ts → legal.enquiryRetention`, currently "24 months after our last communication"), that only the people who need it can access enquiries, and the "Last updated" date. If you later add analytics, cookies or new processors, update the policy first. If your organisation meets the NDPC's thresholds for registration as a data controller/processor, complete that separately.
- **Terms of Use:** the Limitation of Liability and Governing Law sections should be reviewed by a Nigerian lawyer.
- **Wetin Dey tagline** ("Your plug for what's happening") and description — confirm they match the product's current positioning.
- **Mission and vision** are brand positioning written for the site; edit freely.

---

## 9. Pre-launch checklist

**Domain & HTTPS**
- [ ] Domain purchased and added in hosting dashboard; DNS records set
- [ ] `https://yourdomain` loads with a valid certificate; `http://` and `www` redirect to the primary URL
- [ ] `NEXT_PUBLIC_SITE_URL` (or `site.domain`) set to the exact https URL; redeployed
- [ ] `https://yourdomain/sitemap.xml` and `/robots.txt` show the real domain

**Contact details**
- [x] Business email added to `site.ts` (optional later: switch to a domain email)
- [x] Formspree form created with that email; test submission accepted
- [ ] `FORMSPREE_FORM_ID` added in the hosting dashboard; test enquiry sent from the live site
- [ ] Phone / address / RC number added only if you want them public

**Product**
- [x] Wetin Dey URL added and the "Visit Wetin Dey" button opens the correct live site
- [ ] Wetin Dey's own website references "a product of LARGO LABS LTD" and links back (helps reviewers connect the two)
- [x] Real screenshot added

**Legal pages**
- [ ] Privacy Policy and Terms reviewed; dates and retention period confirmed
- [ ] Both linked in the footer (already done) and open correctly on the live domain

**Final checks**
- [ ] `npm run check:launch` shows no ✘ items
- [ ] Visit every page on a phone and a desktop
- [ ] Share the homepage link in WhatsApp/LinkedIn to confirm the preview image appears
- [ ] Optional: submit the sitemap in Google Search Console
