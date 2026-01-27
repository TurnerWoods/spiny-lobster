import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Flame } from "lucide-react";

interface Results {
  bmr: number;
  tdee: number;
  deficit: number;
  surplus: number;
}

const activityLevels = [
  { value: "1.2", label: "Sedentary (little or no exercise)" },
  { value: "1.375", label: "Lightly Active (1–3 days/week)" },
  { value: "1.55", label: "Moderately Active (3–5 days/week)" },
  { value: "1.725", label: "Very Active (6–7 days/week)" },
  { value: "1.9", label: "Extra Active (athlete / physical job)" },
];

export default function TDEECalculator() {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [weight, setWeight] = useState("");
  const [weightUnit, setWeightUnit] = useState("lbs");
  const [height, setHeight] = useState("");
  const [heightUnit, setHeightUnit] = useState("in");
  const [activityLevel, setActivityLevel] = useState("");
  const [results, setResults] = useState<Results | null>(null);

  const calculate = () => {
    const ageNum = parseFloat(age);
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);

    if (isNaN(ageNum) || isNaN(weightNum) || isNaN(heightNum) || !gender || !activityLevel) return;

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

    setResults({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      deficit: Math.round(tdee - 500),
      surplus: Math.round(tdee + 500),
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
              <Flame className="h-4 w-4 text-warm-stone" />
              <span className="text-sm font-medium text-warm-stone">Calculator</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-display font-bold text-rich-black mb-2">
              TDEE Calculator
            </h1>
            <p className="text-muted-foreground">
              Calculate your Total Daily Energy Expenditure to understand how many calories you burn each day.
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

              <Button
                className="w-full mt-4 bg-warm-stone hover:bg-warm-stone/90 text-pure-white"
                onClick={calculate}
              >
                Calculate TDEE
              </Button>
            </div>
          </motion.div>

          {results && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border bg-card p-6 shadow-sm md:p-8 mt-6"
            >
              <h2 className="text-xl font-display font-semibold text-foreground mb-6">Your Results</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 rounded-xl bg-soft-linen">
                  <p className="text-sm text-muted-foreground mb-1">BMR</p>
                  <p className="text-2xl font-display font-bold text-rich-black">{results.bmr}</p>
                  <p className="text-xs text-muted-foreground">cal/day</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-warm-stone/10 border border-warm-stone/20">
                  <p className="text-sm text-muted-foreground mb-1">TDEE</p>
                  <p className="text-2xl font-display font-bold text-warm-stone">{results.tdee}</p>
                  <p className="text-xs text-muted-foreground">cal/day</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-soft-linen">
                  <p className="text-sm text-muted-foreground mb-1">Fat Loss (−500)</p>
                  <p className="text-2xl font-display font-bold text-rich-black">{results.deficit}</p>
                  <p className="text-xs text-muted-foreground">cal/day</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-soft-linen">
                  <p className="text-sm text-muted-foreground mb-1">Muscle Gain (+500)</p>
                  <p className="text-2xl font-display font-bold text-rich-black">{results.surplus}</p>
                  <p className="text-xs text-muted-foreground">cal/day</p>
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
