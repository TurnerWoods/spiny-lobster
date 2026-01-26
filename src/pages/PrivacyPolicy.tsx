import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-20">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="mb-8 font-display text-4xl font-bold text-foreground">Privacy Policy</h1>
              <p className="mb-8 text-muted-foreground">Effective Date: January 2025</p>

              <div className="prose prose-invert max-w-none space-y-8 text-muted-foreground">
                <section>
                  <h2 className="mb-4 font-display text-2xl font-bold text-foreground">1. Introduction & Scope</h2>
                  <p>
                    This Privacy Policy describes how Elevare Health MSO LLC ("we", "our", or "us") collects, uses, discloses, and protects information. It applies to our websites, mobile applications, telehealth platform, patient portal, and related services (collectively, the "Services").
                  </p>
                </section>

                <section>
                  <h2 className="mb-4 font-display text-2xl font-bold text-foreground">2. Information We Collect</h2>
                  <p>We collect personal information through several methods:</p>
                  <ul className="ml-6 mt-2 list-disc space-y-2">
                    <li>Information provided directly when creating an account, completing intake forms, communicating with clinicians, or purchasing services</li>
                    <li>Information collected automatically through your device (cookies, analytics, IP address, usage logs)</li>
                    <li>Information received from third parties such as affiliated pharmacies, laboratories, and payment processors</li>
                  </ul>
                </section>

                <section>
                  <h2 className="mb-4 font-display text-2xl font-bold text-foreground">3. Protected Health Information (PHI)</h2>
                  <p>
                    If you are a patient receiving telehealth services, certain health information collected and processed on behalf of independent clinicians may be considered Protected Health Information ("PHI") subject to the Health Insurance Portability and Accountability Act of 1996 ("HIPAA").
                  </p>
                  <p className="mt-2">
                    When HIPAA applies, PHI will be used and disclosed only as permitted under HIPAA and our agreements with clinicians, pharmacies, and business associates. If there is any inconsistency between this Policy and HIPAA with respect to PHI, HIPAA will control.
                  </p>
                </section>

                <section>
                  <h2 className="mb-4 font-display text-2xl font-bold text-foreground">4. How We Use Your Information</h2>
                  <p>We use collected information to:</p>
                  <ul className="ml-6 mt-2 list-disc space-y-2">
                    <li>Provide, maintain, and improve our Services</li>
                    <li>Process transactions and send related information</li>
                    <li>Send technical notices, updates, and support messages</li>
                    <li>Respond to your comments, questions, and customer service requests</li>
                    <li>Comply with legal obligations</li>
                  </ul>
                </section>

                <section>
                  <h2 className="mb-4 font-display text-2xl font-bold text-foreground">5. Information Security</h2>
                  <p>
                    We use enterprise-grade encryption and HIPAA-compliant systems to protect your information. Your health information is never shared without your explicit consent, except as required by law or for treatment purposes as permitted under HIPAA.
                  </p>
                </section>

                <section>
                  <h2 className="mb-4 font-display text-2xl font-bold text-foreground">6. United States Only</h2>
                  <p>
                    Elevare Health operates in the United States and our services are intended solely for U.S. residents. We do not target or market to residents of the European Union, United Kingdom, or other foreign jurisdictions. If you are located outside the United States, you should not use our Services.
                  </p>
                </section>

                <section>
                  <h2 className="mb-4 font-display text-2xl font-bold text-foreground">7. Contact Us</h2>
                  <p>
                    If you have questions about this Privacy Policy, please contact us at{" "}
                    <a href="mailto:info@elevarehealth.com" className="text-primary hover:underline">
                      info@elevarehealth.com
                    </a>
                  </p>
                </section>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
