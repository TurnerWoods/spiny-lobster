import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
  { value: "sedentary", label: "Sedentary", description: "Little to no exercise" },
  { value: "light", label: "Lightly Active", description: "1-2 days per week" },
  { value: "moderate", label: "Moderately Active", description: "3-4 days per week" },
  { value: "active", label: "Very Active", description: "5+ days per week" },
];

const stressOptions = [
  { value: "low", label: "Low", description: "Generally calm and relaxed" },
  { value: "moderate", label: "Moderate", description: "Some stress but manageable" },
  { value: "high", label: "High", description: "Frequently stressed" },
  { value: "very-high", label: "Very High", description: "Overwhelming stress regularly" },
];

const LifestyleStep = ({ data, onChange }: LifestyleStepProps) => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-xl font-bold text-foreground">Lifestyle Assessment</h2>
        <p className="mt-1 text-muted-foreground">
          Help us understand your daily habits to optimize your treatment plan
        </p>
      </div>

      <div>
        <Label className="text-base font-semibold">How often do you exercise?</Label>
        <RadioGroup
          value={data.exerciseFrequency}
          onValueChange={(value) => onChange({ exerciseFrequency: value })}
          className="mt-3 grid gap-3 sm:grid-cols-2"
        >
          {exerciseOptions.map((option) => (
            <div key={option.value}>
              <RadioGroupItem value={option.value} id={`exercise-${option.value}`} className="peer sr-only" />
              <Label
                htmlFor={`exercise-${option.value}`}
                className="flex cursor-pointer flex-col rounded-lg border-2 border-muted bg-card p-3 transition-all hover:border-primary/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
              >
                <span className="font-medium text-foreground">{option.label}</span>
                <span className="text-sm text-muted-foreground">{option.description}</span>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div>
        <Label className="text-base font-semibold">What's your typical stress level?</Label>
        <RadioGroup
          value={data.stressLevel}
          onValueChange={(value) => onChange({ stressLevel: value })}
          className="mt-3 grid gap-3 sm:grid-cols-2"
        >
          {stressOptions.map((option) => (
            <div key={option.value}>
              <RadioGroupItem value={option.value} id={`stress-${option.value}`} className="peer sr-only" />
              <Label
                htmlFor={`stress-${option.value}`}
                className="flex cursor-pointer flex-col rounded-lg border-2 border-muted bg-card p-3 transition-all hover:border-primary/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
              >
                <span className="font-medium text-foreground">{option.label}</span>
                <span className="text-sm text-muted-foreground">{option.description}</span>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div>
        <Label htmlFor="sleepHours" className="text-base font-semibold">
          Average hours of sleep per night
        </Label>
        <Select value={data.sleepHours} onValueChange={(value) => onChange({ sleepHours: value })}>
          <SelectTrigger className="mt-2 w-full sm:w-48">
            <SelectValue placeholder="Select hours" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="less-than-5">Less than 5 hours</SelectItem>
            <SelectItem value="5-6">5-6 hours</SelectItem>
            <SelectItem value="6-7">6-7 hours</SelectItem>
            <SelectItem value="7-8">7-8 hours</SelectItem>
            <SelectItem value="8-plus">8+ hours</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="dietDescription" className="text-base font-semibold">
          Describe your typical diet
        </Label>
        <Textarea
          id="dietDescription"
          placeholder="What does a typical day of eating look like for you? Include meals, snacks, and beverages..."
          value={data.dietDescription}
          onChange={(e) => onChange({ dietDescription: e.target.value })}
          rows={4}
        />
      </div>
    </div>
  );
};

export default LifestyleStep;
