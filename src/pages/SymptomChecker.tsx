import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, CheckCircle, AlertTriangle, Activity, Zap, Download, FileText, Loader2, AlertCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Link, useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type Question = {
  id: string;
  question: string;
  description?: string;
  options: { label: string; value: number; optionId: string }[];
};

const QUESTIONS: Question[] = [
  {
    id: "energy",
    question: "How would you describe your energy levels?",
    description: "Think about your typical day",
    options: [
      { optionId: "energy-0", label: "Consistently high energy", value: 0 },
      { optionId: "energy-1", label: "Generally good, occasional dips", value: 1 },
      { optionId: "energy-2", label: "Often tired, need coffee to function", value: 2 },
      { optionId: "energy-3", label: "Exhausted most of the time", value: 3 },
    ],
  },
  {
    id: "libido",
    question: "How has your sex drive been lately?",
    description: "Compared to your normal baseline",
    options: [
      { optionId: "libido-0", label: "Strong and consistent", value: 0 },
      { optionId: "libido-1", label: "Slightly decreased", value: 1 },
      { optionId: "libido-2", label: "Noticeably lower than before", value: 2 },
      { optionId: "libido-3", label: "Little to no interest", value: 3 },
    ],
  },
  {
    id: "mood",
    question: "How would you describe your mood?",
    description: "Over the past few weeks",
    options: [
      { optionId: "mood-0", label: "Positive and stable", value: 0 },
      { optionId: "mood-1", label: "Occasional irritability", value: 1 },
      { optionId: "mood-2", label: "Frequent mood swings or low mood", value: 2 },
      { optionId: "mood-3", label: "Persistent depression or anxiety", value: 3 },
    ],
  },
  {
    id: "focus",
    question: "How is your mental clarity and focus?",
    description: "At work or during daily tasks",
    options: [
      { optionId: "focus-0", label: "Sharp and focused", value: 0 },
      { optionId: "focus-1", label: "Occasional brain fog", value: 1 },
      { optionId: "focus-2", label: "Difficulty concentrating regularly", value: 2 },
      { optionId: "focus-3", label: "Constant brain fog, hard to think clearly", value: 3 },
    ],
  },
  {
    id: "muscle",
    question: "Have you noticed changes in your body composition?",
    description: "Muscle mass and body fat",
    options: [
      { optionId: "muscle-0", label: "Maintaining muscle easily", value: 0 },
      { optionId: "muscle-1", label: "Slight muscle loss despite working out", value: 1 },
      { optionId: "muscle-2", label: "Noticeable muscle loss, gaining fat", value: 2 },
      { optionId: "muscle-3", label: "Significant muscle loss, increased belly fat", value: 3 },
    ],
  },
  {
    id: "sleep",
    question: "How well do you sleep?",
    description: "Quality and restfulness",
    options: [
      { optionId: "sleep-0", label: "Deep, restful sleep most nights", value: 0 },
      { optionId: "sleep-1", label: "Occasional trouble falling/staying asleep", value: 1 },
      { optionId: "sleep-2", label: "Frequently wake up tired", value: 2 },
      { optionId: "sleep-3", label: "Chronic sleep issues, never feel rested", value: 3 },
    ],
  },
  {
    id: "motivation",
    question: "How motivated do you feel?",
    description: "For work, exercise, and personal goals",
    options: [
      { optionId: "motivation-0", label: "Highly driven and ambitious", value: 0 },
      { optionId: "motivation-1", label: "Generally motivated with some off days", value: 1 },
      { optionId: "motivation-2", label: "Struggling to find motivation", value: 2 },
      { optionId: "motivation-3", label: "No drive or ambition", value: 3 },
    ],
  },
  {
    id: "recovery",
    question: "How quickly do you recover from exercise?",
    description: "After workouts or physical activity",
    options: [
      { optionId: "recovery-0", label: "Recover quickly, ready for more", value: 0 },
      { optionId: "recovery-1", label: "Takes a bit longer than it used to", value: 1 },
      { optionId: "recovery-2", label: "Often sore for days", value: 2 },
      { optionId: "recovery-3", label: "Extremely slow recovery, avoid exercise", value: 3 },
    ],
  },
  {
    id: "age",
    question: "What's your age range?",
    options: [
      { optionId: "age-0", label: "Under 30", value: 0 },
      { optionId: "age-1", label: "30-39", value: 1 },
      { optionId: "age-2", label: "40-49", value: 2 },
      { optionId: "age-3", label: "50+", value: 3 },
    ],
  },
];

type ResultLevel = "low" | "moderate" | "high";

const getResultLevel = (score: number, maxScore: number): ResultLevel => {
  const percentage = (score / maxScore) * 100;
  if (percentage < 33) return "low";
  if (percentage < 66) return "moderate";
  return "high";
};

// Results config using warm luxury palette instead of clinical colors
const RESULTS: Record<ResultLevel, { title: string; description: string; icon: typeof CheckCircle; color: string; recommendation: string }> = {
  low: {
    title: "Low Likelihood",
    description: "Based on your answers, you're showing few signs of low testosterone. Your symptoms may have other causes, but it never hurts to get checked.",
    icon: CheckCircle,
    color: "text-accent-gold", // Warm gold for optimal/positive
    recommendation: "While your symptoms don't strongly suggest low T, maintaining optimal hormone levels can enhance your quality of life. Consider a baseline check to know your numbers.",
  },
  moderate: {
    title: "Moderate Likelihood",
    description: "Your answers suggest you may be experiencing some symptoms commonly associated with low testosterone. A proper evaluation could provide clarity.",
    icon: AlertTriangle,
    color: "text-warm-stone", // Warm stone for moderate/caution
    recommendation: "We recommend getting your testosterone levels tested. Many men in your situation find that optimizing their hormones significantly improves their quality of life.",
  },
  high: {
    title: "High Likelihood",
    description: "Your symptoms are strongly consistent with low testosterone. The good news? This is treatable, and many men experience life-changing improvements with proper therapy.",
    icon: Activity,
    color: "text-primary",
    recommendation: "We strongly recommend a comprehensive hormone evaluation. Testosterone replacement therapy has helped thousands of men regain their energy, drive, and vitality.",
  },
};

// Type for storing both the selected option ID and its score value
type AnswerData = {
  optionId: string;
  value: number;
};

const SymptomChecker = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, AnswerData>>({});
  const [showResults, setShowResults] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [resultId, setResultId] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Refs for focus management
  const questionContainerRef = useRef<HTMLDivElement>(null);
  const firstOptionRef = useRef<HTMLButtonElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const progress = ((currentStep + 1) / QUESTIONS.length) * 100;
  const currentQuestion = QUESTIONS[currentStep];

  // Update document title for accessibility
  useEffect(() => {
    const baseTitle = "Low T Symptom Checker | Elevare Health";
    if (showResults) {
      document.title = `Results - ${baseTitle}`;
    } else {
      document.title = `Question ${currentStep + 1} of ${QUESTIONS.length} - ${baseTitle}`;
    }
    return () => {
      document.title = baseTitle;
    };
  }, [currentStep, showResults]);

  // Focus first option when question changes
  useEffect(() => {
    if (!showResults && !isTransitioning && firstOptionRef.current) {
      // Small delay to allow animation to complete
      const timer = setTimeout(() => {
        firstOptionRef.current?.focus();
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [currentStep, showResults, isTransitioning]);

  // Focus results when shown
  useEffect(() => {
    if (showResults && resultsRef.current) {
      resultsRef.current.focus();
    }
  }, [showResults]);

  // Save results to database when quiz is completed
  const saveResults = async (finalAnswers: Record<string, AnswerData>, score: number, level: ResultLevel) => {
    setIsSaving(true);
    setSaveError(null);

    // Convert answers to simple format for storage (question_id -> value)
    const answersForStorage: Record<string, number> = {};
    Object.entries(finalAnswers).forEach(([questionId, answerData]) => {
      answersForStorage[questionId] = answerData.value;
    });

    try {
      const sessionId = localStorage.getItem("symptom_checker_session") || crypto.randomUUID();
      localStorage.setItem("symptom_checker_session", sessionId);

      const { data, error } = await supabase
        .from("symptom_checker_results")
        .insert({
          user_id: user?.id || null,
          session_id: user ? null : sessionId,
          total_score: score,
          max_score: QUESTIONS.length * 3,
          result_level: level,
          answers: answersForStorage,
        })
        .select("id")
        .single();

      if (error) throw error;

      setResultId(data.id);

      // Store result ID for intake pre-fill
      localStorage.setItem("symptom_checker_result_id", data.id);
      localStorage.setItem("symptom_checker_data", JSON.stringify({
        totalScore: score,
        resultLevel: level,
        answers: answersForStorage,
      }));

      toast.success("Results saved successfully");
    } catch (error) {
      console.error("Error saving results:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to save results. Your results are still visible below.";
      setSaveError(errorMessage);
      toast.error("Could not save results to your account");
      // Still allow user to see results even if save fails
    } finally {
      setIsSaving(false);
    }
  };

  // Retry saving results
  const handleRetrySave = () => {
    const score = Object.values(answers).reduce((sum, ans) => sum + ans.value, 0);
    const level = getResultLevel(score, QUESTIONS.length * 3);
    saveResults(answers, score, level);
  };

  const handleAnswer = (optionId: string, value: number) => {
    const newAnswers = { ...answers, [currentQuestion.id]: { optionId, value } };
    setAnswers(newAnswers);
    setIsTransitioning(true);

    if (currentStep < QUESTIONS.length - 1) {
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setIsTransitioning(false);
      }, 300);
    } else {
      // Calculate score and save results
      const score = Object.values(newAnswers).reduce((sum, ans) => sum + ans.value, 0);
      const level = getResultLevel(score, QUESTIONS.length * 3);
      saveResults(newAnswers, score, level);
      setTimeout(() => {
        setShowResults(true);
        setIsTransitioning(false);
      }, 300);
    }
  };

  // Keyboard navigation for options
  const handleKeyDown = (e: React.KeyboardEvent, optionId: string, value: number, index: number) => {
    switch (e.key) {
      case "Enter":
      case " ":
        e.preventDefault();
        handleAnswer(optionId, value);
        break;
      case "ArrowDown":
      case "ArrowRight": {
        e.preventDefault();
        const nextOption = document.querySelector(
          `[data-option-index="${index + 1}"]`
        ) as HTMLButtonElement;
        nextOption?.focus();
        break;
      }
      case "ArrowUp":
      case "ArrowLeft": {
        e.preventDefault();
        const prevOption = document.querySelector(
          `[data-option-index="${index - 1}"]`
        ) as HTMLButtonElement;
        prevOption?.focus();
        break;
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const totalScore = Object.values(answers).reduce((sum, ans) => sum + ans.value, 0);
  const maxScore = QUESTIONS.length * 3; // Max 3 points per question
  const resultLevel = getResultLevel(totalScore, maxScore);
  const result = RESULTS[resultLevel];
  const ResultIcon = result.icon;

  const handleRestart = () => {
    // Confirm before restarting if answers exist
    if (Object.keys(answers).length > 0) {
      const confirmed = window.confirm("Are you sure you want to restart? Your current progress will be lost.");
      if (!confirmed) return;
    }
    setCurrentStep(0);
    setAnswers({});
    setShowResults(false);
    setResultId(null);
    setSaveError(null);
    localStorage.removeItem("symptom_checker_result_id");
    localStorage.removeItem("symptom_checker_data");
  };

  const handleStartIntake = () => {
    // Navigate to intake with pre-fill flag
    navigate("/intake", { state: { fromSymptomChecker: true } });
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    let yPos = 20;

    // Header
    doc.setFillColor(42, 105, 89); // Primary color
    doc.rect(0, 0, pageWidth, 40, "F");
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.text("Elevare Health", margin, 25);
    
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("Low Testosterone Symptom Assessment", margin, 35);

    yPos = 55;

    // Date
    doc.setTextColor(100, 100, 100);
    doc.setFontSize(10);
    doc.text(`Report Generated: ${new Date().toLocaleDateString("en-US", { 
      year: "numeric", 
      month: "long", 
      day: "numeric" 
    })}`, margin, yPos);
    yPos += 15;

    // Result Summary Box
    doc.setFillColor(245, 245, 245);
    doc.roundedRect(margin, yPos, pageWidth - margin * 2, 45, 3, 3, "F");
    
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Assessment Result", margin + 10, yPos + 15);
    
    doc.setFontSize(24);
    const scoreColor = resultLevel === "low" ? [34, 197, 94] : 
                       resultLevel === "moderate" ? [234, 179, 8] : [42, 105, 89];
    doc.setTextColor(scoreColor[0], scoreColor[1], scoreColor[2]);
    doc.text(`${totalScore}/${maxScore}`, margin + 10, yPos + 32);
    
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.text(`${result.title}`, margin + 60, yPos + 32);
    
    yPos += 60;

    // Description
    doc.setFontSize(11);
    doc.setTextColor(60, 60, 60);
    const descLines = doc.splitTextToSize(result.description, pageWidth - margin * 2);
    doc.text(descLines, margin, yPos);
    yPos += descLines.length * 6 + 15;

    // Recommendation Box
    doc.setFillColor(42, 105, 89);
    doc.roundedRect(margin, yPos, pageWidth - margin * 2, 35, 3, 3, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("Our Recommendation", margin + 10, yPos + 12);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    const recLines = doc.splitTextToSize(result.recommendation, pageWidth - margin * 2 - 20);
    doc.text(recLines, margin + 10, yPos + 22);
    yPos += 50;

    // Your Answers Section
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Your Responses", margin, yPos);
    yPos += 10;

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");

    QUESTIONS.forEach((q, index) => {
      if (yPos > 260) {
        doc.addPage();
        yPos = 20;
      }

      const answerData = answers[q.id];
      const selectedOption = answerData
        ? q.options.find(opt => opt.optionId === answerData.optionId)
        : null;

      doc.setTextColor(80, 80, 80);
      doc.setFont("helvetica", "bold");
      doc.text(`${index + 1}. ${q.question}`, margin, yPos);
      yPos += 6;

      doc.setFont("helvetica", "normal");
      doc.setTextColor(42, 105, 89);
      doc.text(`→ ${selectedOption?.label || "Not answered"}`, margin + 5, yPos);
      yPos += 10;
    });

    // Footer
    yPos = 275;
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 8;
    
    doc.setTextColor(100, 100, 100);
    doc.setFontSize(8);
    doc.text("This assessment is for informational purposes only and is not a medical diagnosis.", margin, yPos);
    yPos += 5;
    doc.text("Please consult with a licensed healthcare provider for proper evaluation and treatment.", margin, yPos);
    yPos += 8;
    doc.setFont("helvetica", "bold");
    doc.text("Elevare Health | www.elevarehealth.com | HIPAA Compliant", margin, yPos);

    // Save the PDF
    doc.save("Elevare-LowT-Assessment.pdf");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="mx-auto max-w-2xl">
          {!showResults ? (
            <>
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 text-center"
              >
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                  <Zap className="h-4 w-4" />
                  Free Assessment
                </div>
                <h1 className="mb-2 font-display text-3xl font-bold text-foreground md:text-4xl">
                  Do I Have Low T?
                </h1>
                <p className="text-muted-foreground">
                  Answer {QUESTIONS.length} quick questions to assess your symptoms
                </p>
              </motion.div>

              {/* Progress */}
              <div className="mb-8">
                <div className="mb-2 flex justify-between text-sm text-muted-foreground">
                  <span>Question {currentStep + 1} of {QUESTIONS.length}</span>
                  <span>{Math.round(progress)}% complete</span>
                </div>
                <Progress
                  value={progress}
                  className="h-2"
                  aria-label={`Progress: ${Math.round(progress)}% complete, question ${currentStep + 1} of ${QUESTIONS.length}`}
                />
              </div>

              {/* Question */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  ref={questionContainerRef}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-2xl border bg-card p-6 shadow-sm md:p-8"
                  role="form"
                  aria-labelledby={`question-${currentQuestion.id}`}
                >
                  <h2
                    id={`question-${currentQuestion.id}`}
                    className="mb-2 text-xl font-semibold text-foreground md:text-2xl"
                  >
                    {currentQuestion.question}
                  </h2>
                  {currentQuestion.description && (
                    <p
                      id={`description-${currentQuestion.id}`}
                      className="mb-6 text-muted-foreground"
                    >
                      {currentQuestion.description}
                    </p>
                  )}

                  <div
                    className="space-y-3"
                    role="radiogroup"
                    aria-labelledby={`question-${currentQuestion.id}`}
                    aria-describedby={currentQuestion.description ? `description-${currentQuestion.id}` : undefined}
                  >
                    {currentQuestion.options.map((option, index) => {
                      const isSelected = answers[currentQuestion.id]?.optionId === option.optionId;
                      return (
                        <motion.button
                          key={option.optionId}
                          ref={index === 0 ? firstOptionRef : undefined}
                          data-option-index={index}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => handleAnswer(option.optionId, option.value)}
                          onKeyDown={(e) => handleKeyDown(e, option.optionId, option.value, index)}
                          disabled={isTransitioning}
                          role="radio"
                          aria-checked={isSelected}
                          tabIndex={isSelected || (!answers[currentQuestion.id] && index === 0) ? 0 : -1}
                          className={`w-full rounded-xl border p-4 text-left transition-all hover:border-primary hover:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                            isSelected
                              ? "border-primary bg-primary/5"
                              : "bg-background"
                          }`}
                        >
                          <span className="font-medium text-foreground">{option.label}</span>
                        </motion.button>
                      );
                    })}
                  </div>

                  {currentStep > 0 && (
                    <button
                      onClick={handleBack}
                      disabled={isTransitioning}
                      className="mt-6 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground focus:outline-none focus:underline disabled:cursor-not-allowed disabled:opacity-50"
                      aria-label="Go to previous question"
                    >
                      <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                      Previous question
                    </button>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Screen reader announcements */}
              <div
                role="status"
                aria-live="polite"
                aria-atomic="true"
                className="sr-only"
              >
                Question {currentStep + 1} of {QUESTIONS.length}: {currentQuestion.question}
              </div>
            </>
          ) : (
            /* Results */
            <motion.div
              ref={resultsRef}
              tabIndex={-1}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center focus:outline-none"
              role="region"
              aria-labelledby="results-title"
            >
              {/* Error Alert */}
              {saveError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 flex items-center gap-3 rounded-xl border border-destructive/20 bg-destructive/5 p-4 text-left"
                  role="alert"
                  aria-live="assertive"
                >
                  <AlertCircle className="h-5 w-5 flex-shrink-0 text-destructive" aria-hidden="true" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-destructive">Could not save results</p>
                    <p className="text-xs text-muted-foreground">{saveError}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRetrySave}
                    disabled={isSaving}
                    className="flex-shrink-0"
                    aria-label="Retry saving results"
                  >
                    {isSaving ? (
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    ) : (
                      <RotateCcw className="h-4 w-4" aria-hidden="true" />
                    )}
                  </Button>
                </motion.div>
              )}

              <div className="mb-8 rounded-2xl border bg-card p-8 shadow-sm">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className={`mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full ${
                    resultLevel === "low" ? "bg-accent-gold/15" :
                    resultLevel === "moderate" ? "bg-warm-stone/15" : "bg-primary/10"
                  }`}
                  aria-hidden="true"
                >
                  <ResultIcon className={`h-10 w-10 ${result.color}`} />
                </motion.div>

                <h2
                  id="results-title"
                  className="mb-2 font-display text-2xl font-bold text-foreground md:text-3xl"
                >
                  {result.title}
                </h2>

                <div className="mb-4" aria-label={`Your score: ${totalScore} out of ${maxScore} points`}>
                  <span className="text-4xl font-bold text-primary">{totalScore}</span>
                  <span className="text-muted-foreground">/{maxScore} points</span>
                </div>

                <p className="mb-6 text-muted-foreground">{result.description}</p>

                <div className="rounded-xl bg-primary/5 p-4 text-left">
                  <h3 className="mb-2 font-semibold text-foreground">Our Recommendation</h3>
                  <p className="text-sm text-muted-foreground">{result.recommendation}</p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3">
                <Button
                  size="lg"
                  className="w-full bg-primary hover:bg-primary-dark"
                  onClick={handleStartIntake}
                  disabled={isSaving}
                  aria-busy={isSaving}
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
                      Saving...
                    </>
                  ) : (
                    <>
                      Start Free Medical Evaluation
                      <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                    </>
                  )}
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={generatePDF}
                  className="w-full"
                  aria-label="Download your assessment results as a PDF report"
                >
                  <Download className="mr-2 h-5 w-5" aria-hidden="true" />
                  Download PDF Report
                </Button>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleRestart}
                    className="flex-1"
                    aria-label="Retake the symptom assessment quiz"
                  >
                    Retake Quiz
                  </Button>
                  <Link to="/treatments/hormones" className="flex-1">
                    <Button variant="outline" size="lg" className="w-full">
                      Learn About TRT
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Share with doctor note */}
              <div className="mt-6 flex items-center justify-center gap-2 rounded-lg bg-muted/50 p-3 text-sm text-muted-foreground">
                <FileText className="h-4 w-4" aria-hidden="true" />
                <span>Download and share this report with your doctor</span>
              </div>

              {/* Trust indicators */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
                <span aria-label="HIPAA Compliant">HIPAA Compliant</span>
                <span aria-label="Texas Licensed Physicians">Texas Licensed Physicians</span>
                <span aria-label="Discreet and Confidential">Discreet &amp; Confidential</span>
              </div>

              {/* Screen reader results announcement */}
              <div
                role="status"
                aria-live="polite"
                aria-atomic="true"
                className="sr-only"
              >
                Assessment complete. Your result: {result.title}. Score: {totalScore} out of {maxScore} points. {result.description}
              </div>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SymptomChecker;
