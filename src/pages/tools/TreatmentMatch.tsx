import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";

interface QuizAnswers {
  goal: string;
  age: string;
  symptoms: string[];
  lifestyle: string;
  preference: string;
  budget: string;
}

const questions = [
  {
    key: "goal" as const,
    title: "What is your primary health goal?",
    description: "This helps us match you with the right treatment plan",
    type: "radio" as const,
    options: [
      { value: "anti-aging", label: "Anti-Aging & Vitality" },
      { value: "hormone", label: "Hormone Optimization" },
      { value: "weight", label: "Weight Management" },
      { value: "energy", label: "Energy & Performance" },
      { value: "wellness", label: "Overall Wellness" },
    ],
  },
  {
    key: "age" as const,
    title: "What is your age range?",
    description: "Treatment recommendations vary by age group",
    type: "radio" as const,
    options: [
      { value: "18-25", label: "18–25" },
      { value: "26-35", label: "26–35" },
      { value: "36-45", label: "36–45" },
      { value: "46-55", label: "46–55" },
      { value: "56+", label: "56+" },
    ],
  },
  {
    key: "symptoms" as const,
    title: "Select any symptoms you experience",
    description: "Select all that apply",
    type: "checkbox" as const,
    options: [
      { value: "fatigue", label: "Fatigue or Low Energy" },
      { value: "weight-gain", label: "Unexplained Weight Gain" },
      { value: "mood", label: "Mood Changes or Irritability" },
      { value: "libido", label: "Low Libido" },
      { value: "sleep", label: "Poor Sleep Quality" },
      { value: "brain-fog", label: "Brain Fog or Difficulty Concentrating" },
    ],
  },
  {
    key: "lifestyle" as const,
    title: "How would you describe your lifestyle?",
    description: "This helps us tailor the intensity of your plan",
    type: "radio" as const,
    options: [
      { value: "busy", label: "Busy — minimal time for routines" },
      { value: "moderate", label: "Moderate — some time for self-care" },
      { value: "dedicated", label: "Dedicated — enjoy thorough routines" },
    ],
  },
  {
    key: "preference" as const,
    title: "What type of treatment do you prefer?",
    description: "We offer various treatment modalities",
    type: "radio" as const,
    options: [
      { value: "topical", label: "Topical treatments (creams, gels)" },
      { value: "injectable", label: "Injectable therapies" },
      { value: "oral", label: "Oral supplements & medications" },
      { value: "combination", label: "Open to a combination approach" },
    ],
  },
  {
    key: "budget" as const,
    title: "What is your monthly budget for treatment?",
    description: "All plans include physician oversight and lab work",
    type: "radio" as const,
    options: [
      { value: "low", label: "Under $100/month" },
      { value: "medium", label: "$100–$250/month" },
      { value: "high", label: "$250–$500/month" },
      { value: "premium", label: "$500+/month" },
    ],
  },
];

function getRecommendations(answers: QuizAnswers) {
  const recs: { title: string; description: string; match: number }[] = [];

  if (answers.goal === "hormone" || answers.symptoms.includes("libido") || answers.symptoms.includes("fatigue")) {
    recs.push({
      title: "Testosterone Replacement Therapy",
      description: "Physician-supervised TRT to restore optimal testosterone levels, improving energy, mood, libido, and body composition.",
      match: 95,
    });
  }
  if (answers.goal === "weight" || answers.symptoms.includes("weight-gain")) {
    recs.push({
      title: "Medical Weight Management",
      description: "A comprehensive weight loss program combining GLP-1 medications, nutritional guidance, and metabolic optimization.",
      match: 92,
    });
  }
  if (answers.goal === "anti-aging" || answers.symptoms.includes("fatigue")) {
    recs.push({
      title: "Peptide Therapy",
      description: "Advanced peptide protocols to support growth hormone production, recovery, anti-aging, and overall vitality.",
      match: 88,
    });
  }
  if (answers.goal === "energy" || answers.symptoms.includes("brain-fog")) {
    recs.push({
      title: "Cognitive & Energy Optimization",
      description: "Targeted nootropics and hormone balancing to sharpen focus, enhance mental clarity, and sustain energy throughout the day.",
      match: 85,
    });
  }
  if (answers.symptoms.includes("sleep") || answers.symptoms.includes("mood")) {
    recs.push({
      title: "Sleep & Stress Protocol",
      description: "A holistic approach to improving sleep quality and managing stress through hormonal balance and targeted supplementation.",
      match: 83,
    });
  }
  if (answers.goal === "wellness") {
    recs.push({
      title: "Comprehensive Wellness Panel",
      description: "Full-spectrum lab work and personalized health optimization plan covering hormones, metabolic markers, and micronutrients.",
      match: 90,
    });
  }

  if (recs.length === 0) {
    recs.push(
      {
        title: "Comprehensive Health Assessment",
        description: "Start with a full evaluation including lab work and physician consultation to determine the best treatment path for you.",
        match: 95,
      },
      {
        title: "Hormone Optimization Starter",
        description: "A foundational program to assess and optimize your key hormones for improved wellbeing.",
        match: 88,
      },
    );
  }

  return recs.sort((a, b) => b.match - a.match).slice(0, 3);
}

export default function TreatmentMatch() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({
    goal: "",
    age: "",
    symptoms: [],
    lifestyle: "",
    preference: "",
    budget: "",
  });
  const [showResults, setShowResults] = useState(false);

  const totalSteps = questions.length;
  const currentQuestion = questions[step];
  const progressValue = ((step + 1) / totalSteps) * 100;

  const handleRadioChange = (value: string) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.key]: value }));
  };

  const handleCheckboxChange = (value: string, checked: boolean) => {
    setAnswers((prev) => ({
      ...prev,
      symptoms: checked
        ? [...prev.symptoms, value]
        : prev.symptoms.filter((s) => s !== value),
    }));
  };

  const canProceed =
    currentQuestion.type === "checkbox"
      ? answers.symptoms.length > 0
      : answers[currentQuestion.key as keyof QuizAnswers] !== "";

  const handleNext = () => {
    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleBack = () => {
    if (showResults) {
      setShowResults(false);
    } else if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleReset = () => {
    setStep(0);
    setAnswers({ goal: "", age: "", symptoms: [], lifestyle: "", preference: "", budget: "" });
    setShowResults(false);
  };

  const recommendations = showResults ? getRecommendations(answers) : [];

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

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-warm-stone/10 border border-warm-stone/20 mb-6 ml-0 block w-fit">
              <Sparkles className="h-4 w-4 text-warm-stone" />
              <span className="text-sm font-medium text-warm-stone">AI-Powered</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-display font-bold text-rich-black mb-2">
              Treatment Match Quiz
            </h1>
            <p className="text-muted-foreground">
              Answer {totalSteps} quick questions to discover personalized treatment recommendations tailored to your needs.
            </p>
          </motion.div>

          {!showResults ? (
            <>
              <div className="mb-8">
                <div className="mb-2 flex justify-between text-sm text-muted-foreground">
                  <span>Question {step + 1} of {totalSteps}</span>
                  <span>{Math.round(progressValue)}% complete</span>
                </div>
                <Progress value={progressValue} className="h-2" />
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-2xl border bg-card p-6 shadow-sm md:p-8"
                >
                  <h2 className="mb-2 text-xl font-display font-semibold text-foreground md:text-2xl">
                    {currentQuestion.title}
                  </h2>
                  {currentQuestion.description && (
                    <p className="mb-6 text-muted-foreground">{currentQuestion.description}</p>
                  )}

                  {currentQuestion.type === "radio" ? (
                    <RadioGroup
                      value={answers[currentQuestion.key as keyof QuizAnswers] as string}
                      onValueChange={handleRadioChange}
                      className="space-y-3"
                    >
                      {currentQuestion.options.map((option) => (
                        <label
                          key={option.value}
                          htmlFor={option.value}
                          className={`flex items-center space-x-3 w-full rounded-xl border p-4 cursor-pointer transition-all hover:border-warm-stone hover:bg-warm-stone/5 ${
                            (answers[currentQuestion.key as keyof QuizAnswers] as string) === option.value
                              ? "border-warm-stone bg-warm-stone/5"
                              : "bg-background"
                          }`}
                        >
                          <RadioGroupItem value={option.value} id={option.value} />
                          <Label htmlFor={option.value} className="cursor-pointer font-medium flex-1">
                            {option.label}
                          </Label>
                        </label>
                      ))}
                    </RadioGroup>
                  ) : (
                    <div className="space-y-3">
                      {currentQuestion.options.map((option) => (
                        <label
                          key={option.value}
                          htmlFor={option.value}
                          className={`flex items-center space-x-3 w-full rounded-xl border p-4 cursor-pointer transition-all hover:border-warm-stone hover:bg-warm-stone/5 ${
                            answers.symptoms.includes(option.value)
                              ? "border-warm-stone bg-warm-stone/5"
                              : "bg-background"
                          }`}
                        >
                          <Checkbox
                            id={option.value}
                            checked={answers.symptoms.includes(option.value)}
                            onCheckedChange={(checked) =>
                              handleCheckboxChange(option.value, checked as boolean)
                            }
                          />
                          <Label htmlFor={option.value} className="cursor-pointer font-medium flex-1">
                            {option.label}
                          </Label>
                        </label>
                      ))}
                    </div>
                  )}

                  <div className="flex justify-between mt-8">
                    <Button
                      variant="outline"
                      onClick={handleBack}
                      disabled={step === 0}
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" /> Back
                    </Button>
                    <Button
                      onClick={handleNext}
                      disabled={!canProceed}
                      className="bg-warm-stone hover:bg-warm-stone/90 text-pure-white"
                    >
                      {step < totalSteps - 1 ? (
                        <>
                          Next <ArrowRight className="w-4 h-4 ml-1" />
                        </>
                      ) : (
                        "See Results"
                      )}
                    </Button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              <div className="rounded-2xl border bg-card p-6 shadow-sm md:p-8">
                <h2 className="text-2xl font-display font-bold text-rich-black mb-6">
                  Your Personalized Recommendations
                </h2>
                <div className="space-y-4">
                  {recommendations.map((rec, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.15 }}
                      className="rounded-xl border p-5 hover:border-warm-stone/30 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-display font-semibold text-lg text-rich-black">{rec.title}</h3>
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-warm-stone/10 border border-warm-stone/20 text-xs font-medium text-warm-stone">
                          {rec.match}% Match
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{rec.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Link to="/intake">
                  <Button size="lg" className="w-full bg-warm-stone hover:bg-warm-stone/90 text-pure-white">
                    Start Free Medical Evaluation
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <div className="flex gap-3">
                  <Button variant="outline" size="lg" onClick={handleBack} className="flex-1">
                    <ArrowLeft className="w-4 h-4 mr-1" /> Back
                  </Button>
                  <Button variant="outline" size="lg" onClick={handleReset} className="flex-1">
                    Retake Quiz
                  </Button>
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
