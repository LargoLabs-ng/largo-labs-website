import { cacheLife } from "next/cache";

/** Current year, cached so the page can still be prerendered statically. */
export async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}
