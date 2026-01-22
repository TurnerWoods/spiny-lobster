import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const symptoms = [
  "weight gain",
  "low energy",
  "brain fog",
  "poor sleep",
  "low libido",
  "muscle loss"
];

const AnimatedHeroText = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % symptoms.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="relative inline-block min-w-[180px] sm:min-w-[220px]">
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute left-0 text-primary"
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