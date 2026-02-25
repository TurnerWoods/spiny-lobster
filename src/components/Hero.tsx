import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Award, CheckCircle2, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import heroProductImage from "@/assets/hero-product-vial.png";
import { easing, prefersReducedMotion } from "@/lib/motion";

// Trust badge data for hero
const heroTrustBadges = [
  { icon: Award, label: "US-Licensed Physicians" },
  { icon: CheckCircle2, label: "FDA-Approved Medications" },
  { icon: Shield, label: "HIPAA Compliant" },
  { icon: Truck, label: "Free Shipping" },
];

// Premium easing curve - smooth, refined, no bounce
const premiumEase = [0.16, 1, 0.3, 1] as const;

// Check for reduced motion preference
const useReducedMotion = () => {
  const [shouldReduceMotion, setShouldReduceMotion] = useState(prefersReducedMotion);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => setShouldReduceMotion(mediaQuery.matches);

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
    } else {
      mediaQuery.addListener?.(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleChange);
      } else {
        mediaQuery.removeListener?.(handleChange);
      }
    };
  }, []);

  return shouldReduceMotion;
};

const Hero = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const img = new Image();
    img.src = heroProductImage;
    img.onload = () => setImageLoaded(true);
  }, []);

  // Orchestrated stagger animation for hero content
  // Simplified animations when reduced motion is preferred
  const contentContainer = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: shouldReduceMotion
        ? { duration: 0.01 }
        : {
            staggerChildren: 0.15,
            delayChildren: 0.2,
          },
    },
  }), [shouldReduceMotion]);

  const contentItem = useMemo(() => ({
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.8,
        ease: premiumEase,
      },
    },
  }), [shouldReduceMotion]);

  // Trust indicators stagger
  const trustContainer = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: shouldReduceMotion
        ? { duration: 0.01 }
        : {
            staggerChildren: 0.1,
            delayChildren: 0.8,
          },
    },
  }), [shouldReduceMotion]);

  const trustItem = useMemo(() => ({
    hidden: { opacity: 0, x: shouldReduceMotion ? 0 : -12 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.5,
        ease: easing.smooth,
      },
    },
  }), [shouldReduceMotion]);

  return (
    <section className="relative min-h-[100dvh] overflow-hidden">
      {/* Background with Product Image */}
      <div className="absolute inset-0 z-0">
        {/* Base gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-deep-charcoal to-[#2a2520]" />

        {/* Product Image - hidden on very small screens, fades in on larger */}
        <div className="absolute inset-0 flex items-center justify-end">
          <motion.div
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: imageLoaded ? 0.9 : 0, scale: 1 }}
            transition={{
              duration: 1.4,
              ease: premiumEase,
            }}
            className="relative h-full w-full hidden xs:block xs:w-2/3 sm:w-3/4 md:w-3/4 lg:w-2/3"
          >
            <img
              src={heroProductImage}
              alt="Premium testosterone therapy vial"
              loading="eager"
              className="h-full w-full max-w-full object-cover object-center"
              style={{
                maskImage: 'linear-gradient(to left, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 90%)',
                WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 90%)'
              }}
            />
          </motion.div>
        </div>

        {/* Gradient overlay for text readability - stronger on mobile */}
        <div className="absolute inset-0 bg-gradient-to-r from-deep-charcoal via-deep-charcoal/95 to-deep-charcoal/60 xs:via-deep-charcoal/90 xs:to-transparent" />
      </div>

      <div className="container relative z-10 flex min-h-[100dvh] items-center px-4 sm:px-6">
        <motion.div
          className="w-full max-w-xl py-20 xs:py-24 sm:py-28 md:py-32 lg:max-w-2xl"
          variants={contentContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Minimal eyebrow text */}
          <motion.div variants={contentItem} className="mb-4 xs:mb-6 sm:mb-8">
            <span className="text-label text-soft-linen/60 text-[10px] xs:text-[11px] sm:text-xs">
              Physician-Prescribed Therapy
            </span>
          </motion.div>

          {/* Main Headline - Mobile-first responsive Typography */}
          <motion.h1
            variants={contentItem}
            className="mb-4 xs:mb-6 sm:mb-8 font-display text-[2.5rem] xs:text-5xl font-light leading-[1.1] tracking-tighter text-soft-linen sm:text-6xl md:text-7xl lg:text-8xl"
          >
            Reclaim
            <br />
            Your Edge
          </motion.h1>

          {/* Subtitle - Responsive text size */}
          <motion.p
            variants={contentItem}
            className="text-base xs:text-lg mb-8 xs:mb-10 sm:mb-12 max-w-md text-soft-linen/70 leading-relaxed"
          >
            Premium testosterone therapy and men's health optimization.
            Delivered discreetly to your door.
          </motion.p>

          {/* Single elegant CTA - Full width on mobile */}
          <motion.div
            variants={contentItem}
            className="flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <Link to="/intake" className="w-full sm:w-auto">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2, ease: easing.smooth }}
              >
                <Button
                  size="xl"
                  variant="premium"
                  className="group w-full min-h-[52px] px-6 xs:px-8 sm:w-auto sm:px-10 uppercase tracking-[0.1em] xs:tracking-[0.15em] text-sm xs:text-base"
                >
                  Begin Assessment
                  <ArrowRight className="ml-2 xs:ml-3 h-4 w-4 xs:h-5 xs:w-5 transition-transform duration-300 ease-out group-hover:translate-x-1" />
                </Button>
              </motion.div>
            </Link>
          </motion.div>

          {/* Enhanced Trust Badges - 2-column grid on mobile, inline on larger */}
          <motion.div
            variants={trustContainer}
            initial="hidden"
            animate="visible"
            className="mt-8 xs:mt-10 sm:mt-16 grid grid-cols-2 gap-2 xs:gap-3 sm:flex sm:flex-wrap sm:items-center sm:gap-6"
          >
            {heroTrustBadges.map((badge, index) => (
              <motion.div
                key={badge.label}
                variants={trustItem}
                className="flex items-center gap-1.5 xs:gap-2 text-soft-linen/50"
              >
                <badge.icon className="h-3.5 w-3.5 xs:h-4 xs:w-4 flex-shrink-0" strokeWidth={1.5} />
                <span className="text-[9px] xs:text-[10px] sm:text-xs font-light uppercase tracking-[0.08em] xs:tracking-[0.1em] sm:tracking-[0.15em] leading-tight">
                  {badge.label}
                </span>
                {index < heroTrustBadges.length - 1 && (
                  <span className="ml-2 hidden h-px w-6 bg-soft-linen/20 sm:ml-4 sm:block sm:w-8" />
                )}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator - hidden on small mobile, visible on larger screens */}
      {/* Disabled when reduced motion is preferred */}
      {!shouldReduceMotion && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2, ease: easing.smooth }}
          className="absolute bottom-6 xs:bottom-8 sm:bottom-12 left-1/2 z-10 -translate-x-1/2 hidden xs:block"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex flex-col items-center gap-2 will-change-transform"
          >
            <span className="text-[10px] font-light uppercase tracking-[0.2em] xs:tracking-[0.3em] text-soft-linen/40">
              Scroll
            </span>
            <div className="h-6 xs:h-8 w-px bg-gradient-to-b from-soft-linen/40 to-transparent" />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default Hero;
