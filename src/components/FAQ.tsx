import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "How does the consultation process work?",
    answer: "Complete our quick online intake form (5 minutes). A licensed provider reviews your information within 24-48 hours. If approved, your medication is shipped directly to your door. No in-person visits required."
  },
  {
    question: "Is my information kept private?",
    answer: "Absolutely. We're fully HIPAA compliant. Your medical information is encrypted and only accessible to your healthcare providers. We never share or sell your data."
  },
  {
    question: "What if I'm not approved?",
    answer: "Your card is only charged if you're approved for treatment. If our providers determine treatment isn't right for you, you pay nothing."
  },
  {
    question: "How quickly will I see results?",
    answer: "Results vary by treatment. GLP-1 patients typically see 5-10% body weight reduction in the first 3 months. TRT patients often notice improved energy within 2-4 weeks."
  },
  {
    question: "Can I cancel anytime?",
    answer: "Yes, there are no long-term contracts. You can pause or cancel your subscription at any time through your patient portal."
  },
  {
    question: "Do you accept insurance?",
    answer: "We're a direct-pay practice with transparent pricing. While we don't bill insurance directly, we can provide documentation for HSA/FSA reimbursement."
  },
  {
    question: "What states do you serve?",
    answer: "We serve patients in all 50 states for most treatments. Some GLP-1 medications have restrictions in AR, LA, MS, and NM."
  },
  {
    question: "How do I get my medication?",
    answer: "After approval, your prescription is sent to our licensed US pharmacy and shipped directly to your home in discreet packaging. Free shipping on all orders."
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
    </motion.div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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
              Everything you need to know about our treatments
            </motion.p>
          </div>

          {/* FAQ List */}
          <div className="rounded-2xl border bg-card p-2 shadow-sm md:p-6">
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