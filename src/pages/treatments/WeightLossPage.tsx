import TreatmentPageTemplate, { TreatmentData } from "@/components/TreatmentPageTemplate";
import heroImage from "@/assets/hero-weight-loss.jpg";

const treatment: TreatmentData = {
  category: "Weight Loss",
  title: "Medical Weight Loss",
  subtitle: "GLP-1 & Peptide Therapies",
  description: "Physician-supervised therapies to reduce appetite and boost metabolism.",
  price: "$149",
  heroImage,
  productImage: "/images/products/tirzepatide-prep.png",
  stacks: [
    { name: "Ultimate Weight Loss", tagline: "Maximum Results Protocol", products: ["Tirzepatide", "AOD-9604", "Lipotropics"], price: "$349/mo", savings: "Save $98", popular: true },
    { name: "GLP-1 Accelerator", tagline: "Enhanced Fat Burning", products: ["Semaglutide", "AOD-9604"], price: "$249/mo", savings: "Save $49" },
    { name: "Metabolic Reset", tagline: "Visceral Fat Protocol", products: ["Tesamorelin", "Lipotropics"], price: "$249/mo", savings: "Save $49" }
  ],
  medications: [
    {
      name: "Semaglutide",
      description: "GLP-1 that reduces appetite and improves blood sugar control.",
      price: "$149/mo"
    },
    {
      name: "Tirzepatide",
      description: "Dual GIP/GLP-1 agonist for enhanced weight loss.",
      price: "$199/mo"
    },
    {
      name: "Tesamorelin",
      description: "Targets visceral fat while preserving lean muscle.",
      price: "$199/mo"
    },
    {
      name: "AOD-9604",
      description: "Fat-burning peptide that stimulates lipolysis.",
      price: "$149/mo"
    },
    {
      name: "Lipotropic Injections",
      description: "B12 + MIC for fat metabolism and energy.",
      price: "$99/mo"
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
