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
import { ArrowLeft, Calculator } from "lucide-react";

interface CalorieResult {
  dailyCalories: number;
  protein: { grams: number; percent: number };
  carbs: { grams: number; percent: number };
  fat: { grams: number; percent: number };
}

const activityLevels = [
  { value: "1.2", label: "Sedentary (little or no exercise)" },
  { value: "1.375", label: "Lightly Active (1–3 days/week)" },
  { value: "1.55", label: "Moderately Active (3–5 days/week)" },
  { value: "1.725", label: "Very Active (6–7 days/week)" },
  { value: "1.9", label: "Extra Active (athlete / physical job)" },
];

export default function CalorieCalculator() {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [weight, setWeight] = useState("");
  const [weightUnit, setWeightUnit] = useState("lbs");
  const [height, setHeight] = useState("");
  const [heightUnit, setHeightUnit] = useState("in");
  const [activityLevel, setActivityLevel] = useState("");
  const [goal, setGoal] = useState("");
  const [result, setResult] = useState<CalorieResult | null>(null);

  const calculate = () => {
    const ageNum = parseFloat(age);
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);

    if (isNaN(ageNum) || isNaN(weightNum) || isNaN(heightNum) || !gender || !activityLevel || !goal) return;

    const weightKg = weightUnit === "lbs" ? weightNum * 0.453592 : weightNum;
    const heightCm = heightUnit === "in" ? heightNum * 2.54 : heightNum;
    const multiplier = parseFloat(activityLevel);

    let bmr: number;
    if (gender === "male") {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageNum + 5;
    } else {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageNum - 161;
    }

    const tdee = bmr * multiplier;
    const goalAdjustment = goal === "lose" ? -500 : goal === "gain" ? 500 : 0;
    const dailyCalories = Math.round(tdee + goalAdjustment);

    const proteinPercent = 30;
    const carbsPercent = 40;
    const fatPercent = 30;

    setResult({
      dailyCalories,
      protein: {
        grams: Math.round((dailyCalories * proteinPercent / 100) / 4),
        percent: proteinPercent,
      },
      carbs: {
        grams: Math.round((dailyCalories * carbsPercent / 100) / 4),
        percent: carbsPercent,
      },
      fat: {
        grams: Math.round((dailyCalories * fatPercent / 100) / 9),
        percent: fatPercent,
      },
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
              <Calculator className="h-4 w-4 text-warm-stone" />
              <span className="text-sm font-medium text-warm-stone">Calculator</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-display font-bold text-rich-black mb-2">
              Calorie Calculator
            </h1>
            <p className="text-muted-foreground">
              Estimate your daily calorie needs and get a personalized macro breakdown based on your goals.
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
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="25"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select value={gender} onValueChange={setGender}>
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
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
                  <Label htmlFor="height">Height</Label>
                  <div className="flex gap-2">
                    <Input
                      id="height"
                      type="number"
                      placeholder={heightUnit === "in" ? "68" : "173"}
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      className="shrink-0"
                      onClick={() => setHeightUnit(heightUnit === "in" ? "cm" : "in")}
                    >
                      {heightUnit}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="activity">Activity Level</Label>
                <Select value={activityLevel} onValueChange={setActivityLevel}>
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
                <Label>Goal</Label>
                <RadioGroup value={goal} onValueChange={setGoal} className="space-y-3">
                  {[
                    { value: "lose", label: "Lose Weight (−500 cal/day)" },
                    { value: "maintain", label: "Maintain Weight" },
                    { value: "gain", label: "Gain Weight (+500 cal/day)" },
                  ].map((option) => (
                    <label
                      key={option.value}
                      htmlFor={`calgoal-${option.value}`}
                      className={`flex items-center space-x-3 w-full rounded-xl border p-4 cursor-pointer transition-all hover:border-warm-stone hover:bg-warm-stone/5 ${
                        goal === option.value ? "border-warm-stone bg-warm-stone/5" : "bg-background"
                      }`}
                    >
                      <RadioGroupItem value={option.value} id={`calgoal-${option.value}`} />
                      <Label htmlFor={`calgoal-${option.value}`} className="cursor-pointer font-medium flex-1">
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
                Calculate Calories
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
                <p className="text-4xl font-display font-bold text-warm-stone">{result.dailyCalories}</p>
                <p className="text-sm text-muted-foreground mt-1">calories per day</p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 rounded-xl bg-soft-linen">
                  <p className="text-sm text-muted-foreground mb-1">Protein</p>
                  <p className="text-2xl font-display font-bold text-rich-black">{result.protein.grams}g</p>
                  <p className="text-xs text-muted-foreground">{result.protein.percent}%</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-soft-linen">
                  <p className="text-sm text-muted-foreground mb-1">Carbs</p>
                  <p className="text-2xl font-display font-bold text-rich-black">{result.carbs.grams}g</p>
                  <p className="text-xs text-muted-foreground">{result.carbs.percent}%</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-soft-linen">
                  <p className="text-sm text-muted-foreground mb-1">Fat</p>
                  <p className="text-2xl font-display font-bold text-rich-black">{result.fat.grams}g</p>
                  <p className="text-xs text-muted-foreground">{result.fat.percent}%</p>
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
