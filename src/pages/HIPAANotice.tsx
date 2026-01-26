import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const HIPAANotice = () => {
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
              <h1 className="mb-8 font-display text-4xl font-bold text-foreground">HIPAA Notice of Privacy Practices</h1>
              <p className="mb-8 text-muted-foreground">Effective Date: January 2025</p>

              <div className="prose prose-invert max-w-none space-y-8 text-muted-foreground">
                <section>
                  <h2 className="mb-4 font-display text-2xl font-bold text-foreground">Your Information. Your Rights. Our Responsibilities.</h2>
                  <p>
                    This notice describes how medical information about you may be used and disclosed and how you can get access to this information. Please review it carefully.
                  </p>
                </section>

                <section>
                  <h2 className="mb-4 font-display text-2xl font-bold text-foreground">Your Rights</h2>
                  <p>When it comes to your health information, you have certain rights:</p>
                  <ul className="ml-6 mt-2 list-disc space-y-2">
                    <li><strong>Get a copy of your health records:</strong> You can ask to see or get a copy of your medical records and other health information we have about you.</li>
                    <li><strong>Ask us to correct your records:</strong> You can ask us to correct health information about you that you think is incorrect or incomplete.</li>
                    <li><strong>Request confidential communications:</strong> You can ask us to contact you in a specific way or to send mail to a different address.</li>
                    <li><strong>Ask us to limit what we use or share:</strong> You can ask us not to use or share certain health information for treatment, payment, or our operations.</li>
                    <li><strong>Get a list of those with whom we've shared information:</strong> You can ask for a list of the times we've shared your health information for six years prior to the date you ask.</li>
                    <li><strong>Get a copy of this privacy notice:</strong> You can ask for a paper copy of this notice at any time, even if you have agreed to receive the notice electronically.</li>
                    <li><strong>File a complaint if you feel your rights are violated:</strong> You can complain if you feel we have violated your rights by contacting us or the U.S. Department of Health and Human Services.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="mb-4 font-display text-2xl font-bold text-foreground">Our Uses and Disclosures</h2>
                  <p>We may use and share your health information in the following ways:</p>
                  <ul className="ml-6 mt-2 list-disc space-y-2">
                    <li><strong>Treatment:</strong> We can use your health information and share it with other professionals who are treating you.</li>
                    <li><strong>Running our organization:</strong> We can use and share your health information to run our practice, improve your care, and contact you when necessary.</li>
                    <li><strong>Billing:</strong> We can use and share your health information to bill and get payment from health plans or other entities.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="mb-4 font-display text-2xl font-bold text-foreground">Our Responsibilities</h2>
                  <ul className="ml-6 list-disc space-y-2">
                    <li>We are required by law to maintain the privacy and security of your protected health information.</li>
                    <li>We will let you know promptly if a breach occurs that may have compromised the privacy or security of your information.</li>
                    <li>We must follow the duties and privacy practices described in this notice and give you a copy of it.</li>
                    <li>We will not use or share your information other than as described here unless you tell us we can in writing.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="mb-4 font-display text-2xl font-bold text-foreground">Contact Information</h2>
                  <p>
                    If you have questions about this notice or our privacy practices, please contact us at{" "}
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

export default HIPAANotice;
