import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-lg border border-warm-stone/20 bg-pure-white/60 px-3 py-2 text-sm text-foreground ring-offset-background backdrop-blur-sm placeholder:text-muted-foreground transition-colors focus-visible:outline-none focus-visible:border-warm-stone focus-visible:ring-2 focus-visible:ring-warm-stone/20 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
