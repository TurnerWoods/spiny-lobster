import TreatmentPageTemplate, { TreatmentData } from "@/components/TreatmentPageTemplate";
import heroImage from "@/assets/hero-hair.jpg";

const treatment: TreatmentData = {
  category: "Hair Restoration",
  title: "Hair Loss Treatment",
  subtitle: "Clinically Proven Results",
  description: "Stop loss and promote regrowth with proven medications and peptide therapies.",
  price: "$29",
  heroImage,
  productImage: "/images/products/hair-restoration-kit.png",
  stacks: [
    { name: "Complete Hair Stack", tagline: "Maximum Regrowth Protocol", products: ["Finasteride", "Oral Minoxidil", "GHK-Cu"], price: "$129/mo", savings: "Save $28", popular: true },
    { name: "Hair Essentials", tagline: "Core Treatment", products: ["Finasteride", "Oral Minoxidil"], price: "$49/mo", savings: "Save $9" },
    { name: "Topical Protocol", tagline: "No Pills Required", products: ["Topical Fin/Min", "GHK-Cu"], price: "$149/mo", savings: "Save $29" }
  ],
  medications: [
    {
      name: "Finasteride",
      description: "FDA-approved DHT blocker to stop hair loss.",
      price: "$29/mo"
    },
    {
      name: "Oral Minoxidil",
      description: "Low-dose oral for convenient regrowth.",
      price: "$29/mo"
    },
    {
      name: "Topical Fin/Min",
      description: "Combined topical solution for scalp application.",
      price: "$79/mo"
    },
    {
      name: "GHK-Cu Peptide",
      description: "Copper peptide for follicle health.",
      price: "$99/mo"
    },
    {
      name: "Dutasteride",
      description: "Potent DHT blocker when finasteride is insufficient.",
      price: "$49/mo"
    }
  ],
  symptoms: [
    "Receding hairline",
    "Crown thinning",
    "Increased shedding",
    "Visible scalp",
    "Finer, weaker hair",
    "Family history of baldness"
  ],
  benefits: [
    "Stop hair loss",
    "Promote regrowth",
    "Thicker hair",
    "Better hairline",
    "Restored confidence",
    "Simple routine"
  ],
  timeline: [
    { period: "Month 1-2", description: "Initial shedding (normal)." },
    { period: "Month 3-4", description: "Shedding normalizes." },
    { period: "Month 6-9", description: "Visible improvements." },
    { period: "Month 12+", description: "Maximum results." }
  ],
  results: [
    { id: "hair-1", metric: "Hair Count", before: "85/cm²", after: "142/cm²", timeframe: "12 months", improvement: "+67%" },
    { id: "hair-2", metric: "Shedding", before: "150+/day", after: "40/day", timeframe: "3 months", improvement: "-73%" },
    { id: "hair-3", metric: "Confidence", before: "4/10", after: "9/10", timeframe: "9 months", improvement: "+125%" }
  ],
  safetyNote: "Finasteride may cause sexual side effects in 2-4% of men."
};

const HairPage = () => {
  return <TreatmentPageTemplate treatment={treatment} />;
};

export default HairPage;
