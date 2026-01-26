import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

// Import testimonial images
import testimonial1 from "@/assets/patient-testimonial-1.jpg";

const reviews = [
  {
    id: "1",
    rating: 5,
    quote: "I was skeptical about telehealth, but Elevare changed my mind. The process was seamless, and I felt the difference within two weeks.",
    name: "James R.",
    city: "Austin, TX",
    role: "Tech Executive",
    image: testimonial1,
  },
  {
    id: "2",
    rating: 5,
    quote: "Between meetings, I don't have time to sit in waiting rooms. Elevare gave me back my energy without disrupting my schedule.",
    name: "Michael T.",
    city: "Houston, TX",
    role: "Attorney",
    image: testimonial1,
  },
  {
    id: "3",
    rating: 5,
    quote: "I tried the big national companies but felt like a number. With Elevare, I talk to Texas doctors who get it.",
    name: "David K.",
    city: "Dallas, TX",
    role: "Business Owner",
    image: testimonial1,
  },
  {
    id: "4",
    rating: 5,
    quote: "The convenience of doing everything online while still getting quality care is incredible. This is the future of healthcare.",
    name: "Robert K.",
    city: "Fort Worth, TX",
    role: "Finance Executive",
    image: testimonial1,
  },
  {
    id: "5",
    rating: 5,
    quote: "Transparent pricing and amazing support. The physician took his time to explain everything thoroughly.",
    name: "Chris M.",
    city: "San Antonio, TX",
    role: "Entrepreneur",
    image: testimonial1,
  },
  {
    id: "6",
    rating: 5,
    quote: "My energy is back to what it was 10 years ago. The testosterone therapy has been a game changer.",
    name: "Steven P.",
    city: "Plano, TX",
    role: "Sales Director",
    image: testimonial1,
  },
];

const ReviewCard = ({ review }: { review: typeof reviews[0] }) => (
  <div className="flex h-full flex-col rounded-xl border border-neutral-gray/50 bg-pure-white/80 p-4 shadow-md backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:border-warm-stone/30 sm:rounded-2xl sm:p-6">
    {/* Stars */}
    <div className="mb-3 flex gap-0.5 sm:mb-4 sm:gap-1">
      {[...Array(review.rating)].map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400 sm:h-5 sm:w-5" />
      ))}
    </div>
    
    {/* Quote */}
    <div className="relative mb-3 flex-1 sm:mb-4">
      <Quote className="absolute -left-1 -top-1 h-6 w-6 text-warm-stone/15 sm:h-8 sm:w-8" />
      <p className="relative z-10 text-sm text-muted-foreground sm:text-base">"{review.quote}"</p>
    </div>
    
    {/* Author */}
    <div className="mt-auto flex items-center gap-2.5 border-t border-warm-gray/30 pt-3 sm:gap-3 sm:pt-4">
      <img 
        src={review.image} 
        alt={review.name}
        className="h-10 w-10 rounded-full object-cover ring-2 ring-warm-stone/20 sm:h-12 sm:w-12"
      />
      <div>
        <p className="text-sm font-semibold text-rich-black sm:text-base">{review.name}</p>
        <p className="text-xs text-muted-foreground sm:text-sm">
          {review.city} • {review.role}
        </p>
      </div>
    </div>
  </div>
);

const TestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [itemsPerView, setItemsPerView] = useState(1);

  // Responsive items per view
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerView(3);
      } else if (window.innerWidth >= 640) {
        setItemsPerView(2);
      } else {
        setItemsPerView(1);
      }
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  const maxIndex = Math.max(0, reviews.length - itemsPerView);

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
    <section id="reviews" className="py-12 sm:py-16 md:py-20">
      <div className="container px-4 md:px-6">
        {/* Section Header */}
        <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-12">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-3 inline-block rounded-full bg-primary-light px-3 py-1 text-xs font-medium text-primary sm:mb-4 sm:px-4 sm:text-sm"
          >
            Testimonials
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-3 font-display text-2xl font-bold text-foreground sm:mb-4 sm:text-3xl md:text-4xl"
          >
            Why Texas Leaders Choose Elevare
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base text-muted-foreground sm:text-lg"
          >
            Trusted by professionals across Austin, Houston, and Dallas
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
          {/* Navigation Buttons - Hidden on mobile */}
          <Button
            variant="outline"
            size="icon"
            className="absolute -left-2 top-1/2 z-10 hidden -translate-y-1/2 rounded-full shadow-lg sm:-left-4 sm:flex"
            onClick={goToPrev}
          >
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute -right-2 top-1/2 z-10 hidden -translate-y-1/2 rounded-full shadow-lg sm:-right-4 sm:flex"
            onClick={goToNext}
          >
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>

          {/* Cards */}
          <div className="overflow-hidden px-1">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
            >
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="w-full flex-shrink-0 px-2 sm:w-1/2 sm:px-3 lg:w-1/3"
                >
                  <ReviewCard review={review} />
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="mt-6 flex justify-center gap-1.5 sm:mt-8 sm:gap-2">
            {[...Array(maxIndex + 1)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-1.5 rounded-full transition-all sm:h-2 ${
                  i === currentIndex ? "w-6 bg-primary sm:w-8" : "w-1.5 bg-muted-foreground/30 sm:w-2"
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
          className="mt-8 flex flex-col items-center justify-center gap-1.5 text-center sm:mt-10 sm:gap-2"
        >
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400 sm:h-5 sm:w-5" />
            ))}
          </div>
          <p className="text-sm font-semibold text-foreground sm:text-base">4.9/5.0</p>
          <p className="text-xs text-muted-foreground sm:text-sm">Based on verified patient reviews</p>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
