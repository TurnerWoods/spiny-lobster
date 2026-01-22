import { motion } from "framer-motion";
import { ClipboardList, UserCheck, Truck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    icon: ClipboardList,
    number: "01",
    title: "Complete Online Intake",
    description: "Answer a few questions about your health goals and medical history. Takes just 5 minutes, all online—no waiting rooms.",
    highlight: "5-minute form",
  },
  {
    icon: UserCheck,
    number: "02",
    title: "Provider Review",
    description: "A board-certified clinician reviews your intake and creates a personalized treatment plan within 24-48 hours.",
    highlight: "24-48hr response",
  },
  {
    icon: Truck,
    number: "03",
    title: "Medication Delivered",
    description: "Your prescription is filled by a licensed US pharmacy and shipped free to your door in discreet packaging.",
    highlight: "Free shipping",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20">
      <div className="container px-4 md:px-6">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-4 inline-block rounded-full bg-primary-light px-4 py-1 text-sm font-medium text-primary"
          >
            Simple Process
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 font-display text-3xl font-bold text-foreground md:text-4xl"
          >
            How It Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            Get started in minutes. Your card is only charged if you're approved.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-primary/50 via-primary to-primary/50 lg:block" />

          <div className="grid gap-12 lg:gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`flex flex-col items-center gap-8 lg:flex-row ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Content Card */}
                <div className="flex-1 lg:text-right lg:[&:nth-child(odd)]:text-left">
                  <div className={`inline-block rounded-2xl border bg-card p-8 shadow-sm ${
                    index % 2 === 1 ? "lg:text-left" : "lg:text-right"
                  }`}>
                    <span className="mb-2 block font-display text-sm font-bold text-primary">
                      Step {step.number}
                    </span>
                    <h3 className="mb-3 font-display text-2xl font-bold text-foreground">
                      {step.title}
                    </h3>
                    <p className="mb-4 text-muted-foreground">{step.description}</p>
                    <span className="inline-flex items-center rounded-full bg-primary-light px-3 py-1 text-sm font-medium text-primary">
                      {step.highlight}
                    </span>
                  </div>
                </div>

                {/* Icon Circle */}
                <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full border-4 border-background bg-primary shadow-lg lg:mx-8">
                  <step.icon className="h-8 w-8 text-primary-foreground" />
                </div>

                {/* Empty space for alternating layout */}
                <div className="hidden flex-1 lg:block" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="mb-4 text-muted-foreground">
            Prefer a live visit? Book a $99 telehealth consult anytime.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="bg-primary hover:bg-primary-dark">
              Start Free Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline">
              Book Telehealth Visit - $99
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;