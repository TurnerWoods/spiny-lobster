import TreatmentPageTemplate, { TreatmentData } from "@/components/TreatmentPageTemplate";
import heroImage from "@/assets/hero-skin.jpg";

const treatment: TreatmentData = {
  category: "Skin & Aesthetics",
  title: "Medical Skincare",
  subtitle: "Prescription-Strength Results",
  description: "Target aging, acne, and skin health at the cellular level.",
  price: "$49",
  heroImage,
  productImage: "/images/products/ghk-cu-vial.png",
  stacks: [
    { name: "Anti-Aging Stack", tagline: "Complete Rejuvenation Protocol", products: ["Tretinoin", "GHK-Cu", "Glutathione"], price: "$229/mo", savings: "Save $48", popular: true, image: "/images/products/ghk-cu-vial.png" },
    { name: "Clear Skin Stack", tagline: "Acne + Brightening", products: ["Acne Protocol", "Glutathione"], price: "$149/mo", savings: "Save $29", image: "/images/products/medication-package.png" },
    { name: "Glow Stack", tagline: "Radiance & Tone", products: ["Custom Compound", "GHK-Cu"], price: "$199/mo", savings: "Save $29", image: "/images/products/hair-growth-dropper.png" }
  ],
  medications: [
    {
      name: "Tretinoin",
      description: "Gold standard for anti-aging and collagen building.",
      price: "$49/mo",
      image: "/images/products/medication-package.png",
      rating: 4.9,
      reviewCount: 3654,
      bestSeller: true
    },
    {
      name: "Custom Compound",
      description: "Tretinoin + Niacinamide + Hyaluronic Acid formula.",
      price: "$99/mo",
      image: "/images/products/hair-growth-dropper.png",
      rating: 4.8,
      reviewCount: 1876,
      mostPopular: true
    },
    {
      name: "GHK-Cu",
      description: "Peptide for collagen and skin rejuvenation.",
      price: "$129/mo",
      image: "/images/products/ghk-cu-vial.png",
      rating: 4.8,
      reviewCount: 1234
    },
    {
      name: "Glutathione",
      description: "Antioxidant that brightens and reduces spots.",
      price: "$99/mo",
      image: "/images/products/medication-package.png",
      rating: 4.7,
      reviewCount: 987
    },
    {
      name: "Acne Protocol",
      description: "Compounded treatment for adult acne.",
      price: "$79/mo",
      image: "/images/products/medication-package.png",
      rating: 4.6,
      reviewCount: 654
    },
    {
      name: "Melasma Rx",
      description: "For stubborn hyperpigmentation.",
      price: "$89/mo",
      image: "/images/products/medication-package.png",
      rating: 4.5,
      reviewCount: 432
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
