import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Star } from "lucide-react";
import { Link } from "react-router-dom";

const FinalCTA = () => {
  return (
    <section className="relative overflow-hidden py-12 sm:py-16 md:py-20">
      {/* Background - Warm Stone gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-warm-stone via-warm-stone/95 to-deep-charcoal" />
      <div className="absolute inset-0">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-pure-white/10 sm:-right-20 sm:-top-20 sm:h-60 sm:w-60" />
        <div className="absolute -bottom-10 -left-10 h-60 w-60 rounded-full bg-pure-white/5 sm:-bottom-20 sm:-left-20 sm:h-80 sm:w-80" />
      </div>

      <div className="container relative z-10 px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          {/* Trust Badge - Glassmorphic */}
          <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-pure-white/30 bg-pure-white/15 px-3 py-1.5 text-xs font-medium text-pure-white/90 backdrop-blur-md sm:mb-6 sm:gap-2 sm:px-4 sm:py-2 sm:text-sm">
            <Shield className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span>HIPAA Compliant • No Commitment</span>
          </div>

          {/* Headline */}
          <h2 className="mb-4 font-display text-2xl font-bold text-pure-white sm:mb-6 sm:text-3xl md:text-4xl lg:text-5xl">
            Ready to Feel Like Yourself Again?
          </h2>

          {/* Subtitle */}
          <p className="mx-auto mb-6 max-w-xl px-2 text-base text-pure-white/80 sm:mb-8 sm:px-0 sm:text-lg">
            Start your free assessment today. Takes 5 minutes. Completely confidential.
          </p>

          {/* CTAs */}
          <div className="mb-6 flex flex-col items-center justify-center gap-3 sm:mb-8 sm:flex-row sm:gap-4">
            <Link to="/intake" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full bg-pure-white text-warm-stone shadow-lg hover:bg-pure-white/90 sm:w-auto"
              >
                Start Free Assessment
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="w-full border-pure-white/40 bg-pure-white/10 text-pure-white backdrop-blur-sm hover:bg-pure-white/20 sm:w-auto"
            >
              Video Consultation - $99
            </Button>
          </div>

          {/* Rating */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400 sm:h-5 sm:w-5" />
              ))}
            </div>
            <span className="text-xs text-pure-white/80 sm:text-sm">4.9/5 from verified patients</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
