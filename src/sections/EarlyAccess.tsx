import { Building2, Sparkles } from "lucide-react";
import { ctaTarget, site } from "../config/site";
import { Container, CtaLink, Reveal, SectionHeader } from "../components/ui";

export function EarlyAccess() {
  const pilot = ctaTarget("pilot");
  const early = ctaTarget("early-access");

  return (
    <section id="early-access" aria-labelledby="early-title" className="py-24 sm:py-32">
      <Container>
        <SectionHeader
          id="early-title"
          eyebrow="Early access and partners"
          title="The next chapter of learning starts here."
          lede="We're building the first version of MentorOS now, together with a small number of institutes. If you'd like to shape it, we'd love to hear from you."
          align="center"
        />

        <div className="mx-auto mt-14 grid max-w-5xl gap-5 md:grid-cols-2">
          <Reveal>
            <article className="flex h-full flex-col rounded-[2rem] bg-ink p-8 text-white sm:p-10">
              <Building2 aria-hidden className="h-7 w-7 text-[#9fb0ff]" strokeWidth={1.6} />
              <h3 className="mt-6 text-2xl font-semibold text-white">For institutes and schools</h3>
              <p className="mt-3 flex-1 text-pretty leading-relaxed text-white/70">
                Run an early pilot with one batch. We set it up around your syllabus and methods, and you help us decide
                what matters in the classroom.
              </p>
              <CtaLink kind="pilot" variant="light" className="mt-8 self-start">
                Become a Pilot Partner
              </CtaLink>
              <p className="mt-3 text-[0.8rem] text-white/50">{pilot.hint}</p>
            </article>
          </Reveal>
          <Reveal delay={0.08}>
            <article className="flex h-full flex-col rounded-[2rem] bg-white p-8 ring-1 ring-line sm:p-10">
              <Sparkles aria-hidden className="h-7 w-7 text-violet" strokeWidth={1.6} />
              <h3 className="mt-6 text-2xl font-semibold">For students, parents and teachers</h3>
              <p className="mt-3 flex-1 text-pretty leading-relaxed text-muted">
                Join the early access list. We'll write when there is something you can try, and nothing else.
              </p>
              <CtaLink kind="early-access" className="mt-8 self-start">
                Join the Early Access List
              </CtaLink>
              <p className="mt-3 text-[0.8rem] text-muted">{early.hint}</p>
            </article>
          </Reveal>
        </div>

        <p className="mx-auto mt-8 max-w-xl text-center text-[0.85rem] text-muted">
          Prefer to write directly? Email{" "}
          <a className="font-medium text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink" href={`mailto:${site.contactEmail}`}>
            {site.contactEmail}
          </a>
          .
        </p>
      </Container>
    </section>
  );
}
