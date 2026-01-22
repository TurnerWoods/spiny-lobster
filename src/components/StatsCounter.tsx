import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Stat {
  value: string;
  suffix: string;
  label: string;
  numericValue: number;
}

const stats: Stat[] = [
  { value: "95", suffix: "%", label: "Patient Satisfaction", numericValue: 95 },
  { value: "10,000", suffix: "+", label: "Patients Treated", numericValue: 10000 },
  { value: "48", suffix: "hr", label: "Average Approval", numericValue: 48 },
  { value: "50", suffix: "", label: "States Served", numericValue: 50 },
];

const AnimatedNumber = ({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) => {
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

  return (
    <span className="font-display text-4xl font-bold text-primary md:text-5xl">
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
      className="mt-16 grid grid-cols-2 gap-8 rounded-2xl border bg-card p-8 shadow-lg md:grid-cols-4"
    >
      {stats.map((stat, index) => (
        <div key={index} className="text-center">
          <AnimatedNumber value={stat.numericValue} suffix={stat.suffix} inView={isInView} />
          <p className="mt-2 text-sm font-medium text-muted-foreground">{stat.label}</p>
        </div>
      ))}
    </motion.div>
  );
};

export default StatsCounter;