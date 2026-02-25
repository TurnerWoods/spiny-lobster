import { useInView } from "framer-motion";
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

const AnimatedValue = ({ value, inView, isAfter = false }: { value: string; inView: boolean; isAfter?: boolean }) => {
  const [displayValue, setDisplayValue] = useState(value);
  const numericMatch = value.match(/^([\d.]+)/);
  const numericValue = numericMatch ? parseFloat(numericMatch[1]) : null;
  const suffix = numericMatch ? value.replace(numericMatch[1], "") : "";

  useEffect(() => {
    if (!inView || numericValue === null) {
      setDisplayValue(value);
      return;
    }
    const duration = 1200;
    const steps = 30;
    const increment = numericValue / steps;
    let current = 0;
    const delay = isAfter ? 400 : 0;

    const timeoutId = setTimeout(() => {
      const timer = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
          setDisplayValue(value);
          clearInterval(timer);
        } else {
          const displayNum = numericValue % 1 !== 0 ? current.toFixed(1) : Math.floor(current).toString();
          setDisplayValue(displayNum + suffix);
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }, delay);
    return () => clearTimeout(timeoutId);
  }, [value, inView, numericValue, suffix, isAfter]);

  return <>{displayValue}</>;
};

const ResultCard = ({ result, index }: { result: BeforeAfterResult; index: number }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  return (
    <div
      ref={cardRef}
      className="rounded-xl border border-neutral-gray/20 bg-pure-white p-5 shadow-sm hover:shadow-md transition-shadow duration-300 animate-in fade-in duration-500"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="rounded-full bg-warm-stone/10 px-3 py-1 text-xs font-medium text-warm-stone">
          {result.metric}
        </span>
        <span className="text-xs text-muted-foreground">{result.timeframe}</span>
      </div>

      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex-1 text-center">
          <p className="mb-1 text-[10px] font-medium uppercase text-muted-foreground">Before</p>
          <p className="font-display text-xl font-bold text-rich-black">
            <AnimatedValue value={result.before} inView={isInView} />
          </p>
        </div>

        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-warm-stone/10">
          <ArrowRight className="h-4 w-4 text-warm-stone" />
        </div>

        <div className="flex-1 text-center">
          <p className="mb-1 text-[10px] font-medium uppercase text-muted-foreground">After</p>
          <p className="font-display text-xl font-bold text-warm-stone">
            <AnimatedValue value={result.after} inView={isInView} isAfter />
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center gap-1.5 rounded-lg bg-green-50 py-2">
        <TrendingUp className="h-3.5 w-3.5 text-green-600" />
        <span className="text-sm font-semibold text-green-600">{result.improvement}</span>
      </div>
    </div>
  );
};

const BeforeAfterGallery = ({
  results,
  title = "Real Patient Results",
  subtitle = "Anonymized results from actual Elevare patients. Individual results may vary.",
}: BeforeAfterGalleryProps) => {
  if (!results || results.length === 0) return null;

  return (
    <div className="mt-10">
      <div
        className="mb-6 text-center animate-in fade-in duration-500"
      >
        <h3 className="mb-1 font-display text-lg font-bold text-rich-black">{title}</h3>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((result, index) => (
          <ResultCard key={result.id} result={result} index={index} />
        ))}
      </div>

      <p className="mt-4 text-center text-[10px] text-muted-foreground">
        * Individual results may vary. All patients followed prescribed protocols under physician supervision.
      </p>
    </div>
  );
};

export default BeforeAfterGallery;
