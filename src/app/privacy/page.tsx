import Link from "next/link";
import { LegalPage, type LegalSection } from "@/components/legal/LegalPage";
import { LegalContactLine } from "@/components/legal/ContactLine";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How Largo Labs Ltd collects, uses and protects personal information submitted through this website, and your rights under Nigerian data protection law.",
  path: "/privacy",
});

const sections: LegalSection[] = [
  {
    id: "who-we-are",
    title: "Who we are",
    content: (
      <>
        <p>
          This website is operated by <strong>{site.legalName}</strong>, a company registered in{" "}
          {site.country} (&ldquo;Largo Labs&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;). We are the
          data controller for personal information collected through this website.
        </p>
        <p>
          This policy covers this corporate website only. Our products, such as Wetin Dey, have
          their own privacy policies, which apply when you use those products.
        </p>
      </>
    ),
  },
  {
    id: "information-we-collect",
    title: "Information we collect",
    content: (
      <>
        <h3>Information you give us</h3>
        <p>When you send an enquiry through our contact form, we collect:</p>
        <ul>
          <li>your name;</li>
          <li>your email address;</li>
          <li>the type of enquiry you select; and</li>
          <li>the content of your message, including anything you choose to include in it.</li>
        </ul>
        <p>
          If you contact us by other means, such as email, we collect the information you include
          in that communication.
        </p>
        <h3>Information collected automatically</h3>
        <p>
          Like most websites, our hosting provider automatically processes basic technical
          information when you visit, such as your IP address, browser type, the pages requested
          and the time of the request. This is used to deliver the website, keep it secure and
          diagnose problems.
        </p>
        <p>
          This website does not use advertising cookies, analytics cookies or tracking pixels. If
          we introduce analytics in future, we will update this policy first.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use-it",
    title: "How we use your information",
    content: (
      <>
        <p>We use the information described above to:</p>
        <ul>
          <li>read and reply to your enquiry;</li>
          <li>discuss and, where agreed, prepare for work you have asked us about;</li>
          <li>keep a record of our communication with you;</li>
          <li>protect the website and contact form from spam and misuse; and</li>
          <li>meet our legal obligations.</li>
        </ul>
        <p>
          We rely on the following lawful bases under the Nigeria Data Protection Act 2023: your
          consent when you choose to send us a message; taking steps at your request before
          entering into a contract; our legitimate interest in running and securing our website
          and responding to business enquiries; and compliance with legal obligations.
        </p>
        <p>We do not sell your personal information, and we do not use it for automated decision-making.</p>
      </>
    ),
  },
  {
    id: "service-providers",
    title: "Service providers",
    content: (
      <>
        <p>We use a small number of trusted service providers to run this website:</p>
        <ul>
          <li>
            <strong>Formspree</strong> receives contact form submissions and forwards them to our
            inbox. Formspree is based in the United States, so your enquiry is processed outside
            Nigeria.
          </li>
          <li>
            <strong>Our website hosting provider</strong> serves the website and processes the
            technical information described above.
          </li>
          <li>
            <strong>Our email provider</strong> stores enquiries we receive and our replies.
          </li>
        </ul>
        <p>
          These providers process information on our behalf and only as needed to provide their
          services. Where information is transferred outside Nigeria, we rely on the transfer
          grounds permitted by the Nigeria Data Protection Act 2023, including the safeguards
          our providers commit to in their terms.
        </p>
        <p>
          We may also disclose information where required by law, regulation or a valid request
          from a public authority.
        </p>
      </>
    ),
  },
  {
    id: "retention",
    title: "How long we keep information",
    content: (
      <>
        <p>
          We keep enquiry messages for up to {site.legal.enquiryRetention}, unless the enquiry
          leads to a working relationship, in which case relevant records are kept for as long as
          needed for that relationship and our legal, tax and accounting obligations.
        </p>
        <p>
          You can ask us to delete your enquiry sooner — see &ldquo;Your rights&rdquo; below.
        </p>
      </>
    ),
  },
  {
    id: "security",
    title: "How we protect information",
    content: (
      <>
        <p>
          The website is served over an encrypted (HTTPS) connection. Contact form submissions
          are checked on our server before being passed to Formspree, and the credentials used to
          connect to our service providers are kept on the server, not in the website code your
          browser receives. We limit access to enquiries to the people at Largo Labs who need it
          to respond.
        </p>
        <p>
          No method of transmission or storage is completely secure, so we cannot guarantee
          absolute security. Please do not send passwords, bank details or identity documents
          through the contact form.
        </p>
      </>
    ),
  },
  {
    id: "your-rights",
    title: "Your rights",
    content: (
      <>
        <p>Under the Nigeria Data Protection Act 2023, you have the right to:</p>
        <ul>
          <li>be informed about how your personal data is used;</li>
          <li>access a copy of the personal data we hold about you;</li>
          <li>ask us to correct inaccurate or incomplete data;</li>
          <li>ask us to delete your data;</li>
          <li>ask us to restrict how we use your data;</li>
          <li>object to processing based on our legitimate interests;</li>
          <li>receive your data in a commonly used format (data portability); and</li>
          <li>withdraw your consent at any time, without affecting earlier processing.</li>
        </ul>
        <p>
          To use any of these rights, <LegalContactLine enquiryType="Privacy or data request" />.
          We may need to confirm your identity before acting on a request. We will respond within
          the time required by law.
        </p>
        <p>
          If you are not satisfied with how we have handled your personal data, you may complain
          to the Nigeria Data Protection Commission (NDPC) at{" "}
          <a href="https://ndpc.gov.ng" target="_blank" rel="noopener noreferrer">
            ndpc.gov.ng
          </a>
          .
        </p>
      </>
    ),
  },
  {
    id: "children",
    title: "Children",
    content: (
      <p>
        This website is intended for businesses and adults. We do not knowingly collect personal
        information from children through it. If you believe a child has sent us personal
        information, please contact us and we will delete it.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    content: (
      <p>
        We may update this policy when our website or our data practices change. The date at the
        top of this page shows when it was last updated. Significant changes will be made clear on
        this page.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact us about privacy",
    content: (
      <p>
        For any privacy question or request, <LegalContactLine enquiryType="Privacy or data request" />.
        You can also read our <Link href="/terms">Terms of Use</Link>.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      intro={
        <p>
          This policy explains what personal information {site.legalName} collects through this
          website, why we collect it, how we look after it and the choices you have. We have kept
          it short because this website collects very little.
        </p>
      }
      sections={sections}
    />
  );
}
