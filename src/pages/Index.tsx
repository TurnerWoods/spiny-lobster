import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustMarquee from "@/components/TrustMarquee";
import TreatmentCategories from "@/components/TreatmentCategories";
import HowItWorks from "@/components/HowItWorks";
import PricingComparison from "@/components/PricingComparison";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import AIChatWidget from "@/components/AIChatWidget";
import MobileBottomCTA from "@/components/MobileBottomCTA";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollProgress from "@/components/ScrollProgress";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <TrustMarquee />
        <TreatmentCategories />
        <HowItWorks />
        <PricingComparison />
        <TestimonialsCarousel />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <AIChatWidget />
      <MobileBottomCTA />
      <ScrollToTop />
    </div>
  );
};

export default Index;