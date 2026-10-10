type Variant = "standing" | "cheer" | "face";

type Props = {
  variant?: Variant;
  className?: string;
  /** Leave empty to treat the drawing as decoration. */
  label?: string;
};

const SKIN = "#EDB993";
const LIMB = "#E2A985";
const HAIR = "#1F1A24";

const FLOWERS: [number, number, number, number][] = [
  [86, 146, 3.5, 4.5],
  [114, 148, 3.5, 4.5],
  [98, 182, 3.5, 4.5],
  [74, 190, 3.5, 4.5],
  [124, 186, 3.5, 4.5],
  [86, 202, 3.5, 4.5],
  [114, 203, 3.5, 4.5],
  [62, 201, 3.5, 4.5],
  [138, 199, 3.5, 4.5],
  [110, 178, 3, 4],
  [84, 176, 3, 4],
];

function Head({ happy }: { happy: boolean }) {
  return (
    <>
      <ellipse cx="100" cy="88" rx="46" ry="42" fill={SKIN} />
      <path
        d="M54 86 Q52 44 100 40 Q148 44 146 86 Q140 66 126 70 Q118 56 106 66 Q96 54 86 66 Q72 60 54 86Z"
        fill={HAIR}
      />
      {happy ? (
        <>
          <path d="M71 99 Q80 89 89 99" stroke="#2A1A14" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <path d="M111 99 Q120 89 129 99" stroke="#2A1A14" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <path d="M93 111 Q100 123 107 111 Z" fill="#7A3B2E" />
        </>
      ) : (
        <>
          <ellipse cx="80" cy="97" rx="9" ry="12" fill="#2A1A14" />
          <ellipse cx="120" cy="97" rx="9" ry="12" fill="#2A1A14" />
          <circle cx="83" cy="92" r="3.6" fill="#FFFFFF" />
          <circle cx="123" cy="92" r="3.6" fill="#FFFFFF" />
          <circle cx="77" cy="102" r="1.6" fill="#FFFFFF" />
          <circle cx="117" cy="102" r="1.6" fill="#FFFFFF" />
          <path d="M70 87 Q80 81 90 87" stroke={HAIR} strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M110 87 Q120 81 130 87" stroke={HAIR} strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M95 114 Q100 119 105 114" stroke="#7A3B2E" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </>
      )}
      <ellipse cx="66" cy="111" rx="8" ry="4.5" fill="#F27AAE" opacity="0.65" />
      <ellipse cx="134" cy="111" rx="8" ry="4.5" fill="#F27AAE" opacity="0.65" />
    </>
  );
}

function HairBack() {
  return (
    <>
      <path d="M44 92 Q40 40 100 32 Q160 40 156 92 Q150 128 100 130 Q50 128 44 92Z" fill={HAIR} />
      <ellipse cx="42" cy="66" rx="13" ry="19" fill={HAIR} />
      <ellipse cx="158" cy="66" rx="13" ry="19" fill={HAIR} />
      <circle cx="51" cy="54" r="4.5" fill="#F28C38" />
      <circle cx="149" cy="54" r="4.5" fill="#F28C38" />
    </>
  );
}

/** Original chibi illustration of Darlyn in her flower dress with a pool ring. */
export function ChibiDarlyn({ variant = "standing", className, label }: Props) {
  const a11y = label ? { role: "img", "aria-label": label } : { "aria-hidden": true as const };

  if (variant === "face") {
    return (
      <svg viewBox="24 24 152 112" className={className} {...a11y}>
        <HairBack />
        <Head happy={false} />
      </svg>
    );
  }

  const cheer = variant === "cheer";

  return (
    <svg viewBox="0 0 200 240" className={className} {...a11y}>
      <HairBack />
      {/* legs, socks, sneakers */}
      <rect x="84" y="200" width="10" height="22" rx="4" fill={LIMB} />
      <rect x="106" y="200" width="10" height="22" rx="4" fill={LIMB} />
      <rect x="84" y="213" width="10" height="9" fill="#F27AAE" />
      <rect x="106" y="213" width="10" height="9" fill="#F27AAE" />
      <ellipse cx="88" cy="226" rx="12" ry="7" fill="#FFFFFF" stroke="#1B1325" strokeWidth="2" />
      <ellipse cx="112" cy="226" rx="12" ry="7" fill="#FFFFFF" stroke="#1B1325" strokeWidth="2" />

      {/* left arm: down, or waving */}
      {cheer ? (
        <>
          <path d="M76 140 Q58 128 52 108" stroke={LIMB} strokeWidth="11" strokeLinecap="round" fill="none" />
          <circle cx="51" cy="104" r="6.5" fill={LIMB} />
        </>
      ) : (
        <path d="M76 140 Q62 156 66 178" stroke={LIMB} strokeWidth="11" strokeLinecap="round" fill="none" />
      )}

      {/* neck + dress */}
      <rect x="93" y="120" width="14" height="14" fill="#D99A76" />
      <path d="M76 132 L124 132 L148 206 Q100 218 52 206 Z" fill="#2B2A5C" />
      <path d="M71 162 L129 162 L131 170 L69 170 Z" fill="#20204A" />
      <g fill="#F0569A">
        {FLOWERS.map(([cx, cy, rx, ry]) => (
          <ellipse key={`${cx}-${cy}`} cx={cx} cy={cy} rx={rx} ry={ry} />
        ))}
      </g>
      <path
        d="M78 132 Q84 148 100 138 Q116 148 122 132 Q100 126 78 132Z"
        fill="#FFFFFF"
        stroke="#1B1325"
        strokeWidth="1.5"
      />
      <rect x="97" y="139" width="6" height="23" fill="#FFFFFF" />
      <circle cx="100" cy="147" r="2" fill="#F0569A" />
      <circle cx="100" cy="155" r="2" fill="#F0569A" />

      <Head happy={cheer} />

      {/* right arm holding the pool ring */}
      <path d="M124 140 Q140 152 146 166" stroke={LIMB} strokeWidth="11" strokeLinecap="round" fill="none" />
      <circle cx="160" cy="182" r="24" fill="none" stroke="#C9306F" strokeWidth="13" />
      <circle cx="160" cy="182" r="24" fill="none" stroke="#FFFFFF" strokeWidth="13" strokeDasharray="10 27.7" />
      <circle cx="147" cy="168" r="6.5" fill={LIMB} />

      <path
        d="M172 18 L175 26 L183 27 L177 32 L179 40 L172 36 L165 40 L167 32 L161 27 L169 26 Z"
        fill="#FFD34E"
      />
      {cheer && <path d="M30 70 L32 76 L38 78 L32 80 L30 86 L28 80 L22 78 L28 76Z" fill="#FFD34E" />}
    </svg>
  );
}
