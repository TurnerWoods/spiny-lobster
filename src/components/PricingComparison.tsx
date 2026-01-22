import { motion } from "framer-motion";
import { Check, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const comparisonData = [
  {
    feature: "Initial Consultation",
    pureNova: "FREE",
    competitor: "$150-250",
    savings: "$200+",
  },
  {
    feature: "Monthly TRT",
    pureNova: "$99",
    competitor: "$200-300",
    savings: "50%+",
  },
  {
    feature: "GLP-1/month",
    pureNova: "$199",
    competitor: "$350-500",
    savings: "40%+",
  },
  {
    feature: "Lab Work",
    pureNova: "Included",
    competitor: "$200-400",
    savings: "$300+",
  },
  {
    feature: "Follow-up Visits",
    pureNova: "FREE",
    competitor: "$75-100/visit",
    savings: "$300+/yr",
  },
  {
    feature: "Shipping",
    pureNova: "FREE",
    competitor: "N/A (pickup)",
    savings: "Time",
  },
  {
    feature: "Wait Time",
    pureNova: "Same-day",
    competitor: "3-7 days",
    savings: "Days",
  },
  {
    feature: "First Year Cost",
    pureNova: "$1,188",
    competitor: "$3,000-4,000",
    savings: "~$2,000",
    isTotal: true,
  },
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
            Why Choose PureNovaHealth?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            See how we compare to Austin & Dallas clinics
          </motion.p>
        </div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-4xl overflow-hidden rounded-2xl border bg-card shadow-lg"
        >
          {/* Table Header */}
          <div className="grid grid-cols-4 gap-4 border-b bg-muted/50 p-4 text-center text-sm font-semibold">
            <div className="text-left text-muted-foreground">Feature</div>
            <div className="text-primary">
              <span className="hidden sm:inline">PureNova</span>Health
            </div>
            <div className="text-muted-foreground">Local Clinics</div>
            <div className="text-primary">Your Savings</div>
          </div>

          {/* Table Body */}
          <div className="divide-y">
            {comparisonData.map((row, index) => (
              <motion.div
                key={row.feature}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`grid grid-cols-4 gap-4 p-4 text-center text-sm transition-colors hover:bg-muted/30 ${
                  row.isTotal ? "bg-primary-light/50 font-semibold" : ""
                }`}
              >
                <div className="text-left font-medium text-foreground">{row.feature}</div>
                <div className="flex items-center justify-center gap-1 text-primary">
                  <Check className="h-4 w-4 flex-shrink-0" />
                  <span>{row.pureNova}</span>
                </div>
                <div className="flex items-center justify-center gap-1 text-muted-foreground">
                  <X className="h-4 w-4 flex-shrink-0 text-destructive/60" />
                  <span>{row.competitor}</span>
                </div>
                <div className={`font-semibold ${row.isTotal ? "text-lg" : ""} text-primary`}>
                  {row.savings}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <Button size="lg" className="bg-primary hover:bg-primary-dark">
            Start Free Consultation
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <p className="mt-4 text-xs text-muted-foreground">
            * Based on average Austin/Dallas clinic rates, January 2026
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingComparison;