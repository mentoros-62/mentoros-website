import { motion, useReducedMotion } from "motion/react";
import { Container, Reveal, SectionHeader } from "../components/ui";

const points = [
  {
    title: "The pace is set for the room.",
    body: "A lecture moves at one speed. Some students are bored, some are lost, and the class moves on either way.",
  },
  {
    title: "The working goes unseen.",
    body: "Most practice happens alone, in the evening. Nobody watches the step where the reasoning went wrong.",
  },
  {
    title: "A mark says what, not why.",
    body: "A wrong final answer gets a whole chapter labelled “weak”, when the real gap was one small idea underneath.",
  },
];

/** One lecture, many learners: the paths that drift away are the ones nobody sees. */
function DivergingPaths() {
  const reduce = useReducedMotion();
  const ys = [40, 70, 100, 130, 160, 190, 220, 250, 280];
  const drift = new Set([1, 5, 7]);
  return (
    <svg viewBox="0 0 520 320" className="h-auto w-full" role="img" aria-label="One lesson fans out to many learners; a few paths drift away and fade, unnoticed.">
      <circle cx="40" cy="160" r="9" fill="#0a1030" />
      {ys.map((y, i) => {
        const lost = drift.has(i);
        const endY = lost ? y + (i % 2 ? 46 : -46) : y;
        const d = lost
          ? `M40 160 C 150 160, 180 ${y}, 290 ${y} S 400 ${endY}, 440 ${endY}`
          : `M40 160 C 150 160, 180 ${y}, 290 ${y} L 480 ${y}`;
        return (
          <g key={y}>
            <motion.path
              d={d}
              fill="none"
              stroke={lost ? "#f5a524" : "#1c2660"}
              strokeOpacity={lost ? 0.9 : 0.28}
              strokeWidth={lost ? 2 : 1.5}
              initial={reduce ? false : { pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1.6, delay: 0.1 + i * 0.06, ease: "easeInOut" }}
            />
            {lost ? (
              <motion.g
                initial={reduce ? false : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.6 + i * 0.06 }}
              >
                <circle cx="446" cy={endY} r="11" fill="#fff1d6" stroke="#f5a524" strokeWidth="1.5" />
                <text x="446" y={endY + 5} textAnchor="middle" fontSize="14" fontWeight="700" fill="#8a5a00" className="font-display">
                  ?
                </text>
              </motion.g>
            ) : (
              <circle cx="480" cy={y} r="4" fill="#1c2660" opacity="0.35" />
            )}
          </g>
        );
      })}
      <text x="40" y="196" textAnchor="middle" fontSize="13" fill="#5d6580" className="font-sans">
        one lesson
      </text>
    </svg>
  );
}

export function Problem() {
  return (
    <section id="problem" aria-labelledby="problem-title" className="relative border-t border-line bg-white py-24 sm:py-32">
      <Container>
        <SectionHeader
          id="problem-title"
          eyebrow="The problem"
          title={
            <>
              Education teaches everyone.
              <br className="hidden sm:block" /> <span className="text-muted">But understands very few.</span>
            </>
          }
        />

        <div className="mt-14 grid items-center gap-14 lg:grid-cols-2">
          <ol className="space-y-9">
            {points.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <li className="flex gap-5">
                  <span className="mt-1 font-display text-sm font-semibold text-violet">0{i + 1}</span>
                  <div>
                    <h3 className="text-xl font-semibold">{p.title}</h3>
                    <p className="mt-2 max-w-md text-pretty leading-relaxed text-muted">{p.body}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
          <Reveal delay={0.1}>
            <DivergingPaths />
          </Reveal>
        </div>

        <Reveal className="mt-24 text-center">
          <p className="mx-auto max-w-3xl text-balance font-display text-3xl font-semibold leading-tight text-ink sm:text-5xl">
            What if learning could <span className="grad-text">understand you?</span>
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
