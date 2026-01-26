import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Clock, Truck, Volume2, VolumeX } from "lucide-react";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import StatsCounter from "./StatsCounter";
import heroVideo from "@/assets/hero-video.mp4";

const Hero = () => {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="relative min-h-[85vh] overflow-hidden sm:min-h-[90vh]">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
      </div>

      {/* Mute/Unmute Button - styled with primary color */}
      <button
        onClick={toggleMute}
        className="absolute bottom-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-primary/80 text-white backdrop-blur-sm transition-all hover:bg-primary sm:bottom-6 sm:right-6 sm:h-12 sm:w-12"
        aria-label={isMuted ? "Unmute video" : "Mute video"}
      >
        {isMuted ? <VolumeX className="h-4 w-4 sm:h-5 sm:w-5" /> : <Volume2 className="h-4 w-4 sm:h-5 sm:w-5" />}
      </button>

      <div className="container relative z-10 px-4 py-16 sm:py-20 md:px-6 md:py-28 lg:py-36">
        <div className="mx-auto max-w-4xl text-center">
          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm sm:mb-6 sm:gap-2 sm:px-4 sm:py-2 sm:text-sm"
          >
            <Shield className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span>HIPAA Compliant • Texas Physicians</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-4 font-display text-3xl font-bold tracking-tight text-white sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl"
          >
            Reclaim Your Edge.
            <br />
            <span className="text-primary">Elevate Your Life.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mb-6 max-w-2xl px-2 text-base text-white/80 sm:mb-8 sm:px-0 sm:text-lg md:text-xl"
          >
            Premium testosterone therapy and men's health optimization, delivered discreetly to Texas professionals.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-8 flex flex-col items-center justify-center gap-3 sm:mb-12 sm:flex-row sm:gap-4"
          >
            <Link to="/intake" className="w-full sm:w-auto">
              <Button size="lg" className="w-full bg-primary px-6 text-base hover:bg-primary-dark sm:w-auto sm:px-8 sm:text-lg">
                Start Free Assessment
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline" 
              className="w-full border-white/30 bg-white/10 text-base text-white backdrop-blur-sm hover:bg-white/20 sm:w-auto sm:text-lg" 
              asChild
            >
              <a href="#treatments">View Treatments</a>
            </Button>
          </motion.div>

          {/* Trust Indicators - Hidden on very small screens */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="hidden flex-wrap items-center justify-center gap-4 text-xs text-white/70 sm:flex sm:gap-6 sm:text-sm"
          >
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Shield className="h-4 w-4 text-primary sm:h-5 sm:w-5" />
              <span>HIPAA Compliant</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Clock className="h-4 w-4 text-primary sm:h-5 sm:w-5" />
              <span>24hr Response</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Truck className="h-4 w-4 text-primary sm:h-5 sm:w-5" />
              <span>Discreet Delivery</span>
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
