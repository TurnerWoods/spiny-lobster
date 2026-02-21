import { useState, useEffect, useCallback, useMemo, memo } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { easing, duration, prefersReducedMotion } from "@/lib/motion";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldReduceMotion, setShouldReduceMotion] = useState(prefersReducedMotion);

  // Check for reduced motion preference
  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setShouldReduceMotion(motionQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) =>
      setShouldReduceMotion(e.matches);

    motionQuery.addEventListener?.("change", handleMotionChange) ||
      motionQuery.addListener?.(handleMotionChange);

    return () => {
      motionQuery.removeEventListener?.("change", handleMotionChange) ||
        motionQuery.removeListener?.(handleMotionChange);
    };
  }, []);

  // Throttled scroll handler using requestAnimationFrame for better mobile performance
  useEffect(() => {
    let ticking = false;

    const toggleVisibility = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsVisible(window.scrollY > 400);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: shouldReduceMotion ? "auto" : "smooth",
    });
  }, [shouldReduceMotion]);

  // Premium entrance/exit animation - simplified when reduced motion is preferred
  const buttonVariants = useMemo(() => ({
    initial: {
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 0.9,
      y: shouldReduceMotion ? 0 : 8,
    },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : duration.normal,
        ease: easing.entrance,
      },
    },
    exit: {
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 0.9,
      y: shouldReduceMotion ? 0 : 8,
      transition: {
        duration: shouldReduceMotion ? 0.01 : duration.fast,
        ease: easing.exit,
      },
    },
  }), [shouldReduceMotion]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          variants={buttonVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="fixed bottom-24 left-6 z-40 md:bottom-8 md:left-8 will-change-transform"
        >
          <motion.div
            whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
            transition={{ duration: duration.fast, ease: easing.smooth }}
          >
            <Button
              onClick={scrollToTop}
              size="icon"
              className="h-12 w-12 rounded-full bg-primary shadow-lg transition-shadow duration-300 hover:bg-primary-dark hover:shadow-xl touch-target gpu-accelerated"
              aria-label="Scroll to top"
            >
              <ArrowUp className="h-5 w-5" />
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default memo(ScrollToTop);
