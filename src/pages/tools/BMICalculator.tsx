import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Scale } from "lucide-react";

interface BMIResult {
  bmi: number;
  category: string;
  color: string;
  context: string;
}

// BMI result categories using warm luxury palette instead of clinical colors
function getBMIResult(bmi: number): BMIResult {
  if (bmi < 18.5) {
    return {
      bmi,
      category: "Underweight",
      color: "text-warm-stone", // Warm tan for underweight
      context: "A BMI below 18.5 may indicate insufficient body weight. Consider consulting a healthcare provider about nutrition and hormone levels that could affect weight.",
    };
  } else if (bmi < 25) {
    return {
      bmi,
      category: "Normal",
      color: "text-accent-gold", // Accent gold for optimal/normal
      context: "A BMI between 18.5 and 24.9 is considered a healthy weight range. Maintaining balanced hormones can help sustain this healthy range.",
    };
  } else if (bmi < 30) {
    return {
      bmi,
      category: "Overweight",
      color: "text-[#B8956A]", // Warm amber-brown for caution
      context: "A BMI between 25 and 29.9 may indicate above-normal body weight. Hormonal imbalances, especially low testosterone, can contribute to weight gain.",
    };
  } else {
    return {
      bmi,
      category: "Obese",
      color: "text-[#A67563]", // Warm terracotta for attention
      context: "A BMI of 30 or above may indicate obesity. Hormonal optimization combined with medical weight management can help. Speaking with our physicians is recommended.",
    };
  }
}

export default function BMICalculator() {
  const [weight, setWeight] = useState("");
  const [weightUnit, setWeightUnit] = useState("lbs");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [heightCm, setHeightCm] = useState("");
  const [heightUnit, setHeightUnit] = useState("imperial");
  const [result, setResult] = useState<BMIResult | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const validateFields = () => {
    const newErrors: { [key: string]: string } = {};

    if (!weight || parseFloat(weight) <= 0) {
      newErrors.weight = 'Please enter a valid weight';
    }

    if (heightUnit === 'imperial') {
      if (!heightFt && !heightIn) {
        newErrors.height = 'Please enter your height';
      } else if ((heightFt && parseFloat(heightFt) < 0) || (heightIn && (parseFloat(heightIn) < 0 || parseFloat(heightIn) >= 12))) {
        newErrors.height = 'Please enter a valid height';
      }
    } else {
      if (!heightCm || parseFloat(heightCm) <= 0) {
        newErrors.height = 'Please enter a valid height';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const isFormValid = () => {
    const hasWeight = weight && parseFloat(weight) > 0;
    const hasHeight = heightUnit === 'imperial'
      ? (heightFt || heightIn) && (parseFloat(heightFt) > 0 || parseFloat(heightIn) > 0)
      : heightCm && parseFloat(heightCm) > 0;
    return hasWeight && hasHeight;
  };

  const calculate = () => {
    setTouched({ weight: true, height: true });
    if (!validateFields()) return;

    const weightNum = parseFloat(weight);
    if (isNaN(weightNum)) return;

    const weightKg = weightUnit === "lbs" ? weightNum * 0.453592 : weightNum;

    let heightM: number;
    if (heightUnit === "imperial") {
      const ft = parseFloat(heightFt) || 0;
      const inches = parseFloat(heightIn) || 0;
      const totalInches = ft * 12 + inches;
      if (totalInches === 0) return;
      heightM = totalInches * 0.0254;
    } else {
      const cm = parseFloat(heightCm);
      if (isNaN(cm) || cm === 0) return;
      heightM = cm / 100;
    }

    const bmi = weightKg / (heightM * heightM);
    setResult(getBMIResult(parseFloat(bmi.toFixed(1))));
  };

  const bmiProgressValue = result ? Math.min((result.bmi / 40) * 100, 100) : 0;

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
              <Scale className="h-4 w-4 text-warm-stone" />
              <span className="text-sm font-medium text-warm-stone">Calculator</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-display font-bold text-rich-black mb-2">
              BMI Calculator
            </h1>
            <p className="text-muted-foreground">
              Calculate your Body Mass Index to get a general assessment of your weight relative to your height.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl border bg-card p-6 shadow-sm md:p-8"
          >
            <h2 className="text-xl font-display font-semibold text-foreground mb-6">Your Details</h2>
            <div className="space-y-4 md:space-y-5">
              <div className="space-y-2">
                <Label htmlFor="weight" className="text-sm md:text-base font-medium">Weight</Label>
                <div className="flex gap-2">
                  <Input
                    id="weight"
                    type="number"
                    inputMode="decimal"
                    placeholder={weightUnit === "lbs" ? "150" : "68"}
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
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
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <Label className="text-sm md:text-base font-medium">Height</Label>
                  <Button
                    variant="ghost"
                    size="default"
                    onClick={() => setHeightUnit(heightUnit === "imperial" ? "metric" : "imperial")}
                    className="text-warm-stone hover:text-warm-stone/80 min-h-[44px] -my-1"
                  >
                    Switch to {heightUnit === "imperial" ? "cm" : "ft/in"}
                  </Button>
                </div>
                {heightUnit === "imperial" ? (
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <Input
                        type="number"
                        inputMode="numeric"
                        placeholder="5"
                        value={heightFt}
                        onChange={(e) => setHeightFt(e.target.value)}
                        onBlur={() => handleBlur('height')}
                        className={touched.height && errors.height ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}
                        aria-label="Height in feet"
                      />
                      <span className="text-sm text-muted-foreground mt-1.5 block">feet</span>
                    </div>
                    <div className="flex-1">
                      <Input
                        type="number"
                        inputMode="numeric"
                        placeholder="8"
                        value={heightIn}
                        onChange={(e) => setHeightIn(e.target.value)}
                        onBlur={() => handleBlur('height')}
                        className={touched.height && errors.height ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}
                        aria-label="Height in inches"
                      />
                      <span className="text-sm text-muted-foreground mt-1.5 block">inches</span>
                    </div>
                  </div>
                ) : (
                  <Input
                    type="number"
                    inputMode="decimal"
                    placeholder="173"
                    value={heightCm}
                    onChange={(e) => setHeightCm(e.target.value)}
                    onBlur={() => handleBlur('height')}
                    className={touched.height && errors.height ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}
                    aria-label="Height in centimeters"
                  />
                )}
                {touched.height && errors.height && (
                  <p className="text-sm text-red-600 mt-1 font-medium">{errors.height}</p>
                )}
              </div>

              <Button
                className="w-full mt-6 min-h-[48px] text-base bg-warm-stone hover:bg-warm-stone/90 text-pure-white disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={calculate}
                disabled={!isFormValid()}
              >
                Calculate BMI
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
              <div className="space-y-6">
                <div className="text-center">
                  <p className="text-4xl sm:text-5xl font-display font-bold text-rich-black">{result.bmi}</p>
                  <p className={`text-lg sm:text-xl font-semibold mt-2 ${result.color}`}>
                    {result.category}
                  </p>
                </div>

                {/* BMI scale - responsive text sizing */}
                <div className="space-y-2">
                  {/* Mobile: simplified labels, Desktop: full labels */}
                  <div className="flex justify-between text-xs sm:text-sm text-muted-foreground px-1">
                    <span className="text-center flex-1">Under</span>
                    <span className="text-center flex-1">Normal</span>
                    <span className="text-center flex-1">Over</span>
                    <span className="text-center flex-1">Obese</span>
                  </div>
                  <Progress value={bmiProgressValue} className="h-3 sm:h-4" />
                  <div className="flex justify-between text-xs sm:text-sm text-muted-foreground px-1">
                    <span className="text-center flex-1">{"<18.5"}</span>
                    <span className="text-center flex-1">18.5-24.9</span>
                    <span className="text-center flex-1">25-29.9</span>
                    <span className="text-center flex-1">30+</span>
                  </div>
                </div>

                <div className="rounded-xl bg-warm-stone/5 border border-warm-stone/10 p-4 sm:p-5">
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{result.context}</p>
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
