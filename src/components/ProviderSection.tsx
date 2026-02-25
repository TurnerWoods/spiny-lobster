import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Award, BadgeCheck, Stethoscope } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Provider {
  name: string;
  title: string;
  credentials: string;
  specialty: string;
  image?: string;
}

const providers: Provider[] = [
  {
    name: "Paul Myers, DO",
    title: "Medical Director",
    credentials: "Board Certified",
    specialty: "Hormone Optimization & Men's Health",
  },
];

const trustCredentials = [
  {
    icon: Shield,
    title: "HIPAA Compliant",
    description: "Your data is protected with enterprise-grade security",
  },
  {
    icon: Award,
    title: "Licensed Physicians",
    description: "All care provided by US-licensed medical providers",
  },
  {
    icon: BadgeCheck,
    title: "FDA-Approved Medications",
    description: "Only proven, FDA-approved treatments",
  },
  {
    icon: Stethoscope,
    title: "50+ State Coverage",
    description: "Telehealth services available nationwide",
  },
];

const ProviderSection = () => {
  const [showBooking, setShowBooking] = useState(false);
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-pure-white to-soft-linen/50">
      <div className="container px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-warm-stone/20 bg-pure-white px-4 py-2 text-sm font-medium text-warm-stone mb-4">
            <Shield className="h-4 w-4" />
            Your Care Team
          </span>
          <h2 className="font-display text-3xl font-bold text-rich-black sm:text-4xl">
            Expert-Led Medical Care
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-warm-gray">
            Our board-certified physicians specialize in men's health optimization and hormone therapy
          </p>
        </motion.div>

        {/* Provider Cards */}
        <div className="max-w-4xl mx-auto mb-16">
          {providers.map((provider, index) => (
            <motion.div
              key={provider.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card variant="glass" className="p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-warm-stone/10 flex-shrink-0">
                  <Stethoscope className="h-10 w-10 text-warm-stone" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-xl font-bold text-rich-black">
                    {provider.name}
                  </h3>
                  <p className="text-warm-stone font-medium">{provider.title}</p>
                  <div className="mt-2 flex flex-wrap justify-center sm:justify-start gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-3 py-1 text-xs font-medium text-success">
                      <BadgeCheck className="h-3 w-3" />
                      {provider.credentials}
                    </span>
                    <span className="inline-flex rounded-full bg-warm-stone/10 px-3 py-1 text-xs font-medium text-warm-stone">
                      {provider.specialty}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-3 border-warm-stone/30 text-warm-stone hover:bg-warm-stone/10"
                    onClick={() => setShowBooking(!showBooking)}
                  >
                    {showBooking ? "Close Booking" : "Book with Dr. Myers"}
                  </Button>
                </div>
              </Card>
              <AnimatePresence>
                {showBooking && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 rounded-xl border border-warm-stone/20 bg-pure-white overflow-hidden">
                      <iframe
                        src="https://secure.gethealthie.com/appointments/embed_appt?dietitian_id=13804905&provider_ids=%5B13804905%5D&appt_type_ids=%5B515479,515480,515481%5D"
                        className="w-full border-0"
                        style={{ minHeight: '600px' }}
                        title="Book an appointment with Dr. Paul Myers"
                      />
                      <p className="py-2 text-center text-xs text-warm-gray">
                        Booking Provided by{' '}
                        <a href="https://gethealthie.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-warm-stone">Healthie</a>
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Trust Credentials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {trustCredentials.map((credential, index) => (
            <motion.div
              key={credential.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card variant="glass" className="p-5 sm:p-6 h-full text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-warm-stone/10">
                  <credential.icon className="h-6 w-6 text-warm-stone" />
                </div>
                <h3 className="font-display font-semibold text-rich-black mb-2">
                  {credential.title}
                </h3>
                <p className="text-sm text-warm-gray">
                  {credential.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProviderSection;
