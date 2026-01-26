import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    category: "Getting Started",
    items: [
      {
        question: "How does the intake process work?",
        answer: "After clicking \"Get Started,\" you'll create a secure account and complete a brief health assessment. The entire process takes about 5 minutes and can be done from any device."
      },
      {
        question: "Do I have to talk to a doctor?",
        answer: "Not necessarily. Most patients complete care through our secure online pathway. A licensed physician reviews every case, but a live consultation is optional ($99) for those who prefer face-to-face discussion."
      },
      {
        question: "How long until I know if I'm approved?",
        answer: "Most patients receive a decision within 24 hours. If approved, your prescription is sent to the pharmacy immediately."
      },
    ]
  },
  {
    category: "Pricing & Payment",
    items: [
      {
        question: "Will I be charged if I'm not approved?",
        answer: "No. Your payment method is stored securely but only charged if your physician approves treatment. If you're not a candidate, you pay nothing."
      },
      {
        question: "Do I need insurance?",
        answer: "No. Elevare operates on a direct-pay model with transparent pricing. This keeps your health information private and off insurance records."
      },
      {
        question: "Can I cancel anytime?",
        answer: "Yes. There are no contracts or commitments. You can pause or stop services at any time without penalty."
      },
    ]
  },
  {
    category: "Treatment & Safety",
    items: [
      {
        question: "Are compounded medications safe?",
        answer: "When prescribed by a licensed physician and prepared by an FDA-regulated compounding pharmacy, these medications are held to strict safety standards. Our pharmacy partners are fully licensed and regularly inspected."
      },
      {
        question: "Do I need lab work before starting?",
        answer: "It depends on the treatment. Some protocols require baseline labs, which your physician will request during the review process. We can provide requisitions for local labs."
      },
      {
        question: "How long until I feel results?",
        answer: "Most patients notice improvements in energy and mood within 2-4 weeks. Optimal results typically develop over 3-6 months."
      },
    ]
  },
  {
    category: "Privacy & Delivery",
    items: [
      {
        question: "Is my information secure?",
        answer: "Yes. We use enterprise-grade encryption and HIPAA-compliant systems. Your health information is never shared without your explicit consent."
      },
      {
        question: "How is medication shipped?",
        answer: "All shipments arrive in discreet, unmarked packaging with no indication of contents. Temperature-sensitive medications are shipped with appropriate cold packs."
      },
      {
        question: "How long does shipping take?",
        answer: "Most medications arrive within 3-5 business days after your prescription is processed."
      },
    ]
  },
];

const FAQItem = ({ faq, isOpen, onClick }: { faq: { question: string; answer: string }; isOpen: boolean; onClick: () => void }) => {
  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-primary"
      >
        <span className="font-display text-lg font-semibold text-foreground">{faq.question}</span>
        <span className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border transition-all ${
          isOpen ? "rotate-180 border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground"
        }`}>
          {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
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
            <p className="pb-5 text-muted-foreground">{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<string | null>("0-0");

  return (
    <section id="faq" className="bg-muted/30 py-20">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-3xl">
          {/* Section Header */}
          <div className="mb-12 text-center">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mb-4 inline-block rounded-full bg-primary-light px-4 py-1 text-sm font-medium text-primary"
            >
              FAQ
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4 font-display text-3xl font-bold text-foreground md:text-4xl"
            >
              Frequently Asked Questions
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-muted-foreground"
            >
              Everything you need to know about getting started
            </motion.p>
          </div>

          {/* FAQ Categories */}
          <div className="space-y-8">
            {faqs.map((category, categoryIndex) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.1 }}
              >
                <h3 className="mb-4 font-display text-xl font-bold text-primary">
                  {category.category}
                </h3>
                <div className="rounded-2xl border bg-card p-2 shadow-sm md:p-6">
                  {category.items.map((faq, itemIndex) => {
                    const key = `${categoryIndex}-${itemIndex}`;
                    return (
                      <FAQItem
                        key={key}
                        faq={faq}
                        isOpen={openIndex === key}
                        onClick={() => setOpenIndex(openIndex === key ? null : key)}
                      />
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
