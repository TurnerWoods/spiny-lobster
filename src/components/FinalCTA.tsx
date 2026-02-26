import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Award, CheckCircle2, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import { easing, duration, viewportSettings } from "@/lib/motion";

// Trust badges for CTA
const ctaTrustBadges = [
  { icon: Award, label: "US-Licensed Physicians" },
  { icon: CheckCircle2, label: "FDA-Registered" },
  { icon: Shield, label: "HIPAA Compliant" },
  { icon: Truck, label: "Discreet Shipping" },
];

// Premium easing
const premiumEase = [0.16, 1, 0.3, 1] as const;

// Orchestrated content animation
const contentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const contentItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.slower,
      ease: premiumEase,
    },
  },
};

// Trust indicators animation
const trustVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const trustItem = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: duration.normal,
      ease: easing.smooth,
    },
  },
};

const FinalCTA = () => {
  return (
    <section className="relative overflow-hidden bg-deep-charcoal py-20 xs:py-24 sm:py-32 md:py-40 lg:py-48">
      {/* Subtle gradient accent */}
      <div className="absolute inset-0">
        <div className="absolute -left-1/4 top-0 h-full w-1/2 bg-gradient-to-r from-warm-stone/5 to-transparent" />
        <div className="absolute bottom-0 right-0 h-1/2 w-1/3 bg-gradient-to-t from-warm-stone/5 to-transparent" />
      </div>

      <div className="container relative z-10 px-4 md:px-6">
        <motion.div
          variants={contentVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          className="mx-auto max-w-2xl text-center"
        >
          {/* Headline - Mobile-optimized typography */}
          <motion.h2
            variants={contentItem}
            className="mb-6 sm:mb-8 font-display text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-light leading-tight tracking-tight text-soft-linen"
          >
            Ready to feel like
            <br />
            yourself again?
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            variants={contentItem}
            className="text-base sm:text-lg mx-auto mb-8 sm:mb-12 max-w-md text-soft-linen/60 leading-relaxed"
          >
            Start your assessment today. Takes five minutes. Completely confidential.
          </motion.p>

          {/* CTA - Full width on mobile, auto on larger screens */}
          <motion.div variants={contentItem}>
            <Link to="/intake" className="block w-full sm:inline-block sm:w-auto">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: duration.fast, ease: easing.smooth }}
              >
                <Button
                  size="xl"
                  variant="premium"
                  className="group w-full min-h-[52px] px-8 sm:w-auto sm:px-12 uppercase tracking-[0.1em] sm:tracking-[0.15em]"
                >
                  Begin Assessment
                  <ArrowRight className="ml-3 transition-transform duration-300 ease-out group-hover:translate-x-1" />
                </Button>
              </motion.div>
            </Link>
          </motion.div>

          {/* Trust indicators - Grid on mobile, inline on desktop */}
          <motion.div
            variants={trustVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-8 sm:mt-12 grid grid-cols-2 gap-4 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-6"
          >
            {ctaTrustBadges.map((badge, index) => (
              <motion.div
                key={badge.label}
                variants={trustItem}
                className="flex items-center justify-center gap-2 text-soft-linen/40 sm:justify-start"
              >
                <badge.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={1.5} />
                <span className="text-[10px] sm:text-xs font-light uppercase tracking-[0.1em] sm:tracking-[0.15em]">
                  {badge.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
