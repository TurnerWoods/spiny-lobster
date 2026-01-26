import TreatmentPageTemplate, { TreatmentData } from "@/components/TreatmentPageTemplate";
import heroImage from "@/assets/hero-mood.jpg";

const treatment: TreatmentData = {
  category: "Mood & Cognitive",
  title: "Mental Wellness Support",
  subtitle: "Optimize Your Mind for Peak Performance",
  description: "Your mental performance matters as much as your physical health. Our cognitive and mood support protocols help sharpen focus, stabilize mood, and enhance mental clarity without the side effects of traditional medications.",
  price: "$99/mo",
  heroImage,
  medications: [
    {
      name: "PT-141 (Bremelanotide)",
      description: "Peptide that works on the central nervous system to enhance desire and arousal. Addresses psychological aspects of sexual health.",
      price: "$149/mo"
    },
    {
      name: "Selank",
      description: "Nootropic peptide with anxiolytic properties. Reduces anxiety and stress while improving cognitive function and focus.",
      price: "$99/mo"
    },
    {
      name: "Semax",
      description: "Cognitive-enhancing peptide that improves memory, focus, and mental clarity. Supports BDNF production for brain health.",
      price: "$99/mo"
    },
    {
      name: "NAD+ for Cognitive Support",
      description: "Essential coenzyme that supports brain energy, mental clarity, and may help with mood regulation.",
      price: "$199/mo"
    },
    {
      name: "Methylene Blue",
      description: "Mitochondrial support for enhanced cognitive function, memory, and neuroprotection. Low-dose pharmaceutical grade.",
      price: "$79/mo"
    },
    {
      name: "Dihexa",
      description: "Potent nootropic peptide that supports memory formation and cognitive enhancement. For advanced cognitive support.",
      price: "$179/mo"
    }
  ],
  symptoms: [
    "Brain fog and mental fatigue",
    "Difficulty concentrating or focusing",
    "Low motivation and drive",
    "Mild anxiety or stress",
    "Memory concerns",
    "Afternoon mental crashes",
    "Feeling mentally dull or slow",
    "Decreased sexual desire (psychological)"
  ],
  benefits: [
    "Enhanced mental clarity and focus",
    "Improved memory and recall",
    "Reduced anxiety and stress",
    "Better mood stability",
    "Increased motivation and drive",
    "Sharper cognitive performance",
    "Improved sexual desire",
    "Greater mental resilience"
  ],
  timeline: [
    { period: "Week 1-2", description: "Initial improvements in focus and mental clarity. Reduced brain fog." },
    { period: "Week 3-4", description: "Noticeable improvements in mood stability and anxiety reduction." },
    { period: "Month 2-3", description: "Enhanced cognitive performance, better memory, and sustained mental energy." },
    { period: "Month 3+", description: "Optimal cognitive benefits. Long-term brain health support with continued use." }
  ],
  safetyNote: "Cognitive peptides are not FDA-approved and are compounded medications. They are not intended to treat clinical depression or anxiety disorders. Consult your physician if you have diagnosed mental health conditions."
};

const MoodPage = () => {
  return <TreatmentPageTemplate treatment={treatment} />;
};

export default MoodPage;
