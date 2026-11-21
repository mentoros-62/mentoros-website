import { MotionConfig } from "motion/react";
import { Nav } from "./components/Nav";
import { Hero } from "./sections/Hero";
import { Problem } from "./sections/Problem";
import { Mentor } from "./sections/Mentor";
import { RevisionStory } from "./sections/RevisionStory";
import { HowItWorks } from "./sections/HowItWorks";
import { ConceptGraph } from "./sections/ConceptGraph";
import { Growth } from "./sections/Growth";
import { Audiences } from "./sections/Audiences";
import { Vision } from "./sections/Vision";
import { EarlyAccess } from "./sections/EarlyAccess";
import { Footer } from "./sections/Footer";

export default function App() {
  return (
    // reducedMotion="user": Motion skips transform/layout animations when the OS asks for reduced motion.
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-ink px-4 py-2 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <Problem />
        <Mentor />
        <RevisionStory />
        <HowItWorks />
        <ConceptGraph />
        <Growth />
        <Audiences />
        <Vision />
        <EarlyAccess />
      </main>
      <Footer />
    </MotionConfig>
  );
}
