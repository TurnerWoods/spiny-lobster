import { Toaster } from "@/components/ui/toaster";
import BrandKit from "./pages/BrandKit";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ErrorBoundary from "@/components/ErrorBoundary";
import SkipToMain from "@/components/SkipToMain";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Intake from "./pages/Intake";
import TreatmentDetail from "./pages/TreatmentDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import HowItWorksPage from "./pages/HowItWorksPage";
import PricingPage from "./pages/PricingPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import HIPAANotice from "./pages/HIPAANotice";
import SafetyInformation from "./pages/SafetyInformation";
import FAQPage from "./pages/FAQ";
import SymptomChecker from "./pages/SymptomChecker";
import Tools from "./pages/Tools";
import NotFound from "./pages/NotFound";

// Treatment Pages
import WeightLossPage from "./pages/treatments/WeightLossPage";
import HormonesPage from "./pages/treatments/HormonesPage";
import StrengthPage from "./pages/treatments/StrengthPage";
import AntiAgingPage from "./pages/treatments/AntiAgingPage";
import HairPage from "./pages/treatments/HairPage";
import SkinPage from "./pages/treatments/SkinPage";
import MoodPage from "./pages/treatments/MoodPage";

// Tools Pages
import TreatmentMatch from "./pages/tools/TreatmentMatch";
import TDEECalculator from "./pages/tools/TDEECalculator";
import BMICalculator from "./pages/tools/BMICalculator";
import ProteinCalculator from "./pages/tools/ProteinCalculator";
import CalorieCalculator from "./pages/tools/CalorieCalculator";

// New AI-Powered Tools
import { HormoneAssessment, TreatmentMatchQuiz } from "./components/tools";
import { BMRCalculator, CarbCalculator } from "./components/tools/Calculators";

// Admin Pages
import MediaManager from "./pages/admin/MediaManager";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <SkipToMain />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
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

              <Route path="/treatment/:id" element={<TreatmentDetail />} />

              {/* Tools Pages */}
              <Route path="/tools/treatment-match" element={<TreatmentMatch />} />
              <Route path="/tools/tdee" element={<TDEECalculator />} />
              <Route path="/tools/bmi" element={<BMICalculator />} />
              <Route path="/tools/protein" element={<ProteinCalculator />} />
              <Route path="/tools/calories" element={<CalorieCalculator />} />

              {/* New AI-Powered Tools */}
              <Route path="/tools/hormone-assessment" element={<HormoneAssessment />} />
              <Route path="/tools/treatment-match-quiz" element={<TreatmentMatchQuiz />} />
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
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
