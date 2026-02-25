import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Star, Flame } from "lucide-react";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { TreatmentCardSkeleton } from "@/components/ui/treatment-card-skeleton";
import { easing, duration, viewportSettings } from "@/lib/motion";

// Premium easing
const premiumEase = [0.16, 1, 0.3, 1] as const;

// Treatment card images - using product images from public folder
const treatments = [
  {
    title: "Weight Loss",
    subtitle: "GLP-1 Therapies",
    image: "/images/products/semaglutide-vial.png",
    price: "From $149",
    slug: "weight-loss",
    rating: 4.9,
    reviewCount: 2847,
    badge: "bestseller" as const,
  },
  {
    title: "Testosterone",
    subtitle: "Hormone Optimization",
    image: "/images/products/testosterone-vial.png",
    price: "From $149",
    slug: "hormones",
    rating: 4.8,
    reviewCount: 3156,
    badge: "popular" as const,
  },
  {
    title: "Peptides",
    subtitle: "Performance & Recovery",
    image: "/images/products/wolverine-stack.png",
    price: "From $149",
    slug: "strength",
    rating: 4.7,
    reviewCount: 1284,
    badge: null,
  },
  {
    title: "Anti-Aging",
    subtitle: "Cellular Renewal",
    image: "/images/products/longevity-stack.png",
    price: "From $199",
    slug: "anti-aging",
    rating: 4.8,
    reviewCount: 956,
    badge: null,
  },
  {
    title: "Hair Restoration",
    subtitle: "Regrowth Protocols",
    image: "/images/products/hair-restoration-kit.png",
    price: "From $29",
    slug: "hair",
    rating: 4.6,
    reviewCount: 1823,
    badge: "popular" as const,
  },
  {
    title: "Mood & Cognitive",
    subtitle: "Focus & Clarity",
    image: "/images/products/semax-selank-vials.png",
    price: "From $79",
    slug: "mood",
    rating: 4.7,
    reviewCount: 742,
    badge: null,
  },
  {
    title: "Sexual Health",
    subtitle: "Intimate Wellness",
    image: "/images/products/pt141-vial.png",
    price: "From $49",
    slug: "sexual-health",
    rating: 4.9,
    reviewCount: 1456,
    badge: "popular" as const,
    categoryColor: "#5D3A4A",
  },
];

// Star Rating Component
const StarRating = ({ rating, reviewCount }: { rating: number; reviewCount: number }) => (
  <div className="flex items-center gap-1.5">
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={`h-3.5 w-3.5 ${
            index < Math.floor(rating)
              ? "fill-amber-400 text-amber-400"
              : index < rating
              ? "fill-amber-400/50 text-amber-400"
              : "fill-gray-200 text-gray-200"
          }`}
        />
      ))}
    </div>
    <span className="text-xs text-muted-foreground">
      {rating} ({reviewCount.toLocaleString()})
    </span>
  </div>
);

// Product Badge Component
const ProductBadge = ({ type }: { type: "popular" | "bestseller" }) => {
  const config = {
    popular: {
      label: "Most Popular",
      icon: Flame,
      className: "bg-gradient-to-r from-amber-500 to-orange-500",
    },
    bestseller: {
      label: "Best Seller",
      icon: Star,
      className: "bg-gradient-to-r from-warm-stone to-warm-stone/80",
    },
  };

  const { label, icon: Icon, className } = config[type];

  return (
    <div
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold text-white shadow-sm ${className}`}
    >
      <Icon className="h-3 w-3" />
      {label}
    </div>
  );
};

// Header animation variants
const headerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const headerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.slow,
      ease: premiumEase,
    },
  },
};

// Card animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.slow,
      delay: index * 0.08,
      ease: premiumEase,
    },
  }),
};

const TreatmentCategories = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state for demonstration - in production this would be based on actual data fetching
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="treatments" className="bg-soft-linen py-16 sm:py-24 md:py-32 lg:py-40">
      <div className="container px-4 sm:px-6">
        {/* Section Header - Aesop style */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          className="mb-10 max-w-xl sm:mb-16 md:mb-20"
        >
          <motion.span
            variants={headerItem}
            className="mb-4 block text-[10px] font-light uppercase tracking-[0.3em] text-warm-stone/60 sm:mb-6 sm:text-xs"
          >
            Treatments
          </motion.span>
          <motion.h2
            variants={headerItem}
            className="font-display text-2xl font-light leading-tight text-rich-black sm:text-3xl md:text-4xl lg:text-5xl"
          >
            Formulations for
            <br />
            modern wellness
          </motion.h2>
        </motion.div>

        {/* Treatment Cards Grid - Mobile-first vertical stack */}
        <div className="grid grid-cols-1 gap-4 sm:gap-px sm:bg-neutral-gray/20 sm:grid-cols-2 lg:grid-cols-3">
          {treatments.map((treatment, index) => (
            <motion.div
              key={treatment.title}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              <Link
                to={`/treatments/${treatment.slug}`}
                className="group block overflow-hidden rounded-lg bg-white shadow-sm transition-shadow duration-300 hover:shadow-md sm:rounded-none sm:bg-soft-linen sm:shadow-none"
              >
                {/* Image - Taller aspect on mobile for better visual impact */}
                <div className="relative aspect-[16/10] overflow-hidden sm:aspect-[4/3]">
                  <OptimizedImage
                    src={treatment.image}
                    alt={treatment.title}
                    className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-105"
                    objectFit="cover"
                    showSkeleton={true}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent sm:bg-none" />
                  <div className="absolute inset-0 bg-deep-charcoal/0 transition-colors duration-500 group-hover:bg-deep-charcoal/10" />

                  {/* Product Badge (Most Popular / Best Seller) */}
                  {treatment.badge && (
                    <div className="absolute left-3 top-3">
                      <ProductBadge type={treatment.badge} />
                    </div>
                  )}

                  {/* Mobile Price Badge - Clearly visible on image */}
                  <div className="absolute right-3 top-3 rounded-full bg-white/95 px-3 py-1.5 text-xs font-medium text-rich-black shadow-sm backdrop-blur-sm sm:hidden">
                    {treatment.price}
                  </div>
                </div>

                {/* Content - Stacked layout on mobile, side-by-side on larger screens */}
                <div className="p-4 sm:p-6 md:p-8">
                  {/* Mobile: Full-width stacked layout */}
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                    <div className="min-w-0 flex-1">
                      <h3 className="mb-1 font-display text-base font-medium text-rich-black sm:text-lg sm:font-normal md:text-xl">
                        {treatment.title}
                      </h3>
                      <p className="text-sm font-light leading-relaxed text-muted-foreground">
                        {treatment.subtitle}
                      </p>
                      {/* Star Rating */}
                      <div className="mt-2">
                        <StarRating rating={treatment.rating} reviewCount={treatment.reviewCount} />
                      </div>
                    </div>

                    {/* Desktop Price - Hidden on mobile (shown in badge instead) */}
                    <div className="hidden items-center gap-3 sm:flex">
                      <span className="whitespace-nowrap text-sm font-light text-warm-stone">
                        {treatment.price}
                      </span>
                      <ArrowRight className="h-4 w-4 flex-shrink-0 text-warm-stone/50 transition-all duration-300 group-hover:translate-x-1 group-hover:text-warm-stone" />
                    </div>
                  </div>

                  {/* Mobile CTA Button - Full width, touch-friendly */}
                  <div className="mt-4 sm:hidden">
                    <span className="flex w-full items-center justify-center gap-2 rounded-full bg-rich-black py-3.5 text-sm font-medium text-white transition-colors duration-300 active:bg-rich-black/80">
                      View Treatment
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TreatmentCategories;
