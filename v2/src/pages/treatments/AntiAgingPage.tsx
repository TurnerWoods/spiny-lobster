import TreatmentPageTemplate, { TreatmentData } from "@/components/TreatmentPageTemplate";
import heroImage from "@/assets/hero-anti-aging.jpg";

const treatment: TreatmentData = {
  category: "Anti-Aging & Longevity",
  title: "Cellular Optimization",
  subtitle: "Turn Back the Clock",
  description: "Target the root causes of aging with cellular energy and DNA repair protocols.",
  price: "$129",
  heroImage,
  productImage: "/images/products/longevity-stack.png",
  stacks: [
    {
      name: "The Longevity Stack",
      tagline: "Complete Cellular Rejuvenation & DNA Repair Protocol",
      products: ["NAD+", "GHK-Cu", "Epitalon"],
      price: "$449/mo",
      savings: "Save $78",
      popular: true,
      image: "/images/products/longevity-stack.png"
    }
  ],
  medications: [
    {
      name: "NAD+ Injections",
      description: "Essential coenzyme for cellular energy and DNA repair. Longevity community staple.",
      price: "$199/mo",
      image: "/images/products/nad-vial.png",
      rating: 4.9,
      reviewCount: 1876,
      bestSeller: true
    },
    {
      name: "GHK-Cu",
      description: "Copper peptide for collagen production, tissue rejuvenation, and anti-inflammatory benefits.",
      price: "$129/mo",
      image: "/images/products/ghk-cu-vial.png",
      rating: 4.8,
      reviewCount: 1234,
      mostPopular: true
    },
    {
      name: "Thymosin Alpha-1",
      description: "Immune modulation peptide for deep cellular defense. LIVV carries, others don't.",
      price: "$249/mo",
      image: "/images/products/thymosin-alpha-vial.png",
      rating: 4.7,
      reviewCount: 543
    },
    {
      name: "Epitalon",
      description: "Telomerase-activating peptide for telomere support and longevity biohacking.",
      price: "$199/mo",
      image: "/images/products/epitalon-vial.png",
      rating: 4.8,
      reviewCount: 892
    },
    {
      name: "MOTS-c",
      description: "Mitochondrial peptide for cellular energy, metabolic health, and cognition.",
      price: "$199/mo",
      image: "/images/products/mots-c-vial.png",
      rating: 4.7,
      reviewCount: 412
    }
  ],
  symptoms: [
    "Chronic fatigue",
    "Brain fog",
    "Feeling older than your age",
    "Slow recovery",
    "Poor sleep quality",
    "Declining vitality"
  ],
  benefits: [
    "Enhanced cellular energy",
    "Improved clarity",
    "Better sleep",
    "Reduced oxidative stress",
    "Healthier aging",
    "Greater vitality"
  ],
  timeline: [
    { period: "Week 1-2", description: "Mental clarity and energy improve." },
    { period: "Week 3-4", description: "Better sleep and well-being." },
    { period: "Month 2-3", description: "Sustained energy improvements." },
    { period: "Month 3-6", description: "Long-term cellular benefits." }
  ],
  results: [
    { id: "aa-1", metric: "Energy Level", before: "3/10", after: "8/10", timeframe: "2 weeks", improvement: "+167%" },
    { id: "aa-2", metric: "Mental Clarity", before: "4/10", after: "9/10", timeframe: "3 weeks", improvement: "+125%" },
    { id: "aa-3", metric: "Biological Age", before: "54 yrs", after: "46 yrs", timeframe: "6 months", improvement: "-8 years" }
  ],
  safetyNote: "NAD+ may cause initial flushing. Effects typically diminish with use."
};

const AntiAgingPage = () => {
  return <TreatmentPageTemplate treatment={treatment} />;
};

export default AntiAgingPage;
