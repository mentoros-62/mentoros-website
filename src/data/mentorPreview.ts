/**
 * Static, synthetic data for the "Meet your AI mentor" simulated preview.
 * No real student work: this is an illustrative Class 11 projectile-motion problem.
 */

export const problem = {
  label: "Class 11 · Physics · Projectile motion",
  statement:
    "A ball is thrown with speed u at an angle θ above the ground. Starting from the vertical velocity, find its height y at time t.",
};

/** Handwritten lines. `parts` lets one fragment be marked as the slip. */
export const workingLines: { parts: { text: string; slip?: boolean; sub?: boolean }[] }[] = [
  { parts: [{ text: "v" }, { text: "y", sub: true }, { text: " = dy/dt = u sin θ − g t" }] },
  { parts: [{ text: "y = ∫ (u sin θ − g t) dt" }] },
  { parts: [{ text: "y = u sin θ · t − " }, { text: "g t", slip: true }] },
];

export const readingConfirmation = "y = u sin θ · t − g t";

export const mentorMessage = "You're close. What happens to the exponent when you integrate this expression?";

export const conceptChain = ["Physics", "Calculus", "Integration"] as const;

/** Intervention ladder from docs/product/intervention-policy.md (L0–L7). */
export const ladder = [
  "Silent",
  "Flag",
  "Question",
  "Pointer",
  "Hint",
  "Method",
  "Worked step",
  "Drill",
] as const;

export const chosenLevel = 2;

export const ladderReason =
  "Strong on this topic, first slip on this step, so it starts with a question instead of the answer.";

export const mastery = {
  skill: "Integration · power rule",
  label: "Developing",
  value: 0.46,
};
