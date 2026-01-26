import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

// Import testimonial images
import testimonial1 from "@/assets/patient-testimonial-1.jpg";
import testimonial2 from "@/assets/patient-testimonial-2.jpg";

const reviews = [
  {
    id: "1",
    rating: 5,
    quote: "I was skeptical about telehealth, but Elevare changed my mind. The process was seamless, the physician actually took time to understand my situation, and I felt the difference within two weeks. This is how healthcare should work.",
    name: "James R.",
    city: "Austin, TX",
    treatment: "Tech Executive",
    image: testimonial1,
  },
  {
    id: "2",
    rating: 5,
    quote: "Between court appearances and client meetings, I don't have time to sit in waiting rooms. Elevare gave me back my energy without disrupting my schedule. The monthly delivery is like clockwork.",
    name: "Michael T.",
    city: "Houston, TX",
    treatment: "Attorney",
    image: testimonial1,
  },
  {
    id: "3",
    rating: 5,
    quote: "I tried the big national telehealth companies but felt like a number. With Elevare, I actually talk to Texas doctors who get it. The white-glove approach is worth every penny.",
    name: "David K.",
    city: "Dallas, TX",
    treatment: "Business Owner",
    image: testimonial1,
  },
  {
    id: "4",
    rating: 5,
    quote: "The convenience of doing everything online while still getting quality care is incredible. No more driving to appointments or sitting in waiting rooms. This is the future of healthcare.",
    name: "Robert K.",
    city: "Fort Worth, TX",
    treatment: "Finance Executive",
    image: testimonial1,
  },
  {
    id: "5",
    rating: 5,
    quote: "Finally a clinic that doesn't nickel and dime you. Transparent pricing and amazing support. The physician took his time to explain everything thoroughly.",
    name: "Chris M.",
    city: "San Antonio, TX",
    treatment: "Entrepreneur",
    image: testimonial1,
  },
  {
    id: "6",
    rating: 5,
    quote: "My energy is back to what it was 10 years ago. I feel like myself again. The testosterone therapy has been a game changer for my performance at work and at home.",
    name: "Steven P.",
    city: "Plano, TX",
    treatment: "Sales Director",
    image: testimonial1,
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
      <img 
        src={review.image} 
        alt={review.name}
        className="h-12 w-12 rounded-full object-cover ring-2 ring-primary/20"
      />
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
            Why Texas Leaders Choose Elevare
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground"
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
          <p className="text-sm text-muted-foreground">Based on verified patient reviews</p>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
