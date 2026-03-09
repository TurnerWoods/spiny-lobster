import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const radioGroupVariants = cva("grid gap-3", {
  variants: {
    variant: {
      default: "",
      error: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const radioGroupItemVariants = cva(
  "aspect-square h-5 w-5 rounded-full border-2 bg-pure-white/60 ring-offset-background backdrop-blur-sm transition-all duration-200 ease-out disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: [
          "border-warm-stone/30 text-warm-stone",
          "hover:border-warm-stone/50 hover:bg-warm-stone/5",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-warm-stone/30 focus-visible:ring-offset-2",
          "data-[state=checked]:border-warm-stone data-[state=checked]:bg-warm-stone data-[state=checked]:shadow-sm",
        ],
        error: [
          "border-red-400 bg-red-50/30 text-red-500",
          "hover:border-red-500",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-red-200 focus-visible:ring-offset-2",
          "data-[state=checked]:border-red-500 data-[state=checked]:bg-red-500",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface RadioGroupProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>,
    VariantProps<typeof radioGroupVariants> {
  error?: boolean;
}

export interface RadioGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>,
    VariantProps<typeof radioGroupItemVariants> {
  error?: boolean;
}

const RadioGroupContext = React.createContext<{ error?: boolean }>({});

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(({ className, variant, error, "aria-invalid": ariaInvalid, ...props }, ref) => {
  const isInvalid = error || ariaInvalid === true || ariaInvalid === "true";

  return (
    <RadioGroupContext.Provider value={{ error }}>
      <RadioGroupPrimitive.Root
        className={cn(radioGroupVariants({ variant: error ? "error" : variant }), className)}
        aria-invalid={isInvalid || undefined}
        role="radiogroup"
        {...props}
        ref={ref}
      />
    </RadioGroupContext.Provider>
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(({ className, variant, error: itemError, ...props }, ref) => {
  const context = React.useContext(RadioGroupContext);
  const hasError = itemError ?? context.error;
  const computedVariant = hasError ? "error" : variant;

  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(radioGroupItemVariants({ variant: computedVariant }), className)}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-2 w-2 fill-pure-white text-pure-white" aria-hidden="true" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem, radioGroupVariants, radioGroupItemVariants };
