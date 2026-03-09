import { useState, useEffect, memo } from "react";
import { Shield, Clock, Truck, UserCheck, Building2, CreditCard, Headphones, Package } from "lucide-react";

const badges = [
  { icon: Shield, text: "HIPAA Compliant" },
  { icon: Clock, text: "24hr Response" },
  { icon: Truck, text: "Discreet Shipping" },
  { icon: UserCheck, text: "Texas Physicians" },
  { icon: Building2, text: "US Pharmacy" },
  { icon: CreditCard, text: "No Hidden Fees" },
  { icon: Headphones, text: "Direct Support" },
  { icon: Package, text: "Cancel Anytime" },
];

// Memoized badge item for performance
const BadgeItem = memo(({ icon: Icon, text }: { icon: typeof Shield; text: string }) => (
  <div className="flex items-center gap-1.5 whitespace-nowrap px-3 text-xs font-medium text-white sm:gap-2 sm:px-6 sm:text-sm">
    <Icon className="h-3.5 w-3.5 flex-shrink-0 text-accent-gold sm:h-4 sm:w-4" />
    <span className="text-white">{text}</span>
    <span className="ml-3 text-white/50 sm:ml-6" aria-hidden="true">|</span>
  </div>
));

BadgeItem.displayName = "BadgeItem";

const TrustMarquee = () => {
  // Check for reduced motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
    } else {
      mediaQuery.addListener?.(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleChange);
      } else {
        mediaQuery.removeListener?.(handleChange);
      }
    };
  }, []);

  return (
    <section
      className="overflow-hidden bg-deep-charcoal/90 backdrop-blur-md py-3 sm:py-4"
      aria-label="Trust badges"
    >
      <div className="relative">
        {/* Use GPU-accelerated transform animation */}
        <div
          className={`flex ${
            prefersReducedMotion
              ? ""
              : "animate-marquee hover:[animation-play-state:paused]"
          } will-change-transform gpu-accelerated`}
        >
          {/* First set */}
          {badges.map((badge, index) => (
            <BadgeItem key={`first-${index}`} icon={badge.icon} text={badge.text} />
          ))}
          {/* Duplicate set for seamless loop - only render when animating */}
          {!prefersReducedMotion && badges.map((badge, index) => (
            <BadgeItem key={`second-${index}`} icon={badge.icon} text={badge.text} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(TrustMarquee);
