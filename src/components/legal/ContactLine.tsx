import Link from "next/link";
import { site } from "@/config/site";

/** How to reach the company about legal/privacy matters — uses only verified channels. */
export function LegalContactLine({ enquiryType }: { enquiryType: string }) {
  const formHref = `/contact?enquiry=${encodeURIComponent(enquiryType)}`;
  return (
    <>
      {site.email ? (
        <>
          email us at <a href={`mailto:${site.email}`}>{site.email}</a> or use our{" "}
          <Link href={formHref}>contact form</Link>
        </>
      ) : (
        <>
          use our <Link href={formHref}>contact form</Link> and choose &ldquo;{enquiryType}&rdquo; as
          the enquiry type
        </>
      )}
    </>
  );
}
