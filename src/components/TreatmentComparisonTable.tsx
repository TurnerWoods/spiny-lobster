import { motion } from "framer-motion";
import { Check, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

interface Treatment {
  name: string;
  category: string;
  price: string;
  benefits: string[];
  bestFor: string;
  popular?: boolean;
}

const treatments: Treatment[] = [
  {
    name: "Semaglutide",
    category: "Weight Loss",
    price: "$299/mo",
    benefits: ["Appetite suppression", "Metabolic boost", "Sustainable weight loss"],
    bestFor: "Significant weight loss goals",
    popular: true,
  },
  {
    name: "Tirzepatide",
    category: "Weight Loss",
    price: "$399/mo",
    benefits: ["Dual-action formula", "Enhanced appetite control", "Blood sugar support"],
    bestFor: "Maximum weight loss results",
  },
  {
    name: "Testosterone Cypionate",
    category: "Hormones",
    price: "$149/mo",
    benefits: ["Energy restoration", "Muscle support", "Mental clarity"],
    bestFor: "Low testosterone symptoms",
    popular: true,
  },
  {
    name: "Testosterone Enanthate",
    category: "Hormones",
    price: "$149/mo",
    benefits: ["Stable hormone levels", "Improved libido", "Better sleep"],
    bestFor: "Hormone optimization",
  },
  {
    name: "Sermorelin",
    category: "Anti-Aging",
    price: "$199/mo",
    benefits: ["Growth hormone support", "Recovery enhancement", "Anti-aging effects"],
    bestFor: "Natural GH stimulation",
  },
  {
    name: "Tesamorelin",
    category: "Anti-Aging",
    price: "$249/mo",
    benefits: ["Body composition", "Visceral fat reduction", "Metabolic health"],
    bestFor: "Targeted fat reduction",
  },
  {
    name: "NAD+",
    category: "Anti-Aging",
    price: "$199/mo",
    benefits: ["Cellular energy", "Brain function", "DNA repair"],
    bestFor: "Cellular rejuvenation",
  },
  {
    name: "BPC-157",
    category: "Strength",
    price: "$149/mo",
    benefits: ["Tissue repair", "Joint support", "Gut healing"],
    bestFor: "Recovery & healing",
  },
  {
    name: "Finasteride",
    category: "Hair",
    price: "$49/mo",
    benefits: ["DHT blocking", "Hair preservation", "Regrowth support"],
    bestFor: "Hair loss prevention",
  },
  {
    name: "Minoxidil",
    category: "Hair",
    price: "$39/mo",
    benefits: ["Scalp circulation", "Follicle stimulation", "Visible regrowth"],
    bestFor: "Hair regrowth",
  },
  {
    name: "Tretinoin",
    category: "Skin",
    price: "$79/mo",
    benefits: ["Cell turnover", "Collagen boost", "Wrinkle reduction"],
    bestFor: "Anti-aging skincare",
  },
];

const categoryColors: Record<string, string> = {
  "Weight Loss": "bg-orange-500/10 text-orange-600 border-orange-500/20",
  "Hormones": "bg-blue-500/10 text-blue-600 border-blue-500/20",
  "Anti-Aging": "bg-purple-500/10 text-purple-600 border-purple-500/20",
  "Strength": "bg-green-500/10 text-green-600 border-green-500/20",
  "Hair": "bg-amber-500/10 text-amber-600 border-amber-500/20",
  "Skin": "bg-pink-500/10 text-pink-600 border-pink-500/20",
  "Mood": "bg-teal-500/10 text-teal-600 border-teal-500/20",
};

const TreatmentComparisonTable = () => {
  return (
    <section className="py-20">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 text-center"
          >
            <h2 className="mb-4 font-display text-3xl font-bold text-foreground">
              Treatment Comparison
            </h2>
            <p className="text-muted-foreground">
              Compare all available treatments side by side
            </p>
          </motion.div>

          {/* Desktop Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="hidden overflow-hidden rounded-xl border bg-card md:block"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                      Treatment
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                      Category
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                      Price
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                      Key Benefits
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                      Best For
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {treatments.map((treatment, index) => (
                    <tr
                      key={treatment.name}
                      className={`border-b last:border-b-0 transition-colors hover:bg-muted/30 ${
                        treatment.popular ? "bg-primary/5" : ""
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-foreground">
                            {treatment.name}
                          </span>
                          {treatment.popular && (
                            <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">
                              Popular
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-block rounded-full border px-3 py-1 text-xs font-medium ${
                            categoryColors[treatment.category] || "bg-muted text-muted-foreground"
                          }`}
                        >
                          {treatment.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-bold text-primary">{treatment.price}</span>
                      </td>
                      <td className="px-6 py-4">
                        <ul className="space-y-1">
                          {treatment.benefits.map((benefit, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Check className="h-3 w-3 flex-shrink-0 text-primary" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td className="px-6 py-4">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger className="flex items-center gap-1 text-sm text-muted-foreground">
                              {treatment.bestFor}
                              <Info className="h-3 w-3" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Recommended for patients seeking {treatment.bestFor.toLowerCase()}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Mobile Cards */}
          <div className="grid gap-4 md:hidden">
            {treatments.map((treatment, index) => (
              <motion.div
                key={treatment.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`rounded-xl border bg-card p-4 ${
                  treatment.popular ? "ring-2 ring-primary/20" : ""
                }`}
              >
                <div className="mb-3 flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-display font-bold text-foreground">
                        {treatment.name}
                      </h3>
                      {treatment.popular && (
                        <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">
                          Popular
                        </Badge>
                      )}
                    </div>
                    <span
                      className={`mt-1 inline-block rounded-full border px-2 py-0.5 text-xs font-medium ${
                        categoryColors[treatment.category] || "bg-muted text-muted-foreground"
                      }`}
                    >
                      {treatment.category}
                    </span>
                  </div>
                  <span className="text-lg font-bold text-primary">{treatment.price}</span>
                </div>
                
                <div className="mb-3">
                  <p className="mb-1 text-xs font-medium text-muted-foreground">Key Benefits:</p>
                  <ul className="space-y-1">
                    {treatment.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-foreground">
                        <Check className="h-3 w-3 flex-shrink-0 text-primary" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="rounded-lg bg-muted/50 px-3 py-2">
                  <span className="text-xs text-muted-foreground">Best for: </span>
                  <span className="text-xs font-medium text-foreground">{treatment.bestFor}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            * Pricing may vary based on dosage and treatment duration. All treatments require physician approval.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TreatmentComparisonTable;
