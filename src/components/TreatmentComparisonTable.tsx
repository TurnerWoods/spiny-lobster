import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Info, Search, X, Filter } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Treatment {
  name: string;
  category: string;
  price: string;
  benefits: string[];
  bestFor: string;
  symptoms: string[];
  goals: string[];
  popular?: boolean;
}

const treatments: Treatment[] = [
  {
    name: "Semaglutide",
    category: "Weight Loss",
    price: "$299/mo",
    benefits: ["Appetite suppression", "Metabolic boost", "Sustainable weight loss"],
    bestFor: "Significant weight loss goals",
    symptoms: ["weight gain", "overeating", "slow metabolism", "hunger", "cravings"],
    goals: ["lose weight", "fat loss", "appetite control", "metabolism"],
    popular: true,
  },
  {
    name: "Tirzepatide",
    category: "Weight Loss",
    price: "$399/mo",
    benefits: ["Dual-action formula", "Enhanced appetite control", "Blood sugar support"],
    bestFor: "Maximum weight loss results",
    symptoms: ["weight gain", "blood sugar issues", "insulin resistance", "obesity"],
    goals: ["weight loss", "blood sugar control", "appetite suppression"],
  },
  {
    name: "Testosterone Cypionate",
    category: "Hormones",
    price: "$149/mo",
    benefits: ["Energy restoration", "Muscle support", "Mental clarity"],
    bestFor: "Low testosterone symptoms",
    symptoms: ["fatigue", "low energy", "muscle loss", "brain fog", "low libido", "erectile dysfunction"],
    goals: ["energy", "muscle building", "mental clarity", "testosterone", "TRT"],
    popular: true,
  },
  {
    name: "Testosterone Enanthate",
    category: "Hormones",
    price: "$149/mo",
    benefits: ["Stable hormone levels", "Improved libido", "Better sleep"],
    bestFor: "Hormone optimization",
    symptoms: ["hormone imbalance", "poor sleep", "low sex drive", "mood swings"],
    goals: ["hormone balance", "libido", "sleep quality", "testosterone"],
  },
  {
    name: "Sermorelin",
    category: "Anti-Aging",
    price: "$199/mo",
    benefits: ["Growth hormone support", "Recovery enhancement", "Anti-aging effects"],
    bestFor: "Natural GH stimulation",
    symptoms: ["slow recovery", "aging skin", "decreased stamina", "poor sleep"],
    goals: ["anti-aging", "recovery", "growth hormone", "youthfulness"],
  },
  {
    name: "Tesamorelin",
    category: "Anti-Aging",
    price: "$249/mo",
    benefits: ["Body composition", "Visceral fat reduction", "Metabolic health"],
    bestFor: "Targeted fat reduction",
    symptoms: ["belly fat", "visceral fat", "metabolic issues", "stubborn fat"],
    goals: ["body composition", "fat reduction", "metabolism", "lean body"],
  },
  {
    name: "NAD+",
    category: "Anti-Aging",
    price: "$199/mo",
    benefits: ["Cellular energy", "Brain function", "DNA repair"],
    bestFor: "Cellular rejuvenation",
    symptoms: ["mental fatigue", "aging", "low energy", "brain fog", "cognitive decline"],
    goals: ["longevity", "brain health", "cellular health", "energy", "anti-aging"],
  },
  {
    name: "BPC-157",
    category: "Strength",
    price: "$149/mo",
    benefits: ["Tissue repair", "Joint support", "Gut healing"],
    bestFor: "Recovery & healing",
    symptoms: ["joint pain", "injuries", "gut issues", "slow healing", "inflammation"],
    goals: ["recovery", "healing", "joint health", "gut health", "injury repair"],
  },
  {
    name: "Finasteride",
    category: "Hair",
    price: "$49/mo",
    benefits: ["DHT blocking", "Hair preservation", "Regrowth support"],
    bestFor: "Hair loss prevention",
    symptoms: ["hair loss", "thinning hair", "receding hairline", "balding"],
    goals: ["hair growth", "prevent hair loss", "thicker hair", "DHT blocking"],
  },
  {
    name: "Minoxidil",
    category: "Hair",
    price: "$39/mo",
    benefits: ["Scalp circulation", "Follicle stimulation", "Visible regrowth"],
    bestFor: "Hair regrowth",
    symptoms: ["hair thinning", "bald spots", "slow hair growth"],
    goals: ["hair regrowth", "thicker hair", "scalp health"],
  },
  {
    name: "Tretinoin",
    category: "Skin",
    price: "$79/mo",
    benefits: ["Cell turnover", "Collagen boost", "Wrinkle reduction"],
    bestFor: "Anti-aging skincare",
    symptoms: ["wrinkles", "fine lines", "acne", "uneven skin", "aging skin"],
    goals: ["younger skin", "clear skin", "anti-wrinkle", "skin health"],
  },
];

const categories = ["All", "Weight Loss", "Hormones", "Anti-Aging", "Strength", "Hair", "Skin"];

const popularSearches = [
  "low energy",
  "weight loss",
  "hair loss",
  "anti-aging",
  "muscle",
  "fatigue",
  "libido",
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
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredTreatments = useMemo(() => {
    return treatments.filter((treatment) => {
      // Category filter
      const matchesCategory = selectedCategory === "All" || treatment.category === selectedCategory;
      
      // Search filter
      if (!searchQuery.trim()) return matchesCategory;
      
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        treatment.name.toLowerCase().includes(query) ||
        treatment.category.toLowerCase().includes(query) ||
        treatment.bestFor.toLowerCase().includes(query) ||
        treatment.benefits.some((b) => b.toLowerCase().includes(query)) ||
        treatment.symptoms.some((s) => s.toLowerCase().includes(query)) ||
        treatment.goals.some((g) => g.toLowerCase().includes(query));
      
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const handleQuickSearch = (term: string) => {
    setSearchQuery(term);
    setSelectedCategory("All");
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
  };

  const hasActiveFilters = searchQuery || selectedCategory !== "All";

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
              Find Your Treatment
            </h2>
            <p className="text-muted-foreground">
              Search by symptom, goal, or browse by category
            </p>
          </motion.div>

          {/* Search and Filter Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6 space-y-4"
          >
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by symptom or goal (e.g., 'fatigue', 'weight loss', 'hair')"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12 pl-12 pr-12 text-base"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>

            {/* Quick Search Tags */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-muted-foreground">Popular:</span>
              {popularSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => handleQuickSearch(term)}
                  className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors hover:bg-primary hover:text-primary-foreground hover:border-primary ${
                    searchQuery === term
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-muted/50 text-muted-foreground"
                  }`}
                >
                  {term}
                </button>
              ))}
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Active Filters / Clear */}
            {hasActiveFilters && (
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Showing {filteredTreatments.length} of {treatments.length} treatments
                </p>
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  <X className="mr-1 h-4 w-4" />
                  Clear filters
                </Button>
              </div>
            )}
          </motion.div>

          {/* Results */}
          <AnimatePresence mode="wait">
            {filteredTreatments.length === 0 ? (
              <motion.div
                key="no-results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="rounded-xl border bg-card p-12 text-center"
              >
                <Search className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
                <h3 className="mb-2 font-display text-lg font-bold text-foreground">
                  No treatments found
                </h3>
                <p className="mb-4 text-muted-foreground">
                  Try adjusting your search or browse all categories
                </p>
                <Button onClick={clearFilters} variant="outline">
                  View all treatments
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Desktop Table */}
                <div className="hidden overflow-hidden rounded-xl border bg-card md:block">
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
                        {filteredTreatments.map((treatment) => (
                          <motion.tr
                            key={treatment.name}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
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
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Mobile Cards */}
                <div className="grid gap-4 md:hidden">
                  {filteredTreatments.map((treatment, index) => (
                    <motion.div
                      key={treatment.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
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
              </motion.div>
            )}
          </AnimatePresence>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            * Pricing may vary based on dosage and treatment duration. All treatments require physician approval.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TreatmentComparisonTable;
