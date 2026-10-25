import Link from "next/link";
import { LegalPage, type LegalSection } from "@/components/legal/LegalPage";
import { LegalContactLine } from "@/components/legal/ContactLine";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Terms of Use",
  description: "The terms that apply to your use of the Largo Labs Ltd corporate website.",
  path: "/terms",
});

const sections: LegalSection[] = [
  {
    id: "about",
    title: "About these terms",
    content: (
      <>
        <p>
          These terms apply to your use of this website, which is operated by{" "}
          <strong>{site.legalName}</strong>, a company registered in {site.country}{" "}
          (&ldquo;Largo Labs&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;). By using the website, you
          agree to them. If you do not agree, please do not use the website.
        </p>
        <p>
          <strong>These terms cover this corporate website only.</strong> They do not govern the
          purchase or use of tickets, or any other use of Wetin Dey or any other Largo Labs
          product. Each product has its own terms, which apply when you use it. Services we
          provide to clients are governed by a separate written agreement.
        </p>
      </>
    ),
  },
  {
    id: "acceptable-use",
    title: "Acceptable use",
    content: (
      <>
        <p>You may use this website for lawful purposes only. You must not:</p>
        <ul>
          <li>use the website in a way that breaks any applicable law or regulation;</li>
          <li>attempt to gain unauthorised access to the website, its server or any connected system;</li>
          <li>introduce viruses, malicious code or anything else harmful;</li>
          <li>interfere with or disrupt the website, including through excessive automated requests;</li>
          <li>use the contact form to send spam, unsolicited advertising or abusive content; or</li>
          <li>impersonate another person or misrepresent your connection with any person or organisation.</li>
        </ul>
      </>
    ),
  },
  {
    id: "intellectual-property",
    title: "Intellectual property",
    content: (
      <>
        <p>
          The content of this website — including its text, design, graphics, the Largo Labs name
          and logo, and product names and logos — belongs to Largo Labs or is used with
          permission, and is protected by intellectual property law.
        </p>
        <p>
          You may view and print pages for your own reference, and share links to the website.
          You may not copy, republish or use our content, names or logos for commercial purposes
          without our written permission.
        </p>
      </>
    ),
  },
  {
    id: "information",
    title: "Information on this website",
    content: (
      <>
        <p>
          We aim to keep the information on this website accurate and up to date, but it is
          provided for general information only. It is not professional advice and does not form
          an offer or a contract. Descriptions of our services explain the kinds of work we can
          do; the details of any project — including scope, cost and timing — are agreed
          separately in writing.
        </p>
        <p>
          We may change, suspend or withdraw any part of the website at any time. We do not
          guarantee that the website will always be available or free from errors.
        </p>
      </>
    ),
  },
  {
    id: "external-links",
    title: "External links",
    content: (
      <p>
        This website links to other websites, including the websites of our own products and of
        third parties such as regulators. Product websites are governed by their own terms and
        policies. We are not responsible for the content, availability or practices of
        third-party websites, and a link does not mean we endorse them.
      </p>
    ),
  },
  {
    id: "liability",
    title: "Limitation of liability",
    content: (
      <>
        <p>
          To the fullest extent permitted by applicable law, Largo Labs is not liable for any
          loss or damage arising from your use of, or inability to use, this website or from
          reliance on its content. This includes indirect or consequential loss, and loss of
          profit, data, business or opportunity.
        </p>
        <p>
          Nothing in these terms excludes or limits any liability that cannot be excluded or
          limited under the laws of the Federal Republic of Nigeria.
        </p>
      </>
    ),
  },
  {
    id: "privacy",
    title: "Privacy",
    content: (
      <p>
        Our <Link href="/privacy">Privacy Policy</Link> explains how we handle personal information
        submitted through this website.
      </p>
    ),
  },
  {
    id: "governing-law",
    title: "Governing law",
    content: (
      <p>
        These terms are governed by the laws of the Federal Republic of Nigeria. Any dispute
        relating to them is subject to the jurisdiction of the Nigerian courts.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to these terms",
    content: (
      <p>
        We may update these terms from time to time. The date at the top of this page shows when
        they were last updated. Continuing to use the website after a change means you accept the
        updated terms.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    content: (
      <p>
        For questions about these terms, <LegalContactLine enquiryType="Other" />.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of Use"
      intro={
        <p>
          Please read these terms before using the {site.legalName} website. They explain what you
          can expect from us and what we expect from you.
        </p>
      }
      sections={sections}
    />
  );
}
