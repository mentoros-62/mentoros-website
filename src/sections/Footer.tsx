import { site } from "../config/site";
import { navLinks } from "../data/nav";
import { Container } from "../components/ui";
import { Logo } from "../components/Logo";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-white pb-10 pt-16" aria-labelledby="footer-title">
      <h2 id="footer-title" className="sr-only">
        Site footer
      </h2>
      <Container>
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <a href="#top" className="inline-block rounded-lg" aria-label="MentorOS, back to top">
              <Logo />
            </a>
            <p className="mt-4 max-w-xs text-pretty text-[0.95rem] leading-relaxed text-muted">
              A personal AI learning companion, in development. {site.tagline}.
            </p>
          </div>

          <nav aria-label="Footer">
            <h3 className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-ink">Explore</h3>
            <ul className="mt-4 space-y-2.5 text-[0.95rem]">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-muted transition-colors hover:text-ink">
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#early-access" className="text-muted transition-colors hover:text-ink">
                  Early access
                </a>
              </li>
            </ul>
          </nav>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-ink">Contact</h3>
            <ul className="mt-4 space-y-2.5 text-[0.95rem]">
              <li>
                <a href={`mailto:${site.contactEmail}`} className="text-muted transition-colors hover:text-ink">
                  {site.contactEmail}
                </a>
              </li>
              {site.social.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-muted transition-colors hover:text-ink">
                    {s.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col justify-between gap-3 border-t border-line pt-6 text-[0.85rem] text-muted sm:flex-row">
          <p>© {year} MentorOS. All rights reserved.</p>
          <p className="font-display font-medium text-ink">Built for curious minds.</p>
        </div>
      </Container>
    </footer>
  );
}
