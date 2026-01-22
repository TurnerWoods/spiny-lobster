import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Clock, Truck } from "lucide-react";
import AnimatedHeroText from "./AnimatedHeroText";
import StatsCounter from "./StatsCounter";

const Hero = () => {
  return (
    <section className="relative overflow-hidden gradient-hero-bg">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-primary/5" />
        <div className="absolute -left-20 top-1/2 h-60 w-60 rounded-full bg-primary/5" />
      </div>

      <div className="container relative px-4 py-16 md:px-6 md:py-24 lg:py-32">
        <div className="mx-auto max-w-4xl text-center">
          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-light px-4 py-2 text-sm font-medium text-primary"
          >
            <Shield className="h-4 w-4" />
            <span>HIPAA Compliant • Licensed US Providers</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Stop treating{" "}
            <AnimatedHeroText />
            <br className="hidden sm:block" />
            <span className="mt-2 block sm:inline"> Start living again.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl"
          >
            Clinically proven GLP-1, peptides, and hormone therapy prescribed by licensed providers. 
            No waiting rooms, no hidden fees—just results.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button size="lg" className="bg-primary px-8 text-lg hover:bg-primary-dark">
              Start Free Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg" asChild>
              <a href="#treatments">View Treatments</a>
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <span>HIPAA Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <span>Same-Day Consults</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-primary" />
              <span>Free Shipping</span>
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <StatsCounter />
      </div>
    </section>
  );
};

export default Hero;