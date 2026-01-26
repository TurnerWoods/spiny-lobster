import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: number;
  name: string;
}

interface IntakeFormProgressProps {
  steps: Step[];
  currentStep: number;
}

const IntakeFormProgress = ({ steps, currentStep }: IntakeFormProgressProps) => {
  return (
    <nav aria-label="Progress" className="mb-8">
      <ol className="flex items-center justify-between">
        {steps.map((step, index) => (
          <li key={step.id} className="relative flex-1">
            <div className="flex items-center">
              <div
                className={cn(
                  "relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors",
                  currentStep > step.id
                    ? "border-warm-stone bg-warm-stone text-pure-white"
                    : currentStep === step.id
                    ? "border-warm-stone bg-background text-warm-stone"
                    : "border-muted-foreground/30 bg-background text-muted-foreground"
                )}
              >
                {currentStep > step.id ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <span className="text-sm font-medium">{step.id}</span>
                )}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "h-0.5 flex-1 transition-colors",
                    currentStep > step.id ? "bg-warm-stone" : "bg-muted-foreground/30"
                  )}
                />
              )}
            </div>
            <span
              className={cn(
                "absolute -bottom-6 left-0 w-full text-center text-xs font-medium",
                currentStep >= step.id ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {step.name}
            </span>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default IntakeFormProgress;
