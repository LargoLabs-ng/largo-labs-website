import Image from "next/image";
import type { Product } from "@/config/products";

/**
 * Shows the product screenshot if one is configured; otherwise a branded
 * panel built from the product's own colours and feature list (clearly a
 * graphic, not a mock screenshot).
 */
export function ProductVisual({ product, priority = false }: { product: Product; priority?: boolean }) {
  if (product.image) {
    return (
      <div className="overflow-hidden rounded-[var(--radius-card)] ring-1 ring-line">
        <Image
          src={product.image.src}
          alt={product.image.alt}
          width={product.image.width}
          height={product.image.height}
          sizes="(min-width: 1024px) 560px, 100vw"
          priority={priority}
          className="h-auto w-full"
        />
      </div>
    );
  }

  const { brand } = product;
  return (
    <div
      className="relative overflow-hidden rounded-[var(--radius-card)] p-6 sm:p-8"
      style={{ backgroundColor: brand.dark }}
      role="img"
      aria-label={`${product.name} — ${product.category}`}
    >
      <div
        className="absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-40 blur-3xl"
        style={{ backgroundColor: brand.primary }}
        aria-hidden="true"
      />
      <div className="relative">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="whitespace-nowrap text-xl font-semibold tracking-tight" style={{ color: brand.light }}>
            {product.name}
          </span>
          <span
            className="rounded-full px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-[0.14em]"
            style={{ backgroundColor: `${brand.primary}33`, color: brand.light }}
          >
            {product.category}
          </span>
        </div>
        {product.tagline && (
          <p className="mt-2 text-sm" style={{ color: `${brand.light}b3` }}>
            {product.tagline}
          </p>
        )}

        {/* Ticket-shaped feature summary */}
        <div className="mt-8 flex overflow-hidden rounded-xl" style={{ backgroundColor: brand.light }}>
          <ul className="flex-1 divide-y" style={{ borderColor: `${brand.dark}14` }}>
            {product.useCases.map((u, i) => (
              <li key={u} className="flex items-center gap-3 px-4 py-3 text-sm" style={{ color: brand.dark, borderColor: `${brand.dark}14` }}>
                <span
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md font-mono text-[0.65rem] font-semibold text-white"
                  style={{ backgroundColor: brand.primary }}
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                {u}
              </li>
            ))}
          </ul>
          <div
            className="relative w-14 shrink-0 border-l-2 border-dashed sm:w-20"
            style={{ borderColor: `${brand.dark}26`, backgroundColor: brand.primary }}
            aria-hidden="true"
          >
            <span className="absolute -left-2.5 -top-2.5 h-5 w-5 rounded-full" style={{ backgroundColor: brand.dark }} />
            <span className="absolute -bottom-2.5 -left-2.5 h-5 w-5 rounded-full" style={{ backgroundColor: brand.dark }} />
            <span
              className="absolute inset-0 flex items-center justify-center font-mono text-[0.6rem] uppercase tracking-[0.3em] text-white [writing-mode:vertical-rl]"
            >
              Ticket
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
