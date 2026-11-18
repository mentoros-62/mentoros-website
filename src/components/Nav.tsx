import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { navLinks } from "../data/nav";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-ink/[0.06] bg-paper/80 backdrop-blur-xl backdrop-saturate-150"
          : "border-b border-transparent"
      }`}
    >
      <nav aria-label="Main" className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="rounded-lg" aria-label="MentorOS, back to top">
          <Logo />
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-full px-3.5 py-2 text-[0.92rem] text-body transition-colors hover:bg-ink/[0.05] hover:text-ink"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="#early-access"
            className="hidden min-h-10 items-center rounded-full bg-ink px-4.5 py-2 text-[0.9rem] font-medium text-white transition-colors hover:bg-ink-3 sm:inline-flex"
          >
            Partner with us
          </a>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink hover:bg-ink/[0.06] lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden lg:hidden"
          >
            <ul className="mx-auto max-w-6xl px-5 pb-6 pt-2 sm:px-8">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-3 py-3 font-display text-lg text-ink hover:bg-ink/[0.05]"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="mt-3">
                <a
                  href="#early-access"
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 items-center justify-center rounded-full bg-ink px-5 py-3 font-medium text-white"
                >
                  Partner with us
                </a>
              </li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
