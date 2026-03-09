import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const selectTriggerVariants = cva(
  "flex min-h-[44px] h-11 w-full items-center justify-between rounded-xl border bg-pure-white/60 px-4 py-2.5 text-base md:text-sm text-foreground ring-offset-background backdrop-blur-sm transition-all duration-200 ease-out placeholder:text-warm-gray/80 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 data-[placeholder]:text-warm-gray/80",
  {
    variants: {
      variant: {
        default: [
          "border-warm-stone/20",
          "hover:border-warm-stone/40",
          "focus:outline-none focus:border-warm-stone focus:ring-2 focus:ring-warm-stone/20 focus:shadow-[0_0_0_4px_rgba(114,102,88,0.08)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warm-stone/30",
        ],
        error: [
          "border-red-400 bg-red-50/30",
          "hover:border-red-500",
          "focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 focus:shadow-[0_0_0_4px_rgba(239,68,68,0.08)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-200",
        ],
        success: [
          "border-accent-gold/50 bg-accent-gold/5",
          "hover:border-accent-gold/70",
          "focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold/20",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface SelectTriggerProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>,
    VariantProps<typeof selectTriggerVariants> {
  error?: boolean;
  success?: boolean;
}

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  SelectTriggerProps
>(({ className, children, variant, error, success, "aria-invalid": ariaInvalid, ...props }, ref) => {
  const computedVariant = error ? "error" : success ? "success" : variant;
  const isInvalid = error || ariaInvalid === true || ariaInvalid === "true";

  return (
    <SelectPrimitive.Trigger
      ref={ref}
      aria-haspopup="listbox"
      aria-invalid={isInvalid || undefined}
      className={cn(selectTriggerVariants({ variant: computedVariant }), className)}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDown className="h-4 w-4 text-warm-stone/60 transition-transform duration-200 data-[state=open]:rotate-180" aria-hidden="true" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
});
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn("flex cursor-default items-center justify-center py-1 text-warm-stone", className)}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn("flex cursor-default items-center justify-center py-1 text-warm-stone", className)}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", sideOffset = 4, ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      role="listbox"
      className={cn(
        "relative z-[9999] max-h-[min(400px,var(--radix-select-content-available-height))] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-xl border border-warm-stone/20 bg-pure-white text-foreground shadow-2xl",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className,
      )}
      position={position}
      sideOffset={sideOffset}
      avoidCollisions={true}
      collisionPadding={16}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1.5",
          position === "popper" &&
            "w-full min-w-[var(--radix-select-trigger-width)]",
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label ref={ref} className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold text-warm-stone", className)} {...props} />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    role="option"
    className={cn(
      "relative flex w-full cursor-pointer select-none items-center rounded-lg min-h-[44px] py-3 pl-9 pr-3 text-base md:text-sm md:min-h-0 md:py-2.5 outline-none transition-all duration-150",
      "hover:bg-warm-stone/8 focus:bg-warm-stone/10 focus:text-warm-stone",
      "data-[state=checked]:bg-warm-stone/10 data-[state=checked]:text-warm-stone data-[state=checked]:font-medium",
      "data-[highlighted]:bg-warm-stone/8 data-[highlighted]:outline-none",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    {...props}
  >
    <span className="absolute left-2.5 flex h-4 w-4 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4 text-warm-stone stroke-[2.5]" aria-hidden="true" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator ref={ref} className={cn("-mx-1 my-1 h-px bg-warm-stone/20", className)} {...props} />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
  selectTriggerVariants,
};
