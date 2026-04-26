import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  ornament?: boolean;
}

export function Divider({ className, ornament = false }: Props) {
  return (
    <div
      className={cn(
        "flex items-center justify-center gap-4 py-8",
        className
      )}
    >
      <span className="gold-rule h-px w-full max-w-[20rem] opacity-70" />
      {ornament && (
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          aria-hidden="true"
          className="shrink-0 text-magnus"
        >
          <path
            d="M9 1 L17 9 L9 17 L1 9 Z"
            stroke="currentColor"
            strokeWidth="0.75"
            fill="none"
          />
          <circle cx="9" cy="9" r="1.5" fill="currentColor" />
        </svg>
      )}
      <span className="gold-rule h-px w-full max-w-[20rem] opacity-70" />
    </div>
  );
}
