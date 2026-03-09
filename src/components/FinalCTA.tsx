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
    <section className="relative overflow-hidden bg-deep-charcoal py-16 xs:py-20 sm:py-28 md:py-40 lg:py-48">
      {/* Subtle gradient accent */}
      <div className="absolute inset-0">
        <div className="absolute -left-1/4 top-0 h-full w-1/2 bg-gradient-to-r from-warm-stone/5 to-transparent" />
        <div className="absolute bottom-0 right-0 h-1/2 w-1/3 bg-gradient-to-t from-warm-stone/5 to-transparent" />
      </div>

      <div className="container relative z-10 px-5 sm:px-6 md:px-6">
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
            className="mb-5 font-display text-[1.75rem] font-light leading-[1.2] tracking-tight text-soft-linen xs:text-3xl xs:mb-6 sm:text-4xl sm:mb-8 md:text-5xl lg:text-6xl"
          >
            Ready to feel like
            <br />
            yourself again?
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            variants={contentItem}
            className="text-[15px] leading-relaxed mx-auto mb-8 max-w-md text-soft-linen/80 sm:text-base sm:mb-10 md:text-lg md:mb-12"
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
                  className="group w-full min-h-[56px] px-8 text-[15px] sm:min-h-[52px] sm:w-auto sm:px-12 uppercase tracking-[0.1em] sm:tracking-[0.15em] sm:text-base"
                >
                  Begin Assessment
                  <ArrowRight className="ml-3 h-5 w-5 transition-transform duration-300 ease-out group-hover:translate-x-1 sm:h-4 sm:w-4" />
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
            className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-6 md:mt-12"
          >
            {ctaTrustBadges.map((badge, index) => (
              <motion.div
                key={badge.label}
                variants={trustItem}
                className="flex items-center justify-center gap-2 text-soft-linen/70 sm:justify-start min-h-[44px]"
              >
                <badge.icon className="h-4 w-4 flex-shrink-0 sm:h-4 sm:w-4" strokeWidth={1.5} />
                <span className="text-[13px] font-light uppercase tracking-[0.08em] sm:text-xs sm:tracking-[0.15em] leading-tight">
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
