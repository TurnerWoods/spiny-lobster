import { motion } from "framer-motion";
import { Scale, Zap, FlaskConical, Heart, Dumbbell, Brain, Scissors, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const treatments = [
  {
    icon: Scale,
    title: "Weight Loss",
    subtitle: "GLP-1 Therapy",
    description: "Clinically proven semaglutide and tirzepatide for sustainable weight management.",
    medications: ["Semaglutide", "Tirzepatide"],
    color: "bg-emerald-500",
  },
  {
    icon: FlaskConical,
    title: "Peptide Therapy",
    subtitle: "Cellular Health",
    description: "Support longevity and optimize your cellular function with advanced peptides.",
    medications: ["BPC-157", "NAD+", "Sermorelin"],
    color: "bg-teal-500",
  },
  {
    icon: Zap,
    title: "Hormone Therapy",
    subtitle: "TRT & HRT",
    description: "Restore balance and optimize performance with bioidentical hormones.",
    medications: ["Testosterone", "HRT", "Thyroid"],
    color: "bg-cyan-500",
  },
  {
    icon: Dumbbell,
    title: "Muscle & Recovery",
    subtitle: "Performance",
    description: "Enhance muscle tone and recovery naturally with proven therapies.",
    medications: ["IGF-LR3", "CJC-1295"],
    color: "bg-blue-500",
  },
  {
    icon: Brain,
    title: "Mental Wellness",
    subtitle: "Cognitive Health",
    description: "Improve focus, clarity, and emotional well-being.",
    medications: ["Semax", "Selank"],
    color: "bg-indigo-500",
  },
  {
    icon: Scissors,
    title: "Hair Growth",
    subtitle: "Restoration",
    description: "Stimulate growth and prevent thinning with targeted treatments.",
    medications: ["Finasteride", "Minoxidil"],
    color: "bg-violet-500",
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
            Personalized Treatment Options
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            Licensed providers, personalized dosing, and ongoing support for your health journey.
          </motion.p>
        </div>

        {/* Treatment Cards Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {treatments.map((treatment) => (
            <motion.div
              key={treatment.title}
              variants={item}
              className="group relative overflow-hidden rounded-2xl border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Icon */}
              <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${treatment.color} text-white`}>
                <treatment.icon className="h-6 w-6" />
              </div>

              {/* Content */}
              <h3 className="mb-1 font-display text-xl font-bold text-foreground">
                {treatment.title}
              </h3>
              <p className="mb-3 text-sm font-medium text-primary">{treatment.subtitle}</p>
              <p className="mb-4 text-sm text-muted-foreground">{treatment.description}</p>

              {/* Medications */}
              <div className="mb-4 flex flex-wrap gap-2">
                {treatment.medications.map((med) => (
                  <span
                    key={med}
                    className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                  >
                    {med}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <Button variant="ghost" size="sm" className="group/btn text-primary hover:text-primary-dark">
                Learn More
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TreatmentCategories;