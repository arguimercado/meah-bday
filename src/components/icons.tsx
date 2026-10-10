type IconProps = { className?: string };

const base = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true as const,
};

export function CalendarIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="3" y="5" width="18" height="16" rx="3" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </svg>
  );
}

export function PinIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  );
}

export function PoolIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M2 16c2 0 2-1.5 4-1.5s2 1.5 4 1.5 2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 4-1.5M2 20c2 0 2-1.5 4-1.5s2 1.5 4 1.5 2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 4-1.5" />
      <path d="M8 12V5a2 2 0 0 1 4 0M16 12V5a2 2 0 0 0-4 0M8 8h8" />
    </svg>
  );
}

export function ArrowRightIcon({ className }: IconProps) {
  return (
    <svg {...base} strokeWidth={2.6} className={className}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function ArrowLeftIcon({ className }: IconProps) {
  return (
    <svg {...base} strokeWidth={2.4} className={className}>
      <path d="M19 12H5M11 6l-6 6 6 6" />
    </svg>
  );
}

export function MinusIcon({ className }: IconProps) {
  return (
    <svg {...base} strokeWidth={2.8} className={className}>
      <path d="M5 12h14" />
    </svg>
  );
}

export function PlusIcon({ className }: IconProps) {
  return (
    <svg {...base} strokeWidth={2.8} className={className}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function MoonIcon({ className }: IconProps) {
  return (
    <svg {...base} strokeWidth={2.4} className={className}>
      <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" />
    </svg>
  );
}

export function SunIcon({ className }: IconProps) {
  return (
    <svg {...base} strokeWidth={2.4} className={className}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}
