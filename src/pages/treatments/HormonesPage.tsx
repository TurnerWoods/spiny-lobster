import TreatmentPageTemplate, { TreatmentData } from "@/components/TreatmentPageTemplate";
import heroImage from "@/assets/hero-hormones.jpg";

const treatment: TreatmentData = {
  category: "Hormone Optimization",
  title: "Testosterone Therapy",
  subtitle: "Restore Your Vitality",
  description: "TRT protocols to restore energy, strength, and confidence.",
  price: "$149",
  heroImage,
  productImage: "/images/products/testosterone-vial.png",
  stacks: [
    { name: "Complete TRT Protocol", tagline: "Full Hormone Optimization", products: ["Testosterone Cypionate", "HCG", "Anastrozole"], price: "$249/mo", savings: "Save $78", popular: true },
    { name: "TRT + Fertility", tagline: "Preserve Natural Function", products: ["Testosterone", "Gonadorelin", "Anastrozole"], price: "$279/mo", savings: "Save $48" },
    { name: "TRT Essentials", tagline: "Core Protocol", products: ["Testosterone Cypionate", "Anastrozole"], price: "$169/mo", savings: "Save $29" }
  ],
  medications: [
    {
      name: "Testosterone Cypionate",
      description: "Gold standard for TRT with stable weekly dosing.",
      price: "$149/mo"
    },
    {
      name: "Testosterone Enanthate",
      description: "Alternative ester with similar benefits.",
      price: "$149/mo"
    },
    {
      name: "HCG",
      description: "Maintains fertility and testicular function.",
      price: "$99/mo"
    },
    {
      name: "Anastrozole",
      description: "Manages estrogen levels when needed.",
      price: "Included"
    },
    {
      name: "Gonadorelin",
      description: "Alternative to HCG for natural production.",
      price: "$79/mo"
    }
  ],
  symptoms: [
    "Persistent fatigue",
    "Decreased motivation",
    "Muscle loss",
    "Increased body fat",
    "Reduced libido",
    "Brain fog"
  ],
  benefits: [
    "Increased energy",
    "Better mood",
    "Improved strength",
    "Enhanced clarity",
    "Better sleep",
    "Higher libido"
  ],
  timeline: [
    { period: "Week 1-2", description: "Energy and mood improvements begin." },
    { period: "Week 3-4", description: "Motivation and libido increase." },
    { period: "Month 2-3", description: "Body composition improves." },
    { period: "Month 3-6", description: "Maximum benefits achieved." }
  ],
  results: [
    { id: "trt-1", metric: "Total Testosterone", before: "285 ng/dL", after: "850 ng/dL", timeframe: "8 weeks", improvement: "+198%" },
    { id: "trt-2", metric: "Energy Level", before: "3/10", after: "9/10", timeframe: "4 weeks", improvement: "+200%" },
    { id: "trt-3", metric: "Lean Muscle", before: "145 lbs", after: "162 lbs", timeframe: "6 months", improvement: "+17 lbs" }
  ],
  safetyNote: "Regular blood work required. May affect fertility - discuss with your physician."
};

const HormonesPage = () => {
  return <TreatmentPageTemplate treatment={treatment} />;
};

export default HormonesPage;
