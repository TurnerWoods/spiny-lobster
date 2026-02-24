import TreatmentPageTemplate, { TreatmentData } from "@/components/TreatmentPageTemplate";
import heroImage from "@/assets/hero-hormones.jpg";

const treatment: TreatmentData = {
  category: "Sexual Health",
  title: "Intimate Wellness",
  subtitle: "Restore Confidence & Connection",
  description: "Restore desire and enhance performance with safe, effective treatments.",
  price: "$49",
  heroImage,
  productImage: "/images/products/pt141-vial.png",
  categoryColor: "#5D3A4A",
  stacks: [
    {
      name: "Performance Stack",
      tagline: "Complete Enhancement Protocol for Desire & Performance",
      products: ["PT-141", "Tadalafil"],
      price: "$149/mo",
      savings: "Save $49",
      popular: true,
      image: "/images/products/performance-stack.png"
    }
  ],
  medications: [
    {
      name: "PT-141 + Tadalafil Combo",
      description: "Best-selling combination for comprehensive enhancement. Combines desire and performance in one convenient protocol.",
      price: "$149/mo",
      image: "/images/products/performance-stack.png",
      rating: 4.9,
      reviewCount: 2341,
      bestSeller: true
    },
    {
      name: "PT-141 (Bremelanotide)",
      description: "Peptide that enhances desire and arousal through central nervous system activation.",
      price: "$149/mo",
      image: "/images/products/pt141-vial.png",
      rating: 4.8,
      reviewCount: 1876,
      mostPopular: true
    },
    {
      name: "Kisspeptin",
      description: "Stimulates reproductive hormones naturally for enhanced libido and hormone balance.",
      price: "$179/mo",
      image: "/images/products/kisspeptin-vial.png",
      rating: 4.7,
      reviewCount: 892
    },
    {
      name: "Oxytocin",
      description: "Bonding hormone for emotional intimacy and deeper connection.",
      price: "$99/mo",
      image: "/images/products/oxytocin-spray.png",
      rating: 4.6,
      reviewCount: 654
    },
    {
      name: "Tadalafil (Cialis)",
      description: "Long-acting for improved blood flow (up to 36 hrs). Allows for spontaneity.",
      price: "$49/mo",
      image: "/images/products/tadalafil-tablets.png",
      rating: 4.8,
      reviewCount: 3421
    }
  ],
  symptoms: [
    "Decreased libido",
    "Performance anxiety",
    "Difficulty with arousal",
    "Reduced satisfaction",
    "Emotional disconnect",
    "Age-related changes"
  ],
  benefits: [
    "Enhanced desire",
    "Better performance",
    "Greater confidence",
    "Deeper connection",
    "More spontaneity",
    "Restored vitality"
  ],
  timeline: [
    { period: "Week 1-2", description: "Desire and arousal improve." },
    { period: "Week 3-4", description: "Confidence increases." },
    { period: "Month 2-3", description: "Sustained enhancement." },
    { period: "Month 3+", description: "Optimal benefits." }
  ],
  results: [
    { id: "sexual-1", metric: "Libido Score", before: "3/10", after: "8/10", timeframe: "4 weeks", improvement: "+167%" },
    { id: "sexual-2", metric: "Confidence", before: "2/10", after: "9/10", timeframe: "3 weeks", improvement: "+350%" },
    { id: "sexual-3", metric: "Anxiety", before: "8/10", after: "2/10", timeframe: "4 weeks", improvement: "-75%" }
  ],
  safetyNote: "Tadalafil should not be combined with nitrates. Physician consultation required."
};

const SexualHealthPage = () => {
  return <TreatmentPageTemplate treatment={treatment} />;
};

export default SexualHealthPage;
