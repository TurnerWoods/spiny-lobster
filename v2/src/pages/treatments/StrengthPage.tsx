import TreatmentPageTemplate, { TreatmentData } from "@/components/TreatmentPageTemplate";
import heroImage from "@/assets/hero-strength.jpg";

const treatment: TreatmentData = {
  category: "Strength & Recovery",
  title: "Performance Peptides",
  subtitle: "Accelerate Recovery & Build Lean Muscle",
  description: "Peptide therapies that support muscle growth, tissue repair, and athletic performance.",
  price: "$129",
  heroImage,
  productImage: "/images/products/wolverine-stack.png",
  stacks: [
    {
      name: "The Wolverine Stack",
      tagline: "Ultimate Recovery & Tissue Repair Protocol",
      products: ["BPC-157", "TB-500"],
      price: "$249/mo",
      savings: "Save $79",
      popular: true,
      image: "/images/products/wolverine-stack.png"
    },
    {
      name: "Total Recovery",
      tagline: "Complete Healing Protocol",
      products: ["BPC-157", "TB-500", "GHK-Cu"],
      price: "$349/mo",
      savings: "Save $108",
      image: "/images/products/bpc-157-vial.png"
    },
    {
      name: "GH Optimization",
      tagline: "Peak Growth Hormone Support",
      products: ["CJC-1295/Ipamorelin", "Sermorelin"],
      price: "$349/mo",
      savings: "Save $99",
      image: "/images/products/gh-stack.png"
    }
  ],
  medications: [
    {
      name: "BPC-157",
      description: "Body Protection Compound — accelerates healing of muscles, tendons, and gut. Elevare $149 vs LIVV $250+.",
      price: "$149/mo",
      image: "/images/products/bpc-157-vial.png",
      rating: 4.9,
      reviewCount: 2876,
      bestSeller: true
    },
    {
      name: "TB-500",
      description: "Promotes tissue repair, angiogenesis, and reduces inflammation for faster recovery.",
      price: "$179/mo",
      image: "/images/products/tb-500-vial.png",
      rating: 4.8,
      reviewCount: 1923,
      mostPopular: true
    },
    {
      name: "GHK-Cu",
      description: "Copper peptide for tissue remodeling, collagen production, and anti-inflammatory benefits.",
      price: "$129/mo",
      image: "/images/products/ghk-cu-vial.png",
      rating: 4.7,
      reviewCount: 743
    },
    {
      name: "Sermorelin",
      description: "Baseline GH optimization — entry-level growth hormone releasing peptide.",
      price: "$199/mo",
      image: "/images/products/sermorelin-vial.png",
      rating: 4.8,
      reviewCount: 1567
    },
    {
      name: "CJC-1295/Ipamorelin",
      description: "Sustained GH release for enhanced recovery and body composition.",
      price: "$249/mo",
      image: "/images/products/cjc-1295-vial.png",
      rating: 4.9,
      reviewCount: 2134
    },
    {
      name: "GHRP-2",
      description: "GH secretagogue for growth hormone release. May stimulate appetite — position as mass-building aid.",
      price: "$149/mo",
      image: "/images/products/ghrp-2-vial.png",
      rating: 4.6,
      reviewCount: 654
    }
  ],
  symptoms: [
    "Slow recovery from workouts",
    "Nagging injuries that won't heal",
    "Loss of lean muscle mass",
    "Decreased strength and endurance",
    "Poor sleep affecting recovery",
    "Joint and tendon discomfort"
  ],
  benefits: [
    "Faster muscle recovery",
    "Accelerated injury healing",
    "Increased lean muscle mass",
    "Improved strength and power",
    "Better sleep quality",
    "Reduced joint pain"
  ],
  timeline: [
    { period: "Week 1-2", description: "Improved sleep and initial recovery benefits." },
    { period: "Week 3-4", description: "Faster recovery between workouts." },
    { period: "Month 2-3", description: "Improvements in strength and body composition." },
    { period: "Month 3-6", description: "Optimal performance benefits achieved." }
  ],
  results: [
    { id: "str-1", metric: "Bench Press", before: "185 lbs", after: "245 lbs", timeframe: "6 months", improvement: "+60 lbs" },
    { id: "str-2", metric: "Recovery Time", before: "72 hrs", after: "24 hrs", timeframe: "4 weeks", improvement: "3x faster" },
    { id: "str-3", metric: "Lean Mass", before: "158 lbs", after: "175 lbs", timeframe: "6 months", improvement: "+17 lbs" }
  ],
  safetyNote: "Peptide therapies are compounded medications. Results vary. Discuss goals with your physician."
};

const StrengthPage = () => {
  return <TreatmentPageTemplate treatment={treatment} />;
};

export default StrengthPage;
