import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

export function Monogram({ className }: Props) {
  return (
    <span
      aria-label="Carlos Mesquita"
      className={cn(
        "group relative inline-flex items-center justify-center",
        className
      )}
    >
      <svg
        viewBox="0 0 120 120"
        fill="none"
        className="h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="mono-gold" x1="0" y1="0" x2="120" y2="120">
            <stop offset="0%" stopColor="#E4CB88" />
            <stop offset="50%" stopColor="#C6A75E" />
            <stop offset="100%" stopColor="#A8842C" />
          </linearGradient>
        </defs>
        <circle
          cx="60"
          cy="60"
          r="56"
          stroke="url(#mono-gold)"
          strokeWidth="0.75"
          opacity="0.6"
        />
        <circle
          cx="60"
          cy="60"
          r="48"
          stroke="url(#mono-gold)"
          strokeWidth="0.5"
          opacity="0.35"
        />
        <g
          stroke="url(#mono-gold)"
          strokeWidth="0.75"
          strokeLinecap="round"
          opacity="0.6"
        >
          <line x1="60" y1="14" x2="60" y2="22" />
          <line x1="60" y1="98" x2="60" y2="106" />
          <line x1="14" y1="60" x2="22" y2="60" />
          <line x1="98" y1="60" x2="106" y2="60" />
        </g>
        <text
          x="60"
          y="72"
          textAnchor="middle"
          fontSize="42"
          fontFamily="ui-serif, Georgia, serif"
          fill="url(#mono-gold)"
          fontWeight="700"
          letterSpacing="-2"
        >
          cm
        </text>
      </svg>
    </span>
  );
}
