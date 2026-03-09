import { FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import LegalPageLayout from "@/components/legal/LegalPageLayout";
import { TOCItem } from "@/components/legal/TableOfContents";

const tocItems: TOCItem[] = [
  { id: "services-overview", title: "1. Services Overview" },
  { id: "eligibility", title: "2. Eligibility" },
  { id: "emergency", title: "3. No Emergency Care" },
  { id: "telehealth-consent", title: "4. Telehealth Consent" },
  { id: "clinical-relationship", title: "5. Clinical Relationship" },
  { id: "prescription", title: "6. Prescription Medications" },
  { id: "pharmacy", title: "7. Pharmacy Services" },
  { id: "payment", title: "8. Payment Terms" },
  { id: "cancellation", title: "9. Cancellation & Refunds" },
  { id: "prohibited", title: "10. Prohibited Conduct" },
  { id: "disclaimers", title: "11. Disclaimers" },
  { id: "liability", title: "12. Limitation of Liability" },
  { id: "indemnification", title: "13. Indemnification" },
  { id: "governing-law", title: "14. Governing Law" },
  { id: "changes", title: "15. Changes to Terms" },
  { id: "contact", title: "16. Contact Us" },
];

const TermsOfUse = () => {
  return (
    <LegalPageLayout
      title="Terms of Use"
      subtitle="Effective Date: January 2025"
      icon={FileText}
      tocItems={tocItems}
    >
      <Card variant="glass" id="services-overview">
        <CardContent className="p-6">
          <h2 className="mb-4 font-display text-xl font-bold text-rich-black">1. Services Overview</h2>
          <p className="text-warm-gray leading-relaxed">
            Elevare Health MSO LLC ("Elevare Health", "we", "our", or "us") is a technology and administrative services company that facilitates telehealth consultations between patients and independent, licensed healthcare providers.
          </p>
          <p className="mt-3 font-semibold text-rich-black">
            Important: Elevare Health does NOT practice medicine and does NOT dispense medications.
          </p>
          <p className="mt-3 text-warm-gray leading-relaxed">
            All medical decisions, diagnoses, treatment plans, and prescriptions are made exclusively by independent, licensed physicians through Elevare Health Medical PLLC. Medications are dispensed solely by licensed U.S. pharmacies. Please review our{" "}
            <a href="/safety" className="text-warm-stone underline hover:text-rich-black transition-colors">
              Safety Information
            </a>{" "}
            for important details about treatments.
          </p>
        </CardContent>
      </Card>

      <Card variant="glass" id="eligibility">
        <CardContent className="p-6">
          <h2 className="mb-4 font-display text-xl font-bold text-rich-black">2. Eligibility</h2>
          <p className="text-warm-gray leading-relaxed">To use our Services, you must:</p>
          <ul className="ml-6 mt-3 list-disc space-y-2 text-warm-gray">
            <li>Be at least 18 years of age</li>
            <li>Be a resident of a state where we operate (30+ states)</li>
            <li>Have the legal capacity to enter into binding agreements</li>
            <li>Provide accurate and complete information during registration and intake</li>
          </ul>
          <p className="mt-4 text-warm-gray leading-relaxed">
            By using our Services, you represent and warrant that you meet all eligibility requirements. Elevare Health reserves the right to verify your eligibility and refuse service to anyone who does not meet these requirements.
          </p>
        </CardContent>
      </Card>

      <Card className="border-2 border-destructive/30 bg-destructive/5 backdrop-blur-xl" id="emergency">
        <CardContent className="p-6">
          <h2 className="mb-4 font-display text-xl font-bold text-rich-black">3. No Emergency or Urgent Care</h2>
          <p className="font-semibold text-rich-black">
            OUR SERVICES ARE NOT INTENDED FOR MEDICAL EMERGENCIES OR URGENT CARE.
          </p>
          <p className="mt-3 text-warm-gray leading-relaxed">
            If you are experiencing a medical emergency, including but not limited to: chest pain, difficulty breathing, severe allergic reactions, thoughts of self-harm, stroke symptoms, or any life-threatening condition:
          </p>
          <ul className="ml-6 mt-3 list-disc space-y-2 text-warm-gray">
            <li><strong className="text-rich-black">Call 911 immediately</strong></li>
            <li>Go to your nearest emergency room</li>
            <li>Do NOT use our platform for emergency care</li>
          </ul>
        </CardContent>
      </Card>

      <Card variant="glass" id="telehealth-consent">
        <CardContent className="p-6">
          <h2 className="mb-4 font-display text-xl font-bold text-rich-black">4. Telehealth Consent</h2>
          <p className="text-warm-gray leading-relaxed">By using our Services, you consent to receive healthcare services via telehealth technologies. You understand and acknowledge that:</p>
          <ul className="ml-6 mt-3 list-disc space-y-2 text-warm-gray">
            <li>Telehealth involves electronic communication of medical information between you and a healthcare provider</li>
            <li>Telehealth is not the same as in-person care and has inherent limitations</li>
            <li>Technical failures may interrupt or prevent delivery of services</li>
            <li>Despite reasonable security measures, electronic communications may be intercepted</li>
            <li>You have the right to refuse telehealth services at any time</li>
          </ul>
        </CardContent>
      </Card>

      <Card variant="glass" id="clinical-relationship">
        <CardContent className="p-6">
          <h2 className="mb-4 font-display text-xl font-bold text-rich-black">5. Clinical Relationship</h2>
          <p className="text-warm-gray leading-relaxed">
            When you use our Services, you may establish a clinical relationship with an independent, licensed healthcare provider. You understand that:
          </p>
          <ul className="ml-6 mt-3 list-disc space-y-2 text-warm-gray">
            <li>The provider-patient relationship is between you and the treating clinician, not Elevare Health</li>
            <li>All clinical decisions are made by the treating clinician based on their professional judgment</li>
            <li>Completion of an intake form does NOT guarantee a prescription</li>
            <li>The clinician may decline to treat you or may recommend in-person evaluation</li>
          </ul>
        </CardContent>
      </Card>

      <Card variant="glass" id="prescription">
        <CardContent className="p-6">
          <h2 className="mb-4 font-display text-xl font-bold text-rich-black">6. Prescription Medications</h2>
          <p className="text-warm-gray leading-relaxed">You understand and acknowledge that:</p>
          <ul className="ml-6 mt-3 list-disc space-y-2 text-warm-gray">
            <li>All prescription decisions are at the sole discretion of licensed physicians</li>
            <li>Some medications may be prescribed <strong className="text-rich-black">off-label</strong> (for uses not specifically FDA-approved) when clinically appropriate</li>
            <li><strong className="text-rich-black">Compounded medications</strong> are prepared by licensed pharmacies but are NOT FDA-approved for safety, effectiveness, or quality</li>
            <li>You are responsible for taking medications as prescribed and reporting side effects</li>
            <li>Laboratory testing may be required before or during treatment</li>
          </ul>
        </CardContent>
      </Card>

      <Card variant="glass" id="pharmacy">
        <CardContent className="p-6">
          <h2 className="mb-4 font-display text-xl font-bold text-rich-black">7. Pharmacy Services</h2>
          <p className="text-warm-gray leading-relaxed">
            Medications prescribed through our platform are fulfilled by licensed U.S. compounding pharmacies. You understand that:
          </p>
          <ul className="ml-6 mt-3 list-disc space-y-2 text-warm-gray">
            <li>Elevare Health does not dispense medications directly</li>
            <li>Pharmacy services are provided by independent, licensed pharmacies</li>
            <li>Shipping times are typically 3-5 business days after prescription approval</li>
            <li>You are responsible for storing medications properly per pharmacy instructions</li>
          </ul>
        </CardContent>
      </Card>

      <Card variant="glass" id="payment">
        <CardContent className="p-6">
          <h2 className="mb-4 font-display text-xl font-bold text-rich-black">8. Payment Terms</h2>
          <h3 className="mb-2 mt-4 font-semibold text-rich-black">8.1 Pricing</h3>
          <p className="text-warm-gray leading-relaxed">
            All prices are displayed in U.S. dollars. Prices include medication, pharmacy fulfillment, and ongoing provider support. Prices may vary based on medication, dosage, and clinical factors.
          </p>
          
          <h3 className="mb-2 mt-4 font-semibold text-rich-black">8.2 Payment Authorization</h3>
          <p className="text-warm-gray leading-relaxed">
            Your payment method is stored securely but is <strong className="text-rich-black">only charged if your physician approves treatment</strong>. If you are not approved, your card will not be charged. Live video consultations are charged at the time of booking.
          </p>
          
          <h3 className="mb-2 mt-4 font-semibold text-rich-black">8.3 Subscription Billing</h3>
          <p className="text-warm-gray leading-relaxed">
            Some treatments are billed on a recurring monthly basis. You authorize us to charge your payment method automatically each billing cycle until you cancel.
          </p>
        </CardContent>
      </Card>

      <Card variant="glass" id="cancellation">
        <CardContent className="p-6">
          <h2 className="mb-4 font-display text-xl font-bold text-rich-black">9. Cancellation & Refunds</h2>
          <p className="text-warm-gray leading-relaxed">
            <strong className="text-rich-black">No contracts.</strong> You may cancel your subscription at any time through your patient portal or by contacting support.
          </p>
          <ul className="ml-6 mt-3 list-disc space-y-2 text-warm-gray">
            <li>Cancellation takes effect at the end of your current billing period</li>
            <li>No refunds for partially used billing periods</li>
            <li>Medications already shipped are non-refundable</li>
            <li>Video consultation fees are non-refundable once the appointment has occurred</li>
          </ul>
        </CardContent>
      </Card>

      <Card variant="glass" id="prohibited">
        <CardContent className="p-6">
          <h2 className="mb-4 font-display text-xl font-bold text-rich-black">10. Prohibited Conduct</h2>
          <p className="text-warm-gray leading-relaxed">You agree NOT to:</p>
          <ul className="ml-6 mt-3 list-disc space-y-2 text-warm-gray">
            <li>Provide false or misleading information</li>
            <li>Use Services for any unlawful purpose</li>
            <li>Attempt to obtain medications for others or for non-medical use</li>
            <li>Share, sell, or transfer medications</li>
            <li>Harass, abuse, or threaten our staff or providers</li>
            <li>Attempt to access accounts or systems without authorization</li>
          </ul>
        </CardContent>
      </Card>

      <Card variant="glass" id="disclaimers">
        <CardContent className="p-6">
          <h2 className="mb-4 font-display text-xl font-bold text-rich-black">11. Disclaimers</h2>
          <p className="uppercase text-warm-gray text-base leading-relaxed">
            THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. WE DISCLAIM ALL WARRANTIES INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
          </p>
          <p className="mt-4 text-warm-gray leading-relaxed">
            We do not guarantee that our Services will meet your requirements, be uninterrupted, timely, secure, or error-free.
          </p>
        </CardContent>
      </Card>

      <Card variant="glass" id="liability">
        <CardContent className="p-6">
          <h2 className="mb-4 font-display text-xl font-bold text-rich-black">12. Limitation of Liability</h2>
          <p className="uppercase text-warm-gray text-base leading-relaxed">
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, ELEVARE HEALTH AND ITS AFFILIATES, OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, OR GOODWILL, ARISING OUT OF OR RELATED TO YOUR USE OF THE SERVICES.
          </p>
          <p className="mt-4 text-warm-gray leading-relaxed">
            Our total liability for any claims arising from or related to the Services shall not exceed the amount you paid to us in the twelve (12) months preceding the claim.
          </p>
        </CardContent>
      </Card>

      <Card variant="glass" id="indemnification">
        <CardContent className="p-6">
          <h2 className="mb-4 font-display text-xl font-bold text-rich-black">13. Indemnification</h2>
          <p className="text-warm-gray leading-relaxed">
            You agree to indemnify, defend, and hold harmless Elevare Health and its affiliates from any claims, damages, losses, liabilities, costs, and expenses (including reasonable attorneys' fees) arising from your use of the Services, your violation of these Terms, or your violation of any third-party rights.
          </p>
        </CardContent>
      </Card>

      <Card variant="glass" id="governing-law">
        <CardContent className="p-6">
          <h2 className="mb-4 font-display text-xl font-bold text-rich-black">14. Governing Law & Dispute Resolution</h2>
          <p className="text-warm-gray leading-relaxed">
            These Terms are governed by the laws of the State of Texas, without regard to conflict of law principles. Any disputes arising from or related to these Terms or our Services shall be resolved through binding arbitration in Austin, Texas, in accordance with the rules of the American Arbitration Association.
          </p>
          <p className="mt-3 text-warm-gray leading-relaxed">
            <strong className="text-rich-black">You waive any right to participate in a class action lawsuit or class-wide arbitration.</strong>
          </p>
        </CardContent>
      </Card>

      <Card variant="glass" id="changes">
        <CardContent className="p-6">
          <h2 className="mb-4 font-display text-xl font-bold text-rich-black">15. Changes to Terms</h2>
          <p className="text-warm-gray leading-relaxed">
            We may update these Terms from time to time. We will notify you of material changes by posting the updated Terms on our website and updating the "Effective Date." Your continued use of our Services after such changes constitutes acceptance of the updated Terms.
          </p>
        </CardContent>
      </Card>

      <Card variant="glass" id="contact">
        <CardContent className="p-6">
          <h2 className="mb-4 font-display text-xl font-bold text-rich-black">16. Contact Us</h2>
          <p className="text-warm-gray leading-relaxed">Questions about these Terms should be directed to:</p>
          <div className="mt-4 space-y-2 text-warm-gray">
            <p><strong className="text-rich-black">Elevare Health MSO LLC</strong></p>
            <p>1401 Lavaca St, Suite 388</p>
            <p>Austin, TX 78701</p>
            <p>
              Email:{" "}
              <a href="mailto:legal@elevarehealth.com" className="text-warm-stone underline hover:text-rich-black transition-colors">
                legal@elevarehealth.com
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </LegalPageLayout>
  );
};

export default TermsOfUse;
