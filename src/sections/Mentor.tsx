import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { ArrowRight, Check, Eye, RotateCcw, Sparkles } from "lucide-react";
import { Container, Reveal, SectionHeader, SimulatedBadge } from "../components/ui";
import {
  chosenLevel,
  conceptChain,
  ladder,
  ladderReason,
  mastery,
  mentorMessage,
  problem,
  readingConfirmation,
  workingLines,
} from "../data/mentorPreview";

/**
 * Stages of the scripted preview:
 * 0 nothing · 1–3 lines written · 4 slip flagged · 5 reading confirmed · 6 mentor speaks
 */
const FINAL = 6;
const timings = [500, 1100, 1100, 1300, 1000, 1100];

export function Mentor() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const [stage, setStage] = useState(0);
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (reduce) {
      setStage(FINAL);
      return;
    }
    if (!inView) return;
    setStage(0);
    const ids: number[] = [];
    let t = 0;
    timings.forEach((ms, i) => {
      t += ms;
      ids.push(window.setTimeout(() => setStage(i + 1), t));
    });
    return () => ids.forEach((id) => window.clearTimeout(id));
  }, [inView, reduce, run]);

  const done = stage >= FINAL;

  return (
    <section id="mentor" aria-labelledby="mentor-title" className="relative overflow-hidden py-24 sm:py-32">
      <Container>
        <SectionHeader
          id="mentor-title"
          eyebrow="Meet your AI mentor"
          title="Not another AI that gives answers. One that helps you find them."
          lede="You work on a pen scratchpad, the way you would on paper. MentorOS reads each step, finds the one that went wrong, and decides how much help you need: often just a question."
        />

        <Reveal className="mt-14">
          <div
            ref={ref}
            className="relative rounded-[2rem] bg-ink p-2.5 shadow-[0_40px_90px_-40px_rgba(10,16,48,0.65)] sm:p-3.5"
          >
            {/* device chrome */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-3 pb-3 pt-1.5 sm:px-4">
              <div className="flex items-center gap-2" aria-hidden>
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              </div>
              <SimulatedBadge dark>Simulated preview · sample data</SimulatedBadge>
            </div>

            <div className="grid overflow-hidden rounded-[1.4rem] bg-paper lg:grid-cols-[1.35fr_1fr]">
              {/* Notebook */}
              <div className="ruled-paper relative min-h-[25rem] px-5 pb-10 pt-6 sm:px-8 sm:pl-16">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-muted">{problem.label}</p>
                <p className="mt-2 max-w-lg text-[0.95rem] leading-relaxed text-ink">{problem.statement}</p>

                <ol className="mt-6 space-y-[0.95rem] font-hand text-[1.75rem] leading-[1.5rem] text-[#1b2a6b] sm:text-[2rem]" aria-label="Student's working">
                  {workingLines.map((line, i) => {
                    const visible = stage >= i + 1;
                    return (
                      <motion.li
                        key={i}
                        className="relative flex items-center gap-3 pt-2"
                        initial={false}
                        animate={{
                          clipPath: visible ? "inset(-20% 0% -40% -15%)" : "inset(-20% 100% -40% -15%)",
                          opacity: visible ? 1 : 0,
                        }}
                        transition={{ duration: reduce ? 0 : 0.9, ease: "easeOut" }}
                      >
                        <span className="w-5 shrink-0 font-sans text-xs font-medium text-muted/70 sm:-ml-9 sm:w-6">{i + 1}</span>
                        <span className="whitespace-nowrap">
                          {line.parts.map((p, j) =>
                            p.sub ? (
                              <sub key={j} className="text-[0.6em]">
                                {p.text}
                              </sub>
                            ) : p.slip ? (
                              <span key={j} className="relative inline-block px-1">
                                <motion.span
                                  aria-hidden
                                  className="absolute inset-x-0 -inset-y-0.5 rounded-md bg-amber/30 ring-2 ring-amber"
                                  initial={false}
                                  animate={{ opacity: stage >= 4 ? 1 : 0, scale: stage >= 4 ? 1 : 0.85 }}
                                  transition={{ duration: reduce ? 0 : 0.4 }}
                                />
                                <span className="relative">{p.text}</span>
                                {stage >= 4 ? <span className="sr-only"> (step flagged for review)</span> : null}
                              </span>
                            ) : (
                              <span key={j}>{p.text}</span>
                            ),
                          )}
                        </span>
                      </motion.li>
                    );
                  })}
                </ol>

                {/* pen cursor */}
                {!done ? (
                  <motion.span
                    aria-hidden
                    className="ml-8 mt-3 block h-6 w-0.5 rounded bg-[#1b2a6b]/60 sm:ml-0"
                    animate={{ opacity: [1, 0.15, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                ) : null}

                <AnimatePresence>
                  {stage >= 4 ? (
                    <motion.p
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-8 inline-flex items-center gap-2 rounded-full bg-amber-soft px-3 py-1.5 text-[0.8rem] font-medium text-[#7a4f00]"
                    >
                      <span aria-hidden className="h-2 w-2 rounded-full bg-amber" />
                      Line 3 flagged · integration step
                    </motion.p>
                  ) : null}
                </AnimatePresence>
              </div>

              {/* Mentor panel */}
              <div className="flex flex-col gap-4 border-t border-line bg-white p-5 sm:p-7 lg:border-l lg:border-t-0">
                <div className="flex items-center gap-2 text-[0.78rem] text-muted">
                  <Eye aria-hidden className="h-4 w-4 text-teal" />
                  MentorOS is following your work
                </div>

                <AnimatePresence mode="popLayout">
                  {stage >= 5 ? (
                    <motion.div
                      key="reading"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-2xl border border-line bg-paper px-4 py-3"
                    >
                      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-muted">Reading line 3 as</p>
                      <p className="mt-1 flex items-center justify-between gap-3 font-mono text-[0.9rem] text-ink">
                        {readingConfirmation}
                        <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-teal-soft px-2 py-0.5 font-sans text-[0.7rem] font-semibold text-[#0b6e68]">
                          <Check aria-hidden className="h-3 w-3" /> confirmed
                        </span>
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>

                <div aria-live="polite" className="min-h-[7.5rem]">
                  <AnimatePresence>
                    {stage >= 6 ? (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="relative rounded-2xl rounded-tl-md bg-gradient-to-br from-[#eef0ff] to-violet-soft p-4"
                      >
                        <p className="flex items-center gap-1.5 text-[0.75rem] font-semibold text-violet">
                          <Sparkles aria-hidden className="h-3.5 w-3.5" /> Mentor
                        </p>
                        <p className="mt-1.5 text-[1.05rem] leading-snug text-ink">{mentorMessage}</p>
                      </motion.div>
                    ) : (
                      <div className="flex h-full items-center gap-2 rounded-2xl border border-dashed border-line px-4 py-6 text-[0.85rem] text-muted">
                        <span className="flex gap-1" aria-hidden>
                          <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-muted/60" />
                          <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-muted/60 [animation-delay:200ms]" />
                          <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-muted/60 [animation-delay:400ms]" />
                        </span>
                        Watching each step…
                      </div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Help level */}
                <div>
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-muted">How much help</p>
                  <div className="mt-2 flex gap-1" role="img" aria-label={`Help level ${chosenLevel} of ${ladder.length - 1}: ${ladder[chosenLevel]}`}>
                    {ladder.map((step, i) => (
                      <span
                        key={step}
                        title={step}
                        className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${
                          done && i <= chosenLevel ? (i === chosenLevel ? "bg-violet" : "bg-violet/35") : "bg-ink/10"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="mt-2 text-[0.82rem] leading-snug text-muted">
                    <span className="font-semibold text-ink">{ladder[chosenLevel]}.</span> {ladderReason}
                  </p>
                </div>

                <div className="mt-auto grid gap-4 border-t border-line pt-4 sm:grid-cols-2 lg:grid-cols-1">
                  <div>
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-muted">Concept chain</p>
                    <ol className="mt-2 flex flex-wrap items-center gap-1 text-[0.8rem] font-medium" aria-label="Concept chain">
                      {conceptChain.map((c, i) => (
                        <li key={c} className="flex items-center gap-1">
                          <span
                            className={`rounded-full px-2 py-0.5 ${
                              i === conceptChain.length - 1 ? "bg-violet text-white" : "bg-ink/[0.06] text-ink"
                            }`}
                          >
                            {c}
                          </span>
                          {i < conceptChain.length - 1 ? <ArrowRight aria-hidden className="h-3 w-3 text-muted" /> : null}
                        </li>
                      ))}
                    </ol>
                  </div>
                  <div>
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-muted">Mastery</p>
                    <p className="mt-1.5 flex items-baseline justify-between text-[0.8rem]">
                      <span className="font-medium text-ink">{mastery.skill}</span>
                    </p>
                    <div className="mt-1.5 flex items-center gap-2">
                      <div
                        className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink/10"
                        role="meter"
                        aria-label={`${mastery.skill} mastery`}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={Math.round(mastery.value * 100)}
                        aria-valuetext={mastery.label}
                      >
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-amber to-teal"
                          initial={false}
                          animate={{ width: done ? `${mastery.value * 100}%` : "0%" }}
                          transition={{ duration: reduce ? 0 : 1, ease: "easeOut" }}
                        />
                      </div>
                      <span className="text-[0.75rem] font-medium text-[#8a5a00]">{mastery.label}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-5 flex flex-col items-start justify-between gap-3 text-[0.85rem] text-muted sm:flex-row sm:items-center">
          <p className="max-w-2xl">
            An illustration built from sample data, not a recording of the product. The real scratchpad, step reading and
            help policy are in development.
          </p>
          {!reduce ? (
            <button
              type="button"
              onClick={() => setRun((r) => r + 1)}
              className="inline-flex min-h-10 items-center gap-1.5 rounded-full px-3 py-2 font-medium text-ink ring-1 ring-ink/12 transition hover:ring-ink/30"
            >
              <RotateCcw aria-hidden className="h-4 w-4" /> Replay
            </button>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
