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

const TrustMarquee = () => {
  return (
    <section className="overflow-hidden bg-deep-charcoal/90 backdrop-blur-md py-3 sm:py-4">
      <div className="relative">
        <div className="flex animate-marquee hover:[animation-play-state:paused]">
          {/* First set */}
          {badges.map((badge, index) => (
            <div
              key={`first-${index}`}
              className="flex items-center gap-1.5 whitespace-nowrap px-3 text-xs font-medium text-pure-white sm:gap-2 sm:px-6 sm:text-sm"
            >
              <badge.icon className="h-3.5 w-3.5 flex-shrink-0 text-warm-stone sm:h-4 sm:w-4" />
              <span>{badge.text}</span>
              <span className="ml-3 text-pure-white/40 sm:ml-6">•</span>
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {badges.map((badge, index) => (
            <div
              key={`second-${index}`}
              className="flex items-center gap-1.5 whitespace-nowrap px-3 text-xs font-medium text-pure-white sm:gap-2 sm:px-6 sm:text-sm"
            >
              <badge.icon className="h-3.5 w-3.5 flex-shrink-0 text-warm-stone sm:h-4 sm:w-4" />
              <span>{badge.text}</span>
              <span className="ml-3 text-pure-white/40 sm:ml-6">•</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustMarquee;
