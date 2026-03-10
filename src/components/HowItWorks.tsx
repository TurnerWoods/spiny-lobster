import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { easing, duration, viewportSettings } from "@/lib/motion";

// Premium easing
const premiumEase = [0.16, 1, 0.3, 1] as const;

const steps = [
  {
    number: "01",
    title: "Assessment",
    description: "Complete a brief health questionnaire from any device. Takes approximately five minutes.",
  },
  {
    number: "02",
    title: "Physician Review",
    description: "A licensed physician reviews your profile and creates a personalized treatment plan within 24 hours.",
  },
  {
    number: "03",
    title: "Delivery",
    description: "Your prescription ships in discreet packaging directly to your door within 3-5 business days.",
  },
];

// Orchestrated header animation
const headerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const headerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.slower,
      ease: premiumEase,
    },
  },
};

// Step card animation with custom index-based delay
const stepVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.slower,
      delay: index * 0.12,
      ease: premiumEase,
    },
  }),
};

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="bg-deep-charcoal py-16 xs:py-20 sm:py-28 md:py-36 lg:py-40">
      <div className="container px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          className="mb-12 xs:mb-16 sm:mb-20 md:mb-24 max-w-xl"
        >
          <motion.span
            variants={headerItem}
            className="text-overline mb-4 xs:mb-5 sm:mb-6 block text-soft-linen/90 text-xs"
          >
            The Process
          </motion.span>
          <motion.h2
            variants={headerItem}
            className="font-display text-[1.625rem] xs:text-3xl sm:text-4xl md:text-5xl font-light leading-[1.15] tracking-tight text-soft-linen"
          >
            Three steps to
            <br />
            feeling yourself again
          </motion.h2>
        </motion.div>

        {/* Steps */}
        <div className="grid gap-10 xs:gap-12 sm:gap-16 md:gap-20 lg:grid-cols-3 lg:gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              custom={index}
              variants={stepVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="relative"
            >
              {/* Step number */}
              <motion.span
                className="text-stat mb-4 xs:mb-5 sm:mb-6 md:mb-8 block text-5xl xs:text-6xl text-soft-linen/60 sm:text-7xl"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: duration.slow,
                  delay: index * 0.12 + 0.1,
                  ease: easing.entrance,
                }}
              >
                {step.number}
              </motion.span>

              {/* Content */}
              <h3 className="mb-3 xs:mb-4 font-display text-xl xs:text-2xl font-normal tracking-normal text-soft-linen/95">
                {step.title}
              </h3>
              <p className="text-sm xs:text-base leading-relaxed text-soft-linen/80">
                {step.description}
              </p>

              {/* Connector line for desktop - animated */}
              {index < steps.length - 1 && (
                <motion.div
                  className="absolute right-0 top-12 hidden h-px w-12 bg-gradient-to-r from-warm-stone/30 to-transparent lg:block"
                  initial={{ scaleX: 0, originX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: duration.slow,
                    delay: index * 0.12 + 0.3,
                    ease: easing.smooth,
                  }}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA - Full width on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: duration.slower, delay: 0.3, ease: premiumEase }}
          className="mt-12 xs:mt-16 sm:mt-20 md:mt-24"
        >
          <Link to="/intake" className="block w-full sm:inline-block sm:w-auto">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: duration.fast, ease: easing.smooth }}
            >
              <Button
                size="xl"
                variant="premium"
                className="group w-full min-h-[52px] px-6 sm:w-auto sm:px-10 uppercase tracking-[0.1em] sm:tracking-[0.15em]"
              >
                Begin Your Assessment
                <ArrowRight className="ml-3 transition-transform duration-300 ease-out group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </Link>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: duration.normal, delay: 0.5, ease: easing.smooth }}
            className="text-caption mt-6 text-soft-linen/75"
          >
            No charge unless approved
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
