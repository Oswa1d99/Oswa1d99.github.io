import { deployment } from "../../deployment.config.mjs";

export const socialLinks = [
  { label: "GitHub", href: "https://github.com/Oswa1d99" },
] as const;

export const site = {
  name: "Jay Baek.dev",
  title: "Jay Baek.dev",
  description:
    "A learning-forward engineering dossier for practical AI systems, study notes, engineering memos, and one focused build thread.",
  url: deployment.site,
  author: "Jay Baek",
  role: "AI Engineer",
  links: socialLinks,
} as const;

export const homeHero = {
  brand: site.name,
  editorialClaim: ["Practical AI systems,", "edited into evidence."],
  promptThesis: "public technical record, kept honest by status.",
} as const;

export const aboutPage = {
  title: "About",
  description:
    "Professional context, contact, and confidential-safe work themes.",
  eyebrow: "professional context",
  intro: [
    "Jay Baek is an AI Engineer building practical AI systems through disciplined study, technical writing, and focused public build work.",
    "This site is a public surface for evidence: records, build notes, and confidential-safe themes from real engineering practice.",
  ],
  context: {
    heading: "Context",
    rows: [
      { label: "Role", value: site.role },
      {
        label: "Public surface",
        value: "Records, build notes, and technical memos",
      },
      {
        label: "Private boundary",
        value: "Company work stays theme-level only",
      },
    ],
  },
  workThemes: {
    heading: "Work themes",
    intro:
      "Company work is described here only by theme. Internal project details stay private.",
    items: [
      {
        label: "AI systems",
        description: "Applied systems, evaluation, reliability, and delivery.",
      },
      {
        label: "Product constraints",
        description: "Latency, UX, operations, maintainability, and tradeoffs.",
      },
      {
        label: "Automation",
        description: "Practical workflows that survive contact with real use.",
      },
    ],
  },
  contact: {
    heading: "Contact",
    intro: "The best public starting point is GitHub.",
  },
} as const;

export const footerCopy = {
  summary:
    "Jay Baek.dev keeps a public record of study, engineering memos, and focused build work.",
} as const;

export const navigation = [
  { label: "Records", href: "/records/" },
  { label: "Build", href: "/build/" },
  { label: "About", href: "/about/" },
] as const;
