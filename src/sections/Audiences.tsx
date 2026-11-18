import { BellOff, GraduationCap, HandHelping, LayoutGrid, ListChecks, NotebookPen, ShieldCheck, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container, Reveal, SectionHeader } from "../components/ui";

const studentPoints: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: HandHelping, title: "Help at the right level", body: "A nudge when you're close, more support when you're truly stuck, and less of it as you improve." },
  { icon: BellOff, title: "You stay in control", body: "Turn live help off to struggle first, or use exam mode and review every step at the end." },
  { icon: ListChecks, title: "A plan, ready each evening", body: "Built from what was taught today and what's coming up, so you can just start." },
];

const educatorPoints: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: LayoutGrid, title: "See where a batch is stuck", body: "Which small sub-skills are tripping students up, ready before tomorrow's class." },
  { icon: NotebookPen, title: "Your methods, your notation", body: "Guidance follows the way your institute teaches, not a random method from the web." },
  { icon: ShieldCheck, title: "Teachers stay in charge", body: "You set the modes, lock exam conditions and decide what happens in class." },
];

/* Illustrative batch heatmap: error share per sub-skill (sample data). */
const heatRows = [
  { skill: "Sign convention", cells: [0.2, 0.45, 0.15, 0.32] },
  { skill: "Integration · power rule", cells: [0.38, 0.22, 0.51, 0.18] },
  { skill: "Resolving vectors", cells: [0.08, 0.12, 0.1, 0.06] },
];
const batches = ["A", "B", "C", "D"];

function heatColor(v: number) {
  if (v >= 0.4) return "bg-amber text-ink";
  if (v >= 0.25) return "bg-amber/35 text-white";
  if (v >= 0.15) return "bg-white/15 text-white";
  return "bg-white/[0.06] text-white/70";
}

function PointList({ points, dark = false }: { points: typeof studentPoints; dark?: boolean }) {
  return (
    <ul className="mt-8 space-y-6">
      {points.map(({ icon: Icon, title, body }) => (
        <li key={title} className="flex gap-4">
          <span
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${dark ? "bg-white/10 text-[#9fb0ff]" : "bg-violet-soft text-violet"}`}
          >
            <Icon aria-hidden className="h-5 w-5" strokeWidth={1.8} />
          </span>
          <div>
            <h4 className={`font-display text-[1.05rem] font-semibold ${dark ? "text-white" : ""}`}>{title}</h4>
            <p className={`mt-1 text-pretty text-[0.95rem] leading-relaxed ${dark ? "text-white/70" : "text-muted"}`}>{body}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function Audiences() {
  return (
    <section id="educators" aria-labelledby="audiences-title" className="py-24 sm:py-32">
      <Container>
        <SectionHeader
          id="audiences-title"
          eyebrow="For students and educators"
          title="Built for the student at the desk, and the teacher behind them."
          align="center"
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          <Reveal>
            <article className="h-full rounded-[2rem] bg-white p-7 ring-1 ring-line sm:p-10" aria-labelledby="students-title">
              <p className="inline-flex items-center gap-2 text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-violet">
                <GraduationCap aria-hidden className="h-4 w-4" /> Students
              </p>
              <h3 id="students-title" className="mt-4 text-balance text-3xl font-semibold leading-tight">
                A mentor that learns how you learn.
              </h3>
              <PointList points={studentPoints} />
            </article>
          </Reveal>

          <Reveal delay={0.08}>
            <article className="h-full rounded-[2rem] bg-ink p-7 text-white sm:p-10" aria-labelledby="educators-title">
              <p className="inline-flex items-center gap-2 text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-[#9fb0ff]">
                <Users aria-hidden className="h-4 w-4" /> Educators
              </p>
              <h3 id="educators-title" className="mt-4 text-balance text-3xl font-semibold leading-tight text-white">
                Give every student the attention they deserve.
              </h3>
              <p className="mt-3 text-white/70">MentorOS amplifies teachers. It does not replace them.</p>
              <PointList points={educatorPoints} dark />

              <figure className="mt-9 rounded-2xl bg-white/[0.04] p-4 ring-1 ring-white/10">
                <figcaption className="flex items-center justify-between text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-white/50">
                  <span>Batch heatmap</span>
                  <span className="normal-case tracking-normal">sample data</span>
                </figcaption>
                <table className="mt-3 w-full border-separate border-spacing-1 text-[0.75rem]">
                  <caption className="sr-only">Illustrative share of students making errors on each sub-skill, per batch</caption>
                  <thead>
                    <tr>
                      <th scope="col" className="text-left font-medium text-white/50">
                        Sub-skill
                      </th>
                      {batches.map((b) => (
                        <th key={b} scope="col" className="w-12 text-center font-medium text-white/50">
                          {b}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {heatRows.map((r) => (
                      <tr key={r.skill}>
                        <th scope="row" className="pr-2 text-left font-normal text-white/80">
                          {r.skill}
                        </th>
                        {r.cells.map((v, i) => (
                          <td key={i} className={`h-8 rounded-md text-center tabular-nums ${heatColor(v)}`}>
                            {Math.round(v * 100)}%
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </figure>
            </article>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
