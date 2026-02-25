import TreatmentPageTemplate, { TreatmentData } from "@/components/TreatmentPageTemplate";
import heroImage from "@/assets/hero-weight-loss.jpg";

const treatment: TreatmentData = {
  category: "Weight Loss & Metabolic",
  title: "Medical Weight Loss",
  subtitle: "GLP-1 & Peptide Therapies",
  description: "Physician-supervised therapies to reduce appetite and boost metabolism.",
  price: "$149",
  heroImage,
  productImage: "/images/products/semaglutide-vial.png",
  stacks: [
    { name: "The Metabolic Reset", tagline: "Enhanced Fat Burning Protocol", products: ["Semaglutide", "AOD-9604"], price: "$249/mo", savings: "Save $49", popular: true, image: "/images/products/semaglutide-vial.png" },
    { name: "Ultimate Weight Loss", tagline: "Maximum Results Protocol", products: ["Tirzepatide", "AOD-9604", "Lipotropics"], price: "$349/mo", savings: "Save $98", image: "/images/products/tirzepatide-prep.png" },
    { name: "GH + Fat Loss", tagline: "Dual Benefit Protocol", products: ["CJC-1295/Ipamorelin", "AOD-9604"], price: "$349/mo", savings: "Save $49", image: "/images/products/cjc-1295-vial.png" }
  ],
  medications: [
    {
      name: "Semaglutide",
      description: "GLP-1 agonist that reduces appetite and improves blood sugar control. #1 search term in men's health.",
      price: "$149/mo",
      image: "/images/products/semaglutide-vial.png",
      rating: 4.9,
      reviewCount: 2847,
      bestSeller: true
    },
    {
      name: "Tirzepatide",
      description: "Dual GIP/GLP-1 agonist — fastest-growing segment with superior efficacy data. 15-25% body weight loss in clinical trials.",
      price: "$199/mo",
      image: "/images/products/tirzepatide-prep.png",
      rating: 4.8,
      reviewCount: 1523,
      mostPopular: true
    },
    {
      name: "AOD-9604",
      description: "Peptide alternative to GLP-1 that stimulates lipolysis without appetite suppression side effects.",
      price: "$149/mo",
      image: "/images/products/medication-package.png",
      rating: 4.7,
      reviewCount: 892
    },
    {
      name: "Tesamorelin",
      description: "Targets visceral fat while preserving lean muscle. Cross-listed with GH category.",
      price: "$199/mo",
      image: "/images/products/sermorelin-vial.png",
      rating: 4.7,
      reviewCount: 634
    },
    {
      name: "CJC-1295/Ipamorelin",
      description: "Sustained GH release for fat loss and body composition improvement.",
      price: "$249/mo",
      image: "/images/products/cjc-1295-vial.png",
      rating: 4.8,
      reviewCount: 1284
    },
    {
      name: "5-Amino-1MQ",
      description: "Novel NNMT inhibitor — unique mechanism no competitor carries. Boosts cellular energy and fat metabolism.",
      price: "$149/mo",
      image: "/images/products/medication-package.png",
      rating: 4.6,
      reviewCount: 312
    }
  ],
  symptoms: [
    "Stubborn belly fat",
    "Constant food cravings",
    "Slow metabolism",
    "Weight regain after dieting",
    "Fatigue and low energy",
    "Pre-diabetic concerns"
  ],
  benefits: [
    "Sustainable weight loss",
    "Reduced appetite",
    "Improved blood sugar",
    "Increased energy",
    "Reduced visceral fat",
    "Better confidence"
  ],
  timeline: [
    { period: "Week 1-2", description: "Appetite reduction begins." },
    { period: "Week 3-4", description: "3-5 lbs weight loss typical." },
    { period: "Month 2-3", description: "Significant progress visible." },
    { period: "Month 3-6", description: "10-20% body weight reduction." }
  ],
  results: [
    { id: "wl-1", metric: "Body Weight", before: "245 lbs", after: "198 lbs", timeframe: "6 months", improvement: "-47 lbs" },
    { id: "wl-2", metric: "Waist Size", before: '42"', after: '34"', timeframe: "5 months", improvement: "-8 inches" },
    { id: "wl-3", metric: "Body Fat %", before: "32%", after: "22%", timeframe: "6 months", improvement: "-10%" }
  ],
  safetyNote: "GLP-1 medications may cause nausea initially. Not for those with thyroid cancer history."
};

const WeightLossPage = () => {
  return <TreatmentPageTemplate treatment={treatment} />;
};

export default WeightLossPage;
