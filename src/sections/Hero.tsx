import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ButtonLink, Container } from "../components/ui";
import { KnowledgeUniverse } from "../components/KnowledgeUniverse";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const reduce = useReducedMotion();
  const visualY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 70]);
  const copyY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -30]);

  return (
    <section ref={ref} id="top" aria-labelledby="hero-title" className="relative overflow-hidden pb-20 pt-28 sm:pt-32 lg:pb-28">
      {/* soft light from behind the universe, nothing more */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-10 h-[46rem] w-[46rem] rounded-full opacity-70 blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(109,93,252,0.16), rgba(61,90,254,0.06) 55%, transparent)" }}
      />
      <Container className="relative grid items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-8">
        <motion.div style={{ y: copyY }}>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-2.5 rounded-full bg-white px-3.5 py-1.5 text-[0.82rem] font-medium text-ink shadow-[0_1px_0_rgba(10,16,48,0.04)] ring-1 ring-ink/10"
          >
            <span className="relative flex h-2 w-2">
              <span aria-hidden className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-teal/60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-teal" />
            </span>
            Building the future of personalized learning
          </motion.div>

          <motion.h1
            id="hero-title"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease }}
            className="mt-7 text-balance text-[2.6rem] font-semibold leading-[1.03] sm:text-6xl lg:text-[3.9rem] xl:text-[4.25rem]"
          >
            Every mind learns differently. <span className="grad-text">Your mentor should too.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.18, ease }}
            className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted sm:text-[1.2rem]"
          >
            MentorOS is a personal AI learning companion we&rsquo;re building. It follows how you work through a problem,
            notices the exact step where you got stuck, and gives just enough help for you to find the answer
            yourself.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.28, ease }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <ButtonLink href="#mentor">Explore MentorOS</ButtonLink>
            <ButtonLink href="#early-access" variant="secondary">
              Partner With Us
            </ButtonLink>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: visualY }}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.15, ease }}
        >
          <KnowledgeUniverse progress={scrollYProgress} />
        </motion.div>
      </Container>
    </section>
  );
}
