import { motion } from "framer-motion";
import { Check, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const comparisonData = [
  {
    feature: "Initial Consultation",
    elevare: "Free",
    traditional: "$150-300",
    competitors: "$50-100",
  },
  {
    feature: "Monthly TRT Cost",
    elevare: "$149/mo",
    traditional: "$300-500/mo",
    competitors: "$150-250/mo",
  },
  {
    feature: "Lab Work Included",
    elevare: true,
    traditional: false,
    competitors: "Extra $50-100",
  },
  {
    feature: "Medication Included",
    elevare: true,
    traditional: false,
    competitors: true,
  },
  {
    feature: "Unlimited Messaging",
    elevare: true,
    traditional: false,
    competitors: "Limited",
  },
  {
    feature: "Discreet Home Delivery",
    elevare: true,
    traditional: false,
    competitors: true,
  },
  {
    feature: "No Long-Term Contracts",
    elevare: true,
    traditional: true,
    competitors: false,
  },
  {
    feature: "Licensed TX Physicians",
    elevare: true,
    traditional: true,
    competitors: "Varies",
  },
];

const included = [
  "Medication from licensed U.S. pharmacies",
  "Personalized treatment plan",
  "Unlimited secure messaging",
  "Ongoing monitoring & labs",
  "Discreet shipping",
  "No contracts or hidden fees",
];

const PricingComparison = () => {
  const renderValue = (value: string | boolean) => {
    if (value === true) {
      return <Check className="mx-auto h-5 w-5 text-green-500" />;
    }
    if (value === false) {
      return <X className="mx-auto h-5 w-5 text-red-400" />;
    }
    return <span className="text-sm">{value}</span>;
  };

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
            See How We Compare
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="px-2 text-base text-muted-foreground sm:px-0 sm:text-lg"
          >
            Premium care at a fraction of the cost. No hidden fees, no surprises.
          </motion.p>
        </div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-8 max-w-4xl overflow-hidden rounded-xl border bg-card shadow-sm sm:mb-12 sm:rounded-2xl"
        >
          {/* Table Header */}
          <div className="grid grid-cols-4 gap-2 border-b bg-muted/50 p-3 text-center text-xs font-semibold sm:gap-4 sm:p-4 sm:text-sm">
            <div className="text-left text-foreground">Feature</div>
            <div className="rounded-lg bg-primary/10 py-1 text-primary">Elevare</div>
            <div className="text-muted-foreground">Traditional Clinic</div>
            <div className="text-muted-foreground">Online Competitors</div>
          </div>

          {/* Table Body */}
          <div className="divide-y">
            {comparisonData.map((row, index) => (
              <motion.div
                key={row.feature}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.03 }}
                className="grid grid-cols-4 gap-2 p-3 text-center transition-colors hover:bg-muted/30 sm:gap-4 sm:p-4"
              >
                <div className="text-left text-xs font-medium text-foreground sm:text-sm">
                  {row.feature}
                </div>
                <div className="font-semibold text-primary">
                  {renderValue(row.elevare)}
                </div>
                <div className="text-muted-foreground">
                  {renderValue(row.traditional)}
                </div>
                <div className="text-muted-foreground">
                  {renderValue(row.competitors)}
                </div>
              </motion.div>
            ))}
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
            Everything Included with Elevare
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
