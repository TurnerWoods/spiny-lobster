import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import logoIcon from "@/assets/logo-icon.png";
import IntakeFormProgress from "@/components/intake/IntakeFormProgress";
import HealthGoalsStep from "@/components/intake/HealthGoalsStep";
import MedicalHistoryStep from "@/components/intake/MedicalHistoryStep";
import LifestyleStep from "@/components/intake/LifestyleStep";
import ReviewStep from "@/components/intake/ReviewStep";

const steps = [
  { id: 1, name: "Goals" },
  { id: 2, name: "Medical" },
  { id: 3, name: "Lifestyle" },
  { id: 4, name: "Review" },
];

const Intake = () => {
  const { user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

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

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login", { state: { from: "/intake" } });
    }
  }, [user, authLoading, navigate]);

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        if (!healthGoals.primaryGoal) {
          toast.error("Please select your primary health goal");
          return false;
        }
        return true;
      case 2:
        return true; // Medical history is optional
      case 3:
        return true; // Lifestyle is optional
      case 4:
        if (!agreedToTerms) {
          toast.error("Please agree to the terms to continue");
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!user) {
      toast.error("Please sign in to submit your intake form");
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
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isComplete) {
    return (
      <div className="min-h-screen bg-muted/30">
        <header className="border-b bg-background">
          <div className="container flex h-16 items-center px-4">
            <Link to="/" className="flex items-center gap-2">
              <img src={logoIcon} alt="Elevare Health" className="h-8 w-auto" />
              <span className="font-display text-lg font-bold">
                Elevare<span className="text-primary">Health</span>
              </span>
            </Link>
          </div>
        </header>
        <div className="container flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md text-center"
          >
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground">Intake Submitted!</h1>
            <p className="mt-3 text-muted-foreground">
              Thank you for completing your intake form. Our medical team will review your information within 24-48
              hours and reach out with your personalized treatment plan.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link to="/dashboard">
                <Button className="w-full bg-primary hover:bg-primary-dark sm:w-auto">Go to Dashboard</Button>
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
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="border-b bg-background">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <img src={logoIcon} alt="Elevare Health" className="h-8 w-auto" />
            <span className="font-display text-lg font-bold">
              Elevare<span className="text-primary">Health</span>
            </span>
          </Link>
          <Link to="/" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
            <ArrowLeft className="h-4 w-4" />
            Exit
          </Link>
        </div>
      </header>

      <div className="container max-w-3xl px-4 py-8">
        {/* Progress */}
        <IntakeFormProgress steps={steps} currentStep={currentStep} />

        {/* Form Content */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 rounded-2xl border bg-card p-6 shadow-lg sm:p-8"
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

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-between border-t pt-6">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={currentStep === 1}
              className={currentStep === 1 ? "invisible" : ""}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>

            {currentStep < 4 ? (
              <Button onClick={handleNext} className="bg-primary hover:bg-primary-dark">
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting || !agreedToTerms}
                className="bg-primary hover:bg-primary-dark"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Intake"
                )}
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Intake;
