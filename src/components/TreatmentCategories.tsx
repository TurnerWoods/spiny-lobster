import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { easing, duration, viewportSettings } from "@/lib/motion";

const premiumEase = [0.16, 1, 0.3, 1] as const;

// Featured (large) cards - top row
const featuredTreatments = [
  {
    title: "Personalized\nGLP-1 Treatments",
    subtitle: "for weight loss",
    image: "/images/products/semaglutide-vial.png",
    slug: "weight-loss",
    gradient: "from-[hsl(145,35%,55%)] to-[hsl(160,30%,45%)]",
  },
  {
    title: "Testosterone",
    subtitle: "for hormone optimization",
    image: "/images/products/testosterone-vial.png",
    slug: "hormones",
    gradient: "from-[hsl(25,30%,55%)] to-[hsl(15,35%,45%)]",
  },
  {
    title: "NAD+",
    subtitle: "for energy and\nlongevity",
    image: "/images/products/nad-vial.png",
    slug: "anti-aging",
    gradient: "from-[hsl(200,50%,65%)] to-[hsl(210,45%,50%)]",
  },
];

// Compact cards - bottom row
const compactTreatments = [
  {
    title: "Peptides",
    subtitle: "for strength\nand recovery",
    image: "/images/products/wolverine-stack.png",
    slug: "strength",
  },
  {
    title: "Hair Restoration",
    subtitle: "for hair\nregrowth",
    image: "/images/products/hair-restoration-kit.png",
    slug: "hair",
  },
  {
    title: "Sexual Health",
    subtitle: "for intimate\nwellness",
    image: "/images/products/pt141-vial.png",
    slug: "sexual-health",
  },
  {
    title: "Skin Care",
    subtitle: "for rejuvenation\nand glow",
    image: "/images/products/ghk-cu-vial.png",
    slug: "skin",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.slow,
      delay: index * 0.08,
      ease: premiumEase,
    },
  }),
};

const TreatmentCategories = () => {
  return (
    <section id="treatments" className="bg-soft-linen py-16 sm:py-24 md:py-32 lg:py-40">
      <div className="container px-4 sm:px-6">
        {/* Featured Cards - 3 large cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredTreatments.map((treatment, index) => (
            <motion.div
              key={treatment.slug}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              <Link
                to={`/treatments/${treatment.slug}`}
                className="group relative block overflow-hidden rounded-2xl aspect-[4/3] sm:aspect-[3/4] lg:aspect-[4/3]"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${treatment.gradient}`} />
                
                {/* Product Image */}
                <div className="absolute inset-0 flex items-end justify-end">
                  <OptimizedImage
                    src={treatment.image}
                    alt={treatment.title}
                    className="h-[70%] w-auto object-contain transition-transform duration-700 ease-out group-hover:scale-105 opacity-90"
                    objectFit="contain"
                  />
                </div>

                {/* Text Content */}
                <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8">
                  <div>
                    <h3 className="font-display text-xl font-semibold leading-tight text-white sm:text-2xl lg:text-[1.65rem] whitespace-pre-line">
                      {treatment.title}
                    </h3>
                    <p className="mt-1 text-sm font-light text-white/80 whitespace-pre-line">
                      {treatment.subtitle}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-sm font-medium text-white">
                    <span>LEARN MORE</span>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 transition-colors duration-300 group-hover:bg-white/20">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Compact Cards - 4 smaller cards */}
        <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {compactTreatments.map((treatment, index) => (
            <motion.div
              key={treatment.slug}
              custom={index + 3}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              <Link
                to={`/treatments/${treatment.slug}`}
                className="group flex items-center justify-between gap-3 rounded-2xl bg-white p-4 sm:p-5 shadow-sm transition-shadow duration-300 hover:shadow-md"
              >
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-sm font-semibold text-rich-black sm:text-base">
                    {treatment.title}
                  </h3>
                  <p className="mt-0.5 text-xs font-light text-muted-foreground whitespace-pre-line leading-relaxed">
                    {treatment.subtitle}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-14 w-14 flex-shrink-0 sm:h-16 sm:w-16">
                    <OptimizedImage
                      src={treatment.image}
                      alt={treatment.title}
                      className="h-full w-full object-contain"
                      objectFit="contain"
                    />
                  </div>
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-neutral-gray/30 transition-colors duration-300 group-hover:bg-rich-black group-hover:border-rich-black">
                    <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-white transition-colors" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TreatmentCategories;
