import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  // Base styles with premium transitions
  // Disabled opacity increased from 50 to 60 for better legibility while still appearing disabled
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold ring-offset-background transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:text-current select-none",
  {
    variants: {
      variant: {
        // Primary CTA - Gold accent with dark text for WCAG AA contrast (4.5:1+)
        default:
          "bg-[#C9A962] text-[#1a1a1a] font-semibold shadow-md hover:bg-[#b89952] hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] active:shadow-sm",

        // Primary Dark - Deep charcoal with white text for excellent contrast
        primary:
          "bg-deep-charcoal text-white font-semibold shadow-md hover:bg-[#1f1c21] hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] active:shadow-sm",

        // Secondary - Darker warm stone (#5a5147) for better contrast with white text
        secondary:
          "bg-[#5a5147] text-white font-semibold shadow-md hover:bg-[#4a4239] hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] active:shadow-sm",

        // Outline - Darker text color (#4a4239) for better readability on light backgrounds
        outline:
          "border-2 border-[#5a5147]/40 bg-transparent text-[#4a4239] hover:border-[#5a5147] hover:bg-[#5a5147]/10 active:bg-[#5a5147]/15",

        // Outline Light - For dark backgrounds with better contrast
        "outline-light":
          "border-2 border-white/50 bg-white/15 text-white backdrop-blur-sm hover:border-white/70 hover:bg-white/25 active:bg-white/30",

        // Ghost - Darker text (#4a4239) for better contrast on light backgrounds
        ghost:
          "text-[#4a4239] hover:bg-[#5a5147]/15 hover:text-[#3a3229] active:bg-[#5a5147]/20",

        // Ghost Light - For dark backgrounds with full opacity text
        "ghost-light":
          "text-white hover:bg-white/15 hover:text-white active:bg-white/20",

        // Link - Darker color for readability, maintains full contrast on hover
        link:
          "text-[#4a4239] underline-offset-4 hover:underline hover:text-[#3a3229]",

        // Destructive - Ensure white text has sufficient contrast with red background
        destructive:
          "bg-[#c45c3e] text-white shadow-md hover:bg-[#b04d30] hover:shadow-lg active:scale-[0.98]",

        // Success - Dark text on gold for better contrast than white on gold
        success:
          "bg-[#4a7c59] text-white font-semibold shadow-md hover:bg-[#3d6849] hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]",

        // Premium - Gold with dark text for excellent contrast
        premium:
          "bg-[#C9A962] text-[#1a1a1a] font-semibold shadow-lg hover:bg-[#b89952] hover:shadow-xl hover:shadow-[#C9A962]/20 hover:scale-[1.02] active:scale-[0.98] active:shadow-md",

        // Glass - Dark text on light glass for readability
        glass:
          "bg-white/85 backdrop-blur-md border border-white/40 text-[#1a1a1a] shadow-lg hover:bg-white/95 hover:shadow-xl active:bg-white",
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
  ({ className, variant, size, asChild = false, isLoading = false, loadingText, children, disabled, "aria-label": ariaLabel, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const isDisabled = disabled || isLoading;

    // Determine if this is an icon-only button (no text children)
    const isIconOnly = size === "icon" || size === "icon-sm" || size === "icon-lg";

    // Loading state content
    const content = isLoading ? (
      <>
        <Loader2 className="animate-spin" aria-hidden="true" />
        <span className={loadingText ? undefined : "sr-only"}>
          {loadingText || "Loading..."}
        </span>
        {!loadingText && children}
      </>
    ) : (
      children
    );

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isDisabled}
        aria-disabled={isDisabled || undefined}
        aria-busy={isLoading || undefined}
        aria-label={ariaLabel || (isIconOnly && typeof children === "string" ? children : undefined)}
        {...props}
      >
        {content}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
