/**
 * Largo Labs mark: a broad "L" — a short upright and a long base line, for the
 * steady, long-horizon way we build — with a signal square marking the "lab".
 */
export function LogoMark({
  className = "h-8 w-8",
  inverted = false,
}: {
  className?: string;
  inverted?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <rect width="32" height="32" rx="8" fill={inverted ? "#ffffff" : "#0a1323"} />
      <path
        d="M10.5 8.5V22.5H24"
        fill="none"
        stroke={inverted ? "#0a1323" : "#ffffff"}
        strokeWidth="3.2"
        strokeLinecap="square"
      />
      <rect x="18.5" y="8.5" width="5.5" height="5.5" rx="1" fill="#2fd0bf" />
    </svg>
  );
}

export function Logo({
  inverted = false,
  className = "",
}: {
  inverted?: boolean;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark inverted={inverted} />
      <span
        className={`text-[1.06rem] font-semibold tracking-[-0.02em] ${
          inverted ? "text-white" : "text-ink-900"
        }`}
      >
        Largo<span className={inverted ? "text-ink-300" : "text-muted"}> Labs</span>
      </span>
    </span>
  );
}
