import Link from "next/link";
import { ArrowRight, Container, Eyebrow, PageHero, SectionHeading } from "@/components/ui";
import { site } from "@/config/site";
import { products } from "@/config/products";
import { services } from "@/content/services";
import { ContactCta } from "@/components/sections/ContactCta";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "About us",
  description:
    "Learn about Largo Labs Ltd, a Nigerian technology company that builds websites, software, online platforms and digital products, including Wetin Dey.",
  path: "/about",
});

const principles = [
  {
    title: "Start with the problem",
    body: "Technology is a means, not the goal. We spend time understanding what needs to change before deciding what to build.",
  },
  {
    title: "Build only what's needed",
    body: "A focused solution that works is better than a large one that doesn't. We favour simple, maintainable systems.",
  },
  {
    title: "Design for real conditions",
    body: "People use what we build on phones, on mobile data and between other tasks. We design and test with that in mind.",
  },
  {
    title: "Stay accountable",
    body: "We explain decisions plainly, share progress openly and stand behind the systems we build and support.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Largo Labs"
        title="We build and support digital systems that solve practical problems."
        intro={`${site.legalName} is a technology company registered in Nigeria. We provide digital and technology-driven services to individuals, businesses and organisations, and we develop digital products of our own.`}
      />

      {/* Who we are */}
      <section className="py-20 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <SectionHeading eyebrow="Who we are" title="Technology work, done carefully" />
          <div className="space-y-5 text-lg leading-relaxed text-muted">
            <p>
              Largo Labs works across the full life of a digital system: deciding
              what to build, designing and developing it, launching it and
              supporting it afterwards. That includes websites, software tools,
              online platforms and complete digital products.
            </p>
            <p>
              We work in two ways. We take on projects for clients who need
              something built or improved, and we create products that we own
              and run ourselves. Each informs the other: running our own
              products keeps us honest about what it takes to build software
              that people actually use.
            </p>
          </div>
        </Container>
      </section>

      {/* Focus */}
      <section className="border-y border-line bg-paper py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Our focus"
            title="Digital and technology-driven services"
            intro="Our work falls into five areas, matching the activities the company is registered to carry out."
          />
          <ul className="mt-10 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
            {services.map((s) => (
              <li key={s.slug} className="bg-white">
                <Link href={`/services#${s.slug}`} className="group flex h-full flex-col p-6 hover:bg-paper">
                  <span className="font-mono text-xs text-signal-700">{s.index}</span>
                  <span className="mt-4 font-semibold text-ink-900">{s.title}</span>
                  <ArrowRight className="mt-4 h-4 w-4 text-ink-400 transition-transform group-hover:translate-x-0.5 group-hover:text-ink-900" />
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Approach */}
      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Our approach"
            title="How we think about solving problems"
          />
          <dl className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((p) => (
              <div key={p.title} className="border-t-2 border-ink-900 pt-5">
                <dt className="font-semibold text-ink-900">{p.title}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted">{p.body}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Structure */}
      <section className="bg-ink-900 py-20 text-white sm:py-24" aria-labelledby="structure-heading">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div>
            <Eyebrow dark>Company and products</Eyebrow>
            <h2 id="structure-heading" className="mt-3 text-balance text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
              One company, a growing family of products
            </h2>
            <p className="mt-4 leading-relaxed text-ink-300">
              {site.legalName} is the parent company. Products we create are
              developed and operated under Largo Labs, each with its own name
              and website. {products[0].name} is the first. As new products
              are launched, they will be listed on our{" "}
              <Link href="/products" className="text-white underline decoration-signal-400 underline-offset-4">
                products page
              </Link>
              .
            </p>
          </div>

          {/* Structure diagram */}
          <div className="rounded-[var(--radius-card)] border border-white/10 bg-ink-950/50 p-6 sm:p-8" role="img" aria-label={`Structure: ${site.legalName} is the parent company. It provides client services and develops products, starting with ${products.map((p) => p.name).join(", ")}.`}>
            <div className="rounded-xl border border-signal-400/40 bg-signal-400/10 px-5 py-4 text-center">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-signal-300">Parent company</p>
              <p className="mt-1 font-semibold">{site.legalName}</p>
            </div>
            <div className="mx-auto h-6 w-px bg-white/20" aria-hidden="true" />
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-white/10 p-4">
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-ink-400">Client services</p>
                <ul className="mt-3 space-y-1.5 text-sm text-ink-300">
                  {services.map((s) => (
                    <li key={s.slug}>{s.title.replace(" and Development", "").replace("Digital ", "")}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-white/10 p-4">
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-ink-400">Products</p>
                <ul className="mt-3 space-y-2 text-sm">
                  {products.map((p) => (
                    <li key={p.slug} className="flex items-center gap-2 font-medium text-white">
                      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: p.brand.accent }} aria-hidden="true" />
                      {p.name}
                    </li>
                  ))}
                  <li className="rounded-md border border-dashed border-white/15 px-2 py-1.5 text-xs text-ink-400">
                    Future products
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Mission & vision */}
      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading eyebrow="Mission and vision" title="What we're working towards" />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="rounded-[var(--radius-card)] border border-line p-8">
              <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-signal-700">Our mission</h3>
              <p className="mt-4 text-xl font-medium leading-snug tracking-tight text-ink-900 sm:text-2xl">
                To build and support reliable digital solutions that help
                people and organisations get real work done.
              </p>
            </div>
            <div className="rounded-[var(--radius-card)] border border-line p-8">
              <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-signal-700">Our vision</h3>
              <p className="mt-4 text-xl font-medium leading-snug tracking-tight text-ink-900 sm:text-2xl">
                A portfolio of useful products and long-term client
                relationships, built from Nigeria for users everywhere.
              </p>
            </div>
          </div>
          <p className="mt-4 text-xs text-subtle">
            Our mission and vision describe the company&apos;s aims and direction.
          </p>
        </Container>
      </section>

      {/* Company information */}
      <section className="border-t border-line bg-paper py-20 sm:py-24" aria-labelledby="company-info">
        <Container>
          <h2 id="company-info" className="text-2xl font-semibold tracking-tight text-ink-900">
            Company information
          </h2>
          <dl className="mt-8 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line text-sm md:grid-cols-[14rem_1fr]">
            <dt className="bg-white px-5 pt-5 font-medium text-subtle md:py-5">Legal name</dt>
            <dd className="bg-white px-5 pb-5 font-semibold text-ink-900 md:py-5">{site.legalName}</dd>
            <dt className="bg-white px-5 pt-5 font-medium text-subtle md:py-5">Country of registration</dt>
            <dd className="bg-white px-5 pb-5 text-ink-900 md:py-5">{site.country} (Corporate Affairs Commission)</dd>
            {site.rcNumber && (
              <>
                <dt className="bg-white px-5 pt-5 font-medium text-subtle md:py-5">RC number</dt>
                <dd className="bg-white px-5 pb-5 text-ink-900 md:py-5">{site.rcNumber}</dd>
              </>
            )}
            <dt className="bg-white px-5 pt-5 font-medium text-subtle md:py-5">Registered business activities</dt>
            <dd className="bg-white px-5 pb-5 leading-relaxed text-muted md:py-5">{site.registeredActivities}</dd>
            <dt className="bg-white px-5 pt-5 font-medium text-subtle md:py-5">Products</dt>
            <dd className="bg-white px-5 pb-5 text-ink-900 md:py-5">
              {products.map((p, i) => (
                <span key={p.slug}>
                  {i > 0 && ", "}
                  <Link href={`/products#${p.slug}`} className="underline underline-offset-4">
                    {p.name}
                  </Link>{" "}
                  ({p.category.toLowerCase()})
                </span>
              ))}
            </dd>
            {site.address && (
              <>
                <dt className="bg-white px-5 pt-5 font-medium text-subtle md:py-5">Address</dt>
                <dd className="bg-white px-5 pb-5 text-ink-900 md:py-5">{site.address}</dd>
              </>
            )}
            <dt className="bg-white px-5 pt-5 font-medium text-subtle md:py-5">Contact</dt>
            <dd className="bg-white px-5 pb-5 text-ink-900 md:py-5">
              {site.email && (
                <>
                  <a href={`mailto:${site.email}`} className="underline underline-offset-4">{site.email}</a>
                  {" · "}
                </>
              )}
              <Link href="/contact" className="underline underline-offset-4">Contact form</Link>
            </dd>
          </dl>
        </Container>
      </section>

      <ContactCta />
    </>
  );
}
