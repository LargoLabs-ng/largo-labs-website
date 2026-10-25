/**
 * SERVICES
 * These five services correspond to the activities in the company's CAC
 * registration. Edit wording here — the homepage, Services page, footer and
 * contact form's enquiry list all read from this file.
 */

export type Service = {
  slug: string;
  /** Number shown beside the service (01, 02…). */
  index: string;
  title: string;
  /** One line, used on cards. */
  short: string;
  /** Short paragraph for the Services page. */
  intro: string;
  involves: string[];
  suitableFor: string[];
  solves: string[];
  cta: string;
  /** Option label used in the contact form's enquiry type. */
  enquiryLabel: string;
};

export const services: Service[] = [
  {
    slug: "websites",
    index: "01",
    title: "Website Design and Development",
    short:
      "Clear, fast, mobile-friendly websites that explain what you do and make it easy for people to get in touch.",
    intro:
      "Your website is often the first thing a customer, partner or reviewer checks. We design and build websites that load quickly, read clearly on a phone, and give visitors a straightforward next step.",
    involves: [
      "Corporate and business websites",
      "Landing pages for a product, campaign or event",
      "Responsive design that works on phones, tablets and desktops",
      "Redeveloping or maintaining an existing website",
      "Improving speed, structure and usability",
    ],
    suitableFor: [
      "Businesses that need an official online presence",
      "Organisations whose current site is outdated or hard to update",
      "Individuals and founders launching something new",
    ],
    solves: [
      "No website, or one that doesn't reflect the business today",
      "Pages that are slow or difficult to use on mobile data",
      "Visitors who can't quickly tell what you offer or how to contact you",
    ],
    cta: "Discuss a website project",
    enquiryLabel: "Website design and development",
  },
  {
    slug: "software",
    index: "02",
    title: "Software Solutions",
    short:
      "Software tools and web applications shaped around how your business actually works.",
    intro:
      "Many teams run important work on spreadsheets, chat threads and manual steps. We can build software that fits your process — so information sits in one place and routine work takes less effort.",
    involves: [
      "Internal tools for staff and teams",
      "Workflow systems that track tasks, requests or approvals",
      "Dashboards that bring key information together",
      "Web-based applications for customers or members",
      "Connecting existing tools so data moves between them",
    ],
    suitableFor: [
      "Businesses that have outgrown spreadsheets",
      "Teams repeating the same manual tasks every week",
      "Organisations that need a tool no off-the-shelf product provides",
    ],
    solves: [
      "Information spread across too many files and apps",
      "Errors and delays caused by manual processes",
      "Limited visibility into what is happening across the business",
    ],
    cta: "Talk about a software need",
    enquiryLabel: "Software solution",
  },
  {
    slug: "platforms",
    index: "03",
    title: "Online Platforms",
    short:
      "Web platforms that connect people, organise processes and deliver services online.",
    intro:
      "A platform brings different groups of users together around a shared service — buyers and sellers, organisers and attendees, members and administrators. We design, build and support platforms like this, including the accounts, payments and admin tools behind them.",
    involves: [
      "Planning user roles, journeys and core features",
      "Building user accounts, listings, bookings or transactions",
      "Admin tools for managing users, content and activity",
      "Integrating payments, email and other services",
      "Ongoing support, monitoring and improvements",
    ],
    suitableFor: [
      "Organisations moving a service online",
      "Founders building a marketplace or community product",
      "Businesses that need to serve many users at once",
    ],
    solves: [
      "Services that only work in person or through manual coordination",
      "No single place for users to sign up, transact and get updates",
      "Difficulty managing growing numbers of users and requests",
    ],
    cta: "Plan an online platform",
    enquiryLabel: "Online platform",
  },
  {
    slug: "digital-products",
    index: "04",
    title: "Digital Product Creation",
    short:
      "Taking a product idea from concept to a working, tested product — and improving it after launch.",
    intro:
      "We create digital products of our own, and we can help you build yours. We work through the stages a product needs: shaping the idea, deciding what the first version must do, building it, testing it with real users and improving it from there.",
    involves: [
      "Clarifying the problem, the users and the core value",
      "Defining a focused first version",
      "Interface design and development",
      "Testing with real users before and after launch",
      "Planning and building improvements over time",
    ],
    suitableFor: [
      "Founders with an idea they want to turn into a product",
      "Businesses creating a new digital offering",
      "Teams that need a working version to test with users",
    ],
    solves: [
      "An idea that hasn't yet been shaped into something buildable",
      "Uncertainty about what to build first",
      "Products launched without a plan for learning and improvement",
    ],
    cta: "Start a product conversation",
    enquiryLabel: "Digital product creation",
  },
  {
    slug: "consulting",
    index: "05",
    title: "IT Consulting",
    short:
      "Practical advice on what technology you need, what to avoid and how to plan a digital project.",
    intro:
      "Not every problem needs new software. We help you understand your options before you commit time and money — whether you're choosing tools, planning a build, or trying to get more from systems you already have.",
    involves: [
      "Assessing your current tools, systems and needs",
      "Comparing options: build, buy or adapt",
      "Scoping and planning digital projects",
      "Reviewing existing websites and systems for improvements",
      "Advising on setup, security basics and maintenance",
    ],
    suitableFor: [
      "Business owners making a technology decision",
      "Organisations planning their first digital project",
      "Teams unsure why an existing system isn't working well",
    ],
    solves: [
      "Paying for tools or features you don't need",
      "Starting projects without a clear scope",
      "Systems that are hard to maintain or don't fit together",
    ],
    cta: "Request a consultation",
    enquiryLabel: "IT consulting",
  },
];

/** Enquiry types for the contact form (service options + general options). */
export const enquiryTypes = [
  ...services.map((s) => s.enquiryLabel),
  "Wetin Dey",
  "Partnership",
  "Privacy or data request",
  "Other",
] as const;

export const processSteps = [
  {
    title: "Understand the problem",
    body: "We start by learning what you're trying to achieve, who it's for and what is getting in the way. This sometimes shows that a smaller solution will do.",
  },
  {
    title: "Define the solution",
    body: "We agree what will be built, what the first version must include and how we'll know it works — in plain language, before development starts.",
  },
  {
    title: "Design and develop",
    body: "We design the experience and build it in stages, sharing progress so you can give feedback while changes are still easy to make.",
  },
  {
    title: "Test and refine",
    body: "We test on real devices and network conditions, fix what we find and adjust based on how people actually use it.",
  },
  {
    title: "Support and improve",
    body: "After launch we can maintain, support and keep improving what we've built, so it stays useful as your needs change.",
  },
];
