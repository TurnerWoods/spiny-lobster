import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface HealthGoalsStepProps {
  data: {
    primaryGoal: string;
    secondaryGoals: string[];
    targetTimeline: string;
  };
  onChange: (data: Partial<HealthGoalsStepProps["data"]>) => void;
}

const primaryGoals = [
  { value: "weight-loss", label: "Weight Loss", description: "Achieve sustainable weight management" },
  { value: "hormone-therapy", label: "Hormone Optimization", description: "Balance testosterone or thyroid levels" },
  { value: "peptide-therapy", label: "Peptide Therapy", description: "Enhanced recovery and performance" },
  { value: "anti-aging", label: "Anti-Aging & Vitality", description: "Improve energy and overall wellness" },
];

const secondaryGoalOptions = [
  "Increase energy levels",
  "Improve sleep quality",
  "Build muscle mass",
  "Reduce body fat",
  "Enhance mental clarity",
  "Boost libido",
  "Improve mood",
  "Better athletic performance",
];

const HealthGoalsStep = ({ data, onChange }: HealthGoalsStepProps) => {
  const handleSecondaryGoalChange = (goal: string, checked: boolean) => {
    const updated = checked
      ? [...data.secondaryGoals, goal]
      : data.secondaryGoals.filter((g) => g !== goal);
    onChange({ secondaryGoals: updated });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-xl font-bold text-rich-black">What's your primary health goal?</h2>
        <p className="mt-1 text-muted-foreground">Select the main reason you're seeking treatment</p>
      </div>

      <RadioGroup
        value={data.primaryGoal}
        onValueChange={(value) => onChange({ primaryGoal: value })}
        className="grid gap-4 sm:grid-cols-2"
      >
        {primaryGoals.map((goal) => (
          <div key={goal.value}>
            <RadioGroupItem
              value={goal.value}
              id={goal.value}
              className="peer sr-only"
            />
            <Label
              htmlFor={goal.value}
              className="flex cursor-pointer flex-col rounded-xl border-2 border-warm-stone/20 bg-pure-white/60 p-4 backdrop-blur-sm transition-all hover:border-warm-stone/40 hover:bg-pure-white/80 peer-data-[state=checked]:border-warm-stone peer-data-[state=checked]:bg-warm-stone/10"
            >
              <span className="font-semibold text-rich-black">{goal.label}</span>
              <span className="text-sm text-muted-foreground">{goal.description}</span>
            </Label>
          </div>
        ))}
      </RadioGroup>

      <div>
        <Label className="text-base font-semibold text-rich-black">Additional goals (select all that apply)</Label>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {secondaryGoalOptions.map((goal) => (
            <div key={goal} className="flex items-center space-x-2">
              <Checkbox
                id={goal}
                checked={data.secondaryGoals.includes(goal)}
                onCheckedChange={(checked) => handleSecondaryGoalChange(goal, checked as boolean)}
              />
              <Label htmlFor={goal} className="text-sm font-normal cursor-pointer text-rich-black">
                {goal}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="timeline" className="text-base font-semibold text-rich-black">
          What's your target timeline?
        </Label>
        <Select value={data.targetTimeline} onValueChange={(value) => onChange({ targetTimeline: value })}>
          <SelectTrigger className="mt-2 w-full sm:w-64">
            <SelectValue placeholder="Select timeline" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1-3-months">1-3 months</SelectItem>
            <SelectItem value="3-6-months">3-6 months</SelectItem>
            <SelectItem value="6-12-months">6-12 months</SelectItem>
            <SelectItem value="ongoing">Ongoing maintenance</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default HealthGoalsStep;
