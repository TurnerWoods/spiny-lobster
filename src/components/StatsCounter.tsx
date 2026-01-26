import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

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

const AnimatedNumber = ({ value, suffix, inView, isRange }: { value: number; suffix: string; inView: boolean; isRange?: boolean }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value, inView]);

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return num.toLocaleString();
    }
    return num.toString();
  };

  // Special handling for range values like "3-5"
  if (isRange) {
    return (
      <span className="font-display text-2xl font-bold text-white sm:text-3xl md:text-4xl">
        3-5{suffix}
      </span>
    );
  }

  return (
    <span className="font-display text-2xl font-bold text-white sm:text-3xl md:text-4xl">
      {formatNumber(displayValue)}{suffix}
    </span>
  );
};

const StatsCounter = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="mt-12 grid grid-cols-2 gap-4 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md sm:mt-16 sm:gap-6 sm:p-6 md:grid-cols-4 md:gap-8 md:p-8"
    >
      {stats.map((stat, index) => (
        <div key={index} className="text-center">
          <AnimatedNumber 
            value={stat.numericValue} 
            suffix={stat.suffix} 
            inView={isInView} 
            isRange={stat.value.includes("-")}
          />
          <p className="mt-1 text-xs font-medium text-white/70 sm:mt-2 sm:text-sm">{stat.label}</p>
        </div>
      ))}
    </motion.div>
  );
};

export default StatsCounter;
