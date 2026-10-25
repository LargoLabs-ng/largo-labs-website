import { Container, PageHero } from "@/components/ui";
import { Suspense } from "react";
import { ContactForm, ContactFormWithParams } from "@/components/contact/ContactForm";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Contact Largo Labs Ltd to discuss a website, software, online platform, digital product or IT consulting project.",
  path: "/contact",
});

const tips = [
  "What you need help with, in your own words",
  "Who it's for — your customers, your team, or both",
  "Any existing website, app or system involved",
  "Timing you're working towards, if you have one",
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk about what you need"
        intro="Whether you have a clear brief or just a problem you want solved, send us a message. We'll read it properly and reply by email."
      />

      <section className="py-16 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <div className="relative rounded-[1.25rem] border border-line bg-white p-6 sm:p-10">
            <h2 className="mb-8 text-xl font-semibold tracking-tight text-ink-900">Send an enquiry</h2>
            <Suspense fallback={<ContactForm fallbackEmail={site.email} />}>
              <ContactFormWithParams fallbackEmail={site.email} />
            </Suspense>
          </div>

          <aside className="space-y-10">
            {(site.email || site.phone || site.address) && (
              <div>
                <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-signal-700">
                  Other ways to reach us
                </h2>
                <dl className="mt-4 space-y-4 text-sm">
                  {site.email && (
                    <div>
                      <dt className="text-subtle">Email</dt>
                      <dd className="mt-1">
                        <a href={`mailto:${site.email}`} className="font-medium text-ink-900 underline underline-offset-4">
                          {site.email}
                        </a>
                      </dd>
                    </div>
                  )}
                  {site.phone && (
                    <div>
                      <dt className="text-subtle">Phone</dt>
                      <dd className="mt-1">
                        <a href={`tel:${site.phone.replace(/\s+/g, "")}`} className="font-medium text-ink-900 underline underline-offset-4">
                          {site.phone}
                        </a>
                      </dd>
                    </div>
                  )}
                  {site.address && (
                    <div>
                      <dt className="text-subtle">Address</dt>
                      <dd className="mt-1 font-medium text-ink-900">{site.address}</dd>
                    </div>
                  )}
                </dl>
              </div>
            )}

            <div>
              <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-signal-700">
                Helpful to include
              </h2>
              <ul className="mt-4 space-y-3 text-sm text-muted">
                {tips.map((t) => (
                  <li key={t} className="flex gap-3">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink-400" aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-signal-700">
                What happens next
              </h2>
              <ol className="mt-4 space-y-3 text-sm text-muted">
                <li><span className="font-medium text-ink-900">1.</span> We read your message and reply by email.</li>
                <li><span className="font-medium text-ink-900">2.</span> If it&apos;s a project, we arrange a conversation to understand it properly.</li>
                <li><span className="font-medium text-ink-900">3.</span> We suggest an approach, with scope and cost agreed before any work begins.</li>
              </ol>
            </div>

            <p className="rounded-xl border border-line bg-paper p-4 text-xs leading-relaxed text-muted">
              Questions about buying or using tickets on Wetin Dey? Choose
              &ldquo;Wetin Dey&rdquo; as the enquiry type so your message reaches the right place.
            </p>
          </aside>
        </Container>
      </section>
    </>
  );
}
