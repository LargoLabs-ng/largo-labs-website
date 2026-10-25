import Link from "next/link";
import { ArrowRight, ButtonLink, CheckIcon, Container, PageHero, SectionHeading } from "@/components/ui";
import { services } from "@/content/services";
import { featuredProduct } from "@/config/products";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { ContactCta } from "@/components/sections/ContactCta";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Services",
  description:
    "Website design and development, software solutions, online platforms, digital product creation and IT consulting from Largo Labs Ltd.",
  path: "/services",
});

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-ink-900">{title}</h3>
      <ul className="mt-3 space-y-2.5">
        {items.map((i) => (
          <li key={i} className="flex gap-3 text-sm leading-relaxed text-muted">
            <CheckIcon className="mt-1 h-3.5 w-3.5 shrink-0 text-signal-500" />
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="What Largo Labs can build, support and advise on"
        intro="We offer five services. Each is described below: what it involves, who it suits and the problems it can solve. If your need doesn't fit neatly into one, that's normal — tell us about it."
      >
        <nav aria-label="Services on this page" className="mt-8">
          <ul className="flex flex-wrap gap-2">
            {services.map((s) => (
              <li key={s.slug}>
                <a
                  href={`#${s.slug}`}
                  className="inline-flex rounded-full bg-white px-3.5 py-1.5 text-sm text-ink-900 ring-1 ring-inset ring-line transition-colors hover:ring-ink-300"
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      <div className="py-12 sm:py-16">
        <Container>
          {services.map((s) => (
            <section
              key={s.slug}
              id={s.slug}
              aria-labelledby={`${s.slug}-title`}
              className="grid gap-10 border-b border-line py-14 last:border-b-0 lg:grid-cols-[1fr_1.6fr] lg:gap-16"
            >
              <div>
                <span className="font-mono text-sm text-signal-700">{s.index}</span>
                <h2 id={`${s.slug}-title`} className="mt-3 text-balance text-2xl font-semibold tracking-[-0.03em] text-ink-900 sm:text-3xl">
                  {s.title}
                </h2>
                <p className="mt-4 leading-relaxed text-muted">{s.intro}</p>
                {s.slug === "platforms" && (
                  <p className="mt-4 rounded-xl border border-line bg-paper p-4 text-sm leading-relaxed text-muted">
                    <span className="font-medium text-ink-900">Example: </span>
                    our own product,{" "}
                    <Link href={`/products#${featuredProduct.slug}`} className="text-ink-900 underline underline-offset-4">
                      {featuredProduct.name}
                    </Link>
                    , is an online platform connecting event organisers with
                    attendees through event pages, ticketing and follow-ups.
                  </p>
                )}
                <ButtonLink
                  href={`/contact?enquiry=${encodeURIComponent(s.enquiryLabel)}`}
                  className="mt-7"
                >
                  {s.cta} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </ButtonLink>
              </div>
              <div className="grid gap-8 rounded-[var(--radius-card)] border border-line bg-white p-6 sm:grid-cols-2 sm:p-8">
                <div className="sm:col-span-2">
                  <List title="What it involves" items={s.involves} />
                </div>
                <List title="Suitable for" items={s.suitableFor} />
                <List title="Problems it can solve" items={s.solves} />
              </div>
            </section>
          ))}
        </Container>
      </div>

      <section className="border-t border-line bg-paper py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="How we work"
            title="The same five stages, whatever the size of the project"
            intro="Scope, cost and timing depend on what you need, so we agree them with you after the first conversation rather than quoting fixed packages."
          />
          <div className="mt-12">
            <ProcessSteps />
          </div>
        </Container>
      </section>

      <ContactCta title="Tell us what you're working on" />
    </>
  );
}
