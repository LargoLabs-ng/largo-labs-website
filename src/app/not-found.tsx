import type { Metadata } from "next";
import { ButtonLink, Container, Eyebrow } from "@/components/ui";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="bg-paper">
      <Container className="py-24 sm:py-32">
        <Eyebrow>Error 404</Eyebrow>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.035em] text-ink-900 sm:text-5xl">
          We couldn&apos;t find that page.
        </h1>
        <p className="mt-4 max-w-xl text-lg text-muted">
          The link may be out of date, or the page may have moved. These might help:
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/">Go to the homepage</ButtonLink>
          <ButtonLink href="/services" variant="secondary">Our services</ButtonLink>
          <ButtonLink href="/contact" variant="secondary">Contact us</ButtonLink>
        </div>
      </Container>
    </section>
  );
}
