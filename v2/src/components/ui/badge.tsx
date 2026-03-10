import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        // Default: Darker text for better contrast on light background (WCAG AA compliant)
        default: "border-warm-stone/30 bg-warm-stone/10 text-foreground hover:bg-warm-stone/20",
        // Secondary: Uses system colors with sufficient contrast
        secondary: "border-secondary-foreground/20 bg-secondary text-secondary-foreground hover:bg-secondary/80",
        // Destructive: Dark text on warm background for readability
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        // Outline: Darker border and text for clear visibility
        outline: "border-foreground/40 text-foreground bg-transparent",
        // Glass: Dark text on frosted background for legibility
        glass: "border-foreground/20 bg-pure-white/70 text-foreground backdrop-blur-md dark:bg-pure-white/20 dark:text-pure-white dark:border-pure-white/30",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
