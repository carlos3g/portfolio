import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-sm border font-mono text-[10px] uppercase tracking-[0.2em] transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-magnus/30 bg-magnus/5 text-magnus px-2.5 py-1",
        solid:
          "border-transparent bg-magnus text-obsidian px-2.5 py-1",
        outline:
          "border-frost/30 text-frost px-2.5 py-1 hover:border-magnus/40 hover:text-magnus",
        crimson:
          "border-crimson/40 bg-crimson/10 text-crimson/90 px-2.5 py-1",
        steel:
          "border-steel/60 bg-steel/20 text-silver px-2.5 py-1",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
