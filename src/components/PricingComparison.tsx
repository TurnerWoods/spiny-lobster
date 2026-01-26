import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const consultationOptions = [
  {
    name: "Online Assessment",
    recommended: true,
    price: "$0",
    description: "Secure online health assessment reviewed by licensed clinician",
  },
  {
    name: "Live Video Consultation",
    recommended: false,
    price: "$99",
    description: "30-minute 1-on-1 video visit with licensed physician",
  },
];

const treatments = [
  { name: "Testosterone Cypionate", price: "$149/month" },
  { name: "Sermorelin", price: "$199/month" },
  { name: "Tesamorelin", price: "$199/month" },
  { name: "NAD+", price: "$199/month" },
];

const included = [
  "Prescribed medication fulfilled by licensed U.S. pharmacies",
  "Personalized treatment plan from a Texas-licensed physician",
  "Unlimited secure messaging with your care team",
  "Ongoing protocol monitoring and adjustments",
  "Discreet shipping to your home or office",
  "No contracts. Cancel anytime.",
];

const PricingComparison = () => {
  return (
    <section id="pricing" className="bg-muted/30 py-20">
      <div className="container px-4 md:px-6">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-4 inline-block rounded-full bg-primary-light px-4 py-1 text-sm font-medium text-primary"
          >
            Transparent Pricing
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 font-display text-3xl font-bold text-foreground md:text-4xl"
          >
            Clear Pricing. No Surprises.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            We believe you shouldn't need a decoder ring to understand healthcare costs. One monthly price covers your medication, pharmacy fulfillment, and unlimited access to your care team.
          </motion.p>
        </div>

        {/* Consultation Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-12 grid max-w-3xl gap-6 md:grid-cols-2"
        >
          {consultationOptions.map((option) => (
            <div
              key={option.name}
              className={`relative rounded-2xl border p-6 ${
                option.recommended ? "border-primary bg-primary/5" : "bg-card"
              }`}
            >
              {option.recommended && (
                <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                  Recommended
                </span>
              )}
              <h3 className="mb-2 font-display text-xl font-bold text-foreground">
                {option.name}
              </h3>
              <p className="mb-4 text-3xl font-bold text-primary">{option.price}</p>
              <p className="text-sm text-muted-foreground">{option.description}</p>
            </div>
          ))}
        </motion.div>

        {/* Treatment Pricing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-12 max-w-3xl"
        >
          <h3 className="mb-6 text-center font-display text-2xl font-bold text-foreground">
            Treatment Pricing
          </h3>
          <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
            <div className="grid grid-cols-2 gap-4 border-b bg-muted/50 p-4 text-sm font-semibold">
              <div className="text-foreground">Treatment</div>
              <div className="text-right text-primary">Starting Price</div>
            </div>
            <div className="divide-y">
              {treatments.map((treatment, index) => (
                <motion.div
                  key={treatment.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="grid grid-cols-2 gap-4 p-4 transition-colors hover:bg-muted/30"
                >
                  <div className="font-medium text-foreground">{treatment.name}</div>
                  <div className="text-right font-semibold text-primary">{treatment.price}</div>
                </motion.div>
              ))}
            </div>
          </div>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Note: Final pricing varies based on medication, dosage, and clinical appropriateness.
          </p>
        </motion.div>

        {/* What's Included */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-12 max-w-3xl"
        >
          <h3 className="mb-6 text-center font-display text-2xl font-bold text-foreground">
            What's Included
          </h3>
          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <div className="grid gap-4 md:grid-cols-2">
              {included.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span className="text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link to="/intake">
            <Button size="lg" className="bg-primary hover:bg-primary-dark">
              Start Your Free Assessment
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingComparison;
