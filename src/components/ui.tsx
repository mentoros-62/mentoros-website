import type { ReactNode } from "react";
import { motion } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ctaTarget, type CtaKind } from "../config/site";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function Reveal({
  children,
  className = "",
  delay = 0,
  y = 24,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <p
      className={`font-display text-[0.78rem] font-semibold uppercase tracking-[0.18em] ${
        dark ? "text-[#9fb0ff]" : "text-violet"
      }`}
    >
      {children}
    </p>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  lede,
  dark = false,
  align = "left",
  id,
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  dark?: boolean;
  align?: "left" | "center";
  id?: string;
}) {
  const center = align === "center";
  return (
    <Reveal className={`${center ? "mx-auto text-center" : ""} max-w-3xl`}>
      {eyebrow ? <Eyebrow dark={dark}>{eyebrow}</Eyebrow> : null}
      <h2
        id={id}
        className={`mt-4 text-balance text-[2.1rem] font-semibold leading-[1.06] sm:text-5xl ${dark ? "text-white" : ""}`}
      >
        {title}
      </h2>
      {lede ? (
        <p className={`mt-5 text-pretty text-lg leading-relaxed ${dark ? "text-[#b9c1dd]" : "text-muted"}`}>{lede}</p>
      ) : null}
    </Reveal>
  );
}

type Variant = "primary" | "secondary" | "light" | "ghost-dark";

const variants: Record<Variant, string> = {
  primary:
    "bg-ink text-white hover:bg-ink-3 shadow-[0_10px_30px_-12px_rgba(10,16,48,0.6)] hover:shadow-[0_14px_34px_-12px_rgba(61,90,254,0.55)]",
  secondary: "bg-white text-ink ring-1 ring-ink/12 hover:ring-ink/30 hover:bg-white",
  light: "bg-white text-ink hover:bg-[#eef0ff]",
  "ghost-dark": "text-white ring-1 ring-white/25 hover:ring-white/60 hover:bg-white/5",
};

const base =
  "group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-[0.95rem] font-medium transition-all duration-200 active:scale-[0.98]";

export function ButtonLink({
  href,
  children,
  variant = "primary",
  external = false,
  className = "",
  ariaLabel,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  external?: boolean;
  className?: string;
  ariaLabel?: string;
}) {
  const Icon = external ? ArrowUpRight : ArrowRight;
  return (
    <a
      href={href}
      className={`${base} ${variants[variant]} ${className}`}
      aria-label={ariaLabel}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
      <Icon
        aria-hidden
        className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
        strokeWidth={2}
      />
    </a>
  );
}

/** A CTA wired to the configured form URL, falling back to a pre-filled email. */
export function CtaLink({
  kind,
  children,
  variant = "primary",
  className = "",
}: {
  kind: CtaKind;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  const target = ctaTarget(kind);
  return (
    <ButtonLink
      href={target.href}
      external={target.external}
      variant={variant}
      className={className}
      ariaLabel={`${typeof children === "string" ? children : ""} (${target.hint})`.trim()}
    >
      {children}
    </ButtonLink>
  );
}

export function SimulatedBadge({ children = "Simulated preview", dark = false }: { children?: ReactNode; dark?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.12em] ${
        dark ? "bg-white/10 text-white/80" : "bg-amber-soft text-[#8a5a00]"
      }`}
    >
      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-amber" />
      {children}
    </span>
  );
}
