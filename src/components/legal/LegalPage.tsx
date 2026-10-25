import type { ReactNode } from "react";
import { Container, Eyebrow } from "@/components/ui";
import { site } from "@/config/site";

export type LegalSection = { id: string; title: string; content: ReactNode };

export function LegalPage({
  eyebrow,
  title,
  intro,
  sections,
}: {
  eyebrow: string;
  title: string;
  intro: ReactNode;
  sections: LegalSection[];
}) {
  return (
    <>
      <section className="border-b border-line bg-paper">
        <Container className="py-14 sm:py-20">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.035em] text-ink-900 sm:text-5xl">{title}</h1>
          <p className="mt-4 text-sm text-muted">
            {site.legalName} · Last updated {site.legal.lastUpdated}
          </p>
        </Container>
      </section>
      <Container className="grid gap-12 py-14 sm:py-16 lg:grid-cols-[15rem_1fr] lg:gap-16">
        <nav aria-label="On this page" className="hidden lg:block">
          <div className="sticky top-24">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-subtle">On this page</p>
            <ol className="mt-4 space-y-2 border-l border-line text-sm">
              {sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="-ml-px block border-l border-transparent pl-4 text-muted hover:border-ink-900 hover:text-ink-900">
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>
        <article className="prose-legal max-w-3xl">
          <div className="text-lg">{intro}</div>
          {sections.map((s, i) => (
            <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`}>
              <h2 id={`${s.id}-h`}>
                <span className="mr-2 font-mono text-sm font-normal text-signal-700">{String(i + 1).padStart(2, "0")}</span>
                {s.title}
              </h2>
              {s.content}
            </section>
          ))}
        </article>
      </Container>
    </>
  );
}
