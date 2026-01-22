import { Shield, Clock, Truck, UserCheck, Building2, CreditCard, Headphones, Package } from "lucide-react";

const badges = [
  { icon: Shield, text: "HIPAA Compliant" },
  { icon: Clock, text: "Same-Day Consults" },
  { icon: Truck, text: "Free Shipping" },
  { icon: UserCheck, text: "Licensed Providers" },
  { icon: Building2, text: "US-Based Pharmacy" },
  { icon: CreditCard, text: "No Hidden Fees" },
  { icon: Headphones, text: "24/7 Support" },
  { icon: Package, text: "Discreet Delivery" },
];

const TrustMarquee = () => {
  return (
    <section className="overflow-hidden bg-primary-light py-4">
      <div className="relative">
        <div className="flex animate-marquee hover:[animation-play-state:paused]">
          {/* First set */}
          {badges.map((badge, index) => (
            <div
              key={`first-${index}`}
              className="flex items-center gap-2 whitespace-nowrap px-6 text-sm font-medium text-primary"
            >
              <badge.icon className="h-4 w-4 flex-shrink-0" />
              <span>{badge.text}</span>
              <span className="ml-6 text-primary/40">•</span>
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {badges.map((badge, index) => (
            <div
              key={`second-${index}`}
              className="flex items-center gap-2 whitespace-nowrap px-6 text-sm font-medium text-primary"
            >
              <badge.icon className="h-4 w-4 flex-shrink-0" />
              <span>{badge.text}</span>
              <span className="ml-6 text-primary/40">•</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustMarquee;