import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BeforeAfterGallery, { BeforeAfterResult } from "@/components/BeforeAfterGallery";
import { motion } from "framer-motion";
import { ArrowRight, Check, Clock, AlertTriangle, Star, Sparkles, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";

export interface TreatmentData {
  category: string;
  title: string;
  subtitle: string;
  description: string;
  price: string;
  heroImage?: string;
  productImage?: string;
  medications: {
    name: string;
    description: string;
    price: string;
    image?: string;
  }[];
  symptoms: string[];
  benefits: string[];
  timeline: { period: string; description: string }[];
  safetyNote?: string;
  icon?: LucideIcon;
  results?: BeforeAfterResult[];
}

interface TreatmentPageTemplateProps {
  treatment: TreatmentData;
}

const TreatmentPageTemplate = ({ treatment }: TreatmentPageTemplateProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-warm-stone/10 via-soft-linen/50 to-pure-white py-20 sm:py-24 md:py-28">
          {/* Hero Background Image */}
          {treatment.heroImage && (
            <div className="absolute inset-0 z-0">
              <img
                src={treatment.heroImage}
                alt={`${treatment.title} treatment`}
                className="h-full w-full object-cover opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-pure-white/60 via-soft-linen/70 to-pure-white" />
            </div>
          )}
          <div className="container relative z-10 px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-5 inline-flex items-center gap-2 rounded-full border border-warm-stone/30 bg-pure-white/80 px-4 py-1.5 text-sm font-medium text-warm-stone shadow-sm backdrop-blur-sm"
              >
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                {treatment.category}
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-5 font-display text-4xl font-bold text-rich-black sm:text-5xl md:text-6xl"
              >
                {treatment.title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="mb-3 text-xl font-semibold text-warm-stone"
              >
                {treatment.subtitle}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mx-auto mb-8 max-w-2xl text-base text-muted-foreground sm:text-lg"
              >
                {treatment.description}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col items-center justify-center gap-4 sm:flex-row"
              >
                <Link to="/intake">
                  <Button size="lg" className="bg-warm-stone text-pure-white shadow-lg hover:bg-warm-stone/90 hover:shadow-xl transition-all duration-300">
                    Start Your Free Assessment
                    <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                  </Button>
                </Link>
                <div className="flex items-center gap-2 rounded-full border border-warm-stone/20 bg-pure-white/80 px-4 py-2 shadow-sm">
                  <Star className="h-4 w-4 fill-warm-stone text-warm-stone" aria-hidden="true" />
                  <span className="text-lg font-bold text-warm-stone">Starting at {treatment.price}</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Medications Section */}
        <section className="py-16 sm:py-20 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-6xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-10 text-center"
              >
                <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-warm-stone/20 bg-warm-stone/10 px-4 py-1.5 text-sm font-medium text-warm-stone">
                  <Shield className="h-3.5 w-3.5" aria-hidden="true" />
                  FDA-Approved Medications
                </span>
                <h2 className="mt-4 font-display text-3xl font-bold text-rich-black sm:text-4xl">
                  Available Treatments
                </h2>
              </motion.div>

              {/* Product Showcase Image */}
              {treatment.productImage && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mb-12 overflow-hidden rounded-2xl border border-warm-stone/10 shadow-xl"
                >
                  <img
                    src={treatment.productImage}
                    alt={`${treatment.title} products and medications`}
                    className="w-full h-64 sm:h-80 md:h-96 object-cover"
                    loading="lazy"
                  />
                </motion.div>
              )}

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {treatment.medications.map((med, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08, duration: 0.5 }}
                    className="group relative flex flex-col overflow-hidden rounded-2xl border border-neutral-gray/30 bg-pure-white shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-warm-stone/40"
                  >
                    {med.image && (
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={med.image}
                          alt={`${med.name} medication`}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-rich-black/60 via-transparent to-transparent" />
                        {/* Price overlay on image */}
                        <div className="absolute bottom-3 left-3 rounded-full bg-pure-white/95 px-3 py-1.5 text-sm font-bold text-warm-stone shadow-lg backdrop-blur-sm">
                          {med.price}
                        </div>
                      </div>
                    )}
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="mb-2 font-display text-xl font-bold text-rich-black transition-colors group-hover:text-warm-stone">
                        {med.name}
                      </h3>
                      <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                        {med.description}
                      </p>
                      {!med.image && (
                        <p className="font-bold text-warm-stone">{med.price}</p>
                      )}
                      <div className="mt-auto flex items-center justify-between border-t border-neutral-gray/20 pt-4">
                        <span className="text-sm font-medium text-warm-stone">Learn more</span>
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-warm-stone/10 transition-all duration-300 group-hover:bg-warm-stone group-hover:text-pure-white">
                          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Symptoms Section */}
        <section className="bg-gradient-to-b from-soft-linen/50 to-pure-white py-16 sm:py-20">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-10 text-center"
              >
                <h2 className="font-display text-3xl font-bold text-rich-black sm:text-4xl">
                  Common Symptoms We Treat
                </h2>
                <p className="mt-3 text-muted-foreground">
                  If you're experiencing any of these, you may benefit from treatment.
                </p>
              </motion.div>
              <div className="grid gap-4 sm:grid-cols-2">
                {treatment.symptoms.map((symptom, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.04 }}
                    className="group flex items-center gap-4 rounded-xl border border-neutral-gray/30 bg-pure-white p-4 shadow-sm transition-all duration-300 hover:border-warm-stone/30 hover:shadow-md"
                  >
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive transition-colors group-hover:bg-destructive/20">
                      <span className="text-lg font-bold">!</span>
                    </div>
                    <p className="text-sm font-medium text-rich-black">{symptom}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 sm:py-20">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-5xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-10 text-center"
              >
                <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-warm-stone/20 bg-warm-stone/10 px-4 py-1.5 text-sm font-medium text-warm-stone">
                  <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                  Treatment Benefits
                </span>
                <h2 className="mt-4 font-display text-3xl font-bold text-rich-black sm:text-4xl">
                  What You'll Experience
                </h2>
              </motion.div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {treatment.benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="group flex items-center gap-4 rounded-xl border border-neutral-gray/30 bg-pure-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-warm-stone/30 hover:shadow-lg"
                  >
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-warm-stone/10 text-warm-stone transition-colors group-hover:bg-warm-stone group-hover:text-pure-white">
                      <Check className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <p className="text-sm font-semibold text-rich-black">{benefit}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Before/After Results Gallery */}
        {treatment.results && treatment.results.length > 0 && (
          <BeforeAfterGallery results={treatment.results} />
        )}

        {/* Timeline Section */}
        <section className="bg-gradient-to-b from-soft-linen/50 to-pure-white py-16 sm:py-20">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-10 text-center"
              >
                <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-warm-stone/20 bg-warm-stone/10 px-4 py-1.5 text-sm font-medium text-warm-stone">
                  <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                  Your Journey
                </span>
                <h2 className="mt-4 font-display text-3xl font-bold text-rich-black sm:text-4xl">
                  What to Expect
                </h2>
              </motion.div>
              <div className="relative">
                <div className="absolute left-6 top-0 hidden h-full w-1 rounded-full bg-gradient-to-b from-warm-stone via-warm-stone/50 to-warm-stone/20 md:block" />
                <div className="space-y-6">
                  {treatment.timeline.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="relative flex gap-5 sm:gap-6"
                    >
                      <div className="relative z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-4 border-pure-white bg-warm-stone text-pure-white shadow-lg">
                        <span className="font-display text-lg font-bold">{index + 1}</span>
                      </div>
                      <div className="flex-1 rounded-2xl border border-neutral-gray/30 bg-pure-white p-5 shadow-md transition-all duration-300 hover:shadow-lg sm:p-6">
                        <h3 className="mb-2 font-display text-lg font-bold text-warm-stone sm:text-xl">{item.period}</h3>
                        <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Safety Note */}
        {treatment.safetyNote && (
          <section className="py-10">
            <div className="container px-4 md:px-6">
              <div className="mx-auto max-w-3xl">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex gap-4 rounded-2xl border border-amber-500/30 bg-amber-50 p-5 shadow-sm sm:p-6"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-amber-500/20">
                    <AlertTriangle className="h-5 w-5 text-amber-600" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-amber-800">Important Safety Information</h3>
                    <p className="text-sm text-amber-700">{treatment.safetyNote}</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="bg-gradient-to-b from-warm-stone/5 to-soft-linen/30 py-16 sm:py-20">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mx-auto max-w-2xl text-center"
            >
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-warm-stone/10">
                <Sparkles className="h-8 w-8 text-warm-stone" aria-hidden="true" />
              </div>
              <h2 className="mb-4 font-display text-3xl font-bold text-rich-black sm:text-4xl">Ready to Get Started?</h2>
              <p className="mb-8 text-lg text-muted-foreground">
                Take the first step toward feeling like yourself again. Our free assessment takes just 5 minutes.
              </p>
              <Link to="/intake">
                <Button size="lg" className="bg-warm-stone text-pure-white shadow-lg hover:bg-warm-stone/90 hover:shadow-xl transition-all duration-300">
                  Start Your Free Assessment
                  <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                </Button>
              </Link>
              <p className="mt-4 text-sm text-muted-foreground">
                No commitment required • Results in 24-48 hours
              </p>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TreatmentPageTemplate;
