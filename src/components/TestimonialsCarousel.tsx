import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { easing, duration, viewportSettings } from "@/lib/motion";

// Premium easing
const premiumEase = [0.16, 1, 0.3, 1] as const;

const testimonials = [
  {
    id: "1",
    quote: "I was skeptical about telehealth, but Elevare changed my mind. The process was seamless, and I felt the difference within two weeks.",
    name: "James R.",
    location: "Austin",
  },
  {
    id: "2",
    quote: "Between meetings, I don't have time to sit in waiting rooms. Elevare gave me back my energy without disrupting my schedule.",
    name: "Michael T.",
    location: "Houston",
  },
  {
    id: "3",
    quote: "The convenience of doing everything online while still getting quality care is incredible. This is the future of healthcare.",
    name: "Robert K.",
    location: "Dallas",
  },
];

// Premium testimonial transition - elegant fade with subtle blur
const testimonialVariants = {
  initial: {
    opacity: 0,
    y: 16,
    filter: "blur(4px)",
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: duration.slow,
      ease: premiumEase,
    },
  },
  exit: {
    opacity: 0,
    y: -12,
    filter: "blur(4px)",
    transition: {
      duration: duration.normal,
      ease: easing.exit,
    },
  },
};

const TestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 7000); // Slightly longer for more elegant pacing
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="reviews" className="bg-soft-linen py-24 sm:py-32 md:py-40">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          {/* Section label */}
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportSettings}
            transition={{ duration: duration.slow, ease: premiumEase }}
            className="mb-12 block text-xs font-light uppercase tracking-[0.3em] text-warm-stone/60 sm:mb-16"
          >
            Testimonials
          </motion.span>

          {/* Quote */}
          <div className="relative min-h-[200px] sm:min-h-[180px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                variants={testimonialVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="absolute inset-0"
              >
                <blockquote className="mb-8 font-display text-2xl font-light leading-relaxed text-rich-black sm:text-3xl md:text-4xl">
                  "{testimonials[currentIndex].quote}"
                </blockquote>
                <div className="text-sm font-light text-muted-foreground">
                  <span className="text-rich-black">{testimonials[currentIndex].name}</span>
                  <span className="mx-2">--</span>
                  <span>{testimonials[currentIndex].location}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots - Touch-friendly with 44px minimum tap target */}
          <div className="mt-12 flex justify-center gap-1 sm:mt-16">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className="flex h-11 w-11 items-center justify-center touch-target"
                aria-label={`Go to testimonial ${i + 1}`}
              >
                <motion.span
                  className="block h-2 rounded-full bg-warm-stone"
                  animate={{
                    width: i === currentIndex ? 32 : 8,
                    opacity: i === currentIndex ? 1 : 0.2,
                  }}
                  transition={{ duration: duration.normal, ease: easing.smooth }}
                  whileHover={{ opacity: i === currentIndex ? 1 : 0.4 }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
