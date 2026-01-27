import TreatmentPageTemplate, { TreatmentData } from "@/components/TreatmentPageTemplate";
import heroImage from "@/assets/hero-strength.jpg";

const treatment: TreatmentData = {
  category: "Strength & Recovery",
  title: "Performance Peptides",
  subtitle: "Accelerate Recovery & Build Lean Muscle",
  description: "Optimize your body's natural recovery systems with peptide therapies that support muscle growth, tissue repair, and athletic performance. Perfect for active men looking to maximize their training results.",
  price: "$199/mo",
  heroImage,
  productImage: "/images/lifestyle/strength-workout.png",
  medications: [
    {
      name: "Sermorelin",
      description: "Growth hormone releasing peptide that supports natural GH production, recovery, sleep quality, and lean body composition.",
      price: "$199/mo"
    },
    {
      name: "CJC-1295 / Ipamorelin",
      description: "Synergistic peptide combination that provides sustained growth hormone release for enhanced recovery and body composition.",
      price: "$249/mo"
    },
    {
      name: "BPC-157",
      description: "Body Protection Compound that accelerates healing of muscles, tendons, and ligaments. Excellent for injury recovery.",
      price: "$149/mo"
    },
    {
      name: "TB-500 (Thymosin Beta-4)",
      description: "Promotes tissue repair, reduces inflammation, and supports recovery from muscle and connective tissue injuries.",
      price: "$179/mo"
    },
    {
      name: "MK-677 (Ibutamoren)",
      description: "Oral growth hormone secretagogue that increases GH and IGF-1 levels, supporting muscle growth and recovery.",
      price: "$99/mo"
    }
  ],
  symptoms: [
    "Slow recovery from workouts",
    "Nagging injuries that won't heal",
    "Loss of lean muscle mass despite training",
    "Decreased strength and endurance",
    "Poor sleep affecting recovery",
    "Joint and tendon discomfort",
    "Hitting training plateaus",
    "Feeling overtrained or burned out"
  ],
  benefits: [
    "Faster muscle recovery",
    "Accelerated injury healing",
    "Increased lean muscle mass",
    "Improved strength and power",
    "Better sleep quality",
    "Reduced joint and tendon pain",
    "Enhanced athletic performance",
    "Improved body composition"
  ],
  timeline: [
    { period: "Week 1-2", description: "Improved sleep quality and initial recovery benefits. Reduced muscle soreness." },
    { period: "Week 3-4", description: "Noticeable faster recovery between workouts. Increased energy during training." },
    { period: "Month 2-3", description: "Significant improvements in strength, endurance, and body composition." },
    { period: "Month 3-6", description: "Optimal performance benefits. Sustained improvements in muscle mass and recovery." }
  ],
  results: [
    { id: "str-1", metric: "Bench Press", before: "185 lbs", after: "245 lbs", timeframe: "6 months", improvement: "+60 lbs (32%)" },
    { id: "str-2", metric: "Recovery Time", before: "72 hrs", after: "24 hrs", timeframe: "4 weeks", improvement: "3x faster" },
    { id: "str-3", metric: "Lean Mass", before: "158 lbs", after: "175 lbs", timeframe: "6 months", improvement: "+17 lbs muscle" },
    { id: "str-4", metric: "Sleep Quality", before: "4/10", after: "9/10", timeframe: "3 weeks", improvement: "+125%" },
    { id: "str-5", metric: "Joint Pain", before: "7/10", after: "2/10", timeframe: "8 weeks", improvement: "-71% pain" },
    { id: "str-6", metric: "IGF-1 Levels", before: "145 ng/mL", after: "285 ng/mL", timeframe: "3 months", improvement: "+97%" }
  ],
  safetyNote: "Peptide therapies are compounded medications and are not FDA-approved. Results vary based on individual factors, training, and nutrition. Discuss your fitness goals with your physician."
};

const StrengthPage = () => {
  return <TreatmentPageTemplate treatment={treatment} />;
};

export default StrengthPage;
