import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Dumbbell } from "lucide-react";

interface ProteinResult {
  dailyGrams: number;
  perMeal3: number;
  perMeal4: number;
}

const activityLevels = [
  { value: "sedentary", label: "Sedentary (little or no exercise)", multiplier: 0.9 },
  { value: "light", label: "Lightly Active (1–3 days/week)", multiplier: 1.0 },
  { value: "moderate", label: "Moderately Active (3–5 days/week)", multiplier: 1.1 },
  { value: "very", label: "Very Active (6–7 days/week)", multiplier: 1.2 },
  { value: "extra", label: "Extra Active (athlete / physical job)", multiplier: 1.3 },
];

const goalMultipliers: Record<string, number> = {
  lose: 1.0,
  maintain: 0.8,
  build: 1.2,
};

export default function ProteinCalculator() {
  const [weight, setWeight] = useState("");
  const [weightUnit, setWeightUnit] = useState("lbs");
  const [activity, setActivity] = useState("");
  const [goal, setGoal] = useState("");
  const [result, setResult] = useState<ProteinResult | null>(null);

  const calculate = () => {
    const weightNum = parseFloat(weight);
    if (isNaN(weightNum) || !activity || !goal) return;

    const weightLbs = weightUnit === "kg" ? weightNum * 2.20462 : weightNum;
    const goalMult = goalMultipliers[goal];
    const actMult = activityLevels.find((l) => l.value === activity)?.multiplier ?? 1.0;

    const dailyGrams = Math.round(weightLbs * goalMult * actMult);

    setResult({
      dailyGrams,
      perMeal3: Math.round(dailyGrams / 3),
      perMeal4: Math.round(dailyGrams / 4),
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-soft-linen to-light-cloud">
      <Header />

      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Link
              to="/tools"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-1" /> Back to Tools
            </Link>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-warm-stone/10 border border-warm-stone/20 mb-6 block w-fit">
              <Dumbbell className="h-4 w-4 text-warm-stone" />
              <span className="text-sm font-medium text-warm-stone">Calculator</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-display font-bold text-rich-black mb-2">
              Protein Calculator
            </h1>
            <p className="text-muted-foreground">
              Determine your optimal daily protein intake based on your weight, activity level, and fitness goals.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl border bg-card p-6 shadow-sm md:p-8"
          >
            <h2 className="text-xl font-display font-semibold text-foreground mb-6">Your Details</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="weight">Weight</Label>
                <div className="flex gap-2">
                  <Input
                    id="weight"
                    type="number"
                    placeholder={weightUnit === "lbs" ? "150" : "68"}
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="shrink-0"
                    onClick={() => setWeightUnit(weightUnit === "lbs" ? "kg" : "lbs")}
                  >
                    {weightUnit}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="activity">Activity Level</Label>
                <Select value={activity} onValueChange={setActivity}>
                  <SelectTrigger id="activity">
                    <SelectValue placeholder="Select activity level" />
                  </SelectTrigger>
                  <SelectContent>
                    {activityLevels.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Fitness Goal</Label>
                <RadioGroup value={goal} onValueChange={setGoal} className="space-y-3">
                  {[
                    { value: "lose", label: "Lose Fat" },
                    { value: "maintain", label: "Maintain Weight" },
                    { value: "build", label: "Build Muscle" },
                  ].map((option) => (
                    <label
                      key={option.value}
                      htmlFor={`goal-${option.value}`}
                      className={`flex items-center space-x-3 w-full rounded-xl border p-4 cursor-pointer transition-all hover:border-warm-stone hover:bg-warm-stone/5 ${
                        goal === option.value ? "border-warm-stone bg-warm-stone/5" : "bg-background"
                      }`}
                    >
                      <RadioGroupItem value={option.value} id={`goal-${option.value}`} />
                      <Label htmlFor={`goal-${option.value}`} className="cursor-pointer font-medium flex-1">
                        {option.label}
                      </Label>
                    </label>
                  ))}
                </RadioGroup>
              </div>

              <Button
                className="w-full mt-4 bg-warm-stone hover:bg-warm-stone/90 text-pure-white"
                onClick={calculate}
              >
                Calculate Protein
              </Button>
            </div>
          </motion.div>

          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border bg-card p-6 shadow-sm md:p-8 mt-6"
            >
              <h2 className="text-xl font-display font-semibold text-foreground mb-6">Your Results</h2>
              <div className="text-center mb-6">
                <p className="text-4xl font-display font-bold text-warm-stone">{result.dailyGrams}g</p>
                <p className="text-sm text-muted-foreground mt-1">daily protein target</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 rounded-xl bg-soft-linen">
                  <p className="text-sm text-muted-foreground mb-1">3 Meals/Day</p>
                  <p className="text-2xl font-display font-bold text-rich-black">{result.perMeal3}g</p>
                  <p className="text-xs text-muted-foreground">per meal</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-soft-linen">
                  <p className="text-sm text-muted-foreground mb-1">4 Meals/Day</p>
                  <p className="text-2xl font-display font-bold text-rich-black">{result.perMeal4}g</p>
                  <p className="text-xs text-muted-foreground">per meal</p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
