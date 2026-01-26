import { motion } from "framer-motion";
import { ClipboardList, UserCheck, Video, Truck, MessageSquare, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const steps = [
  {
    icon: ClipboardList,
    number: "01",
    title: "Start Your Assessment",
    description: "Click \"Get Started\" and complete our secure health assessment. You'll answer questions about your symptoms, health history, and goals. The entire process takes about 5 minutes and can be done from your phone, tablet, or computer.",
    highlight: "5-minute form",
  },
  {
    icon: UserCheck,
    number: "02",
    title: "Physician Review",
    description: "A Texas-licensed, board-certified physician reviews your complete health profile. If you're a good candidate for treatment, they'll create a personalized protocol based on your specific needs. Most patients receive their treatment plan within 24 hours.",
    highlight: "24hr response",
  },
  {
    icon: Video,
    number: "03",
    title: "Optional Consultation ($99)",
    description: "Prefer to speak directly with your physician? Book a 30-minute video consultation. This option is ideal for patients with complex health histories or those who simply prefer face-to-face discussion.",
    highlight: "Optional",
  },
  {
    icon: Truck,
    number: "04",
    title: "Treatment Delivered",
    description: "Once approved, your prescription is filled by our FDA-regulated pharmacy partner and shipped directly to your home or office in discreet, unmarked packaging. Most shipments arrive within 3-5 business days.",
    highlight: "3-5 day shipping",
  },
  {
    icon: MessageSquare,
    number: "05",
    title: "Ongoing Support",
    description: "Your care doesn't end when your medication arrives. You have unlimited secure messaging access to your care team for questions, adjustments, or concerns. We monitor your progress and adjust your protocol as needed.",
    highlight: "Unlimited messaging",
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
            Premium Care. Zero Friction.
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
            Three steps to feeling like yourself again. No waiting rooms. No awkward conversations. Just results.
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
                transition={{ delay: index * 0.15 }}
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
            Your card is only charged if you're approved for treatment.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to="/intake">
              <Button size="lg" className="bg-primary hover:bg-primary-dark">
                Start Your Free Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline">
              Book Video Consultation - $99
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
