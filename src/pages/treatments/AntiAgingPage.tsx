import TreatmentPageTemplate, { TreatmentData } from "@/components/TreatmentPageTemplate";
import heroImage from "@/assets/hero-anti-aging.jpg";

const treatment: TreatmentData = {
  category: "Anti-Aging & Longevity",
  title: "Cellular Optimization",
  subtitle: "Turn Back the Clock at the Cellular Level",
  description: "Age is more than a number—it's how your cells function. Our anti-aging protocols target the root causes of aging, supporting cellular energy, DNA repair, and metabolic health for a longer, more vibrant healthspan.",
  price: "$199/mo",
  heroImage,
  medications: [
    {
      name: "NAD+ Injections",
      description: "Essential coenzyme for cellular energy production and DNA repair. Declines with age. Supports mental clarity, energy, and longevity.",
      price: "$199/mo"
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
  safetyNote: "NAD+ injections may cause flushing, nausea, or discomfort at injection site initially. These effects typically diminish with continued use. See full safety information."
};

const AntiAgingPage = () => {
  return <TreatmentPageTemplate treatment={treatment} />;
};

export default AntiAgingPage;
