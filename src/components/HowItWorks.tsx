import { motion } from "framer-motion";
import { ClipboardList, UserCheck, Video, Truck, MessageSquare, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const steps = [
  {
    icon: ClipboardList,
    number: "01",
    title: "Complete Assessment",
    description: "Answer questions about your symptoms, health history, and goals. Takes about 5 minutes from any device.",
    highlight: "5-minute form",
  },
  {
    icon: UserCheck,
    number: "02",
    title: "Physician Review",
    description: "A Texas-licensed physician reviews your profile and creates a personalized treatment plan within 24 hours.",
    highlight: "24hr response",
  },
  {
    icon: Truck,
    number: "03",
    title: "Discreet Delivery",
    description: "Your prescription ships in unmarked packaging directly to your home or office within 3-5 business days.",
    highlight: "3-5 day shipping",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-12 sm:py-16 md:py-20">
      <div className="container px-4 md:px-6">
        {/* Section Header */}
        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-3 inline-block rounded-full border border-warm-stone/20 bg-warm-stone/10 px-3 py-1 text-xs font-medium text-warm-stone sm:mb-4 sm:px-4 sm:text-sm"
          >
            Premium Care. Zero Friction.
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-3 font-display text-2xl font-bold text-foreground sm:mb-4 sm:text-3xl md:text-4xl"
          >
            How It Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base text-muted-foreground sm:text-lg"
          >
            Three steps to feeling like yourself again. No waiting rooms.
          </motion.p>
        </div>

        {/* Steps - Mobile Vertical / Desktop Horizontal */}
        <div className="relative mx-auto max-w-4xl">
          {/* Connection Line - Desktop Only */}
          <div className="absolute left-0 right-0 top-10 hidden h-0.5 bg-gradient-to-r from-primary/30 via-primary to-primary/30 lg:block" />

          <div className="grid gap-6 sm:gap-8 lg:grid-cols-3 lg:gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="flex flex-col items-center text-center"
              >
              {/* Icon Circle */}
                <div className="relative z-10 mb-4 flex h-16 w-16 items-center justify-center rounded-full border-4 border-soft-linen bg-warm-stone shadow-lg sm:mb-6 sm:h-20 sm:w-20">
                  <step.icon className="h-6 w-6 text-pure-white sm:h-8 sm:w-8" />
                </div>

                {/* Content Card - Glassmorphic */}
                <div className="rounded-xl border border-neutral-gray/50 bg-pure-white/80 p-4 shadow-md backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:border-warm-stone/30 sm:rounded-2xl sm:p-6">
                  <span className="mb-1 block text-xs font-bold text-warm-stone sm:mb-2 sm:text-sm">
                    Step {step.number}
                  </span>
                  <h3 className="mb-2 font-display text-lg font-bold text-rich-black sm:mb-3 sm:text-xl">
                    {step.title}
                  </h3>
                  <p className="mb-3 text-sm text-muted-foreground sm:mb-4">{step.description}</p>
                  <span className="inline-flex items-center rounded-full border border-light-cloud bg-light-cloud/50 px-2.5 py-0.5 text-xs font-medium text-deep-charcoal sm:px-3 sm:py-1">
                    {step.highlight}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 text-center sm:mt-16"
        >
          <p className="mb-3 text-sm text-muted-foreground sm:mb-4">
            Your card is only charged if you're approved.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link to="/intake" className="w-full sm:w-auto">
              <Button size="lg" className="w-full bg-primary hover:bg-primary-dark sm:w-auto">
                Start Free Assessment
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              Video Consultation - $99
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
