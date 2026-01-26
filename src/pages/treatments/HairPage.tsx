import TreatmentPageTemplate, { TreatmentData } from "@/components/TreatmentPageTemplate";
import heroImage from "@/assets/hero-hair.jpg";

const treatment: TreatmentData = {
  category: "Hair Restoration",
  title: "Hair Loss Treatment",
  subtitle: "Clinically Proven Solutions for Male Pattern Baldness",
  description: "Hair loss affects 85% of men by age 50, but it doesn't have to be permanent. Our comprehensive hair restoration protocols combine proven medications with advanced peptide therapies to stop loss and promote regrowth.",
  price: "$79/mo",
  heroImage,
  medications: [
    {
      name: "Finasteride",
      description: "FDA-approved DHT blocker that stops hair loss at the source. The most effective oral treatment for male pattern baldness.",
      price: "$29/mo"
    },
    {
      name: "Minoxidil (Oral)",
      description: "Low-dose oral minoxidil for convenient, effective hair regrowth without topical application hassles.",
      price: "$29/mo"
    },
    {
      name: "Finasteride + Minoxidil Combo",
      description: "Our most popular protocol. Combination therapy for maximum results—blocks DHT while stimulating growth.",
      price: "$49/mo"
    },
    {
      name: "Topical Finasteride + Minoxidil",
      description: "Compounded topical solution that delivers both medications directly to the scalp with reduced systemic absorption.",
      price: "$79/mo"
    },
    {
      name: "GHK-Cu Peptide",
      description: "Copper peptide that supports hair follicle health, wound healing, and may enhance results of primary treatments.",
      price: "$99/mo add-on"
    },
    {
      name: "Dutasteride",
      description: "More potent DHT blocker for patients who don't respond adequately to finasteride. Prescription only when indicated.",
      price: "$49/mo"
    }
  ],
  symptoms: [
    "Receding hairline",
    "Thinning at the crown or temples",
    "Increased hair shedding",
    "Visible scalp through hair",
    "Family history of male pattern baldness",
    "Hair becoming finer and weaker",
    "Slow hair growth after haircuts",
    "Self-consciousness about hair appearance"
  ],
  benefits: [
    "Stop further hair loss",
    "Promote new hair growth",
    "Thicker, fuller hair",
    "Improved hairline appearance",
    "Restored confidence",
    "Simple daily routine",
    "Clinically proven results",
    "Affordable long-term solution"
  ],
  timeline: [
    { period: "Month 1-2", description: "Hair shedding may initially increase (this is normal). Treatment is working on follicles." },
    { period: "Month 3-4", description: "Shedding normalizes. Early signs of reduced hair loss and new fine hairs appearing." },
    { period: "Month 6-9", description: "Noticeable improvements in hair density and thickness. Visible regrowth in many patients." },
    { period: "Month 12+", description: "Maximum results achieved. Continued treatment maintains and improves results over time." }
  ],
  results: [
    { id: "hair-1", metric: "Hair Count", before: "85/cm²", after: "142/cm²", timeframe: "12 months", improvement: "+67% density" },
    { id: "hair-2", metric: "Hair Thickness", before: "45 μm", after: "72 μm", timeframe: "9 months", improvement: "+60% thicker" },
    { id: "hair-3", metric: "Shedding", before: "150+/day", after: "40/day", timeframe: "3 months", improvement: "-73% loss" },
    { id: "hair-4", metric: "Crown Coverage", before: "40%", after: "85%", timeframe: "12 months", improvement: "+45% coverage" },
    { id: "hair-5", metric: "Hairline", before: "NW3", after: "NW2", timeframe: "18 months", improvement: "1 grade improved" },
    { id: "hair-6", metric: "Confidence", before: "4/10", after: "9/10", timeframe: "9 months", improvement: "+125%" }
  ],
  safetyNote: "Finasteride may cause sexual side effects in a small percentage of men (2-4%). Most side effects resolve with continued use or discontinuation. Discuss concerns with your physician."
};

const HairPage = () => {
  return <TreatmentPageTemplate treatment={treatment} />;
};

export default HairPage;
