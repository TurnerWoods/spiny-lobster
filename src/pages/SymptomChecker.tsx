import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, CheckCircle, AlertTriangle, Activity, Zap, Download, FileText, Loader2 } from "lucide-react";
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
  options: { label: string; value: number }[];
};

const QUESTIONS: Question[] = [
  {
    id: "energy",
    question: "How would you describe your energy levels?",
    description: "Think about your typical day",
    options: [
      { label: "Consistently high energy", value: 0 },
      { label: "Generally good, occasional dips", value: 1 },
      { label: "Often tired, need coffee to function", value: 2 },
      { label: "Exhausted most of the time", value: 3 },
    ],
  },
  {
    id: "libido",
    question: "How has your sex drive been lately?",
    description: "Compared to your normal baseline",
    options: [
      { label: "Strong and consistent", value: 0 },
      { label: "Slightly decreased", value: 1 },
      { label: "Noticeably lower than before", value: 2 },
      { label: "Little to no interest", value: 3 },
    ],
  },
  {
    id: "mood",
    question: "How would you describe your mood?",
    description: "Over the past few weeks",
    options: [
      { label: "Positive and stable", value: 0 },
      { label: "Occasional irritability", value: 1 },
      { label: "Frequent mood swings or low mood", value: 2 },
      { label: "Persistent depression or anxiety", value: 3 },
    ],
  },
  {
    id: "focus",
    question: "How is your mental clarity and focus?",
    description: "At work or during daily tasks",
    options: [
      { label: "Sharp and focused", value: 0 },
      { label: "Occasional brain fog", value: 1 },
      { label: "Difficulty concentrating regularly", value: 2 },
      { label: "Constant brain fog, hard to think clearly", value: 3 },
    ],
  },
  {
    id: "muscle",
    question: "Have you noticed changes in your body composition?",
    description: "Muscle mass and body fat",
    options: [
      { label: "Maintaining muscle easily", value: 0 },
      { label: "Slight muscle loss despite working out", value: 1 },
      { label: "Noticeable muscle loss, gaining fat", value: 2 },
      { label: "Significant muscle loss, increased belly fat", value: 3 },
    ],
  },
  {
    id: "sleep",
    question: "How well do you sleep?",
    description: "Quality and restfulness",
    options: [
      { label: "Deep, restful sleep most nights", value: 0 },
      { label: "Occasional trouble falling/staying asleep", value: 1 },
      { label: "Frequently wake up tired", value: 2 },
      { label: "Chronic sleep issues, never feel rested", value: 3 },
    ],
  },
  {
    id: "motivation",
    question: "How motivated do you feel?",
    description: "For work, exercise, and personal goals",
    options: [
      { label: "Highly driven and ambitious", value: 0 },
      { label: "Generally motivated with some off days", value: 1 },
      { label: "Struggling to find motivation", value: 2 },
      { label: "No drive or ambition", value: 3 },
    ],
  },
  {
    id: "recovery",
    question: "How quickly do you recover from exercise?",
    description: "After workouts or physical activity",
    options: [
      { label: "Recover quickly, ready for more", value: 0 },
      { label: "Takes a bit longer than it used to", value: 1 },
      { label: "Often sore for days", value: 2 },
      { label: "Extremely slow recovery, avoid exercise", value: 3 },
    ],
  },
  {
    id: "age",
    question: "What's your age range?",
    options: [
      { label: "Under 30", value: 0 },
      { label: "30-39", value: 1 },
      { label: "40-49", value: 2 },
      { label: "50+", value: 2 },
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

const SymptomChecker = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [resultId, setResultId] = useState<string | null>(null);

  const progress = ((currentStep + 1) / QUESTIONS.length) * 100;
  const currentQuestion = QUESTIONS[currentStep];

  // Save results to database when quiz is completed
  const saveResults = async (finalAnswers: Record<string, number>, score: number, level: ResultLevel) => {
    setIsSaving(true);
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
          answers: finalAnswers,
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
        answers: finalAnswers,
      }));
      
      toast.success("Results saved successfully");
    } catch (error) {
      console.error("Error saving results:", error);
      // Still allow user to see results even if save fails
    } finally {
      setIsSaving(false);
    }
  };

  const handleAnswer = (value: number) => {
    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(newAnswers);

    if (currentStep < QUESTIONS.length - 1) {
      setTimeout(() => setCurrentStep(currentStep + 1), 300);
    } else {
      // Calculate score and save results
      const score = Object.values(newAnswers).reduce((sum, val) => sum + val, 0);
      const level = getResultLevel(score, QUESTIONS.length * 3);
      saveResults(newAnswers, score, level);
      setTimeout(() => setShowResults(true), 300);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const totalScore = Object.values(answers).reduce((sum, val) => sum + val, 0);
  const maxScore = QUESTIONS.length * 3; // Max 3 points per question
  const resultLevel = getResultLevel(totalScore, maxScore);
  const result = RESULTS[resultLevel];
  const ResultIcon = result.icon;

  const handleRestart = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResults(false);
    setResultId(null);
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

      const answerValue = answers[q.id];
      const selectedOption = q.options.find(opt => opt.value === answerValue);
      
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
                <Progress value={progress} className="h-2" />
              </div>

              {/* Question */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-2xl border bg-card p-6 shadow-sm md:p-8"
                >
                  <h2 className="mb-2 text-xl font-semibold text-foreground md:text-2xl">
                    {currentQuestion.question}
                  </h2>
                  {currentQuestion.description && (
                    <p className="mb-6 text-muted-foreground">{currentQuestion.description}</p>
                  )}

                  <div className="space-y-3">
                    {currentQuestion.options.map((option, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => handleAnswer(option.value)}
                        className={`w-full rounded-xl border p-4 text-left transition-all hover:border-primary hover:bg-primary/5 ${
                          answers[currentQuestion.id] === option.value
                            ? "border-primary bg-primary/5"
                            : "bg-background"
                        }`}
                      >
                        <span className="font-medium text-foreground">{option.label}</span>
                      </motion.button>
                    ))}
                  </div>

                  {currentStep > 0 && (
                    <button
                      onClick={handleBack}
                      className="mt-6 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Previous question
                    </button>
                  )}
                </motion.div>
              </AnimatePresence>
            </>
          ) : (
            /* Results */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="mb-8 rounded-2xl border bg-card p-8 shadow-sm">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className={`mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full ${
                    resultLevel === "low" ? "bg-accent-gold/15" :
                    resultLevel === "moderate" ? "bg-warm-stone/15" : "bg-primary/10"
                  }`}
                >
                  <ResultIcon className={`h-10 w-10 ${result.color}`} />
                </motion.div>

                <h2 className="mb-2 font-display text-2xl font-bold text-foreground md:text-3xl">
                  {result.title}
                </h2>
                
                <div className="mb-4">
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
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      Start Free Medical Evaluation
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={generatePDF}
                  className="w-full"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download PDF Report
                </Button>
                
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleRestart}
                    className="flex-1"
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
                <FileText className="h-4 w-4" />
                <span>Download and share this report with your doctor</span>
              </div>

              {/* Trust indicators */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
                <span>✓ HIPAA Compliant</span>
                <span>✓ Texas Licensed Physicians</span>
                <span>✓ Discreet & Confidential</span>
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
