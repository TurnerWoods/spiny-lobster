import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus, Minus, HelpCircle, CreditCard, Pill, Shield, Truck, Users, Clock, FileText, Sparkles, ArrowRight } from "lucide-react";
import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  title: string;
  icon: LucideIcon;
  faqs: FAQItem[];
}

const faqCategories: FAQCategory[] = [
  {
    title: "Getting Started",
    icon: HelpCircle,
    faqs: [
      {
        question: "How does the intake process work?",
        answer: "Complete a brief 5-minute health assessment from any device. A licensed physician reviews your information and creates a personalized treatment plan, typically within 24 hours. If approved, your medication ships directly to your door."
      },
      {
        question: "Do I have to talk to a doctor?",
        answer: "Not necessarily. Most patients complete care through our secure online pathway via asynchronous messaging with their physician. A live video consultation ($99) is optional for those who prefer face-to-face discussion or have complex medical histories."
      },
      {
        question: "How long does the process take?",
        answer: "The intake form takes about 5 minutes. Physician review typically occurs within 24 hours (often same day). Once approved, medication ships within 1-2 business days and arrives in 3-5 business days."
      },
      {
        question: "Who reviews my intake form?",
        answer: "Your intake is reviewed by a licensed, board-certified physician in your state. All of our physicians specialize in men's health and hormone optimization."
      },
      {
        question: "What if I'm not approved for treatment?",
        answer: "If our physicians determine you're not a candidate for treatment, your payment method is never charged. We'll explain why and may suggest alternatives or recommend you see a specialist."
      }
    ]
  },
  {
    title: "Pricing & Billing",
    icon: CreditCard,
    faqs: [
      {
        question: "Will I be charged if I'm not approved?",
        answer: "No. Your payment method is stored securely but only charged if your physician approves treatment. If you're not a candidate, you pay nothing."
      },
      {
        question: "What's included in the monthly price?",
        answer: "Your monthly subscription includes: medication, pharmacy fulfillment and shipping, ongoing physician oversight, secure messaging with your care team, dosage adjustments as needed, and access to our patient portal."
      },
      {
        question: "Do I need insurance?",
        answer: "No. Elevare operates on a direct-pay model with transparent pricing. This keeps your health information private and off insurance records. Many patients prefer this for discretion and simplicity."
      },
      {
        question: "Are there any hidden fees?",
        answer: "No hidden fees. The price you see is the price you pay monthly. Lab work, if required, may be an additional cost depending on your insurance or if you use our partner labs."
      },
      {
        question: "Can I cancel anytime?",
        answer: "Yes. There are no contracts or long-term commitments. You can pause or cancel your subscription at any time through your patient portal without penalty."
      },
      {
        question: "Do you offer refunds?",
        answer: "Medications that have shipped are non-refundable. If you cancel mid-cycle, your subscription ends at the end of your current billing period. Video consultation fees are non-refundable once the appointment has occurred."
      }
    ]
  },
  {
    title: "Medications & Treatment",
    icon: Pill,
    faqs: [
      {
        question: "Are the medications FDA-approved?",
        answer: "The active ingredients in our medications (testosterone, semaglutide, finasteride, etc.) are FDA-approved. Some medications are compounded by licensed U.S. pharmacies to provide customized dosing. Compounded medications themselves are not FDA-approved but are legal and regulated."
      },
      {
        question: "What is off-label prescribing?",
        answer: "Off-label prescribing means using an FDA-approved medication for a purpose, dose, or patient population not specifically approved by the FDA. This is a common, legal medical practice when physicians believe it benefits the patient."
      },
      {
        question: "What is a compounded medication?",
        answer: "Compounded medications are custom-prepared by licensed pharmacies to meet individual patient needs. They may combine ingredients or provide dosages not commercially available. While legal and regulated, they are not FDA-approved for safety, effectiveness, or quality."
      },
      {
        question: "How long until I feel results?",
        answer: "Results vary by treatment. TRT: Many notice improved energy and mood in 2-4 weeks, with full benefits at 3-6 months. Weight loss: Appetite changes often within days, significant weight loss in 2-3 months. Hair loss: Visible results typically take 3-6 months."
      },
      {
        question: "Will I need lab work?",
        answer: "For hormone therapies (TRT), baseline labs are required before starting and periodically during treatment. We can order labs for you or you can use your own doctor. Other treatments may not require labs."
      },
      {
        question: "What if my medication isn't working?",
        answer: "Message your care team through the patient portal. Our physicians regularly adjust dosing and can modify your treatment plan. Some patients need dose titration over several months to achieve optimal results."
      }
    ]
  },
  {
    title: "Safety & Side Effects",
    icon: Shield,
    faqs: [
      {
        question: "What are the side effects of TRT?",
        answer: "Common side effects include acne, increased red blood cell count, mood changes, and testicular shrinkage. Less common: sleep apnea worsening, fluid retention. Serious but rare: blood clots. Regular monitoring helps manage these risks."
      },
      {
        question: "What are the side effects of GLP-1 medications (Semaglutide/Tirzepatide)?",
        answer: "Common side effects include nausea, constipation, diarrhea, and decreased appetite—these typically improve over time. We start with low doses and increase gradually to minimize side effects. Rare but serious: pancreatitis, gallbladder issues."
      },
      {
        question: "What are the side effects of Finasteride?",
        answer: "Sexual side effects (decreased libido, erectile changes) occur in 2-4% of men. Most resolve with continued use or upon stopping the medication. Discuss concerns with your physician before starting."
      },
      {
        question: "Is telehealth safe for these treatments?",
        answer: "Yes, when done properly. Our physicians review your complete medical history, require appropriate lab work, and monitor your progress. Telehealth has been used safely for hormone therapy and weight management for years."
      },
      {
        question: "What if I have a medical emergency?",
        answer: "Our services are NOT for emergencies. If you experience severe symptoms like chest pain, difficulty breathing, severe allergic reaction, or thoughts of self-harm, call 911 or go to your nearest emergency room immediately."
      }
    ]
  },
  {
    title: "Shipping & Delivery",
    icon: Truck,
    faqs: [
      {
        question: "How is medication shipped?",
        answer: "All shipments arrive in discreet, unmarked packaging with no indication of contents. We use USPS, UPS, or FedEx depending on your location. Temperature-sensitive medications are shipped with appropriate cold packs."
      },
      {
        question: "How long does shipping take?",
        answer: "After your prescription is processed, medications typically ship within 1-2 business days and arrive within 3-5 business days. Expedited shipping may be available for an additional fee."
      },
      {
        question: "Do you ship to all states?",
        answer: "Currently, Elevare Health serves patients in Texas only. We're actively working to expand to additional states."
      },
      {
        question: "What if my package is lost or damaged?",
        answer: "Contact our support team immediately. We'll work with the carrier to locate your package or send a replacement at no additional cost."
      },
      {
        question: "Can I have medication shipped to a different address?",
        answer: "Yes, you can update your shipping address in your patient portal. Medications must be shipped to a verified address within your state of residence."
      }
    ]
  },
  {
    title: "Your Care Team",
    icon: Users,
    faqs: [
      {
        question: "Who are the physicians?",
        answer: "All Elevare physicians are licensed, board-certified doctors in your state who specialize in men's health, hormone optimization, and/or weight management. They practice through Elevare Health Medical PLLC, an independent medical practice."
      },
      {
        question: "Can I message my doctor?",
        answer: "Yes. Secure messaging is available through your patient portal. Most messages receive a response within 24 hours on business days. For urgent (non-emergency) matters, indicate urgency in your message."
      },
      {
        question: "Can I request a video consultation?",
        answer: "Yes. Video consultations are available for $99 and can be scheduled through your patient portal. This is optional—most patients receive excellent care through asynchronous messaging."
      },
      {
        question: "What if I want to switch physicians?",
        answer: "Contact our support team if you'd like to be reassigned to a different physician. We'll do our best to accommodate your preferences."
      }
    ]
  },
  {
    title: "Account & Portal",
    icon: Clock,
    faqs: [
      {
        question: "How do I access my patient portal?",
        answer: "Log in at elevarehealth.com with the email and password you created during signup. The portal gives you access to messaging, prescription status, billing, and your treatment history."
      },
      {
        question: "How do I update my payment method?",
        answer: "Log into your patient portal, go to Settings > Billing, and update your payment information. Changes take effect on your next billing cycle."
      },
      {
        question: "How do I pause or cancel my subscription?",
        answer: "Log into your patient portal, go to Settings > Subscription, and select Pause or Cancel. Pausing holds your subscription; canceling ends it at the end of your current billing period."
      },
      {
        question: "How do I request my medical records?",
        answer: "Contact support@elevarehealth.com with your records request. We'll provide your records within 30 days as required by law. There may be a small fee for extensive record requests."
      }
    ]
  },
  {
    title: "Privacy & Compliance",
    icon: FileText,
    faqs: [
      {
        question: "Is my information secure?",
        answer: "Yes. We use enterprise-grade encryption and HIPAA-compliant systems. Your health information is never shared without your explicit consent except as required by law."
      },
      {
        question: "Will my employer or insurance company find out?",
        answer: "No. We operate on a direct-pay model and do not bill insurance. Your information is not shared with employers. Your health decisions remain private."
      },
      {
        question: "Are you HIPAA compliant?",
        answer: "Yes. Elevare Health maintains full HIPAA compliance for all patient information. Our systems, processes, and staff are trained and certified in HIPAA requirements."
      },
      {
        question: "What is your Notice of Privacy Practices?",
        answer: "Our Notice of Privacy Practices describes how your medical information may be used and disclosed and how you can access this information. You can view it on our HIPAA Notice page or request a copy from our support team."
      }
    ]
  }
];

const FAQItemComponent = ({ faq, isOpen, onClick }: { faq: FAQItem; isOpen: boolean; onClick: () => void }) => {
  return (
    <div className="border-b border-warm-stone/10 last:border-0">
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between gap-3 py-4 text-left transition-colors hover:text-warm-stone"
      >
        <span className="font-medium text-rich-black">{faq.question}</span>
        <span className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border transition-all ${
          isOpen ? "rotate-180 border-warm-stone bg-warm-stone text-pure-white" : "border-warm-stone/30 text-warm-gray"
        }`}>
          {isOpen ? <Minus className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-sm text-warm-gray leading-relaxed">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  const [openItems, setOpenItems] = useState<Record<string, number | null>>({});

  const toggleItem = (categoryIndex: number, faqIndex: number) => {
    setOpenItems(prev => ({
      ...prev,
      [categoryIndex]: prev[categoryIndex] === faqIndex ? null : faqIndex
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-soft-linen via-pure-white to-light-cloud">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden py-16 sm:py-20">
          <div className="absolute inset-0 bg-gradient-to-b from-warm-stone/5 to-transparent" />
          <div className="container relative px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-warm-stone/20 bg-pure-white/80 px-4 py-2 backdrop-blur-sm"
              >
                <Sparkles className="h-4 w-4 text-warm-stone" />
                <span className="text-sm font-medium text-warm-stone">FAQ</span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-6 font-display text-3xl font-bold text-rich-black sm:text-4xl md:text-5xl"
              >
                Frequently Asked Questions
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-base text-warm-gray sm:text-lg"
              >
                Everything you need to know about getting started with Elevare Health
              </motion.p>
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="border-b border-warm-stone/10 py-6">
          <div className="container px-4 md:px-6">
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              {faqCategories.map((category, index) => (
                <a
                  key={index}
                  href={`#category-${index}`}
                  className="flex items-center gap-1.5 rounded-full border border-warm-stone/20 bg-pure-white/80 px-3 py-1.5 text-xs font-medium text-warm-gray backdrop-blur-sm transition-colors hover:border-warm-stone hover:text-warm-stone sm:px-4 sm:py-2 sm:text-sm"
                >
                  <category.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  {category.title}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Categories */}
        <section className="py-12 sm:py-20">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-4xl space-y-8 sm:space-y-12">
              {faqCategories.map((category, categoryIndex) => (
                <motion.div
                  key={categoryIndex}
                  id={`category-${categoryIndex}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="scroll-mt-24"
                >
                  <div className="mb-4 flex items-center gap-3 sm:mb-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-warm-stone/10 text-warm-stone sm:h-12 sm:w-12">
                      <category.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                    <h2 className="font-display text-xl font-bold text-rich-black sm:text-2xl">
                      {category.title}
                    </h2>
                  </div>
                  <Card variant="glass" className="p-4 sm:p-6">
                    {category.faqs.map((faq, faqIndex) => (
                      <FAQItemComponent
                        key={faqIndex}
                        faq={faq}
                        isOpen={openItems[categoryIndex] === faqIndex}
                        onClick={() => toggleItem(categoryIndex, faqIndex)}
                      />
                    ))}
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Still Have Questions */}
        <section className="relative py-12 sm:py-20">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-warm-stone/5" />
          <div className="container relative px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card variant="glassDark" className="mx-auto max-w-2xl p-8 text-center md:p-12">
                <h2 className="mb-4 font-display text-2xl font-bold text-pure-white sm:text-3xl">
                  Still Have Questions?
                </h2>
                <p className="mb-6 text-pure-white/70">
                  Our team is here to help. Reach out and we'll get back to you within 24 hours.
                </p>
                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                  <Link to="/contact">
                    <Button size="lg" className="w-full bg-warm-stone text-pure-white hover:bg-warm-stone/90 sm:w-auto">
                      Contact Us
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <a href="mailto:support@elevarehealth.com">
                    <Button size="lg" variant="outline" className="w-full border-pure-white/30 text-pure-white hover:bg-pure-white/10 sm:w-auto">
                      Email Support
                    </Button>
                  </a>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
