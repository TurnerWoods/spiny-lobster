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
      popular: true
    }
  ],
  medications: [
    {
      name: "Selank",
      description: "Nootropic peptide that reduces anxiety and improves focus.",
      price: "$99/mo"
    },
    {
      name: "Semax",
      description: "Cognitive enhancer for memory and mental clarity.",
      price: "$99/mo"
    },
    {
      name: "NAD+",
      description: "Supports brain energy and mental clarity.",
      price: "$199/mo"
    },
    {
      name: "Methylene Blue",
      description: "Mitochondrial support for cognitive function.",
      price: "$79/mo"
    },
    {
      name: "Dihexa",
      description: "Advanced nootropic for memory formation.",
      price: "$179/mo"
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
