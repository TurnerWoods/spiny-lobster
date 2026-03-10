import { useState, useRef } from "react";
import heroImage from "@/assets/hero-vials.jpg";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Target, Shield, HeartHandshake, Building2, Sparkles, MapPin, Phone, Mail, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const stats = [
  { label: "Physician Response Time", value: "< 24 hours" },
  { label: "Shipping", value: "3-5 business days" },
  { label: "States Served", value: "30+" },
  { label: "Platform", value: "HIPAA-Compliant" },
];

const values = [
  {
    icon: Target,
    title: "Transparent Pricing",
    description: "Clear costs, no hidden fees. No confusion about what you're paying for.",
  },
  {
    icon: Shield,
    title: "Safety First",
    description: "All care guided by licensed medical providers. Evidence-based practices.",
  },
  {
    icon: HeartHandshake,
    title: "Patient-Centered Support",
    description: "Access to ongoing support through secure messaging. Optional video visits.",
  },
  {
    icon: Users,
    title: "Compliance & Integrity",
    description: "HIPAA-compliant systems. Adherence to state and federal telehealth regulations.",
  },
];

const About = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-soft-linen via-pure-white to-light-cloud">
      <Header />
      <main>
        {/* Hero Section with Image */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src={heroImage}
              alt="Elevare Health branded medication vials"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-soft-linen via-soft-linen/95 to-soft-linen/80" />
          </div>
          
          <div className="container relative z-10 px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-warm-stone/20 bg-pure-white/80 px-4 py-2 shadow-sm backdrop-blur-sm"
              >
                <Building2 className="h-4 w-4 text-warm-stone" />
                <span className="text-sm font-medium text-warm-stone">About Elevare Health</span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-6 font-display text-5xl font-bold leading-tight tracking-tight text-rich-black lg:text-6xl"
              >
                Healthcare Built{" "}
                <span className="text-warm-stone">for You</span>
                {" "}— How You Live
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="lead text-deep-charcoal/80"
              >
                Elevare Health was founded on a simple observation: busy men and women don't have time for traditional healthcare, but they need it more than ever. The demands of building careers, leading teams, and raising families take a physical toll. Yet the healthcare system isn't built for people with packed calendars and high standards.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 md:py-20">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-16"
              >
                <Card variant="glass" className="overflow-hidden">
                  <CardContent className="p-8 md:p-10">
                    <div className="flex items-center gap-3 mb-4">
                      <Sparkles className="h-5 w-5 text-warm-stone" />
                      <h2 className="font-display text-3xl font-semibold tracking-tight text-rich-black">Our Mission</h2>
                    </div>
                    <p className="text-body text-deep-charcoal/80">
                      We created Elevare to bridge that gap. Our platform combines the expertise of board-certified physicians with the convenience of modern technology. No waiting rooms. No insurance paperwork. No judgment. Just personalized care delivered on your terms.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Our Approach */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-16"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Target className="h-5 w-5 text-warm-stone" />
                  <h2 className="font-display text-3xl font-semibold tracking-tight text-rich-black">Our Approach</h2>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {[
                    { title: "Physician-First", desc: "Every treatment decision is made by a licensed physician, not an algorithm. Our medical team personally reviews each case." },
                    { title: "Nationwide Reach", desc: "We serve 30+ states across America. Our physicians understand the diverse needs of modern professionals." },
                    { title: "Radically Transparent", desc: "Clear pricing. Honest communication. No upsells. We tell you exactly what to expect." },
                    { title: "Concierge-Level Service", desc: "Direct access to your care team. Fast response times. The healthcare experience you deserve." },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card variant="glass" className="h-full transition-all duration-300 hover:shadow-lg hover:border-warm-stone/30">
                        <CardContent className="p-6">
                          <h3 className="mb-2 font-display text-xl font-semibold tracking-normal text-deep-charcoal">{item.title}</h3>
                          <p className="text-body-sm text-deep-charcoal/75">{item.desc}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Leadership Section */}
        <section className="py-16 md:py-20 bg-gradient-to-b from-transparent via-warm-stone/5 to-transparent">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center justify-center gap-3 mb-8">
                  <Users className="h-5 w-5 text-warm-stone" />
                  <h2 className="text-center font-display text-3xl font-semibold tracking-tight text-rich-black">Leadership Team</h2>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    <Card variant="glass" className="h-full transition-all duration-300 hover:shadow-lg">
                      <CardContent className="p-8 text-center">
                        <div className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-warm-stone/10 to-warm-stone/20 text-warm-stone shadow-inner">
                          <span className="font-display text-3xl font-bold">PM</span>
                        </div>
                        <h3 className="mb-1 font-display text-2xl font-semibold tracking-normal text-rich-black">Dr. Paul Myers, DO</h3>
                        <p className="text-eyebrow mb-4 text-deep-charcoal/70">Co-Founder & Medical Director</p>
                        <p className="text-body-sm text-deep-charcoal/80 mb-4">
                          Graduated from Lake Erie College of Osteopathic Medicine (2010). Board-certified emergency medicine physician with 15+ years clinical experience. Oversees all clinical care and personally treats patients.
                        </p>
                        <Button
                          variant="outline"
                          className="border-warm-stone/30 text-warm-stone hover:bg-warm-stone/10"
                          onClick={() => setIsBookingOpen(true)}
                        >
                          Book with Dr. Myers
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                  >
                    <Card variant="glass" className="h-full transition-all duration-300 hover:shadow-lg">
                      <CardContent className="p-8 text-center">
                        <div className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-warm-stone/10 to-warm-stone/20 text-warm-stone shadow-inner">
                          <span className="font-display text-3xl font-bold">PE</span>
                        </div>
                        <h3 className="mb-1 font-display text-2xl font-semibold tracking-normal text-rich-black">P. Eckdale</h3>
                        <p className="text-eyebrow mb-4 text-deep-charcoal/70">Co-Founder</p>
                        <p className="text-body-sm text-deep-charcoal/80">
                          Nearly 2 decades in the Healthcare space.
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 md:py-20">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card variant="glass" className="h-full transition-all duration-300 hover:shadow-lg">
                        <CardContent className="p-5 text-center">
                          <p className="text-stat mb-1 text-2xl text-deep-charcoal">{stat.value}</p>
                          <p className="text-sm text-deep-charcoal/70">{stat.label}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 md:py-20">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center justify-center gap-3 mb-8">
                  <Shield className="h-5 w-5 text-warm-stone" />
                  <h2 className="text-center font-display text-3xl font-semibold tracking-tight text-rich-black">Core Values</h2>
                </div>
                <div className="grid gap-5 md:grid-cols-2">
                  {values.map((value, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card variant="glass" className="h-full transition-all duration-300 hover:shadow-lg hover:border-warm-stone/30">
                        <CardContent className="flex gap-4 p-6">
                          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-warm-stone/10 to-warm-stone/20 text-warm-stone">
                            <value.icon className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="mb-2 font-display text-xl font-semibold tracking-normal text-rich-black">{value.title}</h3>
                            <p className="text-body-sm text-deep-charcoal/80">{value.description}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-16 md:py-20">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Card variant="glass">
                  <CardContent className="p-8">
                    <h3 className="mb-6 font-display text-2xl font-semibold tracking-normal text-rich-black text-center">Get in Touch</h3>
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="flex items-center gap-3 justify-center md:justify-start">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-warm-stone/10">
                          <MapPin className="h-5 w-5 text-warm-stone" />
                        </div>
                        <div>
                          <p className="text-sm text-deep-charcoal/80">1401 Lavaca St</p>
                          <p className="text-sm text-deep-charcoal/80">Austin, TX 78701</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 justify-center">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-warm-stone/10">
                          <Phone className="h-5 w-5 text-warm-stone" />
                        </div>
                        <p className="text-sm text-deep-charcoal/80">512-270-8701</p>
                      </div>
                      <div className="flex items-center gap-3 justify-center md:justify-end">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-warm-stone/10">
                          <Mail className="h-5 w-5 text-warm-stone" />
                        </div>
                        <p className="text-sm text-deep-charcoal/80">info@elevarehealth.com</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-20">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mx-auto max-w-2xl"
            >
              <Card variant="glassDark" className="overflow-hidden">
                <CardContent className="p-8 text-center md:p-12">
                  <Sparkles className="mx-auto mb-4 h-8 w-8 text-warm-stone" />
                  <h2 className="mb-4 font-display text-4xl font-semibold tracking-tight text-pure-white">Ready to Get Started?</h2>
                  <p className="text-body-lg mb-8 text-pure-white/90 max-w-md mx-auto">
                    Take the first step toward feeling like yourself again. Our free assessment takes just 5 minutes.
                  </p>
                  <Link to="/intake">
                    <Button size="lg" className="bg-warm-stone text-pure-white shadow-lg hover:bg-warm-stone/90 transition-all duration-300 hover:shadow-xl">
                      Start Your Free Assessment
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
        {/* Booking Modal */}
        <AnimatePresence>
          {isBookingOpen && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsBookingOpen(false)}
            >
              {/* Backdrop */}
              <motion.div
                className="absolute inset-0 bg-rich-black/60 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />

              {/* Modal */}
              <motion.div
                className="relative w-full max-w-3xl rounded-2xl border border-warm-stone/20 bg-pure-white shadow-2xl"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between border-b border-warm-stone/10 px-6 py-4">
                  <h3 className="font-display text-lg font-semibold text-rich-black">Book with Dr. Paul Myers</h3>
                  <button
                    className="flex h-8 w-8 items-center justify-center rounded-full text-warm-gray transition-colors hover:bg-warm-stone/10 hover:text-rich-black"
                    onClick={() => setIsBookingOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="p-2">
                  <iframe
                    src="https://secure.gethealthie.com/appointments/embed_appt?dietitian_id=13804905&provider_ids=%5B13804905%5D&appt_type_ids=%5B515479,515480,515481%5D"
                    className="w-full border-0"
                    style={{ minHeight: '600px' }}
                    title="Book an appointment with Dr. Paul Myers"
                  />
                  <p className="py-2 text-center text-xs text-deep-charcoal/70">
                    Booking Provided by{' '}
                    <a href="https://gethealthie.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-deep-charcoal">
                      Healthie
                    </a>
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
};

export default About;
