import { Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import LegalPageLayout from "@/components/legal/LegalPageLayout";
import { TOCItem } from "@/components/legal/TableOfContents";

const tocItems: TOCItem[] = [
  { id: "introduction", title: "1. Introduction & Scope" },
  { id: "applicability", title: "1.1 Applicability", level: 2 },
  { id: "phi", title: "1.2 Protected Health Information", level: 2 },
  { id: "information-collected", title: "2. Information We Collect" },
  { id: "how-we-use", title: "3. How We Use Your Information" },
  { id: "how-we-share", title: "4. How We Share Information" },
  { id: "data-security", title: "5. Data Security" },
  { id: "your-rights", title: "6. Your Rights" },
  { id: "data-retention", title: "7. Data Retention" },
  { id: "us-only", title: "8. United States Only" },
  { id: "changes", title: "9. Changes to This Policy" },
  { id: "contact", title: "10. Contact Us" },
];

const PrivacyPolicy = () => {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      subtitle="Effective Date: January 2025"
      icon={Shield}
      tocItems={tocItems}
    >
      <Card variant="glass" id="introduction">
        <CardContent className="p-6">
          <h2 className="mb-4 font-display text-xl font-bold text-rich-black">1. Introduction & Scope</h2>
          <p className="text-warm-gray leading-relaxed">
            This Privacy Policy describes how Elevare Health MSO LLC ("Elevare Health", "we", "our", or "us") collects, uses, discloses, and protects information. It applies to our websites, mobile applications, telehealth platform, patient portal, and related services (collectively, the "Services").
          </p>
          <p className="mt-3 text-warm-gray leading-relaxed">
            This Policy is incorporated into and made part of our{" "}
            <a href="/terms" className="text-warm-stone underline hover:text-rich-black transition-colors">
              Terms of Use
            </a>. Capitalized terms not defined in this Policy have the meanings given in the Terms of Use.
          </p>
        </CardContent>
      </Card>

      <Card variant="glass" id="applicability">
        <CardContent className="p-6">
          <h2 className="mb-4 font-display text-xl font-bold text-rich-black">1.1 Applicability</h2>
          <p className="text-warm-gray leading-relaxed">This Policy applies to all personal information collected through our Services, including:</p>
          <ul className="ml-6 mt-3 list-disc space-y-2 text-warm-gray">
            <li>Information provided directly when creating an account, completing intake forms, communicating with clinicians, or purchasing services</li>
            <li>Information collected automatically through your device (cookies, analytics, IP address, usage logs)</li>
            <li>Information received from third parties such as affiliated pharmacies, laboratories, and payment processors</li>
          </ul>
        </CardContent>
      </Card>

      <Card variant="glass" id="phi">
        <CardContent className="p-6">
          <h2 className="mb-4 font-display text-xl font-bold text-rich-black">1.2 Protected Health Information (PHI)</h2>
          <p className="text-warm-gray leading-relaxed">
            If you are a patient receiving telehealth services, certain health information collected and processed on behalf of independent clinicians may be considered Protected Health Information ("PHI") subject to the Health Insurance Portability and Accountability Act of 1996 ("HIPAA").
          </p>
          <p className="mt-3 text-warm-gray leading-relaxed">
            When HIPAA applies, PHI will be used and disclosed only as permitted under HIPAA and our agreements with clinicians, pharmacies, and business associates. If there is any inconsistency between this Policy and HIPAA with respect to PHI, HIPAA will control. See our{" "}
            <a href="/hipaa" className="text-warm-stone underline hover:text-rich-black transition-colors">
              HIPAA Notice of Privacy Practices
            </a>{" "}
            for more information.
          </p>
        </CardContent>
      </Card>

      <Card variant="glass" id="information-collected">
        <CardContent className="p-6">
          <h2 className="mb-4 font-display text-xl font-bold text-rich-black">2. Information We Collect</h2>
          
          <h3 className="mb-2 mt-4 font-semibold text-rich-black">2.1 Information You Provide</h3>
          <ul className="ml-6 list-disc space-y-2 text-warm-gray">
            <li><strong className="text-rich-black">Account Information:</strong> Name, email address, phone number, date of birth, and password</li>
            <li><strong className="text-rich-black">Health Information:</strong> Medical history, current medications, allergies, symptoms, health goals, and treatment preferences</li>
            <li><strong className="text-rich-black">Identity Verification:</strong> Government-issued ID, photographs, and other identity documents</li>
            <li><strong className="text-rich-black">Payment Information:</strong> Credit card numbers, billing address, and payment history</li>
            <li><strong className="text-rich-black">Communications:</strong> Messages with our care team, survey responses, and feedback</li>
          </ul>

          <h3 className="mb-2 mt-6 font-semibold text-rich-black">2.2 Information Collected Automatically</h3>
          <ul className="ml-6 list-disc space-y-2 text-warm-gray">
            <li><strong className="text-rich-black">Device Information:</strong> IP address, browser type, operating system, device identifiers</li>
            <li><strong className="text-rich-black">Usage Data:</strong> Pages visited, features used, time spent on pages, click patterns</li>
            <li><strong className="text-rich-black">Location Data:</strong> General geographic location based on IP address</li>
            <li><strong className="text-rich-black">Cookies and Tracking:</strong> We use cookies and similar technologies to improve user experience and analyze usage</li>
          </ul>

          <h3 className="mb-2 mt-6 font-semibold text-rich-black">2.3 Information from Third Parties</h3>
          <ul className="ml-6 list-disc space-y-2 text-warm-gray">
            <li><strong className="text-rich-black">Pharmacies:</strong> Prescription fulfillment status, shipping information</li>
            <li><strong className="text-rich-black">Laboratories:</strong> Lab test results when ordered by your clinician</li>
            <li><strong className="text-rich-black">Payment Processors:</strong> Transaction confirmations and fraud prevention data</li>
          </ul>
        </CardContent>
      </Card>

      <Card variant="glass" id="how-we-use">
        <CardContent className="p-6">
          <h2 className="mb-4 font-display text-xl font-bold text-rich-black">3. How We Use Your Information</h2>
          <p className="text-warm-gray leading-relaxed">We use collected information to:</p>
          <ul className="ml-6 mt-3 list-disc space-y-2 text-warm-gray">
            <li><strong className="text-rich-black">Provide Services:</strong> Facilitate telehealth consultations, process prescriptions, and coordinate care</li>
            <li><strong className="text-rich-black">Treatment:</strong> Share information with clinicians and pharmacies involved in your care</li>
            <li><strong className="text-rich-black">Payment Processing:</strong> Process transactions and manage billing</li>
            <li><strong className="text-rich-black">Communications:</strong> Send appointment reminders, treatment updates, and respond to inquiries</li>
            <li><strong className="text-rich-black">Improvement:</strong> Analyze usage patterns to improve our Services</li>
            <li><strong className="text-rich-black">Legal Compliance:</strong> Comply with applicable laws, regulations, and legal processes</li>
            <li><strong className="text-rich-black">Safety:</strong> Protect the health and safety of our patients and the public</li>
          </ul>
        </CardContent>
      </Card>

      <Card variant="glass" id="how-we-share">
        <CardContent className="p-6">
          <h2 className="mb-4 font-display text-xl font-bold text-rich-black">4. How We Share Your Information</h2>
          <p className="text-warm-gray leading-relaxed">We may share your information with:</p>
          <ul className="ml-6 mt-3 list-disc space-y-2 text-warm-gray">
            <li><strong className="text-rich-black">Healthcare Providers:</strong> Licensed clinicians who provide your medical care</li>
            <li><strong className="text-rich-black">Pharmacies:</strong> Licensed U.S. pharmacies that fill your prescriptions</li>
            <li><strong className="text-rich-black">Laboratories:</strong> When lab work is ordered as part of your treatment</li>
            <li><strong className="text-rich-black">Service Providers:</strong> Third parties who help us operate our business (hosting, payment processing, customer support)</li>
            <li><strong className="text-rich-black">Legal Requirements:</strong> When required by law, court order, or to protect rights and safety</li>
          </ul>
          <p className="mt-4 text-warm-gray leading-relaxed">
            We do <strong className="text-rich-black">not</strong> sell your personal information. We do <strong className="text-rich-black">not</strong> share your health information for marketing purposes without your explicit consent.
          </p>
        </CardContent>
      </Card>

      <Card variant="glass" id="data-security">
        <CardContent className="p-6">
          <h2 className="mb-4 font-display text-xl font-bold text-rich-black">5. Data Security</h2>
          <p className="text-warm-gray leading-relaxed">
            We implement enterprise-grade security measures to protect your information, including:
          </p>
          <ul className="ml-6 mt-3 list-disc space-y-2 text-warm-gray">
            <li>Encryption of data in transit and at rest using industry-standard protocols</li>
            <li>HIPAA-compliant infrastructure and processes</li>
            <li>Regular security audits and vulnerability assessments</li>
            <li>Access controls limiting who can view patient information</li>
            <li>Employee training on privacy and security best practices</li>
          </ul>
        </CardContent>
      </Card>

      <Card variant="glass" id="your-rights">
        <CardContent className="p-6">
          <h2 className="mb-4 font-display text-xl font-bold text-rich-black">6. Your Rights</h2>
          <p className="text-warm-gray leading-relaxed">You have the right to:</p>
          <ul className="ml-6 mt-3 list-disc space-y-2 text-warm-gray">
            <li><strong className="text-rich-black">Access:</strong> Request a copy of your personal information</li>
            <li><strong className="text-rich-black">Correction:</strong> Request correction of inaccurate information</li>
            <li><strong className="text-rich-black">Deletion:</strong> Request deletion of your information (subject to legal retention requirements)</li>
            <li><strong className="text-rich-black">Portability:</strong> Receive your data in a portable format</li>
            <li><strong className="text-rich-black">Opt-Out:</strong> Unsubscribe from marketing communications</li>
          </ul>
          <p className="mt-4 text-warm-gray leading-relaxed">
            To exercise these rights, contact us at{" "}
            <a href="mailto:privacy@elevarehealth.com" className="text-warm-stone underline hover:text-rich-black transition-colors">
              privacy@elevarehealth.com
            </a>
          </p>
        </CardContent>
      </Card>

      <Card variant="glass" id="data-retention">
        <CardContent className="p-6">
          <h2 className="mb-4 font-display text-xl font-bold text-rich-black">7. Data Retention</h2>
          <p className="text-warm-gray leading-relaxed">
            We retain your information for as long as necessary to provide our Services and comply with legal obligations. Medical records are retained in accordance with applicable state and federal requirements, typically for a minimum of 7 years after the last date of treatment.
          </p>
        </CardContent>
      </Card>

      <Card variant="glass" id="us-only">
        <CardContent className="p-6">
          <h2 className="mb-4 font-display text-xl font-bold text-rich-black">8. United States Only</h2>
          <p className="text-warm-gray leading-relaxed">
            Elevare Health operates in the United States and our Services are intended solely for U.S. residents. We do not target or market to residents of the European Union, United Kingdom, or other foreign jurisdictions. We are not subject to GDPR or UK DPA. If you are located outside the United States, you should not use our Services.
          </p>
        </CardContent>
      </Card>

      <Card variant="glass" id="changes">
        <CardContent className="p-6">
          <h2 className="mb-4 font-display text-xl font-bold text-rich-black">9. Changes to This Policy</h2>
          <p className="text-warm-gray leading-relaxed">
            We may update this Privacy Policy from time to time. We will notify you of material changes by posting the updated policy on our website and updating the "Effective Date" above. Your continued use of our Services after such changes constitutes acceptance of the updated policy.
          </p>
        </CardContent>
      </Card>

      <Card variant="glass" id="contact">
        <CardContent className="p-6">
          <h2 className="mb-4 font-display text-xl font-bold text-rich-black">10. Contact Us</h2>
          <p className="text-warm-gray leading-relaxed">If you have questions about this Privacy Policy or our privacy practices, please contact us:</p>
          <div className="mt-4 space-y-2 text-warm-gray">
            <p><strong className="text-rich-black">Elevare Health MSO LLC</strong></p>
            <p>1401 Lavaca St, Suite 388</p>
            <p>Austin, TX 78701</p>
            <p>
              Email:{" "}
              <a href="mailto:privacy@elevarehealth.com" className="text-warm-stone underline hover:text-rich-black transition-colors">
                privacy@elevarehealth.com
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </LegalPageLayout>
  );
};

export default PrivacyPolicy;
