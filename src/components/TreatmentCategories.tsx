import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Zap, FlaskConical, Battery, Sparkles, Dumbbell, Heart, Smile, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

// Import treatment card images - product-focused medical imagery
import cardWeightLoss from "@/assets/card-weight-loss.jpg";
import cardHormones from "@/assets/card-hormones.jpg";
import cardStrength from "@/assets/card-strength.jpg";
import cardAntiAging from "@/assets/card-anti-aging.jpg";
import cardHair from "@/assets/card-hair.jpg";
import cardSkin from "@/assets/card-skin.jpg";
import cardMood from "@/assets/card-mood.jpg";

const treatments = [
  {
    icon: FlaskConical,
    title: "Weight Loss",
    subtitle: "GLP-1 & Peptide Therapies",
    description: "Semaglutide, Tirzepatide, and metabolic peptides for clinically proven, sustainable weight loss results.",
    benefits: ["Reduce appetite", "Boost metabolism", "Lose stubborn fat"],
    image: cardWeightLoss,
    imageAlt: "Semaglutide and Tirzepatide injection vials for weight loss treatment",
    price: "From $149/mo",
    slug: "weight-loss",
    featured: true,
  },
  {
    icon: Zap,
    title: "Hormones",
    subtitle: "Testosterone Therapy",
    description: "Testosterone Cypionate with ongoing physician support for energy, mood, and performance optimization.",
    benefits: ["Increased energy", "Improved mood", "Better composition"],
    image: cardHormones,
    imageAlt: "Testosterone Cypionate vial and injection supplies for TRT",
    price: "From $149/mo",
    slug: "hormones",
    featured: true,
  },
  {
    icon: Dumbbell,
    title: "Strength",
    subtitle: "Performance Peptides",
    description: "Sermorelin, BPC-157, and recovery peptides to build muscle, heal faster, and maximize performance.",
    benefits: ["Faster recovery", "Muscle growth", "Joint support"],
    image: cardStrength,
    imageAlt: "BPC-157 and Sermorelin peptide vials for muscle building",
    price: "From $199/mo",
    slug: "strength",
  },
  {
    icon: Sparkles,
    title: "Anti-Aging",
    subtitle: "Cellular Optimization",
    description: "NAD+, Glutathione, and longevity peptides for cellular energy, mental clarity, and healthy aging.",
    benefits: ["Cellular energy", "Mental clarity", "Longevity"],
    image: cardAntiAging,
    imageAlt: "NAD+ and Glutathione IV therapy products for anti-aging",
    price: "From $199/mo",
    slug: "anti-aging",
  },
  {
    icon: Battery,
    title: "Hair",
    subtitle: "Hair Restoration",
    description: "Finasteride, Minoxidil, and peptide therapies to stop hair loss and promote regrowth.",
    benefits: ["Stop hair loss", "Promote growth", "Thicker hair"],
    image: cardHair,
    imageAlt: "Finasteride tablets and Minoxidil solution for hair restoration",
    price: "From $29/mo",
    slug: "hair",
  },
  {
    icon: Heart,
    title: "Skin",
    subtitle: "Medical Skincare",
    description: "Tretinoin, GHK-Cu, and regenerative treatments for healthier, more youthful skin.",
    benefits: ["Reduce wrinkles", "Brighter tone", "Skin firmness"],
    image: cardSkin,
    imageAlt: "Tretinoin cream and GHK-Cu peptide serum for skin rejuvenation",
    price: "From $49/mo",
    slug: "skin",
  },
  {
    icon: Smile,
    title: "Mood",
    subtitle: "Cognitive Enhancement",
    description: "Semax, Selank, and nootropic peptides to sharpen focus, reduce stress, and boost mental clarity.",
    benefits: ["Mental clarity", "Stress reduction", "Better focus"],
    image: cardMood,
    imageAlt: "Semax and Selank nasal spray peptides for cognitive enhancement",
    price: "From $99/mo",
    slug: "mood",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const TreatmentCategories = () => {
  return (
    <section id="treatments" className="bg-gradient-to-b from-soft-linen/50 via-pure-white to-light-cloud/30 py-16 sm:py-20 md:py-24">
      <div className="container px-4 md:px-6">
        {/* Section Header */}
        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-14">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-warm-stone/20 bg-warm-stone/10 px-4 py-1.5 text-sm font-medium text-warm-stone"
          >
            <Star className="h-3.5 w-3.5 fill-warm-stone" aria-hidden="true" />
            Premium Treatments
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mb-4 font-display text-3xl font-bold text-rich-black sm:text-4xl md:text-5xl"
          >
            Reclaim Your Energy & Drive
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-base text-muted-foreground sm:text-lg md:text-xl"
          >
            Physician-supervised treatments tailored to your goals. Same price at every dose.
          </motion.p>
        </div>

        {/* Treatment Cards Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {treatments.map((treatment, index) => (
            <motion.div
              key={treatment.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06, duration: 0.5 }}
              className="group relative"
            >
              <Link to={`/treatments/${treatment.slug}`} className="block h-full">
                <div className={`relative h-full overflow-hidden rounded-2xl border bg-pure-white shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${treatment.featured ? 'border-warm-stone/40 ring-1 ring-warm-stone/20' : 'border-neutral-gray/30 hover:border-warm-stone/40'}`}>
                  {/* Featured Badge */}
                  {treatment.featured && (
                    <div className="absolute left-3 top-3 z-20 flex items-center gap-1 rounded-full bg-warm-stone px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-pure-white shadow-lg">
                      <Star className="h-2.5 w-2.5 fill-pure-white" aria-hidden="true" />
                      Popular
                    </div>
                  )}

                  {/* Image Container */}
                  <div className="relative h-44 overflow-hidden sm:h-52">
                    <img
                      src={treatment.image}
                      alt={treatment.imageAlt || treatment.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-rich-black/80 via-rich-black/20 to-transparent" />

                    {/* Price Badge */}
                    <div className="absolute bottom-3 left-3 rounded-full bg-pure-white/95 px-3 py-1.5 text-sm font-bold text-warm-stone shadow-lg backdrop-blur-sm">
                      {treatment.price}
                    </div>

                    {/* Icon Badge */}
                    <div className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full border-2 border-pure-white/40 bg-pure-white/95 text-warm-stone shadow-lg backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                      <treatment.icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="mb-3">
                      <h3 className="font-display text-xl font-bold text-rich-black transition-colors group-hover:text-warm-stone">
                        {treatment.title}
                      </h3>
                      <p className="text-sm font-medium text-warm-stone">{treatment.subtitle}</p>
                    </div>

                    <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                      {treatment.description}
                    </p>

                    {/* Benefits Tags */}
                    <div className="mb-4 flex flex-wrap gap-1.5">
                      {treatment.benefits.map((benefit) => (
                        <span
                          key={benefit}
                          className="rounded-full border border-warm-stone/15 bg-warm-stone/5 px-2.5 py-1 text-xs font-medium text-deep-charcoal"
                        >
                          {benefit}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center justify-between border-t border-neutral-gray/20 pt-4">
                      <span className="text-sm font-semibold text-warm-stone group-hover:text-warm-stone/80">
                        Learn More
                      </span>
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-warm-stone/10 transition-all duration-300 group-hover:bg-warm-stone group-hover:text-pure-white">
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center sm:mt-16"
        >
          <p className="mb-4 text-sm text-muted-foreground">
            Not sure where to start? Take our free assessment.
          </p>
          <Link to="/intake">
            <Button size="lg" className="bg-warm-stone text-pure-white shadow-lg hover:bg-warm-stone/90 hover:shadow-xl transition-all duration-300">
              Start Your Free Assessment
              <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default TreatmentCategories;
