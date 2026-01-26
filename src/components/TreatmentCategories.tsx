import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Zap, FlaskConical, Battery, Sparkles, Dumbbell, Heart, Smile, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Import treatment images
import treatmentWeightLoss from "@/assets/treatment-weight-loss.jpg";
import treatmentHormone from "@/assets/treatment-hormone.jpg";
import treatmentStrength from "@/assets/treatment-strength.jpg";
import treatmentAntiAging from "@/assets/treatment-anti-aging.jpg";
import treatmentHair from "@/assets/treatment-hair.jpg";
import treatmentSkin from "@/assets/treatment-skin.jpg";
import treatmentMood from "@/assets/treatment-mood.jpg";

const treatments = [
  {
    icon: FlaskConical,
    title: "Weight Loss",
    subtitle: "GLP-1 & Peptide Therapies",
    description: "Semaglutide, Tirzepatide, and metabolic peptides for clinically proven, sustainable weight loss results.",
    benefits: ["Reduce appetite", "Boost metabolism", "Lose stubborn fat"],
    image: treatmentWeightLoss,
    price: "From $149/mo",
    slug: "weight-loss",
  },
  {
    icon: Zap,
    title: "Hormones",
    subtitle: "Testosterone Therapy",
    description: "Testosterone Cypionate with ongoing physician support for energy, mood, and performance optimization.",
    benefits: ["Increased energy", "Improved mood", "Better composition"],
    image: treatmentHormone,
    price: "From $149/mo",
    slug: "hormones",
  },
  {
    icon: Dumbbell,
    title: "Strength",
    subtitle: "Performance Peptides",
    description: "Sermorelin, BPC-157, and recovery peptides to build muscle, heal faster, and maximize performance.",
    benefits: ["Faster recovery", "Muscle growth", "Joint support"],
    image: treatmentStrength,
    price: "From $199/mo",
    slug: "strength",
  },
  {
    icon: Sparkles,
    title: "Anti-Aging",
    subtitle: "Cellular Optimization",
    description: "NAD+, Glutathione, and longevity peptides for cellular energy, mental clarity, and healthy aging.",
    benefits: ["Cellular energy", "Mental clarity", "Longevity"],
    image: treatmentAntiAging,
    price: "From $199/mo",
    slug: "anti-aging",
  },
  {
    icon: Battery,
    title: "Hair",
    subtitle: "Hair Restoration",
    description: "Finasteride, Minoxidil, and peptide therapies to stop hair loss and promote regrowth.",
    benefits: ["Stop hair loss", "Promote growth", "Thicker hair"],
    image: treatmentHair,
    price: "From $29/mo",
    slug: "hair",
  },
  {
    icon: Heart,
    title: "Skin",
    subtitle: "Medical Skincare",
    description: "Tretinoin, GHK-Cu, and regenerative treatments for healthier, more youthful skin.",
    benefits: ["Reduce wrinkles", "Brighter tone", "Skin firmness"],
    image: treatmentSkin,
    price: "From $49/mo",
    slug: "skin",
  },
  {
    icon: Smile,
    title: "Mood",
    subtitle: "Cognitive Enhancement",
    description: "Semax, Selank, and nootropic peptides to sharpen focus, reduce stress, and boost mental clarity.",
    benefits: ["Mental clarity", "Stress reduction", "Better focus"],
    image: treatmentMood,
    price: "From $99/mo",
    slug: "mood",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const TreatmentCategories = () => {
  return (
    <section id="treatments" className="bg-muted/30 py-12 sm:py-16 md:py-20">
      <div className="container px-4 md:px-6">
        {/* Section Header */}
        <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-12">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-3 inline-block rounded-full bg-primary-light px-3 py-1 text-xs font-medium text-primary sm:mb-4 sm:px-4 sm:text-sm"
          >
            Treatments
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-3 font-display text-2xl font-bold text-foreground sm:mb-4 sm:text-3xl md:text-4xl"
          >
            Reclaim Your Energy & Drive
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="px-2 text-base text-muted-foreground sm:px-0 sm:text-lg"
          >
            Low testosterone affects millions of men. Fatigue, weight gain, and declining performance aren't inevitable.
          </motion.p>
        </div>

        {/* Treatment Cards Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4"
        >
          {treatments.map((treatment, index) => (
            <motion.div
              key={treatment.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group relative overflow-hidden rounded-xl border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:rounded-2xl"
            >
              {/* Image */}
              <div className="relative h-40 overflow-hidden sm:h-48">
                <img 
                  src={treatment.image} 
                  alt={treatment.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {/* Price Badge */}
                <div className="absolute bottom-2 left-2 rounded-full bg-primary px-2.5 py-0.5 text-xs font-semibold text-white sm:bottom-3 sm:left-3 sm:px-3 sm:py-1 sm:text-sm">
                  {treatment.price}
                </div>
                
                {/* Icon */}
                <div className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-primary shadow-md sm:right-3 sm:top-3 sm:h-10 sm:w-10">
                  <treatment.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5">
                <h3 className="mb-0.5 font-display text-lg font-bold text-foreground sm:mb-1 sm:text-xl">
                  {treatment.title}
                </h3>
                <p className="mb-2 text-xs font-medium text-primary sm:mb-3 sm:text-sm">{treatment.subtitle}</p>
                <p className="mb-3 line-clamp-2 text-xs text-muted-foreground sm:mb-4 sm:line-clamp-3 sm:text-sm">{treatment.description}</p>

                {/* Benefits */}
                <div className="mb-3 flex flex-wrap gap-1.5 sm:mb-4 sm:gap-2">
                  {treatment.benefits.map((benefit) => (
                    <span
                      key={benefit}
                      className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium text-secondary-foreground sm:px-3 sm:py-1 sm:text-xs"
                    >
                      {benefit}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <Link to={`/treatments/${treatment.slug}`}>
                  <Button variant="ghost" size="sm" className="group/btn w-full justify-between text-xs text-primary hover:text-primary-dark sm:text-sm">
                    <span>Learn More</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1 sm:h-4 sm:w-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 text-center sm:mt-12"
        >
          <Link to="/intake">
            <Button size="lg" className="w-full bg-primary hover:bg-primary-dark sm:w-auto">
              Start Your Free Assessment
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default TreatmentCategories;
