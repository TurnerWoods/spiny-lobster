import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
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
import NotFound from "./pages/NotFound";

// Treatment Pages
import WeightLossPage from "./pages/treatments/WeightLossPage";
import HormonesPage from "./pages/treatments/HormonesPage";
import StrengthPage from "./pages/treatments/StrengthPage";
import AntiAgingPage from "./pages/treatments/AntiAgingPage";
import HairPage from "./pages/treatments/HairPage";
import SkinPage from "./pages/treatments/SkinPage";
import MoodPage from "./pages/treatments/MoodPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
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
            
            {/* Treatment Category Pages */}
            <Route path="/treatments/weight-loss" element={<WeightLossPage />} />
            <Route path="/treatments/hormones" element={<HormonesPage />} />
            <Route path="/treatments/strength" element={<StrengthPage />} />
            <Route path="/treatments/anti-aging" element={<AntiAgingPage />} />
            <Route path="/treatments/hair" element={<HairPage />} />
            <Route path="/treatments/skin" element={<SkinPage />} />
            <Route path="/treatments/mood" element={<MoodPage />} />
            
            <Route path="/treatment/:id" element={<TreatmentDetail />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
