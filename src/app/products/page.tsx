import { Container, PageHero } from "@/components/ui";
import { products } from "@/config/products";
import { site } from "@/config/site";
import { ProductCard } from "@/components/sections/ProductCard";
import { ContactCta } from "@/components/sections/ContactCta";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Products",
  description:
    "Digital products developed by Largo Labs Ltd, including Wetin Dey, an event ticketing platform for event organisers.",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Products"
        title="Products developed by Largo Labs"
        intro={`Alongside client work, ${site.legalName} designs, builds and operates digital products of its own. Each product has its own name and website and is developed under Largo Labs.`}
      />

      <section className="py-16 sm:py-20" aria-label="Product directory">
        <Container>
          <div className="space-y-8">
            {products.map((p, i) => (
              <ProductCard key={p.slug} product={p} priority={i === 0} />
            ))}
          </div>
          <p className="mt-10 rounded-[var(--radius-card)] border border-dashed border-line px-6 py-5 text-sm text-muted">
            Largo Labs intends to develop further products. Each one will be
            listed on this page when it launches.
          </p>
        </Container>
      </section>

      <ContactCta
        title="Have an idea for a product?"
        body="We build digital products from concept to launch — for ourselves and for clients. Tell us what you have in mind."
      />
    </>
  );
}
