import { ArrowRight, ButtonLink, Container } from "@/components/ui";

export function ContactCta({
  title = "Have a project or a problem worth solving?",
  body = "Tell us what you need — a new website, a software tool, a platform or some advice before you commit. We'll reply by email to talk it through.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-[1.5rem] bg-ink-900 px-6 py-14 sm:px-12 sm:py-16">
          <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]" aria-hidden="true" />
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-balance text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
                {title}
              </h2>
              <p className="mt-4 text-pretty leading-relaxed text-ink-300">{body}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/contact" variant="signal">
                Start an enquiry
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </ButtonLink>
              <ButtonLink href="/services" variant="ghost-dark">
                See our services
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
