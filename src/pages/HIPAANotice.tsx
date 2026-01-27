import { Shield, Lock, Eye, FileText, Users, Bell, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import LegalPageLayout from "@/components/legal/LegalPageLayout";
import { TOCItem } from "@/components/legal/TableOfContents";

const tocItems: TOCItem[] = [
  { id: "your-rights", title: "Your Rights" },
  { id: "uses-disclosures", title: "Uses and Disclosures" },
  { id: "other-uses", title: "Other Uses" },
  { id: "your-choices", title: "Your Choices" },
  { id: "responsibilities", title: "Our Responsibilities" },
  { id: "changes", title: "Changes to Notice" },
  { id: "contact", title: "Contact Information" },
];

const HIPAANotice = () => {
  return (
    <LegalPageLayout
      title="HIPAA Notice of Privacy Practices"
      subtitle="Effective Date: January 2025"
      icon={Shield}
      tocItems={tocItems}
    >
      {/* Summary Box */}
      <Card className="border-2 border-warm-stone/30 bg-warm-stone/5 backdrop-blur-xl">
        <CardContent className="p-6">
          <h2 className="mb-3 font-display text-lg font-bold text-rich-black">Your Information. Your Rights. Our Responsibilities.</h2>
          <p className="text-sm text-warm-gray leading-relaxed">
            This notice describes how medical information about you may be used and disclosed and how you can get access to this information. <strong className="text-rich-black">Please review it carefully.</strong>
          </p>
        </CardContent>
      </Card>

      <Card variant="glass" id="your-rights">
        <CardContent className="p-6">
          <div className="mb-4 flex items-center gap-3">
            <Eye className="h-5 w-5 text-warm-stone" />
            <h2 className="font-display text-xl font-bold text-rich-black">Your Rights</h2>
          </div>
          <p className="mb-4 text-warm-gray leading-relaxed">When it comes to your health information, you have certain rights. You can:</p>
          
          <div className="space-y-4">
            <div className="rounded-lg bg-soft-linen/50 p-4">
              <h3 className="mb-1 font-semibold text-rich-black">Get a copy of your health and claims records</h3>
              <p className="text-sm text-warm-gray leading-relaxed">You can ask to see or get an electronic or paper copy of your medical record and other health information we have about you. We will provide a copy or summary of your health information, usually within 30 days of your request. We may charge a reasonable, cost-based fee.</p>
            </div>
            
            <div className="rounded-lg bg-soft-linen/50 p-4">
              <h3 className="mb-1 font-semibold text-rich-black">Ask us to correct your health records</h3>
              <p className="text-sm text-warm-gray leading-relaxed">You can ask us to correct health information about you that you think is incorrect or incomplete. We may say "no" to your request, but we'll tell you why in writing within 60 days.</p>
            </div>
            
            <div className="rounded-lg bg-soft-linen/50 p-4">
              <h3 className="mb-1 font-semibold text-rich-black">Request confidential communications</h3>
              <p className="text-sm text-warm-gray leading-relaxed">You can ask us to contact you in a specific way (for example, home or office phone) or to send mail to a different address. We will consider all reasonable requests and must say "yes" if you tell us you would be in danger if we do not.</p>
            </div>
            
            <div className="rounded-lg bg-soft-linen/50 p-4">
              <h3 className="mb-1 font-semibold text-rich-black">Ask us to limit what we use or share</h3>
              <p className="text-sm text-warm-gray leading-relaxed">You can ask us not to use or share certain health information for treatment, payment, or our operations. We are not required to agree to your request, and we may say "no" if it would affect your care.</p>
            </div>
            
            <div className="rounded-lg bg-soft-linen/50 p-4">
              <h3 className="mb-1 font-semibold text-rich-black">Get a list of those with whom we've shared information</h3>
              <p className="text-sm text-warm-gray leading-relaxed">You can ask for a list (accounting) of the times we've shared your health information for six years prior to the date you ask, who we shared it with, and why. We will include all disclosures except for those about treatment, payment, and health care operations, and certain other disclosures.</p>
            </div>
            
            <div className="rounded-lg bg-soft-linen/50 p-4">
              <h3 className="mb-1 font-semibold text-rich-black">Get a copy of this privacy notice</h3>
              <p className="text-sm text-warm-gray leading-relaxed">You can ask for a paper copy of this notice at any time, even if you have agreed to receive the notice electronically. We will provide you with a paper copy promptly.</p>
            </div>
            
            <div className="rounded-lg bg-soft-linen/50 p-4">
              <h3 className="mb-1 font-semibold text-rich-black">Choose someone to act for you</h3>
              <p className="text-sm text-warm-gray leading-relaxed">If you have given someone medical power of attorney or if someone is your legal guardian, that person can exercise your rights and make choices about your health information. We will make sure the person has this authority and can act for you before we take any action.</p>
            </div>
            
            <div className="rounded-lg bg-soft-linen/50 p-4">
              <h3 className="mb-1 font-semibold text-rich-black">File a complaint if you feel your rights are violated</h3>
              <p className="text-sm text-warm-gray leading-relaxed">You can complain if you feel we have violated your rights by contacting us using the information at the end of this notice. You can also file a complaint with the U.S. Department of Health and Human Services Office for Civil Rights. We will not retaliate against you for filing a complaint.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card variant="glass" id="uses-disclosures">
        <CardContent className="p-6">
          <div className="mb-4 flex items-center gap-3">
            <FileText className="h-5 w-5 text-warm-stone" />
            <h2 className="font-display text-xl font-bold text-rich-black">Our Uses and Disclosures</h2>
          </div>
          <p className="mb-4 text-warm-gray leading-relaxed">We typically use or share your health information in the following ways:</p>
          
          <div className="space-y-4">
            <div className="rounded-lg bg-soft-linen/50 p-4">
              <h3 className="mb-1 font-semibold text-rich-black">Treat You</h3>
              <p className="text-sm text-warm-gray leading-relaxed">We can use your health information and share it with other professionals who are treating you. <em>Example: A physician treating you for a condition asks another physician about your overall health condition.</em></p>
            </div>
            
            <div className="rounded-lg bg-soft-linen/50 p-4">
              <h3 className="mb-1 font-semibold text-rich-black">Run Our Organization</h3>
              <p className="text-sm text-warm-gray leading-relaxed">We can use and share your health information to run our practice, improve your care, and contact you when necessary. <em>Example: We use health information about you to manage your treatment and services.</em></p>
            </div>
            
            <div className="rounded-lg bg-soft-linen/50 p-4">
              <h3 className="mb-1 font-semibold text-rich-black">Bill for Your Services</h3>
              <p className="text-sm text-warm-gray leading-relaxed">We can use and share your health information to bill and get payment from health plans or other entities. <em>Example: We give information about you to your health insurance plan so it will pay for your services.</em></p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card variant="glass" id="other-uses">
        <CardContent className="p-6">
          <div className="mb-4 flex items-center gap-3">
            <Users className="h-5 w-5 text-warm-stone" />
            <h2 className="font-display text-xl font-bold text-rich-black">Other Uses and Disclosures</h2>
          </div>
          <p className="mb-4 text-warm-gray leading-relaxed">We are allowed or required to share your information in other ways – usually in ways that contribute to the public good, such as public health and research. We have to meet many conditions in the law before we can share your information for these purposes.</p>
          
          <ul className="ml-6 list-disc space-y-2 text-warm-gray">
            <li><strong className="text-rich-black">Help with public health and safety issues:</strong> We can share health information for certain situations such as preventing disease, helping with product recalls, reporting adverse reactions to medications, reporting suspected abuse or neglect, and preventing or reducing a serious threat to anyone's health or safety.</li>
            <li><strong className="text-rich-black">Do research:</strong> We can use or share your information for health research under specific conditions.</li>
            <li><strong className="text-rich-black">Comply with the law:</strong> We will share information about you if state or federal laws require it, including with the Department of Health and Human Services if it wants to see that we're complying with federal privacy law.</li>
            <li><strong className="text-rich-black">Respond to lawsuits and legal actions:</strong> We can share health information in response to a court or administrative order, or in response to a subpoena.</li>
            <li><strong className="text-rich-black">Work with a medical examiner or funeral director:</strong> We can share health information with a coroner, medical examiner, or funeral director when an individual dies.</li>
            <li><strong className="text-rich-black">Address workers' compensation, law enforcement, and other government requests:</strong> We can use or share health information for workers' compensation claims, law enforcement purposes, with health oversight agencies, and for special government functions such as military or national security.</li>
          </ul>
        </CardContent>
      </Card>

      <Card variant="glass" id="your-choices">
        <CardContent className="p-6">
          <div className="mb-4 flex items-center gap-3">
            <Lock className="h-5 w-5 text-warm-stone" />
            <h2 className="font-display text-xl font-bold text-rich-black">Your Choices</h2>
          </div>
          <p className="mb-4 text-warm-gray leading-relaxed">For certain health information, you can tell us your choices about what we share. If you have a clear preference for how we share your information in the situations described below, talk to us.</p>
          
          <ul className="ml-6 list-disc space-y-2 text-warm-gray">
            <li>Sharing information with your family, close friends, or others involved in your care</li>
            <li>Sharing information in a disaster relief situation</li>
            <li>Including your information in a hospital directory (not applicable to our services)</li>
            <li>Marketing communications and sale of your information (we will never sell your information)</li>
            <li>Fundraising efforts (we do not engage in fundraising)</li>
          </ul>
        </CardContent>
      </Card>

      <Card variant="glass" id="responsibilities">
        <CardContent className="p-6">
          <div className="mb-4 flex items-center gap-3">
            <Bell className="h-5 w-5 text-warm-stone" />
            <h2 className="font-display text-xl font-bold text-rich-black">Our Responsibilities</h2>
          </div>
          <ul className="ml-6 list-disc space-y-3 text-warm-gray">
            <li>We are required by law to maintain the privacy and security of your protected health information.</li>
            <li>We will let you know promptly if a breach occurs that may have compromised the privacy or security of your information.</li>
            <li>We must follow the duties and privacy practices described in this notice and give you a copy of it.</li>
            <li>We will not use or share your information other than as described here unless you tell us we can in writing. If you tell us we can, you may change your mind at any time. Let us know in writing if you change your mind.</li>
          </ul>
        </CardContent>
      </Card>

      <Card variant="glass" id="changes">
        <CardContent className="p-6">
          <div className="mb-4 flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-warm-stone" />
            <h2 className="font-display text-xl font-bold text-rich-black">Changes to the Terms of This Notice</h2>
          </div>
          <p className="text-warm-gray leading-relaxed">
            We can change the terms of this notice, and the changes will apply to all information we have about you. The new notice will be available upon request, on our website, and we will mail a copy to you upon request.
          </p>
        </CardContent>
      </Card>

      <Card variant="glass" id="contact">
        <CardContent className="p-6">
          <h2 className="mb-4 font-display text-xl font-bold text-rich-black">Contact Information</h2>
          <p className="mb-4 text-warm-gray leading-relaxed">If you have questions about this notice or our privacy practices, or if you want to exercise your rights, please contact:</p>
          
          <div className="rounded-lg bg-soft-linen/50 p-4">
            <p className="text-warm-gray"><strong className="text-rich-black">Elevare Health Privacy Officer</strong></p>
            <p className="text-warm-gray">Elevare Health MSO LLC</p>
            <p className="text-warm-gray">1401 Lavaca St, Suite 388</p>
            <p className="text-warm-gray">Austin, TX 78701</p>
            <p className="mt-2 text-warm-gray">
              Email:{" "}
              <a href="mailto:privacy@elevarehealth.com" className="text-warm-stone hover:underline">
                privacy@elevarehealth.com
              </a>
            </p>
          </div>
          
          <p className="mt-4 text-warm-gray leading-relaxed">
            <strong className="text-rich-black">To file a complaint with the federal government:</strong><br />
            U.S. Department of Health and Human Services<br />
            Office for Civil Rights<br />
            <a href="https://www.hhs.gov/ocr/privacy/hipaa/complaints/" target="_blank" rel="noopener noreferrer" className="text-warm-stone hover:underline">
              www.hhs.gov/ocr/privacy/hipaa/complaints/
            </a>
          </p>
        </CardContent>
      </Card>
    </LegalPageLayout>
  );
};

export default HIPAANotice;
