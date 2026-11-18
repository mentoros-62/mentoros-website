import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Container, Eyebrow, Reveal } from "../components/ui";

/** A sparse constellation that slowly connects as the visitor scrolls: many minds, linked. */
const stars: [number, number][] = [
  [80, 120], [190, 70], [300, 150], [420, 90], [540, 160], [660, 80], [780, 140], [900, 70], [1010, 130], [1120, 90],
];
const constellation: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [2, 4], [6, 8],
];

export function Vision() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const reduce = useReducedMotion();
  const draw = useTransform(scrollYProgress, [0.15, 0.55], reduce ? [1, 1] : [0, 1]);
  const glowY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [80, -80]);

  return (
    <section
      ref={ref}
      id="vision"
      aria-labelledby="vision-title"
      className="relative isolate overflow-hidden bg-ink py-28 text-white sm:py-40"
    >
      {/* horizon light */}
      <motion.div
        aria-hidden
        style={{ y: glowY }}
        className="pointer-events-none absolute left-1/2 top-[55%] -z-10 h-[60rem] w-[120rem] -translate-x-1/2 rounded-[50%]"
      >
        <div
          className="h-full w-full rounded-[50%]"
          style={{
            background:
              "radial-gradient(closest-side, rgba(109,93,252,0.42), rgba(61,90,254,0.18) 45%, rgba(15,163,154,0.06) 70%, transparent)",
          }}
        />
      </motion.div>

      <svg aria-hidden viewBox="0 0 1200 220" className="pointer-events-none absolute inset-x-0 top-6 -z-10 h-auto w-full opacity-70">
        {constellation.map(([a, b]) => (
          <motion.line
            key={`${a}-${b}`}
            x1={stars[a][0]}
            y1={stars[a][1]}
            x2={stars[b][0]}
            y2={stars[b][1]}
            stroke="#9fb0ff"
            strokeOpacity="0.35"
            strokeWidth="1"
            style={{ pathLength: draw }}
          />
        ))}
        {stars.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 2.6 : 1.8} fill="#ffffff" opacity={i % 3 === 0 ? 0.9 : 0.55} />
        ))}
      </svg>

      <Container className="relative text-center">
        <Reveal>
          <Eyebrow dark>Our vision</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 id="vision-title" className="mx-auto mt-6 max-w-4xl text-balance text-[2.4rem] font-semibold leading-[1.05] text-white sm:text-6xl lg:text-7xl">
            A world where potential is never limited by access to guidance.
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mx-auto mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-[#b9c1dd]">
            Today, a patient mentor who watches how you think is a privilege for a few. We want every curious student to
            have one: in any city, at any desk, at the hour they actually study. We are starting with coaching institutes
            in India, and building for every learner after that.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
