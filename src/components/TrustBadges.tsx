import { motion } from "framer-motion";
import { Shield, Award, CheckCircle2, Truck, Star, Flame } from "lucide-react";
import { cn } from "@/lib/utils";

// Trust badge data
export const trustBadgeData = [
  {
    id: "physicians",
    icon: Award,
    label: "US-Licensed Physicians",
    shortLabel: "Licensed Physicians",
    description: "All treatments prescribed by board-certified US physicians",
  },
  {
    id: "fda",
    icon: CheckCircle2,
    label: "FDA-Approved Medications",
    shortLabel: "FDA-Approved",
    description: "Only FDA-approved or FDA-regulated compounded medications",
  },
  {
    id: "hipaa",
    icon: Shield,
    label: "HIPAA Compliant",
    shortLabel: "HIPAA Compliant",
    description: "Your health information is protected and secure",
  },
  {
    id: "shipping",
    icon: Truck,
    label: "Free Shipping",
    shortLabel: "Free Shipping",
    description: "Discreet, free shipping on all orders",
  },
];

interface TrustBadgesProps {
  variant?: "hero" | "footer" | "compact" | "inline" | "card";
  className?: string;
  showAll?: boolean;
  animated?: boolean;
  badges?: ("physicians" | "fda" | "hipaa" | "shipping")[];
}

export const TrustBadges = ({
  variant = "inline",
  className,
  showAll = true,
  animated = true,
  badges,
}: TrustBadgesProps) => {
  const displayBadges = badges
    ? trustBadgeData.filter((b) => badges.includes(b.id as any))
    : trustBadgeData;

  const Wrapper = animated ? motion.div : "div";
  const animationProps = animated
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 1, delay: 1.2, ease: [0.22, 1, 0.36, 1] },
      }
    : {};

  // Hero variant - minimal, light text for dark backgrounds
  if (variant === "hero") {
    return (
      <Wrapper
        className={cn("flex flex-wrap items-center gap-4 sm:gap-8", className)}
        {...animationProps}
      >
        {displayBadges.map((badge, index) => (
          <div
            key={badge.id}
            className="flex items-center gap-2 text-soft-linen/60"
          >
            <badge.icon className="h-4 w-4" strokeWidth={1.5} />
            <span className="text-xs font-light uppercase tracking-[0.2em]">
              {badge.shortLabel}
            </span>
            {index < displayBadges.length - 1 && (
              <span className="ml-4 hidden h-px w-8 bg-soft-linen/20 sm:block" />
            )}
          </div>
        ))}
      </Wrapper>
    );
  }

  // Footer variant - with icons, darker text
  if (variant === "footer") {
    return (
      <div
        className={cn(
          "flex flex-wrap items-center justify-center gap-6 sm:gap-10",
          className
        )}
      >
        {displayBadges.map((badge) => (
          <div
            key={badge.id}
            className="flex items-center gap-2.5 text-warm-stone"
          >
            <badge.icon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.5} />
            <span className="text-sm font-medium tracking-wide text-rich-black/80 sm:text-base">
              {badge.shortLabel}
            </span>
          </div>
        ))}
      </div>
    );
  }

  // Card variant - for pricing cards and sections
  if (variant === "card") {
    return (
      <div
        className={cn(
          "grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-6",
          className
        )}
      >
        {displayBadges.map((badge) => (
          <div
            key={badge.id}
            className="flex items-center gap-2 rounded-lg border border-warm-stone/10 bg-warm-stone/5 px-3 py-2"
          >
            <badge.icon className="h-4 w-4 text-warm-stone" strokeWidth={1.5} />
            <span className="text-xs font-medium text-rich-black/70">
              {badge.shortLabel}
            </span>
          </div>
        ))}
      </div>
    );
  }

  // Compact variant - icons only with tooltips
  if (variant === "compact") {
    return (
      <div className={cn("flex items-center gap-3", className)}>
        {displayBadges.map((badge) => (
          <div
            key={badge.id}
            className="group relative flex h-8 w-8 items-center justify-center rounded-full border border-warm-stone/20 bg-warm-stone/5 transition-colors hover:bg-warm-stone/10"
            title={badge.label}
          >
            <badge.icon className="h-4 w-4 text-warm-stone" strokeWidth={1.5} />
          </div>
        ))}
      </div>
    );
  }

  // Default inline variant
  return (
    <div
      className={cn("flex flex-wrap items-center gap-4 sm:gap-6", className)}
    >
      {displayBadges.map((badge) => (
        <div
          key={badge.id}
          className="flex items-center gap-2 text-muted-foreground"
        >
          <badge.icon className="h-4 w-4 text-warm-stone" strokeWidth={1.5} />
          <span className="text-sm font-medium">{badge.shortLabel}</span>
        </div>
      ))}
    </div>
  );
};

// Star Rating Component
interface StarRatingProps {
  rating: number;
  maxRating?: number;
  showCount?: boolean;
  reviewCount?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const StarRating = ({
  rating,
  maxRating = 5,
  showCount = false,
  reviewCount,
  size = "md",
  className,
}: StarRatingProps) => {
  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {Array.from({ length: maxRating }).map((_, index) => (
        <Star
          key={index}
          className={cn(
            sizeClasses[size],
            index < Math.floor(rating)
              ? "fill-amber-400 text-amber-400"
              : index < rating
              ? "fill-amber-400/50 text-amber-400"
              : "fill-gray-200 text-gray-200"
          )}
        />
      ))}
      {showCount && reviewCount !== undefined && (
        <span className={cn("ml-1 text-muted-foreground", textSizeClasses[size])}>
          ({reviewCount.toLocaleString()})
        </span>
      )}
    </div>
  );
};

// Product Badge Component (Most Popular, Best Seller, etc.)
interface ProductBadgeProps {
  type: "popular" | "bestseller" | "new" | "sale";
  className?: string;
}

export const ProductBadge = ({ type, className }: ProductBadgeProps) => {
  const badgeConfig = {
    popular: {
      label: "Most Popular",
      icon: Flame,
      className: "bg-gradient-to-r from-amber-500 to-orange-500 text-white",
    },
    bestseller: {
      label: "Best Seller",
      icon: Star,
      className: "bg-gradient-to-r from-warm-stone to-warm-stone/80 text-white",
    },
    new: {
      label: "New",
      icon: null,
      className: "bg-gradient-to-r from-accent-gold to-[#B8956A] text-white",
    },
    sale: {
      label: "Sale",
      icon: null,
      className: "bg-gradient-to-r from-red-500 to-rose-500 text-white",
    },
  };

  const config = badgeConfig[type];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold shadow-sm",
        config.className,
        className
      )}
    >
      {Icon && <Icon className="h-3 w-3" />}
      {config.label}
    </div>
  );
};

export default TrustBadges;
