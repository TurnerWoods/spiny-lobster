import { motion, useInView } from "framer-motion";
import { ArrowRight, TrendingUp } from "lucide-react";
import { useEffect, useState, useRef } from "react";

export interface BeforeAfterResult {
  id: string;
  metric: string;
  before: string;
  after: string;
  timeframe: string;
  improvement: string;
  icon?: React.ReactNode;
}

interface BeforeAfterGalleryProps {
  results: BeforeAfterResult[];
  title?: string;
  subtitle?: string;
}

// Animated number component that counts up when in view
const AnimatedValue = ({
  value,
  inView,
  isAfter = false
}: {
  value: string;
  inView: boolean;
  isAfter?: boolean;
}) => {
  const [displayValue, setDisplayValue] = useState(value);

  // Extract numeric part and suffix
  const numericMatch = value.match(/^([\d.]+)/);
  const numericValue = numericMatch ? parseFloat(numericMatch[1]) : null;
  const suffix = numericMatch ? value.replace(numericMatch[1], '') : '';

  useEffect(() => {
    if (!inView || numericValue === null) {
      setDisplayValue(value);
      return;
    }

    // Start from 0 or a lower value
    const startValue = 0;
    const duration = 1500;
    const steps = 40;
    const increment = (numericValue - startValue) / steps;
    let current = startValue;

    // Small delay for "after" values to create sequential effect
    const delay = isAfter ? 600 : 0;

    const timeoutId = setTimeout(() => {
      const timer = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
          setDisplayValue(value);
          clearInterval(timer);
        } else {
          // Handle decimal values
          const displayNum = numericValue % 1 !== 0
            ? current.toFixed(1)
            : Math.floor(current).toString();
          setDisplayValue(displayNum + suffix);
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [value, inView, numericValue, suffix, isAfter]);

  return <>{displayValue}</>;
};

// Individual result card with its own inView tracking
const ResultCard = ({
  result,
  index
}: {
  result: BeforeAfterResult;
  index: number;
}) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        delay: index * 0.1,
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{
        y: -8,
        scale: 1.02,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      className="group relative overflow-hidden rounded-xl border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30"
    >
      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-success/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Metric Label */}
      <div className="relative mb-4 flex items-center justify-between">
        <motion.span
          className="rounded-full bg-primary-light px-3 py-1 text-xs font-medium text-primary"
          whileHover={{ scale: 1.05 }}
        >
          {result.metric}
        </motion.span>
        <span className="text-xs text-muted-foreground">{result.timeframe}</span>
      </div>

      {/* Before/After Values */}
      <div className="relative mb-4 flex items-center justify-between gap-4">
        <div className="flex-1 text-center">
          <p className="mb-1 text-xs font-medium uppercase text-muted-foreground">Before</p>
          <motion.p
            className="font-display text-xl font-bold text-foreground sm:text-2xl"
            initial={{ opacity: 0.5 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.3 }}
          >
            <AnimatedValue value={result.before} inView={isInView} />
          </motion.p>
        </div>

        {/* Animated Arrow */}
        <motion.div
          className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10"
          animate={isInView ? {
            boxShadow: [
              "0 0 0 0 hsla(30, 12%, 40%, 0)",
              "0 0 0 8px hsla(30, 12%, 40%, 0.15)",
              "0 0 0 0 hsla(30, 12%, 40%, 0)"
            ]
          } : {}}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.1 + 0.5
          }}
        >
          <motion.div
            animate={isInView ? { x: [0, 3, 0] } : {}}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.1 + 0.3
            }}
          >
            <ArrowRight className="h-5 w-5 text-primary" />
          </motion.div>
        </motion.div>

        <div className="flex-1 text-center">
          <p className="mb-1 text-xs font-medium uppercase text-muted-foreground">After</p>
          <motion.p
            className="font-display text-xl font-bold text-primary sm:text-2xl"
            initial={{ opacity: 0.5 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <AnimatedValue value={result.after} inView={isInView} isAfter />
          </motion.p>
        </div>
      </div>

      {/* Improvement Badge with pulse/glow effect */}
      <motion.div
        className="relative flex items-center justify-center gap-2 overflow-hidden rounded-lg bg-success/10 py-2"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: index * 0.1 + 0.8, duration: 0.4 }}
      >
        {/* Animated gradient background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-success/0 via-success/20 to-success/0"
          animate={{
            x: ["-100%", "100%"]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
            delay: index * 0.2
          }}
        />

        {/* Subtle pulsing glow */}
        <motion.div
          className="absolute inset-0 rounded-lg"
          animate={{
            boxShadow: [
              "inset 0 0 0 0 rgba(34, 197, 94, 0)",
              "inset 0 0 20px 0 rgba(34, 197, 94, 0.15)",
              "inset 0 0 0 0 rgba(34, 197, 94, 0)"
            ]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.15
          }}
        />

        <motion.div
          animate={{
            rotate: [0, 10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.1 + 1
          }}
        >
          <TrendingUp className="relative h-4 w-4 text-success" />
        </motion.div>
        <span className="relative text-sm font-semibold text-success">{result.improvement}</span>
      </motion.div>
    </motion.div>
  );
};

const BeforeAfterGallery = ({
  results,
  title = "Real Patient Results",
  subtitle = "Anonymized results from actual Elevare patients. Individual results may vary."
}: BeforeAfterGalleryProps) => {
  if (!results || results.length === 0) return null;

  // Container animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  return (
    <section className="py-12 sm:py-20">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8 text-center"
          >
            <h2 className="mb-2 font-display text-2xl font-bold text-foreground sm:text-3xl">
              {title}
            </h2>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          </motion.div>

          <motion.div
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {results.map((result, index) => (
              <ResultCard key={result.id} result={result} index={index} />
            ))}
          </motion.div>

          {/* Disclaimer */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-6 text-center text-xs text-muted-foreground"
          >
            * Results based on anonymized patient data. Individual results may vary.
            All patients followed prescribed treatment protocols under physician supervision.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterGallery;
