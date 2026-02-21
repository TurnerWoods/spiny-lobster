import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  // Base styles with premium transitions
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold ring-offset-background transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:shrink-0 select-none",
  {
    variants: {
      variant: {
        // Primary CTA - Gold accent for premium feel
        default:
          "bg-[#C9A962] text-deep-charcoal font-semibold shadow-md hover:bg-[#d4b872] hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] active:shadow-sm",

        // Primary Dark - Deep charcoal for contrast
        primary:
          "bg-deep-charcoal text-pure-white font-semibold shadow-md hover:bg-deep-charcoal/90 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] active:shadow-sm",

        // Secondary - Warm stone for softer actions
        secondary:
          "bg-warm-stone text-pure-white font-semibold shadow-md hover:bg-warm-stone/90 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] active:shadow-sm",

        // Outline - Elegant bordered style
        outline:
          "border-2 border-warm-stone/30 bg-transparent text-warm-stone hover:border-warm-stone hover:bg-warm-stone/5 active:bg-warm-stone/10",

        // Outline Light - For dark backgrounds
        "outline-light":
          "border-2 border-pure-white/40 bg-pure-white/10 text-pure-white backdrop-blur-sm hover:border-pure-white/60 hover:bg-pure-white/20 active:bg-pure-white/25",

        // Ghost - Minimal, text-only feel
        ghost:
          "text-warm-stone hover:bg-warm-stone/10 hover:text-warm-stone active:bg-warm-stone/15",

        // Ghost Light - For dark backgrounds
        "ghost-light":
          "text-pure-white/90 hover:bg-pure-white/10 hover:text-pure-white active:bg-pure-white/15",

        // Link - Underlined text style
        link:
          "text-warm-stone underline-offset-4 hover:underline hover:text-warm-stone/80",

        // Destructive - For dangerous actions
        destructive:
          "bg-destructive text-destructive-foreground shadow-md hover:bg-destructive/90 hover:shadow-lg active:scale-[0.98]",

        // Success - For positive actions
        success:
          "bg-success text-pure-white font-semibold shadow-md hover:bg-success/90 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]",

        // Premium - Gold with glow effect for hero CTAs
        premium:
          "bg-[#C9A962] text-deep-charcoal font-semibold shadow-lg hover:bg-[#d4b872] hover:shadow-xl hover:shadow-[#C9A962]/20 hover:scale-[1.02] active:scale-[0.98] active:shadow-md",

        // Glass - Glassmorphic style
        glass:
          "bg-pure-white/80 backdrop-blur-md border border-pure-white/30 text-rich-black shadow-lg hover:bg-pure-white/90 hover:shadow-xl active:bg-pure-white",
      },
      size: {
        default: "h-10 px-5 py-2 text-sm [&_svg]:size-4",
        sm: "h-9 px-4 py-2 text-xs [&_svg]:size-3.5",
        lg: "h-12 px-8 py-3 text-base [&_svg]:size-5",
        xl: "h-14 px-10 py-4 text-lg [&_svg]:size-5",
        icon: "h-10 w-10 [&_svg]:size-5",
        "icon-sm": "h-8 w-8 [&_svg]:size-4",
        "icon-lg": "h-12 w-12 [&_svg]:size-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  loadingText?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, isLoading = false, loadingText, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    // Handle loading state
    if (isLoading) {
      return (
        <button
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          disabled
          {...props}
        >
          <Loader2 className="animate-spin" />
          {loadingText || children}
        </button>
      );
    }

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled}
        {...props}
      >
        {children}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
