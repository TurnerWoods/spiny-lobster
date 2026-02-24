import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BeforeAfterGallery, { BeforeAfterResult } from "@/components/BeforeAfterGallery";
import { motion } from "framer-motion";
import { ArrowRight, Check, Shield, Truck, Star, Pill, BadgeCheck, Zap, Award, CheckCircle2, Package, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";

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

// Minimal, purposeful fade-in for sections
const sectionFade = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" as const },
  transition: { duration: 0.5 },
};

const TreatmentPageTemplate = ({ treatment }: TreatmentPageTemplateProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* ── SECTION 1: HERO ── */}
        <section className="relative bg-gradient-to-br from-soft-linen via-pure-white to-warm-stone/5 py-12 sm:py-16 lg:py-20">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-4xl text-center">
              {/* Badges */}
              <div className="mb-5 flex flex-wrap items-center justify-center gap-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-warm-stone">
                  {treatment.category}
                </span>
                {treatment.inStock !== false && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-gold/10 border border-accent-gold/25 px-3 py-1 text-xs font-semibold text-[#9A8444]">
                    <span className="h-2 w-2 rounded-full bg-accent-gold animate-pulse" />
                    In Stock - Ships Today
                  </span>
                )}
              </div>

              <h1 className="mb-3 font-display text-3xl font-bold tracking-tight text-rich-black sm:text-4xl lg:text-5xl">
                {treatment.title}
              </h1>

              <p className="mx-auto mb-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
                {treatment.subtitle}
              </p>

              {/* Pricing Block */}
              <div className="mb-6 inline-flex flex-col items-center rounded-2xl bg-pure-white border border-neutral-gray/30 px-6 py-4 shadow-md">
                <span className="text-xs text-muted-foreground">Starting at</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-rich-black">{treatment.price}</span>
                  <span className="text-base text-muted-foreground">/month</span>
                </div>
                <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Check className="h-3.5 w-3.5 text-accent-gold" /> FSA/HSA
                  </span>
                  <span className="flex items-center gap-1">
                    <Truck className="h-3.5 w-3.5 text-accent-gold" /> Free Ship
                  </span>
                  <span className="flex items-center gap-1">
                    <Shield className="h-3.5 w-3.5 text-accent-gold" /> HIPAA
                  </span>
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col items-center gap-2">
                <Link to="/intake" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="h-12 w-full sm:w-auto sm:px-8 bg-rich-black text-pure-white hover:bg-rich-black/90 shadow-lg"
                  >
                    Start Free Assessment
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <p className="text-xs text-muted-foreground">
                  5-minute form · No login required · No commitment
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 2: MEDICATIONS ── */}
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-6xl">
              <motion.div {...sectionFade} className="mb-8">
                <div className="flex items-center gap-2 text-xs font-medium text-warm-stone mb-2">
                  <BadgeCheck className="h-4 w-4" />
                  FDA-Approved Medications
                </div>
                <h2 className="font-display text-2xl font-bold text-rich-black sm:text-3xl">
                  Available Treatments
                </h2>
              </motion.div>

              {/* Stacks (if any) */}
              {treatment.stacks && treatment.stacks.length > 0 && (
                <div className="mb-10">
                  <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    <Package className="inline h-4 w-4 mr-1" />
                    Recommended Bundles
                  </p>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {treatment.stacks.map((stack, i) => (
                      <div
                        key={i}
                        className={`relative rounded-2xl bg-pure-white overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 ${
                          stack.popular
                            ? "ring-2 ring-warm-stone"
                            : "border border-neutral-gray/20"
                        }`}
                      >
                        {stack.popular && (
                          <div className="bg-warm-stone text-pure-white text-center py-1.5 text-xs font-bold uppercase tracking-wide">
                            <Star className="inline h-3 w-3 mr-1 fill-current" /> Most Popular
                          </div>
                        )}
                        {stack.image && (
                          <div className="aspect-[16/10] overflow-hidden bg-soft-linen">
                            <img src={stack.image} alt={stack.name} loading="lazy" className="h-full w-full object-cover" />
                          </div>
                        )}
                        <div className="p-5">
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="font-display text-lg font-bold text-rich-black">{stack.name}</h3>
                            <span className="inline-flex items-center gap-1 rounded-full bg-accent-gold/15 px-2.5 py-1 text-xs font-bold text-[#9A8444]">
                              <Zap className="h-3 w-3" /> {stack.savings}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-4">{stack.tagline}</p>
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {stack.products.map((p, j) => (
                              <span key={j} className="text-xs bg-soft-linen rounded-md px-2 py-1 text-rich-black">
                                {p}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-end justify-between pt-4 border-t border-neutral-gray/15">
                            <p className="text-xl font-bold text-rich-black">{stack.price}</p>
                            <Link to="/intake">
                              <Button size="sm" className={stack.popular ? "bg-warm-stone hover:bg-warm-stone/90" : "bg-rich-black hover:bg-rich-black/90"}>
                                Get Started <ArrowRight className="ml-1 h-3.5 w-3.5" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Individual Medications */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {treatment.medications.map((med, i) => (
                  <div
                    key={i}
                    className="group flex flex-col overflow-hidden rounded-xl border border-neutral-gray/20 bg-pure-white hover:shadow-lg hover:border-warm-stone/30 transition-all duration-300"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-soft-linen to-warm-stone/5">
                      {med.image ? (
                        <img src={med.image} alt={med.name} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <Pill className="h-10 w-10 text-warm-stone/30" />
                        </div>
                      )}
                      <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
                        {med.bestSeller && (
                          <Badge className="bg-warm-stone text-pure-white border-0 text-[10px]">
                            <Star className="mr-1 h-2.5 w-2.5 fill-current" /> Best Seller
                          </Badge>
                        )}
                        {med.rx !== false && (
                          <Badge className="bg-warm-stone/80 text-pure-white border-0 text-[10px]">Rx</Badge>
                        )}
                      </div>
                      {med.inStock !== false && (
                        <span className="absolute top-2.5 right-2.5 inline-flex items-center gap-1 rounded-full bg-accent-gold px-2 py-0.5 text-[10px] font-semibold text-white">
                          <span className="h-1.5 w-1.5 rounded-full bg-white" /> In Stock
                        </span>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-4">
                      <h3 className="font-display text-sm font-bold text-rich-black mb-1 group-hover:text-warm-stone transition-colors">
                        {med.name}
                      </h3>
                      {med.rating && (
                        <div className="flex items-center gap-0.5 mb-1.5">
                          {[...Array(5)].map((_, j) => (
                            <Star key={j} className={`h-2.5 w-2.5 ${j < Math.floor(med.rating!) ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}`} />
                          ))}
                          <span className="ml-1 text-[10px] text-muted-foreground">{med.rating}{med.reviewCount && ` (${med.reviewCount.toLocaleString()})`}</span>
                        </div>
                      )}
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-3 flex-1">{med.description.split('.')[0]}.</p>
                      <div className="flex items-end justify-between pt-3 border-t border-neutral-gray/10">
                        <div>
                          <p className="text-[10px] text-muted-foreground">From</p>
                          <p className="text-lg font-bold text-rich-black">{med.price}</p>
                        </div>
                        <Link to="/intake">
                          <Button variant="outline" size="sm" className="text-xs border-warm-stone/30 text-warm-stone hover:bg-warm-stone hover:text-pure-white">
                            View Details <ArrowRight className="ml-1 h-3 w-3" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 3: SOCIAL PROOF + BENEFITS ── */}
        <section className="py-12 sm:py-16 lg:py-20 bg-soft-linen/40">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-5xl">
              {/* Benefits as compact pills (not individual animated cards) */}
              <motion.div {...sectionFade} className="mb-10 text-center">
                <h2 className="mb-6 font-display text-2xl font-bold text-rich-black sm:text-3xl">
                  Why Patients Choose This Treatment
                </h2>
                <div className="flex flex-wrap justify-center gap-2.5">
                  {treatment.benefits.slice(0, 8).map((benefit, i) => (
                    <span key={i} className="inline-flex items-center gap-2 rounded-full bg-pure-white border border-neutral-gray/20 px-4 py-2 text-sm text-rich-black shadow-sm">
                      <Check className="h-4 w-4 text-accent-gold flex-shrink-0" />
                      {benefit}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Before/After Results */}
              {treatment.results && treatment.results.length > 0 && (
                <BeforeAfterGallery results={treatment.results} />
              )}

              {/* Symptoms - compact two-column */}
              {treatment.symptoms.length > 0 && (
                <motion.div {...sectionFade} className="mt-10">
                  <h3 className="mb-4 text-center font-display text-lg font-bold text-rich-black">
                    Common Symptoms We Address
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-w-3xl mx-auto">
                    {treatment.symptoms.slice(0, 9).map((symptom, i) => (
                      <div key={i} className="flex items-center gap-2 rounded-lg bg-pure-white border border-neutral-gray/15 px-3 py-2.5 text-sm text-rich-black">
                        <span className="h-1.5 w-1.5 rounded-full bg-rose-400 flex-shrink-0" />
                        {symptom}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* ── SECTION 4: HOW IT WORKS (3 steps) ── */}
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-4xl">
              <motion.div {...sectionFade} className="mb-10 text-center">
                <h2 className="font-display text-2xl font-bold text-rich-black sm:text-3xl">
                  How It Works
                </h2>
              </motion.div>

              <div className="grid sm:grid-cols-3 gap-6">
                {[
                  { step: "1", title: "Free Assessment", desc: "Answer questions about your symptoms and goals. Takes 5 minutes, no login required.", icon: CheckCircle2 },
                  { step: "2", title: "Physician Review", desc: "A licensed Texas physician reviews your profile and prescribes treatment within 24 hours.", icon: Award },
                  { step: "3", title: "Delivered to You", desc: "FDA-approved medications shipped free and discreetly to your door in 3-5 days.", icon: Truck },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                    className="text-center"
                  >
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-warm-stone to-warm-stone/80 text-pure-white shadow-lg">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <p className="text-xs font-bold uppercase tracking-wider text-warm-stone mb-1">Step {item.step}</p>
                    <h3 className="font-display text-lg font-bold text-rich-black mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>

              {/* Timeline (compact, if provided) */}
              {treatment.timeline.length > 0 && (
                <motion.div {...sectionFade} className="mt-12">
                  <h3 className="mb-4 text-center font-display text-lg font-bold text-rich-black flex items-center justify-center gap-2">
                    <Clock className="h-5 w-5 text-warm-stone" /> Expected Timeline
                  </h3>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-0">
                    {treatment.timeline.map((item, i) => (
                      <div key={i} className="flex-1 relative">
                        <div className="rounded-xl bg-pure-white border border-neutral-gray/20 p-4 sm:mx-1 hover:shadow-md transition-shadow">
                          <p className="text-sm font-bold text-warm-stone mb-1">{item.period}</p>
                          <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
                        </div>
                        {i < treatment.timeline.length - 1 && (
                          <div className="hidden sm:block absolute top-1/2 -right-1 w-2 h-0.5 bg-warm-stone/30" />
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* Safety Note (inline, not a full section) */}
        {treatment.safetyNote && (
          <div className="container px-4 md:px-6 pb-8">
            <div className="mx-auto max-w-4xl rounded-xl bg-amber-50 border border-amber-200 p-4 text-sm text-amber-800">
              <strong>Safety:</strong> {treatment.safetyNote}
            </div>
          </div>
        )}

        {/* ── SECTION 5: FINAL CTA ── */}
        <section className="py-16 sm:py-20 bg-gradient-to-br from-rich-black via-deep-charcoal to-warm-stone/30">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="mb-4 font-display text-2xl font-bold text-pure-white sm:text-3xl lg:text-4xl">
                Ready to Get Started?
              </h2>
              <p className="mb-6 text-pure-white/70">
                5-minute assessment. No insurance needed. No login required.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 mb-8 text-sm text-pure-white/70">
                <span className="flex items-center gap-1.5"><Award className="h-4 w-4 text-warm-stone" /> US-Licensed</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-warm-stone" /> FDA-Approved</span>
                <span className="flex items-center gap-1.5"><Shield className="h-4 w-4 text-warm-stone" /> HIPAA</span>
                <span className="flex items-center gap-1.5"><Truck className="h-4 w-4 text-warm-stone" /> Free Shipping</span>
              </div>

              <Link to="/intake">
                <Button size="lg" className="h-14 px-10 text-base font-semibold bg-warm-stone hover:bg-warm-stone/90 text-pure-white shadow-xl">
                  Start Free Assessment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <p className="mt-4 text-xs text-pure-white/40">
                Discreet delivery in 3-5 business days. Cancel anytime.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TreatmentPageTemplate;
