interface LogoMarkProps {
  className?: string;
  title?: string;
}

/** The MentorOS mark: a mind (core) with three linked ideas growing out of it. */
export function LogoMark({ className = "h-8 w-8", title }: LogoMarkProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} role={title ? "img" : undefined} aria-hidden={title ? undefined : true}>
      {title ? <title>{title}</title> : null}
      <defs>
        <linearGradient id="mo-mark-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3d5afe" />
          <stop offset="0.6" stopColor="#6d5dfc" />
          <stop offset="1" stopColor="#8b7bff" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="9" fill="url(#mo-mark-bg)" />
      <g stroke="#fff" strokeWidth="1.6" strokeLinecap="round" opacity="0.85">
        <path d="M14 18 L8.5 11.5" />
        <path d="M14 18 L23.5 9.5" />
        <path d="M14 18 L22 23.5" />
      </g>
      <circle cx="14" cy="18" r="4.2" fill="#fff" />
      <circle cx="8.5" cy="11.5" r="2" fill="#fff" />
      <circle cx="23.5" cy="9.5" r="2.4" fill="#7ff0dc" />
      <circle cx="22" cy="23.5" r="1.7" fill="#fff" />
    </svg>
  );
}

export function Logo({ className = "", dark = false }: { className?: string; dark?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className="h-8 w-8 shrink-0" />
      <span className={`font-display text-[1.2rem] font-semibold tracking-tight ${dark ? "text-white" : "text-ink"}`}>
        MentorOS
      </span>
    </span>
  );
}
