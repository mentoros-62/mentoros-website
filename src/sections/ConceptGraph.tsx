import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Route } from "lucide-react";
import { Container, Reveal, SectionHeader } from "../components/ui";
import { useMediaQuery } from "../lib/useMediaQuery";

interface Node {
  id: string;
  label: string;
  note: string;
  /** [x%, y%] in the wide layout, then in the tall (mobile) layout */
  wide: [number, number];
  tall: [number, number];
}

const nodes: Node[] = [
  { id: "algebra", label: "Algebra", note: "Manipulating expressions and powers.", wide: [9, 22], tall: [24, 5] },
  { id: "trig", label: "Trigonometry", note: "Angles, sine and cosine.", wide: [9, 78], tall: [76, 5] },
  { id: "functions", label: "Functions", note: "How one quantity depends on another.", wide: [29, 22], tall: [24, 22] },
  { id: "vectors", label: "Vectors", note: "Splitting motion into directions.", wide: [29, 78], tall: [76, 22] },
  { id: "diff", label: "Differentiation", note: "Rates of change: velocity from position.", wide: [50, 10], tall: [24, 40] },
  { id: "integration", label: "Integration", note: "Accumulating change: position from velocity.", wide: [50, 46], tall: [24, 58] },
  { id: "newton", label: "Newton's laws", note: "Forces and the acceleration they cause.", wide: [60, 84], tall: [76, 50] },
  { id: "kinematics", label: "Kinematics", note: "Describing motion with equations.", wide: [73, 34], tall: [42, 77] },
  { id: "projectile", label: "Projectile motion", note: "Motion under gravity in two directions.", wide: [91, 60], tall: [66, 95] },
];

/** prerequisite → concept that builds on it */
const edges: [string, string][] = [
  ["algebra", "functions"],
  ["functions", "diff"],
  ["diff", "integration"],
  ["trig", "vectors"],
  ["diff", "kinematics"],
  ["integration", "kinematics"],
  ["vectors", "kinematics"],
  ["vectors", "newton"],
  ["kinematics", "projectile"],
  ["newton", "projectile"],
];

/** The sample struggle: trouble with projectile motion traced back to one integration sub-skill. */
const trace = {
  symptom: "projectile",
  root: "integration",
  path: ["integration", "kinematics", "projectile"],
};

const byId = Object.fromEntries(nodes.map((n) => [n.id, n])) as Record<string, Node>;

function collect(start: string, dir: "up" | "down"): Set<string> {
  const out = new Set<string>();
  const stack = [start];
  while (stack.length) {
    const cur = stack.pop()!;
    for (const [a, b] of edges) {
      const next = dir === "up" ? (b === cur ? a : null) : a === cur ? b : null;
      if (next && !out.has(next)) {
        out.add(next);
        stack.push(next);
      }
    }
  }
  return out;
}

type Mode = { kind: "trace" } | { kind: "focus"; id: string };

export function ConceptGraph() {
  const reduce = useReducedMotion();
  const wide = useMediaQuery("(min-width: 768px)");
  const [mode, setMode] = useState<Mode>({ kind: "trace" });

  const pos = (n: Node) => (wide ? n.wide : n.tall);

  const { prereqs, unlocks } = useMemo(() => {
    if (mode.kind !== "focus") return { prereqs: new Set<string>(), unlocks: new Set<string>() };
    return { prereqs: collect(mode.id, "up"), unlocks: collect(mode.id, "down") };
  }, [mode]);

  const tracePairs = new Set(trace.path.slice(0, -1).map((a, i) => `${a}>${trace.path[i + 1]}`));

  function edgeState(a: string, b: string): "trace" | "prereq" | "unlock" | "idle" {
    if (mode.kind === "trace") return tracePairs.has(`${a}>${b}`) ? "trace" : "idle";
    const f = mode.id;
    if ((b === f || prereqs.has(b)) && prereqs.has(a)) return "prereq";
    if ((a === f || unlocks.has(a)) && unlocks.has(b)) return "unlock";
    return "idle";
  }

  function nodeState(id: string): "focus" | "prereq" | "unlock" | "root" | "symptom" | "trace" | "idle" {
    if (mode.kind === "trace") {
      if (id === trace.root) return "root";
      if (id === trace.symptom) return "symptom";
      if (trace.path.includes(id)) return "trace";
      return "idle";
    }
    if (id === mode.id) return "focus";
    if (prereqs.has(id)) return "prereq";
    if (unlocks.has(id)) return "unlock";
    return "idle";
  }

  const edgeColor = { trace: "#f5a524", prereq: "#6d5dfc", unlock: "#0fa39a", idle: "#1c2660" } as const;

  const nodeClass: Record<ReturnType<typeof nodeState>, string> = {
    focus: "bg-ink text-white ring-ink",
    prereq: "bg-violet-soft text-ink ring-violet",
    unlock: "bg-teal-soft text-ink ring-teal",
    root: "bg-amber text-ink ring-amber shadow-[0_0_0_6px_rgba(245,165,36,0.18)]",
    symptom: "bg-white text-ink ring-amber",
    trace: "bg-amber-soft text-ink ring-amber",
    idle: "bg-white text-body ring-ink/12",
  };

  const focusNode = mode.kind === "focus" ? byId[mode.id] : null;

  return (
    <section id="concepts" aria-labelledby="concepts-title" className="relative overflow-hidden py-24 sm:py-32">
      <Container>
        <SectionHeader
          id="concepts-title"
          eyebrow="Knowledge that connects"
          title="Understanding one concept can unlock a hundred more."
          lede="Subjects are not separate boxes. When you struggle with a problem, the cause is often a smaller idea underneath it. MentorOS follows those links back to find it."
        />

        <Reveal className="mt-12 grid gap-6 lg:grid-cols-[1fr_18rem] lg:gap-8">
          <div className="relative rounded-[1.75rem] bg-white p-3 ring-1 ring-line sm:p-5">
            <div className="relative w-full" style={{ aspectRatio: wide ? "16 / 8.4" : "3 / 4.6" }}>
              <svg
                className="absolute inset-0 h-full w-full overflow-visible"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden
              >
                {edges.map(([a, b]) => {
                  const [x1, y1] = pos(byId[a]);
                  const [x2, y2] = pos(byId[b]);
                  const st = edgeState(a, b);
                  const mx = wide ? (x1 + x2) / 2 : x1;
                  const d = wide
                    ? `M${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`
                    : `M${x1} ${y1} C ${x1} ${(y1 + y2) / 2}, ${x2} ${(y1 + y2) / 2}, ${x2} ${y2}`;
                  return (
                    <g key={`${a}-${b}`}>
                      <motion.path
                        d={d}
                        fill="none"
                        vectorEffect="non-scaling-stroke"
                        initial={false}
                        animate={{
                          stroke: edgeColor[st],
                          strokeOpacity: st === "idle" ? 0.16 : 0.95,
                          strokeWidth: st === "idle" ? 1.5 : 3,
                        }}
                        transition={{ duration: 0.3 }}
                      />
                      {st !== "idle" && !reduce ? (
                        <path
                          d={d}
                          fill="none"
                          stroke="#ffffff"
                          strokeWidth={2}
                          vectorEffect="non-scaling-stroke"
                          className="link-flow"
                          style={st === "trace" || st === "prereq" ? { animationDirection: "reverse" } : undefined}
                        />
                      ) : null}
                    </g>
                  );
                })}
              </svg>

              {nodes.map((n) => {
                const [x, y] = pos(n);
                const st = nodeState(n.id);
                return (
                  <button
                    key={n.id}
                    type="button"
                    onMouseEnter={() => setMode({ kind: "focus", id: n.id })}
                    onFocus={() => setMode({ kind: "focus", id: n.id })}
                    onClick={() => setMode({ kind: "focus", id: n.id })}
                    aria-pressed={mode.kind === "focus" && mode.id === n.id}
                    aria-label={`${n.label}: ${n.note}`}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full px-3 py-1.5 text-[0.78rem] font-medium ring-[1.5px] transition-all duration-300 sm:px-3.5 sm:text-[0.88rem] ${nodeClass[st]} ${
                      st === "idle" && mode.kind === "focus" ? "opacity-60" : "opacity-100"
                    }`}
                    style={{ left: `${x}%`, top: `${y}%` }}
                  >
                    {n.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Explanation panel */}
          <div className="flex flex-col gap-4 rounded-[1.75rem] bg-ink p-6 text-white" aria-live="polite">
            {mode.kind === "trace" ? (
              <>
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[#ffd48a]">Tracing a struggle · example</p>
                <p className="font-display text-xl leading-snug">
                  Stuck on projectile motion? The gap may be one step back.
                </p>
                <ol className="space-y-2.5 text-[0.9rem] text-white/80">
                  <li className="flex gap-2.5">
                    <span aria-hidden className="mt-1.5 h-2 w-2 shrink-0 rounded-full border border-amber" />
                    <span><span className="font-semibold text-white">Projectile motion:</span> height comes out wrong.</span>
                  </li>
                  <li className="flex gap-2.5">
                    <span aria-hidden className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-amber/50" />
                    <span><span className="font-semibold text-white">Kinematics:</span> the velocity line was right.</span>
                  </li>
                  <li className="flex gap-2.5">
                    <span aria-hidden className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-amber" />
                    <span><span className="font-semibold text-white">Integration:</span> the power rule slipped. That is what gets practised.</span>
                  </li>
                </ol>
                <p className="mt-auto text-[0.82rem] text-white/60">Hover, tap or tab through any concept to see what it builds on and what it unlocks.</p>
              </>
            ) : focusNode ? (
              <>
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[#9fb0ff]">Concept</p>
                <p className="font-display text-2xl">{focusNode.label}</p>
                <p className="text-[0.92rem] text-white/75">{focusNode.note}</p>
                <div className="space-y-3 text-[0.85rem]">
                  <p>
                    <span className="mr-2 inline-block h-2 w-2 rounded-full bg-violet align-middle" />
                    <span className="text-white/60">Builds on: </span>
                    {prereqs.size ? [...prereqs].map((id) => byId[id].label).join(", ") : "nothing here: it's a starting point"}
                  </p>
                  <p>
                    <span className="mr-2 inline-block h-2 w-2 rounded-full bg-teal align-middle" />
                    <span className="text-white/60">Unlocks: </span>
                    {unlocks.size ? [...unlocks].map((id) => byId[id].label).join(", ") : "the next chapter"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setMode({ kind: "trace" })}
                  className="mt-auto inline-flex min-h-10 items-center justify-center gap-2 self-start rounded-full bg-white/10 px-4 py-2 text-[0.85rem] font-medium text-white ring-1 ring-white/20 transition hover:bg-white/15"
                >
                  <Route aria-hidden className="h-4 w-4" /> Trace a struggle
                </button>
              </>
            ) : null}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
