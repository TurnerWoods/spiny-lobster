import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const checkboxVariants = cva(
  "peer h-6 w-6 shrink-0 rounded-md border-2 bg-pure-white/60 ring-offset-background backdrop-blur-sm transition-all duration-200 ease-out disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: [
          "border-warm-stone/30",
          "hover:border-warm-stone/50 hover:bg-warm-stone/5",
          "data-[state=checked]:bg-warm-stone data-[state=checked]:border-warm-stone data-[state=checked]:text-pure-white data-[state=checked]:shadow-sm",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warm-stone/30 focus-visible:ring-offset-2",
        ],
        error: [
          "border-red-400 bg-red-50/30",
          "hover:border-red-500",
          "data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500 data-[state=checked]:text-pure-white",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-200 focus-visible:ring-offset-2",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    VariantProps<typeof checkboxVariants> {
  error?: boolean;
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, variant, error, "aria-invalid": ariaInvalid, ...props }, ref) => {
  const computedVariant = error ? "error" : variant;
  const isInvalid = error || ariaInvalid === true || ariaInvalid === "true";

  return (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(checkboxVariants({ variant: computedVariant }), className)}
      aria-invalid={isInvalid || undefined}
      {...props}
    >
      <CheckboxPrimitive.Indicator className={cn("flex items-center justify-center text-current")}>
        <Check className="h-3.5 w-3.5 stroke-[3]" aria-hidden="true" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
});
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox, checkboxVariants };
