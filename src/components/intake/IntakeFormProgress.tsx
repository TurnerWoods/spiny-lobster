import { Check, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface Step {
  id: number;
  name: string;
}

interface IntakeFormProgressProps {
  steps: Step[];
  currentStep: number;
}

const IntakeFormProgress = ({ steps, currentStep }: IntakeFormProgressProps) => {
  const progressPercentage = ((currentStep - 1) / (steps.length - 1)) * 100;

  // Estimated time remaining (roughly 1-2 min per step)
  const remainingSteps = steps.length - currentStep;
  const estimatedMinutes = remainingSteps <= 0 ? 0 : remainingSteps + 1;

  return (
    <nav aria-label="Progress" className="mb-8">
      {/* Mobile-friendly step indicator */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-warm-stone">
            Step {currentStep} of {steps.length}
          </span>
          <span className="text-sm text-muted-foreground hidden sm:inline">
            - {steps[currentStep - 1]?.name}
          </span>
        </div>
        {remainingSteps > 0 && (
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            <span>~{estimatedMinutes} min left</span>
          </div>
        )}
      </div>

      {/* Progress bar for mobile */}
      <div className="sm:hidden mb-4">
        <div
          className="h-2.5 bg-warm-stone/10 rounded-full overflow-hidden"
          role="progressbar"
          aria-valuenow={progressPercentage}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Form progress: ${Math.round(progressPercentage)}% complete`}
        >
          <motion.div
            className="h-full bg-warm-stone rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Step indicators for larger screens */}
      <ol className="hidden sm:flex items-center justify-between" aria-label="Form steps">
        {steps.map((step, index) => (
          <li
            key={step.id}
            className="relative flex-1"
            aria-current={currentStep === step.id ? "step" : undefined}
          >
            <div className="flex items-center">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{
                  scale: currentStep === step.id ? 1.1 : 1,
                }}
                aria-label={`Step ${step.id}: ${step.name}${currentStep > step.id ? " (completed)" : currentStep === step.id ? " (current)" : ""}`}
                className={cn(
                  "relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300",
                  currentStep > step.id
                    ? "border-warm-stone bg-warm-stone text-pure-white shadow-md"
                    : currentStep === step.id
                    ? "border-warm-stone bg-warm-stone/10 text-warm-stone ring-4 ring-warm-stone/20"
                    : "border-muted-foreground/30 bg-background text-muted-foreground"
                )}
              >
                {currentStep > step.id ? (
                  <Check className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <span className="text-sm font-medium" aria-hidden="true">{step.id}</span>
                )}
              </motion.div>
              {index < steps.length - 1 && (
                <div className="relative h-0.5 flex-1 bg-muted-foreground/30 overflow-hidden">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-warm-stone"
                    initial={{ width: 0 }}
                    animate={{
                      width: currentStep > step.id ? "100%" : "0%"
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                </div>
              )}
            </div>
            <span
              className={cn(
                "absolute -bottom-6 left-0 w-full text-center text-xs font-medium transition-colors",
                currentStep === step.id
                  ? "text-warm-stone font-semibold"
                  : currentStep > step.id
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {step.name}
            </span>
          </li>
        ))}
      </ol>

      {/* Mobile step pills */}
      <div className="flex sm:hidden justify-center gap-2 flex-wrap">
        {steps.map((step) => (
          <div
            key={step.id}
            className={cn(
              "flex items-center gap-1.5 px-3 py-2 min-h-[36px] rounded-full text-xs font-medium transition-all",
              currentStep === step.id
                ? "bg-warm-stone text-pure-white shadow-md"
                : currentStep > step.id
                ? "bg-warm-stone/20 text-warm-stone"
                : "bg-muted-foreground/10 text-muted-foreground"
            )}
          >
            {currentStep > step.id && <Check className="h-3.5 w-3.5" />}
            <span>{step.name}</span>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default IntakeFormProgress;
