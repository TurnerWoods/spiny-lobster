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
    <section id="reviews" className="bg-soft-linen py-16 xs:py-20 sm:py-28 md:py-40">
      <div className="container px-5 sm:px-6 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          {/* Section label */}
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportSettings}
            transition={{ duration: duration.slow, ease: premiumEase }}
            className="mb-8 block text-[13px] font-medium uppercase tracking-[0.2em] text-rich-black/80 sm:mb-12 sm:text-xs sm:tracking-[0.3em] md:mb-16"
          >
            Testimonials
          </motion.span>

          {/* Quote */}
          <div className="relative min-h-[240px] xs:min-h-[220px] sm:min-h-[180px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                variants={testimonialVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="absolute inset-0"
              >
                <blockquote className="mb-6 font-display text-[1.375rem] font-light leading-[1.5] text-rich-black xs:text-2xl sm:mb-8 sm:text-3xl sm:leading-relaxed md:text-4xl">
                  "{testimonials[currentIndex].quote}"
                </blockquote>
                <div className="text-[15px] font-normal sm:text-sm">
                  <span className="text-rich-black font-semibold">{testimonials[currentIndex].name}</span>
                  <span className="mx-2 text-rich-black/80">—</span>
                  <span className="text-rich-black/80">{testimonials[currentIndex].location}</span>
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
                  className="block h-2 rounded-full bg-rich-black"
                  animate={{
                    width: i === currentIndex ? 32 : 8,
                    opacity: i === currentIndex ? 1 : 0.8,
                  }}
                  transition={{ duration: duration.normal, ease: easing.smooth }}
                  whileHover={{ opacity: i === currentIndex ? 1 : 0.9 }}
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
