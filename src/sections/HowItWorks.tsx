import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { BookOpenText, MapIcon, PenLine, Sprout, type LucideIcon } from "lucide-react";
import { Container, Reveal, SectionHeader } from "../components/ui";

interface Step {
  n: string;
  title: string;
  body: string;
  detail: string[];
  icon: LucideIcon;
  color: string;
}

const steps: Step[] = [
  {
    n: "01",
    title: "Understand Your World",
    body: "MentorOS starts from what you are already taught: your institute's syllabus, notes, practice sheets and test calendar. It follows your teachers' methods and notation instead of inventing its own.",
    detail: ["Syllabus and notes", "Daily practice problems", "Test calendar"],
    icon: BookOpenText,
    color: "#3d5afe",
  },
  {
    n: "02",
    title: "Chart Your Journey",
    body: "Each evening you get a short, ready-made plan: today's lecture topic, a few skills that are starting to fade, and practice weighted towards your next test. No time lost deciding what to study.",
    detail: ["Warm-up recall", "Concept checks", "Adaptive practice"],
    icon: MapIcon,
    color: "#6d5dfc",
  },
  {
    n: "03",
    title: "Learn Together",
    body: "You solve on a pen scratchpad. MentorOS follows each step and gives the least help that gets you moving: silence, a question, a pointer, a hint, a method, a worked step or a quick drill. Prefer to struggle first? Switch live help off and ask when you want it.",
    detail: ["Step-by-step reading", "Adaptive help", "Live, Ask-only, Quiet or Exam modes"],
    icon: PenLine,
    color: "#0fa39a",
  },
  {
    n: "04",
    title: "Grow With Every Step",
    body: "Every step you take updates a picture of what you have mastered, down to small sub-skills. Help fades as you get stronger, and revision comes back just before you would forget.",
    detail: ["Sub-skill mastery", "Fading help", "Timely revision"],
    icon: Sprout,
    color: "#10b981",
  },
];

export function HowItWorks() {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 75%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <section id="how-it-works" aria-labelledby="how-title" className="border-t border-line bg-white py-24 sm:py-32">
      <Container>
        <SectionHeader
          id="how-title"
          eyebrow="How it works"
          title="One journey, from your syllabus to your next step."
          lede="These are the pieces we are building and testing first with coaching institutes."
        />

        <ol ref={listRef} className="relative mt-16 max-w-4xl">
          {/* the path that connects every step */}
          <div aria-hidden className="absolute bottom-6 left-[1.6rem] top-6 w-px bg-ink/10 sm:left-[2rem]" />
          <motion.div
            aria-hidden
            className="absolute bottom-6 left-[1.6rem] top-6 w-px origin-top bg-gradient-to-b from-electric via-violet to-emerald sm:left-[2rem]"
            style={{ scaleY }}
          />

          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <li key={s.n} className={`relative pl-20 sm:pl-28 ${i < steps.length - 1 ? "pb-16 sm:pb-20" : ""}`}>
                <Reveal>
                  <div
                    className="absolute left-0 top-0 flex h-[3.2rem] w-[3.2rem] items-center justify-center rounded-2xl bg-white shadow-[0_8px_24px_-12px_rgba(10,16,48,0.35)] ring-1 ring-ink/10 sm:h-16 sm:w-16"
                    aria-hidden
                  >
                    <Icon className="h-6 w-6 sm:h-7 sm:w-7" style={{ color: s.color }} strokeWidth={1.75} />
                  </div>
                  <p className="font-display text-sm font-semibold tracking-wider" style={{ color: s.color }}>
                    {s.n}
                  </p>
                  <h3 className="mt-1 text-2xl font-semibold sm:text-[1.9rem]">{s.title}</h3>
                  <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-muted sm:text-[1.05rem]">{s.body}</p>
                  <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${s.title}: includes`}>
                    {s.detail.map((d) => (
                      <li key={d} className="rounded-full bg-paper px-3 py-1 text-[0.8rem] font-medium text-body ring-1 ring-line">
                        {d}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
