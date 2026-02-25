import TreatmentPageTemplate, { TreatmentData } from "@/components/TreatmentPageTemplate";
import heroImage from "@/assets/hero-mood.jpg";

const treatment: TreatmentData = {
  category: "Mood & Cognitive",
  title: "Mental Wellness",
  subtitle: "Peak Cognitive Performance",
  description: "Sharpen focus, stabilize mood, and enhance mental clarity.",
  price: "$79",
  heroImage,
  productImage: "/images/products/semax-selank-vials.png",
  stacks: [
    {
      name: "The Brain Stack",
      tagline: "Complete Cognitive Enhancement Protocol",
      products: ["Semax", "Selank"],
      price: "$149/mo",
      savings: "Save $49",
      popular: true,
      image: "/images/products/semax-selank-vials.png"
    }
  ],
  medications: [
    {
      name: "Semax",
      description: "Nootropic peptide for memory and mental clarity. Differentiator — Hone/TryEden don't carry.",
      price: "$99/mo",
      image: "/images/products/semax-vial.png",
      rating: 4.9,
      reviewCount: 1876,
      bestSeller: true
    },
    {
      name: "Selank",
      description: "Anxiolytic + cognitive peptide that reduces anxiety and improves focus. Pairs synergistically with Semax.",
      price: "$99/mo",
      image: "/images/products/selank-vial.png",
      rating: 4.8,
      reviewCount: 1432,
      mostPopular: true
    },
    {
      name: "Dihexa",
      description: "Premium nootropic for advanced cognitive enhancement and memory formation.",
      price: "$179/mo",
      image: "/images/products/dihexa-vial.png",
      rating: 4.7,
      reviewCount: 543
    },
    {
      name: "MOTS-c",
      description: "Mitochondrial peptide for cellular energy, cognition, and metabolic health. Cross-listed with longevity.",
      price: "$199/mo",
      image: "/images/products/mots-c-vial.png",
      rating: 4.7,
      reviewCount: 412
    },
    {
      name: "Methylene Blue",
      description: "Mitochondrial support for cognitive function. High-margin nootropic with growing community demand.",
      price: "$79/mo",
      image: "/images/products/methylene-blue-vial.png",
      rating: 4.6,
      reviewCount: 654
    }
  ],
  symptoms: [
    "Brain fog",
    "Poor concentration",
    "Low motivation",
    "Mild anxiety",
    "Memory concerns",
    "Mental fatigue"
  ],
  benefits: [
    "Enhanced clarity",
    "Better memory",
    "Reduced anxiety",
    "Stable mood",
    "More motivation",
    "Sharper focus"
  ],
  timeline: [
    { period: "Week 1-2", description: "Focus and clarity improve." },
    { period: "Week 3-4", description: "Mood stabilizes." },
    { period: "Month 2-3", description: "Cognitive gains compound." },
    { period: "Month 3+", description: "Optimal brain health." }
  ],
  results: [
    { id: "mood-1", metric: "Focus Score", before: "3/10", after: "9/10", timeframe: "3 weeks", improvement: "+200%" },
    { id: "mood-2", metric: "Anxiety", before: "8/10", after: "3/10", timeframe: "4 weeks", improvement: "-63%" },
    { id: "mood-3", metric: "Work Output", before: "4 hrs", after: "7 hrs", timeframe: "1 month", improvement: "+75%" }
  ],
  safetyNote: "Not intended to treat clinical depression or anxiety disorders."
};

const MoodPage = () => {
  return <TreatmentPageTemplate treatment={treatment} />;
};

export default MoodPage;
