import TreatmentPageTemplate, { TreatmentData } from "@/components/TreatmentPageTemplate";
import heroImage from "@/assets/hero-anti-aging.jpg";

const treatment: TreatmentData = {
  category: "Anti-Aging & Longevity",
  title: "Cellular Optimization",
  subtitle: "Turn Back the Clock at the Cellular Level",
  description: "Age is more than a number—it's how your cells function. Our anti-aging protocols target the root causes of aging, supporting cellular energy, DNA repair, and metabolic health for a longer, more vibrant healthspan.",
  price: "$199/mo",
  heroImage,
  productImage: "/images/products/nad-supplements.png",
  medications: [
    {
      name: "NAD+ Injections",
      description: "Essential coenzyme for cellular energy production and DNA repair. Declines with age. Supports mental clarity, energy, and longevity.",
      price: "$199/mo",
      image: "/images/products/nad-supplements.png"
    },
    {
      name: "NAD+ Nasal Spray",
      description: "Convenient daily NAD+ delivery for sustained cellular support. Non-injectable option for ongoing maintenance.",
      price: "$149/mo"
    },
    {
      name: "Glutathione",
      description: "Master antioxidant that protects cells from oxidative stress, supports detoxification, and promotes healthy aging.",
      price: "$99/mo"
    },
    {
      name: "Epitalon",
      description: "Telomerase-activating peptide that may support telomere length and cellular longevity.",
      price: "$249/mo"
    },
    {
      name: "Methylene Blue",
      description: "Mitochondrial enhancer that supports cognitive function, energy production, and cellular health.",
      price: "$79/mo"
    }
  ],
  symptoms: [
    "Chronic fatigue and low energy",
    "Brain fog and declining mental sharpness",
    "Feeling older than your age",
    "Slow recovery from illness or exertion",
    "Declining physical performance",
    "Visible signs of aging (skin, hair)",
    "Poor sleep quality",
    "General decline in vitality"
  ],
  benefits: [
    "Enhanced cellular energy production",
    "Improved mental clarity and focus",
    "Better sleep and recovery",
    "Reduced oxidative stress",
    "Healthier aging trajectory",
    "Improved metabolic function",
    "Enhanced immune function",
    "Greater overall vitality"
  ],
  timeline: [
    { period: "Week 1-2", description: "Increased mental clarity and energy often noticed within days of starting NAD+." },
    { period: "Week 3-4", description: "Improved focus, better sleep quality, and enhanced sense of well-being." },
    { period: "Month 2-3", description: "Sustained energy improvements, better recovery, and enhanced physical performance." },
    { period: "Month 3-6", description: "Long-term cellular benefits. Optimal results with consistent treatment." }
  ],
  results: [
    { id: "aa-1", metric: "Energy Level", before: "3/10", after: "8/10", timeframe: "2 weeks", improvement: "+167%" },
    { id: "aa-2", metric: "Mental Clarity", before: "4/10", after: "9/10", timeframe: "3 weeks", improvement: "+125%" },
    { id: "aa-3", metric: "Sleep Score", before: "52", after: "89", timeframe: "4 weeks", improvement: "+71% (Oura Ring)" },
    { id: "aa-4", metric: "NAD+ Levels", before: "Low", after: "Optimal", timeframe: "6 weeks", improvement: "Restored" },
    { id: "aa-5", metric: "Recovery Time", before: "5 days", after: "2 days", timeframe: "6 weeks", improvement: "60% faster" },
    { id: "aa-6", metric: "Biological Age", before: "54 yrs", after: "46 yrs", timeframe: "6 months", improvement: "-8 years" }
  ],
  safetyNote: "NAD+ injections may cause flushing, nausea, or discomfort at injection site initially. These effects typically diminish with continued use. See full safety information."
};

const AntiAgingPage = () => {
  return <TreatmentPageTemplate treatment={treatment} />;
};

export default AntiAgingPage;
