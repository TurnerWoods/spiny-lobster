import { motion } from "framer-motion";
import { ClipboardList, UserCheck, Video, Truck, MessageSquare, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Process step images
const stepImages = {
  assessment: "/images/process/video-consultation.png",
  physician: "/images/process/physician-consultation.png",
  delivery: "/images/process/discreet-delivery.png",
};

const steps = [
  {
    icon: ClipboardList,
    number: "01",
    title: "Complete Assessment",
    description: "Answer questions about your symptoms, health history, and goals. Takes about 5 minutes from any device.",
    highlight: "5-minute form",
    image: stepImages.assessment,
  },
  {
    icon: UserCheck,
    number: "02",
    title: "Physician Review",
    description: "A Texas-licensed physician reviews your profile and creates a personalized treatment plan within 24 hours.",
    highlight: "24hr response",
    image: stepImages.physician,
  },
  {
    icon: Truck,
    number: "03",
    title: "Discreet Delivery",
    description: "Your prescription ships in unmarked packaging directly to your home or office within 3-5 business days.",
    highlight: "3-5 day shipping",
    image: stepImages.delivery,
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-12 sm:py-16 md:py-20">
      <div className="container px-4 md:px-6">
        {/* Section Header */}
        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-3 inline-block rounded-full border border-warm-stone/20 bg-warm-stone/10 px-3 py-1 text-xs font-medium text-warm-stone sm:mb-4 sm:px-4 sm:text-sm"
          >
            Premium Care. Zero Friction.
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-3 font-display text-2xl font-bold text-foreground sm:mb-4 sm:text-3xl md:text-4xl"
          >
            How It Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base text-muted-foreground sm:text-lg"
          >
            Three steps to feeling like yourself again. No waiting rooms.
          </motion.p>
        </div>

        {/* Steps - Mobile Vertical / Desktop Horizontal */}
        <div className="relative mx-auto max-w-5xl">
          <div className="grid gap-6 sm:gap-8 lg:grid-cols-3 lg:gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="group"
              >
                {/* Card with Image */}
                <div className="h-full overflow-hidden rounded-xl border border-neutral-gray/50 bg-pure-white/80 shadow-md backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:border-warm-stone/30 sm:rounded-2xl">
                  {/* Image Section */}
                  <div className="relative h-48 overflow-hidden sm:h-56">
                    <img 
                      src={step.image} 
                      alt={step.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-deep-charcoal/70 via-deep-charcoal/20 to-transparent" />
                    
                    {/* Step Number Badge */}
                    <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-warm-stone text-pure-white font-display font-bold shadow-lg sm:h-12 sm:w-12">
                      {step.number}
                    </div>
                    
                    {/* Icon */}
                    <div className="absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full border border-pure-white/30 bg-pure-white/90 text-warm-stone shadow-lg backdrop-blur-sm sm:h-14 sm:w-14">
                      <step.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-4 sm:p-6">
                    <h3 className="mb-2 font-display text-lg font-bold text-rich-black sm:mb-3 sm:text-xl">
                      {step.title}
                    </h3>
                    <p className="mb-3 text-sm text-muted-foreground sm:mb-4">{step.description}</p>
                    <span className="inline-flex items-center rounded-full border border-warm-stone/20 bg-warm-stone/10 px-3 py-1 text-xs font-semibold text-warm-stone sm:px-4 sm:py-1.5 sm:text-sm">
                      {step.highlight}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 text-center sm:mt-16"
        >
          <p className="mb-3 text-sm text-muted-foreground sm:mb-4">
            Your card is only charged if you're approved.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link to="/intake" className="w-full sm:w-auto">
              <Button size="lg" className="w-full bg-primary hover:bg-primary-dark sm:w-auto">
                Start Free Assessment
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              Video Consultation - $99
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
