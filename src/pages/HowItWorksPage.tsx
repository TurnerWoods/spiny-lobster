import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { ClipboardList, UserCheck, Video, Truck, MessageSquare, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

const steps = [
  {
    icon: ClipboardList,
    number: "01",
    title: "Start Your Assessment",
    description: "Click \"Get Started\" and complete our secure health assessment. You'll answer questions about your symptoms, health history, and goals. The entire process takes about 5 minutes and can be done from your phone, tablet, or computer. Your information is encrypted and stored on our HIPAA-compliant platform.",
  },
  {
    icon: UserCheck,
    number: "02",
    title: "Physician Review",
    description: "A Texas-licensed, board-certified physician reviews your complete health profile. If you're a good candidate for treatment, they'll create a personalized protocol based on your specific needs. Most patients receive their treatment plan within 24 hours. No appointment required for straightforward cases.",
  },
  {
    icon: Video,
    number: "03",
    title: "Optional Consultation ($99)",
    description: "Prefer to speak directly with your physician? Book a 30-minute video consultation for $99. This option is ideal for patients with complex health histories or those who simply prefer face-to-face discussion. Many patients find the async pathway sufficient, but we're here either way.",
  },
  {
    icon: Truck,
    number: "04",
    title: "Treatment Delivered",
    description: "Once approved, your prescription is filled by our FDA-regulated pharmacy partner and shipped directly to your home or office in discreet, unmarked packaging. Most shipments arrive within 3-5 business days. Refills are automatic unless you tell us otherwise.",
  },
  {
    icon: MessageSquare,
    number: "05",
    title: "Ongoing Support",
    description: "Your care doesn't end when your medication arrives. You have unlimited secure messaging access to your care team for questions, adjustments, or concerns. We monitor your progress and adjust your protocol as needed to ensure optimal results.",
  },
];

const faqs = [
  {
    question: "Will I be charged if I'm not approved?",
    answer: "No. Your payment method is stored securely but only charged if your physician approves treatment. If you're not a candidate, you pay nothing.",
  },
  {
    question: "Do I need insurance?",
    answer: "No. Elevare is direct-pay with transparent pricing. This keeps your health private and off insurance records.",
  },
  {
    question: "How long until I feel results?",
    answer: "Most patients notice improvements in energy and mood within 2-4 weeks. Optimal results typically develop over 3-6 months.",
  },
  {
    question: "Is my information secure?",
    answer: "Absolutely. We use enterprise-grade encryption and HIPAA-compliant systems. Your health information is never shared without your explicit consent.",
  },
];

const HowItWorksPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-soft-linen via-pure-white to-light-cloud">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20">
          <div className="absolute inset-0 bg-gradient-to-b from-warm-stone/5 to-transparent" />
          <div className="container relative px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-warm-stone/20 bg-pure-white/80 px-4 py-2 backdrop-blur-sm"
              >
                <Sparkles className="h-4 w-4 text-warm-stone" />
                <span className="text-sm font-medium text-warm-stone">Premium Care. Zero Friction.</span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-6 font-display text-4xl font-bold text-rich-black md:text-5xl"
              >
                How It Works
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-warm-gray"
              >
                We built Elevare for men who value their time as much as their health. Every step is designed to fit your life, not the other way around.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-20">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl">
              <div className="relative">
                {/* Connection Line */}
                <div className="absolute left-6 top-0 hidden h-full w-0.5 bg-gradient-to-b from-warm-stone via-warm-stone/50 to-warm-stone md:block" />
                
                <div className="space-y-12">
                  {steps.map((step, index) => (
                    <motion.div
                      key={step.number}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="relative flex gap-6"
                    >
                      {/* Icon */}
                      <div className="relative z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-4 border-pure-white bg-warm-stone shadow-lg">
                        <step.icon className="h-6 w-6 text-pure-white" />
                      </div>
                      
                      {/* Content */}
                      <Card variant="glass" className="flex-1 p-6">
                        <span className="mb-1 block text-sm font-bold text-warm-stone">Step {step.number}</span>
                        <h3 className="mb-3 font-display text-xl font-bold text-rich-black">{step.title}</h3>
                        <p className="text-warm-gray">{step.description}</p>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="relative py-20">
          <div className="absolute inset-0 bg-gradient-to-b from-warm-stone/5 via-transparent to-warm-stone/5" />
          <div className="container relative px-4 md:px-6">
            <div className="mx-auto max-w-3xl">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-8 text-center font-display text-3xl font-bold text-rich-black"
              >
                Common Questions
              </motion.h2>
              <div className="grid gap-4 md:grid-cols-2">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card variant="glass" className="h-full p-6">
                      <h3 className="mb-2 font-display text-lg font-bold text-rich-black">{faq.question}</h3>
                      <p className="text-sm text-warm-gray">{faq.answer}</p>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card variant="glassDark" className="mx-auto max-w-2xl p-8 text-center md:p-12">
                <h2 className="mb-4 font-display text-3xl font-bold text-pure-white">Ready to Get Started?</h2>
                <p className="mb-8 text-pure-white/70">
                  Take the first step toward feeling like yourself again. Your card is only charged if you're approved.
                </p>
                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Link to="/intake">
                    <Button size="lg" className="bg-warm-stone hover:bg-warm-stone/90 text-pure-white">
                      Start Your Free Assessment
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Button size="lg" variant="outline" className="border-pure-white/30 text-pure-white hover:bg-pure-white/10">
                    Book Video Consultation - $99
                  </Button>
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

export default HowItWorksPage;
