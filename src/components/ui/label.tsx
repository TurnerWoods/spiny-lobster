import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const labelVariants = cva(
  "block text-sm font-medium leading-normal tracking-wide peer-disabled:cursor-not-allowed peer-disabled:opacity-70 transition-colors duration-200 mb-1.5",
  {
    variants: {
      variant: {
        default: "text-rich-black",
        muted: "text-warm-gray",
        error: "text-red-600",
        required: "text-rich-black after:content-['*'] after:ml-0.5 after:text-red-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface LabelProps
  extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>,
    VariantProps<typeof labelVariants> {
  required?: boolean;
}

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  LabelProps
>(({ className, variant, required, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants({ variant: required ? "required" : variant }), className)}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label, labelVariants };
