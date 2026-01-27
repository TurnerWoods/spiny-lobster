import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Users, Target, Shield, HeartHandshake, Building2, Sparkles, MapPin, Phone, Mail } from "lucide-react";
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
  return (
    <div className="min-h-screen bg-gradient-to-b from-soft-linen via-pure-white to-light-cloud">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
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
                className="mb-6 font-display text-4xl font-bold text-rich-black md:text-5xl lg:text-6xl"
              >
                Healthcare Built for{" "}
                <span className="text-warm-stone">How You Live</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-warm-gray leading-relaxed"
              >
                Elevare Health was founded on a simple observation: successful men don't have time for traditional healthcare, but they need it more than ever. The demands of building careers, leading teams, and raising families take a physical toll. Yet the healthcare system isn't built for people with packed calendars and high standards.
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
                      <h2 className="font-display text-2xl font-bold text-rich-black md:text-3xl">Our Mission</h2>
                    </div>
                    <p className="text-warm-gray leading-relaxed">
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
                  <h2 className="font-display text-2xl font-bold text-rich-black md:text-3xl">Our Approach</h2>
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
                          <h3 className="mb-2 font-display text-lg font-bold text-warm-stone">{item.title}</h3>
                          <p className="text-sm text-warm-gray leading-relaxed">{item.desc}</p>
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
                  <h2 className="text-center font-display text-2xl font-bold text-rich-black md:text-3xl">Leadership Team</h2>
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
                        <h3 className="mb-1 font-display text-xl font-bold text-rich-black">Dr. Paul Myers, DO</h3>
                        <p className="mb-4 text-sm font-medium text-warm-stone">Co-Founder & Medical Director</p>
                        <p className="text-sm text-warm-gray leading-relaxed">
                          Graduated from Lake Erie College of Osteopathic Medicine (2010). Board-certified emergency medicine physician with 15+ years clinical experience. Oversees all clinical care and personally treats patients.
                        </p>
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
                        <h3 className="mb-1 font-display text-xl font-bold text-rich-black">Paul Eckdale</h3>
                        <p className="mb-4 text-sm font-medium text-warm-stone">Co-Founder</p>
                        <p className="text-sm text-warm-gray leading-relaxed">
                          16+ years medical field experience. Focus on pharmacy operations and provider-pharmacy coordination. Oversees pharmacy relationships.
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
                          <p className="mb-1 font-display text-xl font-bold text-warm-stone md:text-2xl">{stat.value}</p>
                          <p className="text-xs text-warm-gray">{stat.label}</p>
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
                  <h2 className="text-center font-display text-2xl font-bold text-rich-black md:text-3xl">Core Values</h2>
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
                            <h3 className="mb-2 font-display text-lg font-bold text-rich-black">{value.title}</h3>
                            <p className="text-sm text-warm-gray leading-relaxed">{value.description}</p>
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
                    <h3 className="mb-6 font-display text-xl font-bold text-rich-black text-center">Get in Touch</h3>
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="flex items-center gap-3 justify-center md:justify-start">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-warm-stone/10">
                          <MapPin className="h-5 w-5 text-warm-stone" />
                        </div>
                        <div>
                          <p className="text-sm text-warm-gray">1401 Lavaca St</p>
                          <p className="text-sm text-warm-gray">Austin, TX 78701</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 justify-center">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-warm-stone/10">
                          <Phone className="h-5 w-5 text-warm-stone" />
                        </div>
                        <p className="text-sm text-warm-gray">512-270-8701</p>
                      </div>
                      <div className="flex items-center gap-3 justify-center md:justify-end">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-warm-stone/10">
                          <Mail className="h-5 w-5 text-warm-stone" />
                        </div>
                        <p className="text-sm text-warm-gray">info@elevarehealth.com</p>
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
                  <h2 className="mb-4 font-display text-3xl font-bold text-pure-white">Ready to Get Started?</h2>
                  <p className="mb-8 text-pure-white/70 max-w-md mx-auto">
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
      </main>
      <Footer />
    </div>
  );
};

export default About;
