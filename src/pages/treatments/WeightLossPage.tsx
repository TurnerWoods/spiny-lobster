import TreatmentPageTemplate, { TreatmentData } from "@/components/TreatmentPageTemplate";
import heroImage from "@/assets/hero-weight-loss.jpg";

const treatment: TreatmentData = {
  category: "Weight Loss",
  title: "Medical Weight Loss",
  subtitle: "Clinically Proven GLP-1 & Peptide Therapies",
  description: "Break through weight loss plateaus with physician-supervised therapies that work with your body's natural systems. Our medical weight loss protocols help reduce appetite, boost metabolism, and support lasting results.",
  price: "$149/mo",
  heroImage,
  productImage: "/images/products/tirzepatide-prep.png",
  medications: [
    {
      name: "Semaglutide",
      description: "GLP-1 receptor agonist that reduces appetite, slows gastric emptying, and improves blood sugar control. The same active ingredient in Ozempic® and Wegovy®.",
      price: "$149/mo",
      image: "/images/products/semaglutide-vial.png"
    },
    {
      name: "Tirzepatide",
      description: "Dual GIP/GLP-1 receptor agonist for enhanced weight loss. The same active ingredient in Mounjaro® and Zepbound®. Our most effective option.",
      price: "$199/mo",
      image: "/images/products/tirzepatide-prep.png"
    },
    {
      name: "Tesamorelin",
      description: "Growth hormone releasing peptide that specifically targets stubborn visceral and abdominal fat while preserving lean muscle mass.",
      price: "$199/mo"
    },
    {
      name: "AOD-9604",
      description: "Fat-burning peptide derived from growth hormone that stimulates lipolysis without affecting blood sugar or growth.",
      price: "$149/mo"
    },
    {
      name: "Lipotropic Injections",
      description: "B12 + MIC (Methionine, Inositol, Choline) injections that support fat metabolism, energy, and liver function.",
      price: "$99/mo",
      image: "/images/products/injection-supplies.png"
    }
  ],
  symptoms: [
    "Stubborn belly fat that won't respond to diet and exercise",
    "Constant food cravings and difficulty controlling appetite",
    "Slow metabolism despite healthy eating habits",
    "Weight regain after previous diet attempts",
    "Fatigue and low energy levels",
    "Pre-diabetic or metabolic syndrome concerns",
    "Difficulty losing weight after age 35-40",
    "Emotional or stress eating patterns"
  ],
  benefits: [
    "Significant, sustainable weight loss",
    "Reduced appetite and food cravings",
    "Improved blood sugar control",
    "Increased energy levels",
    "Better cardiovascular health markers",
    "Reduced visceral fat",
    "Improved metabolic function",
    "Enhanced mood and confidence"
  ],
  timeline: [
    { period: "Week 1-2", description: "Appetite reduction and decreased food cravings begin. Some patients notice early weight loss." },
    { period: "Week 3-4", description: "Noticeable weight loss typically 3-5 lbs. Improved energy and blood sugar stability." },
    { period: "Month 2-3", description: "Significant weight loss progress. Improved body composition and metabolic markers." },
    { period: "Month 3-6", description: "Optimal results with 10-20% body weight reduction common. Lifestyle changes become sustainable habits." }
  ],
  results: [
    { id: "wl-1", metric: "Body Weight", before: "245 lbs", after: "198 lbs", timeframe: "6 months", improvement: "-47 lbs (19%)" },
    { id: "wl-2", metric: "Waist Size", before: '42"', after: '34"', timeframe: "5 months", improvement: '-8 inches' },
    { id: "wl-3", metric: "A1C Level", before: "6.8%", after: "5.4%", timeframe: "4 months", improvement: "Now normal range" },
    { id: "wl-4", metric: "Body Fat %", before: "32%", after: "22%", timeframe: "6 months", improvement: "-10% body fat" },
    { id: "wl-5", metric: "Appetite Score", before: "9/10", after: "3/10", timeframe: "2 weeks", improvement: "67% reduction" },
    { id: "wl-6", metric: "Energy Level", before: "3/10", after: "8/10", timeframe: "1 month", improvement: "+167% energy" }
  ],
  safetyNote: "GLP-1 medications may cause nausea, especially initially. We start with low doses and titrate slowly. Not recommended for those with personal or family history of medullary thyroid cancer or MEN2 syndrome. See full safety information."
};

const WeightLossPage = () => {
  return <TreatmentPageTemplate treatment={treatment} />;
};

export default WeightLossPage;
