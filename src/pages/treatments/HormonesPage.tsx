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
    { name: "The Foundation Protocol", tagline: "Complete Hormone Optimization", products: ["Testosterone Cypionate", "HCG", "Anastrozole"], price: "$249/mo", savings: "Save $48", popular: true, image: "/images/products/foundation-stack.png" },
    { name: "TRT + Fertility", tagline: "Preserve Natural Function", products: ["Testosterone", "Gonadorelin", "Anastrozole"], price: "$279/mo", savings: "Save $48", image: "/images/products/hcg-vial.png" },
    { name: "TRT Essentials", tagline: "Core Protocol", products: ["Testosterone Cypionate", "Anastrozole"], price: "$169/mo", savings: "Save $29", image: "/images/products/testosterone-vial.png" }
  ],
  medications: [
    {
      name: "Testosterone Cypionate (Injectable)",
      description: "Gold standard for TRT — anchor product with stable weekly dosing and highest volume.",
      price: "$149/mo",
      image: "/images/products/testosterone-vial.png",
      rating: 4.9,
      reviewCount: 3241,
      bestSeller: true
    },
    {
      name: "Testosterone Cream/Gel",
      description: "Growing preference for non-injection topical alternative with steady absorption.",
      price: "$129/mo",
      image: "/images/products/testosterone-vial.png",
      rating: 4.7,
      reviewCount: 1876,
      mostPopular: true
    },
    {
      name: "HCG (Gonadorelin)",
      description: "Standard TRT adjunct — maintains fertility and testicular function.",
      price: "$99/mo",
      image: "/images/products/hcg-vial.png",
      rating: 4.7,
      reviewCount: 1432
    },
    {
      name: "Anastrozole",
      description: "Estrogen management — essential adjunct for optimal hormone balance.",
      price: "$49/mo",
      image: "/images/products/anastrozole-bottle.png",
      rating: 4.6,
      reviewCount: 987
    },
    {
      name: "DHEA",
      description: "Adrenal support for comprehensive hormone optimization.",
      price: "$39/mo",
      image: "/images/products/nad-supplements.png",
      rating: 4.5,
      reviewCount: 654
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
