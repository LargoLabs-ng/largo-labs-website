import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { site } from "@/config/site";
import { baseUrl, productionUrl } from "@/lib/site-url";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";

// Fonts are self-hosted (no requests to Google at runtime).
const geistSans = GeistSans;
const geistMono = GeistMono;

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: `${site.shortName} — Software, platforms and websites | ${site.legalName}`,
    template: `%s | ${site.shortName}`,
  },
  description: site.description,
  applicationName: site.shortName,
  authors: [{ name: site.legalName }],
  creator: site.legalName,
  publisher: site.legalName,
  formatDetection: { telephone: false, email: false, address: false },
  // Keep non-production deployments out of search results until a domain is set.
  robots: productionUrl ? { index: true, follow: true } : { index: false, follow: true },
  openGraph: {
    type: "website",
    siteName: site.legalName,
    locale: "en_NG",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a1323",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-NG" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="flex min-h-screen flex-col">
        <OrganizationJsonLd />
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
