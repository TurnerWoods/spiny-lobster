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
    name: "Video Consultation",
    recommended: false,
    price: "$99",
    description: "30-minute 1-on-1 video visit with licensed physician",
  },
];

const treatments = [
  { name: "Testosterone Cypionate", price: "$149/mo" },
  { name: "Sermorelin", price: "$199/mo" },
  { name: "Tesamorelin", price: "$199/mo" },
  { name: "NAD+", price: "$199/mo" },
];

const included = [
  "Medication from licensed U.S. pharmacies",
  "Personalized treatment plan",
  "Unlimited secure messaging",
  "Ongoing monitoring",
  "Discreet shipping",
  "No contracts",
];

const PricingComparison = () => {
  return (
    <section id="pricing" className="bg-muted/30 py-12 sm:py-16 md:py-20">
      <div className="container px-4 md:px-6">
        {/* Section Header */}
        <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-12">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-3 inline-block rounded-full bg-primary-light px-3 py-1 text-xs font-medium text-primary sm:mb-4 sm:px-4 sm:text-sm"
          >
            Transparent Pricing
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-3 font-display text-2xl font-bold text-foreground sm:mb-4 sm:text-3xl md:text-4xl"
          >
            Clear Pricing. No Surprises.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="px-2 text-base text-muted-foreground sm:px-0 sm:text-lg"
          >
            One monthly price covers medication, pharmacy, and unlimited care team access.
          </motion.p>
        </div>

        {/* Consultation Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-8 grid max-w-3xl gap-4 sm:mb-12 sm:grid-cols-2 sm:gap-6"
        >
          {consultationOptions.map((option) => (
            <div
              key={option.name}
              className={`relative rounded-xl border p-4 sm:rounded-2xl sm:p-6 ${
                option.recommended ? "border-primary bg-primary/5" : "bg-card"
              }`}
            >
              {option.recommended && (
                <span className="absolute -top-2.5 left-4 rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-medium text-primary-foreground sm:-top-3 sm:left-6 sm:px-3 sm:py-1 sm:text-xs">
                  Recommended
                </span>
              )}
              <h3 className="mb-1 font-display text-lg font-bold text-foreground sm:mb-2 sm:text-xl">
                {option.name}
              </h3>
              <p className="mb-2 text-2xl font-bold text-primary sm:mb-4 sm:text-3xl">{option.price}</p>
              <p className="text-xs text-muted-foreground sm:text-sm">{option.description}</p>
            </div>
          ))}
        </motion.div>

        {/* Treatment Pricing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-8 max-w-3xl sm:mb-12"
        >
          <h3 className="mb-4 text-center font-display text-xl font-bold text-foreground sm:mb-6 sm:text-2xl">
            Treatment Pricing
          </h3>
          <div className="overflow-hidden rounded-xl border bg-card shadow-sm sm:rounded-2xl">
            <div className="grid grid-cols-2 gap-2 border-b bg-muted/50 p-3 text-xs font-semibold sm:gap-4 sm:p-4 sm:text-sm">
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
                  className="grid grid-cols-2 gap-2 p-3 text-sm transition-colors hover:bg-muted/30 sm:gap-4 sm:p-4"
                >
                  <div className="font-medium text-foreground">{treatment.name}</div>
                  <div className="text-right font-semibold text-primary">{treatment.price}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* What's Included */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-8 max-w-3xl sm:mb-12"
        >
          <h3 className="mb-4 text-center font-display text-xl font-bold text-foreground sm:mb-6 sm:text-2xl">
            What's Included
          </h3>
          <div className="rounded-xl border bg-card p-4 shadow-sm sm:rounded-2xl sm:p-6">
            <div className="grid gap-2 sm:grid-cols-2 sm:gap-4">
              {included.map((item, index) => (
                <div key={index} className="flex items-center gap-2 sm:gap-3">
                  <Check className="h-4 w-4 flex-shrink-0 text-primary sm:h-5 sm:w-5" />
                  <span className="text-sm text-muted-foreground">{item}</span>
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
          <Link to="/intake" className="inline-block w-full sm:w-auto">
            <Button size="lg" className="w-full bg-primary hover:bg-primary-dark sm:w-auto">
              Start Your Free Assessment
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingComparison;
