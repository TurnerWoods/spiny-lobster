import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Zap, FlaskConical, Battery, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Import treatment images
import treatmentWeightLoss from "@/assets/treatment-weight-loss.jpg";
import treatmentPeptides from "@/assets/treatment-peptides.jpg";
import treatmentHormone from "@/assets/treatment-hormone.jpg";

const treatments = [
  {
    icon: Zap,
    title: "Testosterone Cypionate",
    subtitle: "The Gold Standard",
    description: "The gold standard for TRT. Administered via weekly injection, testosterone cypionate provides steady hormone levels for consistent energy, improved body composition, and enhanced mood.",
    benefits: ["Increased energy", "Improved mood", "Better body composition"],
    image: treatmentHormone,
    price: "From $149/mo",
    slug: "testosterone",
  },
  {
    icon: FlaskConical,
    title: "Sermorelin",
    subtitle: "Growth Hormone Support",
    description: "A growth hormone releasing peptide that supports natural hormone production, recovery, and body composition. Often used alongside TRT for comprehensive optimization.",
    benefits: ["Natural GH support", "Improved recovery", "Better sleep"],
    image: treatmentPeptides,
    price: "From $199/mo",
    slug: "sermorelin",
  },
  {
    icon: Battery,
    title: "Tesamorelin",
    subtitle: "Metabolic Optimization",
    description: "Targets stubborn abdominal fat and supports improved body composition. Enhances fat-burning efficiency for lasting metabolic benefits.",
    benefits: ["Reduces visceral fat", "Metabolic boost", "Improved composition"],
    image: treatmentPeptides,
    price: "From $199/mo",
    slug: "tesamorelin",
  },
  {
    icon: Sparkles,
    title: "NAD+",
    subtitle: "Cellular Energy",
    description: "Enhances metabolic efficiency and energy production at the cellular level. Supports faster recovery, improved stamina, and daily performance.",
    benefits: ["Cellular energy", "Mental clarity", "Anti-aging"],
    image: treatmentPeptides,
    price: "From $199/mo",
    slug: "nad",
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
    <section id="treatments" className="bg-muted/30 py-20">
      <div className="container px-4 md:px-6">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-4 inline-block rounded-full bg-primary-light px-4 py-1 text-sm font-medium text-primary"
          >
            Treatments
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 font-display text-3xl font-bold text-foreground md:text-4xl"
          >
            Reclaim the Energy and Drive You've Been Missing
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            Low testosterone affects millions of men, often without them realizing it. Fatigue, decreased motivation, weight gain, and declining performance aren't inevitable parts of aging.
          </motion.p>
        </div>

        {/* Treatment Cards Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {treatments.map((treatment) => (
            <motion.div
              key={treatment.title}
              variants={item}
              className="group relative overflow-hidden rounded-2xl border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={treatment.image} 
                  alt={treatment.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {/* Price Badge */}
                <div className="absolute bottom-3 left-3 rounded-full bg-primary px-3 py-1 text-sm font-semibold text-white">
                  {treatment.price}
                </div>
                
                {/* Icon */}
                <div className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-primary shadow-md">
                  <treatment.icon className="h-5 w-5" />
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="mb-1 font-display text-xl font-bold text-foreground">
                  {treatment.title}
                </h3>
                <p className="mb-3 text-sm font-medium text-primary">{treatment.subtitle}</p>
                <p className="mb-4 text-sm text-muted-foreground line-clamp-3">{treatment.description}</p>

                {/* Benefits */}
                <div className="mb-4 flex flex-wrap gap-2">
                  {treatment.benefits.map((benefit) => (
                    <span
                      key={benefit}
                      className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                    >
                      {benefit}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <Link to={`/treatments/${treatment.slug}`}>
                  <Button variant="ghost" size="sm" className="group/btn w-full justify-between text-primary hover:text-primary-dark">
                    <span>Learn More</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
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
          className="mt-12 text-center"
        >
          <Link to="/intake">
            <Button size="lg" className="bg-primary hover:bg-primary-dark">
              Start Your Free Assessment
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default TreatmentCategories;
