import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

const reviews = [
  {
    id: "1",
    rating: 5,
    quote: "The whole process was so easy. From intake to receiving my medication, everything was seamless. The provider actually took time to understand my concerns.",
    name: "Lisa M.",
    city: "Austin, TX",
    treatment: "Weight Loss",
  },
  {
    id: "2",
    rating: 5,
    quote: "Lost 32 lbs in 4 months. Life-changing results. I've tried everything before and nothing worked like this program.",
    name: "Mark T.",
    city: "Dallas, TX",
    treatment: "GLP-1",
  },
  {
    id: "3",
    rating: 5,
    quote: "My energy is back to what it was 10 years ago. I feel like myself again. The testosterone therapy has been a game changer.",
    name: "James R.",
    city: "Houston, TX",
    treatment: "TRT",
  },
  {
    id: "4",
    rating: 5,
    quote: "Finally a clinic that doesn't nickel and dime you. Transparent pricing and amazing support. Highly recommend.",
    name: "Amanda S.",
    city: "San Antonio, TX",
    treatment: "Hormone Therapy",
  },
  {
    id: "5",
    rating: 5,
    quote: "The convenience of doing everything online while still getting quality care is incredible. No more driving to appointments.",
    name: "Robert K.",
    city: "Fort Worth, TX",
    treatment: "Peptides",
  },
  {
    id: "6",
    rating: 5,
    quote: "I was skeptical at first but the results speak for themselves. Down 28 lbs and feeling better than ever.",
    name: "Michelle P.",
    city: "Plano, TX",
    treatment: "Weight Loss",
  },
];

const ReviewCard = ({ review }: { review: typeof reviews[0] }) => (
  <div className="flex h-full flex-col rounded-2xl border bg-card p-6 shadow-sm">
    {/* Stars */}
    <div className="mb-4 flex gap-1">
      {[...Array(review.rating)].map((_, i) => (
        <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
      ))}
    </div>
    
    {/* Quote */}
    <div className="relative mb-4 flex-1">
      <Quote className="absolute -left-1 -top-1 h-8 w-8 text-primary/10" />
      <p className="relative z-10 text-muted-foreground">"{review.quote}"</p>
    </div>
    
    {/* Author */}
    <div className="mt-auto flex items-center gap-3 border-t pt-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-light font-semibold text-primary">
        {review.name.charAt(0)}
      </div>
      <div>
        <p className="font-semibold text-foreground">{review.name}</p>
        <p className="text-sm text-muted-foreground">
          {review.city} • {review.treatment}
        </p>
      </div>
    </div>
  </div>
);

const TestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const itemsPerView = {
    mobile: 1,
    tablet: 2,
    desktop: 3,
  };

  const maxIndex = reviews.length - itemsPerView.desktop;

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, maxIndex]);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  return (
    <section id="reviews" className="py-20">
      <div className="container px-4 md:px-6">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-4 inline-block rounded-full bg-primary-light px-4 py-1 text-sm font-medium text-primary"
          >
            Testimonials
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 font-display text-3xl font-bold text-foreground md:text-4xl"
          >
            What Our Patients Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            Trusted by 10,000+ patients across Texas
          </motion.p>
        </div>

        {/* Carousel Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute -left-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-full shadow-lg md:flex"
            onClick={goToPrev}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-full shadow-lg md:flex"
            onClick={goToNext}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          {/* Cards */}
          <div className="overflow-hidden px-1">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView.desktop)}%)` }}
            >
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="w-full flex-shrink-0 px-3 md:w-1/2 lg:w-1/3"
                >
                  <ReviewCard review={review} />
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="mt-8 flex justify-center gap-2">
            {[...Array(maxIndex + 1)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-2 rounded-full transition-all ${
                  i === currentIndex ? "w-8 bg-primary" : "w-2 bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 flex flex-col items-center justify-center gap-2 text-center"
        >
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <p className="font-semibold text-foreground">4.9/5.0</p>
          <p className="text-sm text-muted-foreground">Based on 2,847 reviews</p>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;