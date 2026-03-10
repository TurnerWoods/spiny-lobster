import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const textareaVariants = cva(
  "flex min-h-[120px] w-full rounded-xl border bg-pure-white/60 px-4 py-3 text-base md:text-sm text-foreground ring-offset-background backdrop-blur-sm placeholder:text-muted-foreground/75 transition-all duration-200 ease-out resize-none focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-warm-stone/20 hover:border-warm-stone/40 focus-visible:border-warm-stone focus-visible:ring-2 focus-visible:ring-warm-stone/20 focus-visible:shadow-[0_0_0_4px_rgba(114,102,88,0.08)]",
        error: "border-red-400 bg-red-50/30 hover:border-red-500 focus-visible:border-red-500 focus-visible:ring-2 focus-visible:ring-red-200 focus-visible:shadow-[0_0_0_4px_rgba(239,68,68,0.08)]",
        success: "border-accent-gold/50 bg-accent-gold/5 hover:border-accent-gold/70 focus-visible:border-accent-gold focus-visible:ring-2 focus-visible:ring-accent-gold/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
  error?: boolean;
  success?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, error, success, "aria-invalid": ariaInvalid, ...props }, ref) => {
    const computedVariant = error ? "error" : success ? "success" : variant;
    const isInvalid = error || ariaInvalid === true || ariaInvalid === "true";

    return (
      <textarea
        className={cn(textareaVariants({ variant: computedVariant, className }))}
        ref={ref}
        aria-invalid={isInvalid || undefined}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea, textareaVariants };
