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
    { name: "Complete Hair Stack", tagline: "Maximum Regrowth Protocol", products: ["Finasteride", "Oral Minoxidil", "GHK-Cu"], price: "$129/mo", savings: "Save $28", popular: true, image: "/images/products/hair-restoration-kit.png" },
    { name: "Hair Essentials", tagline: "Core Treatment", products: ["Finasteride", "Oral Minoxidil"], price: "$49/mo", savings: "Save $9", image: "/images/products/medication-package.png" },
    { name: "Peptide Protocol", tagline: "Advanced Regeneration", products: ["GHK-Cu Topical", "TB-500 Topical"], price: "$199/mo", savings: "Save $29", image: "/images/products/ghk-cu-vial.png" }
  ],
  medications: [
    {
      name: "Finasteride",
      description: "FDA-approved DHT blocker — standard of care to stop hair loss. Anchor product.",
      price: "$29/mo",
      image: "/images/products/medication-package.png",
      rating: 4.8,
      reviewCount: 4521,
      bestSeller: true
    },
    {
      name: "Oral Minoxidil",
      description: "Low-dose oral for convenient regrowth — growing preference over topical.",
      price: "$39/mo",
      image: "/images/products/medication-package.png",
      rating: 4.7,
      reviewCount: 2876,
      mostPopular: true
    },
    {
      name: "GHK-Cu Topical",
      description: "Copper peptide for follicle stimulation and scalp health. Peptide differentiation.",
      price: "$79/mo",
      image: "/images/products/ghk-cu-vial.png",
      rating: 4.6,
      reviewCount: 743
    },
    {
      name: "PTD-DBM",
      description: "Novel mechanism — Wnt pathway activation for follicle regeneration.",
      price: "$129/mo",
      image: "/images/products/medication-package.png",
      rating: 4.5,
      reviewCount: 312
    },
    {
      name: "TB-500 Topical",
      description: "Follicle regeneration peptide — experimental positioning for advanced protocols.",
      price: "$149/mo",
      image: "/images/products/tb-500-vial.png",
      rating: 4.5,
      reviewCount: 234
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
