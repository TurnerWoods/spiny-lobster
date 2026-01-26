import TreatmentPageTemplate, { TreatmentData } from "@/components/TreatmentPageTemplate";

const treatment: TreatmentData = {
  category: "Skin & Aesthetics",
  title: "Medical Skincare",
  subtitle: "Prescription-Strength Solutions for Healthier Skin",
  description: "Look as good as you feel with medical-grade skincare treatments that go beyond what's available over the counter. Our protocols target aging, acne, sun damage, and skin health at the cellular level.",
  price: "$99/mo",
  medications: [
    {
      name: "Tretinoin (Retin-A)",
      description: "Gold standard for anti-aging. Increases cell turnover, builds collagen, reduces fine lines, and improves skin texture.",
      price: "$49/mo"
    },
    {
      name: "Custom Anti-Aging Compound",
      description: "Tretinoin + Niacinamide + Hyaluronic Acid. Comprehensive formula for aging, texture, and hydration.",
      price: "$99/mo"
    },
    {
      name: "GHK-Cu Copper Peptide",
      description: "Regenerative peptide that promotes collagen synthesis, wound healing, and overall skin rejuvenation.",
      price: "$129/mo"
    },
    {
      name: "Glutathione",
      description: "Master antioxidant that brightens skin, reduces hyperpigmentation, and provides anti-aging benefits from within.",
      price: "$99/mo"
    },
    {
      name: "Acne Protocol",
      description: "Tretinoin + Clindamycin + Niacinamide compounded treatment for adult acne and post-acne marks.",
      price: "$79/mo"
    },
    {
      name: "Melasma Treatment",
      description: "Hydroquinone + Tretinoin + Niacinamide compound for stubborn hyperpigmentation and dark spots.",
      price: "$89/mo"
    }
  ],
  symptoms: [
    "Fine lines and wrinkles",
    "Uneven skin texture",
    "Sun damage and age spots",
    "Dull, tired-looking skin",
    "Adult acne or breakouts",
    "Large pores",
    "Hyperpigmentation or dark spots",
    "Loss of skin firmness"
  ],
  benefits: [
    "Reduced fine lines and wrinkles",
    "Improved skin texture and tone",
    "Brighter, more radiant skin",
    "Reduced hyperpigmentation",
    "Clearer, acne-free skin",
    "Increased collagen production",
    "Healthier skin barrier",
    "More youthful appearance"
  ],
  timeline: [
    { period: "Week 1-4", description: "Skin may purge or experience mild irritation as it adjusts. This is normal." },
    { period: "Month 2-3", description: "Skin begins to look brighter. Texture improvements become noticeable." },
    { period: "Month 3-6", description: "Significant improvements in fine lines, tone, and overall skin quality." },
    { period: "Month 6+", description: "Optimal anti-aging results. Continued use maintains and enhances benefits." }
  ],
  safetyNote: "Tretinoin increases sun sensitivity. Daily sunscreen (SPF 30+) is essential. Start with lower concentrations and increase gradually. Avoid during pregnancy."
};

const SkinPage = () => {
  return <TreatmentPageTemplate treatment={treatment} />;
};

export default SkinPage;
