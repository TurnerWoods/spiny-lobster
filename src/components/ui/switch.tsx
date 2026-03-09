import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const switchVariants = cva(
  "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-all duration-200 ease-out disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: [
          "data-[state=checked]:bg-warm-stone data-[state=unchecked]:bg-warm-stone/20",
          "hover:data-[state=unchecked]:bg-warm-stone/30",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warm-stone/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        ],
        error: [
          "data-[state=checked]:bg-red-500 data-[state=unchecked]:bg-red-200",
          "hover:data-[state=unchecked]:bg-red-300",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-200 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>,
    VariantProps<typeof switchVariants> {
  error?: boolean;
}

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  SwitchProps
>(({ className, variant, error, "aria-invalid": ariaInvalid, ...props }, ref) => {
  const computedVariant = error ? "error" : variant;
  const isInvalid = error || ariaInvalid === true || ariaInvalid === "true";

  return (
    <SwitchPrimitives.Root
      className={cn(switchVariants({ variant: computedVariant }), className)}
      aria-invalid={isInvalid || undefined}
      {...props}
      ref={ref}
    >
      <SwitchPrimitives.Thumb
        className={cn(
          "pointer-events-none block h-5 w-5 rounded-full bg-pure-white shadow-lg ring-0 transition-transform duration-200 ease-out",
          "data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
        )}
      />
    </SwitchPrimitives.Root>
  );
});
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch, switchVariants };
