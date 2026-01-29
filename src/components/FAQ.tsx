import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "How does the intake process work?",
    answer: "Complete a brief 5-minute health assessment from any device. A licensed physician reviews your information and creates a personalized treatment plan, typically within 24 hours."
  },
  {
    question: "Do I have to talk to a doctor?",
    answer: "Not necessarily. Most patients complete care through our secure online pathway. A live video consultation ($99) is optional for those who prefer face-to-face discussion."
  },
  {
    question: "Will I be charged if I'm not approved?",
    answer: "No. Your payment method is stored securely but only charged if your physician approves treatment. If you're not a candidate, you pay nothing."
  },
  {
    question: "Do I need insurance?",
    answer: "No. Elevare operates on a direct-pay model with transparent pricing. This keeps your health information private and off insurance records."
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
    question: "How is medication shipped?",
    answer: "All shipments arrive in discreet, unmarked packaging within 3-5 business days after your prescription is processed."
  },
  {
    question: "Can I cancel anytime?",
    answer: "Yes. There are no contracts or commitments. You can pause or stop services at any time without penalty."
  },
];

const FAQItem = ({ faq, isOpen, onClick }: { faq: typeof faqs[0]; isOpen: boolean; onClick: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="border-b border-border last:border-0"
    >
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between gap-3 py-4 text-left transition-colors hover:text-primary sm:gap-4 sm:py-5"
      >
        <span className="font-display text-base font-semibold text-foreground sm:text-lg">{faq.question}</span>
        <span className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border transition-all sm:h-8 sm:w-8 ${
          isOpen ? "rotate-180 border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground"
        }`}>
          {isOpen ? <Minus className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> : <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-sm text-muted-foreground sm:pb-5">{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-muted/30 py-12 sm:py-16 md:py-20">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-3xl">
          {/* Section Header */}
          <div className="mb-8 text-center sm:mb-12">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mb-3 inline-block rounded-full bg-warm-stone/15 px-3 py-1 text-xs font-medium text-foreground sm:mb-4 sm:px-4 sm:text-sm"
            >
              FAQ
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-3 font-display text-2xl font-bold text-foreground sm:mb-4 sm:text-3xl md:text-4xl"
            >
              Frequently Asked Questions
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-base text-muted-foreground sm:text-lg"
            >
              Everything you need to know about getting started
            </motion.p>
          </div>

          {/* FAQ List - Glassmorphic */}
          <div className="rounded-xl border border-neutral-gray/50 bg-pure-white/80 p-3 shadow-md backdrop-blur-sm sm:rounded-2xl sm:p-6 md:p-6">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                faq={faq}
                isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
