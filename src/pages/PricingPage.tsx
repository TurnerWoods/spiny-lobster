import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TreatmentComparisonTable from "@/components/TreatmentComparisonTable";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
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
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/10 to-background py-20">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-4 inline-block rounded-full bg-primary-light px-4 py-1 text-sm font-medium text-primary"
              >
                Transparent Pricing
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-6 font-display text-4xl font-bold text-foreground md:text-5xl"
              >
                Clear Pricing. No Surprises.
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-muted-foreground"
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
                className="mb-8 text-center font-display text-3xl font-bold text-foreground"
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
                    className={`relative rounded-2xl border p-8 ${
                      option.recommended ? "border-primary bg-primary/5" : "bg-card"
                    }`}
                  >
                    {option.recommended && (
                      <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                        Recommended for Most Patients
                      </span>
                    )}
                    <h3 className="mb-2 font-display text-2xl font-bold text-foreground">
                      {option.name}
                    </h3>
                    <p className="mb-4 text-4xl font-bold text-primary">{option.price}</p>
                    <p className="mb-6 text-sm text-muted-foreground">{option.description}</p>
                    <ul className="space-y-3">
                      {option.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                          <Check className="h-4 w-4 flex-shrink-0 text-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
              <p className="mt-6 text-center text-sm text-muted-foreground">
                Note: Medication pricing is the same regardless of consultation type. Most patients do not require a live consultation.
              </p>
            </div>
          </div>
        </section>

        {/* Treatment Pricing */}
        <section className="bg-muted/30 py-20">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-4xl">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-8 text-center font-display text-3xl font-bold text-foreground"
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
                    className="flex items-center justify-between rounded-xl border bg-card p-6"
                  >
                    <div>
                      <h3 className="font-display text-lg font-bold text-foreground">{treatment.name}</h3>
                      <p className="text-sm text-muted-foreground">{treatment.description}</p>
                    </div>
                    <p className="text-xl font-bold text-primary">{treatment.price}</p>
                  </motion.div>
                ))}
              </div>
              <p className="mt-6 text-center text-sm text-muted-foreground">
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
                className="mb-8 text-center font-display text-3xl font-bold text-foreground"
              >
                Every Elevare Patient Gets
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-2xl border bg-card p-8"
              >
                <div className="grid gap-4 md:grid-cols-2">
                  {included.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-muted/30 py-20">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mx-auto max-w-2xl text-center"
            >
              <h2 className="mb-4 font-display text-3xl font-bold text-foreground">Ready to Get Started?</h2>
              <p className="mb-8 text-muted-foreground">
                Take the first step toward feeling like yourself again. Your card is only charged if you're approved.
              </p>
              <Link to="/intake">
                <Button size="lg" className="bg-primary hover:bg-primary-dark">
                  Start Your Free Assessment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PricingPage;
