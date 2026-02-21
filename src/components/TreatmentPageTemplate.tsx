import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BeforeAfterGallery, { BeforeAfterResult } from "@/components/BeforeAfterGallery";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Check, Clock, AlertTriangle, Shield, Truck, CreditCard, Sparkles, Package, Star, Pill, BadgeCheck, Zap, Flame, Award, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";
import { useRef } from "react";

export interface TreatmentStack {
  name: string;
  tagline: string;
  products: string[];
  price: string;
  savings: string;
  popular?: boolean;
  image?: string;
}

export interface TreatmentData {
  category: string;
  title: string;
  subtitle: string;
  description: string;
  price: string;
  heroImage?: string;
  productImage?: string;
  inStock?: boolean;
  categoryColor?: string;
  medications: {
    name: string;
    description: string;
    price: string;
    image?: string;
    inStock?: boolean;
    rx?: boolean;
    bestSeller?: boolean;
    mostPopular?: boolean;
    rating?: number;
    reviewCount?: number;
  }[];
  symptoms: string[];
  benefits: string[];
  timeline: { period: string; description: string }[];
  safetyNote?: string;
  icon?: LucideIcon;
  results?: BeforeAfterResult[];
  stacks?: TreatmentStack[];
}

interface TreatmentPageTemplateProps {
  treatment: TreatmentData;
}

// Animation variants for staggered children
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

const TreatmentPageTemplate = ({ treatment }: TreatmentPageTemplateProps) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="overflow-hidden">
        {/* Hero Section - Premium & Immersive */}
        <section ref={heroRef} className="relative overflow-hidden bg-gradient-to-br from-soft-linen via-pure-white to-warm-stone/5 py-12 sm:py-16 md:py-24">
          {/* Decorative background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-warm-stone/5 blur-3xl" />
            <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-warm-stone/5 blur-3xl" />
            <motion.div
              style={{ opacity: heroOpacity, scale: heroScale }}
              className="absolute inset-0"
            >
              {treatment.heroImage && (
                <>
                  <img
                    src={treatment.heroImage}
                    alt={`${treatment.title} hero background`}
                    loading="eager"
                    className="h-full w-full max-w-full object-cover opacity-10"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-soft-linen/90 via-soft-linen/70 to-pure-white" />
                </>
              )}
            </motion.div>
          </div>

          <div className="container relative z-10 px-4 md:px-6">
            <div className="mx-auto max-w-4xl text-center">
              {/* Category & Status Badges */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-6 flex flex-wrap items-center justify-center gap-3"
              >
                <span className="inline-flex items-center gap-1.5 rounded-full bg-warm-stone/10 border border-warm-stone/20 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-warm-stone">
                  {treatment.category}
                </span>
                {treatment.inStock !== false && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-gold/10 border border-accent-gold/25 px-3 py-1.5 text-xs font-semibold text-[#9A8444]">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-gold opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-gold" />
                    </span>
                    In Stock - Ships Today
                  </span>
                )}
              </motion.div>

              {/* Main Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="mb-4 font-display text-2xl font-bold tracking-tight text-rich-black sm:text-3xl md:text-4xl lg:text-5xl"
              >
                {treatment.title}
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.6 }}
                className="mx-auto mb-6 sm:mb-8 max-w-2xl text-base sm:text-lg text-warm-stone/80 font-medium leading-relaxed px-2"
              >
                {treatment.subtitle}
              </motion.p>

              {/* Pricing Block */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="mb-6 sm:mb-8 inline-flex flex-col items-center rounded-2xl bg-pure-white/80 backdrop-blur-sm border border-neutral-gray/30 px-5 sm:px-8 py-4 sm:py-5 shadow-lg w-[calc(100%-2rem)] sm:w-auto max-w-sm mx-auto"
              >
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xs sm:text-sm font-medium text-muted-foreground">Starting at</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-bold tracking-tight text-rich-black">{treatment.price}</span>
                  <span className="text-base sm:text-lg font-medium text-muted-foreground">/month</span>
                </div>
                <div className="mt-3 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-accent-gold flex-shrink-0" />
                    <span>FSA/HSA</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Truck className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-accent-gold flex-shrink-0" />
                    <span>Free Ship</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Shield className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-accent-gold flex-shrink-0" />
                    <span>HIPAA</span>
                  </span>
                </div>
              </motion.div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.6 }}
                className="flex flex-col items-center gap-3 px-4"
              >
                <Link to="/intake" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="group relative h-12 sm:h-14 w-full sm:w-auto overflow-hidden bg-rich-black px-6 sm:px-8 text-sm sm:text-base font-semibold text-pure-white shadow-xl transition-all duration-300 hover:bg-rich-black/90 hover:shadow-2xl hover:scale-[1.02] min-h-[48px]"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      Start Your Free Consultation
                      <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Button>
                </Link>
                <p className="text-xs sm:text-sm text-muted-foreground text-center">
                  5-minute assessment. No commitment required.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Bottom gradient fade */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
        </section>

        {/* Recommended Stacks Section - Premium Bundle Cards */}
        {treatment.stacks && treatment.stacks.length > 0 && (
          <section className="relative py-12 sm:py-16 md:py-24 bg-gradient-to-b from-background via-warm-stone/[0.03] to-background">
            {/* Decorative background */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-warm-stone/[0.02] blur-3xl" />
            </div>

            <div className="container relative z-10 px-4 md:px-6">
              <div className="mx-auto max-w-6xl">
                {/* Section Header */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className="mb-8 sm:mb-12 text-center"
                >
                  <div className="mb-3 sm:mb-4 inline-flex items-center gap-2 rounded-full bg-warm-stone/10 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-warm-stone">
                    <Package className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    Curated Treatment Bundles
                  </div>
                  <h2 className="mb-2 sm:mb-3 font-display text-xl font-bold tracking-tight text-rich-black sm:text-2xl md:text-3xl lg:text-4xl">
                    Recommended Stacks
                  </h2>
                  <p className="mx-auto max-w-xl text-sm sm:text-base text-muted-foreground px-2">
                    Physician-curated combinations for optimal results. Save up to 30% with bundled treatments.
                  </p>
                </motion.div>

                {/* Stack Cards Grid */}
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                >
                  {treatment.stacks.map((stack, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      whileHover={{ y: -4, transition: { duration: 0.2 } }}
                      className={`group relative flex flex-col rounded-2xl bg-pure-white overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl ${
                        stack.popular
                          ? 'ring-2 ring-warm-stone shadow-warm-stone/10'
                          : 'border border-neutral-gray/30 hover:border-warm-stone/30'
                      }`}
                    >
                      {/* Popular Badge - Floating */}
                      {stack.popular && (
                        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20">
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-warm-stone to-warm-stone/90 px-4 py-1.5 text-xs font-bold text-white uppercase tracking-wide shadow-lg">
                            <Star className="h-3 w-3 fill-current" />
                            Most Popular
                          </span>
                        </div>
                      )}

                      {/* Stack Image */}
                      {stack.image && (
                        <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-soft-linen via-neutral-gray/10 to-warm-stone/5">
                          <img
                            src={stack.image}
                            alt={`${stack.name} treatment stack`}
                            loading="lazy"
                            className="h-full w-full max-w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          {/* Savings Badge overlaid on image */}
                          <div className="absolute top-3 right-3 z-10">
                            <span className="inline-flex items-center gap-1 rounded-full bg-accent-gold px-3 py-1.5 text-xs font-bold text-white shadow-lg">
                              <Zap className="h-3 w-3" />
                              {stack.savings}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Card Content */}
                      <div className="p-6 flex-1 flex flex-col">
                        {/* Savings Badge (when no image) */}
                        {!stack.image && (
                          <div className={`self-end ${stack.popular ? 'mt-2' : ''}`}>
                            <span className="inline-flex items-center gap-1 rounded-full bg-accent-gold/15 px-3 py-1 text-xs font-bold text-[#9A8444]">
                              <Zap className="h-3 w-3" />
                              {stack.savings}
                            </span>
                          </div>
                        )}

                        {/* Stack Info */}
                        <div className={`${stack.image ? '' : 'mt-4'} mb-5 flex-1`}>
                          <h3 className="font-display text-xl font-bold text-rich-black leading-tight mb-2">
                            {stack.name}
                          </h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {stack.tagline}
                          </p>
                        </div>

                        {/* Included Products */}
                        <div className="mb-6">
                          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Includes
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {stack.products.map((product, productIndex) => (
                              <span
                                key={productIndex}
                                className="inline-flex items-center gap-1.5 rounded-lg bg-soft-linen px-3 py-1.5 text-xs font-medium text-rich-black border border-neutral-gray/20"
                              >
                                <Pill className="h-3 w-3 text-warm-stone" />
                                {product}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Price & CTA */}
                        <div className="flex flex-col xs:flex-row items-start xs:items-end justify-between gap-3 xs:gap-2 pt-5 border-t border-neutral-gray/20">
                          <div>
                            <p className="text-xs text-muted-foreground mb-0.5">Bundle Price</p>
                            <p className="text-xl sm:text-2xl font-bold text-rich-black tracking-tight">{stack.price}</p>
                          </div>
                          <Link to="/intake" className="w-full xs:w-auto">
                            <Button
                              size="default"
                              className={`group/btn w-full xs:w-auto min-h-[44px] ${
                                stack.popular
                                  ? 'bg-warm-stone hover:bg-warm-stone/90'
                                  : 'bg-rich-black hover:bg-rich-black/90'
                              } text-pure-white shadow-md transition-all hover:shadow-lg`}
                            >
                              Get Started
                              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </section>
        )}

        {/* Individual Medications Section - Premium Cards with Images */}
        <section id="medications" className="py-12 sm:py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-6xl">
              {/* Section Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="mb-12"
              >
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                  <div>
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-warm-stone/10 px-3 py-1.5 text-xs font-medium text-warm-stone">
                      <BadgeCheck className="h-3.5 w-3.5" />
                      FDA-Approved Medications
                    </div>
                    <h2 className="font-display text-2xl font-bold tracking-tight text-rich-black sm:text-3xl">
                      Individual Treatments
                    </h2>
                    <p className="mt-2 text-muted-foreground">
                      Prescribed by licensed physicians, delivered to your door
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {treatment.medications.length} medications available
                  </p>
                </div>
              </motion.div>

              {/* Medication Cards Grid */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              >
                {treatment.medications.map((med, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
                    className="group relative flex flex-col overflow-hidden rounded-2xl border border-neutral-gray/20 bg-pure-white shadow-sm transition-all duration-300 hover:shadow-xl hover:border-warm-stone/30"
                  >
                    {/* Product Image Area */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-soft-linen via-neutral-gray/10 to-warm-stone/5">
                      {med.image ? (
                        <img
                          src={med.image}
                          alt={`${med.name} medication`}
                          loading="lazy"
                          className="h-full w-full max-w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <div className="rounded-full bg-pure-white/80 p-6 shadow-inner">
                            <Pill className="h-10 w-10 text-warm-stone/40" />
                          </div>
                        </div>
                      )}

                      {/* Overlay badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
                        <div className="flex flex-col gap-2">
                          {med.bestSeller && (
                            <Badge className="bg-gradient-to-r from-warm-stone to-warm-stone/80 text-pure-white border-0 shadow-sm">
                              <Star className="mr-1 h-3 w-3 fill-current" />
                              Best Seller
                            </Badge>
                          )}
                          {med.mostPopular && !med.bestSeller && (
                            <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-pure-white border-0 shadow-sm">
                              <Flame className="mr-1 h-3 w-3" />
                              Most Popular
                            </Badge>
                          )}
                          {med.rx !== false && (
                            <Badge className="bg-warm-stone/90 text-pure-white border-0 shadow-sm">
                              <Pill className="mr-1 h-3 w-3" />
                              Rx
                            </Badge>
                          )}
                        </div>
                        {med.inStock !== false && (
                          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-accent-gold px-2 py-0.5 text-[10px] font-semibold text-white shadow-sm">
                            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                            In Stock
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="flex flex-1 flex-col p-5">
                      {/* Medication Name */}
                      <h3 className="font-display text-base font-bold text-rich-black leading-snug mb-2 line-clamp-2 group-hover:text-warm-stone transition-colors">
                        {med.name}
                      </h3>

                      {/* Star Rating */}
                      {med.rating && (
                        <div className="flex items-center gap-1 mb-2">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < Math.floor(med.rating!)
                                  ? "fill-amber-400 text-amber-400"
                                  : "fill-gray-200 text-gray-200"
                              }`}
                            />
                          ))}
                          <span className="ml-1 text-xs text-muted-foreground">
                            {med.rating}
                            {med.reviewCount && ` (${med.reviewCount.toLocaleString()})`}
                          </span>
                        </div>
                      )}

                      {/* Description */}
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4 flex-1">
                        {med.description.split('.')[0]}.
                      </p>

                      {/* Price & Action */}
                      <div className="flex items-end justify-between pt-4 border-t border-neutral-gray/10">
                        <div>
                          <p className="text-xs text-muted-foreground mb-0.5">From</p>
                          <p className="text-xl font-bold tracking-tight text-rich-black">{med.price}</p>
                          <p className="text-xs text-muted-foreground">/month</p>
                        </div>
                        <Link to="/intake">
                          <Button
                            variant="outline"
                            size="sm"
                            className="group/btn border-warm-stone/30 text-warm-stone hover:bg-warm-stone hover:text-pure-white hover:border-warm-stone transition-all"
                          >
                            View Details
                            <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Bottom CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="mt-12 text-center"
              >
                <p className="mb-4 text-sm text-muted-foreground">
                  Not sure which treatment is right for you?
                </p>
                <Link to="/intake">
                  <Button variant="outline" size="lg" className="border-warm-stone/30 text-warm-stone hover:bg-warm-stone hover:text-pure-white">
                    Take Our Free Assessment
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Symptoms Section - Clean Pharmaceutical Design */}
        <section className="relative py-16 sm:py-24 bg-gradient-to-b from-soft-linen/50 to-background overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-warm-stone/[0.03] blur-3xl" />
            <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-warm-stone/[0.03] blur-3xl" />
          </div>

          <div className="container relative z-10 px-4 md:px-6">
            <div className="mx-auto max-w-5xl">
              {/* Section Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="mb-12 text-center"
              >
                <h2 className="mb-3 font-display text-2xl font-bold tracking-tight text-rich-black sm:text-3xl lg:text-4xl">
                  Common Symptoms We Treat
                </h2>
                <p className="mx-auto max-w-xl text-muted-foreground">
                  Our treatments address these conditions with clinically-proven effectiveness
                </p>
              </motion.div>

              {/* Symptoms Grid */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="grid gap-4 sm:grid-cols-2"
              >
                {treatment.symptoms.map((symptom, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="group flex items-start gap-4 rounded-xl bg-pure-white/80 backdrop-blur-sm border border-neutral-gray/20 p-5 transition-all duration-300 hover:bg-pure-white hover:shadow-md hover:border-warm-stone/20"
                  >
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-600 group-hover:bg-rose-500 group-hover:text-white transition-colors duration-300">
                      <AlertTriangle className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-rich-black">{symptom}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Benefits Section - Premium Grid */}
        <section className="py-16 sm:py-24">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-5xl">
              {/* Section Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="mb-12 text-center"
              >
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent-gold/15 px-4 py-2 text-sm font-medium text-[#9A8444]">
                  <Sparkles className="h-4 w-4" />
                  Treatment Benefits
                </div>
                <h2 className="mb-3 font-display text-2xl font-bold tracking-tight text-rich-black sm:text-3xl lg:text-4xl">
                  Why Choose This Treatment
                </h2>
                <p className="mx-auto max-w-xl text-muted-foreground">
                  Evidence-based benefits backed by clinical research
                </p>
              </motion.div>

              {/* Benefits Grid */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              >
                {treatment.benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                    className="group flex items-start gap-4 rounded-xl bg-pure-white border border-neutral-gray/20 p-5 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-accent-gold/30"
                  >
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-accent-gold/15 text-accent-gold group-hover:bg-accent-gold group-hover:text-white transition-colors duration-300">
                      <Check className="h-5 w-5" strokeWidth={3} />
                    </div>
                    <p className="text-sm font-medium text-rich-black leading-relaxed pt-2">{benefit}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Before/After Results Gallery */}
        {treatment.results && treatment.results.length > 0 && (
          <BeforeAfterGallery results={treatment.results} />
        )}

        {/* Timeline Section - Premium Journey View */}
        <section className="relative py-16 sm:py-24 bg-gradient-to-b from-soft-linen/30 to-background overflow-hidden">
          {/* Decorative background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-warm-stone/10 to-transparent" />
          </div>

          <div className="container relative z-10 px-4 md:px-6">
            <div className="mx-auto max-w-4xl">
              {/* Section Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="mb-14 text-center"
              >
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-warm-stone/10 px-4 py-2 text-sm font-medium text-warm-stone">
                  <Clock className="h-4 w-4" />
                  Treatment Timeline
                </div>
                <h2 className="mb-3 font-display text-2xl font-bold tracking-tight text-rich-black sm:text-3xl lg:text-4xl">
                  Your Journey to Results
                </h2>
                <p className="mx-auto max-w-xl text-muted-foreground">
                  A clear roadmap of what to expect during your treatment
                </p>
              </motion.div>

              {/* Timeline */}
              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-warm-stone via-warm-stone/50 to-warm-stone/20 hidden md:block" />

                <div className="space-y-6">
                  {treatment.timeline.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ delay: index * 0.15, duration: 0.5 }}
                      className="relative flex gap-5 sm:gap-8"
                    >
                      {/* Timeline Node */}
                      <div className="relative z-10 flex flex-shrink-0">
                        <div className="flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-warm-stone to-warm-stone/80 text-pure-white shadow-lg shadow-warm-stone/20">
                          <span className="text-lg sm:text-xl font-bold">{index + 1}</span>
                        </div>
                      </div>

                      {/* Content Card */}
                      <div className="flex-1 rounded-2xl bg-pure-white border border-neutral-gray/20 p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                          <h3 className="font-display text-lg sm:text-xl font-bold text-warm-stone">
                            {item.period}
                          </h3>
                          <Badge variant="outline" className="w-fit text-xs">
                            Phase {index + 1}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Safety Note - Premium Alert */}
        {treatment.safetyNote && (
          <section className="py-8 sm:py-12">
            <div className="container px-4 md:px-6">
              <div className="mx-auto max-w-4xl">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="relative overflow-hidden rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50 to-amber-100/50 p-6 sm:p-8"
                >
                  {/* Decorative icon */}
                  <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-amber-200/30 blur-2xl" />

                  <div className="relative flex gap-4 sm:gap-6">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-amber-200 text-amber-700">
                      <AlertTriangle className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-2 font-display text-lg font-bold text-amber-900">
                        Important Safety Information
                      </h3>
                      <p className="text-amber-800/80 leading-relaxed">
                        {treatment.safetyNote}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section - Premium Final Call */}
        <section className="relative py-20 sm:py-28 overflow-hidden">
          {/* Premium dark gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-rich-black via-deep-charcoal to-warm-stone/40" />

          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-1/4 h-64 w-64 rounded-full bg-warm-stone/10 blur-3xl" />
            <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-warm-stone/10 blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-warm-stone/5 blur-3xl" />
          </div>

          <div className="container relative z-10 px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="mx-auto max-w-3xl text-center"
            >
              {/* Badge */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-pure-white/10 backdrop-blur-sm px-4 py-2 text-sm font-medium text-pure-white/90">
                <Sparkles className="h-4 w-4" />
                Start Your Transformation
              </div>

              <h2 className="mb-5 font-display text-3xl font-bold tracking-tight text-pure-white sm:text-4xl lg:text-5xl">
                Ready to Feel Like Yourself Again?
              </h2>
              <p className="mb-10 text-lg text-pure-white/70 leading-relaxed max-w-xl mx-auto">
                Take the first step toward better health. Our free assessment takes just 5 minutes and is completely confidential.
              </p>

              {/* Trust indicators */}
              <div className="flex flex-wrap items-center justify-center gap-6 mb-10">
                {[
                  { icon: Award, text: "US-Licensed Physicians" },
                  { icon: CheckCircle2, text: "FDA-Approved Medications" },
                  { icon: Shield, text: "HIPAA Compliant" },
                  { icon: Truck, text: "Free Shipping" },
                ].map((item, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="flex items-center gap-2 text-sm text-pure-white/80"
                  >
                    <item.icon className="h-4 w-4 text-warm-stone" />
                    {item.text}
                  </motion.span>
                ))}
              </div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <Link to="/intake">
                  <Button
                    size="lg"
                    className="group h-16 px-10 text-lg font-semibold bg-gradient-to-r from-warm-stone to-warm-stone/90 hover:from-warm-stone/90 hover:to-warm-stone text-pure-white shadow-2xl shadow-warm-stone/30 transition-all duration-300 hover:shadow-warm-stone/40 hover:scale-[1.02]"
                  >
                    Start Your Free Consultation
                    <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="mt-6 text-sm text-pure-white/50"
              >
                No insurance needed. Discreet delivery in 3-5 business days.
              </motion.p>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TreatmentPageTemplate;
