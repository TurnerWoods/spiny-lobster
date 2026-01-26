import { motion } from "framer-motion";
import { ArrowRight, TrendingUp } from "lucide-react";

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

const BeforeAfterGallery = ({ 
  results, 
  title = "Real Patient Results",
  subtitle = "Anonymized results from actual Elevare patients. Individual results may vary."
}: BeforeAfterGalleryProps) => {
  if (!results || results.length === 0) return null;

  return (
    <section className="py-12 sm:py-20">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 text-center"
          >
            <h2 className="mb-2 font-display text-2xl font-bold text-foreground sm:text-3xl">
              {title}
            </h2>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((result, index) => (
              <motion.div
                key={result.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group relative overflow-hidden rounded-xl border bg-card p-6 transition-shadow hover:shadow-lg"
              >
                {/* Metric Label */}
                <div className="mb-4 flex items-center justify-between">
                  <span className="rounded-full bg-primary-light px-3 py-1 text-xs font-medium text-primary">
                    {result.metric}
                  </span>
                  <span className="text-xs text-muted-foreground">{result.timeframe}</span>
                </div>

                {/* Before/After Values */}
                <div className="mb-4 flex items-center justify-between gap-4">
                  <div className="flex-1 text-center">
                    <p className="mb-1 text-xs font-medium uppercase text-muted-foreground">Before</p>
                    <p className="font-display text-xl font-bold text-foreground sm:text-2xl">{result.before}</p>
                  </div>
                  
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <ArrowRight className="h-5 w-5 text-primary" />
                  </div>
                  
                  <div className="flex-1 text-center">
                    <p className="mb-1 text-xs font-medium uppercase text-muted-foreground">After</p>
                    <p className="font-display text-xl font-bold text-primary sm:text-2xl">{result.after}</p>
                  </div>
                </div>

                {/* Improvement Badge */}
                <div className="flex items-center justify-center gap-2 rounded-lg bg-success/10 py-2">
                  <TrendingUp className="h-4 w-4 text-success" />
                  <span className="text-sm font-semibold text-success">{result.improvement}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Disclaimer */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
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
