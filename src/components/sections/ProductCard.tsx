import type { Product } from "@/config/products";
import { site } from "@/config/site";
import { ButtonLink, CheckIcon, ExternalIcon } from "@/components/ui";
import { ProductVisual } from "@/components/sections/ProductVisual";

/** Full product entry used on the Products page. Reusable for every product. */
export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  return (
    <article
      id={product.slug}
      aria-labelledby={`${product.slug}-title`}
      className="grid gap-10 rounded-[1.25rem] border border-line bg-white p-6 sm:p-10 lg:grid-cols-2 lg:gap-14"
    >
      <div className="order-2 lg:order-1">
        <p className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-signal-700">
          {product.category}
        </p>
        <h2 id={`${product.slug}-title`} className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-ink-900">
          {product.name}
        </h2>
        <p className="mt-4 leading-relaxed text-muted">{product.description}</p>

        <h3 className="mt-8 text-sm font-semibold text-ink-900">Primary use cases</h3>
        <ul className="mt-3 space-y-2.5">
          {product.useCases.map((u) => (
            <li key={u} className="flex gap-3 text-sm text-muted">
              <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-signal-500" />
              {u}
            </li>
          ))}
        </ul>

        <h3 className="mt-8 text-sm font-semibold text-ink-900">Who it&apos;s for</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{product.audience}</p>

        <dl className="mt-8 grid grid-cols-1 gap-4 border-t border-line pt-6 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-subtle">Developed by</dt>
            <dd className="mt-1 font-medium text-ink-900">{site.legalName}</dd>
          </div>
          <div>
            <dt className="text-subtle">Category</dt>
            <dd className="mt-1 font-medium text-ink-900">{product.category}</dd>
          </div>
        </dl>

        {product.url && (
          <div className="mt-8">
            <ButtonLink href={product.url} external variant="primary">
              Visit {product.name}
              <ExternalIcon />
              <span className="sr-only">(opens in a new tab)</span>
            </ButtonLink>
          </div>
        )}
      </div>
      <div className="order-1 lg:order-2">
        <ProductVisual product={product} priority={priority} />
      </div>
    </article>
  );
}
