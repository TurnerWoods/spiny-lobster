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
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const validateField = (field: string, value: string) => {
    const newErrors = { ...errors };

    switch (field) {
      case 'age':
        if (!value) newErrors.age = 'Age is required';
        else if (parseFloat(value) < 1 || parseFloat(value) > 120) newErrors.age = 'Enter a valid age';
        else delete newErrors.age;
        break;
      case 'weight':
        if (!value) newErrors.weight = 'Weight is required';
        else if (parseFloat(value) <= 0) newErrors.weight = 'Enter a valid weight';
        else delete newErrors.weight;
        break;
      case 'height':
        if (!value) newErrors.height = 'Height is required';
        else if (parseFloat(value) <= 0) newErrors.height = 'Enter a valid height';
        else delete newErrors.height;
        break;
      case 'gender':
        if (!value) newErrors.gender = 'Please select a gender';
        else delete newErrors.gender;
        break;
      case 'activityLevel':
        if (!value) newErrors.activityLevel = 'Please select an activity level';
        else delete newErrors.activityLevel;
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validateField(field, field === 'age' ? age : field === 'weight' ? weight : field === 'height' ? height : field === 'gender' ? gender : activityLevel);
  };

  const isFormValid = age && weight && height && gender && activityLevel &&
    parseFloat(age) > 0 && parseFloat(weight) > 0 && parseFloat(height) > 0;

  const calculate = () => {
    // Validate all fields
    setTouched({ age: true, weight: true, height: true, gender: true, activityLevel: true });

    const ageNum = parseFloat(age);
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);

    if (isNaN(ageNum) || isNaN(weightNum) || isNaN(heightNum) || !gender || !activityLevel) {
      validateField('age', age);
      validateField('weight', weight);
      validateField('height', height);
      validateField('gender', gender);
      validateField('activityLevel', activityLevel);
      return;
    }

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
            {/* Mobile: stack vertically, Desktop: 2 columns */}
            <div className="space-y-4 md:space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="age" className="text-sm md:text-base font-medium">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    inputMode="numeric"
                    placeholder="25"
                    value={age}
                    onChange={(e) => {
                      setAge(e.target.value);
                      if (touched.age) validateField('age', e.target.value);
                    }}
                    onBlur={() => handleBlur('age')}
                    className={touched.age && errors.age ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}
                  />
                  {touched.age && errors.age && (
                    <p className="text-sm text-red-600 mt-1 font-medium">{errors.age}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender" className="text-sm md:text-base font-medium">Gender</Label>
                  <Select
                    value={gender}
                    onValueChange={(value) => {
                      setGender(value);
                      setTouched(prev => ({ ...prev, gender: true }));
                      validateField('gender', value);
                    }}
                  >
                    <SelectTrigger
                      id="gender"
                      className={`min-h-[44px] ${touched.gender && errors.gender ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                    >
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                  {touched.gender && errors.gender && (
                    <p className="text-sm text-red-600 mt-1 font-medium">{errors.gender}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="weight" className="text-sm md:text-base font-medium">Weight</Label>
                  <div className="flex gap-2">
                    <Input
                      id="weight"
                      type="number"
                      inputMode="decimal"
                      placeholder={weightUnit === "lbs" ? "150" : "68"}
                      value={weight}
                      onChange={(e) => {
                        setWeight(e.target.value);
                        if (touched.weight) validateField('weight', e.target.value);
                      }}
                      onBlur={() => handleBlur('weight')}
                      className={touched.weight && errors.weight ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}
                    />
                    <Button
                      variant="outline"
                      size="default"
                      className="shrink-0 min-h-[44px] min-w-[52px]"
                      onClick={() => setWeightUnit(weightUnit === "lbs" ? "kg" : "lbs")}
                    >
                      {weightUnit}
                    </Button>
                  </div>
                  {touched.weight && errors.weight && (
                    <p className="text-sm text-red-600 mt-1 font-medium">{errors.weight}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height" className="text-sm md:text-base font-medium">Height</Label>
                  <div className="flex gap-2">
                    <Input
                      id="height"
                      type="number"
                      inputMode="decimal"
                      placeholder={heightUnit === "in" ? "68" : "173"}
                      value={height}
                      onChange={(e) => {
                        setHeight(e.target.value);
                        if (touched.height) validateField('height', e.target.value);
                      }}
                      onBlur={() => handleBlur('height')}
                      className={touched.height && errors.height ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}
                    />
                    <Button
                      variant="outline"
                      size="default"
                      className="shrink-0 min-h-[44px] min-w-[52px]"
                      onClick={() => setHeightUnit(heightUnit === "in" ? "cm" : "in")}
                    >
                      {heightUnit}
                    </Button>
                  </div>
                  {touched.height && errors.height && (
                    <p className="text-sm text-red-600 mt-1 font-medium">{errors.height}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="activity" className="text-sm md:text-base font-medium">Activity Level</Label>
                <Select
                  value={activityLevel}
                  onValueChange={(value) => {
                    setActivityLevel(value);
                    setTouched(prev => ({ ...prev, activityLevel: true }));
                    validateField('activityLevel', value);
                  }}
                >
                  <SelectTrigger
                    id="activity"
                    className={`min-h-[44px] ${touched.activityLevel && errors.activityLevel ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                  >
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
                {touched.activityLevel && errors.activityLevel && (
                  <p className="text-sm text-red-600 mt-1 font-medium">{errors.activityLevel}</p>
                )}
              </div>

              <Button
                className="w-full mt-6 min-h-[48px] text-base bg-warm-stone hover:bg-warm-stone/90 text-pure-white disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={calculate}
                disabled={!isFormValid}
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
              {/* Mobile: stack in single column, Desktop: 2 columns */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                <div className="text-center p-4 sm:p-5 rounded-xl bg-soft-linen">
                  <p className="text-sm md:text-base text-muted-foreground mb-1">BMR</p>
                  <p className="text-2xl sm:text-3xl font-display font-bold text-rich-black">{results.bmr}</p>
                  <p className="text-sm text-muted-foreground">cal/day</p>
                </div>
                <div className="text-center p-4 sm:p-5 rounded-xl bg-warm-stone/10 border border-warm-stone/20">
                  <p className="text-sm md:text-base text-muted-foreground mb-1">TDEE</p>
                  <p className="text-2xl sm:text-3xl font-display font-bold text-warm-stone">{results.tdee}</p>
                  <p className="text-sm text-muted-foreground">cal/day</p>
                </div>
                <div className="text-center p-4 sm:p-5 rounded-xl bg-soft-linen">
                  <p className="text-sm md:text-base text-muted-foreground mb-1">Fat Loss (-500)</p>
                  <p className="text-2xl sm:text-3xl font-display font-bold text-rich-black">{results.deficit}</p>
                  <p className="text-sm text-muted-foreground">cal/day</p>
                </div>
                <div className="text-center p-4 sm:p-5 rounded-xl bg-soft-linen">
                  <p className="text-sm md:text-base text-muted-foreground mb-1">Muscle Gain (+500)</p>
                  <p className="text-2xl sm:text-3xl font-display font-bold text-rich-black">{results.surplus}</p>
                  <p className="text-sm text-muted-foreground">cal/day</p>
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
