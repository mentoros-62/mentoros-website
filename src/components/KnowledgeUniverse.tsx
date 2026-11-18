import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion, useTransform, type MotionValue } from "motion/react";

type SubjectId = "maths" | "physics" | "chemistry" | "logic";

interface Subject {
  id: SubjectId;
  label: string;
  x: number;
  y: number;
  color: string;
  note: string;
}

interface Concept {
  id: string;
  label: string;
  subject: SubjectId;
  x: number;
  y: number;
}

const C = { x: 300, y: 300 };

const subjects: Subject[] = [
  {
    id: "maths",
    label: "Maths",
    x: 150,
    y: 170,
    color: "#3d5afe",
    note: "Algebra and calculus quietly power the rest: motion, rates, even reaction speeds.",
  },
  {
    id: "physics",
    label: "Physics",
    x: 455,
    y: 160,
    color: "#6d5dfc",
    note: "A projectile problem is often a calculus problem in disguise.",
  },
  {
    id: "chemistry",
    label: "Chemistry",
    x: 465,
    y: 440,
    color: "#0fa39a",
    note: "Mole calculations lean on ratios from algebra; energy links back to physics.",
  },
  {
    id: "logic",
    label: "Logic",
    x: 140,
    y: 430,
    color: "#d48a12",
    note: "Spotting patterns and checking each step is the habit that ties every subject together.",
  },
];

const concepts: Concept[] = [
  { id: "algebra", label: "Algebra", subject: "maths", x: 52, y: 228 },
  { id: "calculus", label: "Calculus", subject: "maths", x: 250, y: 62 },
  { id: "motion", label: "Motion", subject: "physics", x: 372, y: 52 },
  { id: "energy", label: "Energy", subject: "physics", x: 560, y: 262 },
  { id: "moles", label: "Moles", subject: "chemistry", x: 360, y: 548 },
  { id: "bonding", label: "Bonding", subject: "chemistry", x: 566, y: 388 },
  { id: "patterns", label: "Patterns", subject: "logic", x: 40, y: 360 },
  { id: "proof", label: "Proof", subject: "logic", x: 210, y: 548 },
];

/** Links between ideas in different subjects: the point of the whole picture. */
const crossLinks: [string, string][] = [
  ["calculus", "motion"],
  ["algebra", "moles"],
  ["energy", "bonding"],
  ["patterns", "algebra"],
  ["proof", "moles"],
];

const conceptById: Record<string, Concept> = Object.fromEntries(concepts.map((c) => [c.id, c]));
const subjectById = Object.fromEntries(subjects.map((s) => [s.id, s])) as Record<SubjectId, Subject>;
const ORDER: SubjectId[] = ["maths", "physics", "chemistry", "logic"];

function curve(a: { x: number; y: number }, b: { x: number; y: number }, bend = 0.18) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  // bow the line away from the core for a gentle orbital feel
  const cx = mx + (mx - C.x) * bend;
  const cy = my + (my - C.y) * bend;
  return `M${a.x} ${a.y} Q${cx} ${cy} ${b.x} ${b.y}`;
}

function conceptIsLit(c: Concept, active: SubjectId) {
  if (c.subject === active) return true;
  return crossLinks.some(
    ([a, b]) => (a === c.id || b === c.id) && (conceptById[a].subject === active || conceptById[b].subject === active),
  );
}

interface Props {
  /** 0 → 1 scroll progress through the hero; links brighten as the visitor scrolls. */
  progress: MotionValue<number>;
}

export function KnowledgeUniverse({ progress }: Props) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<SubjectId>("maths");
  const [userPicked, setUserPicked] = useState(false);

  // Gently cycle through subjects until the visitor interacts.
  useEffect(() => {
    if (reduce || userPicked) return;
    const t = window.setInterval(() => {
      setActive((cur) => ORDER[(ORDER.indexOf(cur) + 1) % ORDER.length]);
    }, 3600);
    return () => window.clearInterval(t);
  }, [reduce, userPicked]);

  const pick = (id: SubjectId) => {
    setUserPicked(true);
    setActive(id);
  };

  const baseLinkOpacity = useTransform(progress, [0, 0.45], [0.2, 0.55]);
  const orbScale = useTransform(progress, [0, 0.6], reduce ? [1, 1] : [1, 1.12]);
  const haloOpacity = useTransform(progress, [0, 0.6], [0.55, 1]);

  const links = useMemo(() => {
    const out: { key: string; d: string; subjects: SubjectId[]; kind: "core" | "branch" | "cross" }[] = [];
    for (const s of subjects) out.push({ key: `c-${s.id}`, d: curve(C, s, 0.05), subjects: [s.id], kind: "core" });
    for (const c of concepts) {
      out.push({ key: `b-${c.id}`, d: curve(subjectById[c.subject], c, 0.1), subjects: [c.subject], kind: "branch" });
    }
    for (const [a, b] of crossLinks) {
      const ca = conceptById[a];
      const cb = conceptById[b];
      out.push({ key: `x-${a}-${b}`, d: curve(ca, cb, 0.22), subjects: [ca.subject, cb.subject], kind: "cross" });
    }
    return out;
  }, []);

  const activeSubject = subjectById[active];

  return (
    <div className="relative mx-auto w-full max-w-[540px]">
      <svg viewBox="-20 0 640 600" className="h-auto w-full" role="img" aria-labelledby="ku-title ku-desc">
        <title id="ku-title">Knowledge universe</title>
        <desc id="ku-desc">
          A glowing core connected to four subjects (Maths, Physics, Chemistry and Logic), each branching into concepts.
          Lines between concepts in different subjects show how ideas connect. Highlighted: {activeSubject.label}.
        </desc>
        <defs>
          <radialGradient id="ku-orb" cx="40%" cy="35%" r="70%">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="0.25" stopColor="#c9c2ff" />
            <stop offset="0.62" stopColor="#6d5dfc" />
            <stop offset="1" stopColor="#24248f" />
          </radialGradient>
          <radialGradient id="ku-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#6d5dfc" stopOpacity="0.32" />
            <stop offset="0.55" stopColor="#3d5afe" stopOpacity="0.08" />
            <stop offset="1" stopColor="#3d5afe" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* faint orbits give scale without noise */}
        <g fill="none" stroke="#0a1030" strokeOpacity="0.07">
          <circle cx={C.x} cy={C.y} r="196" />
          <circle cx={C.x} cy={C.y} r="276" strokeDasharray="2 7" />
        </g>

        <motion.circle cx={C.x} cy={C.y} r="180" fill="url(#ku-halo)" style={{ opacity: haloOpacity }} />

        {/* links */}
        <g fill="none" strokeLinecap="round">
          {links.map((l, i) => {
            const lit = l.subjects.includes(active);
            const width = l.kind === "core" ? 2.2 : 1.5;
            return (
              <g key={l.key}>
                <motion.path
                  d={l.d}
                  stroke={lit ? activeSubject.color : "#1c2660"}
                  strokeWidth={lit ? width + 0.6 : width}
                  style={lit ? { opacity: 0.95 } : { opacity: baseLinkOpacity }}
                  initial={reduce ? false : { pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    pathLength: {
                      duration: 1.2,
                      delay: (l.kind === "core" ? 0.2 : l.kind === "branch" ? 0.7 : 1.2) + i * 0.02,
                      ease: "easeInOut",
                    },
                  }}
                />
                {lit && !reduce ? (
                  <path d={l.d} stroke="#ffffff" strokeWidth={width} className="link-flow" opacity="0.85" />
                ) : null}
              </g>
            );
          })}
        </g>

        {/* concepts */}
        {concepts.map((c) => {
          const lit = conceptIsLit(c, active);
          const color = subjectById[c.subject].color;
          return (
            <g key={c.id} onMouseEnter={() => pick(c.subject)} onClick={() => pick(c.subject)} className="cursor-pointer">
              <circle cx={c.x} cy={c.y} r="20" fill="transparent" />
              <motion.circle
                cx={c.x}
                cy={c.y}
                r={6}
                initial={false}
                animate={{ scale: lit ? 1.25 : 1, fill: lit ? color : "#ffffff" }}
                style={{ transformOrigin: `${c.x}px ${c.y}px` }}
                stroke={color}
                strokeWidth="2"
                transition={{ duration: 0.35 }}
              />
              <text
                x={c.x}
                y={c.y + (c.y > C.y ? 30 : -17)}
                textAnchor="middle"
                className="font-sans"
                fontSize="18"
                fill={lit ? "#0a1030" : "#5d6580"}
                fontWeight={lit ? 600 : 500}
              >
                {c.label}
              </text>
            </g>
          );
        })}

        {/* subjects */}
        {subjects.map((s) => {
          const lit = s.id === active;
          return (
            <g key={s.id} onMouseEnter={() => pick(s.id)} onClick={() => pick(s.id)} className="cursor-pointer">
              <motion.circle
                cx={s.x}
                cy={s.y}
                r="40"
                fill={s.color}
                initial={false}
                animate={{ opacity: lit ? 0.16 : 0, scale: lit ? 1 : 0.6 }}
                style={{ transformOrigin: `${s.x}px ${s.y}px` }}
                transition={{ duration: 0.45 }}
              />
              <circle cx={s.x} cy={s.y} r="24" fill="#ffffff" stroke={s.color} strokeWidth={lit ? 3.5 : 2} />
              <circle cx={s.x} cy={s.y} r="8.5" fill={s.color} />
              <text
                x={s.x}
                y={s.y + (s.y > C.y ? 58 : -40)}
                textAnchor="middle"
                className="font-display"
                fontSize="26"
                fontWeight="600"
                fill="#0a1030"
              >
                {s.label}
              </text>
            </g>
          );
        })}

        {/* the core */}
        <motion.g style={{ scale: orbScale, transformOrigin: `${C.x}px ${C.y}px` }}>
          <motion.circle
            cx={C.x}
            cy={C.y}
            r={66}
            fill="#6d5dfc"
            initial={false}
            animate={reduce ? { opacity: 0.14 } : { scale: [1, 1.14, 1], opacity: [0.2, 0.06, 0.2] }}
            style={{ transformOrigin: `${C.x}px ${C.y}px` }}
            transition={{ duration: 5, repeat: reduce ? 0 : Infinity, ease: "easeInOut" }}
          />
          <circle cx={C.x} cy={C.y} r="52" fill="url(#ku-orb)" />
          <circle cx={C.x - 16} cy={C.y - 18} r="12" fill="#ffffff" opacity="0.5" />
        </motion.g>
      </svg>

      {/* Keyboard-accessible controls plus a caption explaining the highlighted links. */}
      <div className="mt-1 flex flex-col items-center gap-3 px-2 text-center">
        <div role="group" aria-label="Highlight a subject" className="flex flex-wrap justify-center gap-1.5">
          {subjects.map((s) => (
            <button
              key={s.id}
              type="button"
              aria-pressed={s.id === active}
              onClick={() => pick(s.id)}
              className={`inline-flex min-h-9 items-center gap-1.5 rounded-full px-3 py-1.5 text-[0.82rem] font-medium transition-colors ${
                s.id === active ? "bg-ink text-white" : "bg-white/80 text-body ring-1 ring-ink/10 hover:ring-ink/25"
              }`}
            >
              <span aria-hidden className="h-2 w-2 rounded-full" style={{ background: s.color }} />
              {s.label}
            </button>
          ))}
        </div>
        <p aria-live="polite" className="min-h-[2.75rem] max-w-sm text-pretty text-[0.92rem] leading-snug text-muted">
          {activeSubject.note}
        </p>
      </div>
    </div>
  );
}
