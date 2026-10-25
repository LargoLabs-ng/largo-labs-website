import { processSteps } from "@/content/services";

export function ProcessSteps() {
  return (
    <ol className="grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
      {processSteps.map((step, i) => (
        <li key={step.title} className="flex flex-col bg-white p-6">
          <span className="font-mono text-xs text-signal-700">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-4 text-base font-semibold tracking-tight text-ink-900">{step.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}
