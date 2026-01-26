import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const TermsOfUse = () => {
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
              <h1 className="mb-8 font-display text-4xl font-bold text-foreground">Terms of Use</h1>
              <p className="mb-8 text-muted-foreground">Effective Date: January 2025</p>

              <div className="prose prose-invert max-w-none space-y-8 text-muted-foreground">
                <section>
                  <h2 className="mb-4 font-display text-2xl font-bold text-foreground">1. Services Overview</h2>
                  <p>
                    Elevare Health MSO LLC is a technology and administrative services company. It does not practice medicine or dispense medications. All medical decisions, diagnoses, and prescriptions are made exclusively by licensed physicians through Elevare Health Medical PLLC.
                  </p>
                </section>

                <section>
                  <h2 className="mb-4 font-display text-2xl font-bold text-foreground">2. Eligibility</h2>
                  <p>
                    Our services are available only to Texas residents who are at least 18 years of age. By using our Services, you represent that you meet these eligibility requirements.
                  </p>
                </section>

                <section>
                  <h2 className="mb-4 font-display text-2xl font-bold text-foreground">3. No Emergency or Urgent Care</h2>
                  <p>
                    Our Services are not intended for medical emergencies or urgent care. If you are experiencing a medical emergency, call 911 or go to your nearest emergency room immediately.
                  </p>
                </section>

                <section>
                  <h2 className="mb-4 font-display text-2xl font-bold text-foreground">4. Telehealth Consent</h2>
                  <p>
                    By using our Services, you consent to receive healthcare services via telehealth technologies. You understand that telehealth involves the use of electronic communications to enable healthcare providers to share individual patient medical information for the purpose of delivering care.
                  </p>
                </section>

                <section>
                  <h2 className="mb-4 font-display text-2xl font-bold text-foreground">5. Prescription Medications</h2>
                  <p>
                    Completion of a health assessment does not guarantee approval for treatment. All prescription decisions are at the sole discretion of licensed physicians based on medical appropriateness.
                  </p>
                  <p className="mt-2">
                    Some medications may be prescribed off-label when clinically appropriate. Compounded medications are prepared by licensed U.S. pharmacies but are not FDA-approved.
                  </p>
                </section>

                <section>
                  <h2 className="mb-4 font-display text-2xl font-bold text-foreground">6. Payment Terms</h2>
                  <p>
                    Your payment method is stored securely but only charged if your physician approves treatment. For patients using our online assessment, there is no charge if you are not approved. Live video consultations are charged at the time of booking.
                  </p>
                </section>

                <section>
                  <h2 className="mb-4 font-display text-2xl font-bold text-foreground">7. Cancellation</h2>
                  <p>
                    There are no contracts or commitments. You may cancel your subscription at any time through your patient portal. Cancellation takes effect at the end of your current billing period.
                  </p>
                </section>

                <section>
                  <h2 className="mb-4 font-display text-2xl font-bold text-foreground">8. Privacy</h2>
                  <p>
                    Your use of our Services is also governed by our Privacy Policy. We are HIPAA-compliant and do not share patient information without consent, except as required by law.
                  </p>
                </section>

                <section>
                  <h2 className="mb-4 font-display text-2xl font-bold text-foreground">9. Disclaimer</h2>
                  <p>
                    This is not medical advice. The information provided through our Services is for informational purposes only. Always consult your physician before starting any treatment.
                  </p>
                </section>

                <section>
                  <h2 className="mb-4 font-display text-2xl font-bold text-foreground">10. Contact</h2>
                  <p>
                    Questions about these Terms should be directed to{" "}
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

export default TermsOfUse;
