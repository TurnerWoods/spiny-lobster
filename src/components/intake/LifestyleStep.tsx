import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Info, Dumbbell, Brain, Moon } from "lucide-react";

interface LifestyleStepProps {
  data: {
    exerciseFrequency: string;
    dietDescription: string;
    sleepHours: string;
    stressLevel: string;
  };
  onChange: (data: Partial<LifestyleStepProps["data"]>) => void;
}

const exerciseOptions = [
  { value: "sedentary", label: "Sedentary", description: "Little to no exercise", icon: "rest" },
  { value: "light", label: "Light", description: "1-2 days/week", icon: "light" },
  { value: "moderate", label: "Moderate", description: "3-4 days/week", icon: "moderate" },
  { value: "active", label: "Very Active", description: "5+ days/week", icon: "active" },
];

const stressOptions = [
  { value: "low", label: "Low", description: "Generally relaxed" },
  { value: "moderate", label: "Moderate", description: "Manageable stress" },
  { value: "high", label: "High", description: "Frequently stressed" },
  { value: "very-high", label: "Very High", description: "Overwhelmed often" },
];

const sleepOptions = [
  { value: "less-than-5", label: "Less than 5 hours" },
  { value: "5-6", label: "5-6 hours" },
  { value: "6-7", label: "6-7 hours" },
  { value: "7-8", label: "7-8 hours" },
  { value: "8-plus", label: "8+ hours" },
];

const LifestyleStep = ({ data, onChange }: LifestyleStepProps) => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-xl font-bold text-rich-black">Lifestyle Assessment</h2>
        <p className="mt-1 text-muted-foreground">
          Help us understand your daily habits to optimize your treatment plan
        </p>
        <div className="mt-3 flex items-start gap-2 rounded-lg bg-soft-linen/50 border border-warm-stone/10 p-3 text-sm text-warm-gray">
          <Info className="h-4 w-4 text-warm-stone mt-0.5 flex-shrink-0" />
          <span>These fields are optional but help us personalize your recommendations.</span>
        </div>
      </div>

      {/* Exercise Frequency - Card-based selection for mobile */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Dumbbell className="h-5 w-5 text-warm-stone" />
          <Label className="text-base font-semibold text-rich-black">How often do you exercise?</Label>
        </div>
        <RadioGroup
          value={data.exerciseFrequency}
          onValueChange={(value) => onChange({ exerciseFrequency: value })}
          className="grid grid-cols-2 gap-3"
        >
          {exerciseOptions.map((option) => (
            <div key={option.value}>
              <RadioGroupItem value={option.value} id={`exercise-${option.value}`} className="peer sr-only" />
              <Label
                htmlFor={`exercise-${option.value}`}
                className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-warm-stone/20 bg-pure-white/60 p-4 text-center backdrop-blur-sm transition-all duration-200 hover:border-warm-stone/40 hover:bg-pure-white/80 hover:shadow-md peer-data-[state=checked]:border-warm-stone peer-data-[state=checked]:bg-warm-stone/10 peer-data-[state=checked]:shadow-md"
              >
                <span className="font-semibold text-rich-black">{option.label}</span>
                <span className="text-xs text-muted-foreground mt-1">{option.description}</span>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Stress Level - Simplified for mobile */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Brain className="h-5 w-5 text-warm-stone" />
          <Label className="text-base font-semibold text-rich-black">What's your typical stress level?</Label>
        </div>
        <RadioGroup
          value={data.stressLevel}
          onValueChange={(value) => onChange({ stressLevel: value })}
          className="grid grid-cols-2 gap-3"
        >
          {stressOptions.map((option) => (
            <div key={option.value}>
              <RadioGroupItem value={option.value} id={`stress-${option.value}`} className="peer sr-only" />
              <Label
                htmlFor={`stress-${option.value}`}
                className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-warm-stone/20 bg-pure-white/60 p-4 text-center backdrop-blur-sm transition-all duration-200 hover:border-warm-stone/40 hover:bg-pure-white/80 hover:shadow-md peer-data-[state=checked]:border-warm-stone peer-data-[state=checked]:bg-warm-stone/10 peer-data-[state=checked]:shadow-md"
              >
                <span className="font-semibold text-rich-black">{option.label}</span>
                <span className="text-xs text-muted-foreground mt-1">{option.description}</span>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Sleep Hours - Dropdown for cleaner mobile UX */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Moon className="h-5 w-5 text-warm-stone" />
          <Label htmlFor="sleepHours" className="text-base font-semibold text-rich-black">
            Average hours of sleep per night
          </Label>
        </div>
        <Select value={data.sleepHours} onValueChange={(value) => onChange({ sleepHours: value })}>
          <SelectTrigger className="w-full h-12 sm:h-11">
            <SelectValue placeholder="Select your typical sleep duration" />
          </SelectTrigger>
          <SelectContent>
            {sleepOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {data.sleepHours && (data.sleepHours === "less-than-5" || data.sleepHours === "5-6") && (
          <p className="mt-2 text-xs text-warm-stone">
            Sleep impacts hormone levels. We'll factor this into your treatment plan.
          </p>
        )}
      </div>

      {/* Diet Description - Optional with helpful prompt */}
      <div className="space-y-2">
        <Label htmlFor="dietDescription" className="text-base font-semibold text-rich-black">
          Describe your typical diet
          <span className="ml-2 text-xs font-normal text-muted-foreground">(Optional)</span>
        </Label>
        <p className="text-sm text-muted-foreground mb-2">
          A brief overview helps us provide nutrition guidance
        </p>
        <Textarea
          id="dietDescription"
          placeholder="e.g., 'I eat mostly home-cooked meals, try to include protein at each meal, occasional fast food on weekends...'"
          value={data.dietDescription}
          onChange={(e) => onChange({ dietDescription: e.target.value })}
          rows={3}
          className="resize-none"
        />
        <p className="text-xs text-muted-foreground">
          Don't worry about being perfect - just give us a general idea of your eating habits.
        </p>
      </div>
    </div>
  );
};

export default LifestyleStep;
