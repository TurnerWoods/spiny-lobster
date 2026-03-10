import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { easing, duration, viewportSettings } from "@/lib/motion";

// Premium easing
const premiumEase = [0.16, 1, 0.3, 1] as const;

const faqs = [
  {
    question: "How does the intake process work?",
    answer: "Complete a brief health assessment from any device. A licensed physician reviews your information and creates a personalized treatment plan, typically within 24 hours."
  },
  {
    question: "Will I be charged if I'm not approved?",
    answer: "No. Your payment method is stored securely but only charged if your physician approves treatment. If you're not a candidate, you pay nothing."
  },
  {
    question: "How long until I feel results?",
    answer: "Most patients notice improvements in energy and mood within 2-4 weeks. Optimal results typically develop over 3-6 months."
  },
  {
    question: "Is my information secure?",
    answer: "Yes. We use enterprise-grade encryption and HIPAA-compliant systems. Your health information is never shared without your explicit consent."
  },
  {
    question: "Can I cancel anytime?",
    answer: "Yes. There are no contracts or commitments. You can pause or stop services at any time without penalty."
  },
];

// Premium accordion animation
const accordionVariants = {
  hidden: {
    height: 0,
    opacity: 0,
  },
  visible: {
    height: "auto",
    opacity: 1,
    transition: {
      height: {
        duration: duration.normal,
        ease: easing.smooth,
      },
      opacity: {
        duration: duration.normal,
        delay: 0.05,
        ease: easing.smooth,
      },
    },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: {
      height: {
        duration: duration.fast,
        ease: easing.smooth,
      },
      opacity: {
        duration: duration.fast,
        ease: easing.smooth,
      },
    },
  },
};

// Header animation
const headerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const headerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.slow,
      ease: premiumEase,
    },
  },
};

// FAQ item entry animation
const faqItemVariants = {
  hidden: { opacity: 0 },
  visible: (index: number) => ({
    opacity: 1,
    transition: {
      duration: duration.normal,
      delay: index * 0.06,
      ease: easing.smooth,
    },
  }),
};

const FAQItem = ({
  faq,
  isOpen,
  onClick,
  index
}: {
  faq: typeof faqs[0];
  isOpen: boolean;
  onClick: () => void;
  index: number;
}) => {
  return (
    <motion.div
      className="border-b border-neutral-gray/20 last:border-0"
      custom={index}
      variants={faqItemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-30px" }}
    >
      {/* Touch-friendly button with minimum 48px height for mobile accessibility */}
      <motion.button
        onClick={onClick}
        className="flex w-full items-start justify-between gap-3 py-4 text-left sm:gap-4 sm:py-6 md:py-8 min-h-[56px]"
        whileHover={{ x: 2 }}
        transition={{ duration: duration.fast, ease: easing.smooth }}
      >
        <span className="font-display text-[15px] font-medium tracking-normal text-rich-black/95 leading-relaxed xs:text-base sm:text-lg">
          {faq.question}
        </span>
        {/* Touch target: 44px minimum with visual icon inside */}
        <motion.span
          className="flex h-11 w-11 flex-shrink-0 items-center justify-center -mr-2 -mt-0.5"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: duration.normal, ease: easing.smooth }}
        >
          {isOpen ? (
            <Minus className="h-5 w-5 text-rich-black/70" />
          ) : (
            <Plus className="h-5 w-5 text-rich-black/70" />
          )}
        </motion.span>
      </motion.button>
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            variants={accordionVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="overflow-hidden"
          >
            <p className="text-[15px] leading-relaxed pb-5 text-rich-black/80 sm:text-base sm:pb-6 md:pb-8">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-pure-white py-16 xs:py-20 sm:py-28 md:py-40">
      <div className="container px-5 sm:px-6 md:px-6">
        <div className="mx-auto max-w-2xl">
          {/* Section Header */}
          <motion.div
            variants={headerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            className="mb-10 sm:mb-12 md:mb-16"
          >
            <motion.span
              variants={headerItem}
              className="text-[13px] uppercase tracking-[0.15em] mb-4 block text-rich-black/70 sm:text-xs sm:tracking-[0.2em] sm:mb-6"
            >
              Questions
            </motion.span>
            <motion.h2
              variants={headerItem}
              className="font-display text-[1.75rem] font-light leading-tight tracking-tight text-rich-black xs:text-3xl sm:text-4xl"
            >
              Frequently asked
            </motion.h2>
          </motion.div>

          {/* FAQ List */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: duration.slow, delay: 0.1, ease: premiumEase }}
          >
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                faq={faq}
                isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                index={index}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
