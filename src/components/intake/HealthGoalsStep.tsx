import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Target, Zap, Sparkles, Heart, Activity, Brain, Moon, Flame, Dumbbell, Clock, AlertCircle, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface HealthGoalsStepProps {
  data: {
    primaryGoal: string;
    secondaryGoals: string[];
    targetTimeline: string;
  };
  onChange: (data: Partial<HealthGoalsStepProps["data"]>) => void;
}

const primaryGoals = [
  { value: "weight-loss", label: "Weight Loss", description: "Achieve sustainable weight management", icon: Target },
  { value: "hormone-therapy", label: "Hormone Optimization", description: "Balance testosterone or thyroid levels", icon: Zap },
  { value: "peptide-therapy", label: "Peptide Therapy", description: "Enhanced recovery and performance", icon: Activity },
  { value: "anti-aging", label: "Anti-Aging & Vitality", description: "Improve energy and overall wellness", icon: Sparkles },
];

const secondaryGoalIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "Increase energy levels": Zap,
  "Improve sleep quality": Moon,
  "Build muscle mass": Dumbbell,
  "Reduce body fat": Flame,
  "Enhance mental clarity": Brain,
  "Boost libido": Heart,
  "Improve mood": Sparkles,
  "Better athletic performance": Activity,
};

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

  const showValidation = data.primaryGoal === "";

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-lg font-bold text-rich-black sm:text-xl">What's your primary health goal?</h2>
        <p className="mt-1 text-sm text-muted-foreground sm:text-base">Select the main reason you're seeking treatment</p>
      </div>

      <div>
        <RadioGroup
        value={data.primaryGoal}
        onValueChange={(value) => onChange({ primaryGoal: value })}
        className="grid gap-4 sm:grid-cols-2"
      >
        {primaryGoals.map((goal) => {
          const Icon = goal.icon;
          return (
            <div key={goal.value}>
              <RadioGroupItem
                value={goal.value}
                id={goal.value}
                className="peer sr-only"
              />
              <Label
                htmlFor={goal.value}
                className="flex cursor-pointer items-start gap-4 rounded-xl border-2 border-warm-stone/20 bg-pure-white/60 p-4 backdrop-blur-sm transition-all duration-200 hover:border-warm-stone/40 hover:bg-pure-white/80 hover:shadow-md peer-data-[state=checked]:border-warm-stone peer-data-[state=checked]:bg-warm-stone/10 peer-data-[state=checked]:shadow-md"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-warm-stone/10 transition-colors peer-data-[state=checked]:bg-warm-stone/20">
                  <Icon className="h-5 w-5 text-warm-stone" />
                </div>
                <div className="flex-1">
                  <span className="block font-semibold text-rich-black">{goal.label}</span>
                  <span className="block text-sm text-muted-foreground mt-0.5">{goal.description}</span>
                </div>
              </Label>
            </div>
          );
        })}
        </RadioGroup>

        {/* Inline validation hint */}
        <AnimatePresence>
          {showValidation && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="mt-3 flex items-center gap-1.5 text-sm text-warm-stone"
            >
              <AlertCircle className="h-4 w-4" />
              Please select a primary goal to continue
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div>
        <Label className="text-base font-semibold text-rich-black">
          Additional goals
          <span className="ml-2 text-xs font-normal text-muted-foreground">(Optional)</span>
        </Label>
        <p className="mt-1 mb-3 text-sm text-muted-foreground">Select all that apply to you</p>
        <div className="grid gap-2 sm:grid-cols-2">
          {secondaryGoalOptions.map((goal) => {
            const Icon = secondaryGoalIcons[goal] || Target;
            const isSelected = data.secondaryGoals.includes(goal);
            return (
              <div
                key={goal}
                onClick={() => handleSecondaryGoalChange(goal, !isSelected)}
                className={`flex items-center gap-3 rounded-xl border-2 p-3 cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? "border-warm-stone bg-warm-stone/10 shadow-sm"
                    : "border-warm-stone/20 hover:border-warm-stone/40 hover:bg-pure-white/80"
                }`}
              >
                <Checkbox
                  id={goal}
                  checked={isSelected}
                  onCheckedChange={(checked) => handleSecondaryGoalChange(goal, checked as boolean)}
                  className="pointer-events-none"
                />
                <Icon className={`h-4 w-4 flex-shrink-0 ${isSelected ? "text-warm-stone" : "text-warm-stone/60"}`} />
                <Label htmlFor={goal} className="text-sm font-normal cursor-pointer text-rich-black flex-1">
                  {goal}
                </Label>
              </div>
            );
          })}
        </div>
        {data.secondaryGoals.length > 0 && (
          <p className="mt-2 text-xs text-muted-foreground">
            {data.secondaryGoals.length} goal{data.secondaryGoals.length > 1 ? "s" : ""} selected
          </p>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-warm-stone" />
          <Label htmlFor="timeline" className="text-base font-semibold text-rich-black">
            Target timeline
            <span className="ml-2 text-xs font-normal text-muted-foreground">(Optional)</span>
          </Label>
        </div>
        <p className="text-sm text-muted-foreground">When do you want to see results?</p>
        <Select value={data.targetTimeline} onValueChange={(value) => onChange({ targetTimeline: value })}>
          <SelectTrigger className="w-full h-12 sm:h-11 sm:w-72">
            <SelectValue placeholder="Choose your timeline" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1-3-months">1-3 months - Quick start</SelectItem>
            <SelectItem value="3-6-months">3-6 months - Recommended</SelectItem>
            <SelectItem value="6-12-months">6-12 months - Comprehensive change</SelectItem>
            <SelectItem value="ongoing">Ongoing - Long-term maintenance</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default HealthGoalsStep;
