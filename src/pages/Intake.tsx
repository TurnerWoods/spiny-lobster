import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, Loader2, CheckCircle2, Sparkles, Shield, Save, X, AlertCircle } from "lucide-react";
import IntakeFormProgress from "@/components/intake/IntakeFormProgress";
import HealthGoalsStep from "@/components/intake/HealthGoalsStep";
import MedicalHistoryStep from "@/components/intake/MedicalHistoryStep";
import LifestyleStep from "@/components/intake/LifestyleStep";
import ReviewStep from "@/components/intake/ReviewStep";

const STORAGE_KEY = "intake_form_progress";

const steps = [
  { id: 1, name: "Goals" },
  { id: 2, name: "Medical" },
  { id: 3, name: "Lifestyle" },
  { id: 4, name: "Review" },
];

// Get action-oriented CTA text based on current step
const getCtaText = (step: number): string => {
  switch (step) {
    case 1:
      return "Continue to Medical History";
    case 2:
      return "Continue to Lifestyle";
    case 3:
      return "Review Your Answers";
    case 4:
      return "Submit & Get Your Plan";
    default:
      return "Continue";
  }
};

const Intake = () => {
  const { user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [hasPrefilledData, setHasPrefilledData] = useState(false);
  const [hasSavedProgress, setHasSavedProgress] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Form data
  const [healthGoals, setHealthGoals] = useState({
    primaryGoal: "",
    secondaryGoals: [] as string[],
    targetTimeline: "",
  });

  const [medicalHistory, setMedicalHistory] = useState({
    currentMedications: "",
    allergies: "",
    medicalConditions: [] as string[],
    previousTreatments: "",
    currentWeight: "",
    targetWeight: "",
    heightFeet: "",
    heightInches: "",
  });

  const [lifestyle, setLifestyle] = useState({
    exerciseFrequency: "",
    dietDescription: "",
    sleepHours: "",
    stressLevel: "",
  });

  // Load saved progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.healthGoals) setHealthGoals(data.healthGoals);
        if (data.medicalHistory) setMedicalHistory(data.medicalHistory);
        if (data.lifestyle) setLifestyle(data.lifestyle);
        if (data.currentStep) setCurrentStep(data.currentStep);
        setHasSavedProgress(true);
        toast.info("Your progress has been restored", {
          icon: <Save className="h-4 w-4" />,
          duration: 3000
        });
      } catch (e) {
        console.error("Error loading saved progress:", e);
      }
    }
  }, []);

  // Save progress to localStorage (debounced)
  const saveProgress = useCallback(() => {
    const data = {
      healthGoals,
      medicalHistory,
      lifestyle,
      currentStep,
      savedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setLastSaved(new Date());
  }, [healthGoals, medicalHistory, lifestyle, currentStep]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (healthGoals.primaryGoal || medicalHistory.currentWeight || lifestyle.exerciseFrequency) {
        saveProgress();
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [healthGoals, medicalHistory, lifestyle, currentStep, saveProgress]);

  // Clear saved progress
  const clearSavedProgress = () => {
    localStorage.removeItem(STORAGE_KEY);
    setHasSavedProgress(false);
    toast.success("Saved progress cleared");
  };

  // Pre-fill from symptom checker data
  useEffect(() => {
    const symptomData = localStorage.getItem("symptom_checker_data");
    if (symptomData && !hasPrefilledData) {
      try {
        const parsed = JSON.parse(symptomData);
        const { answers, resultLevel } = parsed;

        // Map symptom checker answers to intake form
        const secondaryGoals: string[] = [];

        if (answers.energy >= 2) secondaryGoals.push("Increase energy levels");
        if (answers.sleep >= 2) secondaryGoals.push("Improve sleep quality");
        if (answers.muscle >= 2) secondaryGoals.push("Build muscle mass");
        if (answers.mood >= 2) secondaryGoals.push("Improve mood");
        if (answers.focus >= 2) secondaryGoals.push("Enhance mental clarity");
        if (answers.libido >= 2) secondaryGoals.push("Boost libido");

        const primaryGoal = resultLevel === "high" || resultLevel === "moderate"
          ? "hormone-therapy"
          : "";

        let sleepHours = "";
        if (answers.sleep === 0) sleepHours = "7-8";
        else if (answers.sleep === 1) sleepHours = "6-7";
        else if (answers.sleep === 2) sleepHours = "5-6";
        else if (answers.sleep === 3) sleepHours = "less-than-5";

        let exerciseFrequency = "";
        if (answers.recovery !== undefined) {
          if (answers.recovery === 0) exerciseFrequency = "active";
          else if (answers.recovery === 1) exerciseFrequency = "moderate";
          else if (answers.recovery === 2) exerciseFrequency = "light";
          else exerciseFrequency = "sedentary";
        }

        setHealthGoals(prev => ({
          ...prev,
          primaryGoal: primaryGoal || prev.primaryGoal,
          secondaryGoals: secondaryGoals.length > 0 ? secondaryGoals : prev.secondaryGoals,
        }));

        setLifestyle(prev => ({
          ...prev,
          sleepHours: sleepHours || prev.sleepHours,
          exerciseFrequency: exerciseFrequency || prev.exerciseFrequency,
        }));

        setHasPrefilledData(true);
        toast.success("We've pre-filled some answers from your symptom quiz!", {
          icon: <Sparkles className="h-4 w-4" />,
        });
      } catch (e) {
        console.error("Error parsing symptom checker data:", e);
      }
    }
  }, [hasPrefilledData]);

  // Auth is NOT required to start the assessment.
  // Users create an account only at submission (step 4).
  // This maximizes top-of-funnel conversions.

  const validateStep = (step: number): boolean => {
    setValidationError(null);
    switch (step) {
      case 1:
        if (!healthGoals.primaryGoal) {
          const errorMsg = "Select your primary health goal to continue";
          setValidationError(errorMsg);
          toast.error(errorMsg);
          return false;
        }
        return true;
      case 2:
        return true; // Medical history is optional
      case 3:
        return true; // Lifestyle is optional
      case 4:
        if (!agreedToTerms) {
          const errorMsg = "Please review and accept the terms to submit your assessment";
          setValidationError(errorMsg);
          toast.error(errorMsg);
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setValidationError(null);
      setCurrentStep((prev) => Math.min(prev + 1, 4));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveAndExit = () => {
    saveProgress();
    toast.success("Your progress has been saved. Come back anytime!", {
      icon: <Save className="h-4 w-4" />,
    });
    navigate("/");
  };

  const handleSubmit = async () => {
    if (!user) {
      toast.info("Create a free account to save your assessment", {
        action: {
          label: "Sign Up",
          onClick: () => navigate("/signup", { state: { from: "/intake" } }),
        },
      });
      navigate("/signup", { state: { from: "/intake" } });
      return;
    }

    if (!validateStep(4)) return;

    setIsSubmitting(true);

    try {
      const heightInches =
        medicalHistory.heightFeet && medicalHistory.heightInches
          ? parseInt(medicalHistory.heightFeet) * 12 + parseInt(medicalHistory.heightInches)
          : null;

      const { error } = await supabase.from("intake_forms").insert({
        user_id: user.id,
        primary_goal: healthGoals.primaryGoal,
        secondary_goals: healthGoals.secondaryGoals,
        target_timeline: healthGoals.targetTimeline || null,
        current_medications: medicalHistory.currentMedications || null,
        allergies: medicalHistory.allergies || null,
        medical_conditions: medicalHistory.medicalConditions,
        previous_treatments: medicalHistory.previousTreatments || null,
        current_weight: medicalHistory.currentWeight ? parseFloat(medicalHistory.currentWeight) : null,
        target_weight: medicalHistory.targetWeight ? parseFloat(medicalHistory.targetWeight) : null,
        height_inches: heightInches,
        exercise_frequency: lifestyle.exerciseFrequency || null,
        diet_description: lifestyle.dietDescription || null,
        sleep_hours: lifestyle.sleepHours ? parseInt(lifestyle.sleepHours.split("-")[0]) : null,
        stress_level: lifestyle.stressLevel || null,
        preferred_treatment: healthGoals.primaryGoal,
        status: "submitted",
      });

      if (error) throw error;

      // Also create a treatment record
      await supabase.from("treatments").insert({
        user_id: user.id,
        treatment_type: healthGoals.primaryGoal.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
        status: "pending",
      });

      // Link symptom checker result to user if available
      const symptomResultId = localStorage.getItem("symptom_checker_result_id");
      if (symptomResultId) {
        await supabase
          .from("symptom_checker_results")
          .update({ user_id: user.id })
          .eq("id", symptomResultId);

        localStorage.removeItem("symptom_checker_result_id");
        localStorage.removeItem("symptom_checker_data");
        localStorage.removeItem("symptom_checker_session");
      }

      // Clear intake progress
      localStorage.removeItem(STORAGE_KEY);

      setIsComplete(true);
      toast.success("Your intake form has been submitted!");
    } catch (error) {
      console.error("Error submitting intake:", error);
      toast.error("Failed to submit intake form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-soft-linen via-pure-white to-light-cloud">
        <Loader2 className="h-8 w-8 animate-spin text-warm-stone" />
      </div>
    );
  }

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-soft-linen via-pure-white to-light-cloud">
        <header className="border-b border-warm-stone/10 bg-pure-white/70 backdrop-blur-xl">
          <div className="container flex h-16 items-center px-4">
            <Link to="/" className="flex items-center">
              <img
                src="/elevar-logo.svg"
                alt="Elevar Health logo"
                loading="eager"
                className="h-8 w-auto max-w-full"
              />
            </Link>
          </div>
        </header>
        <div className="container flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md text-center"
          >
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-success/10">
              <CheckCircle2 className="h-10 w-10 text-success" />
            </div>
            <h1 className="font-display text-2xl font-bold text-rich-black">You're All Set!</h1>
            <p className="mt-3 text-muted-foreground">
              Thank you for completing your intake form. Our medical team will review your information within 24-48
              hours and reach out with your personalized treatment plan.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link to="/dashboard">
                <Button variant="secondary" className="w-full sm:w-auto">
                  View My Dashboard
                  <ArrowRight className="ml-2" />
                </Button>
              </Link>
              <Link to="/">
                <Button variant="outline" className="w-full sm:w-auto">
                  Back to Home
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-soft-linen via-pure-white to-light-cloud">
      {/* Header */}
      <header className="border-b border-warm-stone/10 bg-pure-white/70 backdrop-blur-xl sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center">
            <img
              src="/elevar-logo.svg"
              alt="Elevar Health logo"
              loading="eager"
              className="h-8 w-auto max-w-full"
            />
          </Link>
          <div className="flex items-center gap-2">
            {lastSaved && (
              <span className="text-xs text-muted-foreground hidden sm:inline">
                Auto-saved {lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSaveAndExit}
              className="text-muted-foreground hover:text-warm-stone"
            >
              <Save className="h-4 w-4 mr-1.5 sm:mr-2" />
              <span className="hidden sm:inline">Save & Exit</span>
              <span className="sm:hidden">Save</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="container max-w-3xl px-4 py-6 sm:py-8">
        {/* Pre-filled indicator */}
        {hasPrefilledData && currentStep === 1 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 flex items-center gap-2 rounded-xl border border-warm-stone/20 bg-warm-stone/10 px-4 py-3 text-sm text-warm-stone"
          >
            <Sparkles className="h-4 w-4 flex-shrink-0" />
            <span>Some fields have been pre-filled based on your symptom quiz</span>
          </motion.div>
        )}

        {/* Saved progress indicator */}
        {hasSavedProgress && currentStep === 1 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 flex items-center justify-between gap-2 rounded-xl border border-accent-gold/25 bg-accent-gold/10 px-4 py-3 text-sm text-[#9A8444]"
          >
            <div className="flex items-center gap-2">
              <Save className="h-4 w-4 flex-shrink-0" />
              <span>Continuing from where you left off</span>
            </div>
            <button
              onClick={clearSavedProgress}
              className="text-[#9A8444] hover:text-accent-gold p-1"
              aria-label="Clear saved progress"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}

        {/* Progress */}
        <IntakeFormProgress steps={steps} currentStep={currentStep} />

        {/* Form Content */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 sm:mt-12 rounded-2xl border border-pure-white/40 bg-pure-white/80 p-5 sm:p-8 shadow-xl backdrop-blur-xl"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {currentStep === 1 && (
                <HealthGoalsStep
                  data={healthGoals}
                  onChange={(data) => setHealthGoals((prev) => ({ ...prev, ...data }))}
                  hasError={validationError !== null && currentStep === 1}
                />
              )}
              {currentStep === 2 && (
                <MedicalHistoryStep
                  data={medicalHistory}
                  onChange={(data) => setMedicalHistory((prev) => ({ ...prev, ...data }))}
                />
              )}
              {currentStep === 3 && (
                <LifestyleStep
                  data={lifestyle}
                  onChange={(data) => setLifestyle((prev) => ({ ...prev, ...data }))}
                />
              )}
              {currentStep === 4 && (
                <ReviewStep
                  formData={{ healthGoals, medicalHistory, lifestyle }}
                  agreedToTerms={agreedToTerms}
                  onAgreeChange={setAgreedToTerms}
                />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Inline Validation Error */}
          {validationError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 flex items-center gap-2 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive"
              role="alert"
              aria-live="polite"
            >
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <span>{validationError}</span>
            </motion.div>
          )}

          {/* Navigation - Mobile optimized */}
          <div className="mt-8 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-warm-stone/10 pt-6">
            <Button
              variant="ghost"
              onClick={handleBack}
              className={`text-muted-foreground hover:text-warm-stone w-full sm:w-auto ${
                currentStep === 1 ? "hidden" : ""
              }`}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>

            {currentStep < 4 ? (
              <Button
                onClick={handleNext}
                variant="secondary"
                className="w-full sm:w-auto"
                size="lg"
              >
                {getCtaText(currentStep)}
                <ArrowRight className="ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting || !agreedToTerms}
                variant="secondary"
                className="w-full sm:w-auto"
                size="lg"
                isLoading={isSubmitting}
                loadingText="Submitting..."
              >
                {getCtaText(currentStep)}
                <ArrowRight className="ml-2" />
              </Button>
            )}
          </div>

          {/* Skip optional steps hint */}
          {(currentStep === 2 || currentStep === 3) && (
            <p className="mt-4 text-center text-xs text-muted-foreground">
              These fields are optional. You can skip ahead or fill them in later.
            </p>
          )}
        </motion.div>

        {/* Trust Badge */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <Shield className="h-4 w-4 text-warm-stone" />
          <span>HIPAA Compliant • 256-bit Encryption</span>
        </div>
      </div>
    </div>
  );
};

export default Intake;
