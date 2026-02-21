import { lazy, Suspense } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import LazySection from "@/components/LazySection";
import { SectionErrorBoundary } from "@/components/ErrorBoundary";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

// Critical path - load immediately (above the fold)
import TreatmentCategories from "@/components/TreatmentCategories";

// Lazy load below-fold components for better initial load performance
const HowItWorks = lazy(() => import("@/components/HowItWorks"));
const ProviderSection = lazy(() => import("@/components/ProviderSection"));
const TestimonialsCarousel = lazy(() => import("@/components/TestimonialsCarousel"));
const FAQ = lazy(() => import("@/components/FAQ"));
const FinalCTA = lazy(() => import("@/components/FinalCTA"));
const Footer = lazy(() => import("@/components/Footer"));
const AIChatWidget = lazy(() => import("@/components/AIChatWidget"));
const ScrollToTop = lazy(() => import("@/components/ScrollToTop"));

// Minimal loading placeholder with improved spinner
const SectionLoader = () => (
  <div className="flex items-center justify-center py-16">
    <LoadingSpinner size="default" />
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero - critical, loads immediately */}
        <Hero />

        {/* Treatments - visible on scroll, loads immediately */}
        <TreatmentCategories />

        {/* Below-fold content - lazy loaded with intersection observer and error boundaries */}
        <LazySection minHeight="400px" rootMargin="300px 0px">
          <SectionErrorBoundary sectionName="HowItWorks">
            <Suspense fallback={<SectionLoader />}>
              <HowItWorks />
            </Suspense>
          </SectionErrorBoundary>
        </LazySection>

        <LazySection minHeight="400px" rootMargin="200px 0px">
          <SectionErrorBoundary sectionName="ProviderSection">
            <Suspense fallback={<SectionLoader />}>
              <ProviderSection />
            </Suspense>
          </SectionErrorBoundary>
        </LazySection>

        <LazySection minHeight="300px" rootMargin="200px 0px">
          <SectionErrorBoundary sectionName="TestimonialsCarousel">
            <Suspense fallback={<SectionLoader />}>
              <TestimonialsCarousel />
            </Suspense>
          </SectionErrorBoundary>
        </LazySection>

        <LazySection minHeight="400px" rootMargin="200px 0px">
          <SectionErrorBoundary sectionName="FAQ">
            <Suspense fallback={<SectionLoader />}>
              <FAQ />
            </Suspense>
          </SectionErrorBoundary>
        </LazySection>

        <LazySection minHeight="300px" rootMargin="200px 0px">
          <SectionErrorBoundary sectionName="FinalCTA">
            <Suspense fallback={<SectionLoader />}>
              <FinalCTA />
            </Suspense>
          </SectionErrorBoundary>
        </LazySection>
      </main>

      <LazySection as="div" minHeight="400px" rootMargin="100px 0px">
        <SectionErrorBoundary sectionName="Footer">
          <Suspense fallback={<SectionLoader />}>
            <Footer />
          </Suspense>
        </SectionErrorBoundary>
      </LazySection>

      {/* Chat widget and scroll-to-top - load after main content */}
      <Suspense fallback={null}>
        <AIChatWidget />
      </Suspense>
      <Suspense fallback={null}>
        <ScrollToTop />
      </Suspense>
    </div>
  );
};

export default Index;