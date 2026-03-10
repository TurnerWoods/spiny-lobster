// Lab Scheduling Component
// =========================
// Displays lab appointment options with In-Home LabCorp as top priority

import { useState } from "react";
import { motion } from "framer-motion";
import { Home, MapPin, Car, Star, Check, ArrowRight, Clock, Shield, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LabAppointmentType {
  code: string;
  name: string;
  description: string;
  price: number;
  icon: React.ReactNode;
  recommended?: boolean;
  features: string[];
  requiresAddress?: boolean;
}

const LAB_OPTIONS: LabAppointmentType[] = [
  {
    code: "in_home",
    name: "In-Home Lab Draw",
    description: "A licensed LabCorp phlebotomist comes to your home. Most convenient option - no waiting rooms, no travel.",
    price: 0,
    icon: <Home className="h-6 w-6" />,
    recommended: true,
    requiresAddress: true,
    features: [
      "Phlebotomist comes to you",
      "No waiting rooms",
      "Flexible scheduling",
      "Same accurate results",
      "Included with your plan"
    ]
  },
  {
    code: "psc",
    name: "LabCorp Location",
    description: "Visit any of 2,000+ LabCorp Patient Service Centers nationwide. Walk-ins welcome.",
    price: 0,
    icon: <MapPin className="h-6 w-6" />,
    features: [
      "2,000+ locations",
      "Walk-ins available",
      "Early morning hours",
      "Included with your plan"
    ]
  },
  {
    code: "mobile",
    name: "Mobile Phlebotomy",
    description: "Mobile phlebotomist meets you at your preferred location - office, hotel, or anywhere convenient.",
    price: 25,
    icon: <Car className="h-6 w-6" />,
    requiresAddress: true,
    features: [
      "Any location you choose",
      "Business hours available",
      "Great for travelers",
      "Small convenience fee"
    ]
  }
];

interface LabSchedulingProps {
  testPanel: string;
  onSchedule: (option: string, address?: AddressInfo) => void;
  onFindLocation?: () => void;
}

interface AddressInfo {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zip: string;
}

const LabScheduling = ({ testPanel, onSchedule, onFindLocation }: LabSchedulingProps) => {
  const [selectedOption, setSelectedOption] = useState<string>("in_home");
  const [address, setAddress] = useState<AddressInfo>({
    line1: "",
    city: "",
    state: "TX",
    zip: ""
  });
  const [showAddressForm, setShowAddressForm] = useState(false);

  const selectedType = LAB_OPTIONS.find(opt => opt.code === selectedOption);

  const handleSelect = (code: string) => {
    setSelectedOption(code);
    const option = LAB_OPTIONS.find(opt => opt.code === code);
    if (option?.requiresAddress) {
      setShowAddressForm(true);
    } else {
      setShowAddressForm(false);
    }
  };

  const handleSchedule = () => {
    if (selectedType?.requiresAddress) {
      onSchedule(selectedOption, address);
    } else {
      onSchedule(selectedOption);
    }
  };

  const isAddressValid = !selectedType?.requiresAddress ||
    (address.line1 && address.city && address.state && address.zip);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <Badge className="mb-3 bg-accent-gold/10 text-[#9A8444] border-accent-gold/25">
          <Calendar className="h-3 w-3 mr-1" />
          Lab Work Ordered
        </Badge>
        <h2 className="text-2xl font-bold text-rich-black mb-2">
          Schedule Your Blood Draw
        </h2>
        <p className="text-muted-foreground">
          Choose the option that works best for your schedule
        </p>
      </div>

      {/* Test Panel Info */}
      <Card className="p-4 bg-soft-linen/50 border-warm-stone/20">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-warm-stone/10 flex items-center justify-center">
            <Shield className="h-5 w-5 text-warm-stone" />
          </div>
          <div>
            <p className="text-sm font-medium text-rich-black">Tests Ordered</p>
            <p className="text-xs text-muted-foreground">{testPanel}</p>
          </div>
        </div>
      </Card>

      {/* Options */}
      <div className="space-y-3">
        {LAB_OPTIONS.map((option, index) => (
          <motion.div
            key={option.code}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              className={`relative cursor-pointer transition-all duration-200 overflow-hidden ${
                selectedOption === option.code
                  ? "ring-2 ring-warm-stone border-warm-stone"
                  : "hover:border-warm-stone/50"
              }`}
              onClick={() => handleSelect(option.code)}
            >
              {/* Recommended Badge */}
              {option.recommended && (
                <div className="absolute top-0 right-0">
                  <div className="bg-accent-gold text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg flex items-center gap-1">
                    <Star className="h-3 w-3 fill-current" />
                    RECOMMENDED
                  </div>
                </div>
              )}

              <div className="p-4">
                <div className="flex items-start gap-4">
                  {/* Radio */}
                  <div className={`mt-1 h-5 w-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    selectedOption === option.code
                      ? "border-warm-stone bg-warm-stone"
                      : "border-gray-300"
                  }`}>
                    {selectedOption === option.code && (
                      <Check className="h-3 w-3 text-white" />
                    )}
                  </div>

                  {/* Icon */}
                  <div className={`h-12 w-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    selectedOption === option.code
                      ? "bg-warm-stone text-white"
                      : "bg-soft-linen text-warm-stone"
                  }`}>
                    {option.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-rich-black">{option.name}</h3>
                      <span className={`text-sm font-bold ${
                        option.price === 0 ? "text-green-600" : "text-muted-foreground"
                      }`}>
                        {option.price === 0 ? "FREE" : `+$${option.price}`}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {option.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2">
                      {option.features.slice(0, 3).map((feature, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1 text-xs bg-soft-linen rounded-full px-2 py-1"
                        >
                          <Check className="h-3 w-3 text-green-600" />
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Address Form */}
      {showAddressForm && selectedType?.requiresAddress && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="overflow-hidden"
        >
          <Card className="p-4 border-warm-stone/30 bg-warm-stone/5">
            <h4 className="font-semibold text-rich-black mb-4 flex items-center gap-2">
              <Home className="h-4 w-4 text-warm-stone" />
              Service Address
            </h4>
            <div className="grid gap-4">
              <div>
                <Label htmlFor="line1">Street Address</Label>
                <Input
                  id="line1"
                  placeholder="123 Main Street"
                  value={address.line1}
                  onChange={(e) => setAddress({ ...address, line1: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="line2">Apt, Suite, Unit (optional)</Label>
                <Input
                  id="line2"
                  placeholder="Apt 4B"
                  value={address.line2 || ""}
                  onChange={(e) => setAddress({ ...address, line2: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    placeholder="Austin"
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={address.state}
                    onChange={(e) => setAddress({ ...address, state: e.target.value })}
                    maxLength={2}
                  />
                </div>
              </div>
              <div className="w-1/3">
                <Label htmlFor="zip">ZIP Code</Label>
                <Input
                  id="zip"
                  placeholder="78701"
                  value={address.zip}
                  onChange={(e) => setAddress({ ...address, zip: e.target.value })}
                  maxLength={5}
                />
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Find PSC Location */}
      {selectedOption === "psc" && onFindLocation && (
        <Card className="p-4 border-warm-stone/20 bg-soft-linen/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-warm-stone" />
              <div>
                <p className="font-medium text-rich-black">Find a LabCorp Near You</p>
                <p className="text-sm text-muted-foreground">2,000+ locations nationwide</p>
              </div>
            </div>
            <Button variant="outline" onClick={onFindLocation} className="border-warm-stone/30">
              Find Location
            </Button>
          </div>
        </Card>
      )}

      {/* Schedule Button */}
      <div className="pt-2">
        <Button
          onClick={handleSchedule}
          disabled={!isAddressValid}
          className="w-full h-12 bg-warm-stone hover:bg-warm-stone/90 text-white font-semibold"
        >
          {selectedOption === "psc" ? "Get Lab Requisition" : "Schedule Appointment"}
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
        <p className="text-center text-xs text-muted-foreground mt-3">
          <Clock className="inline h-3 w-3 mr-1" />
          Fasting may be required. Instructions will be sent via email.
        </p>
      </div>

      {/* Trust Badges */}
      <div className="flex items-center justify-center gap-6 pt-4 border-t border-neutral-gray/20">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Shield className="h-4 w-4 text-warm-stone" />
          HIPAA Compliant
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Check className="h-4 w-4 text-green-600" />
          CAP Certified Labs
        </div>
      </div>
    </div>
  );
};

export default LabScheduling;
