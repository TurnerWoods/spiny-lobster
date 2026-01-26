import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Users, Target, Shield, HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const stats = [
  { label: "Physician Response Time", value: "< 24 hours" },
  { label: "Shipping", value: "3-5 business days" },
  { label: "Markets Served", value: "Austin, Houston, Dallas" },
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
                About Us
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-6 font-display text-4xl font-bold text-foreground md:text-5xl"
              >
                Healthcare Built for How You Live
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-muted-foreground"
              >
                Elevare Health was founded on a simple observation: successful men don't have time for traditional healthcare, but they need it more than ever. The demands of building careers, leading teams, and raising families take a physical toll. Yet the healthcare system isn't built for people with packed calendars and high standards.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-16"
              >
                <h2 className="mb-6 font-display text-3xl font-bold text-foreground">Our Mission</h2>
                <p className="mb-4 text-muted-foreground">
                  We created Elevare to bridge that gap. Our platform combines the expertise of board-certified physicians with the convenience of modern technology. No waiting rooms. No insurance paperwork. No judgment. Just personalized care delivered on your terms.
                </p>
              </motion.div>

              {/* Our Approach */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-16"
              >
                <h2 className="mb-6 font-display text-3xl font-bold text-foreground">Our Approach</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-xl border bg-card p-6">
                    <h3 className="mb-2 font-display text-lg font-bold text-primary">Physician-First</h3>
                    <p className="text-sm text-muted-foreground">Every treatment decision is made by a licensed physician, not an algorithm. Our medical team personally reviews each case.</p>
                  </div>
                  <div className="rounded-xl border bg-card p-6">
                    <h3 className="mb-2 font-display text-lg font-bold text-primary">Texas-Focused</h3>
                    <p className="text-sm text-muted-foreground">We serve Texas exclusively. Our physicians understand the unique needs and lifestyles of Texas professionals.</p>
                  </div>
                  <div className="rounded-xl border bg-card p-6">
                    <h3 className="mb-2 font-display text-lg font-bold text-primary">Radically Transparent</h3>
                    <p className="text-sm text-muted-foreground">Clear pricing. Honest communication. No upsells. We tell you exactly what to expect.</p>
                  </div>
                  <div className="rounded-xl border bg-card p-6">
                    <h3 className="mb-2 font-display text-lg font-bold text-primary">Concierge-Level Service</h3>
                    <p className="text-sm text-muted-foreground">Direct access to your care team. Fast response times. The healthcare experience you deserve.</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Leadership Section */}
        <section className="bg-muted/30 py-20">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="mb-8 text-center font-display text-3xl font-bold text-foreground">Leadership Team</h2>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="rounded-xl border bg-card p-6 text-center">
                    <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <span className="font-display text-2xl font-bold">PM</span>
                    </div>
                    <h3 className="mb-1 font-display text-xl font-bold text-foreground">Dr. Paul Myers, DO</h3>
                    <p className="mb-3 text-sm font-medium text-primary">Co-Founder & Medical Director</p>
                    <p className="text-sm text-muted-foreground">
                      Graduated from Lake Erie College of Osteopathic Medicine (2010). Board-certified emergency medicine physician with 15+ years clinical experience. Oversees all clinical care and personally treats patients.
                    </p>
                  </div>
                  <div className="rounded-xl border bg-card p-6 text-center">
                    <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <span className="font-display text-2xl font-bold">PE</span>
                    </div>
                    <h3 className="mb-1 font-display text-xl font-bold text-foreground">Paul Eckdale</h3>
                    <p className="mb-3 text-sm font-medium text-primary">Co-Founder</p>
                    <p className="text-sm text-muted-foreground">
                      16+ years medical field experience. Focus on pharmacy operations and provider-pharmacy coordination. Oversees pharmacy relationships.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="mb-8 text-center font-display text-3xl font-bold text-foreground">Key Stats</h2>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  {stats.map((stat, index) => (
                    <div key={index} className="rounded-xl border bg-card p-4 text-center">
                      <p className="mb-1 font-display text-lg font-bold text-primary">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="bg-muted/30 py-20">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="mb-8 text-center font-display text-3xl font-bold text-foreground">Core Values</h2>
                <div className="grid gap-6 md:grid-cols-2">
                  {values.map((value, index) => (
                    <div key={index} className="flex gap-4 rounded-xl border bg-card p-6">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <value.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="mb-2 font-display text-lg font-bold text-foreground">{value.title}</h3>
                        <p className="text-sm text-muted-foreground">{value.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
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
                Take the first step toward feeling like yourself again. Our free assessment takes just 5 minutes.
              </p>
              <Link to="/intake">
                <Button size="lg" className="bg-primary hover:bg-primary-dark">
                  Start Your Free Assessment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
