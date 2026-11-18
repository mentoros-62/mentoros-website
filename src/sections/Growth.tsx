import { motion, useReducedMotion } from "motion/react";
import { CalendarClock, CheckCircle2, Compass, TrendingUp } from "lucide-react";
import type { ReactNode } from "react";
import { Container, Reveal, SectionHeader, SimulatedBadge } from "../components/ui";

/* Sample, synthetic progress for one imaginary Class 11 student. */
const mastered = ["Resolving vectors", "Equations of motion", "Unit conversions", "Differentiating powers"];
const developing = [
  { skill: "Integration · power rule", value: 46 },
  { skill: "Sign convention on slopes", value: 62 },
  { skill: "Relative velocity", value: 34 },
];
const roadmap = [
  { when: "Now", topic: "Projectile motion", state: "now" },
  { when: "Next", topic: "Circular motion", state: "next" },
  { when: "Later", topic: "Work and energy", state: "later" },
] as const;
const revision = [
  { topic: "Relative velocity", when: "Tomorrow", why: "starting to fade" },
  { topic: "Equations of motion", when: "In 3 days", why: "keep it fresh" },
  { topic: "Integration · power rule", when: "Before Friday's test", why: "on the syllabus" },
];

function Panel({ icon, title, children, className = "" }: { icon: ReactNode; title: string; children: ReactNode; className?: string }) {
  return (
    <div className={`h-full rounded-3xl bg-white p-6 ring-1 ring-line ${className}`}>
      <h3 className="flex items-center gap-2 font-display text-[1.05rem] font-semibold">
        {icon}
        {title}
      </h3>
      <div className="mt-5">{children}</div>
    </div>
  );
}

export function Growth() {
  const reduce = useReducedMotion();
  return (
    <section id="growth" aria-labelledby="growth-title" className="border-t border-line bg-paper-2/60 py-24 sm:py-32">
      <Container>
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeader
            id="growth-title"
            eyebrow="Your growth, made visible"
            title="See what you've mastered, and what comes next."
            lede="Progress is measured against who you were last week, not against the rest of the class. No leaderboards, no rankings."
          />
          <Reveal>
            <SimulatedBadge>Sample student · illustrative</SimulatedBadge>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          <Reveal className="h-full">
            <Panel icon={<CheckCircle2 aria-hidden className="h-5 w-5 text-emerald" />} title="Mastered">
              <ul className="flex flex-wrap gap-2">
                {mastered.map((m) => (
                  <li
                    key={m}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#e3f7ef] px-3 py-1.5 text-[0.85rem] font-medium text-[#0b5f45]"
                  >
                    <CheckCircle2 aria-hidden className="h-3.5 w-3.5" />
                    {m}
                  </li>
                ))}
              </ul>
            </Panel>
          </Reveal>

          <Reveal className="h-full" delay={0.06}>
            <Panel icon={<TrendingUp aria-hidden className="h-5 w-5 text-violet" />} title="Developing">
              <ul className="space-y-4">
                {developing.map((d) => (
                  <li key={d.skill}>
                    <div className="flex justify-between text-[0.88rem]">
                      <span className="font-medium text-ink">{d.skill}</span>
                    </div>
                    <div
                      className="mt-2 h-2 overflow-hidden rounded-full bg-ink/[0.07]"
                      role="meter"
                      aria-label={`${d.skill} mastery`}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-valuenow={d.value}
                    >
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-electric to-violet"
                        initial={reduce ? false : { width: 0 }}
                        whileInView={{ width: `${d.value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                        style={reduce ? { width: `${d.value}%` } : undefined}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </Panel>
          </Reveal>

          <Reveal className="h-full" delay={0.04}>
            <Panel icon={<Compass aria-hidden className="h-5 w-5 text-electric" />} title="Your roadmap">
              <ol className="relative grid grid-cols-3 gap-2">
                <div aria-hidden className="absolute left-[16%] right-[16%] top-[0.6rem] h-px bg-ink/12" />
                {roadmap.map((r) => (
                  <li key={r.topic} className="relative flex flex-col items-center text-center">
                    <span
                      aria-hidden
                      className={`relative z-10 h-5 w-5 rounded-full ring-4 ring-white ${
                        r.state === "now" ? "bg-electric" : r.state === "next" ? "bg-violet/50" : "bg-ink/15"
                      }`}
                    />
                    <span className="mt-3 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-muted">{r.when}</span>
                    <span className="mt-1 text-[0.9rem] font-medium leading-tight text-ink">{r.topic}</span>
                  </li>
                ))}
              </ol>
            </Panel>
          </Reveal>

          <Reveal className="h-full" delay={0.1}>
            <Panel icon={<CalendarClock aria-hidden className="h-5 w-5 text-teal" />} title="Upcoming revision">
              <ul className="divide-y divide-line">
                {revision.map((r) => (
                  <li key={r.topic} className="flex items-center justify-between gap-4 py-2.5 first:pt-0 last:pb-0">
                    <div>
                      <p className="text-[0.9rem] font-medium text-ink">{r.topic}</p>
                      <p className="text-[0.8rem] text-muted">{r.why}</p>
                    </div>
                    <span className="shrink-0 rounded-full bg-teal-soft px-2.5 py-1 text-[0.75rem] font-semibold text-[#0b6e68]">
                      {r.when}
                    </span>
                  </li>
                ))}
              </ul>
            </Panel>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
