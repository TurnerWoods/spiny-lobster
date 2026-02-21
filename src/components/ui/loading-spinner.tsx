import * as React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "default" | "lg" | "xl";
  text?: string;
}

const sizeClasses = {
  sm: "h-4 w-4",
  default: "h-6 w-6",
  lg: "h-8 w-8",
  xl: "h-12 w-12",
};

const LoadingSpinner = React.forwardRef<HTMLDivElement, LoadingSpinnerProps>(
  ({ className, size = "default", text, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-col items-center justify-center gap-3", className)}
        {...props}
      >
        <Loader2 className={cn("animate-spin text-warm-stone", sizeClasses[size])} />
        {text && (
          <p className="text-sm text-muted-foreground animate-pulse">{text}</p>
        )}
      </div>
    );
  }
);
LoadingSpinner.displayName = "LoadingSpinner";

interface FullPageLoaderProps {
  text?: string;
}

const FullPageLoader = ({ text = "Loading..." }: FullPageLoaderProps) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-soft-linen via-pure-white to-light-cloud">
      <LoadingSpinner size="xl" text={text} />
    </div>
  );
};

export { LoadingSpinner, FullPageLoader };
