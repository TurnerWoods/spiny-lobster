import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { easing, duration } from "@/lib/motion";

const symptoms = [
  "weight gain",
  "low energy",
  "brain fog",
  "poor sleep",
  "low libido",
  "muscle loss"
];

// Premium text transition - elegant fade with subtle movement
const textVariants = {
  initial: {
    opacity: 0,
    y: 12,
    filter: "blur(4px)",
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: duration.slow,
      ease: easing.entrance,
    },
  },
  exit: {
    opacity: 0,
    y: -12,
    filter: "blur(4px)",
    transition: {
      duration: duration.normal,
      ease: easing.exit,
    },
  },
};

const AnimatedHeroText = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % symptoms.length);
    }, 3500); // Slightly longer for more elegant pacing
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="relative inline-block min-w-[140px] sm:min-w-[180px] md:min-w-[220px]">
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          variants={textVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="absolute left-0 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
        >
          {symptoms[currentIndex]}
        </motion.span>
      </AnimatePresence>
      {/* Invisible placeholder for height */}
      <span className="invisible">{symptoms[0]}</span>
    </span>
  );
};

export default AnimatedHeroText;