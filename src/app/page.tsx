import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ButtonLink, CheckIcon, Container, Eyebrow, ExternalIcon, SectionHeading } from "@/components/ui";
import { services } from "@/content/services";
import { featuredProduct, products } from "@/config/products";
import { site } from "@/config/site";
import { ProductVisual } from "@/components/sections/ProductVisual";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { ContactCta } from "@/components/sections/ContactCta";
import { productionUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: { absolute: `${site.shortName} — Software, platforms and websites | ${site.legalName}` },
  description:
    "Largo Labs Ltd is a Nigerian technology company building websites, software, online platforms and digital products, and offering IT consulting. Makers of Wetin Dey.",
  alternates: productionUrl ? { canonical: "/" } : undefined,
  openGraph: { url: "/" },
};

function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink-900 text-white">
      <div className="bg-grid absolute inset-0 [mask-image:linear-gradient(to_bottom,black_40%,transparent)]" aria-hidden="true" />
      <div
        className="absolute -right-40 top-10 h-[28rem] w-[28rem] rounded-full bg-signal-500/15 blur-3xl"
        aria-hidden="true"
      />
      <Container className="relative grid items-center gap-14 py-20 sm:py-28 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <div className="animate-rise">
          <Eyebrow dark>Largo Labs Ltd · Technology company · Nigeria</Eyebrow>
          <h1 className="mt-5 text-balance text-[2.6rem] font-semibold leading-[1.05] tracking-[-0.04em] sm:text-6xl">
            We build software that does real work.
          </h1>
          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-ink-300">
            Largo Labs designs and develops websites, software tools and online
            platforms for individuals, businesses and organisations — and builds
            digital products of our own, starting with{" "}
            <Link href="/products#wetin-dey" className="text-white underline decoration-signal-400 underline-offset-4">
              Wetin Dey
            </Link>
            .
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/services" variant="signal">
              Explore our services
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </ButtonLink>
            <ButtonLink href="/products" variant="ghost-dark">
              Discover our products
            </ButtonLink>
          </div>
        </div>

        {/* Capability index — a plain summary of what we do */}
        <div className="animate-rise [animation-delay:120ms]">
          <div className="rounded-[var(--radius-card)] border border-white/10 bg-ink-950/60 shadow-2xl shadow-black/30 backdrop-blur">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5">
              <span className="font-mono text-xs text-ink-400">largo-labs / what-we-do</span>
              <span className="flex gap-1.5" aria-hidden="true">
                <span className="h-2 w-2 rounded-full bg-white/15" />
                <span className="h-2 w-2 rounded-full bg-white/15" />
                <span className="h-2 w-2 rounded-full bg-signal-400" />
              </span>
            </div>
            <ul className="divide-y divide-white/5">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services#${s.slug}`}
                    className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-white/[0.03]"
                  >
                    <span className="font-mono text-xs text-signal-300">{s.index}</span>
                    <span className="flex-1 text-sm font-medium text-white">{s.title}</span>
                    <ArrowRight className="h-4 w-4 text-ink-600 transition-all group-hover:translate-x-0.5 group-hover:text-signal-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Intro() {
  const points = [
    {
      title: "We build for clients",
      body: "Websites, software and platforms designed around a specific business need, explained in plain language from the first conversation.",
    },
    {
      title: "We build our own products",
      body: "Largo Labs is also a product company. Building and running our own software keeps us close to what it takes to make something people use.",
    },
    {
      title: "We support what we build",
      body: "Launch is a milestone, not the finish line. We can manage, maintain and improve systems so they keep working as needs change.",
    },
  ];
  return (
    <section className="py-20 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
        <SectionHeading
          eyebrow="Who we are"
          title="A Nigerian technology company building practical digital solutions."
        />
        <div>
          <p className="text-lg leading-relaxed text-muted">
            {site.legalName} is a technology company registered in Nigeria. We
            create, manage and support digital systems — from a company
            website to a full online platform — for individuals, businesses
            and organisations in Nigeria and internationally. Our focus is simple: understand the problem properly, then
            build the right thing to solve it.
          </p>
          <dl className="mt-10 grid gap-8 sm:grid-cols-3">
            {points.map((p) => (
              <div key={p.title} className="border-t border-ink-900 pt-4">
                <dt className="font-semibold text-ink-900">{p.title}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted">{p.body}</dd>
              </div>
            ))}
          </dl>
          <Link
            href="/about"
            className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-ink-900 underline-offset-4 hover:underline"
          >
            More about Largo Labs <ArrowRight />
          </Link>
        </div>
      </Container>
    </section>
  );
}

function ServicesOverview() {
  return (
    <section className="border-y border-line bg-paper py-20 sm:py-28" aria-labelledby="services-heading">
      <Container>
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <Eyebrow>Services</Eyebrow>
            <h2 id="services-heading" className="mt-3 text-balance text-3xl font-semibold tracking-[-0.03em] text-ink-900 sm:text-4xl">
              What you can hire us to do
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              Five areas of work, each one aimed at a clear outcome for the people and businesses we work with.
            </p>
          </div>
          <ButtonLink href="/services" variant="secondary" className="self-start lg:self-auto">
            View all services <ArrowRight />
          </ButtonLink>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/services#${s.slug}`}
                className="group flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-ink-300 hover:shadow-lg hover:shadow-ink-900/5"
              >
                <span className="font-mono text-xs text-signal-700">{s.index}</span>
                <h3 className="mt-6 text-lg font-semibold tracking-tight text-ink-900">{s.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{s.short}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink-900">
                  Learn more
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </li>
          ))}
          <li className="sm:col-span-2 lg:col-span-1">
            <div className="flex h-full flex-col justify-between rounded-[var(--radius-card)] bg-ink-900 p-6 text-white">
              <div>
                <h3 className="text-lg font-semibold tracking-tight">Not sure which you need?</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-300">
                  Describe the problem instead. We&apos;ll suggest the simplest way to approach it.
                </p>
              </div>
              <Link href="/contact" className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-signal-300">
                Ask us <ArrowRight />
              </Link>
            </div>
          </li>
        </ul>
      </Container>
    </section>
  );
}

function FeaturedProduct() {
  const p = featuredProduct;
  return (
    <section className="py-20 sm:py-28" aria-labelledby="product-heading">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <Eyebrow>Our first product</Eyebrow>
          <h2 id="product-heading" className="mt-3 text-balance text-3xl font-semibold tracking-[-0.03em] text-ink-900 sm:text-4xl">
            {p.name}: {p.category.toLowerCase()}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">{p.summary}</p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {p.useCases.map((u) => (
              <li key={u} className="flex gap-3 text-sm text-ink-900">
                <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-signal-500" />
                {u}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-muted">
            {p.name} is developed and operated by {site.legalName}.
            {products.length === 1 && " It is the first of the products we plan to build."}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {p.url && (
              <ButtonLink href={p.url} external>
                Visit {p.name} <ExternalIcon />
                <span className="sr-only">(opens in a new tab)</span>
              </ButtonLink>
            )}
            <ButtonLink href={`/products#${p.slug}`} variant="secondary">
              Product details <ArrowRight />
            </ButtonLink>
          </div>
        </div>
        <ProductVisual product={p} />
      </Container>
    </section>
  );
}

function HowWeWork() {
  return (
    <section className="border-t border-line bg-paper py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="How we work"
          title="A clear process, scaled to the job"
          intro="Every project moves through the same five stages. A landing page might pass through them in days; a platform takes longer. The stages stay the same — the depth adapts to the size and complexity of the work."
        />
        <div className="mt-12">
          <ProcessSteps />
        </div>
      </Container>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <ServicesOverview />
      <FeaturedProduct />
      <HowWeWork />
      <ContactCta />
    </>
  );
}
