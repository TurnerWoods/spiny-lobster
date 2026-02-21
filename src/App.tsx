import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { FullPageLoader } from "@/components/ui/loading-spinner";

// Critical path - load immediately
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// Loading fallback for lazy components
const PageLoader = () => <FullPageLoader text="Loading page..." />;

// Lazy load below-fold pages for better initial load performance
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Intake = lazy(() => import("./pages/Intake"));
const TreatmentDetail = lazy(() => import("./pages/TreatmentDetail"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const HowItWorksPage = lazy(() => import("./pages/HowItWorksPage"));
const PricingPage = lazy(() => import("./pages/PricingPage"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfUse = lazy(() => import("./pages/TermsOfUse"));
const HIPAANotice = lazy(() => import("./pages/HIPAANotice"));
const SafetyInformation = lazy(() => import("./pages/SafetyInformation"));
const FAQPage = lazy(() => import("./pages/FAQ"));
const SymptomChecker = lazy(() => import("./pages/SymptomChecker"));
const Tools = lazy(() => import("./pages/Tools"));
const NotFound = lazy(() => import("./pages/NotFound"));
const BrandKit = lazy(() => import("./pages/BrandKit"));

// Treatment Pages - lazy loaded
const WeightLossPage = lazy(() => import("./pages/treatments/WeightLossPage"));
const HormonesPage = lazy(() => import("./pages/treatments/HormonesPage"));
const StrengthPage = lazy(() => import("./pages/treatments/StrengthPage"));
const AntiAgingPage = lazy(() => import("./pages/treatments/AntiAgingPage"));
const HairPage = lazy(() => import("./pages/treatments/HairPage"));
const SkinPage = lazy(() => import("./pages/treatments/SkinPage"));
const MoodPage = lazy(() => import("./pages/treatments/MoodPage"));
const SexualHealthPage = lazy(() => import("./pages/treatments/SexualHealthPage"));

// Tools Pages - lazy loaded
const TreatmentMatch = lazy(() => import("./pages/tools/TreatmentMatch"));
const TDEECalculator = lazy(() => import("./pages/tools/TDEECalculator"));
const BMICalculator = lazy(() => import("./pages/tools/BMICalculator"));
const ProteinCalculator = lazy(() => import("./pages/tools/ProteinCalculator"));
const CalorieCalculator = lazy(() => import("./pages/tools/CalorieCalculator"));

// AI-Powered Tools - lazy loaded
const HormoneAssessment = lazy(() => import("./components/tools/HormoneAssessment"));
const TreatmentMatchQuiz = lazy(() => import("./components/tools/TreatmentMatchQuiz"));
const BMRCalculator = lazy(() => import("./components/tools/Calculators").then(m => ({ default: m.BMRCalculator })));
const CarbCalculator = lazy(() => import("./components/tools/Calculators").then(m => ({ default: m.CarbCalculator })));

// Tool Pages - lazy loaded
const LabInterpreter = lazy(() => import("./pages/tools/LabInterpreter"));
const MealPlanner = lazy(() => import("./pages/tools/MealPlanner"));
const WorkoutGenerator = lazy(() => import("./pages/tools/WorkoutGenerator"));
const ProgressPredictor = lazy(() => import("./pages/tools/ProgressPredictor"));

// Admin Pages - lazy loaded
const MediaManager = lazy(() => import("./pages/admin/MediaManager"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <ErrorBoundary>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                {/* Critical path routes - no lazy loading */}
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* Lazy loaded routes */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/intake" element={<Intake />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/how-it-works" element={<HowItWorksPage />} />
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsOfUse />} />
                <Route path="/hipaa" element={<HIPAANotice />} />
                <Route path="/safety" element={<SafetyInformation />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/symptom-checker" element={<SymptomChecker />} />
                <Route path="/tools" element={<Tools />} />

                {/* Treatment Category Pages */}
                <Route path="/treatments/weight-loss" element={<WeightLossPage />} />
                <Route path="/treatments/hormones" element={<HormonesPage />} />
                <Route path="/treatments/strength" element={<StrengthPage />} />
                <Route path="/treatments/anti-aging" element={<AntiAgingPage />} />
                <Route path="/treatments/hair" element={<HairPage />} />
                <Route path="/treatments/skin" element={<SkinPage />} />
                <Route path="/treatments/mood" element={<MoodPage />} />
                <Route path="/treatments/sexual-health" element={<SexualHealthPage />} />

                <Route path="/treatment/:id" element={<TreatmentDetail />} />

                {/* Tools Pages */}
                <Route path="/tools/treatment-match" element={<TreatmentMatch />} />
                <Route path="/tools/tdee" element={<TDEECalculator />} />
                <Route path="/tools/bmi" element={<BMICalculator />} />
                <Route path="/tools/protein" element={<ProteinCalculator />} />
                <Route path="/tools/calories" element={<CalorieCalculator />} />

                {/* AI-Powered Tools */}
                <Route path="/tools/hormone-assessment" element={<HormoneAssessment />} />
                <Route path="/tools/treatment-match-quiz" element={<TreatmentMatchQuiz />} />
                <Route path="/tools/lab-interpreter" element={<LabInterpreter />} />
                <Route path="/tools/meal-planner" element={<MealPlanner />} />
                <Route path="/tools/workout-generator" element={<WorkoutGenerator />} />
                <Route path="/tools/progress-predictor" element={<ProgressPredictor />} />
                <Route path="/tools/calculators/bmr" element={<BMRCalculator />} />
                <Route path="/tools/calculators/carb" element={<CarbCalculator />} />

                {/* Calculator Routes with /calculators/ prefix */}
                <Route path="/tools/calculators/tdee" element={<TDEECalculator />} />
                <Route path="/tools/calculators/bmi" element={<BMICalculator />} />
                <Route path="/tools/calculators/protein" element={<ProteinCalculator />} />
                <Route path="/tools/calculators/calorie" element={<CalorieCalculator />} />

                {/* Admin Pages */}
                <Route path="/admin/media" element={<MediaManager />} />
                <Route path="/brand-kit" element={<BrandKit />} />

                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </ErrorBoundary>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
