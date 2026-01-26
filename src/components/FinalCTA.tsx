import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Star } from "lucide-react";
import { Link } from "react-router-dom";

const FinalCTA = () => {
  return (
    <section className="relative overflow-hidden py-20">
      {/* Background */}
      <div className="absolute inset-0 gradient-bg opacity-95" />
      <div className="absolute inset-0">
        <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-white/10" />
        <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-white/5" />
      </div>

      <div className="container relative z-10 px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          {/* Trust Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white/90">
            <Shield className="h-4 w-4" />
            <span>HIPAA Compliant • No Commitment Required</span>
          </div>

          {/* Headline */}
          <h2 className="mb-6 font-display text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            Ready to Feel Like Yourself Again?
          </h2>

          {/* Subtitle */}
          <p className="mx-auto mb-8 max-w-xl text-lg text-white/80">
            Start your free assessment today. Takes 5 minutes. No commitment. Completely confidential.
            Your card is only charged if you're approved.
          </p>

          {/* CTAs */}
          <div className="mb-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to="/intake">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90"
              >
                Start Your Free Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10"
            >
              Book Video Consultation - $99
            </Button>
          </div>

          {/* Rating */}
          <div className="flex items-center justify-center gap-2">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-sm text-white/80">4.9/5 from verified patient reviews</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
