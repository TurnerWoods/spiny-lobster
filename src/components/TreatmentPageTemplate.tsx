import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { ArrowRight, Check, Clock, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";

export interface TreatmentData {
  category: string;
  title: string;
  subtitle: string;
  description: string;
  price: string;
  medications: {
    name: string;
    description: string;
    price: string;
  }[];
  symptoms: string[];
  benefits: string[];
  timeline: { period: string; description: string }[];
  safetyNote?: string;
  icon?: LucideIcon;
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
        <section className="bg-gradient-to-b from-primary/10 to-background py-16 sm:py-20">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-4 inline-block rounded-full bg-primary-light px-4 py-1 text-sm font-medium text-primary"
              >
                {treatment.category}
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-4 font-display text-3xl font-bold text-foreground sm:text-4xl md:text-5xl"
              >
                {treatment.title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="mb-2 text-lg font-medium text-primary"
              >
                {treatment.subtitle}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-8 text-base text-muted-foreground sm:text-lg"
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
                  <Button size="lg" className="bg-primary hover:bg-primary-dark">
                    Start Your Free Assessment
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <p className="text-lg font-bold text-primary">Starting at {treatment.price}</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Medications Section */}
        <section className="py-12 sm:py-20">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-5xl">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-8 text-center font-display text-2xl font-bold text-foreground sm:text-3xl"
              >
                Available Medications
              </motion.h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {treatment.medications.map((med, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex flex-col rounded-xl border bg-card p-6"
                  >
                    <h3 className="mb-2 font-display text-lg font-bold text-foreground">{med.name}</h3>
                    <p className="mb-4 flex-1 text-sm text-muted-foreground">{med.description}</p>
                    <p className="font-bold text-primary">{med.price}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Symptoms Section */}
        <section className="bg-muted/30 py-12 sm:py-20">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-4xl">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-8 text-center font-display text-2xl font-bold text-foreground sm:text-3xl"
              >
                Common Symptoms We Treat
              </motion.h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {treatment.symptoms.map((symptom, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.03 }}
                    className="flex items-start gap-3 rounded-xl border bg-card p-4"
                  >
                    <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-destructive/20 text-destructive">
                      <span className="text-xs">•</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{symptom}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-12 sm:py-20">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-4xl">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-8 text-center font-display text-2xl font-bold text-foreground sm:text-3xl"
              >
                Benefits
              </motion.h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {treatment.benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.03 }}
                    className="flex items-start gap-3 rounded-xl border bg-card p-4"
                  >
                    <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                    <p className="text-sm font-medium text-foreground">{benefit}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="bg-muted/30 py-12 sm:py-20">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-8 text-center font-display text-2xl font-bold text-foreground sm:text-3xl"
              >
                What to Expect
              </motion.h2>
              <div className="relative">
                <div className="absolute left-6 top-0 hidden h-full w-0.5 bg-gradient-to-b from-primary via-primary/50 to-primary md:block" />
                <div className="space-y-4 sm:space-y-6">
                  {treatment.timeline.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="relative flex gap-4 sm:gap-6"
                    >
                      <div className="relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-4 border-background bg-primary shadow-lg sm:h-12 sm:w-12">
                        <Clock className="h-4 w-4 text-primary-foreground sm:h-5 sm:w-5" />
                      </div>
                      <div className="flex-1 rounded-xl border bg-card p-4 sm:p-6">
                        <h3 className="mb-2 font-display text-base font-bold text-primary sm:text-lg">{item.period}</h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
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
          <section className="py-8">
            <div className="container px-4 md:px-6">
              <div className="mx-auto max-w-3xl">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex gap-4 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 sm:p-6"
                >
                  <AlertTriangle className="h-5 w-5 flex-shrink-0 text-amber-500" />
                  <p className="text-sm text-muted-foreground">{treatment.safetyNote}</p>
                </motion.div>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-12 sm:py-20">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mx-auto max-w-2xl text-center"
            >
              <h2 className="mb-4 font-display text-2xl font-bold text-foreground sm:text-3xl">Ready to Get Started?</h2>
              <p className="mb-8 text-muted-foreground">
                Take the first step toward feeling like yourself again. Our free assessment takes just 5 minutes.
              </p>
              <Link to="/intake">
                <Button size="lg" className="bg-primary hover:bg-primary-dark">
                  Start Your Free Assessment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TreatmentPageTemplate;
