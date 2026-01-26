import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Mail, MapPin, Clock, Phone, MessageSquare, Users, Plus, Minus, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

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
    question: "How is medication shipped?",
    answer: "All shipments arrive in discreet, unmarked packaging within 3-5 business days after your prescription is processed."
  },
];

const FAQItem = ({ faq, isOpen, onClick }: { faq: typeof faqs[0]; isOpen: boolean; onClick: () => void }) => {
  return (
    <div className="border-b border-warm-stone/10 last:border-0">
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between gap-3 py-4 text-left transition-colors hover:text-warm-stone"
      >
        <span className="font-medium text-rich-black">{faq.question}</span>
        <span className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border transition-all ${
          isOpen ? "rotate-180 border-warm-stone bg-warm-stone text-pure-white" : "border-warm-stone/30 text-warm-stone/60"
        }`}>
          {isOpen ? <Minus className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
        </span>
      </button>
      {isOpen && (
        <p className="pb-4 text-sm text-muted-foreground">{faq.answer}</p>
      )}
    </div>
  );
};

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast({
      title: "Message Sent",
      description: "We'll get back to you within 24 hours.",
    });
    
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-soft-linen via-pure-white to-light-cloud">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-warm-stone/5 to-transparent py-16 sm:py-20">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-4 inline-block rounded-full border border-warm-stone/20 bg-warm-stone/10 px-4 py-1 text-sm font-medium text-warm-stone"
              >
                Contact Us
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-6 font-display text-3xl font-bold text-rich-black sm:text-4xl md:text-5xl"
              >
                We're Here When You Need Us
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-base text-muted-foreground sm:text-lg"
              >
                Questions about getting started? Our team is ready to help. No sales pressure. Just honest answers.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-12 sm:py-20">
          <div className="container px-4 md:px-6">
            <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2 lg:gap-12">
              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="mb-6 font-display text-2xl font-bold text-rich-black">Contact Information</h2>
                
                <div className="mb-8 space-y-4">
                  <a 
                    href="tel:512-270-8701"
                    className="flex items-start gap-4 rounded-xl border border-pure-white/40 bg-pure-white/60 p-4 backdrop-blur-sm transition-all hover:bg-pure-white/80 hover:shadow-md"
                  >
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-warm-stone/10 text-warm-stone">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-rich-black">Phone</h3>
                      <p className="text-muted-foreground">(512) 270-8701</p>
                    </div>
                  </a>
                  
                  <a 
                    href="mailto:info@elevarehealth.com"
                    className="flex items-start gap-4 rounded-xl border border-pure-white/40 bg-pure-white/60 p-4 backdrop-blur-sm transition-all hover:bg-pure-white/80 hover:shadow-md"
                  >
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-warm-stone/10 text-warm-stone">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-rich-black">Email</h3>
                      <p className="text-muted-foreground">info@elevarehealth.com</p>
                    </div>
                  </a>
                  
                  <a 
                    href="https://maps.google.com/?q=1401+Lavaca+St,+Austin,+TX+78701"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 rounded-xl border border-pure-white/40 bg-pure-white/60 p-4 backdrop-blur-sm transition-all hover:bg-pure-white/80 hover:shadow-md"
                  >
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-warm-stone/10 text-warm-stone">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-rich-black">Address</h3>
                      <p className="text-muted-foreground">1401 Lavaca St, Suite 388</p>
                      <p className="text-muted-foreground">Austin, TX 78701</p>
                    </div>
                  </a>
                  
                  <div className="flex items-start gap-4 rounded-xl border border-pure-white/40 bg-pure-white/60 p-4 backdrop-blur-sm">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-warm-stone/10 text-warm-stone">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-rich-black">Hours</h3>
                      <p className="text-muted-foreground">Monday - Friday, 8am - 6pm CT</p>
                    </div>
                  </div>
                </div>

                {/* Existing Patients */}
                <div className="mb-6 rounded-xl border border-pure-white/40 bg-pure-white/70 p-5 shadow-sm backdrop-blur-sm">
                  <div className="mb-3 flex items-center gap-3">
                    <MessageSquare className="h-5 w-5 text-warm-stone" />
                    <h3 className="font-display text-lg font-bold text-rich-black">Existing Patients</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Current patients can reach their care team directly through secure messaging in the patient portal. This ensures HIPAA compliance and faster response times for health-related questions.
                  </p>
                </div>

                {/* Provider Partnerships */}
                <div className="rounded-xl border border-pure-white/40 bg-pure-white/70 p-5 shadow-sm backdrop-blur-sm">
                  <div className="mb-3 flex items-center gap-3">
                    <Users className="h-5 w-5 text-warm-stone" />
                    <h3 className="font-display text-lg font-bold text-rich-black">Provider Partnerships</h3>
                  </div>
                  <p className="mb-3 text-sm text-muted-foreground">
                    Are you a licensed physician interested in partnering with Elevare? We're building a network of Texas-licensed providers who share our commitment to accessible, high-quality men's health care.
                  </p>
                  <a href="mailto:providers@elevarehealth.com" className="text-sm font-medium text-warm-stone transition-colors hover:text-warm-stone/80 hover:underline">
                    Contact us at providers@elevarehealth.com
                  </a>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="rounded-2xl border border-pure-white/40 bg-pure-white/80 p-6 shadow-xl backdrop-blur-xl sm:p-8">
                  <h2 className="mb-6 font-display text-2xl font-bold text-rich-black">Send Us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-rich-black">Full Name</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="John Smith"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-rich-black">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="john@example.com"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-rich-black">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="(512) 555-0123"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject" className="text-rich-black">Subject</Label>
                        <Input
                          id="subject"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          placeholder="How can we help?"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-rich-black">Message</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us more about your inquiry..."
                        rows={5}
                        required
                      />
                    </div>
                    
                    <p className="text-xs text-muted-foreground">
                      Note: Please do not include personal health information in this form.
                    </p>
                    
                    <Button
                      type="submit"
                      className="w-full bg-warm-stone text-pure-white shadow-lg transition-all hover:bg-warm-stone/90 hover:shadow-xl"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>

                  {/* Trust Badge */}
                  <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <Shield className="h-4 w-4 text-warm-stone" />
                    <span>HIPAA Compliant • Secure Form</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Embedded FAQs */}
        <section className="border-t border-warm-stone/10 bg-soft-linen/50 py-12 sm:py-20">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-8 text-center"
              >
                <h2 className="mb-3 font-display text-2xl font-bold text-rich-black sm:text-3xl">
                  Frequently Asked Questions
                </h2>
                <p className="text-muted-foreground">
                  Quick answers to common questions
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-xl border border-pure-white/40 bg-pure-white/80 p-4 shadow-lg backdrop-blur-xl sm:p-6"
              >
                {faqs.map((faq, index) => (
                  <FAQItem
                    key={index}
                    faq={faq}
                    isOpen={openFaqIndex === index}
                    onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  />
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
