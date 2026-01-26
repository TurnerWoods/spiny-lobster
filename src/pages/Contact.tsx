import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Mail, MapPin, Clock, MessageSquare, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
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
    
    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

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
                Contact Us
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-6 font-display text-4xl font-bold text-foreground md:text-5xl"
              >
                We're Here When You Need Us
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-muted-foreground"
              >
                Questions about getting started? Our team is ready to help. No sales pressure. Just honest answers.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-20">
          <div className="container px-4 md:px-6">
            <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2">
              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="mb-6 font-display text-2xl font-bold text-foreground">Contact Information</h2>
                
                <div className="mb-8 space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">General Inquiries</h3>
                      <a href="mailto:info@elevarehealth.com" className="text-muted-foreground hover:text-primary">
                        info@elevarehealth.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Markets Served</h3>
                      <p className="text-muted-foreground">Austin • Houston • Dallas</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Hours</h3>
                      <p className="text-muted-foreground">Monday - Friday, 8am - 6pm CT</p>
                    </div>
                  </div>
                </div>

                {/* Existing Patients */}
                <div className="mb-8 rounded-xl border bg-card p-6">
                  <div className="mb-3 flex items-center gap-3">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    <h3 className="font-display text-lg font-bold text-foreground">Existing Patients</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Current patients can reach their care team directly through secure messaging in the patient portal. This ensures HIPAA compliance and faster response times for health-related questions.
                  </p>
                </div>

                {/* Provider Partnerships */}
                <div className="rounded-xl border bg-card p-6">
                  <div className="mb-3 flex items-center gap-3">
                    <Users className="h-5 w-5 text-primary" />
                    <h3 className="font-display text-lg font-bold text-foreground">Provider Partnerships</h3>
                  </div>
                  <p className="mb-3 text-sm text-muted-foreground">
                    Are you a licensed physician interested in partnering with Elevare? We're building a network of Texas-licensed providers who share our commitment to accessible, high-quality men's health care.
                  </p>
                  <a href="mailto:providers@elevarehealth.com" className="text-sm font-medium text-primary hover:underline">
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
                <div className="rounded-2xl border bg-card p-8">
                  <h2 className="mb-6 font-display text-2xl font-bold text-foreground">Send Us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="John Smith"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
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
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="How can we help?"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
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
                      className="w-full bg-primary hover:bg-primary-dark"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </div>
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
