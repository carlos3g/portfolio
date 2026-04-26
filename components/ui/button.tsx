import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm font-mono text-xs uppercase tracking-[0.2em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-magnus disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-magnus text-obsidian hover:bg-magnus/90 shadow-gold-glow hover:shadow-[0_0_50px_-8px_rgba(198,167,94,0.7)]",
        outline:
          "relative border border-magnus/60 bg-transparent text-magnus hover:text-obsidian hover:bg-magnus overflow-hidden",
        ghost:
          "border border-magnus/20 bg-transparent text-ivory hover:border-magnus/60 hover:text-magnus",
        crimson:
          "border border-crimson/60 bg-crimson/10 text-crimson hover:bg-crimson hover:text-ivory",
        link: "text-magnus underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6",
        sm: "h-9 px-4 text-[10px]",
        lg: "h-12 px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
