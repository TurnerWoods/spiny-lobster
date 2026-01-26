import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { ArrowRight, Check, Zap, Clock, TrendingUp, Brain, Dumbbell, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

// Treatment data based on route
const treatmentData: Record<string, {
  title: string;
  subtitle: string;
  description: string;
  price: string;
  symptoms: string[];
  benefits: string[];
  timeline: { period: string; description: string }[];
}> = {
  testosterone: {
    title: "Testosterone Cypionate",
    subtitle: "The Gold Standard for TRT",
    description: "Low testosterone affects millions of men, often without them realizing it. Fatigue, decreased motivation, weight gain, and declining performance aren't inevitable parts of aging. Testosterone replacement therapy can help you feel like yourself again.",
    price: "$149/month",
    symptoms: [
      "Persistent fatigue despite adequate sleep",
      "Decreased motivation and mental sharpness",
      "Difficulty maintaining muscle mass",
      "Increased body fat, especially around the midsection",
      "Reduced libido and sexual performance",
      "Mood changes, including irritability or mild depression",
      "Poor sleep quality",
    ],
    benefits: [
      "Increased energy and vitality",
      "Improved mood and motivation",
      "Better body composition",
      "Enhanced mental clarity",
      "Improved sleep quality",
      "Increased strength and endurance",
    ],
    timeline: [
      { period: "Week 1-2", description: "Initial improvements in energy and mood" },
      { period: "Week 3-4", description: "Noticeable increase in motivation and mental clarity" },
      { period: "Month 2-3", description: "Improvements in body composition and physical performance" },
      { period: "Month 3-6", description: "Optimal results as hormone levels stabilize" },
    ],
  },
  sermorelin: {
    title: "Sermorelin",
    subtitle: "Growth Hormone Support",
    description: "A growth hormone releasing peptide that supports natural hormone production, recovery, and body composition. Often used alongside TRT for comprehensive optimization.",
    price: "$199/month",
    symptoms: [
      "Slow recovery from workouts",
      "Poor sleep quality",
      "Loss of lean muscle mass",
      "Increased body fat",
      "Low energy levels",
      "Aging skin and reduced collagen",
    ],
    benefits: [
      "Supports natural GH production",
      "Improved recovery times",
      "Better sleep quality",
      "Enhanced body composition",
      "Increased energy",
      "Anti-aging benefits",
    ],
    timeline: [
      { period: "Week 1-2", description: "Improved sleep quality often noticed first" },
      { period: "Week 3-4", description: "Better recovery and increased energy" },
      { period: "Month 2-3", description: "Noticeable improvements in body composition" },
      { period: "Month 3-6", description: "Full benefits as GH levels optimize" },
    ],
  },
  tesamorelin: {
    title: "Tesamorelin",
    subtitle: "Metabolic Optimization",
    description: "Targets stubborn abdominal and visceral fat while supporting improved body composition. Enhances fat-burning efficiency for lasting metabolic benefits.",
    price: "$199/month",
    symptoms: [
      "Stubborn belly fat",
      "Slow metabolism",
      "Difficulty losing weight",
      "Low energy levels",
      "Poor body composition despite diet and exercise",
    ],
    benefits: [
      "Reduces visceral fat",
      "Improves metabolic efficiency",
      "Supports lean body mass",
      "Enhanced fat burning",
      "Better body composition",
      "Increased energy",
    ],
    timeline: [
      { period: "Week 1-2", description: "Metabolic processes begin to optimize" },
      { period: "Week 3-4", description: "Initial changes in body composition" },
      { period: "Month 2-3", description: "Noticeable reduction in abdominal fat" },
      { period: "Month 3-6", description: "Significant improvements in body composition" },
    ],
  },
  nad: {
    title: "NAD+",
    subtitle: "Cellular Energy & Anti-Aging",
    description: "Enhances metabolic efficiency and energy production at the cellular level. Supports faster recovery, improved stamina, mental clarity, and anti-aging benefits.",
    price: "$199/month",
    symptoms: [
      "Chronic fatigue",
      "Brain fog and poor focus",
      "Slow recovery",
      "Signs of aging",
      "Low energy throughout the day",
      "Poor exercise performance",
    ],
    benefits: [
      "Enhanced cellular energy",
      "Improved mental clarity",
      "Anti-aging at cellular level",
      "Better recovery",
      "Increased stamina",
      "Supports DNA repair",
    ],
    timeline: [
      { period: "Week 1-2", description: "Increased energy and mental clarity" },
      { period: "Week 3-4", description: "Improved focus and stamina" },
      { period: "Month 2-3", description: "Enhanced recovery and performance" },
      { period: "Month 3-6", description: "Full anti-aging and cellular benefits" },
    ],
  },
};

const TRTPage = () => {
  const location = useLocation();
  const treatmentKey = location.pathname.split("/").pop() || "testosterone";
  const treatment = treatmentData[treatmentKey] || treatmentData.testosterone;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/10 to-background py-20">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-4 inline-block rounded-full bg-primary-light px-4 py-1 text-sm font-medium text-primary"
              >
                {treatment.subtitle}
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-6 font-display text-4xl font-bold text-foreground md:text-5xl"
              >
                {treatment.title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-8 text-lg text-muted-foreground"
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

        {/* Symptoms Section */}
        <section className="py-20">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-4xl">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-8 text-center font-display text-3xl font-bold text-foreground"
              >
                Common Symptoms
              </motion.h2>
              <div className="grid gap-4 md:grid-cols-2">
                {treatment.symptoms.map((symptom, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-start gap-3 rounded-xl border bg-card p-4"
                  >
                    <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-destructive/20 text-destructive">
                      <span className="text-sm">•</span>
                    </div>
                    <p className="text-muted-foreground">{symptom}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="bg-muted/30 py-20">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-4xl">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-8 text-center font-display text-3xl font-bold text-foreground"
              >
                Benefits
              </motion.h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {treatment.benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-start gap-3 rounded-xl border bg-card p-4"
                  >
                    <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                    <p className="font-medium text-foreground">{benefit}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-20">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-8 text-center font-display text-3xl font-bold text-foreground"
              >
                What to Expect
              </motion.h2>
              <div className="relative">
                <div className="absolute left-6 top-0 hidden h-full w-0.5 bg-gradient-to-b from-primary via-primary/50 to-primary md:block" />
                <div className="space-y-6">
                  {treatment.timeline.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="relative flex gap-6"
                    >
                      <div className="relative z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-4 border-background bg-primary shadow-lg">
                        <Clock className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <div className="flex-1 rounded-xl border bg-card p-6">
                        <h3 className="mb-2 font-display text-lg font-bold text-primary">{item.period}</h3>
                        <p className="text-muted-foreground">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-muted/30 py-20">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mx-auto max-w-2xl text-center"
            >
              <h2 className="mb-4 font-display text-3xl font-bold text-foreground">Ready to Get Started?</h2>
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

export default TRTPage;
