import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { Dot } from "lucide-react";

import { cn } from "@/lib/utils";

export interface InputOTPProps extends React.ComponentPropsWithoutRef<typeof OTPInput> {
  error?: boolean;
}

const InputOTPContext = React.createContext<{ error?: boolean }>({});

const InputOTP = React.forwardRef<React.ElementRef<typeof OTPInput>, InputOTPProps>(
  ({ className, containerClassName, error, ...props }, ref) => (
    <InputOTPContext.Provider value={{ error }}>
      <OTPInput
        ref={ref}
        containerClassName={cn("flex items-center gap-2 has-[:disabled]:opacity-50", containerClassName)}
        className={cn("disabled:cursor-not-allowed", className)}
        aria-invalid={error || undefined}
        {...props}
      />
    </InputOTPContext.Provider>
  ),
);
InputOTP.displayName = "InputOTP";

const InputOTPGroup = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("flex items-center", className)} {...props} />,
);
InputOTPGroup.displayName = "InputOTPGroup";

export interface InputOTPSlotProps extends React.ComponentPropsWithoutRef<"div"> {
  index: number;
  error?: boolean;
}

const InputOTPSlot = React.forwardRef<React.ElementRef<"div">, InputOTPSlotProps>(
  ({ index, className, error: slotError, ...props }, ref) => {
    const inputOTPContext = React.useContext(OTPInputContext);
    const errorContext = React.useContext(InputOTPContext);
    const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];
    const hasError = slotError ?? errorContext.error;

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex h-12 w-12 items-center justify-center border-y border-r text-base font-medium transition-all duration-200 ease-out first:rounded-l-xl first:border-l last:rounded-r-xl bg-pure-white/60 backdrop-blur-sm",
          hasError
            ? "border-red-400 bg-red-50/30"
            : "border-warm-stone/20",
          isActive && !hasError && "z-10 ring-2 ring-warm-stone/30 ring-offset-background border-warm-stone",
          isActive && hasError && "z-10 ring-2 ring-red-200 ring-offset-background border-red-500",
          className,
        )}
        {...props}
      >
        {char}
        {hasFakeCaret && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className={cn(
              "animate-caret-blink h-5 w-px duration-1000",
              hasError ? "bg-red-500" : "bg-warm-stone"
            )} />
          </div>
        )}
      </div>
    );
  }
);
InputOTPSlot.displayName = "InputOTPSlot";

const InputOTPSeparator = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => (
    <div ref={ref} role="separator" className={cn("text-warm-stone/40", className)} {...props}>
      <Dot className="h-4 w-4" aria-hidden="true" />
    </div>
  ),
);
InputOTPSeparator.displayName = "InputOTPSeparator";

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
