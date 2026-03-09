import * as React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Size variant for the spinner */
  size?: "sm" | "default" | "lg" | "xl";
  /** Optional loading text to display below the spinner */
  text?: string;
  /** Screen reader label for the spinner (defaults to "Loading") */
  label?: string;
}

const sizeClasses = {
  sm: "h-4 w-4",
  default: "h-6 w-6",
  lg: "h-8 w-8",
  xl: "h-12 w-12",
} as const;

const textSizeClasses = {
  sm: "text-xs",
  default: "text-sm",
  lg: "text-base",
  xl: "text-lg",
} as const;

const LoadingSpinner = React.forwardRef<HTMLDivElement, LoadingSpinnerProps>(
  ({ className, size = "default", text, label = "Loading", ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="status"
        aria-busy="true"
        aria-live="polite"
        aria-label={label}
        className={cn("flex flex-col items-center justify-center gap-3", className)}
        {...props}
      >
        <Loader2
          className={cn("animate-spin text-warm-stone", sizeClasses[size])}
          aria-hidden="true"
        />
        {text && (
          <p
            className={cn(
              "text-muted-foreground animate-pulse-subtle",
              textSizeClasses[size]
            )}
          >
            {text}
          </p>
        )}
        {/* Screen reader only text when no visible text */}
        {!text && (
          <span className="sr-only">{label}</span>
        )}
      </div>
    );
  }
);
LoadingSpinner.displayName = "LoadingSpinner";

interface FullPageLoaderProps {
  /** Optional loading text to display below the spinner */
  text?: string;
  /** Screen reader label for the loader (defaults to "Loading page") */
  label?: string;
}

const FullPageLoader = ({
  text = "Loading...",
  label = "Loading page"
}: FullPageLoaderProps) => {
  return (
    <div
      className="fixed inset-0 z-50 flex min-h-screen items-center justify-center bg-gradient-to-br from-soft-linen via-pure-white to-light-cloud"
      role="alert"
      aria-busy="true"
    >
      <div className="animate-fade-in">
        <LoadingSpinner size="xl" text={text} label={label} />
      </div>
    </div>
  );
};

export { LoadingSpinner, FullPageLoader };
