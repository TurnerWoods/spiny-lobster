import { useEffect, useState, useRef, useCallback, memo, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { easing, duration, prefersReducedMotion } from "@/lib/motion";

// Premium easing
const premiumEase = [0.16, 1, 0.3, 1] as const;

// Check for reduced motion preference
const usePrefersReducedMotion = () => {
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

interface Stat {
  value: string;
  suffix: string;
  label: string;
  numericValue: number;
}

const stats: Stat[] = [
  { value: "98", suffix: "%", label: "Patient Satisfaction", numericValue: 98 },
  { value: "24", suffix: "hr", label: "Physician Response", numericValue: 24 },
  { value: "3-5", suffix: " days", label: "Shipping Time", numericValue: 3 },
  { value: "3", suffix: "", label: "Texas Markets", numericValue: 3 },
];

// Easing function for smoother counting (ease-out quart)
const easeOutQuart = (t: number): number => {
  return 1 - Math.pow(1 - t, 4);
};

const AnimatedNumber = memo(({
  value,
  suffix,
  inView,
  isRange,
  delay = 0,
  reduceMotion = false
}: {
  value: number;
  suffix: string;
  inView: boolean;
  isRange?: boolean;
  delay?: number;
  reduceMotion?: boolean;
}) => {
  const [displayValue, setDisplayValue] = useState(reduceMotion ? value : 0);

  useEffect(() => {
    // Skip animation if reduced motion is preferred
    if (!inView || reduceMotion) {
      setDisplayValue(value);
      return;
    }

    const animationDuration = 1800; // Slightly faster for sophistication
    const startTime = performance.now() + delay;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;

      if (elapsed < 0) {
        animationFrame = requestAnimationFrame(animate);
        return;
      }

      const progress = Math.min(elapsed / animationDuration, 1);
      const easedProgress = easeOutQuart(progress);
      const currentValue = Math.floor(easedProgress * value);

      setDisplayValue(currentValue);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [value, inView, delay, reduceMotion]);

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return num.toLocaleString();
    }
    return num.toString();
  };

  // Special handling for range values like "3-5"
  if (isRange) {
    return (
      <span className="font-display text-2xl font-bold text-pure-white sm:text-3xl md:text-4xl">
        3-5{suffix}
      </span>
    );
  }

  return (
    <span className="font-display text-2xl font-bold text-pure-white sm:text-3xl md:text-4xl">
      {formatNumber(displayValue)}{suffix}
    </span>
  );
});

AnimatedNumber.displayName = "AnimatedNumber";

// Stat item animation
const statItemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.normal,
      delay: index * 0.1,
      ease: easing.entrance,
    },
  }),
};

const StatsCounter = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const reduceMotion = usePrefersReducedMotion();

  // Memoize animation variants based on reduced motion preference
  const containerAnimation = useMemo(() => ({
    initial: { opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 32 },
    animate: isInView ? { opacity: 1, y: 0 } : {},
    transition: { duration: reduceMotion ? 0.01 : duration.slower, delay: reduceMotion ? 0 : 0.4, ease: premiumEase }
  }), [isInView, reduceMotion]);

  return (
    <motion.div
      ref={ref}
      initial={containerAnimation.initial}
      animate={containerAnimation.animate}
      transition={containerAnimation.transition}
      className="mt-12 grid grid-cols-2 gap-4 rounded-2xl border border-pure-white/20 bg-pure-white/20 p-4 shadow-xl backdrop-blur-lg sm:mt-16 sm:gap-6 sm:p-6 md:grid-cols-4 md:gap-8 md:p-8 contain-paint"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          custom={index}
          variants={statItemVariants}
          initial={reduceMotion ? "visible" : "hidden"}
          animate={isInView ? "visible" : "hidden"}
          className="text-center"
        >
          <AnimatedNumber
            value={stat.numericValue}
            suffix={stat.suffix}
            inView={isInView}
            isRange={stat.value.includes("-")}
            delay={reduceMotion ? 0 : index * 100}
            reduceMotion={reduceMotion}
          />
          <p className="mt-1 text-xs font-medium text-pure-white/90 sm:mt-2 sm:text-sm">{stat.label}</p>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default memo(StatsCounter);
