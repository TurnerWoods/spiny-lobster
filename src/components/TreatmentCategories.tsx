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
  {
    title: "Mood & Focus",
    subtitle: "for mental\nclarity",
    image: "/images/products/semax-vial.png",
    slug: "mood",
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
    <section
      id="treatments"
      className="bg-soft-linen py-16 sm:py-24 md:py-32 lg:py-40"
      aria-labelledby="treatments-heading"
    >
      <div className="container px-4 sm:px-6">
        {/* Visually hidden heading for screen readers */}
        <h2 id="treatments-heading" className="sr-only">
          Treatment Categories
        </h2>
        {/* Featured Cards - 3 large cards */}
        <div
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3"
          role="list"
          aria-label="Featured treatments"
        >
          {featuredTreatments.map((treatment, index) => (
            <motion.div
              key={treatment.slug}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              role="listitem"
            >
              <Link
                to={`/treatments/${treatment.slug}`}
                className="group relative block overflow-hidden rounded-2xl aspect-[4/3] sm:aspect-[3/4] lg:aspect-[4/3] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 active:scale-[0.98] transition-transform duration-200"
                aria-label={`Learn more about ${treatment.title.replace('\n', ' ')} ${treatment.subtitle}`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${treatment.gradient}`} aria-hidden="true" />

                {/* Dark overlay for text contrast */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent" aria-hidden="true" />

                {/* Product Image */}
                <div className="absolute inset-0 flex items-end justify-end" aria-hidden="true">
                  <OptimizedImage
                    src={treatment.image}
                    alt=""
                    className="h-[70%] w-auto object-contain transition-transform duration-700 ease-out group-hover:scale-105 opacity-90"
                    objectFit="contain"
                  />
                </div>

                {/* Text Content */}
                <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-6 md:p-8">
                  <div>
                    <h3 className="font-display text-[1.375rem] font-semibold leading-tight text-white sm:text-2xl lg:text-[1.65rem] whitespace-pre-line drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
                      {treatment.title}
                    </h3>
                    <p className="mt-1.5 text-[15px] font-light text-white whitespace-pre-line sm:text-sm drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]">
                      {treatment.subtitle}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-[13px] font-medium text-white sm:text-sm drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]" aria-hidden="true">
                    <span className="tracking-wide">LEARN MORE</span>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/60 bg-white/10 backdrop-blur-sm transition-colors duration-300 group-hover:bg-white/30 group-hover:border-white sm:h-8 sm:w-8">
                      <ArrowRight className="h-5 w-5 sm:h-4 sm:w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Compact Cards - 5 smaller cards */}
        <div
          className="mt-4 grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
          role="list"
          aria-label="Additional treatments"
        >
          {compactTreatments.map((treatment, index) => (
            <motion.div
              key={treatment.slug}
              custom={index + 3}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              role="listitem"
            >
              <Link
                to={`/treatments/${treatment.slug}`}
                className="group flex items-center justify-between gap-3 rounded-2xl bg-white p-4 sm:p-5 shadow-sm transition-shadow duration-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 min-h-[72px] active:scale-[0.98] active:shadow-none"
                aria-label={`Learn more about ${treatment.title} ${treatment.subtitle.replace('\n', ' ')}`}
              >
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-[15px] font-semibold text-rich-black sm:text-base leading-tight">
                    {treatment.title}
                  </h3>
                  <p className="mt-1 text-[13px] font-light text-muted-foreground whitespace-pre-line leading-relaxed sm:text-xs">
                    {treatment.subtitle}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-14 w-14 flex-shrink-0 sm:h-16 sm:w-16" aria-hidden="true">
                    <OptimizedImage
                      src={treatment.image}
                      alt=""
                      className="h-full w-full object-contain"
                      objectFit="contain"
                    />
                  </div>
                  <span
                    className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-neutral-gray/30 transition-colors duration-300 group-hover:bg-rich-black group-hover:border-rich-black sm:h-7 sm:w-7"
                    aria-hidden="true"
                  >
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-white transition-colors sm:h-3.5 sm:w-3.5" />
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
