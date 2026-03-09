import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const inputVariants = cva(
  "flex w-full rounded-xl border bg-pure-white/60 text-foreground ring-offset-background backdrop-blur-sm file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-warm-gray/60 transition-all duration-200 ease-out focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-warm-stone/20 hover:border-warm-stone/40 focus-visible:border-warm-stone focus-visible:ring-2 focus-visible:ring-warm-stone/20 focus-visible:shadow-[0_0_0_4px_rgba(114,102,88,0.08)]",
        error: "border-red-400 bg-red-50/30 hover:border-red-500 focus-visible:border-red-500 focus-visible:ring-2 focus-visible:ring-red-200 focus-visible:shadow-[0_0_0_4px_rgba(239,68,68,0.08)]",
        success: "border-accent-gold/50 bg-accent-gold/5 hover:border-accent-gold/70 focus-visible:border-accent-gold focus-visible:ring-2 focus-visible:ring-accent-gold/20",
      },
      inputSize: {
        default: "h-12 px-4 py-3 text-base md:h-11 md:py-2.5 md:text-sm",
        sm: "h-10 px-3 py-2.5 text-base md:h-9 md:py-2 md:text-sm",
        lg: "h-14 px-5 py-3.5 text-base md:h-12 md:py-3",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "default",
    },
  }
);

export interface InputProps
  extends React.ComponentProps<"input">,
    VariantProps<typeof inputVariants> {
  error?: boolean;
  success?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, inputSize, error, success, "aria-invalid": ariaInvalid, ...props }, ref) => {
    const computedVariant = error ? "error" : success ? "success" : variant;
    const isInvalid = error || ariaInvalid === true || ariaInvalid === "true";

    return (
      <input
        type={type}
        className={cn(inputVariants({ variant: computedVariant, inputSize, className }))}
        ref={ref}
        aria-invalid={isInvalid || undefined}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input, inputVariants };
