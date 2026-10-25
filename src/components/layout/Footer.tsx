import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/ui";
import { site } from "@/config/site";
import { products } from "@/config/products";
import { services } from "@/content/services";
import { legalNav, mainNav } from "@/content/navigation";
import { CopyrightYear } from "@/components/layout/CopyrightYear";

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h2 className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.16em] text-ink-400">
        {title}
      </h2>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-sm text-ink-300 transition-colors hover:text-white">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-ink-950 text-white">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div className="max-w-sm">
            <Link href="/" aria-label="Largo Labs — home" className="inline-block rounded-md">
              <Logo inverted />
            </Link>
            <p className="mt-5 text-sm leading-relaxed text-ink-300">{site.description}</p>

            <div className="mt-6 space-y-1.5 text-sm">
              {site.email && (
                <p>
                  <a href={`mailto:${site.email}`} className="text-white underline-offset-4 hover:underline">
                    {site.email}
                  </a>
                </p>
              )}
              {site.phone && (
                <p>
                  <a href={`tel:${site.phone.replace(/\s+/g, "")}`} className="text-white underline-offset-4 hover:underline">
                    {site.phone}
                  </a>
                </p>
              )}
              {site.address && <p className="text-ink-300">{site.address}</p>}
              <p>
                <Link href="/contact" className="inline-flex items-center gap-1.5 text-signal-300 underline-offset-4 hover:underline">
                  Send us an enquiry →
                </Link>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            <FooterColumn title="Company" links={[{ label: "Home", href: "/" }, ...mainNav]} />
            <FooterColumn
              title="Services"
              links={services.map((s) => ({
                label: s.title.replace(" and Development", ""),
                href: `/services#${s.slug}`,
              }))}
            />
            <FooterColumn
              title="Products"
              links={[
                ...products.map((p) => ({ label: p.name, href: `/products#${p.slug}` })),
                { label: "All products", href: "/products" },
              ]}
            />
            <FooterColumn title="Legal" links={[...legalNav]} />
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-ink-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CopyrightYear /> {site.legalName}. All rights reserved.
            {site.rcNumber && <> · RC {site.rcNumber}</>} · Registered in {site.country}.
          </p>
          <p>
            {products.map((p) => p.name).join(", ")} {products.length === 1 ? "is a product" : "are products"} of{" "}
            {site.legalName}.
          </p>
        </div>
      </Container>
    </footer>
  );
}
