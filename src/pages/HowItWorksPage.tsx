import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { ClipboardList, UserCheck, Video, Truck, MessageSquare, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
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
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/10 to-background py-20">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-4 inline-block rounded-full bg-primary-light px-4 py-1 text-sm font-medium text-primary"
              >
                Premium Care. Zero Friction.
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-6 font-display text-4xl font-bold text-foreground md:text-5xl"
              >
                How It Works
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-muted-foreground"
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
                <div className="absolute left-6 top-0 hidden h-full w-0.5 bg-gradient-to-b from-primary via-primary/50 to-primary md:block" />
                
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
                      <div className="relative z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-4 border-background bg-primary shadow-lg">
                        <step.icon className="h-6 w-6 text-primary-foreground" />
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 rounded-xl border bg-card p-6">
                        <span className="mb-1 block text-sm font-bold text-primary">Step {step.number}</span>
                        <h3 className="mb-3 font-display text-xl font-bold text-foreground">{step.title}</h3>
                        <p className="text-muted-foreground">{step.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-muted/30 py-20">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-8 text-center font-display text-3xl font-bold text-foreground"
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
                    className="rounded-xl border bg-card p-6"
                  >
                    <h3 className="mb-2 font-display text-lg font-bold text-foreground">{faq.question}</h3>
                    <p className="text-sm text-muted-foreground">{faq.answer}</p>
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
              className="mx-auto max-w-2xl text-center"
            >
              <h2 className="mb-4 font-display text-3xl font-bold text-foreground">Ready to Get Started?</h2>
              <p className="mb-8 text-muted-foreground">
                Take the first step toward feeling like yourself again. Your card is only charged if you're approved.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link to="/intake">
                  <Button size="lg" className="bg-primary hover:bg-primary-dark">
                    Start Your Free Assessment
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline">
                  Book Video Consultation - $99
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorksPage;
