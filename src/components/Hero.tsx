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
    <section className="relative min-h-[90vh] overflow-hidden">
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      </div>

      {/* Mute/Unmute Button */}
      <button
        onClick={toggleMute}
        className="absolute bottom-6 right-6 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-all hover:bg-white/30"
        aria-label={isMuted ? "Unmute video" : "Mute video"}
      >
        {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
      </button>

      <div className="container relative z-10 px-4 py-20 md:px-6 md:py-28 lg:py-36">
        <div className="mx-auto max-w-4xl text-center">
          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm"
          >
            <Shield className="h-4 w-4" />
            <span>HIPAA Compliant • Texas-Licensed Physicians</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Reclaim Your Edge.
            <br className="hidden sm:block" />
            <span className="mt-2 block text-primary sm:inline"> Elevate Your Life.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mb-8 max-w-2xl text-lg text-white/80 md:text-xl"
          >
            Premium testosterone therapy and men's health optimization, delivered discreetly to successful Texas professionals. Licensed physicians. Transparent pricing. Results you can feel.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link to="/intake">
              <Button size="lg" className="bg-primary px-8 text-lg hover:bg-primary-dark">
                Start Your Free Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white/30 bg-white/10 text-lg text-white backdrop-blur-sm hover:bg-white/20" 
              asChild
            >
              <a href="#treatments">View Treatments</a>
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/70"
          >
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <span>HIPAA Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <span>24hr Physician Review</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-primary" />
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
