import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-12 sm:py-20">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="mb-8 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-light">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="font-display text-3xl font-bold text-foreground sm:text-4xl">Privacy Policy</h1>
                  <p className="text-muted-foreground">Effective Date: January 2025</p>
                </div>
              </div>

              <div className="prose prose-invert max-w-none space-y-8 text-muted-foreground">
                <section className="rounded-xl border bg-card p-6">
                  <h2 className="mb-4 font-display text-xl font-bold text-foreground">1. Introduction & Scope</h2>
                  <p>
                    This Privacy Policy describes how Elevare Health MSO LLC ("Elevare Health", "we", "our", or "us") collects, uses, discloses, and protects information. It applies to our websites, mobile applications, telehealth platform, patient portal, and related services (collectively, the "Services").
                  </p>
                  <p className="mt-3">
                    This Policy is incorporated into and made part of our Terms of Use. Capitalized terms not defined in this Policy have the meanings given in the Terms of Use.
                  </p>
                </section>

                <section className="rounded-xl border bg-card p-6">
                  <h2 className="mb-4 font-display text-xl font-bold text-foreground">1.1 Applicability</h2>
                  <p>This Policy applies to all personal information collected through our Services, including:</p>
                  <ul className="ml-6 mt-3 list-disc space-y-2">
                    <li>Information provided directly when creating an account, completing intake forms, communicating with clinicians, or purchasing services</li>
                    <li>Information collected automatically through your device (cookies, analytics, IP address, usage logs)</li>
                    <li>Information received from third parties such as affiliated pharmacies, laboratories, and payment processors</li>
                  </ul>
                </section>

                <section className="rounded-xl border bg-card p-6">
                  <h2 className="mb-4 font-display text-xl font-bold text-foreground">1.2 Protected Health Information (PHI)</h2>
                  <p>
                    If you are a patient receiving telehealth services, certain health information collected and processed on behalf of independent clinicians may be considered Protected Health Information ("PHI") subject to the Health Insurance Portability and Accountability Act of 1996 ("HIPAA").
                  </p>
                  <p className="mt-3">
                    When HIPAA applies, PHI will be used and disclosed only as permitted under HIPAA and our agreements with clinicians, pharmacies, and business associates. If there is any inconsistency between this Policy and HIPAA with respect to PHI, HIPAA will control.
                  </p>
                </section>

                <section className="rounded-xl border bg-card p-6">
                  <h2 className="mb-4 font-display text-xl font-bold text-foreground">2. Information We Collect</h2>
                  
                  <h3 className="mb-2 mt-4 font-semibold text-foreground">2.1 Information You Provide</h3>
                  <ul className="ml-6 list-disc space-y-2">
                    <li><strong>Account Information:</strong> Name, email address, phone number, date of birth, and password</li>
                    <li><strong>Health Information:</strong> Medical history, current medications, allergies, symptoms, health goals, and treatment preferences</li>
                    <li><strong>Identity Verification:</strong> Government-issued ID, photographs, and other identity documents</li>
                    <li><strong>Payment Information:</strong> Credit card numbers, billing address, and payment history</li>
                    <li><strong>Communications:</strong> Messages with our care team, survey responses, and feedback</li>
                  </ul>

                  <h3 className="mb-2 mt-6 font-semibold text-foreground">2.2 Information Collected Automatically</h3>
                  <ul className="ml-6 list-disc space-y-2">
                    <li><strong>Device Information:</strong> IP address, browser type, operating system, device identifiers</li>
                    <li><strong>Usage Data:</strong> Pages visited, features used, time spent on pages, click patterns</li>
                    <li><strong>Location Data:</strong> General geographic location based on IP address</li>
                    <li><strong>Cookies and Tracking:</strong> We use cookies and similar technologies to improve user experience and analyze usage</li>
                  </ul>

                  <h3 className="mb-2 mt-6 font-semibold text-foreground">2.3 Information from Third Parties</h3>
                  <ul className="ml-6 list-disc space-y-2">
                    <li><strong>Pharmacies:</strong> Prescription fulfillment status, shipping information</li>
                    <li><strong>Laboratories:</strong> Lab test results when ordered by your clinician</li>
                    <li><strong>Payment Processors:</strong> Transaction confirmations and fraud prevention data</li>
                  </ul>
                </section>

                <section className="rounded-xl border bg-card p-6">
                  <h2 className="mb-4 font-display text-xl font-bold text-foreground">3. How We Use Your Information</h2>
                  <p>We use collected information to:</p>
                  <ul className="ml-6 mt-3 list-disc space-y-2">
                    <li><strong>Provide Services:</strong> Facilitate telehealth consultations, process prescriptions, and coordinate care</li>
                    <li><strong>Treatment:</strong> Share information with clinicians and pharmacies involved in your care</li>
                    <li><strong>Payment Processing:</strong> Process transactions and manage billing</li>
                    <li><strong>Communications:</strong> Send appointment reminders, treatment updates, and respond to inquiries</li>
                    <li><strong>Improvement:</strong> Analyze usage patterns to improve our Services</li>
                    <li><strong>Legal Compliance:</strong> Comply with applicable laws, regulations, and legal processes</li>
                    <li><strong>Safety:</strong> Protect the health and safety of our patients and the public</li>
                  </ul>
                </section>

                <section className="rounded-xl border bg-card p-6">
                  <h2 className="mb-4 font-display text-xl font-bold text-foreground">4. How We Share Your Information</h2>
                  <p>We may share your information with:</p>
                  <ul className="ml-6 mt-3 list-disc space-y-2">
                    <li><strong>Healthcare Providers:</strong> Licensed clinicians who provide your medical care</li>
                    <li><strong>Pharmacies:</strong> Licensed U.S. pharmacies that fill your prescriptions</li>
                    <li><strong>Laboratories:</strong> When lab work is ordered as part of your treatment</li>
                    <li><strong>Service Providers:</strong> Third parties who help us operate our business (hosting, payment processing, customer support)</li>
                    <li><strong>Legal Requirements:</strong> When required by law, court order, or to protect rights and safety</li>
                  </ul>
                  <p className="mt-4">
                    We do <strong>not</strong> sell your personal information. We do <strong>not</strong> share your health information for marketing purposes without your explicit consent.
                  </p>
                </section>

                <section className="rounded-xl border bg-card p-6">
                  <h2 className="mb-4 font-display text-xl font-bold text-foreground">5. Data Security</h2>
                  <p>
                    We implement enterprise-grade security measures to protect your information, including:
                  </p>
                  <ul className="ml-6 mt-3 list-disc space-y-2">
                    <li>Encryption of data in transit and at rest using industry-standard protocols</li>
                    <li>HIPAA-compliant infrastructure and processes</li>
                    <li>Regular security audits and vulnerability assessments</li>
                    <li>Access controls limiting who can view patient information</li>
                    <li>Employee training on privacy and security best practices</li>
                  </ul>
                </section>

                <section className="rounded-xl border bg-card p-6">
                  <h2 className="mb-4 font-display text-xl font-bold text-foreground">6. Your Rights</h2>
                  <p>You have the right to:</p>
                  <ul className="ml-6 mt-3 list-disc space-y-2">
                    <li><strong>Access:</strong> Request a copy of your personal information</li>
                    <li><strong>Correction:</strong> Request correction of inaccurate information</li>
                    <li><strong>Deletion:</strong> Request deletion of your information (subject to legal retention requirements)</li>
                    <li><strong>Portability:</strong> Receive your data in a portable format</li>
                    <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications</li>
                  </ul>
                  <p className="mt-4">
                    To exercise these rights, contact us at{" "}
                    <a href="mailto:privacy@elevarehealth.com" className="text-primary hover:underline">
                      privacy@elevarehealth.com
                    </a>
                  </p>
                </section>

                <section className="rounded-xl border bg-card p-6">
                  <h2 className="mb-4 font-display text-xl font-bold text-foreground">7. Data Retention</h2>
                  <p>
                    We retain your information for as long as necessary to provide our Services and comply with legal obligations. Medical records are retained in accordance with applicable state and federal requirements, typically for a minimum of 7 years after the last date of treatment.
                  </p>
                </section>

                <section className="rounded-xl border bg-card p-6">
                  <h2 className="mb-4 font-display text-xl font-bold text-foreground">8. United States Only</h2>
                  <p>
                    Elevare Health operates in the United States and our Services are intended solely for U.S. residents, specifically Texas residents. We do not target or market to residents of the European Union, United Kingdom, or other foreign jurisdictions. We are not subject to GDPR or UK DPA. If you are located outside the United States, you should not use our Services.
                  </p>
                </section>

                <section className="rounded-xl border bg-card p-6">
                  <h2 className="mb-4 font-display text-xl font-bold text-foreground">9. Changes to This Policy</h2>
                  <p>
                    We may update this Privacy Policy from time to time. We will notify you of material changes by posting the updated policy on our website and updating the "Effective Date" above. Your continued use of our Services after such changes constitutes acceptance of the updated policy.
                  </p>
                </section>

                <section className="rounded-xl border bg-card p-6">
                  <h2 className="mb-4 font-display text-xl font-bold text-foreground">10. Contact Us</h2>
                  <p>If you have questions about this Privacy Policy or our privacy practices, please contact us:</p>
                  <div className="mt-4 space-y-2">
                    <p><strong>Elevare Health MSO LLC</strong></p>
                    <p>1401 Lavaca St, Suite 388</p>
                    <p>Austin, TX 78701</p>
                    <p>
                      Email:{" "}
                      <a href="mailto:privacy@elevarehealth.com" className="text-primary hover:underline">
                        privacy@elevarehealth.com
                      </a>
                    </p>
                  </div>
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
