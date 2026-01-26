import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Clock, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import StatsCounter from "./StatsCounter";
import heroVideo from "@/assets/hero-video.mp4";

const Hero = () => {
  return (
    <section className="relative min-h-[85vh] overflow-hidden sm:min-h-[90vh]">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        {/* Warm gradient overlay for glassmorphic effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-rich-black/50 via-deep-charcoal/40 to-rich-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-warm-stone/20 via-transparent to-warm-stone/20" />
      </div>

      <div className="container relative z-10 px-4 py-16 sm:py-20 md:px-6 md:py-28 lg:py-36">
        <div className="mx-auto max-w-4xl text-center">
          {/* Trust Badge - Glassmorphic */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-pure-white/30 bg-pure-white/15 px-3 py-1.5 text-xs font-medium text-pure-white shadow-lg backdrop-blur-md sm:mb-6 sm:gap-2 sm:px-4 sm:py-2 sm:text-sm"
          >
            <Shield className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span>HIPAA Compliant • Texas Physicians</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-4 font-display text-3xl font-bold tracking-tight text-pure-white drop-shadow-lg sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl"
          >
            Reclaim Your Edge.
            <br />
            <span className="text-warm-stone">Elevate Your Life.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mb-6 max-w-2xl px-2 text-base text-pure-white/85 drop-shadow-sm sm:mb-8 sm:px-0 sm:text-lg md:text-xl"
          >
            Premium testosterone therapy and men's health optimization, delivered discreetly to Texas professionals.
          </motion.p>

          {/* CTAs - Glassmorphic */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-8 flex flex-col items-center justify-center gap-3 sm:mb-12 sm:flex-row sm:gap-4"
          >
            <Link to="/intake" className="w-full sm:w-auto">
              <Button size="lg" className="w-full bg-warm-stone px-6 text-base text-pure-white shadow-lg transition-all hover:bg-warm-stone/90 hover:shadow-xl sm:w-auto sm:px-8 sm:text-lg">
                Start Free Assessment
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline" 
              className="w-full border-pure-white/40 bg-pure-white/15 text-base text-pure-white shadow-lg backdrop-blur-md transition-all hover:bg-pure-white/25 hover:border-pure-white/50 sm:w-auto sm:text-lg" 
              asChild
            >
              <a href="#treatments">View Treatments</a>
            </Button>
          </motion.div>

          {/* Trust Indicators - Glassmorphic Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="hidden flex-wrap items-center justify-center gap-3 sm:flex sm:gap-4"
          >
            <div className="flex items-center gap-1.5 rounded-full border border-pure-white/20 bg-pure-white/10 px-3 py-1.5 backdrop-blur-sm sm:gap-2 sm:px-4 sm:py-2">
              <Shield className="h-4 w-4 text-warm-stone sm:h-5 sm:w-5" />
              <span className="text-xs text-pure-white/90 sm:text-sm">HIPAA Compliant</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-full border border-pure-white/20 bg-pure-white/10 px-3 py-1.5 backdrop-blur-sm sm:gap-2 sm:px-4 sm:py-2">
              <Clock className="h-4 w-4 text-warm-stone sm:h-5 sm:w-5" />
              <span className="text-xs text-pure-white/90 sm:text-sm">24hr Response</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-full border border-pure-white/20 bg-pure-white/10 px-3 py-1.5 backdrop-blur-sm sm:gap-2 sm:px-4 sm:py-2">
              <Truck className="h-4 w-4 text-warm-stone sm:h-5 sm:w-5" />
              <span className="text-xs text-pure-white/90 sm:text-sm">Discreet Delivery</span>
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
