/**
 * Single place to configure everything that changes between deployments.
 * Values can be overridden at build time with VITE_* environment variables
 * (see .env.example and website/README.md), so nothing private needs to be committed.
 */

const env = import.meta.env;

function clean(value: string | undefined): string {
  return (value ?? "").trim();
}

export const site = {
  name: "MentorOS",
  tagline: "Intelligence that grows with you",
  description:
    "MentorOS is a personal AI learning companion in development. It follows how a student works through a problem, finds the step where they got stuck, and gives just enough help for them to find the answer themselves.",

  /** Contact address used for mailto: links. Override with VITE_CONTACT_EMAIL. */
  contactEmail: clean(env.VITE_CONTACT_EMAIL) || "mentoros.support@gmail.com",

  /**
   * Optional form URLs (Google Form, Formspree, Tally…). When empty, the CTA opens an email
   * draft to contactEmail instead. The site never pretends a submission succeeded.
   */
  pilotFormUrl: clean(env.VITE_PILOT_FORM_URL),
  earlyAccessFormUrl: clean(env.VITE_EARLY_ACCESS_FORM_URL),

  /** Social / external links shown in the footer, e.g. { label: "LinkedIn", href: "https://…" }. */
  social: [] as {
    label: string;
    href: string;
  }[],
} as const;

export type CtaKind = "pilot" | "early-access";

const mailBodies: Record<CtaKind, { subject: string; body: string }> = {
  pilot: {
    subject: "Pilot partnership with MentorOS",
    body: "Hello MentorOS team,\n\nWe'd like to explore a pilot.\n\nInstitute / school:\nCity:\nClasses and batches:\nApproximate number of students:\nBest way to reach us:\n\nThanks!",
  },
  "early-access": {
    subject: "MentorOS early access",
    body: "Hello MentorOS team,\n\nPlease add me to the early access list.\n\nI am a (student / parent / teacher / other):\nClass or subject (optional):\n\nThanks!",
  },
};

export interface CtaTarget {
  href: string;
  external: boolean;
  /** Short note telling the visitor what will happen when they click. */
  hint: string;
}

export function ctaTarget(kind: CtaKind): CtaTarget {
  const formUrl = kind === "pilot" ? site.pilotFormUrl : site.earlyAccessFormUrl;
  if (formUrl) {
    return { href: formUrl, external: true, hint: "Opens a short form in a new tab." };
  }
  const { subject, body } = mailBodies[kind];
  const href = `mailto:${site.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  return { href, external: false, hint: `Opens an email to ${site.contactEmail}.` };
}
