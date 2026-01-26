import TreatmentPageTemplate, { TreatmentData } from "@/components/TreatmentPageTemplate";

const treatment: TreatmentData = {
  category: "Hormone Optimization",
  title: "Testosterone Replacement Therapy",
  subtitle: "Restore Your Vitality & Performance",
  description: "Low testosterone affects millions of men, often without them realizing it. Fatigue, decreased motivation, weight gain, and declining performance aren't inevitable parts of aging. TRT can help you feel like yourself again.",
  price: "$149/mo",
  medications: [
    {
      name: "Testosterone Cypionate",
      description: "The gold standard for TRT. Long-acting injectable testosterone that provides stable hormone levels with weekly or bi-weekly dosing.",
      price: "$149/mo"
    },
    {
      name: "Testosterone Enanthate",
      description: "Similar to cypionate with slightly different ester. Preferred by some patients for its absorption profile.",
      price: "$149/mo"
    },
    {
      name: "hCG (Human Chorionic Gonadotropin)",
      description: "Maintains testicular function and fertility during TRT. Often prescribed alongside testosterone.",
      price: "$99/mo add-on"
    },
    {
      name: "Anastrozole",
      description: "Aromatase inhibitor to manage estrogen levels and prevent side effects. Included when clinically indicated.",
      price: "Included when needed"
    },
    {
      name: "Gonadorelin",
      description: "Alternative to hCG for maintaining natural testosterone production and testicular size.",
      price: "$79/mo add-on"
    }
  ],
  symptoms: [
    "Persistent fatigue despite adequate sleep",
    "Decreased motivation and mental sharpness",
    "Difficulty maintaining muscle mass",
    "Increased body fat, especially around the midsection",
    "Reduced libido and sexual performance",
    "Mood changes, including irritability or mild depression",
    "Poor sleep quality and insomnia",
    "Brain fog and difficulty concentrating"
  ],
  benefits: [
    "Increased energy and vitality",
    "Improved mood and motivation",
    "Better body composition",
    "Enhanced mental clarity and focus",
    "Improved sleep quality",
    "Increased strength and endurance",
    "Better sexual health and libido",
    "Reduced risk of metabolic disease"
  ],
  timeline: [
    { period: "Week 1-2", description: "Initial improvements in energy, mood, and sense of well-being begin." },
    { period: "Week 3-4", description: "Noticeable increase in motivation, mental clarity, and libido." },
    { period: "Month 2-3", description: "Improvements in body composition, strength, and physical performance." },
    { period: "Month 3-6", description: "Optimal results as hormone levels fully stabilize. Maximum benefits achieved." }
  ],
  safetyNote: "TRT requires regular blood work to monitor hormone levels, hematocrit, and PSA. May affect fertility—discuss with your physician if planning to have children. See full safety information."
};

const HormonesPage = () => {
  return <TreatmentPageTemplate treatment={treatment} />;
};

export default HormonesPage;
