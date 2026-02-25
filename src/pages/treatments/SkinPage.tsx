import TreatmentPageTemplate, { TreatmentData } from "@/components/TreatmentPageTemplate";
import heroImage from "@/assets/hero-skin.jpg";

const treatment: TreatmentData = {
  category: "Skin & Aesthetics",
  title: "Medical Skincare",
  subtitle: "Prescription-Strength Results",
  description: "Target aging, acne, and skin health at the cellular level.",
  price: "$39",
  heroImage,
  productImage: "/images/products/ghk-cu-vial.png",
  stacks: [
    { name: "Anti-Aging Stack", tagline: "Complete Rejuvenation Protocol", products: ["Tretinoin", "GHK-Cu"], price: "$149/mo", savings: "Save $19", popular: true, image: "/images/products/ghk-cu-vial.png" },
    { name: "Peptide Skin Stack", tagline: "Collagen & Elastin Boost", products: ["GHK-Cu", "Argireline", "Matrixyl"], price: "$249/mo", savings: "Save $48", image: "/images/products/ghk-cu-vial.png" }
  ],
  medications: [
    {
      name: "Tretinoin",
      description: "Gold standard topical for anti-aging and collagen building. Proven, high margin.",
      price: "$39/mo",
      image: "/images/products/hair-growth-dropper.png",
      rating: 4.9,
      reviewCount: 3654,
      bestSeller: true
    },
    {
      name: "GHK-Cu",
      description: "Peptide for collagen production, anti-wrinkle, and skin rejuvenation.",
      price: "$129/mo",
      image: "/images/products/ghk-cu-vial.png",
      rating: 4.8,
      reviewCount: 1234,
      mostPopular: true
    },
    {
      name: "Argireline",
      description: "Topical 'botox alternative' — consumer-friendly peptide for expression lines.",
      price: "$89/mo",
      image: "/images/products/epitalon-vial.png",
      rating: 4.7,
      reviewCount: 876
    },
    {
      name: "Matrixyl",
      description: "Collagen + elastin stimulating peptide. Pairs synergistically with GHK-Cu.",
      price: "$99/mo",
      image: "/images/products/ghk-cu-vial.png",
      rating: 4.6,
      reviewCount: 654
    }
  ],
  symptoms: [
    "Fine lines",
    "Uneven texture",
    "Sun damage",
    "Dull skin",
    "Adult acne",
    "Dark spots"
  ],
  benefits: [
    "Reduced wrinkles",
    "Better texture",
    "Brighter skin",
    "Clearer complexion",
    "More collagen",
    "Youthful glow"
  ],
  timeline: [
    { period: "Week 1-4", description: "Adjustment period (normal)." },
    { period: "Month 2-3", description: "Skin brightens." },
    { period: "Month 3-6", description: "Major improvements." },
    { period: "Month 6+", description: "Optimal results." }
  ],
  results: [
    { id: "skin-1", metric: "Fine Lines", before: "Deep", after: "Minimal", timeframe: "6 months", improvement: "-70%" },
    { id: "skin-2", metric: "Texture", before: "3/10", after: "8/10", timeframe: "4 months", improvement: "+167%" },
    { id: "skin-3", metric: "Acne", before: "8/month", after: "1/month", timeframe: "3 months", improvement: "-87%" }
  ],
  safetyNote: "Use sunscreen daily. Avoid during pregnancy."
};

const SkinPage = () => {
  return <TreatmentPageTemplate treatment={treatment} />;
};

export default SkinPage;
