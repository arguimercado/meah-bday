const SPARKLES: [number, number, number][] = [
  [30, 40, 0.9],
  [140, 25, 0.6],
  [250, 70, 1.1],
  [80, 130, 0.5],
  [200, 150, 0.8],
  [40, 220, 1],
  [150, 250, 0.6],
  [270, 210, 0.5],
  [230, 280, 0.7],
];

const DOTS: [number, number, number][] = [
  [60, 80, 1.8],
  [100, 20, 1.4],
  [180, 90, 2.2],
  [290, 30, 1.5],
  [20, 160, 2],
  [130, 110, 1.4],
  [260, 140, 1.8],
  [170, 200, 1.5],
  [70, 270, 2],
  [210, 240, 1.4],
  [290, 280, 1.8],
  [110, 190, 1.2],
];

const SPARKLE_PATH = "M0 -10 L2 -2 L10 0 L2 2 L0 10 L-2 2 L-10 0 L-2 -2Z";

/**
 * Decorative night sky: a repeating star pattern (so it covers phones and
 * wide desktops alike), soft clouds, a glowing moon and optional butterflies.
 */
export function SkyBackground({ butterflies = true }: { butterflies?: boolean }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-[10%] top-[20%] h-44 w-[70%] rounded-full bg-white/10 blur-[40px]" />
      <div className="absolute -right-[15%] top-[58%] h-56 w-[75%] rounded-full bg-white/[0.08] blur-[44px]" />

      <svg width="100%" height="100%" className="absolute inset-0">
        <defs>
          <pattern id="sky-stars" width="300" height="300" patternUnits="userSpaceOnUse">
            <g fill="#FFF3B0">
              {SPARKLES.map(([x, y, s]) => (
                <path key={`${x}-${y}`} transform={`translate(${x} ${y}) scale(${s})`} d={SPARKLE_PATH} />
              ))}
            </g>
            <g fill="#FFFFFF" opacity="0.85">
              {DOTS.map(([x, y, r]) => (
                <circle key={`${x}-${y}`} cx={x} cy={y} r={r} />
              ))}
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#sky-stars)" className="twinkle" />
      </svg>

      <svg
        viewBox="0 0 100 100"
        className="absolute right-2 top-2 size-14 drop-shadow-[0_0_18px_rgba(255,240,168,0.7)] sm:right-[2%] sm:top-1 sm:size-20"
      >
        <path d="M58 8 A42 42 0 1 0 92 72 A34 34 0 1 1 58 8Z" fill="#FFF0A8" />
      </svg>

      {butterflies && (
        <svg width="150" height="130" viewBox="0 0 150 130" className="float absolute bottom-6 left-[2%] hidden sm:block">
          <g transform="translate(20 10) rotate(-15 50 50)">
            <path d="M50 50 C30 18 4 24 12 46 C16 56 36 56 50 52Z" fill="#F2B8E0" stroke="#1B1325" strokeWidth="2.5" />
            <path d="M50 54 C36 60 22 76 32 84 C40 90 48 72 50 58Z" fill="#D58BC4" stroke="#1B1325" strokeWidth="2.5" />
            <path d="M50 50 C70 18 96 24 88 46 C84 56 64 56 50 52Z" fill="#F2B8E0" stroke="#1B1325" strokeWidth="2.5" />
            <path d="M50 54 C64 60 78 76 68 84 C60 90 52 72 50 58Z" fill="#D58BC4" stroke="#1B1325" strokeWidth="2.5" />
            <path d="M50 44 L50 70" stroke="#1B1325" strokeWidth="4" strokeLinecap="round" />
          </g>
          <g fill="#FFFFFF">
            <circle cx="40" cy="104" r="2" />
            <circle cx="28" cy="116" r="1.5" />
            <circle cx="52" cy="122" r="1.8" />
            <circle cx="18" cy="96" r="1.2" />
          </g>
        </svg>
      )}
    </div>
  );
}
