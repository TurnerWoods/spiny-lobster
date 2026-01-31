import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TreatmentComparisonTable from "@/components/TreatmentComparisonTable";
import { motion } from "framer-motion";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

const consultationOptions = [
  {
    name: "Online Assessment",
    recommended: true,
    price: "$0",
    description: "Secure online health assessment reviewed by licensed clinician. No scheduled visit required. Ongoing secure messaging with care team. Fastest and most efficient path for eligible patients.",
    features: [
      "5-minute health assessment",
      "Physician review within 24 hours",
      "Unlimited secure messaging",
      "No appointment needed",
    ],
  },
  {
    name: "Live Video Consultation",
    recommended: false,
    price: "$99",
    description: "30-minute 1-on-1 video visit with licensed physician. Intended for complex medical histories or special circumstances. Not required for most patients.",
    features: [
      "30-minute video call",
      "Face-to-face discussion",
      "Complex case review",
      "Same physician review included",
    ],
  },
];

const treatments = [
  { name: "Testosterone Cypionate", price: "$149/month", description: "The gold standard for TRT" },
  { name: "Sermorelin", price: "$199/month", description: "Growth hormone support" },
  { name: "Tesamorelin", price: "$199/month", description: "Metabolic optimization" },
  { name: "NAD+", price: "$199/month", description: "Cellular energy & anti-aging" },
];

const included = [
  "Prescribed medication fulfilled by licensed U.S. pharmacies",
  "Personalized treatment plan from a Texas-licensed physician",
  "Unlimited secure messaging with your care team",
  "Ongoing protocol monitoring and adjustments",
  "Discreet shipping to your home or office",
  "No contracts. Cancel anytime.",
];

const PricingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-soft-linen via-pure-white to-light-cloud">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img 
              src="/images/lifestyle/executive-contemplating.png" 
              alt="Executive lifestyle"
              className="h-full w-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-soft-linen via-soft-linen/95 to-soft-linen/80" />
          </div>
          <div className="container relative z-10 px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-warm-stone/20 bg-pure-white/80 px-4 py-2 backdrop-blur-sm"
              >
                <Sparkles className="h-4 w-4 text-warm-stone" />
                <span className="text-sm font-medium text-warm-stone">Transparent Pricing</span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-6 font-display text-4xl font-bold text-rich-black md:text-5xl"
              >
                Clear Pricing. No Surprises.
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-warm-gray"
              >
                We believe you shouldn't need a decoder ring to understand healthcare costs. One monthly price covers your medication, pharmacy fulfillment, and unlimited access to your care team.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Consultation Options */}
        <section className="py-20">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-4xl">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-8 text-center font-display text-3xl font-bold text-rich-black"
              >
                Consultation Options
              </motion.h2>
              <div className="grid gap-6 md:grid-cols-2">
                {consultationOptions.map((option, index) => (
                  <motion.div
                    key={option.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card
                      variant="glass"
                      className={`relative h-full p-8 ${
                        option.recommended ? "border-warm-stone/30 ring-1 ring-warm-stone/20" : ""
                      }`}
                    >
                      {option.recommended && (
                        <span className="absolute -top-3 left-6 rounded-full bg-warm-stone px-3 py-1 text-xs font-medium text-pure-white">
                          Recommended for Most Patients
                        </span>
                      )}
                      <h3 className="mb-2 font-display text-2xl font-bold text-rich-black">
                        {option.name}
                      </h3>
                      <p className="mb-4 text-4xl font-bold text-warm-stone">{option.price}</p>
                      <p className="mb-6 text-sm text-warm-gray">{option.description}</p>
                      <ul className="space-y-3">
                        {option.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-3 text-sm text-warm-gray">
                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-warm-stone/10">
                              <Check className="h-3 w-3 text-warm-stone" />
                            </div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </Card>
                  </motion.div>
                ))}
              </div>
              <p className="mt-6 text-center text-sm text-warm-gray">
                Note: Medication pricing is the same regardless of consultation type. Most patients do not require a live consultation.
              </p>
            </div>
          </div>
        </section>

        {/* Treatment Pricing */}
        <section className="relative py-20">
          <div className="absolute inset-0 bg-gradient-to-b from-warm-stone/5 via-transparent to-warm-stone/5" />
          <div className="container relative px-4 md:px-6">
            <div className="mx-auto max-w-4xl">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-8 text-center font-display text-3xl font-bold text-rich-black"
              >
                Treatment Pricing
              </motion.h2>
              <div className="grid gap-4 md:grid-cols-2">
                {treatments.map((treatment, index) => (
                  <motion.div
                    key={treatment.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card variant="glass" className="flex items-center justify-between p-6">
                      <div>
                        <h3 className="font-display text-lg font-bold text-rich-black">{treatment.name}</h3>
                        <p className="text-sm text-warm-gray">{treatment.description}</p>
                      </div>
                      <p className="text-xl font-bold text-warm-stone">{treatment.price}</p>
                    </Card>
                  </motion.div>
                ))}
              </div>
              <p className="mt-6 text-center text-sm text-warm-gray">
                Note: Final pricing varies based on medication, dosage, and clinical appropriateness. Pricing may adjust with dosage changes.
              </p>
            </div>
          </div>
        </section>

        {/* Treatment Comparison Table */}
        <TreatmentComparisonTable />

        {/* What's Included */}
        <section className="py-20">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-4xl">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-8 text-center font-display text-3xl font-bold text-rich-black"
              >
                Every Elevare Patient Gets
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Card variant="glass" className="p-8">
                  <div className="grid gap-4 md:grid-cols-2">
                    {included.map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-warm-stone/10">
                          <Check className="h-3 w-3 text-warm-stone" />
                        </div>
                        <span className="text-warm-gray">{item}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-20">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-warm-stone/5" />
          <div className="container relative px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card variant="glassDark" className="mx-auto max-w-2xl p-8 text-center md:p-12">
                <h2 className="mb-4 font-display text-3xl font-bold text-pure-white">Ready to Get Started?</h2>
                <p className="mb-8 text-pure-white/70">
                  Take the first step toward feeling like yourself again. Your card is only charged if you're approved.
                </p>
                <Link to="/intake">
                  <Button size="lg" className="bg-warm-stone hover:bg-warm-stone/90 text-pure-white">
                    Start Your Free Assessment
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </Card>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PricingPage;
