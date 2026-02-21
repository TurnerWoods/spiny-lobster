import { motion } from "framer-motion";
import { Shield, Award, FileCheck } from "lucide-react";

interface QualityBadgeProps {
  className?: string;
  variant?: "default" | "compact" | "expanded";
}

const QualityBadge = ({ className = "", variant = "default" }: QualityBadgeProps) => {
  const badges = [
    {
      icon: Award,
      text: "\u226598% Purity Guaranteed",
      tooltip: "All compounds tested for purity and potency",
    },
    {
      icon: Shield,
      text: "503B Pharmacy Sourced",
      tooltip: "FDA-registered outsourcing facility",
    },
    {
      icon: FileCheck,
      text: "COA Available",
      tooltip: "Certificate of Analysis provided upon request",
    },
  ];

  if (variant === "compact") {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#C9A962]/10 to-[#C9A962]/5 border border-[#C9A962]/30 px-4 py-2 ${className}`}
      >
        <Award className="h-4 w-4 text-[#C9A962]" />
        <span className="text-xs font-medium text-rich-black">
          <span className="text-[#C9A962] font-semibold">{"\u2265"}98% Purity</span>
          <span className="mx-2 text-neutral-gray">|</span>
          <span>503B Pharmacy</span>
          <span className="mx-2 text-neutral-gray">|</span>
          <span>COA Available</span>
        </span>
      </motion.div>
    );
  }

  if (variant === "expanded") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className={`rounded-xl bg-gradient-to-br from-[#C9A962]/10 via-pure-white to-[#C9A962]/5 border border-[#C9A962]/25 p-5 shadow-sm ${className}`}
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#C9A962]/20">
            <Shield className="h-4 w-4 text-[#C9A962]" />
          </div>
          <h4 className="font-display text-sm font-bold text-rich-black">
            Quality & Purity Guarantee
          </h4>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {badges.map((badge, index) => (
            <div
              key={index}
              className="flex items-start gap-2.5 rounded-lg bg-pure-white/80 p-3 border border-[#C9A962]/15"
            >
              <badge.icon className="h-4 w-4 flex-shrink-0 text-[#C9A962] mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-rich-black">{badge.text}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{badge.tooltip}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    );
  }

  // Default variant
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className={`relative overflow-hidden rounded-xl border border-[#C9A962]/30 bg-gradient-to-r from-[#C9A962]/10 via-pure-white to-[#C9A962]/5 p-4 shadow-sm ${className}`}
    >
      {/* Subtle gold shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C9A962]/5 to-transparent opacity-50" />

      <div className="relative flex flex-wrap items-center justify-center gap-4 sm:gap-6">
        {badges.map((badge, index) => (
          <div
            key={index}
            className="group flex items-center gap-2 transition-all duration-200 hover:scale-105"
            title={badge.tooltip}
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#C9A962]/20 ring-1 ring-[#C9A962]/30 transition-all duration-200 group-hover:bg-[#C9A962]/30 group-hover:ring-[#C9A962]/50">
              <badge.icon className="h-3.5 w-3.5 text-[#C9A962]" />
            </div>
            <span className="text-xs font-semibold text-rich-black sm:text-sm">
              {badge.text}
            </span>
            {index < badges.length - 1 && (
              <span className="ml-2 hidden text-[#C9A962]/40 sm:ml-4 sm:inline">|</span>
            )}
          </div>
        ))}
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-1/2 h-0.5 w-1/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#C9A962]/40 to-transparent" />
    </motion.div>
  );
};

export default QualityBadge;
