import TreatmentPageTemplate, { TreatmentData } from "@/components/TreatmentPageTemplate";
import heroImage from "@/assets/hero-strength.jpg";

const treatment: TreatmentData = {
  category: "Strength & Recovery",
  title: "Performance Peptides",
  subtitle: "Accelerate Recovery & Build Lean Muscle",
  description: "Peptide therapies that support muscle growth, tissue repair, and athletic performance.",
  price: "$99",
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
      name: "GH Optimization Stack",
      tagline: "Peak Growth Hormone Support",
      products: ["CJC-1295", "Ipamorelin"],
      price: "$349/mo",
      savings: "Save $99",
      image: "/images/products/gh-stack.png"
    }
  ],
  medications: [
    {
      name: "Sermorelin",
      description: "Growth hormone releasing peptide for natural GH production and recovery.",
      price: "$199/mo",
      image: "/images/products/sermorelin-vial.png",
      rating: 4.8,
      reviewCount: 1567
    },
    {
      name: "CJC-1295 / Ipamorelin",
      description: "Sustained GH release for enhanced recovery and body composition.",
      price: "$249/mo",
      image: "/images/products/cjc-1295-vial.png",
      rating: 4.9,
      reviewCount: 2134,
      bestSeller: true
    },
    {
      name: "BPC-157",
      description: "Body Protection Compound that accelerates healing of muscles and tendons.",
      price: "$149/mo",
      image: "/images/products/bpc-157-vial.png",
      rating: 4.9,
      reviewCount: 2876,
      mostPopular: true
    },
    {
      name: "TB-500",
      description: "Promotes tissue repair and reduces inflammation for faster recovery.",
      price: "$179/mo",
      image: "/images/products/tb-500-vial.png",
      rating: 4.8,
      reviewCount: 1923
    },
    {
      name: "MK-677",
      description: "Oral GH secretagogue that increases IGF-1 levels for muscle growth.",
      price: "$99/mo",
      image: "/images/products/medication-package.png",
      rating: 4.6,
      reviewCount: 892
    },
    {
      name: "GHK-Cu",
      description: "Copper peptide for tissue regeneration and anti-inflammatory benefits.",
      price: "$129/mo",
      image: "/images/products/ghk-cu-vial.png",
      rating: 4.7,
      reviewCount: 743
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
