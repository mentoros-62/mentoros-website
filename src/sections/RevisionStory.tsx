import { ExternalLink, Sparkles } from "lucide-react";
import { Container, Reveal, SectionHeader } from "../components/ui";

export function RevisionStory() {
  const storyUrl = `${import.meta.env.BASE_URL}story.html`;

  return (
    <section id="story" aria-labelledby="story-title" className="border-t border-line bg-[#f8fafc] py-24 sm:py-32">
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeader
            id="story-title"
            eyebrow="Interactive revision story"
            title="Same student, two revision journeys."
            lede="Arjun has three weak physics chapters. In Act 1 he gets a pile of 100 questions and no plan. In Act 2 the MentorOS mentor voice finds the concept those chapters share and fixes that first."
          />
          <div className="shrink-0 pb-2">
            <a
              href={storyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-line bg-white px-4 py-2.5 text-sm font-semibold text-ink shadow-sm transition hover:border-violet hover:text-violet"
            >
              <Sparkles className="h-4 w-4 text-violet" />
              <span>Open in full tab</span>
              <ExternalLink className="h-3.5 w-3.5 opacity-60" />
            </a>
          </div>
        </div>

        <Reveal className="mt-12" delay={0.1}>
          <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-xl ring-1 ring-black/5">
            <div className="flex items-center justify-between border-b border-line bg-[#f1f5f9] px-4 py-3 text-xs text-muted">
              <div className="flex items-center gap-2">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-red-400" />
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-amber-400" />
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-400" />
                <span className="ml-2 font-mono text-[11px] font-medium text-slate-600">MentorOS Notebook Player · Live Storyboard</span>
              </div>
              <span className="hidden sm:inline text-[11px]">Interactive SVG & Line-drawn animations</span>
            </div>
            <iframe
              src={storyUrl}
              title="MentorOS Revision Story"
              className="h-[760px] w-full border-0 sm:h-[860px] lg:h-[960px]"
              loading="lazy"
            />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
