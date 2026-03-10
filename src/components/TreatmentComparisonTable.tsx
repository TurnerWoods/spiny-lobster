import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Info, Search, X, Filter, Star, Flame } from "lucide-react";
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
  bestseller?: boolean;
  rating?: number;
}

// Star Rating Component
const TableStarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-0.5">
    {Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`h-3 w-3 ${
          index < Math.floor(rating)
            ? "fill-amber-500 text-amber-500"
            : "fill-gray-300 text-gray-300"
        }`}
      />
    ))}
    <span className="ml-1 text-xs font-semibold text-stone-700 dark:text-stone-200">{rating}</span>
  </div>
);

// Product Badge Component
const TableProductBadge = ({ type }: { type: "popular" | "bestseller" }) => {
  const config = {
    popular: {
      label: "Most Popular",
      icon: Flame,
      className: "bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-sm",
    },
    bestseller: {
      label: "Best Seller",
      icon: Star,
      className: "bg-gradient-to-r from-stone-700 to-stone-600 text-white shadow-sm",
    },
  };

  const { label, icon: Icon, className } = config[type];

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${className}`}
    >
      <Icon className="h-3 w-3" />
      {label}
    </span>
  );
};

const treatments: Treatment[] = [
  {
    name: "Semaglutide",
    category: "Weight Loss",
    price: "$149/mo",
    benefits: ["Appetite suppression", "Metabolic boost", "Sustainable weight loss"],
    bestFor: "Significant weight loss goals",
    symptoms: ["weight gain", "overeating", "slow metabolism", "hunger", "cravings"],
    goals: ["lose weight", "fat loss", "appetite control", "metabolism"],
    bestseller: true,
    rating: 4.9,
  },
  {
    name: "Tirzepatide",
    category: "Weight Loss",
    price: "$199/mo",
    benefits: ["Dual-action formula", "Enhanced appetite control", "Blood sugar support"],
    bestFor: "Maximum weight loss results",
    symptoms: ["weight gain", "blood sugar issues", "insulin resistance", "obesity"],
    goals: ["weight loss", "blood sugar control", "appetite suppression"],
    rating: 4.8,
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
    rating: 4.8,
  },
  {
    name: "Testosterone Enanthate",
    category: "Hormones",
    price: "$149/mo",
    benefits: ["Stable hormone levels", "Improved libido", "Better sleep"],
    bestFor: "Hormone optimization",
    symptoms: ["hormone imbalance", "poor sleep", "low sex drive", "mood swings"],
    goals: ["hormone balance", "libido", "sleep quality", "testosterone"],
    rating: 4.7,
  },
  {
    name: "Sermorelin",
    category: "Anti-Aging",
    price: "$199/mo",
    benefits: ["Growth hormone support", "Recovery enhancement", "Anti-aging effects"],
    bestFor: "Natural GH stimulation",
    symptoms: ["slow recovery", "aging skin", "decreased stamina", "poor sleep"],
    goals: ["anti-aging", "recovery", "growth hormone", "youthfulness"],
    popular: true,
    rating: 4.7,
  },
  {
    name: "Tesamorelin",
    category: "Anti-Aging",
    price: "$249/mo",
    benefits: ["Body composition", "Visceral fat reduction", "Metabolic health"],
    bestFor: "Targeted fat reduction",
    symptoms: ["belly fat", "visceral fat", "metabolic issues", "stubborn fat"],
    goals: ["body composition", "fat reduction", "metabolism", "lean body"],
    rating: 4.7,
  },
  {
    name: "NAD+",
    category: "Anti-Aging",
    price: "$199/mo",
    benefits: ["Cellular energy", "Brain function", "DNA repair"],
    bestFor: "Cellular rejuvenation",
    symptoms: ["mental fatigue", "aging", "low energy", "brain fog", "cognitive decline"],
    goals: ["longevity", "brain health", "cellular health", "energy", "anti-aging"],
    rating: 4.8,
  },
  {
    name: "BPC-157",
    category: "Strength",
    price: "$149/mo",
    benefits: ["Tissue repair", "Joint support", "Gut healing"],
    bestFor: "Recovery & healing",
    symptoms: ["joint pain", "injuries", "gut issues", "slow healing", "inflammation"],
    goals: ["recovery", "healing", "joint health", "gut health", "injury repair"],
    popular: true,
    rating: 4.7,
  },
  {
    name: "Finasteride",
    category: "Hair",
    price: "$29/mo",
    benefits: ["DHT blocking", "Hair preservation", "Regrowth support"],
    bestFor: "Hair loss prevention",
    symptoms: ["hair loss", "thinning hair", "receding hairline", "balding"],
    goals: ["hair growth", "prevent hair loss", "thicker hair", "DHT blocking"],
    bestseller: true,
    rating: 4.6,
  },
  {
    name: "Minoxidil",
    category: "Hair",
    price: "$39/mo",
    benefits: ["Scalp circulation", "Follicle stimulation", "Visible regrowth"],
    bestFor: "Hair regrowth",
    symptoms: ["hair thinning", "bald spots", "slow hair growth"],
    goals: ["hair regrowth", "thicker hair", "scalp health"],
    rating: 4.5,
  },
  {
    name: "Tretinoin",
    category: "Skin",
    price: "$79/mo",
    benefits: ["Cell turnover", "Collagen boost", "Wrinkle reduction"],
    bestFor: "Anti-aging skincare",
    symptoms: ["wrinkles", "fine lines", "acne", "uneven skin", "aging skin"],
    goals: ["younger skin", "clear skin", "anti-wrinkle", "skin health"],
    rating: 4.6,
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
  "Weight Loss": "bg-stone-100 text-stone-800 border-stone-300 dark:bg-stone-800 dark:text-stone-100 dark:border-stone-600",
  "Hormones": "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900 dark:text-blue-100 dark:border-blue-700",
  "Anti-Aging": "bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-900 dark:text-purple-100 dark:border-purple-700",
  "Strength": "bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-900 dark:text-emerald-100 dark:border-emerald-700",
  "Hair": "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-900 dark:text-amber-100 dark:border-amber-700",
  "Skin": "bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-900 dark:text-rose-100 dark:border-rose-700",
  "Mood": "bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-900 dark:text-indigo-100 dark:border-indigo-700",
};

// Category name to URL slug mapping
const categorySlugMap: Record<string, string> = {
  "Weight Loss": "weight-loss",
  "Hormones": "hormones",
  "Anti-Aging": "anti-aging",
  "Strength": "strength",
  "Hair": "hair",
  "Skin": "skin",
  "Mood": "mood",
};

// Treatment name to URL slug mapping
const treatmentSlugMap: Record<string, string> = {
  "Semaglutide": "semaglutide",
  "Tirzepatide": "tirzepatide",
  "Testosterone Cypionate": "testosterone-cypionate",
  "Testosterone Enanthate": "testosterone-enanthate",
  "Sermorelin": "sermorelin",
  "Tesamorelin": "tesamorelin",
  "NAD+": "nad-plus",
  "BPC-157": "bpc-157",
  "Finasteride": "finasteride",
  "Minoxidil": "minoxidil",
  "Tretinoin": "tretinoin",
};

// Helper function to get treatment URL
const getTreatmentUrl = (treatmentName: string, category: string): string => {
  // First try to link to the category page since individual treatment pages may not exist
  const categorySlug = categorySlugMap[category];
  if (categorySlug) {
    return `/treatments/${categorySlug}`;
  }
  return "/treatments/weight-loss"; // fallback
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
                  className={`rounded-full border px-3 py-2.5 min-h-[44px] text-xs font-medium transition-colors hover:bg-primary hover:text-primary-foreground hover:border-primary ${
                    searchQuery === term
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-muted/50 text-foreground"
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
                  className={`rounded-full border px-4 py-2.5 min-h-[44px] text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card text-foreground hover:bg-muted"
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
                        <tr className="border-b bg-stone-100 dark:bg-stone-800">
                          <th className="px-6 py-4 text-left text-sm font-bold text-stone-900 dark:text-stone-50 uppercase tracking-wide">
                            Treatment
                          </th>
                          <th className="px-6 py-4 text-left text-sm font-bold text-stone-900 dark:text-stone-50 uppercase tracking-wide">
                            Category
                          </th>
                          <th className="px-6 py-4 text-left text-sm font-bold text-stone-900 dark:text-stone-50 uppercase tracking-wide">
                            Price
                          </th>
                          <th className="px-6 py-4 text-left text-sm font-bold text-stone-900 dark:text-stone-50 uppercase tracking-wide">
                            Key Benefits
                          </th>
                          <th className="px-6 py-4 text-left text-sm font-bold text-stone-900 dark:text-stone-50 uppercase tracking-wide">
                            Best For
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredTreatments.map((treatment) => (
                          <Link
                            key={treatment.name}
                            to={getTreatmentUrl(treatment.name, treatment.category)}
                            className="contents"
                          >
                            <motion.tr
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className={`border-b last:border-b-0 transition-colors hover:bg-muted/30 cursor-pointer ${
                                treatment.popular || treatment.bestseller ? "bg-primary/5" : ""
                              }`}
                            >
                              <td className="px-6 py-4">
                                <div className="flex flex-col gap-1">
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                                      {treatment.name}
                                    </span>
                                    {treatment.bestseller && (
                                      <TableProductBadge type="bestseller" />
                                    )}
                                    {treatment.popular && !treatment.bestseller && (
                                      <TableProductBadge type="popular" />
                                    )}
                                  </div>
                                  {treatment.rating && (
                                    <TableStarRating rating={treatment.rating} />
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
                                <span className="font-bold text-lg text-stone-900 dark:text-stone-50">{treatment.price}</span>
                              </td>
                              <td className="px-6 py-4">
                                <ul className="space-y-1">
                                  {treatment.benefits.map((benefit, i) => (
                                    <li key={i} className="flex items-center gap-2 text-sm text-stone-700 dark:text-stone-200">
                                      <Check className="h-3 w-3 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
                                      {benefit}
                                    </li>
                                  ))}
                                </ul>
                              </td>
                              <td className="px-6 py-4">
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <span className="flex items-center gap-1 text-sm text-stone-700 dark:text-stone-200 font-medium">
                                        {treatment.bestFor}
                                        <Info className="h-3 w-3 text-stone-500 dark:text-stone-400" />
                                      </span>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Recommended for patients seeking {treatment.bestFor.toLowerCase()}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </td>
                            </motion.tr>
                          </Link>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Mobile Cards */}
                <div className="grid gap-4 md:hidden" role="list">
                  {filteredTreatments.map((treatment, index) => (
                    <Link
                      key={treatment.name}
                      to={getTreatmentUrl(treatment.name, treatment.category)}
                      className="block"
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`relative rounded-xl border bg-card p-5 transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer ${
                          treatment.popular || treatment.bestseller ? "ring-2 ring-primary/20" : ""
                        }`}
                        role="listitem"
                      >
                        {/* Badge positioned at top */}
                        {(treatment.bestseller || treatment.popular) && (
                          <div className="absolute -top-2.5 left-4">
                            <TableProductBadge type={treatment.bestseller ? "bestseller" : "popular"} />
                          </div>
                        )}
                        <div className={`mb-3 flex items-start justify-between ${(treatment.bestseller || treatment.popular) ? "mt-2" : ""}`}>
                          <div>
                            <h3 className="font-display text-lg font-bold text-foreground hover:text-primary transition-colors">
                              {treatment.name}
                            </h3>
                            <span
                              className={`mt-1.5 inline-block rounded-full border px-3 py-1 text-xs font-medium ${
                                categoryColors[treatment.category] || "bg-muted text-foreground"
                              }`}
                            >
                              {treatment.category}
                            </span>
                            {treatment.rating && (
                              <div className="mt-2">
                                <TableStarRating rating={treatment.rating} />
                              </div>
                            )}
                          </div>
                          <span className="text-xl font-bold text-stone-900 dark:text-stone-50">{treatment.price}</span>
                        </div>

                        <div className="mb-3">
                          <p className="mb-2 text-sm font-bold text-stone-900 dark:text-stone-50">Key Benefits:</p>
                          <ul className="space-y-2">
                            {treatment.benefits.map((benefit, i) => (
                              <li key={i} className="flex items-center gap-2 text-sm text-stone-700 dark:text-stone-200 min-h-[44px]">
                                <Check className="h-4 w-4 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="rounded-lg bg-stone-100 dark:bg-stone-800 px-3 py-3 min-h-[44px] flex items-center">
                          <span className="text-sm text-stone-600 dark:text-stone-300">Best for: </span>
                          <span className="text-sm font-semibold text-stone-900 dark:text-stone-50 ml-1">{treatment.bestFor}</span>
                        </div>
                      </motion.div>
                    </Link>
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
