type SparkleProps = {
  size?: number;
  color?: string;
  className?: string;
};

/** Four-point sparkle star used as decoration. */
export function Sparkle({ size = 16, color = "#FFD34E", className }: SparkleProps) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 20 20"
      className={className}
    >
      <path d="M10 0 L12 8 L20 10 L12 12 L10 20 L8 12 L0 10 L8 8Z" fill={color} />
    </svg>
  );
}
